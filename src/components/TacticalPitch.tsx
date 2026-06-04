import React, { useState } from 'react';
import { Player } from '../data/argentinaData';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Users, Trophy, Trash2, Award, Zap, HelpCircle, Sliders, Target, Activity, Check, Loader2 } from 'lucide-react';

interface TacticalPitchProps {
  squad: Player[];
}

type Formation = '4-3-3' | '4-4-2' | '3-5-2';

interface PositionNode {
  id: string;
  label: string;
  posType: 'GK' | 'DF' | 'MF' | 'FW';
  top: string; // percentage from top edge
  left: string; // percentage from left edge
}

const FORMATIONS: Record<Formation, PositionNode[]> = {
  '4-3-3': [
    { id: 'GK', label: 'GK', posType: 'GK', top: '85%', left: '50%' },
    { id: 'LD', label: 'LB', posType: 'DF', top: '65%', left: '15%' },
    { id: 'LCD', label: 'LCB', posType: 'DF', top: '70%', left: '38%' },
    { id: 'RCD', label: 'RCB', posType: 'DF', top: '70%', left: '62%' },
    { id: 'RD', label: 'RB', posType: 'DF', top: '65%', left: '85%' },
    { id: 'LCM', label: 'LCM', posType: 'MF', top: '45%', left: '25%' },
    { id: 'CM', label: 'CDM', posType: 'MF', top: '50%', left: '50%' },
    { id: 'RCM', label: 'RCM', posType: 'MF', top: '45%', left: '75%' },
    { id: 'LW', label: 'LW', posType: 'FW', top: '22%', left: '20%' },
    { id: 'ST', label: 'ST', posType: 'FW', top: '15%', left: '50%' },
    { id: 'RW', label: 'RW', posType: 'FW', top: '22%', left: '80%' },
  ],
  '4-4-2': [
    { id: 'GK', label: 'GK', posType: 'GK', top: '85%', left: '50%' },
    { id: 'LD', label: 'LB', posType: 'DF', top: '65%', left: '15%' },
    { id: 'LCD', label: 'LCB', posType: 'DF', top: '70%', left: '38%' },
    { id: 'RCD', label: 'RCB', posType: 'DF', top: '70%', left: '62%' },
    { id: 'RD', label: 'RB', posType: 'DF', top: '65%', left: '85%' },
    { id: 'LM', label: 'LM', posType: 'MF', top: '45%', left: '15%' },
    { id: 'LCM', label: 'LCM', posType: 'MF', top: '48%', left: '38%' },
    { id: 'RCM', label: 'RCM', posType: 'MF', top: '48%', left: '62%' },
    { id: 'RM', label: 'RM', posType: 'MF', top: '45%', left: '85%' },
    { id: 'LST', label: 'LS', posType: 'FW', top: '20%', left: '35%' },
    { id: 'RST', label: 'RS', posType: 'FW', top: '20%', left: '65%' },
  ],
  '3-5-2': [
    { id: 'GK', label: 'GK', posType: 'GK', top: '85%', left: '50%' },
    { id: 'LCB', label: 'LCB', posType: 'DF', top: '70%', left: '25%' },
    { id: 'CB', label: 'CB', posType: 'DF', top: '72%', left: '50%' },
    { id: 'RCB', label: 'RCB', posType: 'DF', top: '70%', left: '75%' },
    { id: 'LWB', label: 'LWB', posType: 'MF', top: '50%', left: '12%' },
    { id: 'LCM', label: 'LCM', posType: 'MF', top: '45%', left: '33%' },
    { id: 'CM', label: 'CDM', posType: 'MF', top: '52%', left: '50%' },
    { id: 'RCM', label: 'RCM', posType: 'MF', top: '45%', left: '67%' },
    { id: 'RWB', label: 'RWB', posType: 'MF', top: '50%', left: '88%' },
    { id: 'LST', label: 'LS', posType: 'FW', top: '20%', left: '35%' },
    { id: 'RST', label: 'RS', posType: 'FW', top: '20%', left: '65%' },
  ],
};

export const TacticalPitch: React.FC<TacticalPitchProps> = ({ squad }) => {
  const [formation, setFormation] = useState<Formation>('4-3-3');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [lineup, setLineup] = useState<Record<string, Player>>({});
  const [isSettingXI, setIsSettingXI] = useState(false);

  // Real-time simulated tactics depth
  const [playstyle, setPlaystyle] = useState<'Tiki-Taka' | 'Attacking' | 'Counter'>('Tiki-Taka');
  const [passingTempo, setPassingTempo] = useState<number>(65);
  const [defensiveDepth, setDefensiveDepth] = useState<number>(80);
  const [pressingIntensity, setPressingIntensity] = useState<number>(85);

  const handlePlaystyleChange = (style: 'Tiki-Taka' | 'Attacking' | 'Counter') => {
    setPlaystyle(style);
    if (style === 'Tiki-Taka') {
      setPassingTempo(65);
      setDefensiveDepth(80);
      setPressingIntensity(85);
    } else if (style === 'Attacking') {
      setPassingTempo(85);
      setDefensiveDepth(90);
      setPressingIntensity(95);
    } else {
      setPassingTempo(90);
      setDefensiveDepth(35);
      setPressingIntensity(50);
    }
  };

  const autoPicksMap: Record<string, string> = {
    GK: 'Emiliano Martínez',
    LD: 'Nicolás Tagliafico',
    RD: 'Nahuel Molina',
    LCD: 'Lisandro Martínez',
    RCD: 'Cristian Romero',
    LCM: 'Alexis Mac Allister',
    CM: 'Enzo Fernández',
    RCM: 'Rodrigo De Paul',
    LM: 'Alexis Mac Allister',
    RM: 'Giovani Lo Celso',
    LW: 'Julián Alvarez',
    RW: 'Lionel Messi',
    ST: 'Lautaro Martínez',
    LST: 'Lionel Messi',
    RST: 'Lautaro Martínez',
    LCB: 'Lisandro Martínez',
    CB: 'Nicolás Otamendi',
    RCB: 'Cristian Romero',
    LWB: 'Nicolás Tagliafico',
    RWB: 'Nahuel Molina',
  };

  const autoFillAlbiceleste = () => {
    const newLineup: Record<string, Player> = {};
    const nodes = FORMATIONS[formation];

    nodes.forEach(node => {
      const preferredName = autoPicksMap[node.id];
      if (preferredName) {
        const p = squad.find(pl => pl.player === preferredName);
        if (p) newLineup[node.id] = p;
      } else {
        // Find first available of that pos which isn't already picket
        const filterPos = squad.filter(pl => pl.pos === node.posType && !Object.values(newLineup).some(x => x.no === pl.no));
        if (filterPos.length > 0) {
          newLineup[node.id] = filterPos[0];
        }
      }
    });

    setLineup(newLineup);
  };

  const handleSetChampionStartingXI = () => {
    setIsSettingXI(true);
    setTimeout(() => {
      autoFillAlbiceleste();
      setIsSettingXI(false);
    }, 1000);
  };

  // Load standard premium star lineup to make Tactical Board active by default
  React.useEffect(() => {
    autoFillAlbiceleste();
  }, [formation, squad]);

  // Stats calculate
  const selectedPlayers = Object.values(lineup) as Player[];
  const totalCaps = selectedPlayers.reduce((acc, p) => acc + p.caps, 0);
  const totalGoals = selectedPlayers.reduce((acc, p) => acc + p.goals, 0);
  const avgAge = selectedPlayers.length > 0 
    ? (selectedPlayers.reduce((acc, p) => acc + p.age, 0) / selectedPlayers.length).toFixed(1) 
    : '0.0';

  const selectPlayerForNode = (nodeId: string, player: Player) => {
    // Check if player is already assigned somewhere else, and swap or remove
    const updatedLineup = { ...lineup };
    for (const key in updatedLineup) {
      if (updatedLineup[key].no === player.no) {
        delete updatedLineup[key];
      }
    }
    updatedLineup[nodeId] = player;
    setLineup(updatedLineup);
    setSelectedNode(null);
  };

  const removePlayerFromNode = (nodeId: string) => {
    const updated = { ...lineup };
    delete updated[nodeId];
    setLineup(updated);
  };

  const clearLineup = () => {
    setLineup({});
  };

  const currentNodeInfo = FORMATIONS[formation].find(n => n.id === selectedNode);

  // Filter available players for selection modal (matching position type)
  const filteredSquadForModal = squad.filter(p => {
    if (!currentNodeInfo) return false;
    return p.pos === currentNodeInfo.posType;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Pitch Display Area */}
      <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <span className="text-xs font-mono text-sky-400 font-semibold tracking-wider uppercase bg-sky-950/50 border border-sky-900 px-2.5 py-1 rounded-md">Tactical Field Simulator</span>
            <h3 className="text-xl font-bold font-sans text-white mt-1">Starting XI Blueprint</h3>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {(['4-3-3', '4-4-2', '3-5-2'] as Formation[]).map(f => (
              <button
                key={f}
                onClick={() => {
                  setFormation(f);
                  clearLineup();
                }}
                className={`py-1.5 px-3.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  formation === f
                    ? 'bg-sky-500 text-zinc-950 shadow-md shadow-sky-500/20'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Board Prompt Banner */}
        <div className="mb-5 bg-gradient-to-r from-sky-950/40 via-zinc-900 to-sky-950/40 border border-sky-900/40 px-4 py-3 rounded-2xl flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse flex-shrink-0" />
          <p className="text-xs text-zinc-300 font-medium font-sans">
            <strong className="text-sky-400 font-bold tracking-wide uppercase mr-1.5 font-mono">Interactive Board Active:</strong>
            Tap any position marker on the pitch map to assign or replace a star from the Argentina squad.
          </p>
        </div>

        {/* The Field SVG styled with absolute layout nodes */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] max-w-2xl mx-auto pitch-green border-4 border-emerald-950/60 rounded-2xl shadow-inner p-1">
          {/* Pitch Markings */}
          <div className="absolute inset-0 border border-emerald-500/20 rounded-xl pointer-events-none">
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24%] aspect-square rounded-full border border-emerald-500/20" />
            {/* Halfway Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-500/20" />
            {/* Penalty Boxes */}
            {/* Top Box */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-[18%] border-b border-x border-emerald-500/20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[25%] h-[6%] border-b border-x border-emerald-500/20" />
            <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[12%] aspect-[2/1] rounded-b-full border-b border-x border-emerald-500/20" />

            {/* Bottom Box */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[18%] border-t border-x border-emerald-500/20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[25%] h-[6%] border-t border-x border-emerald-500/20" />
            <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[12%] aspect-[2/1] rounded-t-full border-t border-x border-emerald-500/20" />
          </div>

          {/* Player Nodes */}
          {FORMATIONS[formation].map(node => {
            const playerAssigned = lineup[node.id];
            const isSelected = selectedNode === node.id;

            return (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                style={{ top: node.top, left: node.left }}
              >
                {playerAssigned ? (
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="group relative cursor-pointer"
                    >
                      {/* Interactive Shirt Avatar */}
                      <div
                        onClick={() => setSelectedNode(node.id)}
                        className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center border-2 shadow-lg transition-all ${
                          node.posType === 'GK'
                            ? 'bg-yellow-500 text-zinc-950 border-yellow-300'
                            : 'bg-white text-zinc-900 border-sky-400'
                        } overflow-hidden`}
                      >
                        {/* Jersey Stripes for Outfield */}
                        {node.posType !== 'GK' && (
                          <div className="absolute inset-0 flex pointer-events-none opacity-40">
                            <div className="w-[15%] h-full bg-sky-300" />
                            <div className="w-[15%] h-full bg-white ml-[10%]" />
                            <div className="w-[15%] h-full bg-sky-300 ml-[10%]" />
                            <div className="w-[15%] h-full bg-white ml-[10%]" />
                            <div className="w-[15%] h-full bg-sky-300 ml-[10%]" />
                          </div>
                        )}
                        <span className="text-xs font-mono font-bold z-10 sm:text-sm">
                          {playerAssigned.no}
                        </span>
                        {playerAssigned.player === 'Lionel Messi' && (
                          <span className="absolute bottom-1 text-[7px] tracking-wider z-20 font-bold bg-zinc-900 text-yellow-400 px-1 rounded">CAP</span>
                        )}
                      </div>

                      {/* Remove Button Hover */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removePlayerFromNode(node.id);
                        }}
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-opacity z-30"
                        title="Remove Player"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </motion.div>

                    {/* Styled Player Label */}
                    <div className="mt-1 flex flex-col items-center pointer-events-none">
                      <span className="bg-zinc-950/90 border border-zinc-800 text-[9px] sm:text-[11px] font-semibold text-zinc-200 px-1.5 py-0.5 rounded shadow max-w-[80px] sm:max-w-[120px] truncate text-center leading-tight">
                        {playerAssigned.player.split(' ').pop()}
                      </span>
                      <span className="text-[7px] sm:text-[8px] tracking-widest text-zinc-400 uppercase font-mono font-bold mt-0.5">
                        {node.label}
                      </span>
                    </div>
                  </div>
                ) : (
                  // Empty Position Node Matcher
                  <button
                    onClick={() => setSelectedNode(node.id)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isSelected
                        ? 'border-sky-400 bg-sky-950/40 text-sky-300 scale-110 shadow-lg shadow-sky-500/20'
                        : 'border-emerald-600/50 bg-emerald-950/20 text-emerald-300/80 hover:border-sky-400 hover:bg-sky-950/20 hover:text-sky-300'
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs font-mono font-bold">{node.label}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Panel / Player Chooser */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* Dynamic Analytics Block */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
          <h4 className="text-sm font-bold font-mono tracking-wider text-zinc-400 uppercase mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-400" /> Team Bio-Metrics
          </h4>

          <div className="grid grid-cols-3 gap-2.5 mb-5 text-center">
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3.5">
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block">Selected</span>
              <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">
                {selectedPlayers.length}
                <span className="text-zinc-600 text-sm font-normal"> /11</span>
              </span>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3.5" title="Total squad international caps on field">
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block">Total Caps</span>
              <span className="text-xl sm:text-2xl font-bold text-sky-400 mt-1 block">
                {totalCaps}
              </span>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3.5" title="Total international goals scored by players on field">
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block">Goals</span>
              <span className="text-xl sm:text-2xl font-bold text-yellow-400 mt-1 block">
                {totalGoals}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-zinc-950/40 border border-zinc-800 rounded-xl px-4 py-3 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-zinc-400" />
              <span className="text-xs text-zinc-400 font-semibold">Average Squad Age</span>
            </div>
            <span className="text-sm font-bold font-mono text-zinc-200 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
              {avgAge} yrs
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              disabled={isSettingXI}
              onClick={handleSetChampionStartingXI}
              className="py-2.5 px-4 bg-sky-500/10 border border-sky-500/20 text-sky-400 font-extrabold rounded-xl text-xs hover:bg-sky-500 hover:text-zinc-950 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSettingXI ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
              ) : (
                <Zap className="w-3.5 h-3.5" />
              )}
              {isSettingXI ? "Loading..." : "Quick Setup Lineup"}
            </button>
            <button
              disabled={isSettingXI}
              onClick={clearLineup}
              className="py-2.5 px-4 bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold rounded-xl text-xs hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Tactical
            </button>
          </div>
        </div>

        {/* Dynamic Selector Popover Column */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl flex-grow min-h-[300px]">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key="selecting"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col h-full"
              >
                <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
                  <div>
                    <h5 className="font-bold text-white text-sm">Select {currentNodeInfo?.label}</h5>
                    <p className="text-[11px] text-zinc-500">Pick an active {currentNodeInfo?.posType} player</p>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-zinc-500 hover:text-white text-xs bg-zinc-800 px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>

                <div className="overflow-y-auto max-h-[320px] pr-2 space-y-1">
                  {filteredSquadForModal.map(player => {
                    const isAlreadySelected = (Object.values(lineup) as Player[]).some(x => x.no === player.no);
                    return (
                      <button
                        key={player.no}
                        disabled={isAlreadySelected}
                        onClick={() => selectPlayerForNode(selectedNode, player)}
                        className={`w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-xl border text-xs transition-all ${
                          isAlreadySelected
                            ? 'bg-zinc-950/20 border-zinc-800/40 text-zinc-600 cursor-not-allowed'
                            : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-200 hover:bg-zinc-950 hover:border-sky-500/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-bold text-zinc-500 w-5 text-right">{player.no}</span>
                          <div>
                            <span className="font-bold block text-zinc-200">{player.player}</span>
                            <span className="text-[10px] text-zinc-500">{player.club}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-zinc-400">{player.caps} caps</span>
                          {isAlreadySelected && (
                            <span className="text-[9px] uppercase bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500">In XI</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                  {filteredSquadForModal.length === 0 && (
                    <div className="text-center py-8 text-zinc-600 text-xs">
                      No matching positions found in current squad.
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="helper"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col h-full justify-between space-y-5"
              >
                {/* Header title */}
                <div>
                  <h5 className="font-extrabold text-white text-sm flex items-center gap-1.5 uppercase font-mono tracking-wider">
                    <Sliders className="w-4 h-4 text-sky-450" /> Tactical Management
                  </h5>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Configure live strategic parameters for the matches</p>
                </div>

                {/* Preset selector bar */}
                <div className="bg-zinc-950 border border-zinc-850 p-1 rounded-xl">
                  <div className="text-[10px] font-mono uppercase font-bold text-zinc-500 px-2.5 pb-1 pt-0.5">Style Presets:</div>
                  <div className="grid grid-cols-3 gap-1">
                    {(['Tiki-Taka', 'Attacking', 'Counter'] as const).map(style => (
                      <button
                        key={style}
                        onClick={() => handlePlaystyleChange(style)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                          playstyle === style
                            ? 'bg-sky-500 text-zinc-950 font-extrabold shadow-sm'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                        }`}
                      >
                        {style === 'Tiki-Taka' ? 'ℹ️ Pass' : style === 'Attacking' ? '🔥 Press' : '⚡ Counter'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic sliders */}
                <div className="space-y-3.5 bg-zinc-950/40 border border-zinc-850/80 p-4 rounded-2xl">
                  {/* Slider 1: Passing Tempo */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-400 font-bold uppercase flex items-center gap-1">
                        <Activity className="w-3 h-3 text-emerald-400" /> PASSING TEMPO
                      </span>
                      <span className="text-zinc-200 font-bold bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                        {passingTempo}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={passingTempo}
                      onChange={(e) => {
                        setPassingTempo(parseInt(e.target.value));
                        setPlaystyle('Tiki-Taka'); // custom
                      }}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-600 font-medium">
                      <span>Patient Build</span>
                      <span>Direct/Volley</span>
                    </div>
                  </div>

                  {/* Slider 2: Defensive Line Depth */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-400 font-bold uppercase flex items-center gap-1">
                        <Shield className="w-3 h-3 text-sky-400" /> DEFENSIVE LINE DEPTH
                      </span>
                      <span className="text-zinc-200 font-bold bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                        {defensiveDepth}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={defensiveDepth}
                      onChange={(e) => {
                        setDefensiveDepth(parseInt(e.target.value));
                        setPlaystyle('Tiki-Taka'); // custom
                      }}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-600 font-medium">
                      <span>Low Block</span>
                      <span>Extreme High Press</span>
                    </div>
                  </div>

                  {/* Slider 3: Pressing Intensity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-zinc-400 font-bold uppercase flex items-center gap-1">
                        <Target className="w-3 h-3 text-red-400" /> PRESSING INTENSITY
                      </span>
                      <span className="text-zinc-200 font-bold bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                        {pressingIntensity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={pressingIntensity}
                      onChange={(e) => {
                        setPressingIntensity(parseInt(e.target.value));
                        setPlaystyle('Tiki-Taka'); // custom
                      }}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-600 font-medium">
                      <span>Conserve energy</span>
                      <span>Gegenpressing</span>
                    </div>
                  </div>
                </div>

                {/* Lineup slot counters */}
                <div className="bg-zinc-950/60 border border-zinc-850 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-550 uppercase block mb-2 font-bold">Lineup Roster Filling Meter</span>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-1.5">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 block">GK</span>
                      <span className={`text-[11px] font-bold font-mono mt-0.5 block ${selectedPlayers.filter(p => p.pos === 'GK').length > 0 ? "text-yellow-400" : "text-zinc-500"}`}>
                        {selectedPlayers.filter(p => p.pos === 'GK').length}/1
                      </span>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-1.5">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 block">DF</span>
                      <span className={`text-[11px] font-bold font-mono mt-0.5 block ${selectedPlayers.filter(p => p.pos === 'DF').length === (formation === '4-3-3' ? 4 : formation === '4-4-2' ? 4 : 3) ? "text-emerald-400" : "text-zinc-400"}`}>
                        {selectedPlayers.filter(p => p.pos === 'DF').length}/{formation === '4-3-3' ? 4 : formation === '4-4-2' ? 4 : 3}
                      </span>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-1.5">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 block">MF</span>
                      <span className={`text-[11px] font-bold font-mono mt-0.5 block ${selectedPlayers.filter(p => p.pos === 'MF').length === (formation === '4-3-3' ? 3 : formation === '4-4-2' ? 4 : 5) ? "text-emerald-400" : "text-zinc-400"}`}>
                        {selectedPlayers.filter(p => p.pos === 'MF').length}/{formation === '4-3-3' ? 3 : formation === '4-4-2' ? 4 : 5}
                      </span>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-1.5">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 block">FW</span>
                      <span className={`text-[11px] font-bold font-mono mt-0.5 block ${selectedPlayers.filter(p => p.pos === 'FW').length === (formation === '4-3-3' ? 3 : formation === '4-4-2' ? 2 : 2) ? "text-emerald-400" : "text-zinc-400"}`}>
                        {selectedPlayers.filter(p => p.pos === 'FW').length}/{formation === '4-3-3' ? 3 : formation === '4-4-2' ? 2 : 2}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Assistant Advice & Action Button */}
                <div className="space-y-3 pt-1">
                  <div className="text-center">
                    {selectedPlayers.length === 11 ? (
                      <span className="text-[11px] font-medium text-emerald-400 flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Blueprint Completed (11 stars assigned)
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-sky-450 animate-pulse">
                        💡 Tip: Click any position nodes to swap layout slots.
                      </span>
                    )}
                  </div>

                  <button
                    disabled={isSettingXI}
                    onClick={handleSetChampionStartingXI}
                    className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-zinc-950 font-black uppercase text-xs tracking-wider rounded-xl transition duration-300 shadow-lg cursor-pointer shadow-sky-500/10 hover:shadow-sky-500/20 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSettingXI ? (
                      <Loader2 className="w-4 h-4 text-zinc-950 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4 text-zinc-950 fill-zinc-950" />
                    )}
                    {isSettingXI ? "Synchronizing Blueprint..." : "Set Champion Starting XI"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
