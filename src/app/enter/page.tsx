'use client';

import React, { useState } from 'react';
import { Fredoka, Nunito } from 'next/font/google';
import { supabase } from '@/lib/supabaseClient'; // Make sure this matches your file path

// Fonts
const fredoka = Fredoka({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export default function EnterPage() {
  const [loading, setLoading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  // 1. Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // 2. Magic Link Logic
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // This sends an email to the user with a special link
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Redirect them to the same place as Google
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert('Error sending link: ' + error.message);
      setLoading(false);
    } else {
      setSent(true); // Show the "Check your inbox" message
      setLoading(false);
    }
  };

  return (
    <main className={`${fredoka.variable} ${nunito.variable} min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
      
      {/* BACKGROUND DECOR */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E0F0FF] rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FFE0E5] rounded-full blur-[120px] opacity-40" />

      {/* THE TICKET COUNTER CARD */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Floating Toy (Lock) */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 animate-float-slow z-20">
          <img src="/pin-lock.png" alt="Lock" className="w-full h-full object-contain drop-shadow-2xl" />
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-8 pt-20 shadow-[0_20px_40px_rgba(0,0,0,0.05)] text-center">
          
          <h1 className="font-fredoka text-4xl text-[#4A5568] mb-2">
            Passport Control 🛂
          </h1>

          {/* DYNAMIC CONTENT SWITCHER */}
          {!sent ? (
            <>
              <p className="font-nunito text-[#A0AEC0] font-bold mb-10">
                No flaking allowed past this point.
              </p>

              <div className="space-y-4">
                {/* GOOGLE BUTTON (Always visible unless email mode is active) */}
                {!showEmailInput && (
                  <button 
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full bg-white border-2 border-[#E2E8F0] hover:border-[#CBD5E0] hover:bg-[#F7FAFC] text-[#4A5568] font-nunito font-bold text-lg py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-sm"
                  >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="G" />
                    Continue with Google
                  </button>
                )}

                {/* MAGIC LINK SECTION */}
                {showEmailInput ? (
                  <form onSubmit={handleMagicLink} className="space-y-3 animate-fade-in-up">
                    <input 
                      type="email" 
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F7FAFC] border-2 border-[#E2E8F0] text-[#4A5568] font-nunito font-bold text-lg py-4 px-6 rounded-2xl focus:outline-none focus:border-[#4FD1C5]"
                      required
                    />
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#38B2AC] hover:bg-[#319795] text-white font-nunito font-bold text-lg py-4 rounded-2xl transition-all active:scale-95 shadow-sm"
                    >
                      {loading ? 'Sending Boarding Pass...' : 'Send Magic Link ✈️'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowEmailInput(false)}
                      className="text-xs text-[#A0AEC0] font-bold hover:text-[#4A5568]"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <button 
                    onClick={() => setShowEmailInput(true)}
                    className="w-full bg-[#E0F7FA] hover:bg-[#B2EBF2] text-[#006064] font-nunito font-bold text-lg py-4 rounded-2xl transition-all active:scale-95 shadow-sm opacity-60 hover:opacity-100"
                  >
                    Use Email Magic Link
                  </button>
                )}
              </div>
            </>
          ) : (
            // SUCCESS STATE (After sending link)
            <div className="animate-fade-in-up py-4">
              <div className="text-6xl mb-4">📩</div>
              <h3 className="font-fredoka text-2xl text-[#4A5568] mb-2">Check your inbox!</h3>
              <p className="font-nunito text-[#A0AEC0] font-bold text-sm">
                We sent a magic boarding pass to <br/> <span className="text-[#38B2AC]">{email}</span>
              </p>
              <button 
                onClick={() => setSent(false)}
                className="mt-6 text-xs text-[#CBD5E0] font-bold hover:text-[#4A5568]"
              >
                Try a different email
              </button>
            </div>
          )}

          {!sent && (
            <p className="mt-8 text-xs text-[#CBD5E0] font-nunito font-bold">
              By entering, you agree to the Vibe Check.
            </p>
          )}

        </div>
      </div>

    </main>
  );
}