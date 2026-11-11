
require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from the .env file");
}

// Display database information for debugging
console.log("=================================");
console.log("SKILLTRACK BACKEND DEBUG");
console.log("Database path:", db.name);
console.log("Current working directory:", process.cwd());
console.log("=================================");

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required."
        });
    }

    try {
        const token = authHeader.split(" ")[1];
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired login session."
        });
    }
}

// Registration API
app.post("/api/register", async (req, res) => {
    console.log("\n[DEBUG] Registration API executed");

    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            password.length < 8 ||
            password.length > 72
        ) {
            return res.status(400).json({
                message: "Enter a name, valid email, and password of 8-72 characters."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = db.prepare(
            "SELECT id FROM users WHERE email = ?"
        ).get(normalizedEmail);

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = db.prepare(`
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `).run(name.trim(), normalizedEmail, hashedPassword);

        console.log("[DEBUG] New user registered:", result.lastInsertRowid);

        return res.status(201).json({
            message: "Registration successful!",
            user: {
                id: result.lastInsertRowid,
                name: name.trim(),
                email: normalizedEmail
            }
        });

    } catch (error) {
        console.error("[DEBUG] Registration error:", error);

        return res.status(500).json({
            message: "Registration failed. Please try again."
        });
    }
});

// Login API
app.post("/api/login", async (req, res) => {
    console.log("\n=================================");
    console.log("[DEBUG] LOGIN API EXECUTED");
    console.log("Database path:", db.name);
    console.log("=================================");

    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password ||
            password.length > 72
        ) {
            console.log("[DEBUG] Invalid login request");

            return res.status(400).json({
                message: "Enter your email and password."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        console.log("[DEBUG] Checking user:", normalizedEmail);

        const user = db.prepare(
            "SELECT * FROM users WHERE email = ?"
        ).get(normalizedEmail);

        if (!user) {
            console.log("[DEBUG] User not found");

            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            console.log("[DEBUG] Password verification failed");

            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        console.log("[DEBUG] Password verified successfully");
        console.log("[DEBUG] Logged-in User ID:", user.id);

        // Save successful login in database
        console.log("[DEBUG] Inserting login history...");

        const loginResult = db.prepare(`
            INSERT INTO login_history (user_id)
            VALUES (?)
        `).run(user.id);

        console.log("[DEBUG] INSERT RESULT:", loginResult);

        console.log(
            "[DEBUG] LOGIN HISTORY AFTER INSERT:",
            db.prepare(`
                SELECT * FROM login_history
                ORDER BY id DESC
            `).all()
        );

        console.log("[DEBUG] Login history saved successfully!");

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        console.log("[DEBUG] JWT token generated");
        console.log("[DEBUG] Login completed successfully");

        return res.json({
            message: "Login successful!",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("[DEBUG] LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Login failed. Please try again."
        });
    }
});

// Get login history
app.get("/api/login-history", authenticateToken, (req, res) => {
    console.log("\n[DEBUG] LOGIN HISTORY API EXECUTED");
    console.log("[DEBUG] User ID:", req.user.id);
    console.log("[DEBUG] Database path:", db.name);

    try {
        const history = db.prepare(`
            SELECT id, login_time
            FROM login_history
            WHERE user_id = ?
            ORDER BY login_time DESC, id DESC
        `).all(req.user.id);

        console.log("[DEBUG] Retrieved login history:", history);

        return res.json({ history });

    } catch (error) {
        console.error("[DEBUG] Login history error:", error);

        return res.status(500).json({
            message: "Could not retrieve login history."
        });
    }
});

// Get SkillTrack user data
app.get("/api/data", authenticateToken, (req, res) => {
    console.log("[DEBUG] GET DATA API EXECUTED");

    try {
        const row = db.prepare(
            "SELECT data FROM user_data WHERE user_id = ?"
        ).get(req.user.id);

        return res.json({
            data: row ? JSON.parse(row.data) : {}
        });

    } catch (error) {
        console.error("[DEBUG] Get data error:", error);

        return res.status(500).json({
            message: "Could not retrieve SkillTrack data."
        });
    }
});

// Save SkillTrack user data
app.put("/api/data", authenticateToken, (req, res) => {
    console.log("[DEBUG] SAVE DATA API EXECUTED");

    try {
        const data = JSON.stringify(req.body.data ?? {});

        db.prepare(`
            INSERT INTO user_data (user_id, data, updated_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id)
            DO UPDATE SET
                data = excluded.data,
                updated_at = CURRENT_TIMESTAMP
        `).run(req.user.id, data);

        console.log("[DEBUG] SkillTrack data saved for user:", req.user.id);

        return res.json({
            message: "Data saved successfully."
        });

    } catch (error) {
        console.error("[DEBUG] Save data error:", error);

        return res.status(500).json({
            message: "Could not save SkillTrack data."
        });
    }
});

// Backend health check
app.get("/api/health", (req, res) => {
    console.log("[DEBUG] HEALTH API EXECUTED");

    return res.json({
        message: "SkillTrack backend is running!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log("=================================");
    console.log(`SkillTrack backend running at http://localhost:${PORT}`);
    console.log("Database path:", db.name);
    console.log("=================================");
});
