export interface Skill {
  name: string;
  category: "frontend" | "data-science" | "backend" | "tools";
  level: string;
  color: string;
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
  { name: "Python", category: "backend", level: "Expert", color: "bg-brutal-yellow" },
  { name: "FastAPI", category: "backend", level: "Expert", color: "bg-brutal-green" },
  { name: "Flask", category: "backend", level: "Advanced", color: "bg-brutal-orange" },
  { name: "PostgreSQL & SQL", category: "backend", level: "Expert", color: "bg-brutal-cyan" },
  { name: "REST APIs", category: "backend", level: "Expert", color: "bg-brutal-pink" },
  { name: "MySQL / SQLite", category: "backend", level: "Advanced", color: "bg-brutal-purple" },

  // Data Science
  { name: "Pandas", category: "data-science", level: "Expert", color: "bg-brutal-pink" },
  { name: "NumPy", category: "data-science", level: "Expert", color: "bg-brutal-yellow" },
  { name: "Seaborn", category: "data-science", level: "Advanced", color: "bg-brutal-green" },
  { name: "OpenCV", category: "data-science", level: "Advanced", color: "bg-brutal-orange" },
  { name: "TensorFlow", category: "data-science", level: "Advanced", color: "bg-brutal-cyan" },

  // Frontend
  { name: "TypeScript", category: "frontend", level: "Advanced", color: "bg-brutal-cyan" },
  { name: "JavaScript", category: "frontend", level: "Expert", color: "bg-brutal-green" },
  { name: "React & Next.js", category: "frontend", level: "Advanced", color: "bg-brutal-purple" },

  // Tools (Data Viz, Dev & Cloud)
  { name: "Power BI", category: "tools", level: "Advanced", color: "bg-brutal-purple" },
  { name: "Tableau", category: "tools", level: "Advanced", color: "bg-brutal-orange" },
  { name: "MS Excel", category: "tools", level: "Expert", color: "bg-brutal-yellow" },
  { name: "Docker", category: "tools", level: "Advanced", color: "bg-brutal-cyan" },
  { name: "Git", category: "tools", level: "Advanced", color: "bg-brutal-pink" },
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "NEURAL_NET INSIGHTS",
    description: "An automated model selection and hyperparameter optimization dashboard, utilizing Pandas for stream processing and FastAPI for REST inference.",
    tags: ["Python", "FastAPI", "Pandas", "Scikit-Learn"],
    link: "https://github.com/officialsayan36/neural-net-insights",
    github: "https://github.com/officialsayan36/neural-net-insights",
    color: "bg-brutal-orange",
    accentColor: "bg-brutal-green",
  },
  {
    id: "proj-2",
    title: "SQL_PROFILER ENGINE",
    description: "High-throughput database telemetry service logging real-time queries across SQLite, MySQL, and PostgreSQL containers to optimize query bottlenecks.",
    tags: ["SQL", "Flask", "PostgreSQL", "SQLite"],
    link: "https://github.com/officialsayan36/sql-profiler-engine",
    github: "https://github.com/officialsayan36/sql-profiler-engine",
    color: "bg-brutal-purple",
    accentColor: "bg-brutal-yellow",
  },
  {
    id: "proj-3",
    title: "KINETIC_PLOT MATRIX",
    description: "Custom real-time data visualizer converting static Matplotlib plots into reactive interactive canvas graphs using Next.js on Render.",
    tags: ["Matplotlib", "Python", "React", "Next.js"],
    link: "https://github.com/officialsayan36/kinetic-plot-matrix",
    github: "https://github.com/officialsayan36/kinetic-plot-matrix",
    color: "bg-brutal-pink",
    accentColor: "bg-brutal-cyan",
  },
  {
    id: "proj-4",
    title: "DATAFRAME_STATION",
    description: "Cloud-hosted CSV parser and AI category annotator executing remote batch-processing jobs using headless workers on Render.",
    tags: ["Python", "Pandas", "REST APIs", "Render"],
    link: "https://github.com/officialsayan36/dataframe-station",
    github: "https://github.com/officialsayan36/dataframe-station",
    color: "bg-brutal-yellow",
    accentColor: "bg-brutal-purple",
  },
];
