'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Fredoka, Nunito } from 'next/font/google';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, Share2, Calendar, Wallet, CheckCircle, Copy } from 'lucide-react';

const fredoka = Fredoka({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export default function TripLobbyPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState<any>(null);
  const [isMember, setIsMember] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // 1. FETCH DATA & CHECK MEMBERSHIP
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      // Get Current User
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/enter'); // Gatekeep
        return;
      }
      setUser(user);

      // Get Trip Data
      const { data: tripData, error: tripError } = await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .single();

      if (tripError || !tripData) {
        // If trip doesn't exist, go back to dashboard
        router.push('/trips');
        return;
      }
      setTrip(tripData);

      // Check Membership
      const { data: memberData } = await supabase
        .from('trip_members')
        .select('id')
        .eq('trip_id', id)
        .eq('user_id', user.id)
        .single();

      if (memberData) {
        setIsMember(true);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [id, router]);

  // 2. HANDLE JOINING (With Safety Check)
  const handleJoin = async () => {
    // SAFETY CHECK: If user is missing, stop immediately.
    if (!user) return; 

    setLoading(true);
    
    // Add to Database
    const { error } = await supabase.from('trip_members').insert({
      trip_id: id,
      user_id: user.id,
      role: 'member',
      intent_level: 'serious'
    });

    if (error) {
      alert('Error joining: ' + error.message);
      setLoading(false);
    } else {
      // Refresh page state to show Lobby
      setIsMember(true);
      setLoading(false);
      
      // Optional: Log Activity (Safely access email)
      await supabase.from('activity_log').insert({
        trip_id: id,
        actor_id: user.id,
        type: 'joined_trip',
        payload: { name: user.email || 'A traveler' } 
      });
    }
  };

  // 3. HANDLE INVITE COPY
  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center text-4xl animate-bounce">☁️</div>;

  // --- STATE A: VISITOR (The "Sign Here" Gate) ---
  if (!isMember) {
    return (
      <main className={`${fredoka.variable} ${nunito.variable} min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center p-6 text-center`}>
        <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-xl border border-white">
          <div className="text-6xl mb-6 animate-bounce">🎟️</div>
          <h1 className="font-fredoka text-4xl text-[#2D3748] mb-2">You're Invited!</h1>
          <p className="font-nunito text-[#A0AEC0] font-bold mb-8">
            You have been summoned to join <br/>
            <span className="text-[#FF9EAA] text-xl">{trip?.title}</span>
          </p>

          <div className="bg-[#F7FAFC] p-6 rounded-3xl mb-8">
            <p className="font-nunito text-xs text-[#CBD5E0] uppercase font-bold tracking-widest mb-1">Destination</p>
            <p className="font-fredoka text-2xl text-[#4A5568]">📍 {trip?.destination}</p>
          </div>

          <button 
            onClick={handleJoin}
            disabled={loading}
            className="w-full bg-[#2D3748] hover:bg-[#1A202C] text-white font-fredoka text-xl py-5 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Joining...' : "I'm In (Join Pact)"}
          </button>
          
          <p className="mt-6 text-xs text-[#CBD5E0] font-bold">
            Warning: Signing this pact binds you to the vibe.
          </p>
        </div>
      </main>
    );
  }

  // --- STATE B: MEMBER (The Full Lobby) ---
  return (
    <main className={`${fredoka.variable} ${nunito.variable} min-h-screen bg-[#FDFCF8] p-6 pb-24`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-8">
        <button onClick={() => router.push('/trips')} className="p-3 bg-white rounded-full shadow-sm border-2 border-transparent hover:border-[#E2E8F0] text-[#A0AEC0] transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="bg-[#E0F7FA] text-[#006064] font-nunito font-bold text-xs px-4 py-2 rounded-full uppercase tracking-wider">
          Status: {trip?.status}
        </div>
      </div>

      {/* Hero Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden text-center mb-8">
        <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-[#FFF8E1] rounded-full blur-[80px] opacity-60 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="font-fredoka text-5xl md:text-7xl text-[#2D3748] mb-4">{trip?.title}</h1>
          <p className="font-nunito text-xl md:text-2xl text-[#A0AEC0] font-bold uppercase tracking-widest">📍 {trip?.destination}</p>
          <div className="mt-8 inline-flex items-center gap-2 bg-[#F0FFF4] px-4 py-2 rounded-full border border-[#C6F6D5]">
            <CheckCircle className="w-4 h-4 text-[#48BB78]" />
            <span className="font-nunito text-sm font-bold text-[#2F855A]">You are Locked In</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
        <div className="bg-[#F0FFF4] p-6 rounded-[2rem] border-2 border-white shadow-sm opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 bg-[#C6F6D5] rounded-full flex items-center justify-center text-[#276749] mb-4"><Calendar className="w-5 h-5" /></div>
          <h3 className="font-fredoka text-lg text-[#2F855A]">Dates</h3>
          <p className="font-nunito text-xs text-[#68D391] font-bold">Poll coming soon</p>
        </div>
        <div className="bg-[#FFF5F5] p-6 rounded-[2rem] border-2 border-white shadow-sm opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 bg-[#FED7D7] rounded-full flex items-center justify-center text-[#C53030] mb-4"><Wallet className="w-5 h-5" /></div>
          <h3 className="font-fredoka text-lg text-[#C53030]">Budget</h3>
          <p className="font-nunito text-xs text-[#FC8181] font-bold">Locker closed</p>
        </div>
      </div>

      {/* Invite Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-6">
        <button 
          onClick={handleCopyLink}
          className="w-full bg-[#2D3748] text-white px-8 py-4 rounded-full shadow-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all"
        >
          {copied ? <CheckCircle className="w-5 h-5 text-[#68D391]" /> : <Copy className="w-5 h-5" />}
          <span className="font-fredoka text-lg">
            {copied ? 'Link Copied!' : 'Invite Squad'}
          </span>
        </button>
      </div>

    </main>
  );
}