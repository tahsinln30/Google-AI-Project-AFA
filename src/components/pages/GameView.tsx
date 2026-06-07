import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Zap, 
  User, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Play, 
  CheckCircle, 
  XCircle, 
  Crown, 
  Gamepad2, 
  TrendingUp, 
  Target, 
  ChevronRight,
  Sparkles,
  Award,
  AlertCircle,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Web Audio API Synthesizer for high-fidelity native retro sounds
const playSound = (type: 'kick' | 'goal' | 'miss' | 'save' | 'whistle' | 'woodwork' | 'cheer', muted: boolean) => {
  if (muted) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (type === 'whistle') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1050, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1150, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);

      // Second beep
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1050, ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(1250, ctx.currentTime + 0.12);
        gain2.gain.setValueAtTime(0.15, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.18);
      }, 100);
    } else if (type === 'kick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'woodwork') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(290, ctx.currentTime);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(580, ctx.currentTime);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
    } else if (type === 'goal') {
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.4);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.4);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } else if (type === 'miss') {
      const bufferSize = ctx.sampleRate * 1.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(155, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.6);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } else if (type === 'save') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(85, ctx.currentTime);
      osc.frequency.setValueAtTime(40, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);

      setTimeout(() => {
        const bufferSize = ctx.sampleRate * 0.7;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(300, ctx.currentTime);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.1, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
        noise.connect(filter);
        filter.connect(g);
        g.connect(ctx.destination);
        noise.start();
      }, 80);
    } else if (type === 'cheer') {
      const bufferSize = ctx.sampleRate * 2.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, ctx.currentTime);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.4);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    }
  } catch (e) {
    console.warn("Sound synth error:", e);
  }
};

interface Striker {
  id: string;
  name: string;
  avatar: string;
  curve: number;
  power: number;
  accuracy: number;
  perkName: string;
  perkDesc: string;
}

interface Opponent {
  id: string;
  country: string;
  flag: string;
  goalkeeper: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legend';
  difficultyColor: string;
  reflexMultiplier: number;
  trashTalk: string;
}

const STRIKERS: Striker[] = [
  {
    id: 'messi',
    name: 'Lionel Messi',
    avatar: '🔟',
    curve: 99,
    power: 78,
    accuracy: 98,
    perkName: 'Golden Path',
    perkDesc: 'Visual target guide line that points perfectly to corners.'
  },
  {
    id: 'martinez',
    name: 'Lautaro Martínez',
    avatar: '🐂',
    curve: 70,
    power: 96,
    accuracy: 84,
    perkName: 'Toro Smash',
    perkDesc: 'Power builds up 40% faster and reduces keeper reflexes.'
  },
  {
    id: 'alvarez',
    name: 'Julián Álvarez',
    avatar: '🕷️',
    curve: 82,
    power: 88,
    accuracy: 91,
    perkName: 'Spider Strike',
    perkDesc: 'Aim lock-on window is much larger.'
  },
  {
    id: 'macallister',
    name: 'Alexis Mac Allister',
    avatar: '🧉',
    curve: 88,
    power: 84,
    accuracy: 94,
    perkName: 'Ice Cold',
    perkDesc: 'Slows down the power indicator oscillating bar speeds.'
  },
  {
    id: 'dimaria',
    name: 'Ángel Di María',
    avatar: '🏹',
    curve: 97,
    power: 76,
    accuracy: 93,
    perkName: 'El Fideo Chip',
    perkDesc: 'Keeper is highly baited into diving early.'
  }
];

const OPPONENTS: Opponent[] = [
  {
    id: 'england',
    country: 'England',
    flag: '🇬🇧',
    goalkeeper: 'Jordan Pickford',
    difficulty: 'Easy',
    difficultyColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    reflexMultiplier: 0.65,
    trashTalk: "Come on! Give me your best shot! I am Pickford!"
  },
  {
    id: 'germany',
    country: 'Germany',
    flag: '🇩🇪',
    goalkeeper: 'Marc-André ter Stegen',
    difficulty: 'Medium',
    difficultyColor: 'text-sky-400 border-sky-500/20 bg-sky-500/5',
    reflexMultiplier: 0.8,
    trashTalk: "Precision is key. I have dissected your run-up."
  },
  {
    id: 'france',
    country: 'France',
    flag: '🇫🇷',
    goalkeeper: 'Mike Maignan',
    difficulty: 'Hard',
    difficultyColor: 'text-orange-400 border-orange-500/20 bg-orange-500/5',
    reflexMultiplier: 0.95,
    trashTalk: "You will not recreate 2022 against my watch."
  },
  {
    id: 'brazil',
    country: 'Brazil',
    flag: '🇧🇷',
    goalkeeper: 'Alisson Becker',
    difficulty: 'Legend',
    difficultyColor: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
    reflexMultiplier: 1.15,
    trashTalk: "O Clássico is ours! Copa América score will settle here."
  }
];

type TargetZone = 'TL' | 'TC' | 'TR' | 'BL' | 'BC' | 'BR';

const TARGET_COORDINATES: Record<TargetZone, { x: number; y: number; label: string }> = {
  TL: { x: 15, y: 18, label: 'Top-Left' },
  TC: { x: 50, y: 14, label: 'Top-Center' },
  TR: { x: 85, y: 18, label: 'Top-Right' },
  BL: { x: 15, y: 78, label: 'Bottom-Left' },
  BC: { x: 50, y: 82, label: 'Bottom-Center' },
  BR: { x: 85, y: 78, label: 'Bottom-Right' }
};

interface GameStats {
  shootoutsWon: number;
  shootoutsLost: number;
  goalsScored: number;
  savesMade: number;
  highestStreak: number;
}

export const GameView: React.FC = () => {
  // Game Setup States
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'shootout_end' | 'tournament_win'>('setup');
  const [selectedStriker, setSelectedStriker] = useState<Striker>(STRIKERS[0]);
  const [opponentIndex, setOpponentIndex] = useState<number>(0);
  const activeOpponent = OPPONENTS[opponentIndex];

  // Shootout Active Series States
  // In a shootout, both players take 5 turns. We track converted shots.
  const [userTurns, setUserTurns] = useState<('goal' | 'saved' | 'miss')[]>([]);
  const [aiTurns, setAiTurns] = useState<('goal' | 'saved' | 'miss')[]>([]);
  const [isUserTaker, setIsUserTaker] = useState<boolean>(true); // user shoots, then AI shoots
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [roundPhrase, setRoundPhrase] = useState<string>('Get ready to strike first!');

  // Single Action Shot execution states
  const [selectedTarget, setSelectedTarget] = useState<TargetZone | null>(null);
  const [power, setPower] = useState<number>(0);
  const [isPowerCharging, setIsPowerCharging] = useState<boolean>(false);
  const [isShotActive, setIsShotActive] = useState<boolean>(false);
  const [shotResolved, setShotResolved] = useState<boolean>(false);
  const [actionNarrative, setActionNarrative] = useState<string>("Choose your target, hold 'Charge Power' and release to strike!");

  // Animation helper positions
  const [ballVisualPos, setBallVisualPos] = useState<{ x: string; y: string; scale: number; rotate: number }>({
    x: '50%',
    y: '88%',
    scale: 1,
    rotate: 0
  });
  const [keeperVisualPos, setKeeperVisualPos] = useState<{ x: string; y: string; style: string }>({
    x: '50%',
    y: '50%',
    style: 'idle'
  });
  const [isGoalNetVibrating, setIsGoalNetVibrating] = useState<boolean>(false);

  // Settings
  const [muted, setMuted] = useState<boolean>(false);
  
  // Power oscillation loop
  const powerOscillationRef = useRef<number | null>(null);
  const oscillationDirection = useRef<number>(1); // 1 = up, -1 = down

  // Local Leaderboard stats
  const [stats, setStats] = useState<GameStats>({
    shootoutsWon: 0,
    shootoutsLost: 0,
    goalsScored: 0,
    savesMade: 0,
    highestStreak: 0
  });

  // Load persisting stats
  useEffect(() => {
    const saved = localStorage.getItem('afa_penalty_arcade_stats');
    if (saved) {
      try {
        setStats(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync saved statistics back
  const updateStats = (updater: (prev: GameStats) => GameStats) => {
    setStats(prev => {
      const next = updater(prev);
      localStorage.setItem('afa_penalty_arcade_stats', JSON.stringify(next));
      return next;
    });
  };

  // Charge oscillating effect loop
  useEffect(() => {
    if (isPowerCharging) {
      playSound('whistle', muted); // Whistle starts the cycle 
      const speed = selectedStriker.id === 'macallister' ? 2 : 3.5;
      const interval = setInterval(() => {
        setPower(prev => {
          let next = prev + oscillationDirection.current * speed;
          if (next >= 100) {
            next = 100;
            oscillationDirection.current = -1;
          } else if (next <= 0) {
            next = 0;
            oscillationDirection.current = 1;
          }
          return next;
        });
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isPowerCharging, selectedStriker, muted]);

  // Handle Target Clicks
  const handleSelectTarget = (zone: TargetZone) => {
    if (isShotActive || shotResolved) return;
    setSelectedTarget(zone);
    setActionNarrative(`Aiming locked onto ${TARGET_COORDINATES[zone].label}. Press "START POWER SWING" below to swing the gauge, and press again to strike!`);
  };

  // Unified click-to-swing and click-to-shoot toggle logic. Highly friendly for touch screen players.
  const handleChargeButtonClick = () => {
    if (!selectedTarget) {
      setActionNarrative("⚠️ First, click directly on one of the target bullseyes inside the goal net (e.g. TR for Top Right)!");
      return;
    }
    if (isPowerCharging) {
      setIsPowerCharging(false);
      executeUserShot(power);
    } else {
      setPower(0);
      oscillationDirection.current = 1;
      setIsPowerCharging(true);
      setActionNarrative("⚡ Power slider is swinging! Press the button AGAIN when it lands in the green BEST ACCURACY sweet-spot!");
    }
  };

  // Process Penalty shootout logic when shooting (User is Taker)
  const executeUserShot = (finalPower: number) => {
    if (!selectedTarget) return;
    setIsShotActive(true);
    setActionNarrative(`${selectedStriker.name} runs up to the penalty spot...`);
    playSound('kick', muted);

    // AI Keeper decides its dive quadrant.
    // Higher difficulty opponents have better predictions or prioritize corner coverage.
    const zones: TargetZone[] = ['TL', 'TC', 'TR', 'BL', 'BC', 'BR'];
    const probabilities: Record<TargetZone, number> = { TL: 15, TC: 10, TR: 15, BL: 20, BC: 15, BR: 20 };
    
    // Alisson cover bottoms more, Maignan covers tops, etc.
    if (activeOpponent.id === 'brazil') {
      probabilities.TL = 15; probabilities.TR = 15;
    }
    
    // Choose keeper dive zone
    let keeperDive: TargetZone = 'BC';
    const sum = Object.values(probabilities).reduce((a, b) => a + b, 0);
    let rand = Math.random() * sum;
    for (const z of zones) {
      rand -= probabilities[z];
      if (rand <= 0) {
        keeperDive = z;
        break;
      }
    }

    // Is it goal, save, or miss?
    let result: 'goal' | 'saved' | 'miss' = 'goal';
    
    // Maximum power sweet spot of strikes
    const isVeryHighPower = finalPower > 92;
    const isVeryLowPower = finalPower < 35;
    
    // Off-target miss probability
    let missProbability = 5; // standard 5% chance
    if (isVeryHighPower) missProbability = 18; // risky!
    if (selectedStriker.id === 'martinez') missProbability -= 2; // Toro precision high power
    
    const wasMiss = Math.random() < (missProbability / 100);

    if (wasMiss) {
      result = 'miss';
    } else {
      // If goalie dived in same zone or adjacent, calculate save.
      const targetCoord = TARGET_COORDINATES[selectedTarget];
      const gkCoord = TARGET_COORDINATES[keeperDive];
      
      const isExactlySameZone = selectedTarget === keeperDive;
      const isAdjacentZone = (
        (selectedTarget.startsWith('T') && keeperDive.startsWith('T')) ||
        (selectedTarget.endsWith('L') && keeperDive.endsWith('L')) ||
        (selectedTarget.endsWith('R') && keeperDive.endsWith('R'))
      );

      let saveChance = 0;
      if (isExactlySameZone) {
        saveChance = 85; 
      } else if (isAdjacentZone) {
        saveChance = 35;
      }

      // Modify based on Striker and GK parameters
      saveChance = saveChance * activeOpponent.reflexMultiplier;

      // Perks adjustments
      if (selectedStriker.id === 'martinez' && isVeryHighPower) {
        saveChance -= 15; // Toro smash reduces glove response
      }
      if (selectedStriker.id === 'dimaria') {
        saveChance -= 10; // Fideo baited early
      }

      if (Math.random() * 100 < saveChance) {
        result = 'saved';
      }
    }

    // Ball 3D Physics Flight coordinates inside SVG container
    const ballTarget = TARGET_COORDINATES[selectedTarget];
    
    // Animate Ball Flight Path
    setTimeout(() => {
      setBallVisualPos({
        x: `${ballTarget.x}%`,
        y: `${ballTarget.y}%`,
        scale: 0.32,
        rotate: 720
      });

      // Synchronize Goalkeeper dive visually
      const gkTarget = TARGET_COORDINATES[keeperDive];
      setKeeperVisualPos({
        x: `${gkTarget.x}%`,
        // slightly upper positioning if Top row dive
        y: gkTarget.y < 30 ? '30%' : '65%',
        style: keeperDive.includes('L') ? 'dive-left' : keeperDive.includes('R') ? 'dive-right' : 'stretch'
      });
    }, 150);

    // Resolve Shot and update metrics
    setTimeout(() => {
      setShotResolved(true);
      
      if (result === 'goal') {
        playSound('goal', muted);
        setIsGoalNetVibrating(true);
        setActionNarrative(`⚽ GOOAAL! Spectacular strike by ${selectedStriker.name}! Tucked it perfectly inside the ${TARGET_COORDINATES[selectedTarget!].label}!`);
        setUserTurns(prev => [...prev, 'goal']);
        updateStats(s => ({ ...s, goalsScored: s.goalsScored + 1 }));
      } else if (result === 'saved') {
        playSound('save', muted);
        setActionNarrative(`🧤 SAVED! ${activeOpponent.goalkeeper} pulls off an unbelievable heroic dive and punches the ball away!`);
        setUserTurns(prev => [...prev, 'saved']);
        
        // Deflect ball off goalkeeper's gloves to the bottom grass
        setBallVisualPos(prev => ({
          ...prev,
          x: `${parseFloat(prev.x) + (Math.random() > 0.5 ? 15 : -15)}%`,
          y: '80%',
          scale: 0.45,
          rotate: prev.rotate + 180
        }));
      } else {
        // woodworks vs complete miss
        const woodwork = Math.random() > 0.45;
        if (woodwork) {
          playSound('woodwork', muted);
          setIsGoalNetVibrating(true);
          setActionNarrative(`💥 CLANG! Absolute thunderbolt hits the crossbar woodwork and bounces away! Incredible drama!`);
          
          // Deflect ball downward off the crossbar onto the pitch floor
          setBallVisualPos(prev => ({
            ...prev,
            y: '78%',
            x: `${parseFloat(prev.x) + (Math.random() > 0.5 ? 6 : -6)}%`,
            scale: 0.36,
            rotate: prev.rotate + 140
          }));
        } else {
          playSound('miss', muted);
          setActionNarrative(`❌ WIDE OUT! Over-charged strike flies straight over the crossbar! A crucial miss.`);
          
          // Blow ball way over the crossbar out of bounds
          setBallVisualPos(prev => ({
            ...prev,
            y: '-10%',
            scale: 0.2,
            rotate: prev.rotate + 220
          }));
        }
        setUserTurns(prev => [...prev, 'miss']);
      }
    }, 850);
  };

  // Process AI Opponent penalty when defending (User is Dibu Martinez GK!)
  const executeAiShot = (userDiveChoice: TargetZone) => {
    setIsShotActive(true);
    setSelectedTarget(userDiveChoice);
    setActionNarrative(`${activeOpponent.country} striker steps up to shoot... Dibu Martínez gets into their head!`);
    playSound('whistle', muted);

    // Opponent striker chooses aim (clues can sometimes be hinted)
    const zones: TargetZone[] = ['TL', 'TC', 'TR', 'BL', 'BC', 'BR'];
    const aiTargetZone = zones[Math.floor(Math.random() * zones.length)];

    // Opponent shoot parameters
    playSound('kick', muted);

    // Determine outcome
    let result: 'goal' | 'saved' | 'miss' = 'goal';
    
    // AI miss rate (based on Dibu GK presence: standard 10% miss chance)
    const wasMiss = Math.random() < 0.12;

    if (wasMiss) {
      result = 'miss';
    } else {
      const isExactlySame = aiTargetZone === userDiveChoice;
      const isAdjacent = (
        (aiTargetZone.startsWith('T') && userDiveChoice.startsWith('T')) ||
        (aiTargetZone.endsWith('L') && userDiveChoice.endsWith('L')) ||
        (aiTargetZone.endsWith('R') && userDiveChoice.endsWith('R'))
      );

      let saveChance = 0;
      if (isExactlySame) saveChance = 82;
      else if (isAdjacent) saveChance = 35;

      if (Math.random() * 100 < saveChance) {
        result = 'saved';
      }
    }

    const ballTarget = TARGET_COORDINATES[aiTargetZone];

    // Visually animate ball flight & Dibu dive path
    setTimeout(() => {
      setBallVisualPos({
        x: `${ballTarget.x}%`,
        y: `${ballTarget.y}%`,
        scale: 0.32,
        rotate: -540
      });

      const userDiveCoords = TARGET_COORDINATES[userDiveChoice];
      setKeeperVisualPos({
        x: `${userDiveCoords.x}%`,
        y: userDiveCoords.y < 30 ? '30%' : '65%',
        style: userDiveChoice.includes('L') ? 'dive-left' : userDiveChoice.includes('R') ? 'dive-right' : 'stretch'
      });
    }, 150);

    setTimeout(() => {
      setShotResolved(true);
      
      if (result === 'goal') {
        playSound('goal', muted);
        setIsGoalNetVibrating(true);
        setActionNarrative(`⚽ GOAL! The opponent gets past your glove dive and hits the ${TARGET_COORDINATES[aiTargetZone].label}.`);
        setAiTurns(prev => [...prev, 'goal']);
      } else if (result === 'saved') {
        playSound('save', muted);
        setActionNarrative(`🧤 SPECTACULAR INCREDIBLE SAVE! Dibu Martínez stops the strike clean! He does a celebrating dance!`);
        setAiTurns(prev => [...prev, 'saved']);
        updateStats(s => ({ ...s, savesMade: s.savesMade + 1 }));
        
        // Deflect ball off Dibu's gloves to the side
        setBallVisualPos(prev => ({
          ...prev,
          x: `${parseFloat(prev.x) + (Math.random() > 0.5 ? 15 : -15)}%`,
          y: '80%',
          scale: 0.45,
          rotate: prev.rotate + 180
        }));
      } else {
        const woodwork = Math.random() > 0.45;
        if (woodwork) {
          playSound('woodwork', muted);
          setIsGoalNetVibrating(true);
          setActionNarrative(`💥 SPECTACULAR DRAMA! The opponent's shot rattles off the goalpost woodwork and flies out! Dibu laughs!`);
          
          // Deflect ball off woodwork
          setBallVisualPos(prev => ({
            ...prev,
            y: '78%',
            x: `${parseFloat(prev.x) + (Math.random() > 0.5 ? 6 : -6)}%`,
            scale: 0.36,
            rotate: prev.rotate + 140
          }));
        } else {
          playSound('miss', muted);
          setActionNarrative(`❌ FLYING WIDE! The striker was intimidated by Dibu and choked, sending it completely wide!`);
          
          // Fly wide
          setBallVisualPos(prev => ({
            ...prev,
            y: '-10%',
            scale: 0.2,
            rotate: prev.rotate + 220
          }));
        }
        setAiTurns(prev => [...prev, 'miss']);
      }
    }, 850);
  };

  // Confirm Next Turn Transition
  const handleNextTurnTransition = () => {
    // Reset ball positions
    setBallVisualPos({ x: '50%', y: '88%', scale: 1, rotate: 0 });
    setKeeperVisualPos({ x: '50%', y: '50%', style: 'idle' });
    setIsGoalNetVibrating(false);
    setSelectedTarget(null);
    setPower(0);
    setShotResolved(false);
    setIsShotActive(false);

    // Analyze if Shootout is mathematically settled yet
    const maxShots = 5;
    const userGoals = userTurns.filter(t => t === 'goal').length;
    const aiGoals = aiTurns.filter(t => t === 'goal').length;
    const userRemaining = maxShots - userTurns.length;
    const aiRemaining = maxShots - aiTurns.length;

    // Check if user or AI can no longer win/catch up
    const isUserImpossible = userGoals + userRemaining < aiGoals;
    const isAiImpossible = aiGoals + aiRemaining < userGoals;
    const isSuddenDeathOver = userTurns.length >= maxShots && aiTurns.length >= maxShots && userGoals !== aiGoals;

    // Is current round finished?
    const isRoundCompleted = userTurns.length === currentRound && aiTurns.length === currentRound;

    if (isUserImpossible || isAiImpossible || (userTurns.length >= maxShots && aiTurns.length >= maxShots && userGoals !== aiGoals)) {
      // Shootout finished! Match settled.
      handleShootoutFinalResolution(userGoals, aiGoals);
      return;
    }

    // Toggle Turns shootout logic
    if (isUserTaker) {
      // Switch user to Goalkeeper mode (Defending)
      setIsUserTaker(false);
      setActionNarrative(`🧤 Now get in goal! Click on a target quadrant to dive as Dibu Martínez and stop the ${activeOpponent.country} striker!`);
    } else {
      // Switch back to Taker striker mode (Shooting)
      setIsUserTaker(true);
      setCurrentRound(prev => prev + 1);
      setActionNarrative(`🎯 Round ${currentRound + 1} of 5. Select your target pocket, charge power, and fire past ${activeOpponent.goalkeeper}!`);
    }
  };

  // Shootout end logic resolution
  const handleShootoutFinalResolution = (userGoals: number, aiGoals: number) => {
    const userWon = userGoals > aiGoals;
    
    if (userWon) {
      playSound('cheer', muted);
      updateStats(s => ({ 
        ...s, 
        shootoutsWon: s.shootoutsWon + 1,
        highestStreak: Math.max(s.highestStreak, s.shootoutsWon + 1)
      }));

      // Check if tournament cleared completely (beat Brazil)
      if (opponentIndex === OPPONENTS.length - 1) {
        setGameState('tournament_win');
        setActionNarrative(`🏆 THE UNCONQUERABLE CHAMPIONS! You cleared the Penalty Shootout Cup and lifted the Gold! AFA stands atop!`);
      } else {
        setGameState('shootout_end');
        setActionNarrative(`🎉 VICTORY! Argentina defeats ${activeOpponent.country} by ${userGoals} to ${aiGoals}! Ready for the next opponent?`);
      }
    } else {
      updateStats(s => ({ ...s, shootoutsLost: s.shootoutsLost + 1 }));
      setGameState('shootout_end');
      setActionNarrative(`😔 DEFEAT! ${activeOpponent.country} wins the shootout ${aiGoals} to ${userGoals}. Re-group and try again!`);
    }
  };

  // Start complete match series
  const handleStartShootout = () => {
    setUserTurns([]);
    setAiTurns([]);
    setIsUserTaker(true);
    setCurrentRound(1);
    setGameState('playing');
    setBallVisualPos({ x: '50%', y: '88%', scale: 1, rotate: 0 });
    setKeeperVisualPos({ x: '50%', y: '50%', style: 'idle' });
    setIsGoalNetVibrating(false);
    setSelectedTarget(null);
    setPower(0);
    setShotResolved(false);
    setIsShotActive(false);
    setActionNarrative(`⚽ Shootout Cup vs ${activeOpponent.country} initiated! Step up with ${selectedStriker.name} for Round 1!`);
  };

  // Reset entire cup to step 1
  const handleRestartCup = () => {
    setOpponentIndex(0);
    setGameState('setup');
    setActionNarrative("Select your star striker and face the toughest goalkeepers in the world!");
  };

  const handleNextOpponent = () => {
    setOpponentIndex(prev => Math.min(prev + 1, OPPONENTS.length - 1));
    setGameState('setup');
  };

  // Auto aim selection helpful helper line for Messi Perk
  const shouldShowGuideline = selectedStriker.id === 'messi' && selectedTarget && !isShotActive;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in text-zinc-100">
      
      {/* LEFT SECTION: MAIN ARCADE PITCH WINDOW (8 Cols) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* UPPER STATUS DASHBOARD BAR */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden shadow-lg shadow-sky-500/5">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 bg-zinc-950 border border-zinc-850 rounded-2xl">🎮</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5 font-sans">
                  AFA Shootout Cup <span className="text-xs bg-yellow-400/10 text-yellow-500 px-2 py-0.5 rounded-full border border-yellow-500/15">La Scaloneta Arcade</span>
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1">Practice and claim penalty shootout mastery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMuted(!muted)}
              className="p-2 w-9 h-9 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all hover:bg-zinc-850"
              title={muted ? "Unmute Sound" : "Mute Sound"}
            >
              {muted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
            </button>
            
            <button
              onClick={handleRestartCup}
              className="py-1.5 px-3 flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold border border-rose-500/10 hover:border-rose-500/30 bg-rose-500/5 rounded-xl transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart Tourney
            </button>
          </div>
        </div>

        {/* MATCH GAME ENGINE FRAMEWORK */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl relative flex flex-col justify-between overflow-hidden min-h-[580px]">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Setup view (Striker & Opponent selection overview) */}
          {gameState === 'setup' && (
            <div className="flex-1 flex flex-col justify-between p-2 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                
                {/* 1. SECTOR: CHOOSE ACTIVE PLAYER */}
                <div className="bg-zinc-950/65 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block font-bold">
                    ⭐ STEP 1: SELECT STRIKER
                  </span>
                  
                  <div className="space-y-2.5">
                    {STRIKERS.map(striker => (
                      <div
                        key={striker.id}
                        onClick={() => setSelectedStriker(striker)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                          selectedStriker.id === striker.id
                            ? 'bg-sky-500/10 border-sky-400/65 text-white'
                            : 'bg-zinc-900/30 border-zinc-850 hover:border-zinc-700/60 text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl bg-zinc-950 p-1.5 border border-zinc-800 rounded-lg">{striker.avatar}</span>
                          <div>
                            <h4 className="text-xs font-black uppercase text-zinc-100">{striker.name}</h4>
                            <p className="text-[10px] text-zinc-400 leading-tight mt-0.5 max-w-[150px]">{striker.perkDesc}</p>
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <span className="text-[9px] font-mono text-amber-450 uppercase block font-semibold">
                            Acc: {striker.accuracy} | Pwr: {striker.power}
                          </span>
                          <span className="text-[8px] bg-yellow-405/20 text-yellow-400 px-1.5 py-0.5 rounded font-mono font-black uppercase tracking-wider leading-none">
                            {striker.perkName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. SECTOR: TOURNAMENT MAP PROGRESSION */}
                <div className="bg-zinc-950/65 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
                      🚩 TOURNAMENT BRACKET ({opponentIndex + 1}/{OPPONENTS.length})
                    </span>

                    <div className="space-y-2">
                      {OPPONENTS.map((opp, idx) => {
                        const isCurrent = idx === opponentIndex;
                        const isCleared = idx < opponentIndex;

                        return (
                          <div
                            key={opp.id}
                            className={`p-3 rounded-xl border flex items-center justify-between ${
                              isCurrent 
                                ? 'bg-amber-400/10 border-amber-400/40 text-white shadow' 
                                : isCleared 
                                ? 'bg-zinc-900/50 border-emerald-500/10 opacity-60 text-zinc-400' 
                                : 'bg-zinc-900/10 border-zinc-900 opacity-40 text-zinc-650'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{opp.flag}</span>
                              <div>
                                <h4 className="text-xs font-black uppercase">{opp.country}</h4>
                                <p className="text-[10px] font-mono text-zinc-500">GK: {opp.goalkeeper}</p>
                              </div>
                            </div>

                            <span className={`text-[9px] border px-2 py-0.5 rounded font-mono uppercase font-black ${opp.difficultyColor}`}>
                              {isCleared ? "CLEARED ✓" : opp.difficulty}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-850 text-[11px] text-zinc-400 italic">
                    💡 "{activeOpponent.goalkeeper}: '{activeOpponent.trashTalk}'"
                  </div>
                </div>

              </div>

              {/* ACTION CALL TO RUN SHOOTOUT */}
              <div className="pt-4 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs text-zinc-400">
                  Ready to field <strong className="text-zinc-200">{selectedStriker.name}</strong> against <strong className="text-zinc-200">{activeOpponent.country}</strong>? 
                  <span className="block text-[10px] font-mono text-sky-400 mt-0.5">5 penalty series each mode • Alternate striker & Dibu GK</span>
                </div>
                
                <button
                  onClick={handleStartShootout}
                  className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-300 hover:to-sky-500 text-zinc-950 font-black uppercase text-xs tracking-wider rounded-xl transition duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-zinc-950 fill-zinc-950" /> Start Penalty Shootout
                </button>
              </div>

            </div>
          )}

          {/* ACTIVE SHOOTOUT ARCADE PLATFORM */}
          {gameState === 'playing' && (
            <div className="flex-1 flex flex-col justify-between">
              
              {/* SHOOTOUT SCRIBES SCOREBOARD TRACKER */}
              <div className="grid grid-cols-3 items-center bg-zinc-950/80 border border-zinc-850 p-4 rounded-2xl mb-4 gap-4">
                {/* 1: User Team (Argentina) */}
                <div className="text-center space-y-1.5 border-r border-zinc-850">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[11px] font-black uppercase text-sky-400">ARGENTINA</span>
                    <span className="text-xs">🇦🇷</span>
                  </div>
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const res = userTurns[i];
                      return (
                        <span 
                          key={i} 
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-black ${
                            res === 'goal' 
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400' 
                              : res === 'saved' || res === 'miss' 
                              ? 'bg-rose-500/25 border-rose-400 text-rose-400 font-extrabold' 
                              : 'bg-zinc-900 border-zinc-800 text-zinc-650'
                          }`}
                        >
                          {res === 'goal' ? '✓' : res ? '𐄂' : i + 1}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Striker: {selectedStriker.name}</span>
                </div>

                {/* 2: Round indicator status */}
                <div className="text-center">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-amber-500 font-bold block">
                    ROUND {currentRound} / 5
                  </span>
                  <span className="text-2xl font-black font-sans text-white block mt-0.5">
                    {userTurns.filter(t => t === 'goal').length} - {aiTurns.filter(t => t === 'goal').length}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-850 mt-1 inline-block">
                    {isUserTaker ? "⚔️ STRIKING" : "🛡️ GK DEFENDING"}
                  </span>
                </div>

                {/* 3: Opponent Team */}
                <div className="text-center space-y-1.5 border-l border-zinc-850">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs">{activeOpponent.flag}</span>
                    <span className="text-[11px] font-black uppercase text-zinc-300">{activeOpponent.country}</span>
                  </div>
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const res = aiTurns[i];
                      return (
                        <span 
                          key={i} 
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-black ${
                            res === 'goal' 
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400' 
                              : res === 'saved' || res === 'miss' 
                              ? 'bg-rose-500/25 border-rose-400 text-rose-400' 
                              : 'bg-zinc-900 border-zinc-800 text-zinc-650'
                          }`}
                        >
                          {res === 'goal' ? '✓' : res ? '𐄂' : i + 1}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">GK: {activeOpponent.goalkeeper}</span>
                </div>
              </div>

              {/* Interactive Step-by-Step Walkthrough Guide */}
              <div className="flex justify-around items-center bg-zinc-950/70 border border-zinc-850 p-2.5 rounded-2xl mb-4 text-[10px] sm:text-xs text-zinc-300 select-none">
                <div className={`flex items-center gap-1.5 font-bold transition-all duration-300 ${!selectedTarget && isUserTaker ? 'text-sky-450 scale-102' : 'text-zinc-500'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-black transition-all ${!selectedTarget && isUserTaker ? 'bg-sky-500/25 text-sky-400 border border-sky-400/50 shadow-lg animate-pulse' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'}`}>1</span>
                  <span>Select Target</span>
                </div>
                <span className="text-zinc-700 font-semibold text-[10px]">▶</span>
                <div className={`flex items-center gap-1.5 font-bold transition-all duration-300 ${selectedTarget && !isShotActive && isUserTaker ? 'text-amber-450 scale-102' : 'text-zinc-500'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-black transition-all ${selectedTarget && !isShotActive && isUserTaker ? 'bg-amber-500/25 text-amber-400 border border-amber-400/50 shadow-lg animate-pulse' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'}`}>2</span>
                  <span>Charge Strike</span>
                </div>
                <span className="text-zinc-700 font-semibold text-[10px]">▶</span>
                <div className={`flex items-center gap-1.5 font-bold transition-all duration-300 ${!isUserTaker ? 'text-emerald-450 scale-102' : 'text-zinc-500'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-black transition-all ${!isUserTaker ? 'bg-emerald-500/25 text-emerald-400 border border-emerald-400/50 shadow-lg animate-pulse' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'}`}>3</span>
                  <span>Dibu GK Defend</span>
                </div>
              </div>

              {/* 3D SOCCER PENALTY FIELD GRAPHICS VIEW */}
              <div className="relative bg-[#09150f] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-center items-center select-none h-[350px] shadow-[0_15px_30px_rgba(0,0,0,0.65)]">
                
                {/* 1. STADIUM BACKGROUND STAGE */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-teal-950/60 to-[#0c3a21] opacity-90" />
                
                {/* Stadium flood light beam glows (stadium flare & light cone beams) */}
                <div className="absolute -top-10 -left-10 w-44 h-44 bg-sky-500/15 rounded-full blur-[80px] pointer-events-none animate-pulse" />
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-sky-400/15 rounded-full blur-[80px] pointer-events-none animate-pulse" />
                <div className="absolute top-0 inset-x-0 h-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

                {/* Visual Stadium billboard crowd header */}
                <div className="absolute top-0 inset-x-0 h-8 bg-zinc-950/90 border-b border-zinc-900 flex justify-between items-center px-5 opacity-55 text-[8.5px] text-zinc-400 font-mono tracking-widest z-10">
                  <span>🏟️ CHAMPIONS ARENA GRANDSTAND</span>
                  <span className="text-amber-500 font-bold animate-pulse">● LIVE BROADCAST</span>
                  <span>🏆 COPA PENALTIES 2026</span>
                </div>

                {/* 2. PERSPECTIVE LUSH GREEN LAWN FLOOR (Lush turf cuts & layout lines) */}
                <div className="absolute bottom-0 inset-x-0 h-[48%] overflow-hidden border-t-2 border-emerald-500/40"
                     style={{
                       background: 'repeating-linear-gradient(180deg, #0f5132 0px, #0f5132 15px, #146c43 15px, #146c43 30px)',
                       transform: 'perspective(450px) rotateX(15deg)',
                       transformOrigin: 'top center'
                     }}>
                  {/* Outer Penalty Lines */}
                  <div className="absolute inset-x-10 top-0 h-full border-2 border-white/10 border-t-0" />
                  {/* Goal keeper line */}
                  <div className="absolute inset-x-0 top-0 h-1 border-b border-white/20" />
                </div>

                {/* 3. GOALKEEPER LAYER DROP SHADOW */}
                <motion.div
                  animate={{
                    left: keeperVisualPos.x,
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                  className="absolute bottom-16 w-12 h-2.5 bg-black/60 rounded-full blur-[2px] pointer-events-none -ml-6 z-10"
                />

                {/* 4. BALL PERSPECTIVE REACTIVE BASE SHADOW */}
                <motion.div
                  animate={{
                    left: ballVisualPos.x,
                    // Shadow scales down as ball increases altitude
                    scale: ballVisualPos.y === '88%' ? 1.0 : 0.45,
                    opacity: ballVisualPos.y === '88%' ? 0.8 : 0.25,
                  }}
                  transition={{ type: 'spring', stiffness: 90, damping: 12 }}
                  className="absolute bottom-6 w-7 h-2 bg-black/90 rounded-full blur-[1.5px] pointer-events-none -ml-3.5 z-10"
                />

                {/* VISUAL PHYSICAL SOCCER GOALPOST NET */}
                <div className={`relative w-[92%] sm:w-[82%] h-[155px] sm:h-[175px] border-4 border-zinc-100 border-b-0 rounded-t-2xl bg-zinc-950/45 shadow-2xl overflow-hidden z-10 transition-transform ${
                  isGoalNetVibrating ? 'animate-bounce' : ''
                }`}>
                  {/* Net grid structure mesh image */}
                  <div className="absolute inset-0 net-mesh opacity-20 pointer-events-none" />

                  {/* ALWAYS PERSISTENT SHOT TARGET SELECTION QUADRANTS (No physical pop-out state toggles) */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 z-30">
                    {(Object.keys(TARGET_COORDINATES) as TargetZone[]).map(zone => {
                      const isCurrentTarget = selectedTarget === zone;
                      const hasShotStarted = isShotActive || shotResolved;
                      
                      let zoneDescription = "";
                      let scoreTip = "";
                      switch(zone) {
                        case 'TL': zoneDescription = "Top-Left Corner"; scoreTip = "98% Diff • 90 Pts"; break;
                        case 'TC': zoneDescription = "Upper Center"; scoreTip = "60% Diff • 50 Pts"; break;
                        case 'TR': zoneDescription = "Top-Right Corner"; scoreTip = "98% Diff • 90 Pts"; break;
                        case 'BL': zoneDescription = "Bottom-Left"; scoreTip = "75% Diff • 70 Pts"; break;
                        case 'BC': zoneDescription = "Low Center"; scoreTip = "40% Diff • 40 Pts"; break;
                        case 'BR': zoneDescription = "Bottom-Right"; scoreTip = "75% Diff • 70 Pts"; break;
                      }

                      return (
                        <div
                          key={zone}
                          onClick={() => {
                            if (hasShotStarted) return;
                            if (isUserTaker) {
                              handleSelectTarget(zone);
                            } else {
                              executeAiShot(zone);
                            }
                          }}
                          className={`relative flex items-center justify-center transition-all duration-300 border border-zinc-900/10 ${
                            hasShotStarted 
                              ? isCurrentTarget 
                                ? 'bg-amber-400/5' 
                                : 'opacity-10 pointer-events-none'
                              : 'cursor-pointer hover:bg-sky-500/15 group'
                          }`}
                        >
                          <div className="relative flex flex-col items-center justify-center p-1">
                            
                            {/* High-fidelity glowing concentric shoot rings */}
                            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                              isCurrentTarget
                                ? 'bg-amber-400/30 border-amber-400 scale-110 shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                                : 'bg-black/80 border-dashed border-zinc-650 group-hover:border-sky-400 group-hover:scale-105 shadow'
                            }`}>
                              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center font-mono text-[9.5px] sm:text-[10px] ${
                                isCurrentTarget
                                  ? 'bg-amber-400 text-zinc-950 border-white font-black'
                                  : isUserTaker 
                                    ? 'bg-red-500/20 border-red-500/40 text-red-300 font-extrabold group-hover:bg-sky-500/30 group-hover:border-sky-400 group-hover:text-white'
                                    : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-extrabold group-hover:bg-emerald-500/35 group-hover:border-emerald-450 group-hover:text-white'
                              }`}>
                                {isUserTaker ? zone : '🧤'}
                              </div>
                            </div>

                            {/* Tactical subtitle zone indicator */}
                            <span className={`text-[8.5px] font-mono font-black tracking-tight scale-90 px-1 py-0.5 rounded uppercase mt-1 pointer-events-none select-none transition-colors border leading-none ${
                              isCurrentTarget
                                ? 'bg-amber-400 text-zinc-950 border-amber-300'
                                : 'bg-zinc-900/90 text-zinc-400 border-zinc-805 group-hover:text-white group-hover:border-sky-500/30'
                            }`}>
                              {!isUserTaker && !hasShotStarted ? "🧤 DIVE HERE" : zoneDescription}
                            </span>

                            {/* Easy readability metric helper tip */}
                            {!hasShotStarted && (
                              <span className="text-[7.5px] font-mono text-zinc-500 mt-0.5 scale-90 opacity-70 group-hover:text-amber-400 transition-colors">
                                {scoreTip}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* GOALKEEPER KINETIC CHARACTER (Body with arms, jersey and emotion face) */}
                  <motion.div
                    animate={{
                      left: keeperVisualPos.x,
                      top: keeperVisualPos.y,
                      rotate: keeperVisualPos.style === 'dive-left' ? -55 : keeperVisualPos.style === 'dive-right' ? 55 : 0,
                      scale: keeperVisualPos.style !== 'idle' ? 1.15 : 1.0,
                    }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    className="absolute w-14 h-20 -ml-7 -mt-10 flex flex-col justify-end items-center pointer-events-none z-20"
                  >
                    {/* Animated Gloves outstretched */}
                    <div className="relative w-full flex justify-between px-1 -mb-1">
                      <motion.span 
                        animate={keeperVisualPos.style === 'idle' ? { y: [0, -3, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-xl filter drop-shadow">🧤</motion.span>
                      <motion.span 
                        animate={keeperVisualPos.style === 'idle' ? { y: [-3, 0, -3] } : {}}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-xl filter drop-shadow">🧤</motion.span>
                    </div>

                    {/* Goalkeeper Jersey Torso & Face */}
                    <div className={`w-8 h-10 rounded-t-xl border border-white/20 shadow-lg flex flex-col items-center justify-center relative ${
                      isUserTaker ? 'bg-gradient-to-b from-rose-500 to-rose-700' : 'bg-gradient-to-b from-emerald-400 to-emerald-600'
                    }`}>
                      {/* Interactive emotional reaction facial states */}
                      <div className="w-5 h-5 rounded-full bg-amber-200 border border-black/10 -mt-5 flex items-center justify-center text-[10px] shadow font-black">
                        {keeperVisualPos.style === 'idle' ? '😠' : keeperVisualPos.style === 'stretch' ? '😲' : '🦁'}
                      </div>
                      
                      {/* Jersey Squad Number */}
                      <span className="text-[10px] font-sans font-black text-white leading-none tracking-tight mt-0.5">
                        {isUserTaker ? '1' : '23'}
                      </span>
                    </div>

                    {/* Goalkeeper styled Jersey label tag */}
                    <span className={`text-[9px] font-mono font-black tracking-wider px-1.5 py-0.5 rounded text-white shadow-md border leading-none mt-1 ${
                      isUserTaker ? 'bg-rose-950 border-rose-500/30' : 'bg-emerald-950 border-emerald-500/30'
                    }`}>
                      {isUserTaker ? activeOpponent.goalkeeper.split(' ').pop()?.toUpperCase() : 'EL DIBU'}
                    </span>
                  </motion.div>

                  {/* Active guideline for Lionel Messi Perk */}
                  {shouldShowGuideline && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
                      <line
                        x1="50%"
                        y1="90%"
                        x2={`${TARGET_COORDINATES[selectedTarget!].x}%`}
                        y2={`${TARGET_COORDINATES[selectedTarget!].y}%`}
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeDasharray="5 5"
                      />
                    </svg>
                  )}
                </div>

                {/* ADVANCED SIGNATURE STRIP SHOT TRAILS (Messi Golden trail, Lautaro Red fire, Julian Blue spider) */}
                {isShotActive && (
                  <motion.div
                    className="absolute pointer-events-none rounded-full blur-md opacity-75 z-10"
                    animate={{
                      left: ballVisualPos.x,
                      top: ballVisualPos.y,
                      scale: ballVisualPos.scale * 1.5,
                    }}
                    style={{
                      background: 
                        selectedStriker.id === 'messi' ? 'radial-gradient(circle, rgba(245,158,11,0.65) 0%, transparent 70%)' :
                        selectedStriker.id === 'martinez' ? 'radial-gradient(circle, rgba(239,68,68,0.7) 0%, transparent 70%)' :
                        selectedStriker.id === 'alvarez' ? 'radial-gradient(circle, rgba(14,165,233,0.65) 0%, transparent 70%)' :
                        'radial-gradient(circle, rgba(255,255,255,0.45) 0%, transparent 70%)',
                      width: '44px',
                      height: '44px',
                      transform: 'translate(-22px, -22px)'
                    }}
                  />
                )}

                {/* THE FLIGHT ACTIVE SOCCER BALL */}
                <motion.div
                  animate={{
                    left: ballVisualPos.x,
                    top: ballVisualPos.y,
                    scale: ballVisualPos.scale,
                    rotate: ballVisualPos.rotate
                  }}
                  transition={{ type: 'spring', stiffness: 90, damping: 12 }}
                  className="absolute w-8 h-8 -ml-4 -mt-4 bg-white border-2 border-zinc-950 rounded-full flex items-center justify-center font-bold text-[9px] text-zinc-900 shadow-md z-20 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 35% 35%, #fff 0%, #ddd 60%, #444 100%)'
                  }}
                >
                  ⚽
                </motion.div>

              </div>

              {/* ACTION COMMAND CONTROLS CONSOLE */}
              <div className="pt-4 border-t border-zinc-850 space-y-4">
                
                {/* 1. Interactive Help Context Banner */}
                <div className="flex gap-2.5 items-start bg-zinc-950/40 p-3 rounded-xl border border-zinc-850/80">
                  <AlertCircle className="w-4.5 h-4.5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div className="text-[11px] leading-relaxed text-zinc-300">
                    {actionNarrative}
                  </div>
                </div>

                {/* USER STRIKING CONTROLS ACTIONS (Shooting) */}
                {isUserTaker && !isShotActive && !shotResolved && (
                  <div className="space-y-4">
                    {/* The Power oscillating gauge Slider bar */}
                    <div className="space-y-1.5 text-zinc-100">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-zinc-500 font-bold select-none text-[10px]">⚽ SHOT POWER CONSOLE:</span>
                        <span className={`font-black ${
                          power > 90 ? 'text-rose-500 animate-pulse' : power > 60 ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {Math.floor(power)}% {power > 90 ? '!! OVERPRESSURE !!' : power > 60 ? 'SWEET SPOT' : 'CAUTIOUS'}
                        </span>
                      </div>
                      
                      <div className="relative h-4 bg-zinc-950 border border-zinc-c850 rounded-lg overflow-hidden flex items-center justify-center">
                        {/* Perfect Power sweet spot threshold markers */}
                        <div className="absolute right-[15%] left-[30%] top-0 bottom-0 bg-emerald-500/25 border-x border-emerald-500/35 font-bold text-[8.5px] text-emerald-400 flex items-center justify-center font-mono select-none">
                          ⭐ BEST ACCURACY SWEET SPOT
                        </div>
                        <div className="absolute right-0 w-[12%] top-0 bottom-0 bg-rose-500/20 font-bold text-[8.5px] text-rose-450 flex items-center justify-center font-mono select-none">
                          RISK OVER
                        </div>
                        {/* Current charge layer progress */}
                        <div 
                          className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r transition-all duration-75 ${
                            power > 90 
                              ? 'from-sky-400 to-rose-500' 
                              : 'from-sky-500 to-emerald-400'
                          }`}
                          style={{ width: `${power}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleChargeButtonClick}
                        className={`flex-1 py-3 px-5 border rounded-xl flex flex-col items-center justify-center gap-0.5 transition duration-300 select-none outline-none cursor-pointer ${
                          !selectedTarget
                            ? 'bg-zinc-850 border-zinc-800 text-zinc-550 opacity-50 cursor-not-allowed'
                            : isPowerCharging
                            ? 'bg-amber-400 border-amber-300 text-zinc-950 shadow-lg scale-[0.98]'
                            : 'bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-300 hover:to-sky-500 text-zinc-950 hover:shadow shadow-sky-500/25'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Zap className={`w-4 h-4 ${isPowerCharging ? 'fill-current animate-bounce' : 'fill-current'}`} />
                          <span className="font-extrabold uppercase text-xs tracking-wider">
                            {isPowerCharging ? "🎯 Tap/Click Again to SHOOT NOW!" : "⚡ Tap to Start Power Swing"}
                          </span>
                        </div>
                        <span className="text-[10px] font-normal lowercase text-zinc-800/85 mt-0.5">
                          {isPowerCharging ? "Freeze the gauge to unleash soccer strike!" : "No holding required! Tap once to swing, tap again to shoot."}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* USER GOALKEEPER MODE INTERACTIVE SELECTION */}
                {!isUserTaker && !isShotActive && !shotResolved && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(Object.keys(TARGET_COORDINATES) as TargetZone[]).map(zone => (
                      <button
                        key={zone}
                        onClick={() => executeAiShot(zone)}
                        className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 hover:border-emerald-500 hover:bg-emerald-500/10 text-zinc-300 font-extrabold rounded-xl text-xs transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Shield className="w-3.5 h-3.5 text-emerald-500" /> Dive {zone} ({TARGET_COORDINATES[zone].label})
                      </button>
                    ))}
                  </div>
                )}

                {/* TRANSITION BUTTON POSTACTION NEXT SHOT */}
                {shotResolved && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleNextTurnTransition}
                      className="w-full py-3.5 px-6 bg-yellow-500 hover:bg-yellow-405 text-zinc-950 font-black uppercase text-xs tracking-wider rounded-xl transition duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Advance to Next Action</span> <ChevronRight className="w-4 h-4 text-zinc-950 stroke-[3]" />
                    </button>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* GAME_OVER SHOOTOUT SUMMARY SECTION */}
          {gameState === 'shootout_end' && (
            <div className="flex-1 flex flex-col justify-between items-center text-center p-6 space-y-6">
              
              <div className="space-y-3.5 max-w-sm">
                <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mx-auto text-3xl">
                  {userTurns.filter(t => t === 'goal').length > aiTurns.filter(t => t === 'goal').length ? '🏆' : '💀'}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-sans text-white uppercase tracking-tight">
                    {userTurns.filter(t => t === 'goal').length > aiTurns.filter(t => t === 'goal').length ? 'Shootout Victory!' : 'Shootout Defeated!'}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                    {actionNarrative}
                  </p>
                </div>
              </div>

              {/* Graphic Score readout panel */}
              <div className="flex gap-12 text-center bg-zinc-950 border border-zinc-850 p-6 rounded-2xl w-full max-w-md justify-around shadow-inner font-mono">
                <div>
                  <span className="text-[10px] text-zinc-550 block font-bold">ARGENTINA</span>
                  <span className="text-3xl font-black text-sky-400 block mt-1">
                    {userTurns.filter(t => t === 'goal').length}
                  </span>
                  <p className="text-[10px] text-zinc-500 mt-1">Goals converted</p>
                </div>
                <div className="border-r border-zinc-850 flex items-center h-12 my-auto" />
                <div>
                  <span className="text-[10px] text-zinc-550 block font-bold">{activeOpponent.country.toUpperCase()}</span>
                  <span className="text-3xl font-black text-rose-400 block mt-1">
                    {aiTurns.filter(t => t === 'goal').length}
                  </span>
                  <p className="text-[10px] text-zinc-500 mt-1">Goals converted</p>
                </div>
              </div>

              {/* Action layout selectors */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-4 border-t border-zinc-850">
                {userTurns.filter(t => t === 'goal').length > aiTurns.filter(t => t === 'goal').length ? (
                  opponentIndex === OPPONENTS.length - 1 ? (
                    <button
                      onClick={handleRestartCup}
                      className="flex-1 py-3 px-4 bg-yellow-500 text-zinc-950 hover:bg-yellow-405 font-black uppercase text-xs tracking-widest rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      🏆 Lift Shootout Cup!
                    </button>
                  ) : (
                    <button
                      onClick={handleNextOpponent}
                      className="flex-1 py-3 px-4 bg-sky-500 text-zinc-950 hover:bg-sky-400 font-black uppercase text-xs tracking-widest rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Next Opponent: {OPPONENTS[opponentIndex + 1]?.country} <ChevronRight className="w-4 h-4 text-zinc-950" />
                    </button>
                  )
                ) : (
                  <button
                    onClick={handleStartShootout}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-305 text-zinc-950 font-black uppercase text-xs tracking-widest rounded-xl transition cursor-pointer"
                  >
                    🔄 Play Shootout Revenge Re-Match
                  </button>
                )}
                
                <button
                  onClick={handleRestartCup}
                  className="py-3 px-4 bg-zinc-950 text-zinc-450 hover:text-white border border-zinc-850 hover:bg-zinc-900 font-bold uppercase text-xs tracking-wider rounded-xl transition cursor-pointer"
                >
                  Exit Locker Room
                </button>
              </div>

            </div>
          )}

          {/* GLOBAL TOURNAMENT_WIN SCREEN */}
          {gameState === 'tournament_win' && (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-8 space-y-7 relative">
              <div className="absolute inset-0 bg-yellow-500/5 mix-blend-color-dodge blur-3xl pointer-events-none" />
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-black tracking-widest text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-3 py-1 rounded inline-block animate-bounce">
                  🏆 TOURNAMENT CLEARED CHROME_GOLD
                </span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                  LA SCALONETA ULTIMATE CUP CHAMPION!
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Incredible performance! You mastered every shootout challenge and stood firm. Argentina and Dibu Martínez celebrate on top of the penalty shootout podium once again!
                </p>
              </div>

              {/* Virtual Trophy Gold display */}
              <div className="relative p-6 bg-zinc-950/90 border border-yellow-500/30 rounded-3xl w-full max-w-sm flex flex-col items-center">
                <div className="absolute top-2 right-2 flex text-xs font-mono text-yellow-400 animate-pulse"><Crown className="w-4 h-4" /> GOLD</div>
                <Trophy className="w-16 h-16 text-yellow-400 animate-pulse" />
                <h4 className="text-md font-black text-white uppercase tracking-tight mt-4">La Scaloneta Trophy Vault</h4>
                <p className="text-[10px] text-zinc-500 font-mono mt-1">Cleared: Pickford, Ter Stegen, Maignan, and Alisson Becker.</p>
              </div>

              <div className="flex gap-3 w-full max-w-sm justify-center">
                <button
                  onClick={handleRestartCup}
                  className="w-full py-3.5 px-6 bg-yellow-500 text-zinc-950 hover:bg-yellow-405 font-black uppercase text-xs tracking-widest rounded-xl transition cursor-pointer shadow-lg shadow-yellow-500/20"
                >
                  🔄 Command New Campaign Run
                </button>
              </div>

            </div>
          )}

        </div>

        {/* ENHANCED INTERACTIVE VISUAL STUDY/GUIDE AREA FOR ARCADE MASTERCLASS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-zinc-850 pb-3 select-none">
            <span className="text-xl p-2.5 bg-amber-500/10 text-amber-505 rounded-xl">📖</span>
            <div>
              <h4 className="text-sm font-black uppercase text-white tracking-wide">Interactive Guide: How To Play & Win</h4>
              <p className="text-[11px] text-zinc-400">Master the physics and mechanics to defeat top global squads</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-zinc-300">
            {/* Attacker guide column */}
            <div className="space-y-3 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-c850/80">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-sky-500/15 text-sky-400 py-1 px-2.5 rounded-lg font-black font-mono">ROLE ⚔️</span>
                <strong className="text-zinc-100 uppercase tracking-tight text-[11px]">Argentina Striker (Shooting)</strong>
              </div>
              <ul className="space-y-2.5 leading-relaxed text-[11.5px]">
                <li className="flex gap-2 items-start">
                  <span className="text-sky-450 font-extrabold">1.</span>
                  <span><strong>Choose Target:</strong> Click directly on one of the <strong>6 circular targets</strong> in the goal net (e.g., <strong>TR</strong> for Top-Right corner).</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-sky-450 font-extrabold">2.</span>
                  <span><strong>Start Power Swing:</strong> Click the <strong>"START POWER SWING"</strong> button. The gauge begins swinging back and forth automatically!</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-sky-450 font-extrabold">3.</span>
                  <span><strong>Strike:</strong> Watch the swing indicator and click or tap the <strong>SAME button again</strong> when the slider line lands inside the green <span className="text-emerald-400 font-bold">BEST ACCURACY</span> zone (30% - 85% power)!</span>
                </li>
                <li className="flex gap-2 items-start text-amber-500 font-semibold border-t border-zinc-900/60 pt-2">
                  <span>⚠️ Danger Overpressure:</span>
                  <span>If power exceeds 92%, your strike becomes highly unstable, resulting in hitting the post woodwork or blasting over the crossbar!</span>
                </li>
              </ul>
            </div>

            {/* Defender guide column */}
            <div className="space-y-3 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-c850/80">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-500/15 text-emerald-450 py-1 px-2.5 rounded-lg font-black font-mono">ROLE 🛡️</span>
                <strong className="text-zinc-100 uppercase tracking-tight text-[11px]">Dibu Martínez (Defending GK)</strong>
              </div>
              <ul className="space-y-2.5 leading-relaxed text-[11.5px]">
                <li className="flex gap-2 items-start">
                  <span className="text-emerald-400 font-extrabold">1.</span>
                  <span><strong>Guess Dive Angle:</strong> The opposing striker walks up to take their penalty shot. Get inside their head!</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-emerald-400 font-extrabold">2.</span>
                  <span><strong>Pick Your Dive:</strong> Tap directly on the target quadrant in the goal net OR use the 6 green dive choice buttons below the pitch to choose your direction.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-emerald-400 font-extrabold">3.</span>
                  <span><strong>Block & Save:</strong> If your dive quadrant matches their shot vector (or is adjacent), your glove reflexes decide if you make a spectacular save!</span>
                </li>
                <li className="flex gap-2 items-start text-yellow-450 font-semibold border-t border-zinc-900/60 pt-2">
                  <span>⚡ Pro Player Traits:</span>
                  <span>Lionel Messi displays a guided golden projection line pointing to his chosen corner to aid your shot placement!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: LEADERBOARDS & STATS METRICS PANEL (4 Cols) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* STATS PERFORMANCE CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-xs font-bold font-mono tracking-wider text-zinc-400 uppercase mb-4 flex items-center gap-1.5 border-b border-zinc-800 pb-2.5">
            <TrendingUp className="w-4 h-4 text-sky-400" /> Career Arcade Registry
          </h3>

          <div className="space-y-4">
            {/* Wins vs losses summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950 border border-zinc-850 p-3.5 rounded-xl text-center">
                <span className="text-[10.5px] font-mono text-zinc-500 block uppercase font-bold">ARCADE WINS</span>
                <span className="text-2xl font-black text-white block mt-1">{stats.shootoutsWon}</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-850 p-3.5 rounded-xl text-center">
                <span className="text-[10.5px] font-mono text-zinc-500 block uppercase font-bold">LOSSES</span>
                <span className="text-2xl font-black text-zinc-400 block mt-1">{stats.shootoutsLost}</span>
              </div>
            </div>

            {/* Individual Stat Items */}
            <div className="bg-zinc-950/70 border border-zinc-850 rounded-2xl p-4 space-y-3.5 text-xs">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-zinc-400 font-medium">Goals Hammered:</span>
                <span className="font-mono font-bold text-zinc-200">{stats.goalsScored} 🔥</span>
              </div>
              <div className="flex justify-between items-center text-[11px] border-t border-zinc-900 pt-2.5">
                <span className="text-zinc-400 font-medium">GK Gloves Saves (Dibu Mode):</span>
                <span className="font-mono font-bold text-emerald-400">{stats.savesMade} 🧤</span>
              </div>
              <div className="flex justify-between items-center text-[11px] border-t border-zinc-900 pt-2.5">
                <span className="text-zinc-400 font-medium">Active Match Consecutive Streak:</span>
                <span className="font-mono font-bold text-yellow-450">{stats.highestStreak} ⚡</span>
              </div>
            </div>

            <button
              onClick={() => {
                const fresh: GameStats = { shootoutsWon: 0, shootoutsLost: 0, goalsScored: 0, savesMade: 0, highestStreak: 0 };
                setStats(fresh);
                localStorage.setItem('afa_penalty_arcade_stats', JSON.stringify(fresh));
                setActionNarrative("Career statistics cleared. Command new records!");
              }}
              className="w-full py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-zinc-500 hover:text-rose-400 text-[10px] font-mono uppercase rounded-xl transition duration-300 tracking-wider mb-2"
            >
              ☢️ Clear Stats Records
            </button>
          </div>
        </div>

        {/* ARCADE GAMEPLAY TROPHIES/ACHIEVEMENTS */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4">
          <h4 className="font-bold text-white flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase border-b border-zinc-800 pb-2.5">
            🏆 SHOOTOUT TROPHY UNLOCKS ({
              (stats.shootoutsWon >= 1 ? 1 : 0) + 
              (stats.goalsScored >= 10 ? 1 : 0) + 
              (stats.savesMade >= 5 ? 1 : 0) + 
              (stats.highestStreak >= 3 ? 1 : 0)
            }/4)
          </h4>

          <div className="space-y-3">
            {/* Achievement 1 */}
            <div className={`p-3 rounded-xl border flex gap-3 items-center transition-all ${
              stats.shootoutsWon >= 1 
                ? 'bg-amber-400/5 border-amber-400/25 text-zinc-300' 
                : 'bg-zinc-950/20 border-zinc-850 opacity-45'
            }`}>
              <span className="text-xl">🇦🇷</span>
              <div>
                <h4 className="text-[11px] font-black uppercase text-zinc-100 flex items-center gap-1.5">First Campaign Claim {stats.shootoutsWon >= 1 && '✓'}</h4>
                <p className="text-[10px] text-zinc-400">Win your first full shootout against any country.</p>
              </div>
            </div>

            {/* Achievement 2 */}
            <div className={`p-3 rounded-xl border flex gap-3 items-center transition-all ${
              stats.goalsScored >= 10 
                ? 'bg-amber-400/5 border-amber-400/25 text-zinc-300' 
                : 'bg-zinc-950/20 border-zinc-850 opacity-45'
            }`}>
              <span className="text-xl">🔥</span>
              <div>
                <h4 className="text-[11px] font-black uppercase text-zinc-100 flex items-center gap-1.5">Hammertime conversion {stats.goalsScored >= 10 && '✓'}</h4>
                <p className="text-[10px] text-zinc-400">Score 10 penalty goals in career matches.</p>
              </div>
            </div>

            {/* Achievement 3 */}
            <div className={`p-3 rounded-xl border flex gap-3 items-center transition-all ${
              stats.savesMade >= 5 
                ? 'bg-amber-400/5 border-amber-400/25 text-zinc-300' 
                : 'bg-zinc-950/20 border-zinc-850 opacity-45'
            }`}>
              <span className="text-xl">🧤</span>
              <div>
                <h4 className="text-[11px] font-black uppercase text-zinc-100 flex items-center gap-1.5">El Dibu Sanctuary {stats.savesMade >= 5 && '✓'}</h4>
                <p className="text-[10px] text-zinc-400">Make 5 gloves saves as GK Dibu Martínez.</p>
              </div>
            </div>

            {/* Achievement 4 */}
            <div className={`p-3 rounded-xl border flex gap-3 items-center transition-all ${
              stats.highestStreak >= 3 
                ? 'bg-amber-400/5 border-amber-400/25 text-zinc-300' 
                : 'bg-zinc-950/20 border-zinc-850 opacity-45'
            }`}>
              <span className="text-xl">⚡</span>
              <div>
                <h4 className="text-[11px] font-black uppercase text-zinc-100 flex items-center gap-1.5">Ice In The Veins {stats.highestStreak >= 3 && '✓'}</h4>
                <p className="text-[10px] text-zinc-400">Maintain an undefeated win streak of 3 shootout cups.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
