import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SKILLS, Skill } from "../data";
import { Hammer, Layers, ShieldCheck, BrainCircuit, ChevronDown, ChevronUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Filter skills based on chosen category
  const filteredSkills = activeCategory === "all"
    ? SKILLS
    : SKILLS.filter(skill => skill.category === activeCategory);

  // Slice displayed skills based on expand state (default 6 cards)
  const displayedSkills = isExpanded ? filteredSkills : filteredSkills.slice(0, 6);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.fromTo(
          ".skill-card",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
          }
        );
        return;
      }

      // Initial scroll-triggered stagger reveal
      gsap.fromTo(
        ".skill-card",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  // Trigger a quick layout entry stagger when filters or expansion change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setIsExpanded(false); // Reset expansion on filter change
    
    // Snappy animate-in for new selection
    setTimeout(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".skill-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.03, ease: "back.out(1.2)" }
      );
    }, 20);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    
    // Animate newly added nodes smoothly
    setTimeout(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".skill-card",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.02, ease: "power2.out" }
      );
    }, 20);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "frontend": return <Layers className="w-4 h-4 text-black" />;
      case "backend": return <ShieldCheck className="w-4 h-4 text-black" />;
      case "data-science": return <BrainCircuit className="w-4 h-4 text-black" />;
      default: return <Hammer className="w-4 h-4 text-black" />;
    }
  };

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-20 px-6 md:px-12 lg:px-24 bg-brutal-light border-b-4 border-black relative"
    >
      {/* Brutalist scratch marks in the background */}
      <div className="absolute inset-0 brutal-scratches opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="bg-brutal-purple text-white font-mono font-bold text-xs px-3 py-1 uppercase shadow-brutal-sm rotate-[1.5deg] inline-block mb-3">
              STACK DEFINITION
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-brutal-dark leading-none">
              SKILLS & TOOLKIT
            </h2>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2.5 bg-white p-2 border-4 border-black shadow-brutal w-full md:w-auto">
            {["all", "data-science", "backend", "tools", "frontend"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 text-xs md:text-sm font-mono font-black uppercase border-2 border-black transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-brutal-orange text-black translate-y-[-2px] shadow-brutal-sm"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {cat === "data-science" ? "data science" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid - Forced into exactly 3 columns on medium/large devices */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {displayedSkills.map((skill) => (
            <div
              key={skill.name}
              className={`skill-card border-4 border-black ${skill.color} p-5 shadow-brutal hover:translate-y-[-4px] hover:shadow-brutal-lg transition-all duration-100 flex flex-col justify-between aspect-[4/3] sm:aspect-square group relative overflow-hidden`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-black bg-white px-2 py-0.5 border-2 border-black shadow-brutal-sm rotate-[-1deg] uppercase">
                  {skill.category.replace("-", " ")}
                </span>
                <span className="p-1.5 bg-white border-2 border-black rounded-full shadow-brutal-sm">
                  {getCategoryIcon(skill.category)}
                </span>
              </div>

              {/* Skill Details */}
              <div className="relative z-10">
                <span className="block font-mono text-[10px] font-bold text-black/60 mb-1">
                  SKILL_NODE //
                </span>
                <h3 className="text-xl md:text-2xl font-black text-black leading-tight uppercase tracking-tight">
                  {skill.name}
                </h3>
              </div>

              {/* Level indicator stripe */}
              <div className="mt-4 pt-3 border-t-2 border-black border-dashed flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-black/80">
                  LEVEL:
                </span>
                <span className="font-mono text-xs font-black bg-white text-black px-1.5 py-0.5 border border-black uppercase">
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable "More" button controller */}
        {filteredSkills.length > 6 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleToggleExpand}
              className="px-8 py-4 bg-brutal-yellow text-black border-4 border-black font-mono font-black uppercase shadow-brutal hover:translate-y-[-4px] hover:shadow-brutal-lg active:translate-y-[2px] transition-all duration-100 flex items-center gap-2 text-sm md:text-base cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-5 h-5 text-black" />
                  COLLAPSE_NODE_GRID.EXE
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 text-black" />
                  LOAD_MORE_NODES.EXE ({filteredSkills.length - 6} IN_STACK)
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
