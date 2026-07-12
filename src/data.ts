export interface Skill {
  name: string;
  category: "frontend" | "data-science" | "backend" | "tools";
  level: string;
  color: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  color: string;
  accentColor: string;
}

export const SKILLS: Skill[] = [
  // Backend
  { name: "Python", category: "backend", level: "Expert", color: "bg-brutal-yellow", description: "Core language used for high-performance scripts, automation, and stable backend architectures." },
  { name: "FastAPI", category: "backend", level: "Expert", color: "bg-brutal-green", description: "Building highly concurrent, async REST APIs with automatic OpenAPI generation." },
  { name: "Flask", category: "backend", level: "Advanced", color: "bg-brutal-orange", description: "Developing robust microservices and lightweight APIs with quick turnarounds." },
  { name: "PostgreSQL & SQL", category: "backend", level: "Expert", color: "bg-brutal-cyan", description: "Designing complex schemas, optimizing queries, and managing relational databases." },
  { name: "REST APIs", category: "backend", level: "Expert", color: "bg-brutal-pink", description: "Creating and consuming scalable, stateless, and efficient web services." },
  { name: "MySQL / SQLite", category: "backend", level: "Advanced", color: "bg-brutal-purple", description: "Handling structured data for local environments and high-throughput production servers." },

  // Data Science
  { name: "Pandas", category: "data-science", level: "Expert", color: "bg-brutal-pink", description: "Data manipulation, cleaning, and preprocessing pipelines at scale." },
  { name: "NumPy", category: "data-science", level: "Expert", color: "bg-brutal-yellow", description: "High-performance numerical computations and array operations." },
  { name: "Seaborn", category: "data-science", level: "Advanced", color: "bg-brutal-green", description: "Statistical data visualization to uncover patterns and trends." },
  { name: "OpenCV", category: "data-science", level: "Advanced", color: "bg-brutal-orange", description: "Computer vision applications, image processing, and real-time inference." },
  { name: "TensorFlow", category: "data-science", level: "Advanced", color: "bg-brutal-cyan", description: "Building and deploying deep learning models for complex AI tasks." },

  // Frontend
  { name: "TypeScript", category: "frontend", level: "Advanced", color: "bg-brutal-cyan", description: "Adding static typing to JavaScript for robust and maintainable frontend logic." },
  { name: "JavaScript", category: "frontend", level: "Expert", color: "bg-brutal-green", description: "Core frontend language for dynamic, interactive, and modern web applications." },
  { name: "React & Next.js", category: "frontend", level: "Advanced", color: "bg-brutal-purple", description: "Developing component-based UIs and SEO-friendly server-rendered web apps." },

  // Tools (Data Viz, Dev & Cloud)
  { name: "Power BI", category: "tools", level: "Advanced", color: "bg-brutal-purple", description: "Creating interactive dashboards and business intelligence reports." },
  { name: "Tableau", category: "tools", level: "Advanced", color: "bg-brutal-orange", description: "Visual analytics for deep insights and compelling data storytelling." },
  { name: "MS Excel", category: "tools", level: "Expert", color: "bg-brutal-yellow", description: "Advanced data analysis, pivot tables, macros, and financial modeling." },
  { name: "Docker", category: "tools", level: "Advanced", color: "bg-brutal-cyan", description: "Containerizing applications for consistent environments across development and production." },
  { name: "Git", category: "tools", level: "Advanced", color: "bg-brutal-pink", description: "Version control and collaborative code management workflows." },
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "NEURAL_NET INSIGHTS",
    description: "An automated model selection and hyperparameter optimization dashboard, utilizing Pandas for stream processing and FastAPI for REST inference.",
    tags: ["Python", "FastAPI", "Pandas", "Scikit-Learn"],
    link: "https://github.com/placeholder-user/neural-net-insights",
    github: "https://github.com/placeholder-user/neural-net-insights",
    color: "bg-brutal-orange",
    accentColor: "bg-brutal-green",
  },
  {
    id: "proj-2",
    title: "SQL_PROFILER ENGINE",
    description: "High-throughput database telemetry service logging real-time queries across SQLite, MySQL, and PostgreSQL containers to optimize query bottlenecks.",
    tags: ["SQL", "Flask", "PostgreSQL", "SQLite"],
    link: "https://github.com/placeholder-user/sql-profiler-engine",
    github: "https://github.com/placeholder-user/sql-profiler-engine",
    color: "bg-brutal-purple",
    accentColor: "bg-brutal-yellow",
  },
  {
    id: "proj-3",
    title: "KINETIC_PLOT MATRIX",
    description: "Custom real-time data visualizer converting static Matplotlib plots into reactive interactive canvas graphs using Next.js on Render.",
    tags: ["Matplotlib", "Python", "React", "Next.js"],
    link: "https://github.com/placeholder-user/kinetic-plot-matrix",
    github: "https://github.com/placeholder-user/kinetic-plot-matrix",
    color: "bg-brutal-pink",
    accentColor: "bg-brutal-cyan",
  },
  {
    id: "proj-4",
    title: "DATAFRAME_STATION",
    description: "Cloud-hosted CSV parser and AI category annotator executing remote batch-processing jobs using headless workers on Render.",
    tags: ["Python", "Pandas", "REST APIs", "Render"],
    link: "https://github.com/placeholder-user/dataframe-station",
    github: "https://github.com/placeholder-user/dataframe-station",
    color: "bg-brutal-yellow",
    accentColor: "bg-brutal-purple",
  },
];
