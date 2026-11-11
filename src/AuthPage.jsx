
import { useState } from "react";

const API_URL = "http://localhost:5000/api";

async function readResponse(response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      "The server returned HTML instead of JSON. Make sure your backend is running and the API route is correct."
    );
  }
}

function AuthPage({ onLoginSuccess, error: accountError }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (isRegister) {
        const registerResponse = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name.trim(),
            email: cleanEmail,
            password
          })
        });

        const registerResult = await readResponse(registerResponse);

        if (!registerResponse.ok) {
          // An existing email should use the login form instead.
          throw new Error(
            registerResult.message || "Registration failed."
          );
        }

        setMessageType("success");
        setMessage("Account created. Signing you in...");
      }

      const loginResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: cleanEmail,
          password
        })
      });

      const loginResult = await readResponse(loginResponse);

      if (!loginResponse.ok) {
        throw new Error(
          loginResult.message || "Login failed. Check your credentials."
        );
      }

      if (!loginResult.token || !loginResult.user) {
        throw new Error(
          "The server did not return a valid login session."
        );
      }

      await onLoginSuccess(loginResult.token, loginResult.user);
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Something went wrong.");

      // If registration succeeded but automatic login failed,
      // allow the user to log in with the account they just created.
      if (isRegister && err.message.includes("login")) {
        setIsRegister(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegister((previous) => !previous);
    setMessage("");
    setMessageType("error");
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>SkillTrack</h1>

        <p style={styles.subtitle}>
          {isRegister
            ? "Create your account to start tracking your career."
            : "Log in to continue your career journey."}
        </p>

        {isRegister && (
          <>
            <label style={styles.label} htmlFor="register-name">
              Full name
            </label>

            <input
              id="register-name"
              style={styles.input}
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              maxLength={100}
              required
            />
          </>
        )}

        <label style={styles.label} htmlFor="auth-email">
          Email address
        </label>

        <input
          id="auth-email"
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          maxLength={254}
          required
        />

        <label style={styles.label} htmlFor="auth-password">
          Password
        </label>

        <input
          id="auth-password"
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={isRegister ? "new-password" : "current-password"}
          minLength={isRegister ? 6 : undefined}
          required
        />

        {message && (
          <p
            role="alert"
            style={{
              ...styles.message,
              color: messageType === "success" ? "#166534" : "#b91c1c"
            }}
          >
            {message}
          </p>
        )}

        {accountError && (
          <p role="alert" style={styles.message}>
            {accountError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.65 : 1,
            cursor: loading ? "wait" : "pointer"
          }}
        >
          {loading
            ? "Please wait..."
            : isRegister
              ? "Create Account"
              : "Login"}
        </button>

        <p style={styles.switchText}>
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}{" "}

          <button
            type="button"
            style={styles.switchButton}
            onClick={switchMode}
            disabled={loading}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #eef4ff, #dbeafe)"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    background: "white",
    borderRadius: "18px",
    boxShadow: "0 12px 35px rgba(30, 64, 175, 0.12)"
  },

  title: {
    textAlign: "center",
    color: "#1d4ed8",
    margin: "0 0 10px"
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    lineHeight: 1.6,
    marginBottom: "25px"
  },

  label: {
    display: "block",
    margin: "15px 0 7px",
    fontWeight: 600,
    color: "#334155"
  },

  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    fontSize: "15px"
  },

  button: {
    width: "100%",
    padding: "13px",
    marginTop: "22px",
    background: "#1d4ed8",
    color: "white",
    border: "none",
    borderRadius: "9px",
    fontSize: "16px",
    fontWeight: 700
  },

  message: {
    fontSize: "13px",
    lineHeight: 1.5,
    overflowWrap: "anywhere"
  },

  switchText: {
    textAlign: "center",
    marginTop: "22px",
    color: "#475569"
  },

  switchButton: {
    border: "none",
    background: "none",
    color: "#1d4ed8",
    fontWeight: 700,
    cursor: "pointer"
  }
};

export default AuthPage;
