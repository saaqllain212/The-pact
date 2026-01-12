'use client';

import React, { useEffect, useState } from 'react';
import { Fredoka, Nunito } from 'next/font/google';
import { motion } from 'framer-motion';

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

export default function RealitySection() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Prevent hydration mismatch for random values
  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return <div className="h-screen bg-[#FFF8F0]" />;

  return (
    <section className={`${fredoka.variable} ${nunito.variable} relative py-32 px-6 overflow-hidden bg-[#FFF8F0]`}>
      
      {/* BACKGROUND DECOR (Polka Dots or faint pattern) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADLINE: Fun & Bouncy */}
        <div className="text-center mb-24 relative pointer-events-none">
          <div className="inline-block bg-[#FFD166] text-[#594A26] font-fredoka px-6 py-2 rounded-full text-lg mb-6 shadow-sm rotate-[-2deg]">
            🎯 This is literally us.
          </div>
          <h2 className="font-fredoka text-5xl md:text-7xl text-[#4A5568] leading-[0.95] drop-shadow-sm">
            HOW IT <br/>
            <span className="text-[#FF9EAA]">ACTUALLY</span> GOES.
          </h2>
        </div>

        {/* THE TOY BOX (Draggable Grid) */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 perspective-1000">

          {/* --- CARD 1: THE GHOST (Soft Pink) --- */}
          <motion.div 
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.05, rotate: 2, cursor: 'grab' }}
            whileTap={{ scale: 0.95, cursor: 'grabbing' }}
            className="relative"
          >
            {/* The 3D Icon Asset (Warning Triangle) */}
            <div className="absolute -top-12 left-[35%] w-24 h-24 z-20 drop-shadow-lg rotate-12 transition-transform hover:rotate-0 hover:scale-110">
              <img src="/icon-warning.png" alt="Ghosted" className="w-full h-full object-contain" />
            </div>
            
            <div className="bg-[#FFECEF] p-8 pt-16 rounded-[2.5rem] shadow-[0_20px_40px_rgba(255,158,170,0.2)] border-4 border-white rotate-[-2deg] hover:rotate-0 transition-all duration-300 relative overflow-hidden">
              <span className="font-nunito text-xs font-extrabold bg-[#FF9EAA] text-white px-3 py-1 rounded-full uppercase tracking-wide">Status: Ghosted</span>
              
              <h3 className="font-fredoka text-3xl text-[#5D4037] mt-4 leading-none mb-2">
                "I'm totally in."
              </h3>
              <p className="font-nunito text-[#8D6E63] font-bold text-lg rotate-[-1deg]">
                (Last seen: 3 weeks ago)
              </p>
            </div>
          </motion.div>

          {/* --- CARD 2: THE PLANNER (Soft Blue) --- */}
          <motion.div 
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.05, rotate: -2, cursor: 'grab' }}
            whileTap={{ scale: 0.95, cursor: 'grabbing' }}
            className="relative md:mt-12"
          >
             {/* The 3D Icon Asset (Crown) */}
             <div className="absolute -top-12 right-4 w-24 h-24 z-20 drop-shadow-lg rotate-[-12deg] transition-transform hover:rotate-0 hover:scale-110">
               <img src="/icon-crown.png" alt="Planner" className="w-full h-full object-contain" />
             </div>

            <div className="bg-[#E1F5FE] p-8 pt-16 rounded-[2.5rem] shadow-[0_20px_40px_rgba(79,195,247,0.2)] border-4 border-white rotate-[1deg] hover:rotate-0 transition-all duration-300 relative">
              <span className="font-nunito text-xs font-extrabold bg-[#29B6F6] text-white px-3 py-1 rounded-full uppercase tracking-wide">Role: The Mom</span>
              
              <h3 className="font-fredoka text-3xl text-[#01579B] mt-4 leading-none mb-3">
                One person plans everything.
              </h3>
              <div className="flex gap-2">
                <span className="bg-white/80 text-[#0277BD] font-nunito text-xs font-bold px-2 py-1 rounded-lg shadow-sm">👍 Looks good</span>
                <span className="bg-white/80 text-[#0277BD] font-nunito text-xs font-bold px-2 py-1 rounded-lg shadow-sm">👍 +1</span>
              </div>
            </div>
          </motion.div>

          {/* --- CARD 3: THE PROCRASTINATOR (Soft Orange) --- */}
          <motion.div 
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.05, rotate: 3, cursor: 'grab' }}
            whileTap={{ scale: 0.95, cursor: 'grabbing' }}
            className="relative"
          >
             {/* The 3D Icon Asset (Flying Money) */}
             <div className="absolute -top-12 left-4 w-24 h-24 z-20 drop-shadow-lg rotate-6 transition-transform hover:rotate-0 hover:scale-110">
               <img src="/icon-money.png" alt="Expensive" className="w-full h-full object-contain" />
             </div>

            <div className="bg-[#FFCCBC] p-8 pt-16 rounded-[2.5rem] shadow-[0_20px_40px_rgba(255,138,101,0.2)] border-4 border-white rotate-[3deg] hover:rotate-0 transition-all duration-300 relative">
              <span className="font-nunito text-xs font-extrabold bg-[#FF5722] text-white px-3 py-1 rounded-full uppercase tracking-wide">Time: Critical</span>
              
              <h3 className="font-fredoka text-3xl text-[#BF360C] mt-4 leading-none mb-2">
                "Let's book later."
              </h3>
              <p className="font-nunito text-[#D84315] font-bold text-lg rotate-1">
                (Price is now 3x)
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}