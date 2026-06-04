import React, { useState } from 'react';
import { KIT_STORIES, KIT_SUPPLIERS } from '../../data/argentinaData';
import { 
  Shirt, 
  Clock, 
  MapPin, 
  Trophy, 
  TrendingUp, 
  CheckCircle,
  HelpCircle,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const KitsView: React.FC = () => {
  const [activeKitIndex, setActiveKitIndex] = useState<number>(1); // Index of "Vertical stripes" 1958 etc.

  const currentKit = KIT_STORIES[activeKitIndex] || KIT_STORIES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left uniform carousel selector (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        
        {/* Suppliers timeline metadata */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow flex-shrink-0">
          <h3 className="text-sm font-bold font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1.5 border-b border-zinc-800 pb-2.5">
            <TrendingUp className="w-4 h-4 text-sky-400" /> Historic Suppliers Timeline
          </h3>

          <div className="space-y-2.5 text-xs">
            {KIT_SUPPLIERS.map((sup, index) => (
              <div 
                key={index} 
                className="bg-zinc-950/40 border border-zinc-850 p-3 rounded-2xl flex justify-between items-center hover:border-sky-500/10 transition"
              >
                <div>
                  <span className="font-extrabold text-zinc-200 block">{sup.supplier}</span>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">{sup.period}</span>
                </div>
                <span className="bg-zinc-900 px-2 py-0.5 rounded font-mono text-[10px] border border-zinc-850 text-zinc-400">
                  supplier
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Kits list selector */}
        <div className="bg-zinc-900 border border-zinc-805 p-5 rounded-3xl space-y-3 shadow">
          <h3 className="text-xs font-bold font-mono tracking-widest text-zinc-550 uppercase">
            👕 Select Shirt Era
          </h3>
          <p className="text-[11px] text-zinc-500 leading-normal mb-3">Explore iconic stripes and alternative colors.</p>

          <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
            {KIT_STORIES.map((kit, index) => {
              const isActive = activeKitIndex === index;

              return (
                <button
                  key={index}
                  onClick={() => setActiveKitIndex(index)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                    isActive 
                      ? 'bg-sky-500/10 border-sky-400 text-sky-400 font-extrabold shadow' 
                      : 'bg-zinc-950/40 border-zinc-800/80 hover:border-zinc-750'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shirt className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-zinc-650 group-hover:text-zinc-400'}`} />
                    <div>
                      <span className="text-xs font-extrabold block text-zinc-100 group-hover:text-white transition">
                        {kit.year}
                      </span>
                      <span className="text-[10px] text-zinc-500 block truncate max-w-[170px] font-medium mt-0.5">
                        {kit.title}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 font-bold">
                    {kit.year.slice(0, 4)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Right Uniform details panel (7 cols) */}
      <div className="lg:col-span-7 bg-zinc-900 border border-zinc-850 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Selected Kit Presentation */}
        <div className="border-b border-zinc-800 pb-5 space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-md">
              👕 Albiceleste Fabric Story
            </span>
            <span className="bg-zinc-950 text-zinc-400 text-[10px] font-mono border border-zinc-850 px-2 py-0.5 rounded">
              {currentKit.year} Era
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
            {currentKit.title} <span className="text-sky-400 text-xs font-mono font-bold ml-1">{currentKit.year}</span>
          </h2>
        </div>

        {/* Story details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold font-mono tracking-wider text-zinc-300 uppercase">
            📖 Uniform History & Significance
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-zinc-950/40 p-5 border border-zinc-800/80 rounded-2xl">
            {currentKit.desc}
          </p>
        </div>

        {/* Virtual Uniform Card layout demo */}
        <div className="bg-zinc-950 border border-zinc-805 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-inner relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-16 albi-stripes opacity-15 pointer-events-none" />

          {/* Visual representations of simulated shirt pattern */}
          <div className="w-24 h-32 rounded-xl bg-gradient-to-b from-sky-400/90 to-zinc-100 border border-sky-200 relative flex flex-col justify-between p-2 flex-shrink-0 shadow shadow-sky-500/5">
            {/* White/Sky striped indicator */}
            <div className="absolute inset-0 flex gap-2 justify-center opacity-60">
              <div className="w-2.5 h-full bg-sky-400" />
              <div className="w-2.5 h-full bg-white" />
              <div className="w-2.5 h-full bg-sky-400" />
            </div>

            {/* Crest badge inside shirt mockup */}
            <div className="relative z-10 w-6 h-6 rounded bg-yellow-500/10 border border-yellow-500/30 flex flex-col items-center justify-center scale-90">
              <span className="text-[6px] font-extrabold text-amber-500">AFA</span>
            </div>

            <div className="relative z-10 text-center font-mono">
              <span className="text-lg font-black text-zinc-950 block leading-none">10</span>
              <span className="text-[7px] text-zinc-800 font-bold uppercase tracking-widest block mt-0.5">ALBICELESTE</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-zinc-400 block font-mono font-bold uppercase tracking-wider">Simulated Uniform Pattern Specs:</span>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              Standard sky-blue (Celeste) and clean white vertical stripes. Diego Maradona wore the special Royal Blue mesh 
              alternate kit vs England in the 1986 World Cup quarter-finals, forging the Hand of God and Goal of the Century.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
