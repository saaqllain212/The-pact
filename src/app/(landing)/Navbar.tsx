'use client';

import React, { useState, useEffect } from 'react';
import { Fredoka, Nunito } from 'next/font/google';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fredoka = Fredoka({ weight: ['600'], subsets: ['latin'], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Hide navbar when scrolling down, show when scrolling up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`${fredoka.variable} ${nunito.variable} fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none`}
    >
      <div className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full px-6 py-3 flex items-center gap-8 md:gap-12 min-w-[320px] justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="text-2xl">☁️</span>
          <span className="font-fredoka text-xl text-[#4A5568] group-hover:text-[#FF9EAA] transition-colors">
            The Pact
          </span>
        </div>

        {/* CTA BUTTON (Linked) */}
        <Link href="/enter">
          <button className="bg-[#FF4F00] hover:bg-[#E64A19] text-white font-nunito font-bold text-sm px-5 py-2.5 rounded-full shadow-lg transition-all active:scale-95 flex items-center gap-2">
            Join Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>

      </div>
    </motion.nav>
  );
}