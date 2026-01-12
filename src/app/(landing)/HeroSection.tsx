'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Fredoka, Nunito } from 'next/font/google';
import Link from 'next/link';

const fredoka = Fredoka({ 
  weight: ['400', '600'], 
  subsets: ['latin'],
  variable: '--font-fredoka', 
});

const nunito = Nunito({ 
  subsets: ['latin'], 
  variable: '--font-nunito',
});

export default function HeroSection() {
  return (
    <section className={`${fredoka.variable} ${nunito.variable} w-full min-h-screen bg-[#FDFCF8] flex flex-col items-center relative overflow-x-hidden`}>
      
      {/* 1. THE HERO IMAGE (Full Width & Blended) */}
      <div className="w-full relative z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFCF8] z-10" />
        {/* We use a mask to fade the bottom edge so it doesn't look "pasted" */}
        <img 
          src="/hero-puffy.jpg" 
          alt="The Pact - Travel Planning" 
          className="w-full h-auto min-h-[60vh] object-cover object-center"
          style={{ 
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' 
          }}
        />
      </div>

      {/* 2. THE CONTENT (Floating Over the Fade) */}
      {/* Negative margin pulls this up to sit on top of the blended image area */}
      <div className="relative z-20 -mt-24 md:-mt-48 text-center space-y-6 px-4">
        
        {/* Subtitle pill */}
        <div className="inline-block bg-white/60 backdrop-blur-xl border border-white/50 px-6 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] animate-fade-in-up">
          <span className="font-nunito font-bold text-[#8FAAFF] text-lg tracking-wide">
            ✨ Bestie trips, finally happening.
          </span>
        </div>

        {/* 3. THE "SQUISHY" BUTTON (Linked) */}
        <div className="pt-2">
            <Link href="/enter">
              <button className="group relative inline-flex items-center justify-center gap-3 bg-[#FF9EAA] hover:bg-[#FF8FAB] text-white px-12 py-5 rounded-3xl shadow-[0_12px_25px_rgba(255,158,170,0.4)] active:shadow-[0_4px_0_rgb(200,100,110)] active:translate-y-[6px] transition-all duration-200">
                <span className="font-fredoka font-semibold text-2xl tracking-wide">
                  Start Planning
                </span>
                <ArrowRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
              </button>
            </Link>
        </div>
        
        <p className="font-nunito text-[#B0B8C1] text-sm font-bold opacity-80">
          No more group chat chaos. ☁️
        </p>
      </div>

    </section>
  );
}