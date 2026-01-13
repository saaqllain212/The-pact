'use client';

import React, { useState, Suspense } from 'react';
import { Fredoka, Nunito } from 'next/font/google';
import { supabase } from '@/lib/supabaseClient';
import { useSearchParams } from 'next/navigation'; // <--- 1. NEW IMPORT

const fredoka = Fredoka({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

// --- INNER COMPONENT (This handles the logic) ---
function EnterContent() {
  const [loading, setLoading] = useState(false);
  
  // Magic Link State
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  // 2. GRAB THE RETURN TICKET
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/trips'; 

  // Helper to build the correct callback URL with the ticket attached
  const getRedirectUrl = () => {
    // This creates: .../auth/callback?next=/trips/123
    return `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
  };

  // 3. Google Login (UPDATED)
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getRedirectUrl(), // <--- WE PASS THE TICKET HERE
      },
    });
    if (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // 4. Magic Link Logic (UPDATED)
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: getRedirectUrl(), // <--- WE PASS THE TICKET HERE
      },
    });

    if (error) {
      alert('Error sending link: ' + error.message);
      setLoading(false);
    } else {
      setSent(true); 
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      
      {/* Floating Toy (Lock) */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 animate-float-slow z-20">
        <img src="/pin-lock.png" alt="Lock" className="w-full h-full object-contain drop-shadow-2xl" />
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-8 pt-20 shadow-[0_20px_40px_rgba(0,0,0,0.05)] text-center">
        
        <h1 className="font-fredoka text-4xl text-[#4A5568] mb-2">
          Passport Control 🛂
        </h1>

        {!sent ? (
          <>
            <p className="font-nunito text-[#A0AEC0] font-bold mb-10">
               {/* Show special text if they are joining a trip */}
               {nextPath.includes('/trips/') ? "Login to join the pact." : "No flaking allowed past this point."}
            </p>

            <div className="space-y-4">
              {/* GOOGLE BUTTON */}
              {!showEmailInput && (
                <button 
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full bg-white border-2 border-[#E2E8F0] hover:border-[#CBD5E0] hover:bg-[#F7FAFC] text-[#4A5568] font-nunito font-bold text-lg py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-sm disabled:opacity-50"
                >
                  {loading ? (
                    <span>Redirecting...</span>
                  ) : (
                    <>
                      <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="G" />
                      Continue with Google
                    </>
                  )}
                </button>
              )}

              {/* MAGIC LINK FORM */}
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
                    className="w-full bg-[#38B2AC] hover:bg-[#319795] text-white font-nunito font-bold text-lg py-4 rounded-2xl transition-all active:scale-95 shadow-sm disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Magic Link ✈️'}
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
          // SUCCESS STATE
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
  );
}

// --- MAIN PAGE (Wrapper) ---
export default function EnterPage() {
  return (
    <main className={`${fredoka.variable} ${nunito.variable} min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E0F0FF] rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FFE0E5] rounded-full blur-[120px] opacity-40" />

      {/* 5. SUSPENSE WRAPPER (Required for reading URL params) */}
      <Suspense fallback={<div className="text-4xl animate-bounce">☁️</div>}>
        <EnterContent />
      </Suspense>
    </main>
  );
}