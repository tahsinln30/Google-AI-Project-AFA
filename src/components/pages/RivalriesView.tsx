import React, { useState } from 'react';
import { RIVALRIES, Rivalry } from '../../data/argentinaData';
import { 
  Flame, 
  Trophy, 
  Compass, 
  HelpCircle, 
  ShieldAlert, 
  CheckCircle,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const RivalriesView: React.FC = () => {
  const [activeRivalry, setActiveRivalry] = useState<Rivalry>(RIVALRIES[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Menu Selection (4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-zinc-900 border border-zinc-805 p-5 rounded-3xl shadow">
          <h3 className="text-xs font-bold font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5 mb-3.5">
            <Flame className="w-4 h-4 text-orange-500" /> Choose Rival Hub
          </h3>
          <p className="text-xs text-zinc-400 mb-3 ml-0.5">Explore high-stakes historic matches and background facts.</p>

          <div className="space-y-2">
            {RIVALRIES.map((rival) => {
              const isActive = activeRivalry.name === rival.name;

              return (
                <button
                  key={rival.name}
                  onClick={() => setActiveRivalry(rival)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    isActive 
                      ? 'bg-sky-500/10 border-sky-450 text-sky-400 font-extrabold shadow' 
                      : 'bg-zinc-950/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-955'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-black font-mono flex items-center justify-center text-zinc-400">
                      {rival.name.slice(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-sm font-extrabold text-white group-hover:text-sky-400 block transition-colors">
                        {rival.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 block font-medium truncate max-w-[130px]">
                        {rival.head}
                      </span>
                    </div>
                  </div>
                  <Compass className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-sky-450 scale-110 rotate-45' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Rivalry background trivia */}
        <div className="bg-zinc-900 border border-zinc-805 p-5 rounded-3xl space-y-3.5 text-xs">
          <h4 className="font-extrabold text-white flex items-center gap-1.5 font-mono">
            📌 Core Fact sheet
          </h4>
          <p className="text-zinc-400 leading-relaxed text-[11px]">
            Argentina holds iconic rivalries. The clash with <strong className="text-zinc-200">Brazil</strong> is known as 
            <em> "Superclásico de las Américas"</em>, while conflicts with <strong className="text-zinc-200">England</strong> 
            blended football with deep cultural and political contexts since World Cup 1966.
          </p>
        </div>
      </div>

      {/* Right details panel (8 cols) */}
      <div className="lg:col-span-8 bg-zinc-900 border border-zinc-805 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Active Rival Info Block */}
        <div className="border-b border-zinc-800 pb-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-orange-500/10 text-orange-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-orange-500/20 px-2 rounded-md">
              🔥 CLÁSICO DELUXE
            </span>
            <span className="bg-zinc-950 text-zinc-400 text-[10px] font-mono border border-zinc-850 px-2 py-0.5 rounded">
              H2H Profile
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Argentina <span className="text-zinc-500 font-normal">vs</span> {activeRivalry.name}
          </h2>
          <p className="text-xs sm:text-sm text-sky-400 font-bold font-mono tracking-wide">
            {activeRivalry.head}
          </p>
        </div>

        {/* Rival History story description */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold font-mono tracking-wider text-zinc-300 uppercase">
            📖 Backdrop & Historic Lore
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-zinc-950/40 p-5 border border-zinc-800/80 rounded-2xl">
            {activeRivalry.desc}
          </p>
        </div>

        {/* Notable showcase text */}
        <div className="space-y-4 bg-zinc-950/40 p-5 border border-zinc-800 rounded-2xl">
          <h3 className="text-sm font-bold font-mono tracking-wider text-amber-500 uppercase flex items-center gap-1.5">
            ⚔️ Clash History & Legends Matches
          </h3>
          
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {activeRivalry.notableDetails}
          </p>
        </div>

        {/* Notable Players representing clash */}
        {activeRivalry.notablePlayers && (
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-450" /> Notable Legends In Clashes
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeRivalry.notablePlayers.map((player) => (
                <span 
                  key={player} 
                  className="bg-zinc-900 border border-zinc-850 text-zinc-300 font-bold text-xs px-3 py-1.5 rounded-xl hover:border-sky-500/20 transition cursor-default"
                >
                  ⭐ {player}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
