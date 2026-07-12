import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, Github, Linkedin, ArrowUp, Send, Check, Phone, Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (window.matchMedia("(max-width: 768px)").matches) return;
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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email.trim() && formData.message.trim()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => setIsSubmitted(false), 3000);
          setFormData({ name: "", email: "", message: "" });
        } else {
          alert("TRANSMISSION FAILED. SERVER OFFLINE.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("TRANSMISSION FAILED. NETWORK ERROR.");
      } finally {
        setIsSubmitting(false);
      }
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
        {/* Massive Call to Action Block */}
        <div className="mb-4 border-4 border-black bg-white p-8 md:p-14 shadow-brutal-lg rotate-[-0.5deg]">
          <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-black uppercase text-black leading-[0.9] tracking-tighter mb-8">
            HAVE A PROJECT<br/><span className="text-brutal-purple">IN MIND?</span>
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center justify-between border-t-4 border-black pt-8">
            <p className="font-mono text-lg md:text-xl font-bold text-black/80 max-w-xl leading-relaxed mt-2">
              Drop me an email, reach out on social channels, or use the terminal below to send a direct ping. I typically respond within 24 hours.
            </p>
            
            <form onSubmit={handleSubscribe} className="w-full lg:w-[600px] flex flex-col gap-4 border-4 border-black bg-brutal-light p-6 shadow-brutal relative rotate-[1deg]">
              <div className="absolute -top-4 -left-3 bg-brutal-yellow border-2 border-black px-2 py-0.5 font-mono text-[10px] font-black rotate-[-3deg] z-10">CONTACT.EXE</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="NAME / ALIAS" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white px-4 py-3 font-mono text-sm font-black text-black placeholder-black/50 focus:outline-none border-2 border-black" 
                  required 
                />
                <input 
                  type="email" 
                  placeholder="YOUR@EMAIL.COM" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white px-4 py-3 font-mono text-sm font-black text-black placeholder-black/50 focus:outline-none border-2 border-black" 
                  required 
                />
              </div>
              <textarea 
                placeholder="PROJECT DETAILS / MESSAGE..." 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full bg-white px-4 py-3 font-mono text-sm font-black text-black placeholder-black/50 focus:outline-none border-2 border-black resize-none" 
                required 
              />
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-brutal-green py-4 text-white hover:text-black font-black flex items-center justify-center gap-3 transition-colors cursor-pointer group border-2 border-black shadow-brutal-sm active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>TRANSMITTING...</>
                ) : isSubmitted ? (
                  <><Check className="w-5 h-5" /> TRANSMISSION SENT</>
                ) : (
                  <>INITIATE CONNECTION <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Massive Contact Links */}
        <div className="flex flex-col gap-6">
          {/* Main Email Action */}
          <a 
            href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} 
            className="group brutal-btn-hover w-full bg-white border-4 border-black p-6 md:p-10 shadow-brutal flex flex-col md:flex-row justify-between items-start md:items-center gap-6 rotate-[0.5deg]"
          >
            <div className="flex items-center gap-6 md:gap-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brutal-orange border-4 border-black flex items-center justify-center shadow-brutal-sm group-hover:rotate-12 transition-transform shrink-0">
                <Mail className="w-8 h-8 md:w-10 md:h-10 text-black" />
              </div>
              <div className="flex flex-col justify-center overflow-hidden">
                <span className="block font-mono text-xs md:text-sm font-bold text-black/60 mb-1">PRIMARY_CONTACT_PROTOCOL</span>
                <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight truncate w-full break-all">{import.meta.env.VITE_CONTACT_EMAIL}</span>
              </div>
            </div>
            <span className="font-mono text-sm font-black bg-brutal-yellow px-6 py-3 border-4 border-black shadow-brutal-sm hidden md:block group-hover:bg-brutal-green transition-colors">
              INITIATE_PING
            </span>
          </a>

          {/* Socials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
            
            <a href="https://github.com/Sayan-CtrlZ" target="_blank" rel="noopener noreferrer" className="group brutal-btn-hover bg-brutal-yellow border-4 border-black p-6 md:p-8 shadow-brutal flex flex-col justify-between min-h-[180px] rotate-[-1deg]">
               <Github className="w-10 h-10 md:w-12 md:h-12 mb-6 group-hover:-translate-y-2 group-hover:scale-110 transition-transform text-black" />
               <div>
                  <span className="block font-mono text-[10px] font-bold text-black/60 mb-1">SOURCE REPOS</span>
                  <span className="text-2xl font-black uppercase block leading-none">GITHUB</span>
               </div>
            </a>
            
            <a href="https://www.linkedin.com/in/22sayanshil/" target="_blank" rel="noopener noreferrer" className="group brutal-btn-hover bg-brutal-green border-4 border-black p-6 md:p-8 shadow-brutal flex flex-col justify-between min-h-[180px] rotate-[1deg]">
               <Linkedin className="w-10 h-10 md:w-12 md:h-12 mb-6 group-hover:-translate-y-2 group-hover:scale-110 transition-transform text-black" />
               <div>
                  <span className="block font-mono text-[10px] font-bold text-black/60 mb-1">WORK HISTORY</span>
                  <span className="text-2xl font-black uppercase block leading-none">LINKEDIN</span>
               </div>
            </a>
            
            <a href="tel:+918974637506" className="group brutal-btn-hover bg-brutal-pink border-4 border-black p-6 md:p-8 shadow-brutal flex flex-col justify-between min-h-[180px] rotate-[-0.5deg]">
               <Phone className="w-10 h-10 md:w-12 md:h-12 mb-6 group-hover:-translate-y-2 group-hover:scale-110 transition-transform text-black" />
               <div>
                  <span className="block font-mono text-[10px] font-bold text-black/60 mb-1">CALL DIRECTLY</span>
                  <span className="text-xl font-black uppercase block leading-none tracking-tighter">+91 8974637506</span>
               </div>
            </a>
            
            <a href="https://www.instagram.com/sayan_ctrlz" target="_blank" rel="noopener noreferrer" className="group brutal-btn-hover bg-brutal-cyan border-4 border-black p-6 md:p-8 shadow-brutal flex flex-col justify-between min-h-[180px] rotate-[0.5deg]">
               <Instagram className="w-10 h-10 md:w-12 md:h-12 mb-6 group-hover:-translate-y-2 group-hover:scale-110 transition-transform text-black" />
               <div>
                  <span className="block font-mono text-[10px] font-bold text-black/60 mb-1">SOCIAL MEDIA</span>
                  <span className="text-2xl font-black uppercase block leading-none">IG / sayan</span>
               </div>
            </a>

          </div>
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
