import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { User, Terminal, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );
      } else {
        // Slide up from below with a slight rotation settle (rotate from 2deg to 0deg)
        gsap.fromTo(
          cardRef.current,
          {
            y: 120,
            rotation: 2,
            opacity: 0,
          },
          {
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );

        // 360° scroll-linked rotation & scale-down as we scroll past/away from About
        gsap.to(".about-scroll-rotate", {
          rotate: 360,
          scale: 0.4,
          opacity: 0,
          transformOrigin: "center center",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=35% top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-20 px-6 md:px-12 lg:px-24 bg-brutal-yellow border-b-4 border-black relative overflow-hidden animate-reveal"
    >
      {/* Brutalist scratch marks in the background */}
      <div className="absolute inset-0 brutal-scratches opacity-10 pointer-events-none"></div>
      
      <div className="about-scroll-rotate max-w-[1600px] w-full mx-auto flex flex-col md:flex-row gap-12 items-stretch relative z-10 origin-center">
        
        {/* Left Side: Big Title Banner */}
        <div className="w-full md:w-2/5 flex flex-col justify-between items-start gap-6">
          <div>
            <span className="bg-black text-white font-mono font-bold text-sm md:text-base px-4 py-2 uppercase shadow-brutal-sm rotate-[-2deg] inline-block mb-6">
              INTENTIONAL DESIGN
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black leading-[0.9] uppercase text-brutal-dark tracking-tighter">
              THE MANIFESTO
            </h2>
          </div>
          <div className="hidden md:block w-full border-4 border-black p-4 bg-white shadow-brutal rotate-1">
            <span className="font-mono text-xs font-black block text-gray-500 mb-1">CURRENT INDEX:</span>
            <span className="font-mono text-sm font-bold flex items-center gap-1.5 text-black">
              <Terminal className="w-4 h-4 text-brutal-orange" /> AGARTALA, TRIPURA, INDIA
            </span>
          </div>
        </div>

        {/* Right Side: The Bio Card with slide-up & rotation settle */}
        <div ref={cardRef} className="w-full md:w-3/5">
          <div className="border-4 border-black bg-white p-8 md:p-12 shadow-brutal-lg flex flex-col gap-6 relative">
            
            {/* Header elements like a clean brutalist browser window */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-brutal-dark border-b-4 border-black px-4 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-brutal-pink border-2 border-black"></span>
                <span className="w-3 h-3 rounded-full bg-brutal-yellow border-2 border-black"></span>
                <span className="w-3 h-3 rounded-full bg-brutal-green border-2 border-black"></span>
              </div>
              <span className="font-mono text-[10px] text-white font-bold tracking-widest flex items-center gap-1">
                <Cpu className="w-3 h-3" /> STUDENT_BIO
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-6">
              {/* Giant bio text */}
              <p className="text-xl md:text-3xl font-black uppercase text-brutal-dark leading-tight tracking-tight">
                I SOLVE DATA CHALLENGES AND ARCHITECT STABLE BACKEND ENGINES USING ROBUST PIPELINES.
              </p>

              {/* Directly structured bio sentences */}
              <p className="text-sm md:text-lg font-mono text-gray-700 leading-relaxed font-bold">
                I am a 2nd-year student pursuing a Bachelor of Science (B.S.) in Data Science and Applications at IIT Madras. I specialize in designing backend architectures, deploying clean REST APIs using FastAPI/Flask, manipulating datasets with Pandas, and presenting highly functional interfaces.
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-6 border-t-4 border-black border-dashed">
              <div className="border-2 border-black p-3 bg-brutal-purple/10">
                <span className="block font-mono text-xs font-extrabold text-brutal-purple uppercase">ACADEMICS</span>
                <span className="font-sans font-extrabold text-sm md:text-base text-black uppercase">IIT Madras (BS DS)</span>
              </div>
              <div className="border-2 border-black p-3 bg-brutal-orange/10">
                <span className="block font-mono text-xs font-extrabold text-brutal-orange uppercase">SPECIALTY</span>
                <span className="font-sans font-extrabold text-sm md:text-base text-black uppercase">AI / ML / Backends</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
