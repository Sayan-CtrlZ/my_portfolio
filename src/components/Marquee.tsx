import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Track 1 moves left to right on scroll
      gsap.fromTo(
        track1Ref.current,
        { x: "-10%" },
        {
          x: "10%",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Smooth scrub
          },
        }
      );

      // Track 2 moves right to left on scroll
      gsap.fromTo(
        track2Ref.current,
        { x: "10%" },
        {
          x: "-10%",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Smooth scrub
          },
        }
      );
    },
    { scope: containerRef }
  );

  const text = "PYTHON POWERED ★ DATA SCIENCE & AI/ML ★ FASTAPI PIPELINES ★ IIT MADRAS ★ POSTGRESQL & SQL ★ PANDAS DATA ANALYSIS ★ AGARTALA ★ ";

  return (
    <div
      id="marquee-section"
      ref={containerRef}
      className="py-12 bg-brutal-dark border-y-4 border-black overflow-hidden flex flex-col gap-6 select-none my-12 rotate-1 md:-rotate-1 scale-102"
    >
      {/* Track 1 */}
      <div className="flex whitespace-nowrap" aria-hidden="true">
        <div
          ref={track1Ref}
          className="text-4xl md:text-7xl font-mono font-extrabold uppercase text-brutal-yellow tracking-wider flex shrink-0"
        >
          {text + text}
        </div>
      </div>

      {/* Track 2 */}
      <div className="flex whitespace-nowrap" aria-hidden="true">
        <div
          ref={track2Ref}
          className="text-4xl md:text-7xl font-sans font-black uppercase text-brutal-green tracking-tight flex shrink-0"
        >
          {text + text}
        </div>
      </div>
    </div>
  );
}
