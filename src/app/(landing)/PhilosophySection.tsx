'use client';

import React, { useState } from 'react';
import { Fredoka, Nunito } from 'next/font/google';

const fredoka = Fredoka({ 
  weight: ['400', '600'], 
  subsets: ['latin'],
  variable: '--font-fredoka', 
});

const nunito = Nunito({ 
  subsets: ['latin'], 
  variable: '--font-nunito',
});

export default function PhilosophySection() {
  // Mouse Parallax State
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Track mouse movement for that "3D" feel
  const handleMouseMove = (e: React.MouseEvent) => {
    // We divide by window size to get a small percentage value
    const x = (e.clientX / window.innerWidth) * 20; // 20px max movement
    const y = (e.clientY / window.innerHeight) * 20;
    setOffset({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className={`${fredoka.variable} ${nunito.variable} relative w-full py-32 md:py-64 bg-[#E0F7FA] overflow-hidden flex flex-col items-center text-center`}
    >
      
      {/* --- 1. THE FLOATING CLOUDS (With Parallax + CSS Animation) --- */}
      
      {/* Cloud 1 (Top Left) - Moves fast */}
      <div 
        className="absolute top-10 -left-10 md:top-20 md:left-20 w-32 md:w-64 opacity-90 pointer-events-none animate-float-medium"
        style={{ 
          transform: `translate(${offset.x * -1}px, ${offset.y * -1}px)`, // Parallax Logic
        }}
      >
        <img src="/cloud-1.png" alt="Cloud" className="w-full h-auto drop-shadow-xl" />
      </div>

      {/* Cloud 2 (Bottom Right) - Moves slow */}
      <div 
        className="absolute bottom-10 -right-10 md:bottom-20 md:right-32 w-40 md:w-80 opacity-90 pointer-events-none animate-float-slow"
        style={{ 
          transform: `translate(${offset.x * 2}px, ${offset.y * 2}px)`, 
        }}
      >
        <img src="/cloud-1.png" alt="Cloud" className="w-full h-auto drop-shadow-xl" />
      </div>

      {/* Cloud 3 (Tiny/Distant) - Moves very slow */}
      <div 
        className="absolute top-40 right-10 w-24 md:w-40 opacity-60 pointer-events-none hidden md:block animate-float-fast"
        style={{ 
          transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)`, 
        }}
      >
        <img src="/cloud-1.png" alt="Cloud" className="w-full h-auto drop-shadow-sm" />
      </div>

      {/* --- 2. MAIN CONTENT --- */}
      <div className="relative z-10 container mx-auto px-6">
        
        {/* Vibe Tag */}
        <div className="inline-block mb-8 animate-fade-in-up">
          <span className="bg-white/60 backdrop-blur-md border border-white/80 text-[#5D9CEC] font-nunito font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest shadow-sm">
            The Vibe Check
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-fredoka text-4xl md:text-7xl text-[#4A5568] leading-[1.1] mb-8 md:mb-12 max-w-4xl mx-auto drop-shadow-sm">
          Plans change. <br/>
          <span className="text-[#4FC3F7] drop-shadow-[2px_2px_0px_#fff]">Memories</span> don't.
        </h2>

        {/* Subtitle */}
        <p className="font-nunito text-lg md:text-2xl text-[#718096] max-w-2xl mx-auto leading-relaxed font-semibold">
          Whether you make the flight or just screenshot the itinerary—the group chat lives forever.
        </p>

        {/* Floating Toy (Heart/Peace) */}
        <div className="mt-16 relative inline-block group cursor-pointer hover:scale-110 transition-transform duration-300">
           {/* Fallback Emoji */}
           <div className="text-6xl md:text-8xl drop-shadow-xl select-none animate-bounce-slow">
             💖
           </div>
        </div>

      </div>
    </section>
  );
}