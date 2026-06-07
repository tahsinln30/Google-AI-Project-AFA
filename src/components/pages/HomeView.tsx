import React from 'react';
import { 
  COACHING_STAFF, 
  HONOURS, 
  SQUAD 
} from '../../data/argentinaData';
import { getPlayerImage } from '../../data/playerImages';
import { 
  Trophy, 
  Shield, 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  Calendar, 
  Compass, 
  Award,
  Zap,
  BookOpen,
  Volume2,
  Gamepad2
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onNavigate: (tab: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  // Safe calculation of figures
  const globalTrophies = HONOURS.filter(h => h.category === 'Global').reduce((acc, h) => acc + h.count, 0);
  const totalTitles = HONOURS.reduce((acc, h) => acc + h.count, 0);
  const captain = SQUAD.find(p => p.player === "Lionel Messi") || SQUAD[0];

  return (
    <div className="space-y-12">
      {/* Immersive Welcome Banner */}
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-sky-950/40 border border-zinc-800 rounded-3xl p-6 md:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
        {/* Albiceleste subtle vertical stripes on background right side */}
        <div className="absolute right-0 top-0 bottom-0 w-32 albi-stripes opacity-10 pointer-events-none" />

        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-sky-500/10 text-sky-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-sky-500/20 px-3 py-1 rounded-full">
              ★ Official AFA Hub ★
            </span>
            <span className="bg-amber-500/10 text-amber-500 text-[10px] font-mono font-bold tracking-wider uppercase border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-1">
              🏆 COPA AMÉRICA CONTI-CHAMPIONS
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            The Golden Age of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-yellow-400">
              la Albiceleste
            </span>
          </h2>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Welcome to the definitive interactive command portal for the <strong className="text-white">Argentina National Football Team</strong>. 
            From the historic foundation in 1893 to the supreme treble crowning of Copa América 2021, FIFA World Cup 2022, 
            and Copa América 2024, delve deep into real squad statistics, campaign results, historic rivalries, and uniform stories.
          </p>

          <div className="flex flex-wrap gap-3.5 pt-2">
            <button
              onClick={() => onNavigate('squad')}
              className="py-3 px-5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-zinc-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-lg shadow-sky-500/15 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-zinc-950" /> Explore Squad & Records
            </button>
            <button
              onClick={() => onNavigate('tactical')}
              className="py-3 px-5 bg-zinc-900 border border-zinc-800 text-zinc-200 font-bold rounded-xl text-xs sm:text-sm hover:bg-zinc-850 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-sky-400" /> Start Starting-XI Tactical Board
            </button>
            <button
              onClick={() => onNavigate('game')}
              className="py-3 px-5 bg-amber-400/10 border border-amber-500/20 text-amber-400 hover:bg-amber-400 hover:text-zinc-950 font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" /> Play Shootout Arcade
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Key Team Bio Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-zinc-900 border border-zinc-805 rounded-2xl p-5 relative overflow-hidden shadow">
          <div className="flex justify-between items-center text-zinc-500">
            <span className="text-xs font-mono uppercase tracking-wider">FIFA Ranking</span>
            <Compass className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-white">#3</span>
            <span className="text-xs text-sky-300 block mt-1">FIFA World Ranking • Men's</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-zinc-900 border border-zinc-805 rounded-2xl p-5 relative overflow-hidden shadow">
          <div className="flex justify-between items-center text-zinc-500">
            <span className="text-xs font-mono uppercase tracking-wider">World Cup Star count</span>
            <Trophy className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-white">3 ⭐</span>
            <span className="text-xs text-zinc-400 block mt-1">Titles: 1978, 1986, 2022</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-zinc-900 border border-zinc-805 rounded-2xl p-5 relative overflow-hidden shadow">
          <div className="flex justify-between items-center text-zinc-500">
            <span className="text-xs font-mono uppercase tracking-wider">Copa América Titles</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-white">16 🏆</span>
            <span className="text-xs text-emerald-300 block mt-1">Continental leader (Record)</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-zinc-900 border border-zinc-805 rounded-2xl p-5 relative overflow-hidden shadow">
          <div className="flex justify-between items-center text-zinc-500">
            <span className="text-xs font-mono uppercase tracking-wider">Total official cups</span>
            <Shield className="w-4 h-4 text-sky-300" />
          </div>
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-white">{totalTitles}</span>
            <span className="text-xs text-zinc-400 block mt-1">Combined official titles</span>
          </div>
        </div>
      </div>

      {/* Main Content Sections: Captain spotlight and AFA History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Captain Spotlight card with image */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-xl pointer-events-none" />

          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block mb-3.5">
            👑 Capitan & Legendary Lionel Messi
          </span>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg relative group">
            {/* Player image rendering - with referrerPolicy */}
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
              <img 
                src={getPlayerImage("Lionel Messi")} 
                alt="Lionel Messi" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[9px] font-mono bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold px-2 py-0.5 rounded uppercase">
                  Capitan #10
                </span>
                <h4 className="text-xl font-black text-white mt-1">Lionel Messi</h4>
                <p className="text-xs text-zinc-400 font-medium">Inter Miami • Forward</p>
              </div>
            </div>

            {/* Captain's dynamic stats */}
            <div className="p-4 border-t border-zinc-900 space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-zinc-900/40 p-2 border border-zinc-850 rounded-xl">
                  <span className="text-[9px] text-zinc-500 block uppercase">Caps</span>
                  <span className="text-md font-bold text-white block mt-0.5">{captain?.caps || 198}</span>
                </div>
                <div className="bg-zinc-900/40 p-2 border border-zinc-850 rounded-xl">
                  <span className="text-[9px] text-zinc-500 block uppercase">Goals</span>
                  <span className="text-md font-bold text-sky-400 block mt-0.5">{captain?.goals || 116}</span>
                </div>
                <div className="bg-zinc-900/40 p-2 border border-zinc-850 rounded-xl">
                  <span className="text-[9px] text-zinc-500 block uppercase">Age</span>
                  <span className="text-md font-bold text-yellow-400 block mt-0.5">{captain?.age || 38}</span>
                </div>
              </div>

              <blockquote className="italic text-[11px] text-zinc-400 leading-relaxed pt-2 border-t border-zinc-900/60 pl-2 border-l-2 border-yellow-400">
                "An unprecedented record-holder of 8 Ballon d'Or awards, Messi captained Argentina to the ultimate Copa América, Finalissima and 2022 World Cup glory."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Right Section: AFA General Info & Historic Milestones */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-8">
          {/* History */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
              <BookOpen className="w-5 h-5 text-sky-400" /> AFA Foundation & Stadium Command
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Founded in <strong className="text-zinc-200">1893</strong>, the Argentine Football Association (AFA) is the oldest in South America 
              and one of the oldest globally. It oversees a legacy that has forged iconic generations. 
              The team plays its major matches in the legendary <strong className="text-zinc-200">Estadio Monumental (MÁS Monumental)</strong> 
              located in Buenos Aires.
            </p>

            <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-900 flex items-center justify-center text-sky-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-zinc-200 text-xs font-bold block">Estadio MÁS Monumental</span>
                  <span className="text-[11px] text-zinc-500 block">Buenos Aires, Argentina (Capacity: 84,567)</span>
                </div>
              </div>
              <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] uppercase font-bold py-1 px-2.5 rounded-lg">
                Historic Fort
              </span>
            </div>
          </div>

          {/* Coaching Staff List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-wider text-zinc-400 uppercase">
              🇦🇷 Core Tactical Command Staff (La Scaloneta)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COACHING_STAFF.map((coach, index) => (
                <div 
                  key={index} 
                  className="bg-zinc-950/30 border border-zinc-800/80 p-3.5 rounded-xl flex justify-between items-center hover:border-sky-500/20 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-zinc-500 font-mono block uppercase tracking-wider">{coach.position}</span>
                    <span className="text-sm font-bold text-zinc-200 block">{coach.name}</span>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400 opacity-60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
