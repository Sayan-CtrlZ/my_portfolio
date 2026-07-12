import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "../data";
import { ArrowUpRight, Github, FolderGit } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const cards = gsap.utils.toArray(".project-card");
      
      cards.forEach((card: any, index: number) => {
        if (prefersReducedMotion) {
          gsap.fromTo(
            card,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        } else {
          // Alternating left (-180px) and right (+180px) initial positions
          const isEven = index % 2 === 0;
          
          gsap.fromTo(
            card,
            {
              x: isEven ? -150 : 150,
              rotate: isEven ? -3 : 3,
              opacity: 0,
            },
            {
              x: 0,
              rotate: 0,
              opacity: 1,
              duration: 0.65,
              ease: "back.out(1.3)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-brutal-light border-b-4 border-black relative"
    >
      {/* Brutalist scratch marks and grid in the background */}
      <div className="absolute inset-0 brutal-scratches opacity-20 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute inset-0 brutal-crosshatch opacity-10 pointer-events-none"></div>

      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="bg-brutal-purple text-white font-mono font-bold text-xs px-3 py-1 uppercase shadow-brutal-sm rotate-[1.5deg] inline-block mb-3">
            CURATED PRODUCTION WORK
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-brutal-dark leading-none">
            PROJECTS & EXPERIMENTS
          </h2>
        </div>

        {/* Project Cards - Single Column layout with rich offset styling */}
        <div className="flex flex-col gap-12">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className={`project-card flex flex-col md:flex-row border-4 border-black ${project.color} shadow-brutal hover:shadow-brutal-lg hover:translate-y-[-4px] transition-all duration-100`}
              >
                {/* Visual Placeholder block (Alt left/right on desktop) */}
                <div
                  className={`w-full md:w-2/5 p-8 flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-black ${
                    isEven ? "md:order-1" : "md:order-2 md:border-l-4 md:border-r-0"
                  } bg-white relative overflow-hidden group min-h-[220px]`}
                >
                  {/* Brutalist design lines inside visual block */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                  <div className="absolute top-3 left-3 bg-black text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-white">
                    ASSET_BLOC // {project.id.toUpperCase()}
                  </div>
                  
                  {/* Big central decorative icon */}
                  <div className="w-20 h-20 border-4 border-black bg-white flex items-center justify-center shadow-brutal rotate-3 group-hover:rotate-12 transition-transform duration-200">
                    <FolderGit className="w-10 h-10 text-black" />
                  </div>
                </div>

                {/* Project Details */}
                <div
                  className={`w-full md:w-3/5 p-8 flex flex-col justify-between ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white text-black border-2 border-black font-mono text-xs font-bold px-2.5 py-0.5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-black text-brutal-dark uppercase tracking-tight mb-3">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="font-mono text-sm font-bold text-black leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-black border-dashed">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`brutal-btn-hover flex items-center gap-1.5 ${project.accentColor} text-black font-mono font-black text-xs px-4 py-2.5 border-2 border-black shadow-brutal-sm`}
                    >
                      LIVE DEMO <ArrowUpRight className="w-4 h-4" />
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutal-btn-hover flex items-center gap-1.5 bg-white text-black font-mono font-black text-xs px-4 py-2.5 border-2 border-black shadow-brutal-sm"
                      >
                        <Github className="w-4 h-4" /> SOURCE CODE
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
