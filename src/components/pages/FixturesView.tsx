import React, { useState, useMemo } from 'react';
import { RESULTS_AND_FIXTURES } from '../../data/argentinaData';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Trophy, 
  Search, 
  Compass, 
  Bookmark, 
  TrendingUp, 
  CheckCircle,
  HelpCircle,
  Table,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FixturesView: React.FC = () => {
  const [filterMode, setFilterMode] = useState<'All' | 'Results' | 'Upcoming'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewFormat, setViewFormat] = useState<'table' | 'cards'>('table');

  // Process and filter matches
  const processedMatches = useMemo(() => {
    let list = [...RESULTS_AND_FIXTURES];

    // Filter by type
    if (filterMode === 'Results') {
      list = list.filter(m => !m.isFuture);
    } else if (filterMode === 'Upcoming') {
      list = list.filter(m => m.isFuture);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m => 
        m.opponent.toLowerCase().includes(q) || 
        m.competition.toLowerCase().includes(q) ||
        m.venue.toLowerCase().includes(q)
      );
    }

    return list;
  }, [filterMode, searchQuery]);

  // Aggregate stats from the results
  const playedStats = useMemo(() => {
    const played = RESULTS_AND_FIXTURES.filter(m => !m.isFuture);
    const wins = played.filter(m => m.result === 'W').length;
    const draws = played.filter(m => m.result === 'D').length;
    const losses = played.filter(m => m.result === 'L').length;
    return { played: played.length, wins, draws, losses };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Fixture List (8 cols) */}
      <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6">
        
        {/* Header and filters controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold font-sans text-white">Campaign Fixture Center</h3>
            <p className="text-xs text-zinc-500 mt-1">Scheduled matches, international fixtures and full scoreboard</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-44">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opponent..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-350 outline-none focus:border-sky-500 transition-colors placeholder:text-zinc-650"
              />
            </div>

            {/* Segmented Filter Option */}
            <div className="flex bg-zinc-950 border border-zinc-800 rounded-xl p-1 text-xs">
              {(['All', 'Results', 'Upcoming'] as const).map(option => (
                <button
                  key={option}
                  onClick={() => setFilterMode(option)}
                  className={`py-1.5 px-3 rounded-lg font-bold transition-all ${
                    filterMode === option 
                      ? 'bg-sky-500 text-zinc-950 font-extrabold' 
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* View Switcher Toggle */}
            <div className="flex bg-zinc-950 border border-zinc-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setViewFormat('table')}
                className={`py-1.5 px-2.5 rounded-lg transition-all flex items-center gap-1.5 font-bold ${
                  viewFormat === 'table'
                    ? 'bg-sky-500 text-zinc-950 font-extrabold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Table View"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setViewFormat('cards')}
                className={`py-1.5 px-2.5 rounded-lg transition-all flex items-center gap-1.5 font-bold ${
                  viewFormat === 'cards'
                    ? 'bg-sky-500 text-zinc-950 font-extrabold'
                    : 'text-zinc-400 hover:text-zinc-205'
                }`}
                title="Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Toggleable Fixtures Content: Table View vs Cards Feed */}
        <div className="space-y-4">
          {viewFormat === 'table' ? (
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/20 shadow-inner">
              <table className="w-full text-left border-collapse min-w-[650px] relative">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/60 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    <th className="py-4 px-4 font-extrabold">Date & Competition</th>
                    <th className="py-4 px-4 font-extrabold">Matchup Details</th>
                    <th className="py-4 px-4 font-extrabold">Stadium & Venue</th>
                    <th className="py-4 px-4 font-extrabold text-center">Score / Time</th>
                    <th className="py-4 px-4 font-extrabold text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/40 text-xs">
                  {processedMatches.map((match) => {
                    const isPlayed = !match.isFuture;
                    return (
                      <tr 
                        key={`${match.date}-${match.opponent}`}
                        className="hover:bg-zinc-950/40 transition group font-sans"
                      >
                        {/* Date & Competition */}
                        <td className="py-4 px-4 space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 font-bold block">{match.date}</span>
                          <span className="text-[9px] font-mono bg-sky-950/40 border border-sky-900/60 text-sky-400 px-1.5 py-0.5 rounded uppercase block w-fit truncate max-w-[150px]" title={match.competition}>
                            {match.competition}
                          </span>
                        </td>

                        {/* Matchup */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-zinc-90 w-fit border border-zinc-800 flex items-center justify-center font-black font-mono text-[9px] text-zinc-400">
                              {match.opponent.slice(0, 3).toUpperCase()}
                            </div>
                            <span className="text-zinc-200 font-extrabold">
                              {match.isHome ? "Argentina" : match.opponent} 
                              <span className="text-zinc-500 font-normal mx-1 text-[11px]">vs</span> 
                              {match.isHome ? match.opponent : "Argentina"}
                            </span>
                          </div>
                        </td>

                        {/* Venue */}
                        <td className="py-4 px-4 text-zinc-400 text-[11px] font-medium max-w-[180px] truncate" title={match.venue}>
                          {match.venue}
                        </td>

                        {/* Score or Scheduled hour */}
                        <td className="py-4 px-4 text-center">
                          {isPlayed ? (
                            <span className="bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded-lg font-bold font-mono text-xs inline-block">
                              <span className={match.result === 'W' ? 'text-emerald-400' : match.result === 'L' ? 'text-red-400' : 'text-zinc-300'}>
                                {match.scoreOrTime}
                              </span>
                            </span>
                          ) : (
                            <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold px-2 py-1 rounded-lg font-mono">
                              ⏱️ {match.scoreOrTime}
                            </span>
                          )}
                        </td>

                        {/* Result Tag */}
                        <td className="py-4 px-4 text-right">
                          {isPlayed ? (
                            <span className={`inline-flex items-center justify-center w-6 h-6 text-[10px] font-black uppercase font-mono rounded-md ${
                              match.result === 'W' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              match.result === 'L' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {match.result}
                            </span>
                          ) : (
                            <span className="text-[10px] text-zinc-500 uppercase font-mono font-bold tracking-wider">
                              Pending
                            </span>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {processedMatches.map((match) => {
                const itemKey = `${match.date}-${match.opponent}`;
                const isPlayed = !match.isFuture;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={itemKey}
                    className="bg-zinc-950/40 hover:bg-zinc-950 border border-zinc-800 hover:border-zinc-700/60 p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all"
                  >
                    {/* Left Metadata Row */}
                    <div className="space-y-1.5 md:w-1/3">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-sky-400 bg-sky-950/40 border border-sky-900/60 px-2 py-0.5 rounded uppercase block w-fit">
                        {match.competition}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono block">
                        {match.date}
                      </span>
                    </div>

                    {/* Rival matchups representation */}
                    <div className="flex items-center justify-between w-full md:w-2/3 gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-center font-black font-mono text-xs text-zinc-400">
                          {match.opponent.slice(0, 3).toUpperCase()}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-sm font-extrabold text-white block">
                            {match.isHome ? "Argentina" : match.opponent} 
                            <span className="text-zinc-500 font-normal mx-1 text-xs">vs</span> 
                            {match.isHome ? match.opponent : "Argentina"}
                          </span>
                          <span className="text-[11px] text-zinc-500 font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-zinc-650" /> {match.venue}
                          </span>
                        </div>
                      </div>

                      {/* Score / Scheduled Hour */}
                      <div className="text-right flex-shrink-0">
                        {isPlayed ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-zinc-500 block uppercase font-mono font-bold">SCORE</span>
                            <span className="bg-zinc-900/60 border border-zinc-800 text-sm font-black font-mono px-3.5 py-1.5 rounded-xl block">
                              <span className={match.result === 'W' ? 'text-emerald-400' : match.result === 'L' ? 'text-red-400' : 'text-zinc-300'}>
                                {match.scoreOrTime}
                              </span>
                            </span>
                            {match.result && (
                              <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black uppercase font-mono ${
                                match.result === 'W' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                match.result === 'L' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {match.result}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-end">
                            <span className="text-[9px] font-mono text-amber-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" /> Scheduled
                            </span>
                            <span className="text-zinc-200 font-bold font-mono text-xs mt-1.5 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg">
                              ⏱️ {match.scoreOrTime} Local
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}

          {processedMatches.length === 0 && (
            <div className="text-center py-12 text-zinc-650 text-xs font-mono border border-dashed border-zinc-800 rounded-2xl">
              No matches found in database matching selection parameters.
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Campaign Insight and standouts (4 cols) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Campaign Metrics aggregate */}
        <div className="bg-zinc-900 border border-zinc-805 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold font-mono tracking-wider text-zinc-400 uppercase">
            📊 Form Performance
          </h3>

          <div className="grid grid-cols-2 gap-2 text-center font-mono">
            <div className="bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-850">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wide block">Wins</span>
              <span className="text-2xl font-extrabold text-emerald-400 block mt-1">{playedStats.wins}</span>
            </div>
            <div className="bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-850">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wide block">Draws</span>
              <span className="text-2xl font-extrabold text-zinc-300 block mt-1">{playedStats.draws}</span>
            </div>
          </div>

          <div className="bg-zinc-950/40 border border-zinc-800 rounded-2xl px-4 py-3.5 flex justify-between items-center text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>Win Rate Ratio</span>
            </div>
            <span className="font-bold text-white font-mono bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded">
              {playedStats.played > 0 ? ((playedStats.wins / playedStats.played) * 100).toFixed(0) : 0}% Win
            </span>
          </div>
        </div>

        {/* qualification table standouts */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-white">CONMEBOL standings</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Campaign status report</p>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-mono bg-zinc-950/40 p-2.5 rounded-xl text-zinc-400">
              <span>Qualification Result:</span>
              <span className="text-emerald-400 font-extrabold">Qualified 🏆</span>
            </div>
            <div className="flex justify-between font-mono p-2 text-zinc-500">
              <span>South America Seed:</span>
              <span className="text-zinc-250 font-bold">#2 Seed</span>
            </div>
            <div className="flex justify-between font-mono p-2 text-zinc-500">
              <span>Goal difference:</span>
              <span className="text-sky-400 font-bold">+21 GD</span>
            </div>
          </div>
        </div>

        {/* 2026 World Cup Group J metadata */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-yellow-400" /> USA/MEX/CAN Group J
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">World Cup finals pool layout</p>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            The Albiceleste will launch their cup defense in Arlington and Kansas City. 
            Group details are locked as following:
          </p>

          <div className="space-y-2 font-mono text-xs">
            <div className="bg-zinc-950/30 p-2.5 rounded-xl border border-zinc-800/80 flex justify-between items-center text-zinc-300 hover:border-sky-500/20 transition-colors">
              <span>🇩🇿 Algeria</span>
              <span className="text-[10px] text-zinc-500">16 June • Kansas City</span>
            </div>
            <div className="bg-zinc-950/30 p-2.5 rounded-xl border border-zinc-800/80 flex justify-between items-center text-zinc-300 hover:border-sky-500/20 transition-colors">
              <span>🇦🇹 Austria</span>
              <span className="text-[10px] text-zinc-500">22 June • Arlington</span>
            </div>
            <div className="bg-zinc-950/30 p-2.5 rounded-xl border border-zinc-800/80 flex justify-between items-center text-zinc-300 hover:border-sky-500/20 transition-colors">
              <span>🇯🇴 Jordan</span>
              <span className="text-[10px] text-zinc-500">27 June • Arlington</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
