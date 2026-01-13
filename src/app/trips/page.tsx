'use client';

import React, { useEffect, useState } from 'react';
import { Fredoka, Nunito } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; 
import { Plus, LogOut, MapPin } from 'lucide-react';
import Link from 'next/link';

// Fonts
const fredoka = Fredoka({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export default function TripsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);

  // 1. CHECK AUTH & FETCH TRIPS
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/enter');
        return;
      }
      
      setUser(session.user);
      
      // Fetch trips this user belongs to
      // We join 'trip_members' to find trips where user_id matches
      const { data: myTrips, error } = await supabase
        .from('trip_members')
        .select(`
          trip_id,
          trips (
            id,
            title,
            destination,
            status
          )
        `)
        .eq('user_id', session.user.id);

      if (myTrips) {
        // Flatten the data structure slightly for easier use
        const formattedTrips = myTrips.map((item: any) => item.trips);
        setTrips(formattedTrips);
      }
      
      setLoading(false);
    };

    checkUser();
  }, [router]);

  // 2. LOGOUT LOGIC
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center">
        <div className="animate-bounce text-4xl">☁️</div>
      </div>
    );
  }

  return (
    <main className={`${fredoka.variable} ${nunito.variable} min-h-screen bg-[#FDFCF8] p-6 md:p-12`}>
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-12 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#E0F7FA] rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm">
            🤠
          </div>
          <div>
            <h1 className="font-fredoka text-2xl text-[#4A5568]">Your Pacts</h1>
            <p className="font-nunito text-xs font-bold text-[#A0AEC0]">
              Ready for the next adventure?
            </p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="bg-white text-[#CBD5E0] hover:text-[#E53E3E] p-3 rounded-2xl border-2 border-transparent hover:border-[#FED7D7] transition-all"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-5xl mx-auto">
        
        {trips.length === 0 ? (
          // STATE A: EMPTY STATE (No trips yet)
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
            
            {/* Floating Hero Asset */}
            <div className="relative w-64 h-64 mb-8">
              <div className="absolute inset-0 bg-[#E0F0FF] rounded-full blur-[60px] opacity-60 animate-pulse" />
              <img 
                src="/pin-flag.png" 
                alt="Start" 
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float-slow" 
              />
            </div>

            <h2 className="font-fredoka text-4xl text-[#2D3748] mb-4">
              No trips yet?
            </h2>
            <p className="font-nunito text-[#718096] font-bold max-w-md mb-10 text-lg">
              The group chat is waiting. Be the one who actually makes it happen.
            </p>

            {/* THE CREATE BUTTON */}
            <Link href="/trips/create">
              <button className="group relative bg-[#FF9EAA] hover:bg-[#FF8FAB] text-white px-10 py-5 rounded-[2rem] shadow-[0_15px_30px_rgba(255,158,170,0.4)] active:scale-95 transition-all flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="font-fredoka text-xl tracking-wide">Create New Pact</span>
              </button>
            </Link>

          </div>
        ) : (
          // STATE B: GRID (List of active trips)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
             
             {/* The "Create New" Card (Always first) */}
             <Link href="/trips/create" className="group">
                <div className="h-full min-h-[200px] bg-white border-2 border-dashed border-[#CBD5E0] rounded-[2rem] flex flex-col items-center justify-center text-[#A0AEC0] hover:border-[#FF9EAA] hover:text-[#FF9EAA] hover:bg-[#FFF5F7] transition-all cursor-pointer">
                  <Plus className="w-12 h-12 mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="font-fredoka text-lg">New Pact</span>
                </div>
             </Link>

             {/* The Trip Cards */}
             {trips.map((trip) => (
               <Link href={`/trips/${trip.id}`} key={trip.id} className="group">
                 <div className="relative bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-[#E2E8F0] h-full flex flex-col justify-between overflow-hidden">
                    
                    {/* Decor Blob */}
                    <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[#E0F7FA] rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-[#FFECEF] rounded-full flex items-center justify-center text-xl">
                          ✈️
                        </div>
                        <span className="bg-[#EDF2F7] text-[#718096] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                          {trip.status}
                        </span>
                      </div>
                      
                      <h3 className="font-fredoka text-2xl text-[#2D3748] mb-1 leading-tight group-hover:text-[#FF9EAA] transition-colors">
                        {trip.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[#A0AEC0] text-sm font-bold">
                        <MapPin className="w-4 h-4" />
                        {trip.destination}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#EDF2F7] flex justify-between items-center">
                       <span className="text-xs font-bold text-[#CBD5E0]">View Lobby &rarr;</span>
                    </div>
                 </div>
               </Link>
             ))}

          </div>
        )}

      </div>

    </main>
  );
}