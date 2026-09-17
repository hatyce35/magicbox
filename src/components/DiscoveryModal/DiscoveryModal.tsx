import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { GameObject, Language } from '../../types/game';
import { translations } from '../../data/localization';
import { Sparkles, Star } from 'lucide-react';

interface Props {
  discoveredObject: GameObject | null;
  funFact?: { en: string; tr: string };
  isNewDiscovery: boolean;
  language: Language;
  onClose: () => void;
}

export const DiscoveryModal: React.FC<Props> = ({
  discoveredObject,
  funFact,
  isNewDiscovery,
  language,
  onClose,
}) => {
  const [phase, setPhase] = useState<number>(1);
  const t = translations[language];

  useEffect(() => {
    if (!discoveredObject) {
      setPhase(1);
      return;
    }

    // Trigger confetti celebration for new discoveries
    if (isNewDiscovery) {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#facc15', '#ec4899', '#38bdf8', '#4ade80', '#a855f7'],
      });
    }

    // Sequence the phases
    const t1 = setTimeout(() => setPhase(2), 500);
    const t2 = setTimeout(() => setPhase(3), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [discoveredObject, isNewDiscovery]);

  if (!discoveredObject) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="discovery-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm select-none cursor-pointer"
      >
        {/* Shimmering Aura Rays */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 blur-3xl pointer-events-none"
        />

        {/* Modal Card Content */}
        <motion.div
          initial={{ scale: 0.3, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 220 }}
          onClick={e => e.stopPropagation()}
          className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-amber-400/80 p-6 shadow-2xl flex flex-col items-center text-center overflow-hidden"
          style={{
            boxShadow: `0 0 40px ${discoveredObject.color}66`,
          }}
        >
          {/* Top Sparkling Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider mb-4 shadow-lg ${
              isNewDiscovery
                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950'
                : 'bg-indigo-700/80 text-indigo-100'
            }`}
          >
            {isNewDiscovery ? (
              <>
                <Star className="w-3.5 h-3.5 fill-amber-950" />
                <span>{t.newDiscovery}</span>
                <Star className="w-3.5 h-3.5 fill-amber-950" />
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span>{t.alreadyDiscovered}</span>
              </>
            )}
          </motion.div>

          {/* Large Animated Object Icon with Glow Ring */}
          <div className="relative my-2 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.25, 1.1, 1.2, 1],
                rotate: [0, -10, 10, -5, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              className="relative z-10 text-7xl sm:text-8xl filter drop-shadow-2xl"
            >
              {discoveredObject.icon}
            </motion.div>

            {/* Pulsing Starry Halo behind the icon */}
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-32 h-32 rounded-full blur-xl pointer-events-none"
              style={{ backgroundColor: discoveredObject.color }}
            />
          </div>

          {/* Discovered Object Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl font-extrabold text-white mt-3 font-fredoka tracking-wide"
          >
            {discoveredObject.name[language]}
          </motion.h2>

          {/* Category Tag */}
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1.5 text-slate-200 border border-white/20"
            style={{ backgroundColor: `${discoveredObject.color}44` }}
          >
            {t[discoveredObject.category]}
          </span>

          {/* Fun fact or description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-slate-300 mt-3 px-2 line-clamp-3 leading-relaxed"
          >
            {funFact ? funFact[language] : discoveredObject.description[language]}
          </motion.p>

          {/* Reward notice */}
          {isNewDiscovery && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="mt-4 flex items-center gap-2 bg-amber-400/20 border border-amber-400/50 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold"
            >
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>+1 Discovery Star!</span>
            </motion.div>
          )}

          {/* Collect / Continue Button */}
          <motion.button
            id="btn-collect-discovery"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.tapToContinue}</span>
            <Sparkles className="w-4 h-4 text-amber-950" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
