import React from 'react';
import { motion } from 'motion/react';
import { CompanionMood } from '../../types/game';
import { audioService } from '../../services/audioService';

interface Props {
  mood: CompanionMood;
  onTap?: () => void;
}

export const Companion: React.FC<Props> = ({ mood, onTap }) => {
  const handleClick = () => {
    audioService.playCompanionChirp();
    if (onTap) onTap();
  };

  return (
    <motion.div
      id="companion-pip"
      onClick={handleClick}
      className="cursor-pointer relative select-none flex flex-col items-center"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      animate={
        mood === 'excited'
          ? { y: [0, -14, 0, -10, 0], rotate: [0, -8, 8, -6, 0] }
          : mood === 'celebrating'
          ? { y: [0, -20, 0, -15, 0], scale: [1, 1.2, 1, 1.15, 1], rotate: [0, 360] }
          : mood === 'curious'
          ? { rotate: [0, 12, 0, 12, 0], y: [0, -4, 0] }
          : mood === 'sleeping'
          ? { y: [0, 3, 0] }
          : { y: [0, -6, 0] }
      }
      transition={{
        duration: mood === 'excited' || mood === 'celebrating' ? 0.8 : 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {/* Speech / Reaction Bubble when mood changes */}
      {mood === 'excited' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: -6 }}
          className="absolute -top-7 bg-amber-300 text-amber-950 font-bold text-xs px-2.5 py-0.5 rounded-full shadow-lg border border-amber-400 whitespace-nowrap"
        >
          ✨ Ooh!
        </motion.div>
      )}

      {mood === 'celebrating' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: -8 }}
          className="absolute -top-7 bg-pink-400 text-white font-bold text-xs px-2.5 py-0.5 rounded-full shadow-lg border border-pink-300 whitespace-nowrap"
        >
          🎉 Yay!
        </motion.div>
      )}

      {mood === 'curious' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-7 bg-sky-300 text-sky-950 font-bold text-xs px-2 py-0.5 rounded-full shadow-lg border border-sky-400"
        >
          ❓ Hmm?
        </motion.div>
      )}

      {mood === 'sleeping' && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0.4, 1, 0], y: -15 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-6 text-indigo-300 font-bold text-xs"
        >
          Zzz...
        </motion.div>
      )}

      {/* SVG Cartoon Companion "Pip" - cute glowing star-sprite */}
      <svg width="68" height="68" viewBox="0 0 100 100" className="drop-shadow-lg filter">
        <defs>
          <radialGradient id="pipGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="60%" stop-color="#fde047" />
            <stop offset="100%" stop-color="#eab308" />
          </radialGradient>
          <radialGradient id="pipCheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#f43f5e" stop-opacity="0" />
          </radialGradient>
        </defs>

        {/* Soft magical aura */}
        <circle cx="50" cy="52" r="42" fill="#facc15" opacity="0.3" className="animate-pulse" />

        {/* Tiny playful wings */}
        <ellipse cx="20" cy="54" rx="14" ry="8" fill="#ffffff" opacity="0.8" transform="rotate(-25 20 54)" />
        <ellipse cx="80" cy="54" rx="14" ry="8" fill="#ffffff" opacity="0.8" transform="rotate(25 80 54)" />

        {/* Round golden body */}
        <ellipse cx="50" cy="54" rx="34" ry="32" fill="url(#pipGlow)" stroke="#f59e0b" stroke-width="3" />

        {/* Little Crown / Star antenna */}
        <path d="M42 22 L50 10 L58 22 L54 26 L46 26 Z" fill="#fbbf24" stroke="#d97706" stroke-width="2" />
        <circle cx="50" cy="10" r="4" fill="#f43f5e" />

        {/* Rosy blushing cheeks */}
        <circle cx="30" cy="62" r="7" fill="url(#pipCheek)" />
        <circle cx="70" cy="62" r="7" fill="url(#pipCheek)" />

        {/* Big expressive animated eyes */}
        {mood === 'sleeping' ? (
          <>
            <path d="M30 52 Q37 58 44 52" fill="none" stroke="#78350f" stroke-width="3.5" stroke-linecap="round" />
            <path d="M56 52 Q63 58 70 52" fill="none" stroke="#78350f" stroke-width="3.5" stroke-linecap="round" />
          </>
        ) : mood === 'celebrating' ? (
          <>
            {/* Happy squinting curved eyes */}
            <path d="M30 54 Q37 46 44 54" fill="none" stroke="#78350f" stroke-width="3.5" stroke-linecap="round" />
            <path d="M56 54 Q63 46 70 54" fill="none" stroke="#78350f" stroke-width="3.5" stroke-linecap="round" />
          </>
        ) : (
          <>
            {/* Wide shiny black eyes with white highlights */}
            <ellipse cx="37" cy="50" rx="5" ry="7" fill="#451a03" />
            <circle cx="35" cy="48" r="2.2" fill="#ffffff" />
            <circle cx="39" cy="53" r="1.2" fill="#ffffff" />

            <ellipse cx="63" cy="50" rx="5" ry="7" fill="#451a03" />
            <circle cx="61" cy="48" r="2.2" fill="#ffffff" />
            <circle cx="65" cy="53" r="1.2" fill="#ffffff" />
          </>
        )}

        {/* Cute smiling mouth */}
        {mood === 'excited' || mood === 'celebrating' ? (
          <path d="M42 63 Q50 73 58 63 Z" fill="#b91c1c" stroke="#78350f" stroke-width="1.5" />
        ) : (
          <path d="M44 63 Q50 69 56 63" fill="none" stroke="#78350f" stroke-width="2.5" stroke-linecap="round" />
        )}
      </svg>
    </motion.div>
  );
};
