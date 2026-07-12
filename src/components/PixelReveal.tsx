import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function PixelReveal() {
  const container = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useGSAP(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      gsap.to(".pixel-block", {
        opacity: 0,
        duration: 0.5,
      });
      return;
    }

    gsap.to(".pixel-block", {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      stagger: {
        amount: 1.5,
        from: "random",
        grid: [10, 10]
      },
      ease: "power2.inOut",
      delay: 0.3
    });
  }, { scope: container });

  if (isMobile) return null;

  // 10x10 grid = 100 blocks
  return (
    <div ref={container} className="absolute inset-0 z-30 grid grid-cols-10 grid-rows-10 pointer-events-none">
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} className="pixel-block bg-black w-full h-full border-[0.5px] border-black/20" />
      ))}
    </div>
  );
}
