import React, { useState, useMemo } from 'react';
import { 
  SQUAD, 
  RECENT_CALLUPS, 
  MOST_APPEARANCES, 
  TOP_GOALSCORERS, 
  Player 
} from '../../data/argentinaData';
import { getPlayerImage } from '../../data/playerImages';
import { 
  Search, 
  ArrowUpDown, 
  Users, 
  Star, 
  ShieldAlert, 
  Trophy, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SquadView: React.FC = () => {
  const [squadSearch, setSquadSearch] = useState('');
  const [squadPosition, setSquadPosition] = useState<string>('All');
  const [squadSort, setSquadSort] = useState<'no' | 'name' | 'caps' | 'goals' | 'age'>('no');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(SQUAD.find(p => p.player === "Lionel Messi") || SQUAD[0]);

  // Process & Filter Squad
  const processedSquad = useMemo(() => {
    let list = [...SQUAD];

    // Search
    if (squadSearch.trim()) {
      const q = squadSearch.toLowerCase();
      list = list.filter(p => 
        p.player.toLowerCase().includes(q) || 
        p.club.toLowerCase().includes(q)
      );
    }

    // Position Filter
    if (squadPosition !== 'All') {
      list = list.filter(p => p.pos === squadPosition);
    }

    // Sorting
    list.sort((a, b) => {
      if (squadSort === 'no') return a.no - b.no;
      if (squadSort === 'name') return a.player.localeCompare(b.player);
      if (squadSort === 'caps') return b.caps - a.caps;
      if (squadSort === 'goals') return b.goals - a.goals;
      if (squadSort === 'age') return a.age - b.age;
      return 0;
    });

    return list;
  }, [squadSearch, squadPosition, squadSort]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      
      {/* Left Roster with search and filters (8 columns) */}
      <div className="xl:col-span-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold font-sans text-white">Squad & Roster Command</h3>
            <p className="text-xs text-zinc-500 mt-1">2026 World Cup official first team squad pool</p>
          </div>

          {/* Quick interactive search/sort controls */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search field */}
            <div className="relative w-full sm:w-44">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={squadSearch}
                onChange={(e) => setSquadSearch(e.target.value)}
                placeholder="Search name/club..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-300 outline-none focus:border-sky-500 transition-colors placeholder:text-zinc-600"
              />
            </div>

            {/* Sort selector */}
            <div className="relative flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-400">
              <ArrowUpDown className="w-3 h-3 text-sky-400" />
              <select
                value={squadSort}
                onChange={(e) => setSquadSort(e.target.value as any)}
                className="bg-transparent border-none text-zinc-200 outline-none pr-1 font-bold font-mono focus:ring-0"
              >
                <option value="no">By Number</option>
                <option value="name">By Name</option>
                <option value="caps">By Caps</option>
                <option value="goals">By Goals</option>
                <option value="age">By Age</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic position filters */}
        <div className="flex flex-wrap gap-1.5 border-b border-zinc-800 pb-4">
          {['All', 'GK', 'DF', 'MF', 'FW'].map(pos => (
            <button
              key={pos}
              onClick={() => setSquadPosition(pos)}
              className={`py-1.5 px-3.5 rounded-xl text-xs font-bold uppercase font-mono transition-all duration-200 border ${
                squadPosition === pos 
                  ? 'bg-sky-500/10 text-sky-400 border-sky-500/30 font-extrabold' 
                  : 'bg-zinc-950 text-zinc-500 border-zinc-800/80 hover:text-zinc-300'
              }`}
            >
              {pos === 'All' ? '⭐ SHOW ALL STARS' : pos === 'GK' ? '🧤 Goalkeepers' : pos === 'DF' ? '🛡️ Defenders' : pos === 'MF' ? '⚡ Midfielders' : '🥅 Forwards'}
            </button>
          ))}
        </div>

        {/* Player Roster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {processedSquad.map(player => {
              const isSelected = selectedPlayer?.player === player.player;
              const playerImg = getPlayerImage(player.player);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={player.no}
                  onClick={() => setSelectedPlayer(player)}
                  className={`bg-zinc-950/40 hover:bg-zinc-950/90 p-4 rounded-2xl border cursor-pointer transition-all shadow group relative overflow-hidden flex flex-col justify-between h-[155px] ${
                    isSelected ? 'border-sky-400/80 bg-zinc-950 shadow-md shadow-sky-500/5' : 'border-zinc-800/80 hover:border-sky-500/20'
                  }`}
                >
                  {/* Decorative faint stripes background */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 albi-stripes opacity-5 pointer-events-none" />

                  <div className="flex justify-between items-start z-10">
                    <span className={`text-2xl font-black font-mono transition-colors leading-none ${
                      isSelected ? 'text-sky-400' : 'text-zinc-700 group-hover:text-sky-400'
                    }`}>
                      #{player.no}
                    </span>
                    <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-md ${
                      player.pos === 'GK' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/15' :
                      player.pos === 'DF' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/15' :
                      player.pos === 'MF' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/15' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                    }`}>
                      {player.pos}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mt-2 z-10">
                    {/* Compact Image in Card thumbnail */}
                    <div className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden relative flex-shrink-0">
                      <img 
                        src={playerImg} 
                        alt={player.player} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-xs sm:text-sm text-zinc-100 group-hover:text-white truncate flex items-center gap-1">
                        {player.player}
                        {player.player === 'Lionel Messi' && <span className="text-yellow-400 text-xs" title="Captain">👑</span>}
                      </h4>
                      <span className="text-[10px] text-zinc-500 block truncate mt-0.5 uppercase tracking-wide font-medium">
                        {player.club}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 border-t border-zinc-900/60 mt-3.5 pt-2 text-[10px] sm:text-[11px] font-mono text-zinc-400 z-10">
                    <div>Appearances: <strong className="text-zinc-200">{player.caps}</strong></div>
                    <div>Goals: <strong className="text-zinc-200">{player.goals}</strong></div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {processedSquad.length === 0 && (
            <div className="col-span-full text-center py-12 text-zinc-600 text-xs font-mono">
              No stars found matching that search filter parameter.
            </div>
          )}
        </div>
      </div>

      {/* Right Spotlight Details Sidebar (4 columns) */}
      <div className="xl:col-span-4 space-y-6">
        
        {/* Dynamic Detail Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="text-xs font-bold font-mono tracking-wider text-zinc-400 uppercase mb-4 flex items-center gap-1.5 border-b border-zinc-800 pb-2.5">
            <Star className="w-4 h-4 text-sky-400" /> Star Player Profile Card
          </h3>

          {selectedPlayer ? (
            <div className="space-y-5">
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg relative">
                {/* Visual Header Face with rich graphics */}
                <div className="relative aspect-[3/4] bg-zinc-900">
                  <img 
                    src={getPlayerImage(selectedPlayer.player)} 
                    alt={selectedPlayer.player} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glassmorphic player badge bottom-left */}
                  <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-sky-400">
                    #{selectedPlayer.no}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[9px] font-mono bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold px-2 py-0.5 rounded uppercase">
                      {selectedPlayer.pos} Position
                    </span>
                    <h4 className="text-xl font-black text-white mt-1 leading-snug">{selectedPlayer.player}</h4>
                    <p className="text-[11px] text-zinc-400 font-medium">{selectedPlayer.club}</p>
                  </div>
                </div>

                {/* Extended Bio specifications list */}
                <div className="p-4 space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-2 pb-3.5 border-b border-zinc-900/60 text-center font-mono">
                    <div className="bg-zinc-900/30 p-2 border border-zinc-900 rounded-xl">
                      <span className="text-[9px] text-zinc-500 block uppercase">Appearances</span>
                      <span className="text-md font-bold text-white block">{selectedPlayer.caps}</span>
                    </div>
                    <div className="bg-zinc-900/30 p-2 border border-zinc-900 rounded-xl">
                      <span className="text-[9px] text-zinc-500 block uppercase">Goals</span>
                      <span className="text-md font-bold text-sky-400 block">{selectedPlayer.goals}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-zinc-400">
                    <div className="flex justify-between items-center py-1 border-b border-zinc-900/30">
                      <span>Born Date</span>
                      <span className="text-zinc-200 font-bold">{selectedPlayer.birthDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-zinc-900/30">
                      <span>Current Age</span>
                      <span className="text-zinc-200 font-bold">{selectedPlayer.age} yrs</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-zinc-900/30">
                      <span>Representing Club</span>
                      <span className="text-zinc-200 font-bold truncate max-w-[170px]">{selectedPlayer.club}</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span>Status</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active squad
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-950/40 border border-dashed border-zinc-800 rounded-2xl">
              <Users className="w-8 h-8 text-zinc-600 mx-auto mb-2.5" />
              <h4 className="text-white text-xs font-bold">Select a Player Card</h4>
              <p className="text-[11px] text-zinc-500 max-w-[190px] mx-auto mt-1 leading-relaxed">
                Click any player grid box on the left layout to load full visual biometric cards.
              </p>
            </div>
          )}
        </div>

        {/* Historic Legends Statistics List */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" /> All-Time Scoring Records
          </h3>
          
          <div className="space-y-2 bg-zinc-950/40 border border-zinc-800 p-4 rounded-2xl">
            {TOP_GOALSCORERS.slice(0, 5).map((l, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-zinc-900/50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-zinc-500 font-bold">{idx+1}</span>
                  <span className={`font-semibold ${l.player === "Lionel Messi" ? "text-yellow-405 font-bold" : "text-zinc-300"}`}>
                    {l.player}
                  </span>
                </div>
                <div className="font-mono text-zinc-200 font-bold text-right flex items-center gap-1.5">
                  <span className="text-[9px] text-zinc-500 font-semibold">{l.career}</span>
                  <span className="text-sky-400">{l.goals}⚽</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-bold font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-2 pt-2">
            🏆 All-Time Appearance Leaders
          </h3>
          <div className="space-y-2 bg-zinc-950/40 border border-zinc-800 p-4 rounded-2xl">
            {MOST_APPEARANCES.slice(0, 5).map((l, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-zinc-900/50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-zinc-500 font-bold">{idx+1}</span>
                  <span className={`font-semibold ${l.player === "Lionel Messi" ? "text-yellow-405 font-bold" : "text-zinc-300"}`}>
                    {l.player}
                  </span>
                </div>
                <div className="font-mono text-zinc-200 font-bold text-right flex items-center gap-1.5">
                  <span className="text-[9px] text-zinc-500 font-semibold">{l.career}</span>
                  <span>{l.caps} caps</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reserves & Back up players */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-3">
          <h3 className="text-sm font-bold font-mono tracking-wider text-zinc-400 uppercase">
            🔄 Reserve Roster pool
          </h3>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            Players in key friendly rosters or youth pools including new wunderkinds.
          </p>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {RECENT_CALLUPS.slice(0, 5).map((r, idx) => (
              <div key={idx} className="bg-zinc-950/30 border border-zinc-800/60 p-3 rounded-xl flex items-center justify-between text-xs hover:border-zinc-700 transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800">
                    <img 
                      src={getPlayerImage(r.player, true)} 
                      alt={r.player} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-250 block">{r.player}</span>
                    <span className="text-[10px] text-zinc-500 block truncate max-w-[130px]">{r.club} • {r.pos}</span>
                  </div>
                </div>
                <span className="text-[9px] font-semibold bg-zinc-900 text-zinc-400 py-1 px-1.5 border border-zinc-800 rounded font-mono">
                  {r.caps} caps
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
