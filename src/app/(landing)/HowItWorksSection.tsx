'use client';

import React, { useRef } from 'react';
import { Fredoka, Nunito } from 'next/font/google';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// Cute Fonts
const fredoka = Fredoka({ 
  weight: ['400', '600'], 
  subsets: ['latin'],
  variable: '--font-fredoka', 
});

const nunito = Nunito({ 
  subsets: ['latin'], 
  variable: '--font-nunito',
});

export default function HowItWorksSection() {
  const containerRef = useRef(null);
  
  // Track Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the scroll value so the car doesn't jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Convert progress (0-1) to percentage string (0%-100%) for the car movement
  const offsetDistance = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef} 
      className={`${fredoka.variable} ${nunito.variable} relative py-32 overflow-hidden bg-[#E8F5E9]`}
    >
      
      {/* HEADER */}
      <div className="text-center mb-24 relative z-10 px-6">
        <div className="inline-block bg-[#A5D6A7] text-[#1B5E20] font-fredoka px-6 py-2 rounded-full text-lg mb-6 shadow-sm -rotate-2">
          🗺️ The Game Plan
        </div>
        <h2 className="font-fredoka text-5xl md:text-7xl text-[#2E7D32] leading-none drop-shadow-sm">
          LEVEL UP <br/>
          <span className="text-[#66BB6A]">YOUR TRIP.</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto relative px-6">
        
        {/* --- THE GAME BOARD (SVG PATH) --- */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[4px] md:-translate-x-1/2 h-full z-0">
          
          {/* 1. The Winding Road (SVG) */}
          <svg className="absolute top-0 left-0 w-full h-full overflow-visible hidden md:block" preserveAspectRatio="none">
            {/* The Track (White Dashed Line) */}
            <path
              d="M 0 0 Q 400 300 0 600 T 0 1200"
              fill="none"
              stroke="white"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="30 30"
              className="opacity-60"
            />
            
            {/* The Progress Fill (Green Line) */}
            <motion.path
              d="M 0 0 Q 400 300 0 600 T 0 1200"
              fill="none"
              stroke="#66BB6A"
              strokeWidth="20"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress }}
            />
          </svg>

          {/* 2. THE PLAYER (Blue Car Avatar) */}
          {/* We use 'offsetPath' in CSS to make the car stick to the curved line */}
          <motion.div
            className="hidden md:block absolute top-0 left-0 w-24 h-24 z-30 drop-shadow-2xl"
            style={{
              offsetPath: "path('M 0 0 Q 400 300 0 600 T 0 1200')",
              offsetDistance: offsetDistance,
              rotate: "auto", // Makes the car turn with the road
            }}
          >
            <img 
              src="/avatar-car.png" 
              alt="Player One" 
              className="w-full h-full object-contain -rotate-90" // Adjust rotation if car faces wrong way
            />
          </motion.div>
          
          {/* Mobile Fallback: Straight Line */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-2 bg-white/50 border-l-4 border-dashed border-white"></div>
        </div>

        {/* --- THE CHECKPOINTS (Pins & Content) --- */}
        <div className="space-y-48 relative z-10 pt-20">

          {/* LEVEL 1: START */}
          <div className="flex flex-col md:flex-row items-center gap-8 relative">
            {/* Pin Asset */}
            <div className="w-24 h-24 md:absolute md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 hover:scale-110 transition-transform cursor-pointer">
              <img src="/pin-start.png" alt="Start" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            
            {/* Content (Left) */}
            <div className="w-full md:w-1/2 md:pr-24 text-center md:text-right">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_0_#C8E6C9] border-4 border-[#C8E6C9] rotate-[-2deg] hover:rotate-0 transition-transform group">
                <h3 className="font-fredoka text-3xl text-[#2E7D32] mb-2 group-hover:scale-105 transition-transform origin-right">The Spark ✨</h3>
                <p className="font-nunito text-[#4CAF50] font-bold text-lg">
                  Send the link. "Goa '26?"<br/> No dates. No stress. Just vibes.
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2" />
          </div>

          {/* LEVEL 2: LOCK */}
          <div className="flex flex-col md:flex-row items-center gap-8 relative">
            {/* Pin Asset */}
            <div className="w-24 h-24 md:absolute md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 hover:scale-110 transition-transform cursor-pointer">
              <img src="/pin-lock.png" alt="Lock" className="w-full h-full object-contain drop-shadow-lg" />
            </div>

            <div className="hidden md:block w-1/2" />
            
            {/* Content (Right) */}
            <div className="w-full md:w-1/2 md:pl-24 text-center md:text-left">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_0_#FFCC80] border-4 border-[#FFCC80] rotate-[2deg] hover:rotate-0 transition-transform group">
                <h3 className="font-fredoka text-3xl text-[#EF6C00] mb-2 group-hover:scale-105 transition-transform origin-left">The Lock-In 🔒</h3>
                <p className="font-nunito text-[#FB8C00] font-bold text-lg">
                  Everyone commits ₹5k.<br/> Money locked = No flaking allowed.
                </p>
              </div>
            </div>
          </div>

          {/* LEVEL 3: VICTORY */}
          <div className="flex flex-col md:flex-row items-center gap-8 relative">
            {/* Pin Asset */}
            <div className="w-24 h-24 md:absolute md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 hover:scale-110 transition-transform cursor-pointer">
              <img src="/pin-flag.png" alt="Win" className="w-full h-full object-contain drop-shadow-lg" />
            </div>

            {/* Content (Left) */}
            <div className="w-full md:w-1/2 md:pr-24 text-center md:text-right">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_0_#81D4FA] border-4 border-[#81D4FA] rotate-[-1deg] hover:rotate-0 transition-transform group">
                <h3 className="font-fredoka text-3xl text-[#0277BD] mb-2 group-hover:scale-105 transition-transform origin-right">Victory 🏁</h3>
                <p className="font-nunito text-[#039BE5] font-bold text-lg">
                  Polls pick the dates. Receipts split automatically. The trip actually happens.
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2" />
          </div>

        </div>

      </div>
    </section>
  );
}