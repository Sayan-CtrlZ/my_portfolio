import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, Github, Linkedin, ArrowUp, Send, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [utcTime, setUtcTime] = useState("");

  // Keep a live UTC clock ticking, which is very Neo-Brutalist
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().slice(0, 19).replace("T", " ") + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
            },
          }
        );
        return;
      }

      // Simple hard cut-in, no easing, matching the brutalist "snap" feel
      gsap.fromTo(
        footerRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "none", // NO easing
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmailInput("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="py-20 px-6 md:px-12 lg:px-24 bg-brutal-orange border-b-4 border-black relative overflow-hidden"
    >
      {/* Brutalist scratch marks and grid in the background */}
      <div className="absolute inset-0 brutal-scratches opacity-15 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute inset-0 brutal-crosshatch opacity-10 pointer-events-none"></div>

      <div ref={footerRef} className="max-w-[1600px] w-full mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Call to Action Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b-4 border-black pb-12">
          <div className="max-w-xl">
            <span className="bg-white text-black font-mono font-bold text-xs px-3 py-1 uppercase shadow-brutal-sm rotate-[1deg] inline-block mb-3">
              LET'S BIND CHANNELS
            </span>
            <h2 className="text-4xl md:text-7xl font-black uppercase text-black leading-none">
              HAVE A PROJECT IN MIND?
            </h2>
            <p className="font-mono text-sm font-bold text-black/80 mt-4 leading-relaxed">
              Drop me an email, reach out on social channels, or submit your email to receive backend engineering and data science articles directly.
            </p>
          </div>

          {/* Simple Contact Form */}
          <form
            onSubmit={handleSubscribe}
            className="w-full md:w-96 flex flex-col gap-3 p-4 bg-white border-4 border-black shadow-brutal rotate-[-0.5deg]"
          >
            <label className="font-mono text-xs font-black text-black">
              NEWSLETTER.EXE //
            </label>
            <div className="flex border-2 border-black">
              <input
                type="email"
                placeholder="YOUR_EMAIL@DOMAIN.COM"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-brutal-light px-3 py-2 font-mono text-xs font-bold text-black placeholder-black/40 focus:outline-none w-full border-r-2 border-black"
                required
              />
              <button
                type="submit"
                className="bg-brutal-yellow hover:bg-brutal-yellow/90 px-4 py-2 text-black cursor-pointer flex items-center justify-center font-black"
              >
                {isSubmitted ? <Check className="w-4 h-4 text-black" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            {isSubmitted && (
              <span className="font-mono text-[10px] font-black text-brutal-purple uppercase">
                ★ SECURELY ADDED TO QUEUE!
              </span>
            )}
          </form>
        </div>

        {/* Dynamic Connect Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a
            href="mailto:officialsayan36@gmail.com"
            className="brutal-btn-hover flex items-center justify-between p-5 bg-white border-4 border-black shadow-brutal text-black"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6" />
              <div>
                <span className="block font-mono text-[10px] font-bold text-gray-400">SEND EMAIL</span>
                <span className="font-sans font-black text-sm uppercase">officialsayan36@gmail.com</span>
              </div>
            </div>
          </a>

          <a
            href="https://github.com/Sayan-CtrlZ"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn-hover flex items-center justify-between p-5 bg-brutal-yellow border-4 border-black shadow-brutal text-black rotate-[0.5deg]"
          >
            <div className="flex items-center gap-3">
              <Github className="w-6 h-6" />
              <div>
                <span className="block font-mono text-[10px] font-bold text-black/60">SOURCE REPOS</span>
                <span className="font-sans font-black text-sm uppercase">GITHUB / Sayan-CtrlZ</span>
              </div>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/22sayanshil/"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn-hover flex items-center justify-between p-5 bg-brutal-green border-4 border-black shadow-brutal text-black rotate-[-1deg]"
          >
            <div className="flex items-center gap-3">
              <Linkedin className="w-6 h-6" />
              <div>
                <span className="block font-mono text-[10px] font-bold text-black/60">WORK HISTORY</span>
                <span className="font-sans font-black text-sm uppercase">LINKEDIN / CONNECT</span>
              </div>
            </div>
          </a>
        </div>

        {/* Footer Bottom Metadata and Scroll to Top */}
        <div className="mt-12 pt-8 border-t-4 border-black flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-mono text-xs font-bold text-black">
              © 2026 Sayan_CtrlZ. NO COPYRIGHTS RECLAIMABLE.
            </span>
            <span className="font-mono text-[10px] text-black/70 flex items-center gap-1.5 font-bold">
              SYSTEM_TIME: {utcTime}
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="brutal-btn-hover bg-black text-white px-4 py-3 border-4 border-black shadow-brutal-sm flex items-center gap-2 font-mono text-xs font-black cursor-pointer"
          >
            SCROLL TO TOP <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
