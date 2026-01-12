'use client';

import React from 'react';
import { Fredoka, Nunito } from 'next/font/google';

const fredoka = Fredoka({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export default function FooterSection() {
  return (
    <footer className={`${fredoka.variable} ${nunito.variable} bg-[#E8F5E9] pt-24 pb-12 px-6 text-center relative overflow-hidden`}>
      
      {/* 1. GIANT TEXT BACKGROUND */}
      <div className="absolute bottom-0 left-0 w-full leading-none select-none pointer-events-none opacity-5">
        <span className="font-fredoka text-[15vw] text-[#2E7D32] whitespace-nowrap">
          NO MORE FLAKING
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* 2. SOCIAL STICKERS */}
        <div className="flex justify-center gap-6 mb-12">
          <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm hover:scale-110 hover:-rotate-6 transition-transform cursor-pointer">
            📸
          </a>
          <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm hover:scale-110 hover:rotate-6 transition-transform cursor-pointer">
            🐦
          </a>
          <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm hover:scale-110 hover:-rotate-3 transition-transform cursor-pointer">
            🎵
          </a>
        </div>

        {/* 3. COPYRIGHT */}
        <p className="font-nunito text-[#4A5568] font-bold text-sm opacity-60">
          © 2026 Trip Utility Corp. <br/>
          Made with 💖 and too much caffeine.
        </p>
        
        <div className="mt-8 flex justify-center gap-4 text-xs font-nunito text-[#4A5568] opacity-40">
          <span className="cursor-pointer hover:opacity-100">Privacy</span>
          <span>•</span>
          <span className="cursor-pointer hover:opacity-100">Terms</span>
        </div>
      </div>
    </footer>
  );
}