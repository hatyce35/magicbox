import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameSettings, GameStats, Language } from '../../types/game';
import { translations } from '../../data/localization';
import {
  X,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Music,
  Globe,
  RotateCcw,
  BarChart2,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  settings: GameSettings;
  stats: GameStats;
  discoveredCount: number;
  totalObjects: number;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const ParentArea: React.FC<Props> = ({
  settings,
  stats,
  discoveredCount,
  totalObjects,
  onUpdateSettings,
  onResetProgress,
  onClose,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const holdIntervalRef = useRef<number | null>(null);
  const t = translations[settings.language];

  const startHold = () => {
    if (isUnlocked) return;
    const startTime = Date.now();
    const duration = 3000; // 3 seconds

    holdIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setHoldProgress(pct);

      if (pct >= 100) {
        clearInterval(holdIntervalRef.current!);
        holdIntervalRef.current = null;
        setIsUnlocked(true);
      }
    }, 50);
  };

  const endHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    if (!isUnlocked) {
      setHoldProgress(0);
    }
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <div
      id="modal-parent-area"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md select-none"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-lg max-h-[90vh] bg-slate-900 border border-violet-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col overflow-hidden text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-violet-800/40">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-indigo-200">
                {t.settings}
              </h2>
              <p className="text-xs text-slate-400">{t.parentArea}</p>
            </div>
          </div>

          <button
            id="btn-close-parent-area"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Child-Resistant Gate: Hold for 3 seconds */}
        {!isUnlocked ? (
          <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-violet-500/40 flex items-center justify-center text-amber-300 mb-4 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-slate-200">
              {t.parentGateTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
              {t.parentGateSub}
            </p>

            {/* Hold Button with Progress Ring */}
            <div className="relative mt-6">
              <button
                id="btn-hold-parent-gate"
                onPointerDown={startHold}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                className="relative overflow-hidden w-48 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-violet-400/50"
              >
                {/* Progress bar background fill */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-amber-400/50 transition-all"
                  style={{ width: `${holdProgress}%` }}
                />
                <span className="relative z-10">{t.holdToEnter}</span>
              </button>
            </div>

            {holdProgress > 0 && (
              <span className="text-xs text-amber-300 font-bold mt-2 animate-pulse">
                {Math.ceil((3000 * (1 - holdProgress / 100)) / 1000)} {t.secLeft}...
              </span>
            )}
          </div>
        ) : (
          /* Unlocked Parent Dashboard */
          <div className="flex-1 overflow-y-auto pr-1 py-4 flex flex-col gap-4">
            {/* Stats Overview Card */}
            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3 text-slate-200 text-xs font-bold uppercase tracking-wider">
                <BarChart2 className="w-4 h-4 text-violet-400" />
                <span>{t.statsTitle}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-xl font-extrabold text-amber-300">
                    {discoveredCount} / {totalObjects}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {t.successRate}
                  </p>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-xl font-extrabold text-sky-300">
                    {stats.totalCombinationsTried}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {t.totalCombinations}
                  </p>
                </div>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-indigo-400" />
                <div>
                  <h4 className="text-sm font-bold text-slate-200">{t.language}</h4>
                  <p className="text-[11px] text-slate-400">English / Türkçe</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => onUpdateSettings({ language: 'en' })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    settings.language === 'en'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onUpdateSettings({ language: 'tr' })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    settings.language === 'tr'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  TR
                </button>
              </div>
            </div>

            {/* Sound Effects Toggle */}
            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {settings.soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <VolumeX className="w-5 h-5 text-slate-500" />
                )}
                <div>
                  <h4 className="text-sm font-bold text-slate-200">
                    {t.soundEffects}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {settings.soundEnabled ? 'Enabled' : 'Muted'}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  onUpdateSettings({ soundEnabled: !settings.soundEnabled })
                }
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.soundEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <motion.div
                  layout
                  className="bg-white w-4 h-4 rounded-full shadow-md"
                  animate={{ x: settings.soundEnabled ? 24 : 0 }}
                />
              </button>
            </div>

            {/* Background Ambience Toggle */}
            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Music className="w-5 h-5 text-pink-400" />
                <div>
                  <h4 className="text-sm font-bold text-slate-200">{t.music}</h4>
                  <p className="text-[11px] text-slate-400">
                    {settings.musicEnabled ? 'Playing' : 'Off'}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  onUpdateSettings({ musicEnabled: !settings.musicEnabled })
                }
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.musicEnabled ? 'bg-pink-500' : 'bg-slate-700'
                }`}
              >
                <motion.div
                  layout
                  className="bg-white w-4 h-4 rounded-full shadow-md"
                  animate={{ x: settings.musicEnabled ? 24 : 0 }}
                />
              </button>
            </div>

            {/* Reset Progress Option */}
            <div className="mt-2 pt-2 border-t border-slate-800">
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full py-2.5 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetProgress}</span>
                </button>
              ) : (
                <div className="bg-red-950/40 border border-red-500/50 p-3 rounded-xl text-center">
                  <p className="text-xs text-red-200 font-medium mb-2.5">
                    {t.resetConfirm}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onResetProgress();
                        setShowResetConfirm(false);
                        onClose();
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="flex-1 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
