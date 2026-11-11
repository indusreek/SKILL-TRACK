
import { useEffect, useState } from "react";
import AuthPage from "./AuthPage";
import "./App.css";
import CoursesPage from "./CoursesPage";

const API_URL = "http://localhost:5000/api";

const districts = [
  "All districts", "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore",
  "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi",
  "Kancheepuram", "Kanniyakumari", "Karur", "Krishnagiri", "Madurai",
  "Mayiladuthurai", "Nagapattinam", "Namakkal", "Perambalur",
  "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
  "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli",
  "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur",
  "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

const companyNames = {
  Ariyalur: "Ariyalur Digital Labs",
  Chengalpattu: "Chengalpattu TechWorks",
  Chennai: "Chennai Innovation Studio",
  Coimbatore: "Coimbatore CodeCraft",
  Cuddalore: "Cuddalore Smart Solutions",
  Dharmapuri: "Dharmapuri TechNest",
  Dindigul: "Dindigul Digital Systems",
  Erode: "Erode Innovators Hub",
  Kallakurichi: "Kallakurichi TechPoint",
  Kancheepuram: "Kancheepuram Software Works",
  Kanniyakumari: "Kanyakumari TechWave",
  Karur: "Karur Digital Solutions",
  Krishnagiri: "Krishnagiri CodeWorks",
  Madurai: "Madurai Software Studio",
  Mayiladuthurai: "Mayiladuthurai TechBridge",
  Nagapattinam: "Nagapattinam Digital Hub",
  Namakkal: "Namakkal Innovation Labs",
  Perambalur: "Perambalur TechWorks",
  Pudukkottai: "Pudukkottai CodeCraft",
  Ramanathapuram: "Ramanathapuram Digital Systems",
  Ranipet: "Ranipet SmartTech",
  Salem: "Salem Software Solutions",
  Sivaganga: "Sivaganga Innovation Hub",
  Tenkasi: "Tenkasi TechNest",
  Thanjavur: "Thanjavur Digital Labs",
  Theni: "Theni CodeWorks",
  Thoothukudi: "Thoothukudi TechWave",
  Tiruchirappalli: "Trichy Innovation Studio",
  Tirunelveli: "Tirunelveli Software Hub",
  Tirupathur: "Tirupathur Digital Works",
  Tiruppur: "Tiruppur TechCraft",
  Tiruvallur: "Tiruvallur Smart Solutions",
  Tiruvannamalai: "Tiruvannamalai TechPoint",
  Tiruvarur: "Tiruvarur Digital Studio",
  Vellore: "Vellore CodeCraft",
  Viluppuram: "Viluppuram Innovation Labs",
  Virudhunagar: "Virudhunagar TechWorks"
};

const opportunityTemplates = [
  {
    type: "Internships",
    title: "Frontend Developer Intern",
    mode: "Hybrid",
    duration: "8 weeks",
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    type: "In-Plant Training",
    title: "Web Development Training",
    mode: "Offline",
    duration: "5 days",
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    type: "Jobs & Placements",
    title: "Junior Software Developer",
    mode: "On-site",
    duration: "Full-time",
    skills: ["Java", "SQL", "Problem solving"]
  }
];

// These are fictional demo listings, not verified vacancies.
const opportunities = districts
  .filter((district) => district !== "All districts")
  .flatMap((district, districtIndex) =>
    opportunityTemplates.map((template, templateIndex) => ({
      id: `${districtIndex}-${templateIndex}`,
      ...template,
      company: companyNames[district],
      location: `${district}, Tamil Nadu`,
      district,
      skills: [...template.skills],
      tag: "Fictional demo listing"
    }))
  );

const roleRoadmaps = {
  "Frontend Developer": [
    {
      skill: "HTML",
      priority: "High",
      description: "Learn page structure, headings, links, forms and semantic elements."
    },
    {
      skill: "CSS",
      priority: "High",
      description: "Learn styling, Flexbox, Grid and responsive design."
    },
    {
      skill: "JavaScript",
      priority: "High",
      description: "Learn variables, functions, arrays, objects, DOM and events."
    },
    {
      skill: "Git",
      priority: "Medium",
      description: "Learn version control, commits, branches and GitHub."
    },
    {
      skill: "React",
      priority: "High",
      description: "Learn components, props, state, hooks and component composition."
    }
  ],
  "Backend Developer": [
    {
      skill: "Java",
      priority: "High",
      description: "Learn variables, conditions, loops, methods and OOP."
    },
    {
      skill: "Python",
      priority: "High",
      description: "Practise Python fundamentals, functions and collections."
    },
    {
      skill: "SQL",
      priority: "High",
      description: "Learn tables, SELECT, filtering, joins and database operations."
    },
    {
      skill: "APIs",
      priority: "Medium",
      description: "Understand HTTP, REST APIs, requests, responses and JSON."
    },
    {
      skill: "Problem solving",
      priority: "High",
      description: "Practise algorithms, data structures and coding problems."
    }
  ],
  "Data Analyst": [
    {
      skill: "Excel",
      priority: "High",
      description: "Learn formulas, sorting, filtering, pivot tables and charts."
    },
    {
      skill: "Statistics",
      priority: "High",
      description: "Understand averages, distributions and probability."
    },
    {
      skill: "SQL",
      priority: "High",
      description: "Practise queries, filtering, grouping, joins and aggregations."
    },
    {
      skill: "Python",
      priority: "High",
      description: "Learn Python basics and practise working with data."
    },
    {
      skill: "Data visualization",
      priority: "Medium",
      description: "Present findings using charts and dashboards."
    }
  ]
};

const roleSkillMap = {
  "Frontend Developer": roleRoadmaps["Frontend Developer"].map(
    (item) => item.skill
  ),
  "Backend Developer": roleRoadmaps["Backend Developer"].map(
    (item) => item.skill
  ),
  "Full Stack Developer": [
    "HTML", "CSS", "JavaScript", "React", "SQL", "APIs"
  ],
  "Java Developer": [
    "Java", "OOP", "SQL", "Data Structures", "Problem solving"
  ],
  "Data Analyst": roleRoadmaps["Data Analyst"].map(
    (item) => item.skill
  )
};

const defaultGoal = "Become a frontend developer";

function App() {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("skilltrack-token") || ""
  );

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("skilltrack-user") || "null"
      );
    } catch {
      return null;
    }
  });

  const [dataLoaded, setDataLoaded] = useState(false);
  const [authError, setAuthError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const [page, setPage] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] =
    useState("All districts");

  // These values are loaded from and saved to SQLite per account.
  const [savedIds, setSavedIds] = useState([]);
  const [selectedRole, setSelectedRole] =
    useState("Frontend Developer");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [goal, setGoal] = useState(defaultGoal);
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");

  const [visits, setVisits] = useState([]);

  // Restore the logged-in account's saved information.
  const handleLoginSuccess = async (loginToken, loginUser) => {
    setDataLoaded(false);
    setAuthError("");
    setSaveStatus("");

    try {
      const response = await fetch(`${API_URL}/data`, {
        headers: {
          Authorization: `Bearer ${loginToken}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load your saved data."
        );
      }

      const data = result.data || {};

      setSavedIds(
        Array.isArray(data.savedIds) ? data.savedIds : []
      );

      setSelectedRole(
        roleSkillMap[data.selectedRole]
          ? data.selectedRole
          : "Frontend Developer"
      );

      setSelectedSkills(
        Array.isArray(data.selectedSkills)
          ? data.selectedSkills
          : []
      );

      setGoal(
        typeof data.goal === "string" ? data.goal : defaultGoal
      );

      setTasks(
        Array.isArray(data.tasks) ? data.tasks : []
      );

      sessionStorage.setItem("skilltrack-token", loginToken);
      sessionStorage.setItem(
        "skilltrack-user",
        JSON.stringify(loginUser)
      );

      setToken(loginToken);
      setUser(loginUser);
      setPage("Home");
      setDataLoaded(true);
    } catch (error) {
      setAuthError(
        error.message || "Could not load your account data."
      );
    }
  };

  // Automatically save the current account's data to SQLite.
  useEffect(() => {
    if (!token || !user || !dataLoaded) return;

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setSaveStatus("Saving...");

        const response = await fetch(`${API_URL}/data`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            data: {
              savedIds,
              selectedRole,
              selectedSkills,
              goal,
              tasks
            }
          }),
          signal: controller.signal
        });

        const result = await response.json();

        if (response.status === 401) {
          sessionStorage.removeItem("skilltrack-token");
          sessionStorage.removeItem("skilltrack-user");

          setToken("");
          setUser(null);
          setDataLoaded(false);
          setAuthError("Your login expired. Please log in again.");
          setSaveStatus("");
          return;
        }

        if (!response.ok) {
          throw new Error(
            result.message || "Could not save your changes."
          );
        }

        setSaveStatus("All changes saved");
      } catch (error) {
        if (error.name !== "AbortError") {
          setSaveStatus(
            "Save failed. Check your backend connection."
          );
        }
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [
    token,
    user,
    dataLoaded,
    savedIds,
    selectedRole,
    selectedSkills,
    goal,
    tasks
  ]);

  // Keep a seven-day visit chart in this browser.
  useEffect(() => {
    if (!token || !dataLoaded) return;

    const today = new Date().toLocaleDateString("en-CA");
    const storageKey = "skilltrack-visits";
    let currentVisits = [];

    try {
      currentVisits = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );
    } catch {
      currentVisits = [];
    }

    if (!Array.isArray(currentVisits)) currentVisits = [];

    if (!sessionStorage.getItem("skilltrack-visited")) {
      const existing = currentVisits.find(
        (item) => item.date === today
      );

      const updated = existing
        ? currentVisits.map((item) =>
            item.date === today
              ? { ...item, count: item.count + 1 }
              : item
          )
        : [...currentVisits, { date: today, count: 1 }];

      const lastSevenDays = updated.slice(-7);

      localStorage.setItem(
        storageKey,
        JSON.stringify(lastSevenDays)
      );

      sessionStorage.setItem("skilltrack-visited", "true");
      setVisits(lastSevenDays);
    } else {
      setVisits(currentVisits.slice(-7));
    }
  }, [token, dataLoaded]);

  const logout = () => {
    sessionStorage.removeItem("skilltrack-token");
    sessionStorage.removeItem("skilltrack-user");
    sessionStorage.removeItem("skilltrack-visited");

    setToken("");
    setUser(null);
    setDataLoaded(false);
    setAuthError("");
    setSaveStatus("");
    setPage("Home");
    setMobileMenuOpen(false);
  };

  const navigate = (destination) => {
    setPage(destination);
    setMobileMenuOpen(false);
    setSearch("");
    setSelectedDistrict("All districts");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSaved = (id) => {
    setSavedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const filteredOpportunities = opportunities.filter((item) => {
    const correctPage = item.type === page;

    const correctDistrict =
      selectedDistrict === "All districts" ||
      item.district === selectedDistrict;

    const text = [
      item.title,
      item.company,
      item.location,
      item.district,
      ...item.skills
    ].join(" ").toLowerCase();

    return (
      correctPage &&
      correctDistrict &&
      text.includes(search.toLowerCase())
    );
  });

  const savedOpportunities = opportunities.filter((item) =>
    savedIds.includes(item.id)
  );

  const requiredSkills = roleSkillMap[selectedRole] || [];

  const matchedSkills = requiredSkills.filter((skill) =>
    selectedSkills.includes(skill)
  );

  const skillScore = requiredSkills.length
    ? Math.round(
        (matchedSkills.length / requiredSkills.length) * 100
      )
    : 0;

  const roadmap = roleRoadmaps[selectedRole] ||
    requiredSkills.map((skill) => ({
      skill,
      priority: "Medium",
      description: `Learn and practise ${skill}.`
    }));

  const remainingRoadmap = roadmap.filter(
    (item) => !selectedSkills.includes(item.skill)
  );

  const nextSkill = remainingRoadmap[0];

  const addTask = (event) => {
    event.preventDefault();

    if (!newTask.trim()) return;

    setTasks((previous) => [
      ...previous,
      {
        id: Date.now(),
        text: newTask.trim(),
        deadline,
        completed: false
      }
    ]);

    setNewTask("");
    setDeadline("");
  };

  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const taskProgress = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  const navItems = [
    "Home",
    "Internships",
    "In-Plant Training",
    "Jobs & Placements",
    "Skill Analyzer",
    "Career Tracker",
    "Courses"
  ];

  const pageTitles = {
    Internships: "Internship Opportunities",
    "In-Plant Training": "In-Plant Training Opportunities",
    "Jobs & Placements": "Jobs & Placement Opportunities"
  };

  // Never show the dashboard until account data has loaded.
  if (!token || !user || !dataLoaded) {
    return (
      <AuthPage
        onLoginSuccess={handleLoginSuccess}
        error={authError}
      />
    );
  }

  return (
    <div className="skilltrack-app">
      <style>{`
        .skilltrack-app {
          min-height: 100vh;
          color: #1e293b;
          background: linear-gradient(135deg, #eef4ff, #f8faff, #edf5ff);
          font-family: Inter, Arial, sans-serif;
        }

        .skilltrack-app * { box-sizing: border-box; }

        .st-header {
          background: rgba(255,255,255,.95);
          box-shadow: 0 5px 25px rgba(30,64,175,.08);
          border-bottom: 1px solid #e5eaf2;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .st-nav {
          max-width: 1200px;
          margin: auto;
          min-height: 72px;
          padding: 12px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .st-brand {
          font-size: 25px;
          font-weight: 800;
          color: #1d4ed8;
          cursor: pointer;
          white-space: nowrap;
        }

        .st-brand span { color: #0f172a; }

        .st-links {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 5px;
        }

        .st-links button {
          border: 0;
          border-radius: 8px;
          background: transparent;
          padding: 9px 10px;
          cursor: pointer;
          color: #475569;
          font-size: 13px;
        }

        .st-links button:hover,
        .st-links button.active {
          color: #1d4ed8;
          background: #eff6ff;
        }

        .st-menu {
          display: none;
          border: 1px solid #cbd5e1;
          background: white;
          padding: 8px 11px;
          border-radius: 8px;
          cursor: pointer;
        }

        .st-account {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-wrap: wrap;
        }

        .st-main {
          max-width: 1200px;
          margin: auto;
          padding: 30px 22px 60px;
          min-height: 75vh;
        }

        .st-hero {
          border-radius: 24px;
          padding: 50px 40px;
          background: linear-gradient(125deg, #172554, #1d4ed8 65%, #38bdf8);
          color: white;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          align-items: center;
          gap: 28px;
          box-shadow: 0 20px 45px rgba(29,78,216,.18);
        }

        .st-hero h1 {
          font-size: clamp(32px,5vw,52px);
          line-height: 1.12;
          margin: 12px 0 18px;
        }

        .st-hero p { line-height: 1.7; color: #e0ecff; }

        .st-eyebrow {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .st-hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 25px;
        }

        .st-button {
          border: 0;
          border-radius: 9px;
          padding: 11px 16px;
          font-weight: 700;
          cursor: pointer;
          background: #1d4ed8;
          color: white;
          transition: transform .2s ease;
        }

        .st-button:hover { transform: translateY(-2px); }

        .st-button-light { background: white; color: #1d4ed8; }

        .st-button-outline {
          background: white;
          color: #334155;
          border: 1px solid #cbd5e1;
        }

        .st-hero-stat {
          padding: 28px;
          border: 1px solid #ffffff55;
          border-radius: 18px;
          background: #ffffff15;
          text-align: center;
        }

        .st-hero-stat strong {
          display: block;
          font-size: 42px;
          margin: 8px 0;
        }

        .st-section { margin-top: 38px; }

        .st-section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .st-section h2 { margin: 0 0 8px; font-size: 24px; }

        .st-muted { color: #64748b; line-height: 1.6; }

        .st-grid {
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 17px;
        }

        .st-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 21px;
          box-shadow: 0 8px 20px rgba(15,23,42,.05);
          min-width: 0;
        }

        .st-card h3 { margin: 8px 0; font-size: 18px; }
        .st-card p { line-height: 1.55; }
        .st-card-icon { font-size: 27px; }

        .st-stat-row {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 16px;
        }

        .st-stat strong {
          display: block;
          font-size: 29px;
          color: #1d4ed8;
          margin-bottom: 6px;
        }

        .st-page-title { margin-bottom: 24px; }
        .st-page-title h1 { font-size: 31px; margin: 0 0 8px; }

        .st-filters {
          display: grid;
          grid-template-columns: minmax(200px,1fr) minmax(220px,.7fr);
          gap: 12px;
          margin: 20px 0;
        }

        .st-input, .st-select, .st-textarea {
          width: 100%;
          border: 1px solid #cbd5e1;
          background: white;
          border-radius: 12px;
          padding: 12px 13px;
          font: inherit;
          color: #1e293b;
        }

        .st-input:focus, .st-select:focus, .st-textarea:focus {
          outline: 2px solid #93c5fd;
          border-color: #3b82f6;
        }

        .st-label {
          display: block;
          font-weight: 700;
          font-size: 13px;
          margin-bottom: 8px;
        }

        .st-listings {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 17px;
        }

        .st-listing-top {
          display: flex;
          align-items: start;
          justify-content: space-between;
          gap: 12px;
        }

        .st-listing-top h3 { margin: 0 0 7px; }

        .st-tag {
          display: inline-block;
          font-size: 11px;
          background: #eff6ff;
          color: #1d4ed8;
          border-radius: 20px;
          padding: 5px 8px;
          font-weight: 700;
        }

        .st-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: 13px 0;
        }

        .st-skill-tag {
          background: #f1f5f9;
          border-radius: 6px;
          padding: 5px 8px;
          font-size: 12px;
        }

        .st-empty {
          background: white;
          border: 1px dashed #cbd5e1;
          border-radius: 14px;
          padding: 32px;
          text-align: center;
          color: #64748b;
          grid-column: 1 / -1;
        }

        .st-progress {
          height: 9px;
          background: #e2e8f0;
          border-radius: 99px;
          overflow: hidden;
          margin: 12px 0;
        }

        .st-progress div {
          height: 100%;
          background: #2563eb;
          border-radius: 99px;
          transition: width .2s;
        }

        .st-check-list { display: grid; gap: 10px; }

        .st-roadmap-item {
          padding: 15px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .st-roadmap-heading {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .st-roadmap-heading input { width: 18px; height: 18px; }
        .st-roadmap-name { flex: 1; font-weight: 700; }

        .st-priority {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
        }

        .st-priority-high { background: #fee2e2; color: #b91c1c; }
        .st-priority-medium { background: #fef3c7; color: #92400e; }
        .st-priority-low { background: #dcfce7; color: #166534; }

        .st-roadmap-description {
          margin: 7px 0 0 28px;
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
        }

        .st-analyzer-grid {
          display: grid;
          grid-template-columns: minmax(0,1.2fr) minmax(0,1fr);
          gap: 18px;
          align-items: start;
        }

        .st-next-skill {
          border: 1px solid #bfdbfe;
          background: #eff6ff;
          border-radius: 16px;
          padding: 17px;
          margin: 18px 0;
        }

        .st-next-label {
          color: #1d4ed8;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 1px;
          font-weight: 800;
        }

        .st-complete-message {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          border-radius: 12px;
          padding: 16px;
          line-height: 1.6;
          margin: 18px 0;
        }

        .st-task {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .st-task-text { flex: 1; min-width: 0; }
        .st-completed { text-decoration: line-through; color: #94a3b8; }
        .st-small { font-size: 12px; color: #64748b; }

        .st-chart {
          display: flex;
          align-items: end;
          gap: 13px;
          height: 170px;
          padding-top: 18px;
        }

        .st-chart-item {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: end;
          gap: 8px;
        }

        .st-chart-bar {
          width: min(35px,80%);
          min-height: 4px;
          background: #60a5fa;
          border-radius: 6px 6px 0 0;
        }

        .st-footer {
          background: #0f172a;
          color: #cbd5e1;
          padding: 28px 22px;
        }

        .st-footer-inner {
          max-width: 1200px;
          margin: auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 15px;
        }

        @media (max-width: 1050px) {
          .st-menu { display: inline-block; }
          .st-links { display: none; width: 100%; }
          .st-links.st-mobile-open {
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
          .st-links.st-mobile-open button { text-align: left; }
          .st-hero { grid-template-columns: 1fr; }
          .st-analyzer-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 650px) {
          .st-main { padding: 22px 14px 45px; }
          .st-nav { padding: 12px 14px; }
          .st-brand { font-size: 22px; }
          .st-grid, .st-listings, .st-stat-row, .st-filters {
            grid-template-columns: 1fr;
          }
          .st-hero { padding: 28px 20px; }
          .st-hero h1 { font-size: 34px; }
          .st-section-heading {
            align-items: start;
            flex-direction: column;
          }
          .st-card { padding: 17px; }
          .st-roadmap-heading { flex-wrap: wrap; }
          .st-account { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .skilltrack-app *, .skilltrack-app *::before,
          .skilltrack-app *::after {
            transition-duration: .01ms !important;
            animation-duration: .01ms !important;
          }
        }
          
/* Floating hover effect for icons */
.st-card-icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

.st-card-icon:hover {
  transform: translateY(-8px);
}

/* Floating effect for cards */
.st-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.st-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
}

/* Floating effect for buttons */
.st-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.st-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.2);
}

/* Floating effect for navigation icons and buttons */
.st-links button {
  transition: transform 0.3s ease, background 0.3s ease;
}

.st-links button:hover {
  transform: translateY(-3px);
}

/* Floating effect for opportunity cards */
.st-listings .st-card:hover {
  transform: translateY(-6px);
}

/* Respect reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {
  .st-card,
  .st-card-icon,
  .st-button,
  .st-links button {
    transition: none;
  }

  .st-card:hover,
  .st-card-icon:hover,
  .st-button:hover,
  .st-links button:hover {
    transform: none;
  }
}

      `}</style>

      <header className="st-header">
        <nav className="st-nav">
          <div
            className="st-brand"
            onClick={() => navigate("Home")}
          >
            Skill<span>Track</span>
          </div>

          <button
            className="st-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          <div
            className={`st-links ${mobileMenuOpen ? "st-mobile-open" : ""}`}
          >
            {navItems.map((item) => (
              <button
                key={item}
                className={page === item ? "active" : ""}
                onClick={() => navigate(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="st-account">
            <span className="st-small">{user.name}</span>
            <span className="st-small" role="status">
              {saveStatus}
            </span>
            <button
              className="st-button st-button-outline"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="st-main">
        {page === "Home" && (
          <>
            <section className="st-hero">
              <div>
                <div className="st-eyebrow">Your career starts here</div>
                <h1>
                  Learn skills. Find opportunities. Build your future.
                </h1>
                <p>
                  Explore internships, in-plant training, and job opportunities
                  while tracking your skills and career goals in one place.
                </p>

                <div className="st-hero-actions">
                  <button
                    className="st-button st-button-light"
                    onClick={() => navigate("Internships")}
                  >
                    Explore Opportunities →
                  </button>
                  <button
                    className="st-button"
                    style={{
                      background: "#ffffff20",
                      border: "1px solid #ffffff70"
                    }}
                    onClick={() => navigate("Skill Analyzer")}
                  >
                    Analyze My Skills
                  </button>
                </div>
              </div>

              <div className="st-hero-stat">
                <div className="st-eyebrow">SkillTrack Demo Directory</div>
                <strong>{opportunities.length}</strong>
                <div>Sample listings across 38 districts</div>
                <p className="st-small" style={{ color: "#dbeafe" }}>
                  Fictional prototype data, not verified vacancies.
                </p>
              </div>
            </section>

            <section className="st-section">
              <div className="st-section-heading">
                <div>
                  <h2>Explore opportunities</h2>
                  <p className="st-muted">
                    Choose the opportunity type that suits your career stage.
                  </p>
                </div>
              </div>

              <div className="st-grid">
                {[
                  {
                    name: "Internships",
                    icon: "💻",
                    description: "Explore short-term work experience and technical roles."
                  },
                  {
                    name: "In-Plant Training",
                    icon: "🏭",
                    description: "Explore practical training and industry exposure."
                  },
                  {
                    name: "Jobs & Placements",
                    icon: "🚀",
                    description: "Explore sample entry-level jobs and placement roles."
                  }
                ].map((item) => (
                  <div className="st-card" key={item.name}>
                    <div className="st-card-icon">{item.icon}</div>
                    <h3>{item.name}</h3>
                    <p className="st-muted">{item.description}</p>
                    <p>
                      <strong>38</strong> district listings
                    </p>
                    <button
                      className="st-button"
                      onClick={() => navigate(item.name)}
                    >
                      Explore →
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="st-section">
              <div className="st-section-heading">
                <div>
                  <h2>Your Career Toolkit</h2>
                  <p className="st-muted">
                    Prepare for your next opportunity with these tools.
                  </p>
                </div>
              </div>

              <div className="st-grid">
                <div className="st-card">
                  <div className="st-card-icon">🎯</div>
                  <h3>Skill Analyzer</h3>
                  <p className="st-muted">
                    Compare your current skills with those needed for a role.
                  </p>
                  <button
                    className="st-button"
                    onClick={() => navigate("Skill Analyzer")}
                  >
                    Check Skills
                  </button>
                </div>

                <div className="st-card">
                  <div className="st-card-icon">📌</div>
                  <h3>Career Tracker</h3>
                  <p className="st-muted">
                    Save goals, maintain tasks, and track your progress.
                  </p>
                  <button
                    className="st-button"
                    onClick={() => navigate("Career Tracker")}
                  >
                    Track Career
                  </button>
                </div>

                <div className="st-card">
                  <div className="st-card-icon">📚</div>
                  <h3>Courses</h3>
                  <p className="st-muted">
                    Explore learning resources in the Courses section.
                  </p>
                  <button
                    className="st-button"
                    onClick={() => navigate("Courses")}
                  >
                    Explore Courses
                  </button>
                </div>
              </div>
            </section>

            <section className="st-section">
              <div className="st-section-heading">
                <div>
                  <h2>Your dashboard</h2>
                  <p className="st-muted">
                    Your saved opportunities and career tracker progress.
                  </p>
                </div>
              </div>

              <div className="st-stat-row">
                <div className="st-card st-stat">
                  <strong>{savedIds.length}</strong>
                  <div>Saved opportunities</div>
                </div>
                <div className="st-card st-stat">
                  <strong>{tasks.length}</strong>
                  <div>Career tracker tasks</div>
                </div>
              </div>

              <div className="st-card" style={{ marginTop: 17 }}>
                <h3>Daily visits</h3>
                <p className="st-muted">
                  Visits recorded in this browser on this device.
                </p>

                <div className="st-chart">
                  {Array.from({ length: 7 }, (_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - index));

                    const dateString = date.toLocaleDateString("en-CA");
                    const record = visits.find(
                      (item) => item.date === dateString
                    );
                    const count = record?.count || 0;
                    const maxCount = Math.max(
                      1,
                      ...visits.map((item) => item.count)
                    );

                    return (
                      <div className="st-chart-item" key={dateString}>
                        <span className="st-small">{count}</span>
                        <div
                          className="st-chart-bar"
                          style={{
                            height: `${(count / maxCount) * 100}%`
                          }}
                        />
                        <span className="st-small">
                          {date.toLocaleDateString("en", {
                            weekday: "short"
                          })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {pageTitles[page] && (
          <>
            <div className="st-page-title">
              <h1>{pageTitles[page]}</h1>
              <p className="st-muted">
                Browse sample listings by district, company name, title, or skill.
                These companies and opportunities are fictional demo data.
              </p>
            </div>

            <div className="st-filters">
              <input
                className="st-input"
                type="search"
                placeholder="Search company, role, district, or skill..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <select
                className="st-select"
                value={selectedDistrict}
                onChange={(event) =>
                  setSelectedDistrict(event.target.value)
                }
                aria-label="Filter by Tamil Nadu district"
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <p className="st-muted">
              Showing <strong>{filteredOpportunities.length}</strong> listings
              {selectedDistrict !== "All districts"
                ? ` in ${selectedDistrict}`
                : " across Tamil Nadu"}.
            </p>

            <div className="st-listings">
              {filteredOpportunities.map((item) => (
                <article className="st-card" key={item.id}>
                  <div className="st-listing-top">
                    <div>
                      <h3>{item.title}</h3>
                      <div style={{ fontWeight: 700, color: "#334155" }}>
                        {item.company}
                      </div>
                    </div>

                    <button
                      className="st-button st-button-outline"
                      onClick={() => toggleSaved(item.id)}
                      aria-label={
                        savedIds.includes(item.id)
                          ? "Remove saved opportunity"
                          : "Save opportunity"
                      }
                    >
                      {savedIds.includes(item.id) ? "★ Saved" : "☆ Save"}
                    </button>
                  </div>

                  <p className="st-muted">📍 {item.location}</p>

                  <div className="st-skills">
                    <span className="st-tag">{item.type}</span>
                    <span className="st-skill-tag">{item.mode}</span>
                    <span className="st-skill-tag">{item.duration}</span>
                  </div>

                  <div className="st-skills">
                    {item.skills.map((skill) => (
                      <span className="st-skill-tag" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="st-small">
                    {item.tag} · Not a verified job or vacancy
                  </p>
                </article>
              ))}

              {filteredOpportunities.length === 0 && (
                <div className="st-empty">
                  <h3>No matching listings found</h3>
                  <p>
                    Try another search term or select a different district.
                  </p>
                  <button
                    className="st-button"
                    onClick={() => {
                      setSearch("");
                      setSelectedDistrict("All districts");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {page === "Skill Analyzer" && (
          <>
            <div className="st-page-title">
              <h1>Skill Analyzer & Learning Roadmap</h1>
              <p className="st-muted">
                Choose your target career, check the skills you know, and
                decide what to learn next.
              </p>
            </div>

            <div className="st-analyzer-grid">
              <section className="st-card">
                <label className="st-label" htmlFor="career-role">
                  Choose your target role
                </label>

                <select
                  id="career-role"
                  className="st-select"
                  value={selectedRole}
                  onChange={(event) => setSelectedRole(event.target.value)}
                >
                  {Object.keys(roleSkillMap).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>

                <h3 style={{ marginTop: 24 }}>Your learning roadmap</h3>
                <p className="st-muted">
                  Tick a skill when you have learned and practised its
                  fundamentals.
                </p>

                <div className="st-check-list">
                  {roadmap.map((item, index) => {
                    const isComplete = selectedSkills.includes(item.skill);

                    return (
                      <div className="st-roadmap-item" key={item.skill}>
                        <div className="st-roadmap-heading">
                          <input
                            id={`skill-${selectedRole}-${index}`}
                            type="checkbox"
                            checked={isComplete}
                            onChange={() =>
                              setSelectedSkills((previous) =>
                                previous.includes(item.skill)
                                  ? previous.filter(
                                      (skill) => skill !== item.skill
                                    )
                                  : [...previous, item.skill]
                              )
                            }
                          />

                          <label
                            className="st-roadmap-name"
                            htmlFor={`skill-${selectedRole}-${index}`}
                            style={{
                              textDecoration: isComplete
                                ? "line-through"
                                : "none",
                              color: isComplete ? "#64748b" : "#1e293b",
                              cursor: "pointer"
                            }}
                          >
                            {index + 1}. {item.skill}
                          </label>

                          <span
                            className={`st-priority st-priority-${item.priority.toLowerCase()}`}
                          >
                            {item.priority} Priority
                          </span>
                        </div>

                        <p className="st-roadmap-description">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="st-card">
                <h3>Your skill progress</h3>
                <p className="st-muted">
                  Checklist progress for {selectedRole}.
                </p>

                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: "#1d4ed8"
                  }}
                >
                  {skillScore}%
                </div>

                <div
                  className="st-progress"
                  role="progressbar"
                  aria-valuenow={skillScore}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Skill learning progress"
                >
                  <div style={{ width: `${skillScore}%` }} />
                </div>

                <p>
                  <strong>{matchedSkills.length}</strong> of{" "}
                  <strong>{requiredSkills.length}</strong> skills completed.
                </p>

                {nextSkill ? (
                  <div className="st-next-skill">
                    <div className="st-next-label">
                      Your next skill to learn
                    </div>
                    <h3>{nextSkill.skill}</h3>
                    <span
                      className={`st-priority st-priority-${nextSkill.priority.toLowerCase()}`}
                    >
                      {nextSkill.priority} Priority
                    </span>
                    <p className="st-muted">{nextSkill.description}</p>
                  </div>
                ) : (
                  <div className="st-complete-message">
                    <strong>Roadmap checklist completed!</strong>
                    <p>
                      Practise with projects, build a portfolio, and keep
                      improving your skills.
                    </p>
                  </div>
                )}

                <h3 style={{ marginTop: 24 }}>Skills still to learn</h3>

                {remainingRoadmap.length === 0 ? (
                  <p className="st-muted">
                    No unchecked skills remain in this roadmap.
                  </p>
                ) : (
                  <div className="st-check-list">
                    {remainingRoadmap.map((item, index) => (
                      <div className="st-roadmap-item" key={item.skill}>
                        <div className="st-roadmap-heading">
                          <span className="st-roadmap-name">
                            {index + 1}. {item.skill}
                          </span>
                          <span
                            className={`st-priority st-priority-${item.priority.toLowerCase()}`}
                          >
                            {item.priority}
                          </span>
                        </div>
                        <p className="st-roadmap-description">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="st-small" style={{ marginTop: 20 }}>
                  This checklist is a self-assessment, not a professional
                  evaluation or a guarantee of job readiness.
                </p>
              </section>
            </div>
          </>
        )}

        {page === "Career Tracker" && (
          <>
            <div className="st-page-title">
              <h1>Career Tracker</h1>
              <p className="st-muted">
                Maintain your career goal, set deadlines, and track tasks.
              </p>
            </div>

            <div className="st-grid">
              <section className="st-card">
                <h3>My career goal</h3>
                <label className="st-label" htmlFor="career-goal">
                  Target
                </label>
                <input
                  id="career-goal"
                  className="st-input"
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  placeholder="Enter your career goal"
                />

                <h3 style={{ marginTop: 25 }}>My progress</h3>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#1d4ed8"
                  }}
                >
                  {taskProgress}%
                </div>
                <div className="st-progress">
                  <div style={{ width: `${taskProgress}%` }} />
                </div>
                <p className="st-muted">
                  {completedTasks} of {tasks.length} tasks completed.
                </p>

                <h3 style={{ marginTop: 25 }}>Saved opportunities</h3>
                <p className="st-muted">
                  {savedOpportunities.length} opportunities saved.
                </p>

                {savedOpportunities.map((item) => (
                  <div key={item.id} className="st-task">
                    <div className="st-task-text">
                      <strong>{item.title}</strong>
                      <div className="st-small">
                        {item.company} · {item.district}
                      </div>
                    </div>
                    <button
                      className="st-button st-button-outline"
                      onClick={() => navigate(item.type)}
                    >
                      View
                    </button>
                  </div>
                ))}
              </section>

              <section className="st-card">
                <h3>Add a career task</h3>
                <form onSubmit={addTask}>
                  <label className="st-label" htmlFor="new-task">
                    Task name
                  </label>
                  <input
                    id="new-task"
                    className="st-input"
                    value={newTask}
                    onChange={(event) => setNewTask(event.target.value)}
                    placeholder="e.g. Practise JavaScript"
                    required
                  />

                  <label
                    className="st-label"
                    htmlFor="task-deadline"
                    style={{ marginTop: 15 }}
                  >
                    Deadline (optional)
                  </label>
                  <input
                    id="task-deadline"
                    className="st-input"
                    type="date"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                  />

                  <button
                    className="st-button"
                    type="submit"
                    style={{ marginTop: 15 }}
                  >
                    + Add Task
                  </button>
                </form>

                <h3 style={{ marginTop: 28 }}>My tasks</h3>

                {tasks.length === 0 && (
                  <p className="st-muted">
                    No tasks yet. Add your first career task above.
                  </p>
                )}

                {tasks.map((task) => (
                  <div className="st-task" key={task.id}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Complete ${task.text}`}
                    />

                    <div className="st-task-text">
                      <div className={task.completed ? "st-completed" : ""}>
                        {task.text}
                      </div>
                      {task.deadline && (
                        <div className="st-small">
                          Deadline: {task.deadline}
                        </div>
                      )}
                    </div>

                    <button
                      className="st-button st-button-outline"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </section>
            </div>
          </>
        )}

        {page === "Courses" && (
          <section>
            <div className="st-page-title">
              <h1>Courses & Learning</h1>
              <p className="st-muted">
                Explore learning content provided by your Courses component.
              </p>
            </div>
            <CoursesPage />
          </section>
        )}
      </main>

      <footer className="st-footer">
        <div className="st-footer-inner">
          <div>
            <strong style={{ color: "white", fontSize: 19 }}>
              SkillTrack
            </strong>
            <p className="st-small" style={{ color: "#cbd5e1" }}>
              Discover opportunities. Develop skills. Track your future.
            </p>
          </div>
          <div className="st-small" style={{ color: "#cbd5e1" }}>
            SkillTrack prototype · Fictional sample listings
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
