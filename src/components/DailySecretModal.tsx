import React from 'react';
import { motion } from 'motion/react';
import { getDailyDiscovery } from '../data/dailyDiscovery';
import { Language, GameObject } from '../types/game';
import { translations } from '../data/localization';
import { X, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

interface Props {
  discoveredIds: string[];
  language: Language;
  onSelectForBox: (obj1: GameObject, obj2: GameObject) => void;
  onClose: () => void;
}

export const DailySecretModal: React.FC<Props> = ({
  discoveredIds,
  language,
  onSelectForBox,
  onClose,
}) => {
  const daily = getDailyDiscovery();
  const t = translations[language];

  if (!daily) return null;

  const isSolved = discoveredIds.includes(daily.resultObject.id);
  const input1Known = discoveredIds.includes(daily.inputObject1.id);
  const input2Known = discoveredIds.includes(daily.inputObject2.id);

  return (
    <div
      id="modal-daily-secret"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-sm bg-gradient-to-b from-indigo-950 to-slate-900 border-2 border-amber-400/80 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center text-white relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.dailyDiscovery}</span>
        </div>

        <h3 className="text-xl font-extrabold text-white">
          {language === 'tr' ? "Bugünün Gizemli Tarifi" : "Today's Secret Recipe"}
        </h3>
        <p className="text-xs text-slate-300 mt-1 max-w-xs leading-relaxed">
          {t.dailySecretHint}
        </p>

        {/* The Pair to Combine */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="w-20 h-24 rounded-2xl bg-slate-800 border-2 border-violet-500/50 flex flex-col items-center justify-center p-2 shadow-lg">
            <span className="text-4xl filter drop-shadow">
              {daily.inputObject1.icon}
            </span>
            <span className="text-[11px] font-bold text-amber-200 mt-1 truncate max-w-[65px]">
              {daily.inputObject1.name[language]}
            </span>
          </div>

          <span className="text-amber-400 text-2xl font-black">+</span>

          <div className="w-20 h-24 rounded-2xl bg-slate-800 border-2 border-violet-500/50 flex flex-col items-center justify-center p-2 shadow-lg">
            <span className="text-4xl filter drop-shadow">
              {daily.inputObject2.icon}
            </span>
            <span className="text-[11px] font-bold text-amber-200 mt-1 truncate max-w-[65px]">
              {daily.inputObject2.name[language]}
            </span>
          </div>
        </div>

        {/* Result status */}
        <div className="w-full bg-slate-800/80 border border-violet-800/40 rounded-2xl p-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">
              {isSolved ? daily.resultObject.icon : '❓'}
            </span>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-200">
                {isSolved
                  ? daily.resultObject.name[language]
                  : language === 'tr'
                  ? 'Gizemli Keşif'
                  : 'Mystery Creation'}
              </span>
              <p className="text-[10px] text-slate-400">
                {isSolved
                  ? language === 'tr'
                    ? 'Bugün keşfedildi!'
                    : 'Discovered today!'
                  : language === 'tr'
                  ? 'Henüz bulunmadı'
                  : 'Not discovered yet'}
              </p>
            </div>
          </div>

          {isSolved ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          ) : (
            <HelpCircle className="w-6 h-6 text-amber-400" />
          )}
        </div>

        {/* Action Button: Auto-place into box if child has both items */}
        {input1Known && input2Known && !isSolved && (
          <button
            onClick={() => {
              onSelectForBox(daily.inputObject1, daily.inputObject2);
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'tr' ? 'Kutuya Koy ve Birleştir!' : 'Put in Box & Combine!'}</span>
          </button>
        )}
      </motion.div>
    </div>
  );
};
