// // app/pomodoro/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import AppShell from "@/components/layout/AppShell";
// import {
//   Play, Pause, RotateCcw, SkipForward,
//   Volume2, VolumeX, Maximize, Minimize,
//   Coffee, Brain, Settings, Check, Timer,
// } from "lucide-react";

// type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

// interface TimerSettings {
//   pomodoro: number;
//   shortBreak: number;
//   longBreak: number;
//   longBreakInterval: number;
//   autoStartBreaks: boolean;
//   autoStartPomodoros: boolean;
//   soundEnabled: boolean;
// }

// export default function PomodoroPage() {
//   const [mode, setMode] = useState<TimerMode>("pomodoro");
//   const [timeLeft, setTimeLeft] = useState(25 * 60);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [pomodoroCount, setPomodoroCount] = useState(0);
//   const [settings, setSettings] = useState<TimerSettings>({
//     pomodoro: 25,
//     shortBreak: 5,
//     longBreak: 15,
//     longBreakInterval: 4,
//     autoStartBreaks: true,
//     autoStartPomodoros: false,
//     soundEnabled: true,
//   });
//   const [tempSettings, setTempSettings] = useState(settings);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const getTimeForMode = useCallback((mode: TimerMode): number => {
//     switch (mode) {
//       case "pomodoro": return settings.pomodoro * 60;
//       case "shortBreak": return settings.shortBreak * 60;
//       case "longBreak": return settings.longBreak * 60;
//       default: return settings.pomodoro * 60;
//     }
//   }, [settings]);

//   useEffect(() => {
//     setTimeLeft(getTimeForMode(mode));
//     setIsRunning(false);
//   }, [mode, getTimeForMode]);

//   useEffect(() => {
//     if (isRunning && timeLeft > 0) {
//       timerRef.current = setTimeout(() => {
//         setTimeLeft(prev => prev - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && isRunning) {
//       handleTimerComplete();
//     }
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, [isRunning, timeLeft]);

//   const playBeep = () => {
//     const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
    
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);
//     oscillator.frequency.value = 880;
//     gainNode.gain.value = 0.2;
    
//     oscillator.start();
//     setTimeout(() => {
//       oscillator.stop();
//       audioContext.close();
//     }, 300);
//   };

//   const handleTimerComplete = () => {
//     setIsRunning(false);
    
//     if (settings.soundEnabled) {
//       playBeep();
//     }
    
//     if (Notification.permission === "granted") {
//       new Notification("Time's Up!", {
//         body: mode === "pomodoro" ? "Great job! Time for a break." : "Break is over! Ready to focus?",
//       });
//     }

//     if (mode === "pomodoro") {
//       const newCount = pomodoroCount + 1;
//       setPomodoroCount(newCount);
      
//       if (newCount % settings.longBreakInterval === 0) {
//         setMode("longBreak");
//       } else {
//         setMode("shortBreak");
//       }
      
//       if (settings.autoStartBreaks) {
//         setTimeout(() => setIsRunning(true), 100);
//       }
//     } else {
//       setMode("pomodoro");
//       if (settings.autoStartPomodoros) {
//         setTimeout(() => setIsRunning(true), 100);
//       }
//     }
//   };

//   const formatTime = (seconds: number): string => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const startTimer = () => setIsRunning(true);
//   const pauseTimer = () => setIsRunning(false);
//   const resetTimer = () => {
//     setIsRunning(false);
//     setTimeLeft(getTimeForMode(mode));
//   };
//   const skipTimer = () => handleTimerComplete();

//   const toggleFullscreen = async () => {
//     const element = containerRef.current;
//     if (!document.fullscreenElement) {
//       await element?.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       await document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };
//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
//   }, []);

//   useEffect(() => {
//     if (Notification.permission === "default") {
//       Notification.requestPermission();
//     }
//   }, []);

//   const saveSettings = () => {
//     setSettings(tempSettings);
//     setTimeLeft(getTimeForMode(mode));
//     setShowSettings(false);
//   };

//   // Calculate progress percentage
//   const progress = ((getTimeForMode(mode) - timeLeft) / getTimeForMode(mode)) * 100;

//   return (
//     <AppShell>
//       <div ref={containerRef} className="h-full overflow-auto" style={{ background: "var(--bg-primary)" }}>
//         <div className="max-w-4xl mx-auto p-6">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="section-title">Pomodoro Timer</h1>
//             <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
//               Focus in intervals, take breaks, and boost productivity
//             </p>
//           </div>

//           {/* Mode Selector */}
//           <div className="flex gap-2 mb-8 bg-elevated rounded-xl p-1 inline-flex" style={{ background: "var(--bg-elevated)" }}>
//             {[
//               { mode: "pomodoro", label: "Focus", icon: <Timer size={14} /> },
//               { mode: "shortBreak", label: "Short Break", icon: <Coffee size={14} /> },
//               { mode: "longBreak", label: "Long Break", icon: <Brain size={14} /> },
//             ].map((item) => (
//               <button
//                 key={item.mode}
//                 onClick={() => setMode(item.mode as TimerMode)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
//                   mode === item.mode
//                     ? "bg-primary-main text-black"
//                     : "text-secondary hover:text-primary"
//                 }`}
//                 style={mode === item.mode ? {} : { color: "var(--text-secondary)" }}
//               >
//                 {item.icon}
//                 {item.label}
//               </button>
//             ))}
//           </div>

//           {/* Timer Display */}
//           <div className="text-center mb-8">
//             <div className="mb-4">
//               <span className="text-7xl md:text-8xl font-mono font-bold tracking-wider"
//                 style={{
//                   color: "var(--text-primary)",
//                   fontFamily: "'Courier New', 'JetBrains Mono', monospace",
//                   letterSpacing: "0.05em",
//                 }}
//               >
//                 {formatTime(timeLeft)}
//               </span>
//             </div>

//             {/* Progress bar */}
//             <div className="max-w-md mx-auto">
//               <div className="progress-bar h-1.5 rounded-full">
//                 <div
//                   className="progress-fill rounded-full transition-all duration-1000"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex justify-center gap-3 mb-8">
//             <button
//               onClick={resetTimer}
//               className="p-3 rounded-xl transition-all"
//               style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
//             >
//               <RotateCcw size={20} />
//             </button>
            
//             {isRunning ? (
//               <button
//                 onClick={pauseTimer}
//                 className="p-4 rounded-xl bg-primary-main transition-all"
//               >
//                 <Pause size={24} className="text-black" />
//               </button>
//             ) : (
//               <button
//                 onClick={startTimer}
//                 className="p-4 rounded-xl bg-primary-main transition-all"
//               >
//                 <Play size={24} className="text-black ml-0.5" />
//               </button>
//             )}
            
//             <button
//               onClick={skipTimer}
//               className="p-3 rounded-xl transition-all"
//               style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
//             >
//               <SkipForward size={20} />
//             </button>
//           </div>

//           {/* Pomodoro Counter */}
//           <div className="text-center mb-8">
//             <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
//               Pomodoros completed
//             </div>
//             <div className="flex gap-2 justify-center">
//               {[...Array(settings.longBreakInterval)].map((_, i) => (
//                 <div
//                   key={i}
//                   className={`w-2 h-2 rounded-full transition-all ${
//                     i < pomodoroCount % settings.longBreakInterval
//                       ? "bg-primary-main"
//                       : "bg-gray-600"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-center gap-3">
//             <button
//               onClick={() => setShowSettings(true)}
//               className="px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5"
//               style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
//             >
//               <Settings size={12} />
//               Settings
//             </button>
            
//             <button
//               onClick={toggleFullscreen}
//               className="px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5"
//               style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
//             >
//               {isFullscreen ? <Minimize size={12} /> : <Maximize size={12} />}
//               {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
//             </button>

//             <button
//               onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
//               className="px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5"
//               style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
//             >
//               {settings.soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
//               Sound
//             </button>
//           </div>
//         </div>

//         {/* Settings Modal */}
//         {showSettings && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }}>
//             <div className="w-full max-w-md rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-medium)" }}>
//               <div className="p-5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
//                     <Settings size={20} />
//                     Timer Settings
//                   </h2>
//                   <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-gray-700 rounded-lg">
//                     ✕
//                   </button>
//                 </div>
//               </div>

//               <div className="p-5 space-y-4">
//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>
//                     Focus Duration (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     value={tempSettings.pomodoro}
//                     onChange={(e) => setTempSettings({ ...tempSettings, pomodoro: parseInt(e.target.value) || 25 })}
//                     className="input-field"
//                     min="1"
//                     max="60"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>
//                     Short Break (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     value={tempSettings.shortBreak}
//                     onChange={(e) => setTempSettings({ ...tempSettings, shortBreak: parseInt(e.target.value) || 5 })}
//                     className="input-field"
//                     min="1"
//                     max="30"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>
//                     Long Break (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     value={tempSettings.longBreak}
//                     onChange={(e) => setTempSettings({ ...tempSettings, longBreak: parseInt(e.target.value) || 15 })}
//                     className="input-field"
//                     min="1"
//                     max="60"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>
//                     Long Break Interval (after X focuses)
//                   </label>
//                   <input
//                     type="number"
//                     value={tempSettings.longBreakInterval}
//                     onChange={(e) => setTempSettings({ ...tempSettings, longBreakInterval: parseInt(e.target.value) || 4 })}
//                     className="input-field"
//                     min="2"
//                     max="6"
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
//                     Auto-start breaks
//                   </label>
//                   <button
//                     onClick={() => setTempSettings({ ...tempSettings, autoStartBreaks: !tempSettings.autoStartBreaks })}
//                     className={`w-10 h-5 rounded-full transition-colors relative ${tempSettings.autoStartBreaks ? "bg-primary-main" : "bg-gray-600"}`}
//                   >
//                     <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${tempSettings.autoStartBreaks ? "translate-x-5" : "translate-x-0.5"}`} />
//                   </button>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
//                     Auto-start focus sessions
//                   </label>
//                   <button
//                     onClick={() => setTempSettings({ ...tempSettings, autoStartPomodoros: !tempSettings.autoStartPomodoros })}
//                     className={`w-10 h-5 rounded-full transition-colors relative ${tempSettings.autoStartPomodoros ? "bg-primary-main" : "bg-gray-600"}`}
//                   >
//                     <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${tempSettings.autoStartPomodoros ? "translate-x-5" : "translate-x-0.5"}`} />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-5 border-t flex gap-3" style={{ borderColor: "var(--border-subtle)" }}>
//                 <button onClick={() => setShowSettings(false)} className="flex-1 btn-ghost">
//                   Cancel
//                 </button>
//                 <button onClick={saveSettings} className="flex-1 btn-primary">
//                   Save Settings
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </AppShell>
//   );
// }

// app/pomodoro/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import AppShell from "@/components/layout/AppShell";
import {
  Play, Pause, RotateCcw, SkipForward,
  Volume2, VolumeX, Maximize, Minimize,
  Coffee, Brain, Settings, Timer, X,
} from "lucide-react";

type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
  tickTockEnabled: boolean;
}

export default function PomodoroPage() {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [settings, setSettings] = useState<TimerSettings>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    autoStartBreaks: true,
    autoStartPomodoros: false,
    soundEnabled: true,
    tickTockEnabled: true,
  });
  const [tempSettings, setTempSettings] = useState(settings);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const getTimeForMode = useCallback((mode: TimerMode): number => {
    switch (mode) {
      case "pomodoro": return settings.pomodoro * 60;
      case "shortBreak": return settings.shortBreak * 60;
      case "longBreak": return settings.longBreak * 60;
      default: return settings.pomodoro * 60;
    }
  }, [settings]);

  useEffect(() => {
    setTimeLeft(getTimeForMode(mode));
    setIsRunning(false);
  }, [mode, getTimeForMode]);

  // Tick tock sound effect
  const playTickTock = useCallback(() => {
    if (!settings.tickTockEnabled || !isRunning) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 1000;
      gainNode.gain.value = 0.05;
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1);
      oscillator.stop(audioContext.currentTime + 0.1);
      
      setTimeout(() => audioContext.close(), 200);
    } catch (e) {
      console.log("Audio error:", e);
    }
  }, [settings.tickTockEnabled, isRunning]);

  useEffect(() => {
    if (isRunning && timeLeft > 0 && timeLeft !== getTimeForMode(mode)) {
      playTickTock();
    }
  }, [timeLeft, isRunning, playTickTock, getTimeForMode, mode]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const playBeep = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.2;
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 500);
    } catch (e) {
      console.log("Audio error:", e);
    }
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (settings.soundEnabled) {
      playBeep();
    }
    
    if (Notification.permission === "granted") {
      new Notification("Time's Up!", {
        body: mode === "pomodoro" ? "Great job! Time for a break." : "Break is over! Ready to focus?",
      });
    }

    if (mode === "pomodoro") {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      
      if (newCount % settings.longBreakInterval === 0) {
        setMode("longBreak");
      } else {
        setMode("shortBreak");
      }
      
      if (settings.autoStartBreaks) {
        setTimeout(() => setIsRunning(true), 100);
      }
    } else {
      setMode("pomodoro");
      if (settings.autoStartPomodoros) {
        setTimeout(() => setIsRunning(true), 100);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getDigits = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const minsStr = mins.toString().padStart(2, "0");
    const secsStr = secs.toString().padStart(2, "0");
    return {
      min1: minsStr[0],
      min2: minsStr[1],
      sec1: secsStr[0],
      sec2: secsStr[1],
    };
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getTimeForMode(mode));
  };
  const skipTimer = () => handleTimerComplete();

  // FULLSCREEN FUNCTION - FIXED
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // Request fullscreen on the document root
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const saveSettings = () => {
    setSettings(tempSettings);
    setTimeLeft(getTimeForMode(mode));
    setShowSettings(false);
  };

  const progress = ((getTimeForMode(mode) - timeLeft) / getTimeForMode(mode)) * 100;
  const digits = getDigits(timeLeft);

  // FULLSCREEN VIEW
  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ background: "#000000" }}
      >
        {/* Exit fullscreen button */}
        <button
          onClick={toggleFullscreen}
          className="fixed top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-all z-50"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <X size={28} />
        </button>

        {/* Mode indicator */}
        <div className="fixed top-6 left-6 text-sm uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
          {mode === "pomodoro" ? "FOCUS" : mode === "shortBreak" ? "SHORT BREAK" : "LONG BREAK"}
        </div>

        {/* Timer Numbers */}
        <div className="flex items-center justify-center gap-4 md:gap-8 px-4">
          {/* Minutes */}
          <div className="text-[15vw] md:text-[12vw] font-mono font-bold tabular-nums"
            style={{
              color: "#FFFFFF",
              fontFamily: "'Courier New', 'JetBrains Mono', monospace",
              letterSpacing: "0.05em",
            }}
          >
            {digits.min1}{digits.min2}
          </div>

          {/* Colon */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-3 md:w-4 h-3 md:h-4 rounded-full" style={{ background: "#FFFFFF" }} />
            <div className="w-3 md:w-4 h-3 md:h-4 rounded-full" style={{ background: "#FFFFFF" }} />
          </div>

          {/* Seconds */}
          <div className="text-[15vw] md:text-[12vw] font-mono font-bold tabular-nums"
            style={{
              color: "#FFFFFF",
              fontFamily: "'Courier New', 'JetBrains Mono', monospace",
              letterSpacing: "0.05em",
            }}
          >
            {digits.sec1}{digits.sec2}
          </div>
        </div>

        {/* Progress ring */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <svg className="w-16 h-16 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${progress * 1.76} 176`}
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Controls */}
        <div className="fixed bottom-8 flex gap-6">
          <button onClick={resetTimer} className="p-3 rounded-full hover:bg-white/10 transition-all">
            <RotateCcw size={28} style={{ color: "rgba(255,255,255,0.7)" }} />
          </button>
          
          {isRunning ? (
            <button onClick={pauseTimer} className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              <Pause size={32} style={{ color: "#FFFFFF" }} />
            </button>
          ) : (
            <button onClick={startTimer} className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              <Play size={32} style={{ color: "#FFFFFF", marginLeft: 2 }} />
            </button>
          )}
          
          <button onClick={skipTimer} className="p-3 rounded-full hover:bg-white/10 transition-all">
            <SkipForward size={28} style={{ color: "rgba(255,255,255,0.7)" }} />
          </button>
        </div>

        {/* Hint */}
        <div className="fixed bottom-4 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Press ESC to exit
        </div>
      </div>
    );
  }

  // NORMAL VIEW (within app)
  return (
    <AppShell>
      <div className="h-full overflow-auto" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="section-title">Pomodoro Timer</h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              Focus in intervals, take breaks, and boost productivity
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-2 mb-8 rounded-xl p-1 inline-flex" style={{ background: "var(--bg-elevated)" }}>
            {[
              { mode: "pomodoro", label: "Focus", icon: <Timer size={14} /> },
              { mode: "shortBreak", label: "Short Break", icon: <Coffee size={14} /> },
              { mode: "longBreak", label: "Long Break", icon: <Brain size={14} /> },
            ].map((item) => (
              <button
                key={item.mode}
                onClick={() => setMode(item.mode as TimerMode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  mode === item.mode
                    ? "bg-primary-main text-black"
                    : "text-secondary hover:text-primary"
                }`}
                style={mode === item.mode ? {} : { color: "var(--text-secondary)" }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-7xl md:text-8xl font-mono font-bold tracking-wider"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "'Courier New', 'JetBrains Mono', monospace",
                  letterSpacing: "0.05em",
                }}
              >
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Progress bar */}
            <div className="max-w-md mx-auto">
              <div className="progress-bar h-1.5 rounded-full">
                <div
                  className="progress-fill rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={resetTimer}
              className="p-3 rounded-xl transition-all"
              style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
            >
              <RotateCcw size={20} />
            </button>
            
            {isRunning ? (
              <button
                onClick={pauseTimer}
                className="p-4 rounded-xl bg-primary-main transition-all"
              >
                <Pause size={24} className="text-black" />
              </button>
            ) : (
              <button
                onClick={startTimer}
                className="p-4 rounded-xl bg-primary-main transition-all"
              >
                <Play size={24} className="text-black ml-0.5" />
              </button>
            )}
            
            <button
              onClick={skipTimer}
              className="p-3 rounded-xl transition-all"
              style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Pomodoro Counter */}
          <div className="text-center mb-8">
            <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
              Pomodoros completed
            </div>
            <div className="flex gap-2 justify-center">
              {[...Array(settings.longBreakInterval)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i < pomodoroCount % settings.longBreakInterval
                      ? "bg-primary-main"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5"
              style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
            >
              <Settings size={12} />
              Settings
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5"
              style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
            >
              <Maximize size={12} />
              Fullscreen
            </button>

            <button
              onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
              className="px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5"
              style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
            >
              {settings.soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
              Sound
            </button>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }}>
            <div className="w-full max-w-md rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-medium)" }}>
              <div className="p-5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <Settings size={20} />
                    Timer Settings
                  </h2>
                  <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-gray-700 rounded-lg">
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>
                    Focus Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={tempSettings.pomodoro}
                    onChange={(e) => setTempSettings({ ...tempSettings, pomodoro: parseInt(e.target.value) || 25 })}
                    className="input-field"
                    min="1"
                    max="60"
                  />
                </div>

                <div>
                  <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>
                    Short Break (minutes)
                  </label>
                  <input
                    type="number"
                    value={tempSettings.shortBreak}
                    onChange={(e) => setTempSettings({ ...tempSettings, shortBreak: parseInt(e.target.value) || 5 })}
                    className="input-field"
                    min="1"
                    max="30"
                  />
                </div>

                <div>
                  <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>
                    Long Break (minutes)
                  </label>
                  <input
                    type="number"
                    value={tempSettings.longBreak}
                    onChange={(e) => setTempSettings({ ...tempSettings, longBreak: parseInt(e.target.value) || 15 })}
                    className="input-field"
                    min="1"
                    max="60"
                  />
                </div>

                <div>
                  <label className="text-sm mb-1 block" style={{ color: "var(--text-secondary)" }}>
                    Long Break Interval (after X focuses)
                  </label>
                  <input
                    type="number"
                    value={tempSettings.longBreakInterval}
                    onChange={(e) => setTempSettings({ ...tempSettings, longBreakInterval: parseInt(e.target.value) || 4 })}
                    className="input-field"
                    min="2"
                    max="6"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Auto-start breaks
                  </label>
                  <button
                    onClick={() => setTempSettings({ ...tempSettings, autoStartBreaks: !tempSettings.autoStartBreaks })}
                    className={`w-10 h-5 rounded-full transition-colors relative ${tempSettings.autoStartBreaks ? "bg-primary-main" : "bg-gray-600"}`}
                  >
                    <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${tempSettings.autoStartBreaks ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Auto-start focus sessions
                  </label>
                  <button
                    onClick={() => setTempSettings({ ...tempSettings, autoStartPomodoros: !tempSettings.autoStartPomodoros })}
                    className={`w-10 h-5 rounded-full transition-colors relative ${tempSettings.autoStartPomodoros ? "bg-primary-main" : "bg-gray-600"}`}
                  >
                    <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${tempSettings.autoStartPomodoros ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Tick-tock sound
                  </label>
                  <button
                    onClick={() => setTempSettings({ ...tempSettings, tickTockEnabled: !tempSettings.tickTockEnabled })}
                    className={`w-10 h-5 rounded-full transition-colors relative ${tempSettings.tickTockEnabled ? "bg-primary-main" : "bg-gray-600"}`}
                  >
                    <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${tempSettings.tickTockEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>

              <div className="p-5 border-t flex gap-3" style={{ borderColor: "var(--border-subtle)" }}>
                <button onClick={() => setShowSettings(false)} className="flex-1 btn-ghost">
                  Cancel
                </button>
                <button onClick={saveSettings} className="flex-1 btn-primary">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}