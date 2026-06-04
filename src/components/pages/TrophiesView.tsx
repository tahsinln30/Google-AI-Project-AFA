import React, { useState, useMemo } from 'react';
import { HONOURS, SQUAD } from '../../data/argentinaData';
import { 
  Trophy, 
  MapPin, 
  CheckCircle, 
  Star, 
  Clock, 
  Award,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TrophiesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Global' | 'Continental'>('All');
  const [selectedHonour, setSelectedHonour] = useState<any | null>(HONOURS[0]);

  const filteredHonours = useMemo(() => {
    if (selectedCategory === 'All') return HONOURS;
    return HONOURS.filter(h => h.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
      
      {/* Left Trophy Grid Column (7 cols) */}
      <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6">
        
        {/* Header with segment selection */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold font-sans text-white">Trophy Vault & Honors</h3>
            <p className="text-xs text-zinc-500 mt-1">Explore decades of glorious championship triumphs</p>
          </div>

          <div className="flex bg-zinc-950 border border-zinc-800 rounded-xl p-1 text-xs">
            {['All', 'Global', 'Continental'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`py-1.5 px-3 rounded-lg font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-yellow-500 text-zinc-950 font-extrabold' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid of Trophies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredHonours.map((honour) => {
            const isSelected = selectedHonour?.title === honour.title;

            return (
              <div
                key={honour.title}
                onClick={() => setSelectedHonour(honour)}
                className={`hover:bg-zinc-950/80 p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden h-[180px] ${
                  isSelected 
                    ? 'border-yellow-500/80 bg-zinc-950 shadow shadow-yellow-500/5' 
                    : 'bg-zinc-950/30 border-zinc-800 hover:border-yellow-500/20'
                }`}
              >
                {/* Visual faint vertical Albiceleste lines */}
                <div className="absolute top-0 bottom-0 right-0 w-6 albi-stripes opacity-5 pointer-events-none" />

                <div className="flex justify-between items-start">
                  <div className={`p-2.5 rounded-xl transition-all ${
                    isSelected ? 'bg-yellow-500/20 text-yellow-405' : 'bg-zinc-900 text-zinc-500 group-hover:text-yellow-400'
                  }`}>
                    <Trophy className="w-5 h-5 animate-pulse" />
                  </div>
                  
                  <span className="text-[10px] font-mono text-zinc-550 group-hover:text-zinc-400 uppercase font-bold tracking-wider">
                    {honour.category} Cup
                  </span>
                </div>

                <div className="space-y-1 mt-4">
                  <h4 className="text-md font-black text-white group-hover:text-white leading-tight">
                    {honour.title}
                  </h4>
                  <span className="text-[11px] text-zinc-500 font-medium block">
                    Record count: <strong className="text-zinc-300 font-bold">{honour.count} Titles</strong>
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-mono text-yellow-400/80 font-bold flex justify-between items-center border-t border-zinc-900/40 pt-2 bg-gradient-to-r from-transparent to-zinc-950/20">
                  <span>Last crown:</span>
                  <span className="bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded leading-none">
                    {honour.years.includes(',') ? honour.years.split(', ').pop() : honour.years}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chronology Detail Hub Column (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Interactive detailed chronological fact sheet */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="text-xs font-bold font-mono tracking-wider text-zinc-400 uppercase mb-4 flex items-center gap-1.5 border-b border-zinc-800 pb-2.5">
            <Award className="w-4 h-4 text-yellow-500 animate-spin-slow" /> Champ Chronology Profile
          </h3>

          {selectedHonour ? (
            <div className="space-y-5">
              <div className="bg-zinc-950 border border-zinc-805 rounded-2xl p-5 space-y-4 shadow-inner">
                
                <div>
                  <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/25 px-2.5 py-1 rounded inline-block">
                    {selectedHonour.category} Champions Roster
                  </span>
                  <h4 className="text-xl font-black text-white mt-2.5 leading-tight">
                    {selectedHonour.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-mono mt-1">
                    Argentina total count: {selectedHonour.count} trophies
                  </p>
                </div>

                <div className="space-y-3 pt-3.5 border-t border-zinc-900/60 text-xs">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                    🛡️ Chronicles of Winning Years
                  </span>
                  
                  {/* Winning Years list */}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedHonour.years.split(', ').map((y: string) => (
                      <span 
                        key={y} 
                        className="bg-zinc-900 w-fit cursor-default border border-zinc-850 hover:border-yellow-500/30 text-zinc-200 font-mono font-bold text-[11px] leading-none px-2.5 py-1.5 rounded-lg transition-all"
                      >
                        ⭐ {y}
                      </span>
                    ))}
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-4 whitespace-pre-line border-t border-zinc-900 pt-3.5 pl-2 border-l border-yellow-500">
                    {selectedHonour.description || 'Championship credentials record verified deep within historical AFA registers. High-fidelity triumph details compiled.'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-950/45 border border-dashed border-zinc-800 rounded-2xl">
              <Trophy className="w-8 h-8 text-zinc-600 mx-auto mb-2.5" />
              <h4 className="text-white text-xs font-bold font-sans">Select a Championship Category</h4>
              <p className="text-[11px] text-zinc-500 max-w-[190px] mx-auto mt-1 leading-relaxed">
                Click any of the titles in the left grid block to explore their history and winning years timeline.
              </p>
            </div>
          )}
        </div>

        {/* Global World Cup legacy card */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl space-y-3 text-xs">
          <h4 className="font-extrabold text-white flex items-center gap-1.5 font-mono">
            ★ Historic Treble Peak 
          </h4>
          <p className="text-zinc-400 leading-relaxed text-[11px]">
            Between 2021 and 2024, Argentina pulled off a historic "International Treble" 
            comprising of <strong className="text-zinc-200">Copa América 2021</strong>, 
            the <strong className="text-zinc-200">2022 FIFA World Cup</strong>, 
            and <strong className="text-zinc-200">Copa América 2024</strong>. This is 
            considered one of the most absolute dominant runs in football history.
          </p>
        </div>

      </div>

    </div>
  );
};
