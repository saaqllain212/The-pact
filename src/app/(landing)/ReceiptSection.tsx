'use client';

import React from 'react';
import { Space_Mono, Fredoka } from 'next/font/google';
import { motion } from 'framer-motion';
import Link from 'next/link';

// 1. SETUP FONTS
// "Space Mono" looks exactly like a thermal printer receipt
const spaceMono = Space_Mono({ 
  weight: ['400', '700'], 
  subsets: ['latin'],
  variable: '--font-space', 
});

const fredoka = Fredoka({ 
  weight: ['600'], 
  subsets: ['latin'],
  variable: '--font-fredoka', 
});

export default function ReceiptSection() {
  return (
    <section className={`${spaceMono.variable} ${fredoka.variable} relative py-32 px-6 bg-[#E8F5E9] overflow-hidden flex justify-center`}>
      
      {/* 2. THE RECEIPT CONTAINER */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white shadow-2xl rotate-[-2deg]"
      >
        
        {/* --- JAGGED EDGE TOP (CSS Trick) --- */}
        <div className="absolute -top-4 left-0 w-full h-4 bg-white" 
             style={{ maskImage: 'linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(-45deg, transparent 50%, black 50%)', maskSize: '20px 20px', WebkitMaskImage: 'linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(-45deg, transparent 50%, black 50%)', WebkitMaskSize: '20px 20px' }}
        />

        {/* --- RECEIPT CONTENT --- */}
        <div className="p-8 pt-12 pb-16 text-neutral-800 font-space">
          
          {/* Header */}
          <div className="text-center border-b-2 border-dashed border-neutral-300 pb-6 mb-6">
            <h3 className="text-3xl font-bold tracking-tighter mb-2">THE PACT</h3>
            <p className="text-xs uppercase text-neutral-500">Trip Utility Corp.</p>
            <p className="text-xs uppercase text-neutral-500">ID: 884-291-X</p>
            <div className="mt-4 text-xs">
              DATE: <span className="font-bold">ASAP</span> <br/>
              TIME: <span className="font-bold">NOW</span>
            </div>
          </div>

          {/* Line Items (The Emotional Payoff) */}
          <div className="space-y-4 text-sm mb-8">
            <div className="flex justify-between">
              <span>01. GROUP CHAT DRAMA</span>
              <span className="font-bold">₹0.00</span>
            </div>
            <div className="flex justify-between">
              <span>02. FLIGHT BOOKING</span>
              <span className="font-bold">₹5,000.00</span>
            </div>
            <div className="flex justify-between">
              <span>03. MAGGI AT 3AM</span>
              <span className="font-bold">₹120.00</span>
            </div>
            <div className="flex justify-between text-neutral-400 italic">
              <span>04. RAHUL'S EXCUSES</span>
              <span className="font-bold line-through">₹500.00</span>
            </div>
            <div className="flex justify-between font-bold text-[#FF4F00]">
              <span>05. CORE MEMORIES</span>
              <span>PRICELESS</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t-2 border-dashed border-neutral-800 pt-4 mb-8">
            <div className="flex justify-between text-xl font-bold">
              <span>TOTAL</span>
              <span>UNFORGETTABLE</span>
            </div>
            <p className="text-xs mt-2 text-neutral-500">
              *All emotional debts must be settled with vibes.
            </p>
          </div>

          {/* Barcode (Visual) */}
          <div className="h-12 w-full bg-[repeating-linear-gradient(90deg,black,black_2px,transparent_2px,transparent_4px)] opacity-80 mb-6" />
          
          <div className="text-center text-xs text-neutral-400">
            THANK YOU FOR TRAVELING
          </div>

        </div>

        {/* --- JAGGED EDGE BOTTOM (CSS Trick) --- */}
        <div className="absolute -bottom-4 left-0 w-full h-4 bg-white" 
             style={{ maskImage: 'linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(-45deg, transparent 50%, black 50%)', maskSize: '20px 20px', WebkitMaskImage: 'linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(-45deg, transparent 50%, black 50%)', WebkitMaskSize: '20px 20px', transform: 'rotate(180deg)' }}
        />

      </motion.div>

      {/* 3. FINAL CTA BUTTON (Sticker Style - Linked) */}
      <div className="absolute bottom-10 z-20">
        <Link href="/enter">
          <button className="bg-[#FF4F00] text-white font-fredoka text-xl px-10 py-4 rounded-full shadow-[0_10px_20px_rgba(255,79,0,0.3)] hover:scale-105 active:scale-95 transition-all border-4 border-white rotate-2">
            🎟️ Make The Pact
          </button>
        </Link>
      </div>

    </section>
  );
}