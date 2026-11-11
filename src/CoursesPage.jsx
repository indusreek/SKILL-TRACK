
import { useMemo, useState } from "react";
import {
  Search, BookOpen, Code2, Database, ChartNoAxesColumn,
  ArrowUpRight, CheckCircle2, Clock3, X, Sparkles
} from "lucide-react";
import "./CoursesPage.css";

const courses = [
  {
    id: 1,
    title: "HTML & CSS Foundations",
    category: "Web Development",
    level: "Beginner",
    duration: "Self-paced",
    skills: ["HTML", "CSS"],
    description: "Build accessible, responsive web pages from scratch.",
    lessons: ["HTML structure and semantic tags", "CSS selectors and layouts", "Flexbox and Grid", "Responsive design"],
    url: "https://www.w3schools.com/html/",
    color: "blue",
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    category: "Programming",
    level: "Beginner",
    duration: "Self-paced",
    skills: ["JavaScript"],
    description: "Learn variables, functions, arrays, events and interactive web pages.",
    lessons: ["Variables and data types", "Conditions and loops", "Functions and arrays", "DOM and event handling"],
    url: "https://www.w3schools.com/js/",
    color: "yellow",
  },
  {
    id: 3,
    title: "React Fundamentals",
    category: "Web Development",
    level: "Beginner",
    duration: "Self-paced",
    skills: ["React", "JavaScript"],
    description: "Create reusable components and interactive user interfaces.",
    lessons: ["Components and JSX", "Props and state", "Handling events", "Rendering lists"],
    url: "https://react.dev/learn",
    color: "purple",
  },
  {
    id: 4,
    title: "SQL for Beginners",
    category: "Data & Databases",
    level: "Beginner",
    duration: "Self-paced",
    skills: ["SQL", "Databases"],
    description: "Query, filter and organize data stored in relational databases.",
    lessons: ["SELECT and WHERE", "Sorting and filtering", "Aggregate functions", "JOIN operations"],
    url: "https://www.w3schools.com/sql/",
    color: "green",
  },
  {
    id: 5,
    title: "Python for Data Analysis",
    category: "Data & Databases",
    level: "Beginner",
    duration: "Self-paced",
    skills: ["Python", "Pandas"],
    description: "Explore data analysis fundamentals using Python.",
    lessons: ["Python basics", "Lists and dictionaries", "Working with tables", "Introduction to data analysis"],
    url: "https://www.w3schools.com/python/",
    color: "blue",
  },
  {
    id: 6,
    title: "Statistics Essentials",
    category: "Data & Databases",
    level: "Beginner",
    duration: "Self-paced",
    skills: ["Statistics", "Data Analysis"],
    description: "Understand averages, distributions and essential data concepts.",
    lessons: ["Mean, median and mode", "Data distributions", "Basic probability", "Interpreting results"],
    url: "https://www.khanacademy.org/math/statistics-probability",
    color: "purple",
  },
  {
    id: 7,
    title: "Java Programming Basics",
    category: "Programming",
    level: "Beginner",
    duration: "Self-paced",
    skills: ["Java", "OOP"],
    description: "Learn Java syntax, methods, classes and object-oriented programming.",
    lessons: ["Variables and data types", "Conditions and loops", "Methods", "Classes and objects"],
    url: "https://www.w3schools.com/java/",
    color: "yellow",
  },
  {
    id: 8,
    title: "Git & GitHub Basics",
    category: "Career Skills",
    level: "Beginner",
    duration: "Self-paced",
    skills: ["Git", "GitHub"],
    description: "Track code changes and understand collaborative development workflows.",
    lessons: ["Repositories", "Commits", "Branches", "Working with remote repositories"],
    url: "https://docs.github.com/en/get-started",
    color: "green",
  },
];

const categories = [
  "All Courses",
  "Web Development",
  "Programming",
  "Data & Databases",
  "Career Skills",
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Courses");
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [notice, setNotice] = useState("");

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesCategory =
        category === "All Courses" || course.category === category;

      const searchable = [
        course.title,
        course.category,
        course.description,
        ...course.skills,
      ].join(" ").toLowerCase();

      return matchesCategory && searchable.includes(term);
    });
  }, [search, category]);

  function toggleComplete(id) {
    setCompleted((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function useInSkillPlan(course) {
    setNotice(`${course.skills.join(", ")} added to your on-page skill-plan selection.`);
    window.dispatchEvent(
      new CustomEvent("skilltrack-add-skills", {
        detail: { skills: course.skills },
      })
    );
  }

  return (
    <main className="courses-page">
      <header className="courses-hero">
        <div className="courses-eyebrow">
          <Sparkles size={15} /> LEARN • PRACTICE • GROW
        </div>
        <h1>Build skills. <span>Unlock opportunities.</span></h1>
        <p>
          Explore guided learning topics, practice essential skills and
          build your own learning journey for internships and jobs.
        </p>

        <div className="course-stats">
          <div><strong>{courses.length}</strong><span>Learning paths</span></div>
          <div><strong>{completed.length}/{courses.length}</strong><span>Completed</span></div>
          <div><strong>{Math.round(completed.length / courses.length * 100)}%</strong><span>Overall progress</span></div>
        </div>
      </header>

      <section className="courses-toolbar">
        <div className="courses-search">
          <Search size={20} />
          <input
            type="search"
            placeholder="Search courses or skills..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search courses or skills"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")} aria-label="Clear search">
              <X size={17} />
            </button>
          )}
        </div>

        <div className="course-filters" aria-label="Filter courses by category">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {notice && (
        <div className="course-notice" role="status">
          <CheckCircle2 size={18} />
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice("")} aria-label="Dismiss notice">
            <X size={17} />
          </button>
        </div>
      )}

      <section className="courses-grid" aria-label="Available learning paths">
        {filteredCourses.map((course) => {
          const isCompleted = completed.includes(course.id);

          return (
            <article className="course-card" key={course.id}>
              <div className={`course-icon ${course.color}`}>
                {course.category === "Data & Databases"
                  ? <Database size={24} />
                  : course.category === "Career Skills"
                  ? <ChartNoAxesColumn size={24} />
                  : <Code2 size={24} />}
              </div>

              <div className="course-card-meta">
                <span className="course-category">{course.category}</span>
                {isCompleted && (
                  <span className="course-done"><CheckCircle2 size={13} /> Completed</span>
                )}
              </div>

              <h2>{course.title}</h2>
              <p className="course-description">{course.description}</p>

              <div className="course-tags">
                {course.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <div className="course-details-row">
                <span><BookOpen size={15} /> {course.level}</span>
                <span><Clock3 size={15} /> {course.duration}</span>
              </div>

              <div className="course-actions">
                <button
                  type="button"
                  className="course-primary"
                  onClick={() => setSelected(course)}
                >
                  Explore course <ArrowUpRight size={17} />
                </button>
                <button
                  type="button"
                  className="course-secondary"
                  onClick={() => useInSkillPlan(course)}
                >
                  Use in skill plan
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {filteredCourses.length === 0 && (
        <div className="courses-empty">
          <Search size={28} />
          <h2>No matching courses</h2>
          <p>Try another keyword or select a different category.</p>
          <button
            type="button"
            onClick={() => { setSearch(""); setCategory("All Courses"); }}
          >
            Clear filters
          </button>
        </div>
      )}

      {selected && (
        <div className="course-modal-backdrop" onClick={() => setSelected(null)}>
          <section
            className="course-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="course-modal-close"
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close course details"
            >
              <X size={21} />
            </button>

            <span className="course-category">{selected.category}</span>
            <h2 id="course-modal-title">{selected.title}</h2>
            <p>{selected.description}</p>

            <h3>What you'll explore</h3>
            <ul className="course-lesson-list">
              {selected.lessons.map((lesson) => (
                <li key={lesson}>
                  <CheckCircle2 size={17} /> {lesson}
                </li>
              ))}
            </ul>

            <p className="course-resource-note">
              The learning resource opens on an external educational website.
              Its content and availability are managed by that provider.
            </p>

            <a
              className="course-primary course-start-link"
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start learning <ArrowUpRight size={18} />
            </a>

            <button
              className="course-secondary course-complete-button"
              type="button"
              onClick={() => toggleComplete(selected.id)}
            >
              {completed.includes(selected.id)
                ? "Mark as not completed"
                : "Mark course as completed"}
            </button>

            <button
              className="course-plan-link"
              type="button"
              onClick={() => useInSkillPlan(selected)}
            >
              Add skills to my plan
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
