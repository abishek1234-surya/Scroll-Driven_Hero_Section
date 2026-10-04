"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin safely for client execution
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const metricsRef = useRef(null);
  const carRef = useRef(null);

  useGSAP(() => {
    // 1. INITIAL LOAD ANIMATION (Fade + Staggered Reveal)
    const tl = gsap.timeline();
    
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    tl.fromTo(
      metricsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.6" // Subtle delay overlap
    );

    // 2. SCROLL-DRIVEN HERO ANIMATION (Core Feature)
    // Ties the car movement smoothly to scroll progress instead of time
    gsap.to(carRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",      // Starts as soon as the hero section hits the top of the viewport
        end: "bottom top",     // Ends when the hero section leaves the viewport completely
        scrub: 1,              // Smooth interpolation (1-second catchup delay)
      },
      yPercent: 80,            // Hardware-accelerated translate transformation
      scale: 1.25,             // Fluid scaling change
      rotation: 15,            // Subtle natural rotation angle tilt
      ease: "none"             // Necessary for uniform scroll-to-motion calculation
    });

  }, { scope: containerRef });

  return (
    // Height extended to 200vh to give space to scroll and trigger animations
    <main ref={containerRef} className="relative bg-neutral-950 text-white min-h-[200vh] font-sans selection:bg-red-500 overflow-x-hidden">
      
      {/* Sticky Hero section covering the first viewport screen above the fold */}
      <section className="sticky top-0 h-screen w-full flex flex-col justify-between items-center py-16 px-4 z-10">
        
        {/* Letter-spaced Main Headline */}
        <h1 
          ref={headlineRef} 
          className="text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.3em] text-center uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 select-none pt-8"
        >
          W E L C O M E I T Z F I Z Z
        </h1>

        {/* Central Interacting Object Block (Using a Placeholder styled Box/Car Frame) */}
        <div className="w-full flex justify-center items-center my-auto">
          <div 
            ref={carRef}
            className="w-64 h-32 md:w-96 md:h-48 bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.3)] will-change-transform"
          >
            <span className="text-xl font-bold uppercase tracking-widest text-black bg-white px-4 py-1 rounded-full shadow-md">
              🏎️ CAR OBJECT
            </span>
          </div>
        </div>

        {/* Dynamic Multi-column Responsive Statistics Layout */}
        <div 
          ref={metricsRef} 
          className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border-t border-neutral-800/60 pt-8 bg-neutral-950/40 backdrop-blur-md rounded-xl p-4"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-extrabold text-red-500">58%</span>
            <span className="text-xs md:text-sm text-neutral-400 mt-1 max-w-[180px]">Increase in pick up point use</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-extrabold text-red-500">23%</span>
            <span className="text-xs md:text-sm text-neutral-400 mt-1 max-w-[180px]">Decreased in customer phone calls</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-extrabold text-red-500">27%</span>
            <span className="text-xs md:text-sm text-neutral-400 mt-1 max-w-[180px]">Increase in pick up point use</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-extrabold text-red-500">40%</span>
            <span className="text-xs md:text-sm text-neutral-400 mt-1 max-w-[180px]">Decreased in customer phone calls</span>
          </div>
        </div>

      </section>

      {/* Simulated content block below the fold to allow active page scrolling */}
      <section className="relative h-screen w-full bg-neutral-900 border-t border-neutral-800 flex justify-center items-center z-20">
        <p className="text-neutral-500 text-sm md:text-base tracking-wider font-mono">
          [ Scroll Up to Re-trigger Scroll Action Animations ]
        </p>
      </section>

    </main>
  );
}
