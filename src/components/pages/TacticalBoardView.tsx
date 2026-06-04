import React from 'react';
import { SQUAD } from '../../data/argentinaData';
import { TacticalPitch } from '../TacticalPitch';
import { Sparkles, HelpCircle, ShieldCheck, Cpu } from 'lucide-react';

export const TacticalBoardView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Informative Header board section */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />

        <div className="max-w-3xl space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-emerald-500/20 px-2.5 py-1 rounded-md">
              🧪 Live Simulation active
            </span>
            <span className="bg-sky-500/10 text-sky-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-sky-500/20 px-2.5 py-1 rounded-md">
              XI BLUEPRINT
            </span>
          </div>
          
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-sky-400 animate-pulse" /> Starting-XI Locker Room & Tactical Board
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Take on Lionel Scaloni's managerial mantle. Customize the starting lineup for upcoming matches. 
            Tap any blank positions plotted on the field, pick your stars, and dynamically see calculated collective caps, 
            goals, and average age on the field. Change the default game formation (4-3-3, 4-4-2, 3-5-2) dynamically.
          </p>
        </div>
      </div>

      {/* Main Pitch interactive widget */}
      <TacticalPitch squad={SQUAD} />

      {/* Instructions Manual footer block */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-1.5 p-1">
          <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> 1. Select Formation
          </h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Toggle between standard modern styles (4-3-3, 4-4-2, or 3-5-2) at the top of the pitch. 
            The system alters the corresponding position markers automatically.
          </p>
        </div>

        <div className="space-y-1.5 p-1">
          <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> 2. Map Squad Stars
          </h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Tap a blank circular position node. A tailored filtered roster opens in the side panel. 
            Click a name to map them to the grass. Messi carries a captain monogram on his jersey.
          </p>
        </div>

        <div className="space-y-1.5 p-1 font-mono">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> 3. Observe Analytics
          </h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
            Instantly view aggregate biometric stats count such as squad total international caps, 
            goals, and computed average team age, so you can test squad fatigue profiles.
          </p>
        </div>
      </div>
    </div>
  );
};
