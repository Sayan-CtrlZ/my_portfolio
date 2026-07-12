import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function HoverPixelImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const gridSize = 30; // 30x30 grid of blocks
  const totalBlocks = gridSize * gridSize;

  useGSAP(() => {
    // Intro animation: exact animation we get on opening the site
    gsap.to(".pixel-block", {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      stagger: {
        amount: 1.5,
        from: "random",
        grid: [gridSize, gridSize]
      },
      ease: "power2.inOut",
      delay: 0.3
    });
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const blockWidth = rect.width / gridSize;
    const blockHeight = rect.height / gridSize;

    const col = Math.floor(x / blockWidth);
    const row = Math.floor(y / blockHeight);

    const radius = 4; // small radius around pointer

    const blocks = gridRef.current.children;
    for (let i = 0; i < totalBlocks; i++) {
      const bCol = i % gridSize;
      const bRow = Math.floor(i / gridSize);

      const dist = Math.sqrt(Math.pow(bCol - col, 2) + Math.pow(bRow - row, 2));

      if (dist <= radius) {
        // Bring the block back and fade it out
        gsap.killTweensOf(blocks[i]);
        gsap.fromTo(blocks[i], 
          { opacity: 1, scale: 1 }, 
          { opacity: 0, scale: 0, duration: 0.5, ease: "power2.out", delay: 0.05 }
        );
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full border-4 border-black aspect-square overflow-hidden bg-white cursor-crosshair group"
      onMouseMove={handleMouseMove}
    >
      {/* Brutalist background patterns for transparent images */}
      <div className="absolute inset-0 brutal-crosshatch opacity-30 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 brutal-scratches opacity-20 pointer-events-none" />

      {/* Base Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover relative z-10"
      />

      {/* Grid Overlay */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-20 grid pointer-events-none"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <div 
            key={i} 
            className="pixel-block bg-white w-full h-full border-[0.5px] border-black/20" 
          />
        ))}
      </div>
    </div>
  );
}
