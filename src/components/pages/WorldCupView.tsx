import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Zap, 
  RotateCcw, 
  Sliders, 
  CheckCircle, 
  Layers, 
  Users, 
  Sparkles,
  Award,
  Flame,
  ArrowRight
} from 'lucide-react';

interface Group {
  letter: string;
  teams: { name: string; flag: string; seed?: number; rating?: number }[];
}

const GROUPS_DATA: Group[] = [
  {
    letter: 'A',
    teams: [
      { name: 'Mexico', flag: '🇲🇽' },
      { name: 'South Africa', flag: '🇿🇦' },
      { name: 'South Korea', flag: '🇰🇷' },
      { name: 'UEFA (D)', flag: '🇪🇺' },
    ],
  },
  {
    letter: 'B',
    teams: [
      { name: 'Canada', flag: '🇨🇦' },
      { name: 'UEFA (A)', flag: '🇪🇺' },
      { name: 'Qatar', flag: '🇶🇦' },
      { name: 'Switzerland', flag: '🇨🇭' },
    ],
  },
  {
    letter: 'C',
    teams: [
      { name: 'Brazil', flag: '🇧🇷' },
      { name: 'Morocco', flag: '🇲🇦' },
      { name: 'Haiti', flag: '🇭🇹' },
      { name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    ],
  },
  {
    letter: 'D',
    teams: [
      { name: 'USA', flag: '🇺🇸' },
      { name: 'Paraguay', flag: '🇵🇾' },
      { name: 'Australia', flag: '🇦🇺' },
      { name: 'UEFA (C)', flag: '🇪🇺' },
    ],
  },
  {
    letter: 'E',
    teams: [
      { name: 'Germany', flag: '🇩🇪' },
      { name: 'Curaçao', flag: '🇨🇼' },
      { name: 'Côte d\'Ivoire', flag: '🇨🇮' },
      { name: 'Ecuador', flag: '🇪🇨' },
    ],
  },
  {
    letter: 'F',
    teams: [
      { name: 'Netherlands', flag: '🇳🇱' },
      { name: 'Japan', flag: '🇯🇵' },
      { name: 'UEFA (B)', flag: '🇪🇺' },
      { name: 'Tunisia', flag: '🇹🇳' },
    ],
  },
  {
    letter: 'G',
    teams: [
      { name: 'Belgium', flag: '🇧🇪' },
      { name: 'Egypt', flag: '🇪🇬' },
      { name: 'Iran', flag: '🇮🇷' },
      { name: 'N. Zealand', flag: '🇳🇿' },
    ],
  },
  {
    letter: 'H',
    teams: [
      { name: 'Spain', flag: '🇪🇸' },
      { name: 'Cabo Verde', flag: '🇨🇻' },
      { name: 'Saudi Arabia', flag: '🇸🇦' },
      { name: 'Uruguay', flag: '🇺🇾' },
    ],
  },
  {
    letter: 'I',
    teams: [
      { name: 'France', flag: '🇫🇷' },
      { name: 'Senegal', flag: '🇸🇳' },
      { name: 'FIFA (2)', flag: '🌐' },
      { name: 'Norway', flag: '🇳🇴' },
    ],
  },
  {
    letter: 'J',
    teams: [
      { name: 'Argentina', flag: '🇦🇷' },
      { name: 'Algeria', flag: '🇩🇿' },
      { name: 'Austria', flag: '🇦🇹' },
      { name: 'Jordan', flag: '🇯🇴' },
    ],
  },
  {
    letter: 'K',
    teams: [
      { name: 'Portugal', flag: '🇵🇹' },
      { name: 'FIFA (1)', flag: '🌐' },
      { name: 'Uzbekistan', flag: '🇺🇿' },
      { name: 'Colombia', flag: '🇨🇴' },
    ],
  },
  {
    letter: 'L',
    teams: [
      { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { name: 'Croatia', flag: '🇭🇷' },
      { name: 'Ghana', flag: '🇬🇭' },
      { name: 'Panama', flag: '🇵🇦' },
    ],
  },
];

export const WorldCupView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'draw' | 'path' | 'bracket'>('path');
  const [argentinaGroupSeat, setArgentinaGroupSeat] = useState<'J1' | 'J2' | 'J3'>('J1');
  
  // Custom custom bracket selections for simulated playout
  const [r32Winners, setR32Winners] = useState<Record<string, string>>({
    m1: 'Mexico',
    m2: 'Germany',
    m3: 'Netherlands',
    m4: 'Brazil',
    m5: 'France',
    m6: 'Ecuador',
    m7: 'Spain',
    m8: 'England',
    m9: 'USA',
    m10: 'Belgium',
    m11: 'Portugal',
    m12: 'Uruguay',
    m13: 'Canada',
    m14: 'Argentina',
    m15: 'Colombia',
    m16: 'Paraguay'
  });

  const [r16Winners, setR16Winners] = useState<Record<string, string>>({
    q1: 'Germany',
    q2: 'Brazil',
    q3: 'France',
    q4: 'Spain',
    q5: 'Belgium',
    q6: 'Argentina',
    q7: 'Portugal',
    q8: 'Colombia'
  });

  const [qfWinners, setQfWinners] = useState<Record<string, string>>({
    s1: 'Brazil',
    s2: 'Argentina',
    s3: 'France',
    s4: 'Portugal'
  });

  const [sfWinners, setSfWinners] = useState<Record<string, string>>({
    f1: 'Argentina',
    f2: 'France'
  });

  const [champion, setChampion] = useState<string>('Argentina');

  const resetPredictions = () => {
    setR32Winners({
      m1: 'Mexico',
      m2: 'Germany',
      m3: 'Netherlands',
      m4: 'Brazil',
      m5: 'France',
      m6: 'Ecuador',
      m7: 'Spain',
      m8: 'England',
      m9: 'USA',
      m10: 'Belgium',
      m11: 'Portugal',
      m12: 'Uruguay',
      m13: 'Canada',
      m14: 'Argentina',
      m15: 'Colombia',
      m16: 'Paraguay'
    });
    setR16Winners({
      q1: 'Germany',
      q2: 'Brazil',
      q3: 'France',
      q4: 'Spain',
      q5: 'Belgium',
      q6: 'Argentina',
      q7: 'Portugal',
      q8: 'Colombia'
    });
    setQfWinners({
      s1: 'Brazil',
      s2: 'Argentina',
      s3: 'France',
      s4: 'Portugal'
    });
    setSfWinners({
      f1: 'Argentina',
      f2: 'France'
    });
    setChampion('Argentina');
  };

  const handleSeatChange = (seat: 'J1' | 'J2' | 'J3') => {
    setArgentinaGroupSeat(seat);
    // Auto-update match 14 or match 12 or Match 8 in R32 winner state
    const currentWinners = { ...r32Winners };
    if (seat === 'J1') {
      currentWinners.m14 = 'Argentina';
      currentWinners.m12 = 'Spain'; // Default alternative
    } else if (seat === 'J2') {
      currentWinners.m12 = 'Argentina';
      currentWinners.m14 = 'Algeria'; // Default alternative
    } else {
      currentWinners.m8 = 'Argentina';
      currentWinners.m14 = 'Algeria';
      currentWinners.m12 = 'Spain';
    }
    setR32Winners(currentWinners);
  };

  // Compute Argentina's dynamic matchups
  const getArgentinaR32Details = () => {
    if (argentinaGroupSeat === 'J1') {
      return {
        matchId: 'Match 14',
        date: 'July 3, 2026',
        venue: 'Hard Rock Stadium, Miami',
        opponent: 'Group H Runner-Up (Algeria/Saudi Arabia/Uruguay)',
        oppoFlag: '🇺🇾',
        headline: 'Crucial Miami Arena Return',
        desc: 'Argentina advances as Group J winner. They will enjoy massive home-crowd backing playing in Messi\'s home MLS base in Miami against the tough group H challenger.'
      };
    } else if (argentinaGroupSeat === 'J2') {
      return {
        matchId: 'Match 12',
        date: 'July 2, 2026',
        venue: 'SoFi Stadium, Los Angeles',
        opponent: 'Group H Winner (Spain)',
        oppoFlag: '🇪🇸',
        headline: 'Heavyweight West Coast Clash',
        desc: 'Finishing 2nd sets up a highly demanding collision course against Group H Winner (likely Spain or Uruguay) under the blazing lights of California\'s SoFi Stadium.'
      };
    } else {
      return {
        matchId: 'Match 8',
        date: 'July 1, 2026',
        venue: 'Mercedes-Benz Stadium, Atlanta',
        opponent: 'Group L Winner (England)',
        oppoFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        headline: 'Best Third-Place Gauntlet',
        desc: 'As one of the qualifying best 3rd-place teams from Group J, the Albiceleste draws a direct blockbuster with giants England in Atlanta.'
      };
    }
  };

  const currentR32 = getArgentinaR32Details();

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="relative bg-gradient-to-r from-zinc-900 via-sky-950/20 to-zinc-900 border border-sky-505/20 px-6 py-6 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-44 h-44 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-400/20 rounded-full text-[10px] font-bold font-mono text-sky-400 uppercase tracking-widest">
              🏆 Championship Quadrennial Draw
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              FIFA World Cup 2026 Draw & Campaign Center
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Explore the official Group Phase configurations of all 48 nations. Simulate the paths of Argentina's Golden Squad, toggle simulated layouts, and charts the knockout stages leading to MetLife Stadium on July 19, 2026.
            </p>
          </div>
          
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="bg-zinc-950 p-3.5 border border-zinc-850 rounded-2xl text-center">
              <span className="text-[9px] text-zinc-500 block font-mono uppercase tracking-widest">AFA Target</span>
              <span className="text-lg font-black text-yellow-405 block">⭐ 4th Star</span>
            </div>
            <div className="bg-zinc-950 p-3.5 border border-zinc-850 rounded-2xl text-center">
              <span className="text-[9px] text-zinc-500 block font-mono uppercase tracking-widest">Group Seat</span>
              <span className="text-lg font-black text-sky-400 block">J1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern High-End Tab Menu Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('path')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'path'
                ? 'bg-sky-500/10 border border-sky-500/20 text-sky-400 font-extrabold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> Path to Glory Predictor
          </button>
          
          <button
            onClick={() => setActiveTab('draw')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'draw'
                ? 'bg-sky-500/10 border border-sky-500/20 text-sky-400 font-extrabold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Table of Groups (A-L)
          </button>

          <button
            onClick={() => setActiveTab('bracket')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'bracket'
                ? 'bg-sky-500/10 border border-sky-500/20 text-sky-400 font-extrabold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Playoff Bracket Simulator
          </button>
        </div>

        {activeTab === 'bracket' && (
          <button
            onClick={resetPredictions}
            className="text-[10px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-xl font-bold font-mono text-zinc-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset Bracket
          </button>
        )}
      </div>

      {/* Render Active Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* TAB 1: PATH TO GLORY PREDICTOR */}
          {activeTab === 'path' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Settings and Live Status */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-5">
                  <h4 className="text-xs font-bold font-mono text-sky-400 uppercase tracking-widest border-b border-zinc-850 pb-2 flex items-center gap-1">
                    🎯 Group J Standing Predictor
                  </h4>
                  
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Under the 48-team layout, Argentina is placed in <strong>Group J</strong> alongside Algeria, Austria, and Jordan. How do you predict Argentina will classify?
                  </p>

                  <div className="space-y-2">
                    {[
                      { key: 'J1', label: '1st - Group J Winner', desc: 'Direct slot to Hard Rock Stadium, Miami' },
                      { key: 'J2', label: '2nd - Group J Runner-up', desc: 'Direct slot to SoFi Stadium, Los Angeles' },
                      { key: 'J3', label: '3rd - Wildcard Progression', desc: 'Requires ranking in top 8 third-place spots' },
                    ].map(seat => (
                      <button
                        key={seat.key}
                        onClick={() => handleSeatChange(seat.key as any)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex justify-between items-center ${
                          argentinaGroupSeat === seat.key
                            ? 'bg-sky-500/10 border-sky-500 text-white shadow-md'
                            : 'bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800'
                        }`}
                      >
                        <div>
                          <strong className={`block ${argentinaGroupSeat === seat.key ? 'text-sky-400' : 'text-zinc-200'}`}>
                            {seat.label}
                          </strong>
                          <span className="text-[10px] text-zinc-500 block mt-0.5">{seat.desc}</span>
                        </div>
                        {argentinaGroupSeat === seat.key && (
                          <div className="w-5 h-5 rounded-full bg-sky-500 text-zinc-950 flex items-center justify-center font-extrabold text-[10px]">
                            ✓
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Group J Simulated Standing */}
                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-850 pb-2">
                    <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Group J standings table</span>
                    <span className="text-[10px] font-mono text-zinc-500">Live Simulation</span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    {[
                      { pos: 1, name: 'Argentina', flag: '🇦🇷', diff: '+8', pts: 9, isArg: true },
                      { pos: 2, name: 'Austria', flag: '🇦🇹', diff: '+1', pts: 4, isArg: false },
                      { pos: 3, name: 'Algeria', flag: '🇩🇿', diff: '-2', pts: 3, isArg: false },
                      { pos: 4, name: 'Jordan', flag: '🇯🇴', diff: '-7', pts: 1, isArg: false }
                    ].map((item, index) => {
                      // Adjust indices based on state
                      let actualDisplayPos = index + 1;
                      if (argentinaGroupSeat === 'J2') {
                        if (index === 0) { item = { pos: 1, name: 'Austria', flag: '🇦🇹', diff: '+4', pts: 7, isArg: false }; actualDisplayPos = 1; }
                        else if (index === 1) { item = { pos: 2, name: 'Argentina', flag: '🇦🇷', diff: '+3', pts: 6, isArg: true }; actualDisplayPos = 2; }
                      } else if (argentinaGroupSeat === 'J3') {
                        if (index === 0) { item = { pos: 1, name: 'Austria', flag: '🇦🇹', diff: '+4', pts: 7, isArg: false }; actualDisplayPos = 1; }
                        else if (index === 1) { item = { pos: 2, name: 'Algeria', flag: '🇩🇿', diff: '+1', pts: 6, isArg: false }; actualDisplayPos = 2; }
                        else if (index === 2) { item = { pos: 3, name: 'Argentina', flag: '🇦🇷', diff: '0', pts: 4, isArg: true }; actualDisplayPos = 3; }
                      }

                      const rowColor = item.isArg 
                        ? 'bg-sky-500/10 border-sky-500/30 text-white' 
                        : 'border-zinc-850 text-zinc-400';

                      return (
                        <div key={item.name} className={`flex items-center justify-between p-2.5 rounded-xl border ${rowColor}`}>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-zinc-500 text-[10px] w-3">{actualDisplayPos}</span>
                            <span className="text-sm">{item.flag}</span>
                            <span className={`font-semibold ${item.isArg && "text-sky-305"}`}>{item.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-[11px]">
                            <span>GD: {item.diff}</span>
                            <strong className="text-zinc-200">{item.pts} PTS</strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Dynamic Path Outcome Card */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-6 shadow-xl flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="text-[11px] font-mono uppercase bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-full text-zinc-400">
                        📍 Dynamic Classification Strategy Map
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
                        {currentR32.matchId} Assignee
                      </span>
                    </div>

                    {/* Headline opponent banner */}
                    <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl" />
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                          ROUND OF 32 - OPPONENT MATCHUP
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{currentR32.oppoFlag}</span>
                          <h3 className="text-lg font-black text-white">{currentR32.opponent}</h3>
                        </div>
                        <p className="text-xs text-sky-400 font-medium font-sans">
                          🏟️ Venue: {currentR32.venue}
                        </p>
                      </div>

                      <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-sky-450" />
                        <div>
                          <span className="text-[9px] text-zinc-550 block font-mono">SCHEDULE TIME</span>
                          <strong className="text-xs text-white font-mono">{currentR32.date}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Path analysis description */}
                    <div className="space-y-3.5 bg-zinc-950/40 border border-zinc-850/80 p-5 rounded-2xl">
                      <h5 className="text-xs font-black uppercase text-zinc-200 tracking-wide font-mono flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-yellow-400" /> {currentR32.headline}
                      </h5>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans mt-1">
                        {currentR32.desc}
                      </p>
                    </div>

                    {/* World Cup 2026 Cities map representation */}
                    <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 block mb-3 uppercase tracking-wider">
                        🏟️ MATCH LOCATION INTEL & AUDIENCE PROFILE:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-900 text-center">
                          <span className="text-[9px] text-zinc-500 block font-mono">CAPACITY</span>
                          <span className="text-xs font-bold text-zinc-200 block mt-0.5">75,000+</span>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-900 text-center">
                          <span className="text-[9px] text-zinc-500 block font-mono">LATITUDE ACCENTS</span>
                          <span className="text-xs font-bold text-zinc-200 block mt-0.5">Grass Surface</span>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-900 text-center">
                          <span className="text-[9px] text-zinc-500 block font-mono">TRAVEL MILES</span>
                          <span className="text-xs font-bold text-zinc-200 block mt-0.5">Low exhaustion</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setActiveTab('bracket')}
                      className="flex-1 py-3 px-4 bg-sky-500 hover:bg-sky-400 text-zinc-950 font-black uppercase text-xs tracking-wider rounded-xl transition duration-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Simulate Next Round</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                        setActiveTab('draw');
                      }}
                      className="py-3 px-4 bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 text-zinc-300 font-bold text-xs tracking-wide rounded-xl transition cursor-pointer"
                    >
                      View Competitor Groups
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TABLE OF GROUPS (A-L) */}
          {activeTab === 'draw' && (
            <div className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wider">
                    ⚽ 12 Combined Tournament Pools (Groups A - L)
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    The top two teams from each group plus the eight best third-placed teams qualify securely for the Knockout bracket.
                  </p>
                </div>
                
                <span className="text-[10px] font-mono bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold px-3 py-1 rounded-lg">
                  🎯 Highlight: Group J Winner plays H2 in Miami
                </span>
              </div>

              {/* Grid representation mimicking the exact original infographic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {GROUPS_DATA.map(group => {
                  const isArgentinaGroup = group.letter === 'J';

                  return (
                    <div 
                      key={group.letter} 
                      className={`bg-zinc-900 border rounded-2xl px-4 py-3.5 transition-all shadow-md overflow-hidden ${
                        isArgentinaGroup
                          ? 'border-sky-500/50 bg-gradient-to-b from-sky-950/20 to-zinc-900 ring-1 ring-sky-500/10'
                          : 'border-zinc-850 hover:border-zinc-800'
                      }`}
                    >
                      <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5 mb-2.5">
                        <h5 className="font-extrabold text-xs font-mono tracking-wide uppercase flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${isArgentinaGroup ? 'bg-sky-400 animate-pulse' : 'bg-transparent'}`} />
                          Group {group.letter}
                        </h5>
                        {isArgentinaGroup && (
                          <span className="text-[9px] font-serif bg-sky-400 text-zinc-950 font-bold px-1.5 rounded uppercase font-sans animate-bounce tracking-wide">
                            ARGENTINA
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 font-sans">
                        {group.teams.map((team, tIdx) => {
                          const isArgentina = team.name === 'Argentina';

                          return (
                            <div 
                              key={team.name} 
                              className={`flex items-center justify-between p-1.5 rounded-lg text-xs leading-none transition-colors ${
                                isArgentina 
                                  ? 'bg-sky-500/10 text-sky-305 font-bold' 
                                  : 'text-zinc-400 hover:text-zinc-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{team.flag}</span>
                                <span className={isArgentina ? "text-sky-300" : "text-zinc-300"}>{team.name}</span>
                              </div>
                              <span className="text-[10px] font-mono text-zinc-550">#{tIdx + 1 || 4}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PLAYOFF BRACKET SIMULATOR */}
          {activeTab === 'bracket' && (
            <div className="space-y-6">
              {/* Informative Header with status info */}
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-sm font-black text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                    🔥 Knockout Bracket Simulation Playfield
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Play out the matches of the FIFA World Cup 2026. Tap any team on a matchup node to advance them!
                  </p>
                </div>

                <div className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 p-3 rounded-2xl flex items-center gap-3 text-xs flex-shrink-0">
                  <span className="text-[10px] font-mono text-zinc-500">🏆 CHAMPION SELECTION:</span>
                  <div className="flex items-center gap-1.5 font-bold text-sky-400">
                    <span>🇦🇷</span>
                    <span>{champion}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic scrollable Bracket Grid View */}
              <div className="relative overflow-x-auto pb-4 pt-1 select-none">
                <div className="flex gap-8 justify-between min-w-[1200px] px-2">
                  
                  {/* Column 1: Round of 32 (8 Matchup Nodes) */}
                  <div className="flex flex-col justify-between space-y-4 py-2 w-64 flex-shrink-0">
                    <span className="text-[10px] font-mono text-zinc-550 block font-bold text-center border-b border-zinc-900 pb-2">ROUND OF 32 (16 Matches)</span>
                    
                    {/* Node 1 */}
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850 space-y-1.5">
                      <div className="text-[9px] font-mono text-zinc-550">Jun 28 • Los Angeles</div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m1 === 'Mexico' ? 'UEFA (A)' : 'Mexico';
                          setR32Winners({ ...r32Winners, m1: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m1 === 'Mexico' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇲🇽 Mexico</span>
                        {r32Winners.m1 === 'Mexico' && <span className="text-[9px] text-sky-400 font-mono">1st</span>}
                      </div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m1 === 'UEFA (A)' ? 'Mexico' : 'UEFA (A)';
                          setR32Winners({ ...r32Winners, m1: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m1 === 'UEFA (A)' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇪🇺 UEFA (A)</span>
                        {r32Winners.m1 === 'UEFA (A)' && <span className="text-[9px] text-sky-400 font-mono">1st</span>}
                      </div>
                    </div>

                    {/* Node 2 - Argentina Slot if 3rd place */}
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850 space-y-1.5">
                      <div className="text-[9px] font-mono text-zinc-550">Jul 1 • Atlanta</div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m8 === 'England' ? 'Argentina' : 'England';
                          setR32Winners({ ...r32Winners, m8: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m8 === 'England' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿 England</span>
                        {r32Winners.m8 === 'England' && <span className="text-[9px] text-sky-400 font-mono">1st</span>}
                      </div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m8 === 'Argentina' ? 'England' : 'Argentina';
                          setR32Winners({ ...r32Winners, m8: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m8 === 'Argentina' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇦🇷 Argentina</span>
                        {r32Winners.m8 === 'Argentina' && <span className="text-[9px] text-sky-400 font-mono">3rd</span>}
                      </div>
                    </div>

                    {/* Node 3 */}
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850 space-y-1.5">
                      <div className="text-[9px] font-mono text-zinc-550">Jun 29 • Boston</div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m2 === 'Germany' ? 'Curaçao' : 'Germany';
                          setR32Winners({ ...r32Winners, m2: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m2 === 'Germany' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇩🇪 Germany</span>
                        {r32Winners.m2 === 'Germany' && <span className="text-[9px] text-sky-400 font-mono">1st</span>}
                      </div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m2 === 'Curaçao' ? 'Germany' : 'Curaçao';
                          setR32Winners({ ...r32Winners, m2: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m2 === 'Curaçao' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇨🇼 Curaçao</span>
                        {r32Winners.m2 === 'Curaçao' && <span className="text-[9px] text-sky-400 font-mono">2nd</span>}
                      </div>
                    </div>

                    {/* Node 4 - Argentina Slot if Runner-Up */}
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850 space-y-1.5">
                      <div className="text-[9px] font-mono text-zinc-550">Jul 2 • Los Angeles</div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m12 === 'Spain' ? 'Argentina' : 'Spain';
                          setR32Winners({ ...r32Winners, m12: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m12 === 'Spain' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇪🇸 Spain</span>
                        {r32Winners.m12 === 'Spain' && <span className="text-[9px] text-sky-400 font-mono">1st</span>}
                      </div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m12 === 'Argentina' ? 'Spain' : 'Argentina';
                          setR32Winners({ ...r32Winners, m12: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m12 === 'Argentina' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇦🇷 Argentina</span>
                        {r32Winners.m12 === 'Argentina' && <span className="text-[9px] text-sky-400 font-mono">J2 Slot</span>}
                      </div>
                    </div>

                    {/* Node 5 - Argentina Slot if Group J Winner! */}
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850 space-y-1.5">
                      <div className="text-[9px] font-mono text-zinc-550">Jul 3 • Miami</div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m14 === 'Argentina' ? 'Uruguay' : 'Argentina';
                          setR32Winners({ ...r32Winners, m14: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m14 === 'Argentina' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇦🇷 Argentina</span>
                        {r32Winners.m14 === 'Argentina' && <span className="text-[9px] text-sky-400 font-mono">J1 Slot</span>}
                      </div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m14 === 'Uruguay' ? 'Argentina' : 'Uruguay';
                          setR32Winners({ ...r32Winners, m14: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m14 === 'Uruguay' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇺🇾 Uruguay</span>
                        {r32Winners.m14 === 'Uruguay' && <span className="text-[9px] text-sky-400 font-mono">2nd</span>}
                      </div>
                    </div>

                    {/* Node 6 */}
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850 space-y-1.5">
                      <div className="text-[9px] font-mono text-zinc-550">Jun 29 • Monterrey</div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m3 === 'Netherlands' ? 'Japan' : 'Netherlands';
                          setR32Winners({ ...r32Winners, m3: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m3 === 'Netherlands' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇳🇱 Netherlands</span>
                        {r32Winners.m3 === 'Netherlands' && <span className="text-[9px] text-sky-400 font-mono">1st</span>}
                      </div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m3 === 'Japan' ? 'Netherlands' : 'Japan';
                          setR32Winners({ ...r32Winners, m3: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m3 === 'Japan' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇯🇵 Japan</span>
                        {r32Winners.m3 === 'Japan' && <span className="text-[9px] text-sky-400 font-mono">2nd</span>}
                      </div>
                    </div>

                    {/* Node 7 */}
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850 space-y-1.5">
                      <div className="text-[9px] font-mono text-zinc-550">Jun 29 • Houston</div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m4 === 'Brazil' ? 'Scotland' : 'Brazil';
                          setR32Winners({ ...r32Winners, m4: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m4 === 'Brazil' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇧🇷 Brazil</span>
                        {r32Winners.m4 === 'Brazil' && <span className="text-[9px] text-sky-400 font-mono">1st</span>}
                      </div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m4 === 'Scotland' ? 'Brazil' : 'Scotland';
                          setR32Winners({ ...r32Winners, m4: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m4 === 'Scotland' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland</span>
                        {r32Winners.m4 === 'Scotland' && <span className="text-[9px] text-sky-400 font-mono">2nd</span>}
                      </div>
                    </div>

                    {/* Node 8 */}
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850 space-y-1.5">
                      <div className="text-[9px] font-mono text-zinc-550">Jul 2 • Toronto</div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m11 === 'Portugal' ? 'Uzbekistan' : 'Portugal';
                          setR32Winners({ ...r32Winners, m11: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m11 === 'Portugal' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇵🇹 Portugal</span>
                        {r32Winners.m11 === 'Portugal' && <span className="text-[9px] text-sky-400 font-mono">1st</span>}
                      </div>
                      <div 
                        onClick={() => {
                          const w = r32Winners.m11 === 'Uzbekistan' ? 'Portugal' : 'Uzbekistan';
                          setR32Winners({ ...r32Winners, m11: w });
                        }}
                        className={`p-1.5 rounded-lg text-xs flex justify-between items-center cursor-pointer hover:bg-zinc-905 transition ${r32Winners.m11 === 'Uzbekistan' ? "text-sky-305 font-bold" : "text-zinc-500"}`}
                      >
                        <span>🇺🇿 Uzbekistan</span>
                        {r32Winners.m11 === 'Uzbekistan' && <span className="text-[9px] text-sky-400 font-mono">2nd</span>}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Round of 16 (4 Matchup Nodes) */}
                  <div className="flex flex-col justify-around py-2 w-64 flex-shrink-0 relative">
                    <div className="absolute inset-y-0 -left-4 w-px bg-zinc-900 pointer-events-none" />
                    <span className="text-[10px] font-mono text-zinc-550 block font-bold text-center border-b border-zinc-900 pb-2">ROUND OF 16</span>

                    {/* R16 Match 1 */}
                    <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800 space-y-2">
                      <div className="text-[9px] font-mono text-zinc-500 flex justify-between">
                        <span>Match Alpha</span>
                        <span className="text-sky-400">July 6</span>
                      </div>
                      <div 
                        onClick={() => setR16Winners({ ...r16Winners, q1: r32Winners.m1 })}
                        className={`p-2 rounded-lg text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-950 ${r16Winners.q1 === r32Winners.m1 ? "bg-sky-500/10 border border-sky-500/25 text-white font-black" : "text-zinc-400"}`}
                      >
                        <span>{r32Winners.m1}</span>
                        {r16Winners.q1 === r32Winners.m1 && <span>✓</span>}
                      </div>
                      <div 
                        onClick={() => setR16Winners({ ...r16Winners, q1: r32Winners.m8 })}
                        className={`p-2 rounded-lg text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-950 ${r16Winners.q1 === r32Winners.m8 ? "bg-sky-500/10 border border-sky-500/25 text-white font-black" : "text-zinc-400"}`}
                      >
                        <span>{r32Winners.m8}</span>
                        {r16Winners.q1 === r32Winners.m8 && <span>✓</span>}
                      </div>
                    </div>

                    {/* R16 Match 2 */}
                    <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800 space-y-2">
                      <div className="text-[9px] font-mono text-zinc-500 flex justify-between">
                        <span>Match Beta</span>
                        <span className="text-sky-400">July 7</span>
                      </div>
                      <div 
                        onClick={() => setR16Winners({ ...r16Winners, q2: r32Winners.m2 })}
                        className={`p-2 rounded-lg text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-950 ${r16Winners.q2 === r32Winners.m2 ? "bg-sky-500/10 border border-sky-500/25 text-white font-black" : "text-zinc-400"}`}
                      >
                        <span>{r32Winners.m2}</span>
                        {r16Winners.q2 === r32Winners.m2 && <span>✓</span>}
                      </div>
                      <div 
                        onClick={() => setR16Winners({ ...r16Winners, q2: r32Winners.m12 })}
                        className={`p-2 rounded-lg text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-950 ${r16Winners.q2 === r32Winners.m12 ? "bg-sky-500/10 border border-sky-500/25 text-white font-black" : "text-zinc-400"}`}
                      >
                        <span>{r32Winners.m12}</span>
                        {r16Winners.q2 === r32Winners.m12 && <span>✓</span>}
                      </div>
                    </div>

                    {/* R16 Match 3 (Argentina Golden Node J1 Winner Root!) */}
                    <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800 space-y-2">
                      <div className="text-[9px] font-mono text-zinc-500 flex justify-between">
                        <span>Match Gamma</span>
                        <span className="text-sky-400 font-bold">July 7</span>
                      </div>
                      <div 
                        onClick={() => setR16Winners({ ...r16Winners, q6: r32Winners.m14 })}
                        className={`p-2 rounded-lg text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-950 ${r16Winners.q6 === r32Winners.m14 ? "bg-sky-500/10 border border-sky-500/25 text-white font-black" : "text-zinc-400"}`}
                      >
                        <span>{r32Winners.m14}</span>
                        {r16Winners.q6 === r32Winners.m14 && <span>✓</span>}
                      </div>
                      <div 
                        onClick={() => setR16Winners({ ...r16Winners, q6: r32Winners.m3 })}
                        className={`p-2 rounded-lg text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-950 ${r16Winners.q6 === r32Winners.m3 ? "bg-sky-500/10 border border-sky-500/25 text-white font-black" : "text-zinc-400"}`}
                      >
                        <span>{r32Winners.m3}</span>
                        {r16Winners.q6 === r32Winners.m3 && <span>✓</span>}
                      </div>
                    </div>

                    {/* R16 Match 4 */}
                    <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800 space-y-2">
                      <div className="text-[9px] font-mono text-zinc-500 flex justify-between">
                        <span>Match Delta</span>
                        <span className="text-sky-400">July 8</span>
                      </div>
                      <div 
                        onClick={() => setR16Winners({ ...r16Winners, q8: r32Winners.m4 })}
                        className={`p-2 rounded-lg text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-950 ${r16Winners.q8 === r32Winners.m4 ? "bg-sky-500/10 border border-sky-500/25 text-white font-black" : "text-zinc-400"}`}
                      >
                        <span>{r32Winners.m4}</span>
                        {r16Winners.q8 === r32Winners.m4 && <span>✓</span>}
                      </div>
                      <div 
                        onClick={() => setR16Winners({ ...r16Winners, q8: r32Winners.m11 })}
                        className={`p-2 rounded-lg text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-950 ${r16Winners.q8 === r32Winners.m11 ? "bg-sky-500/10 border border-sky-500/25 text-white font-black" : "text-zinc-400"}`}
                      >
                        <span>{r32Winners.m11}</span>
                        {r16Winners.q8 === r32Winners.m11 && <span>✓</span>}
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Quarter-Finals (2 Matchup Nodes) */}
                  <div className="flex flex-col justify-around py-2 w-64 flex-shrink-0 relative">
                    <div className="absolute inset-y-0 -left-4 w-px bg-zinc-900 pointer-events-none" />
                    <span className="text-[10px] font-mono text-zinc-550 block font-bold text-center border-b border-zinc-900 pb-2">QUARTER-FINALS</span>

                    {/* QF 1 */}
                    <div className="bg-zinc-900/60 p-4 border border-zinc-850 rounded-2xl space-y-2.5">
                      <div className="text-[9px] font-mono text-emerald-400 flex justify-between font-bold">
                        <span>Quarter-Final Alpha</span>
                        <span>July 10 • Boston</span>
                      </div>
                      <div 
                        onClick={() => setQfWinners({ ...qfWinners, s1: r16Winners.q1 })}
                        className={`p-2.5 rounded-xl text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-900 ${qfWinners.s1 === r16Winners.q1 ? "bg-sky-500/10 border border-sky-500/25 text-white font-bold" : "text-zinc-500"}`}
                      >
                        <span>{r16Winners.q1}</span>
                        {qfWinners.s1 === r16Winners.q1 && <span>✓</span>}
                      </div>
                      <div 
                        onClick={() => setQfWinners({ ...qfWinners, s1: r16Winners.q2 })}
                        className={`p-2.5 rounded-xl text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-900 ${qfWinners.s1 === r16Winners.q2 ? "bg-sky-500/10 border border-sky-500/25 text-white font-bold" : "text-zinc-500"}`}
                      >
                        <span>{r16Winners.q2}</span>
                        {qfWinners.s1 === r16Winners.q2 && <span>✓</span>}
                      </div>
                    </div>

                    {/* QF 2 */}
                    <div className="bg-zinc-900/60 p-4 border border-zinc-850 rounded-2xl space-y-2.5">
                      <div className="text-[9px] font-mono text-emerald-400 flex justify-between font-bold">
                        <span>Quarter-Final Beta</span>
                        <span>July 11 • Miami</span>
                      </div>
                      <div 
                        onClick={() => setQfWinners({ ...qfWinners, s2: r16Winners.q6 })}
                        className={`p-2.5 rounded-xl text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-900 ${qfWinners.s2 === r16Winners.q6 ? "bg-sky-500/10 border border-sky-500/25 text-white font-bold animate-pulse" : "text-zinc-500"}`}
                      >
                        <span>{r16Winners.q6}</span>
                        {qfWinners.s2 === r16Winners.q6 && <span>✓</span>}
                      </div>
                      <div 
                        onClick={() => setQfWinners({ ...qfWinners, s2: r16Winners.q8 })}
                        className={`p-2.5 rounded-xl text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-900 ${qfWinners.s2 === r16Winners.q8 ? "bg-sky-500/10 border border-sky-500/25 text-white font-bold" : "text-zinc-500"}`}
                      >
                        <span>{r16Winners.q8}</span>
                        {qfWinners.s2 === r16Winners.q8 && <span>✓</span>}
                      </div>
                    </div>
                  </div>

                  {/* Column 4: Semi-Finals & Champion Peak */}
                  <div className="flex flex-col justify-center space-y-12 py-2 w-64 flex-shrink-0 relative">
                    <div className="absolute inset-y-0 -left-4 w-px bg-zinc-900 pointer-events-none" />
                    <span className="text-[10px] font-mono text-zinc-550 block font-bold text-center border-b border-zinc-900 pb-2">SEMI-FINALS & FINAl</span>

                    {/* SF Duel */}
                    <div className="bg-zinc-950 p-4 rounded-2xl border border-sky-500/30 space-y-3 shadow-lg shadow-sky-500/5">
                      <div className="text-[9px] font-mono text-yellow-500 flex justify-between font-bold">
                        <span>Semi-Final Grid</span>
                        <span>July 14 • Dallas</span>
                      </div>
                      <div 
                        onClick={() => setSfWinners({ ...sfWinners, f1: qfWinners.s1 })}
                        className={`p-2.5 rounded-xl text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-900 ${sfWinners.f1 === qfWinners.s1 ? "text-sky-305 font-black" : "text-zinc-500"}`}
                      >
                        <span>{qfWinners.s1}</span>
                        {sfWinners.f1 === qfWinners.s1 && <span>🤝</span>}
                      </div>
                      <div 
                        onClick={() => setSfWinners({ ...sfWinners, f1: qfWinners.s2 })}
                        className={`p-2.5 rounded-xl text-xs flex justify-between items-center cursor-pointer transition hover:bg-zinc-900 ${sfWinners.f1 === qfWinners.s2 ? "text-sky-305 font-black" : "text-zinc-500"}`}
                      >
                        <span>{qfWinners.s2}</span>
                        {sfWinners.f1 === qfWinners.s2 && <span>🤝</span>}
                      </div>
                    </div>

                    {/* Gold Podium Finale Match */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/20 p-5 rounded-3xl border border-yellow-500/40 text-center space-y-3 shadow-xl">
                      <div className="flex justify-center">
                        <Trophy className="w-8 h-8 text-yellow-405 fill-yellow-405/20 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold text-yellow-500 uppercase tracking-widest block">GRAND FINALE CHAMPION CUP</span>
                        <strong className="text-[10px] text-zinc-400 font-mono block">July 19 • MetLife, NY</strong>
                      </div>

                      <div className="bg-zinc-950/90 rounded-xl p-3 border border-yellow-500/20 space-y-2">
                        <span className="text-[10px] text-zinc-500 font-mono block">CLICK WINNER TO CROWN</span>
                        
                        <button
                          onClick={() => setChampion(sfWinners.f1)}
                          className={`w-full py-1.5 px-2 rounded text-xs font-bold transition-all ${
                            champion === sfWinners.f1 ? 'bg-yellow-500 text-zinc-950 font-black shadow-md' : 'text-zinc-400 hover:bg-zinc-900'
                          }`}
                        >
                          🇦🇷 {sfWinners.f1}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Informational Banner */}
              <div className="bg-zinc-950/60 border border-zinc-850 px-4 py-3 rounded-2xl flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-yellow-450 animate-ping flex-shrink-0" />
                <p className="text-[11px] text-zinc-400">
                  <strong className="font-bold text-yellow-500 font-mono">Interactive Bracket active:</strong> Simply tap any soccer squad node inside the layout to advance them to the next grand final tier. Turn the keys together for Messi to hold the final cup!
                </p>
              </div>

            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
};
