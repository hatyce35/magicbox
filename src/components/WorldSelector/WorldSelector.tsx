import React from 'react';
import { motion } from 'motion/react';
import { GAME_WORLDS } from '../../data/worlds';
import { Language } from '../../types/game';
import { translations } from '../../data/localization';
import { X, Globe2, Lock, CheckCircle2 } from 'lucide-react';

interface Props {
  activeWorldId: string;
  discoveredCount: number;
  language: Language;
  onSelectWorld: (worldId: string) => void;
  onClose: () => void;
}

export const WorldSelector: React.FC<Props> = ({
  activeWorldId,
  discoveredCount,
  language,
  onSelectWorld,
  onClose,
}) => {
  const t = translations[language];

  return (
    <div
      id="modal-world-selector"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md select-none"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-xl max-h-[90vh] bg-slate-900 border border-violet-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col overflow-hidden text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-violet-800/40">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-emerald-200">
                {t.worlds}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'tr'
                  ? 'Keşfetmek için bir dünya seç'
                  : 'Choose a wonder realm to explore'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-worlds"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Worlds List */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 flex flex-col gap-3">
          {GAME_WORLDS.map(world => {
            const isUnlocked = discoveredCount >= world.requiredDiscoveries || world.unlocked;
            const isActive = activeWorldId === world.id;

            return (
              <motion.div
                key={world.id}
                whileHover={isUnlocked ? { scale: 1.02 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                onClick={() => {
                  if (isUnlocked) {
                    onSelectWorld(world.id);
                    onClose();
                  }
                }}
                className={`relative rounded-2xl p-4 flex items-center justify-between border-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-950 to-indigo-950 border-emerald-400 shadow-lg'
                    : isUnlocked
                    ? 'bg-slate-800/80 border-slate-700 hover:border-violet-400 cursor-pointer'
                    : 'bg-slate-900/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{world.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-white">
                        {world.name[language]}
                      </h3>
                      {isActive && (
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm">
                      {world.description[language]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  {isUnlocked ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{world.requiredDiscoveries} ⭐</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
