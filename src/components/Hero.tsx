import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, Terminal, Sparkles, Code2 } from "lucide-react";
import HoverPixelImage from "./HoverPixelImage";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  { text: "PYTHON DEVELOPER", color: "bg-brutal-yellow" },
  { text: "DATA SCIENTIST", color: "bg-brutal-green" },
  { text: "DATA ANALYST", color: "bg-brutal-pink" },
  { text: "BACKEND CODER", color: "bg-brutal-purple text-white" }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = ROLES[currentRoleIndex].text;

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(60);

        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(30);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
          setTypingSpeed(200);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const timeline = gsap.timeline();

      if (prefersReducedMotion) {
        // Reduced motion: simple fade-in
        timeline.from(".stagger-word", {
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        });
        timeline.from(
          ".fade-in-element",
          {
            opacity: 0,
            duration: 0.4,
          },
          "-=0.3"
        );
      } else {
        // Full brutalist animation: scale-in + slide-up + overshoot
        timeline.fromTo(
          ".stagger-word",
          {
            y: 80,
            rotate: -4,
            opacity: 0,
            scale: 0.85,
          },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "back.out(1.5)",
          }
        );

        // Slide elements from bottom with a snappy bounce
        timeline.fromTo(
          ".fade-in-element",
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.1,
          },
          "-=0.3"
        );

        // Slow hover rotation for the corner badge
        gsap.to(".spinning-badge", {
          rotate: 360,
          duration: 15,
          repeat: -1,
          ease: "linear",
        });

        // 360° scroll-linked rotation & reveal effect on scroll down
        gsap.to(".hero-scroll-rotate", {
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

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-center items-start px-6 md:px-12 lg:px-24 pt-24 pb-12 overflow-hidden bg-brutal-light border-b-4 border-black"
    >
      {/* Structural Grid lines background to give the Neo-Brutalist layout look */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 pointer-events-none opacity-5">
        <div className="border-r border-black h-full"></div>
        <div className="border-r border-black h-full"></div>
        <div className="border-r border-black h-full hidden md:block"></div>
        <div className="h-full"></div>
      </div>

      {/* Industrial scratch lines and drafting guidelines */}
      <div className="absolute inset-0 brutal-scratches opacity-15 pointer-events-none"></div>
      <div className="absolute inset-0 brutal-crosshatch opacity-10 pointer-events-none"></div>

      {/* Decorative mechanical crosshairs */}
      <div className="absolute top-8 right-8 font-mono text-[10px] text-black/35 select-none pointer-events-none hidden md:block">
        + SYS_LOC_0x7FFF / CHASSIS_ACTIVE +
      </div>

      <div className="hero-scroll-rotate relative z-10 max-w-[1600px] w-full flex flex-col lg:flex-row gap-12 origin-center mx-auto items-center">
        
        {/* Left Side: Content */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
          {/* Dynamic Tag / Status */}
          <div className="fade-in-element flex flex-wrap gap-3 items-center">
          <span className="bg-brutal-orange text-black border-2 border-black font-mono font-bold text-xs md:text-sm px-3 py-1 uppercase shadow-brutal-sm flex items-center gap-1.5 rotate-[-1deg]">
            <Code2 className="w-4 h-4" /> PYTHON & BACKEND
          </span>
          <span className="bg-brutal-green text-black border-2 border-black font-mono font-bold text-xs md:text-sm px-3 py-1 uppercase shadow-brutal-sm flex items-center gap-1.5 rotate-[1.5deg]">
            <Sparkles className="w-4 h-4" /> DATA SCIENCE / AI / ML
          </span>
        </div>

        {/* Big Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter leading-[1.0] text-brutal-dark uppercase font-sans mt-4 flex flex-col gap-2 select-none"
        >
          <div className="flex flex-wrap gap-x-4 md:gap-x-6">
            <span className="stagger-word inline-block origin-bottom-left">Sayan</span>
            <span className="stagger-word inline-block origin-bottom-left text-brutal-purple stroke-4 stroke-black text-fill-transparent">CtrlZ</span>
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <span className={`stagger-word inline-block origin-bottom-left border-4 border-black px-4 py-2 shadow-brutal rotate-[-1deg] transition-all duration-300 whitespace-nowrap text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] ${ROLES[currentRoleIndex].color}`}>
              {currentText}
              <span className="animate-pulse ml-1 inline-block">_</span>
            </span>
          </div>
        </h1>

        {/* Pitch line */}
        <div className="fade-in-element mt-6 max-w-2xl border-4 border-black bg-white p-6 shadow-brutal rotate-[0.5deg]">
          <p className="font-mono text-base md:text-xl font-bold text-brutal-dark leading-relaxed">
            I am a full-stack Python developer and a 2nd-year B.Sc. student in Data Science & Applications at IIT Madras, crafting secure backends, robust REST APIs, and smart machine learning architectures.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="fade-in-element mt-8 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <button
            onClick={handleScrollToContact}
            className="group brutal-btn-hover w-full sm:w-auto flex items-center justify-center gap-2 bg-brutal-green text-black text-xl font-extrabold px-8 py-4 border-4 border-black shadow-brutal select-none cursor-pointer"
          >
            GET IN TOUCH
            <ArrowDownRight className="w-6 h-6 transition-transform group-hover:rotate-45" />
          </button>
          
          <a
            href="#projects"
            className="group brutal-btn-hover w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black text-xl font-extrabold px-8 py-4 border-4 border-black shadow-brutal text-center select-none cursor-pointer"
          >
            VIEW PROJECTS
          </a>
        </div>
        </div>

        {/* Right Side: Photo in Neo-Brutalist Laptop */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-start fade-in-element relative z-20 lg:-ml-12 lg:-mt-12">
          
          <div className="w-full max-w-[460px] lg:max-w-[580px] flex flex-col items-center rotate-[3deg] hover:rotate-0 hover:translate-y-[-6px] transition-all duration-300 group cursor-crosshair">
            
            {/* Laptop Screen / Lid */}
            <div className="w-full border-4 border-black bg-black p-3 sm:p-5 pb-6 sm:pb-8 shadow-brutal-lg relative z-20 rounded-t-xl lg:rounded-t-3xl flex flex-col">
              
              {/* Webcam */}
              <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center">
                 <div className="w-1 h-1 rounded-full bg-blue-500/50"></div>
              </div>
              
              {/* Screen Content (The Image) */}
              <div className="w-full aspect-square bg-brutal-light border-2 border-black overflow-hidden relative mt-1 sm:mt-2">
                <HoverPixelImage src="/image.png" alt="Sayan_CtrlZ" />
              </div>
              
              {/* Brand Logo on bottom bezel */}
              <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] text-white/70 font-mono tracking-widest select-none">
                SAYAN_OS
              </div>
            </div>

            {/* Laptop Base (Keyboard Deck) */}
            <div className="w-[108%] h-6 sm:h-10 border-4 border-black bg-brutal-orange shadow-brutal-lg -mt-1 relative z-10 rounded-b-xl lg:rounded-b-2xl flex flex-col justify-end items-center px-4 pb-1 sm:pb-1.5 transition-colors group-hover:bg-brutal-yellow">
              {/* Trackpad indentation */}
              <div className="w-16 sm:w-24 h-1.5 sm:h-3 border-2 border-black/40 bg-black/10 rounded-sm"></div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
