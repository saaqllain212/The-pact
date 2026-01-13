'use client';

import React, { useState } from 'react';
import { Fredoka, Nunito } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Ensure this matches your file path
import { ArrowRight } from 'lucide-react';

// Fonts
const fredoka = Fredoka({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export default function CreateTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // The Inputs
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');

  const handleCreate = async () => {
    if (!title || !destination) return;
    setLoading(true);

    // 1. 🔊 PLAY THE SOUND
    // (Make sure you put 'pop.mp3' in your public folder!)
    try {
      const audio = new Audio('/pop.mp3');
      audio.volume = 0.5;
      audio.play();
    } catch (e) {
      // Ignore if sound fails
    }

    // 2. GET USER
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/enter');
      return;
    }

    // 3. INSERT TRIP
    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .insert([
        { 
          title: title, 
          destination: destination,
          created_by: user.id,
          status: 'active'
        }
      ])
      .select()
      .single();

    if (tripError) {
      alert('Error creating pact: ' + tripError.message);
      setLoading(false);
      return;
    }

    // 4. ADD CREATOR AS MEMBER
    await supabase
      .from('trip_members')
      .insert([
        {
          trip_id: trip.id,
          user_id: user.id,
          role: 'creator',
          intent_level: 'serious'
        }
      ]);

    // 5. LOG ACTIVITY
    await supabase.from('activity_log').insert([
      {
        trip_id: trip.id,
        actor_id: user.id,
        type: 'trip_created',
        payload: { title: title }
      }
    ]);

    // 6. REDIRECT TO LOBBY
    router.push(`/trips/${trip.id}`);
  };

  return (
    <main className={`${fredoka.variable} ${nunito.variable} min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
      
      {/* BACKGROUND BLOBS */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#E0F0FF] rounded-full blur-[100px] opacity-30 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFE0E5] rounded-full blur-[100px] opacity-30 animate-pulse" />

      {/* --- THE CEREMONY CARD --- */}
      <div className="relative z-10 w-full max-w-lg">
        
        {/* Floating Crown Toy */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 animate-float-slow z-20">
          <img src="/icon-crown.png" alt="Creator" className="w-full h-full object-contain drop-shadow-2xl" />
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-8 pt-24 shadow-[0_30px_60px_rgba(0,0,0,0.05)] text-center">
          
          <h1 className="font-fredoka text-3xl text-[#4A5568] mb-8">
            Initialize Mission 🚀
          </h1>

          {/* INPUT 1: TITLE */}
          <div className="mb-6 group">
            <label className="block text-left font-nunito text-xs font-bold text-[#A0AEC0] uppercase tracking-wider mb-2 ml-4 group-focus-within:text-[#FF9EAA] transition-colors">
              Code Name
            </label>
            <input 
              type="text" 
              placeholder="e.g. Goa 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F7FAFC] border-2 border-[#E2E8F0] focus:border-[#FF9EAA] text-[#2D3748] font-fredoka text-3xl p-6 rounded-[2rem] focus:outline-none transition-all placeholder:text-[#CBD5E0]"
              autoFocus
            />
          </div>

          {/* INPUT 2: DESTINATION */}
          <div className="mb-10 group">
             <label className="block text-left font-nunito text-xs font-bold text-[#A0AEC0] uppercase tracking-wider mb-2 ml-4 group-focus-within:text-[#4FC3F7] transition-colors">
              Target Location
            </label>
            <input 
              type="text" 
              placeholder="e.g. Anjuna Beach"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-[#F7FAFC] border-2 border-[#E2E8F0] focus:border-[#4FC3F7] text-[#2D3748] font-fredoka text-xl p-6 rounded-[2rem] focus:outline-none transition-all placeholder:text-[#CBD5E0]"
            />
          </div>

          {/* BIG ACTION BUTTON */}
          <button 
            onClick={handleCreate}
            disabled={!title || !destination || loading}
            className="group relative w-full bg-[#2D3748] hover:bg-[#1A202C] disabled:bg-[#CBD5E0] text-white font-fredoka text-xl py-6 rounded-[2rem] shadow-xl transition-all active:scale-95 disabled:active:scale-100 flex items-center justify-center gap-3 overflow-hidden"
          >
            {loading ? (
              <span className="animate-pulse">Creating Protocol...</span>
            ) : (
              <>
                <span className="relative z-10">Create The Pact</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
              </>
            )}
          </button>

        </div>
      </div>
    </main>
  );
}