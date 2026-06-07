import React, { useState } from 'react';
import { 
  Shield, 
  Trophy, 
  Users, 
  Calendar, 
  Flame, 
  Shirt, 
  Star, 
  Compass, 
  Sparkles,
  Zap,
  Award,
  Gamepad2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Modular Pages Imports
import { HomeView } from './components/pages/HomeView';
import { SquadView } from './components/pages/SquadView';
import { TacticalBoardView } from './components/pages/TacticalBoardView';
import { FixturesView } from './components/pages/FixturesView';
import { RivalriesView } from './components/pages/RivalriesView';
import { TrophiesView } from './components/pages/TrophiesView';
import { KitsView } from './components/pages/KitsView';
import { WorldCupView } from './components/pages/WorldCupView';
import { GameView } from './components/pages/GameView';

type ViewType = 'home' | 'squad' | 'tactical' | 'fixtures' | 'rivalries' | 'trophies' | 'kits' | 'worldcup' | 'game';

interface MenuItem {
  id: ViewType;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Command Overview', icon: Compass, color: 'text-sky-400' },
    { id: 'squad', label: 'Squad & Records', icon: Users, color: 'text-emerald-400' },
    { id: 'tactical', label: 'Tactical Board', icon: Zap, color: 'text-amber-400' },
    { id: 'fixtures', label: 'Fixtures & Scores', icon: Calendar, color: 'text-indigo-400' },
    { id: 'worldcup', label: 'WC 2026 Draw & Path', icon: Sparkles, color: 'text-sky-350 font-bold' },
    { id: 'game', label: 'Shootout Arcade', icon: Gamepad2, color: 'text-amber-400 font-extrabold animate-pulse' },
    { id: 'rivalries', label: 'Rivalries Hub', icon: Flame, color: 'text-orange-400' },
    { id: 'trophies', label: 'Trophy Room', icon: Trophy, color: 'text-yellow-400' },
    { id: 'kits', label: 'Shirt History', icon: Shirt, color: 'text-pink-400' },
  ];

  const handleNavigate = (view: ViewType) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col lg:flex-row relative font-sans">
      
      {/* Absolute Aesthetic Glows */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-sky-950/20 via-zinc-950/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-36 right-10 w-96 h-96 bg-sky-505/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[500px] left-10 w-[400px] h-[400px] bg-yellow-505/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Left Sidebar Layout (Persistent desktop, collapsible mobile) */}
      <aside className="w-full lg:w-72 bg-zinc-900 lg:min-h-screen border-b lg:border-b-0 lg:border-r border-zinc-900/80 p-5 flex flex-col justify-between flex-shrink-0 relative z-30">
        
        <div className="space-y-6">
          {/* Main Logo Crest Emblem */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-b from-sky-400 to-sky-600 border border-sky-305 p-0.5 flex flex-col items-center justify-center shadow-lg shadow-sky-500/10">
                {/* 3 Stars inside crest */}
                <div className="flex gap-0.5 -mt-1 scale-90">
                  <Star className="w-1.5 h-1.5 fill-yellow-405 stroke-yellow-405 animate-pulse" />
                  <Star className="w-2 h-2 fill-yellow-405 stroke-yellow-405 animate-pulse delay-75" />
                  <Star className="w-1.5 h-1.5 fill-yellow-405 stroke-yellow-405 animate-pulse delay-150" />
                </div>
                {/* Monogram AFA */}
                <span className="text-[12px] font-extrabold tracking-tighter text-zinc-950 leading-none mt-0.5">AFA</span>
                <span className="text-[6px] text-sky-100 tracking-widest font-bold uppercase">1893</span>
              </div>

              <div>
                <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-1 leading-none uppercase">
                  Argentina
                </h1>
                <p className="text-[10px] text-zinc-400 font-mono mt-1">AFA hub portal</p>
              </div>
            </div>

            {/* Hamburger trigger for small screens */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Collapsible Mobile Navigation menu */}
          <nav className={`lg:block ${mobileMenuOpen ? 'block' : 'hidden'} space-y-1.5 pt-4 lg:pt-0`}>
            <span className="text-[10px] font-mono tracking-widest text-zinc-550 uppercase block pl-2.5 mb-2.5">
              📁 Main Command Views
            </span>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-bold transition-all relative group overflow-hidden ${
                    isActive 
                      ? 'bg-sky-500/10 border border-sky-500/25 text-white shadow shadow-sky-500/5' 
                      : 'text-zinc-400 border border-transparent hover:text-zinc-200'
                  }`}
                >
                  {/* Small left highlight bar for active tab */}
                  {isActive && (
                    <span className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-gradient-to-b from-sky-400 to-sky-600 rounded" />
                  )}

                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Persistent Side footer tracking info (only render on big screen layout bottom) */}
        <div className="hidden lg:block border-t border-zinc-900/80 pt-5 space-y-3 font-mono text-[10px] text-zinc-500">
          <div className="flex justify-between items-center bg-zinc-950 p-2.5 rounded-lg border border-zinc-900">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Ranked
            </span>
            <span className="text-zinc-300 font-bold">#3 Men FIFA</span>
          </div>
          <div className="text-[9px] text-zinc-600 leading-normal pl-1.5">
            Argentina Dashboard Portal • v2.6.4 <br />
            © 1893-2026 AFA.
          </div>
        </div>
      </aside>

      {/* Main Page Render Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 z-10 max-w-7xl mx-auto w-full overflow-hidden">
        
        {/* Dynamic header row containing breadcrumb and live ranking info */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-5 mb-8 gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">
              LATEST CAMPAIGN & VIEW
            </h2>
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              {menuItems.find(i => i.id === activeView)?.label || 'Overview'}
            </h1>
          </div>

          <div className="bg-zinc-900 border border-zinc-850 px-4 py-2 rounded-2xl flex items-center gap-3 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400">Campaign Active Status</span>
          </div>
        </header>

        {/* Dynamic Render Switch based on core Tab State */}
        <div className="min-h-[550px]">
          {activeView === 'home' && <HomeView onNavigate={handleNavigate} />}
          {activeView === 'squad' && <SquadView />}
          {activeView === 'tactical' && <TacticalBoardView />}
          {activeView === 'fixtures' && <FixturesView />}
          {activeView === 'worldcup' && <WorldCupView />}
          {activeView === 'game' && <GameView />}
          {activeView === 'rivalries' && <RivalriesView />}
          {activeView === 'trophies' && <TrophiesView />}
          {activeView === 'kits' && <KitsView />}
        </div>
      </main>
      
    </div>
  );
}
