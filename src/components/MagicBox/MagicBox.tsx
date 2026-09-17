import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameObject } from '../../types/game';

export type BoxState = 'idle' | 'hasOne' | 'hasTwo' | 'combining' | 'revealing' | 'noMatch';

interface Props {
  state: BoxState;
  slot1: GameObject | null;
  slot2: GameObject | null;
  onRemoveSlot: (slot: 1 | 2) => void;
  isDropTargetActive: boolean;
  boxRef: React.RefObject<HTMLDivElement | null>;
}

export const MagicBox: React.FC<Props> = ({
  state,
  slot1,
  slot2,
  onRemoveSlot,
  isDropTargetActive,
  boxRef,
}) => {
  // Determine animation parameters for the box container
  const getBoxAnimation = () => {
    switch (state) {
      case 'combining':
        return {
          rotate: [-4, 5, -5, 4, -3, 3, -1, 1, 0],
          scale: [1, 1.08, 0.96, 1.1, 0.98, 1.05, 1],
          y: [0, -12, 4, -14, 2, -8, 0],
        };
      case 'hasTwo':
        return {
          scale: [1, 1.04, 0.98, 1.02, 1],
          y: [0, -6, 0, -4, 0],
          rotate: [-2, 2, -2, 2, 0],
        };
      case 'hasOne':
        return {
          scale: [1, 1.03, 1],
          y: [0, -4, 0],
        };
      case 'noMatch':
        return {
          x: [-6, 6, -5, 5, -2, 2, 0],
          rotate: [-3, 3, -2, 2, 0],
        };
      case 'revealing':
        return {
          scale: [1, 1.15, 1.05],
          y: [0, -10, 0],
        };
      case 'idle':
      default:
        return {
          y: [0, -5, 0],
          scale: isDropTargetActive ? 1.08 : [1, 1.015, 1],
        };
    }
  };

  const getTransition = () => {
    if (state === 'combining') {
      return { duration: 1.2, repeat: Infinity, ease: 'easeInOut' };
    }
    if (state === 'hasTwo') {
      return { duration: 0.8, repeat: Infinity, ease: 'easeInOut' };
    }
    if (state === 'noMatch') {
      return { duration: 0.6, ease: 'easeOut' };
    }
    if (state === 'revealing') {
      return { duration: 0.7, ease: 'backOut' };
    }
    return { duration: 2.8, repeat: Infinity, ease: 'easeInOut' };
  };

  return (
    <div
      ref={boxRef}
      id="magic-box-container"
      className="relative flex flex-col items-center justify-center select-none"
    >
      {/* Surrounding Magic Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none -m-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full relative"
        >
          <span className="absolute top-2 left-6 text-yellow-300 text-lg opacity-75 animate-ping">✨</span>
          <span className="absolute bottom-4 left-10 text-pink-300 text-sm opacity-60">⭐</span>
          <span className="absolute top-6 right-8 text-cyan-300 text-base opacity-75">✨</span>
          <span className="absolute bottom-6 right-6 text-amber-300 text-sm opacity-80">💫</span>
          <span className="absolute top-1/2 -left-3 text-purple-300 text-xs opacity-70">✦</span>
          <span className="absolute top-1/2 -right-3 text-emerald-300 text-xs opacity-70">✦</span>
        </motion.div>
      </div>

      {/* Magical Aura Glow behind the box */}
      <motion.div
        animate={{
          scale: isDropTargetActive ? 1.3 : state === 'combining' ? [1.2, 1.45, 1.2] : state === 'hasTwo' ? 1.22 : 1,
          opacity: isDropTargetActive ? 0.85 : state === 'combining' ? 0.95 : state === 'hasTwo' ? 0.75 : 0.45,
        }}
        transition={{ duration: 0.8, repeat: state === 'combining' ? Infinity : 0 }}
        className={`absolute w-56 h-56 rounded-full blur-2xl pointer-events-none transition-colors duration-500 ${
          isDropTargetActive
            ? 'bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500'
            : state === 'combining'
            ? 'bg-gradient-to-r from-yellow-300 via-fuchsia-500 to-cyan-400'
            : state === 'hasTwo'
            ? 'bg-purple-500/70'
            : 'bg-violet-600/40'
        }`}
      />

      {/* Main Animated Magic Box */}
      <motion.div
        id="magic-box-graphic"
        animate={getBoxAnimation()}
        transition={getTransition()}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Animated Box Lid */}
        <motion.div
          animate={
            state === 'revealing' || isDropTargetActive
              ? { y: -24, rotateX: 35, scale: 1.05 }
              : state === 'hasTwo'
              ? { y: [-2, -8, -2], rotateX: [0, 15, 0] }
              : state === 'hasOne'
              ? { y: -4 }
              : { y: 0, rotateX: 0 }
          }
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative z-20"
        >
          <svg width="220" height="60" viewBox="0 0 240 70" className="drop-shadow-lg">
            <defs>
              <linearGradient id="lidFill" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#f43f5e" />
                <stop offset="50%" stop-color="#ec4899" />
                <stop offset="100%" stop-color="#a855f7" />
              </linearGradient>
              <linearGradient id="lidTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#fef08a" />
                <stop offset="50%" stop-color="#facc15" />
                <stop offset="100%" stop-color="#eab308" />
              </linearGradient>
            </defs>
            {/* Lid Crown Cap */}
            <path
              d="M20 55 C20 28, 45 10, 120 10 C195 10, 220 28, 220 55 C220 62, 210 65, 120 65 C30 65, 20 62, 20 55 Z"
              fill="url(#lidFill)"
              stroke="#fb7185"
              strokeWidth="4"
            />
            {/* Golden Ribbon Trim */}
            <path
              d="M25 54 C50 58, 190 58, 215 54"
              fill="none"
              stroke="url(#lidTrim)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Sparkling Top Gem */}
            <ellipse cx="120" cy="18" rx="14" ry="10" fill="url(#lidTrim)" stroke="#ffffff" strokeWidth="2.5" />
            <ellipse cx="120" cy="18" rx="6" ry="4" fill="#f43f5e" />
          </svg>
        </motion.div>

        {/* Box Body */}
        <div className="relative -mt-2">
          <svg width="200" height="150" viewBox="0 0 220 170" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="boxBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#7e22ce" />
                <stop offset="50%" stop-color="#6b21a8" />
                <stop offset="100%" stop-color="#4c1d95" />
              </linearGradient>
              <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fef08a" />
                <stop offset="50%" stop-color="#facc15" />
                <stop offset="100%" stop-color="#ca8a04" />
              </linearGradient>
            </defs>

            {/* Chest Outer Shell */}
            <rect
              x="15"
              y="10"
              width="190"
              height="145"
              rx="28"
              fill="url(#boxBodyGrad)"
              stroke="#a855f7"
              strokeWidth="4"
            />

            {/* Inner Inset Panel */}
            <rect
              x="26"
              y="22"
              width="168"
              height="122"
              rx="18"
              fill="#581c87"
              opacity="0.85"
            />

            {/* Left & Right Gold Corner Brackets */}
            <path d="M15 45 L40 45 L40 10" fill="none" stroke="url(#goldEdge)" strokeWidth="6" strokeLinecap="round" />
            <path d="M205 45 L180 45 L180 10" fill="none" stroke="url(#goldEdge)" strokeWidth="6" strokeLinecap="round" />
            <path d="M15 125 L40 125 L40 155" fill="none" stroke="url(#goldEdge)" strokeWidth="6" strokeLinecap="round" />
            <path d="M205 125 L180 125 L180 155" fill="none" stroke="url(#goldEdge)" strokeWidth="6" strokeLinecap="round" />

            {/* Cute Cartoon Eyes or Magical Emblem */}
            <g transform="translate(110, 80)">
              {/* Central Glowing Lock Medallion */}
              <circle cx="0" cy="0" r="32" fill="#3b0764" stroke="url(#goldEdge)" strokeWidth="5" />
              {/* Star Keyhole Emblem */}
              <path
                d="M0 -18 L5 -6 L18 -4 L9 5 L12 18 L0 10 L-12 18 L-9 5 L-18 -4 L-5 -6 Z"
                fill="url(#goldEdge)"
              />
              <circle cx="0" cy="2" r="4" fill="#4c1d95" />
            </g>
          </svg>

          {/* Slots / Inserted Items floating on the chest */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 pointer-events-auto">
            {/* Slot 1 item badge */}
            <AnimatePresence>
              {slot1 && (
                <motion.div
                  key={`slot1-${slot1.id}`}
                  initial={{ scale: 0, y: -20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => onRemoveSlot(1)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer group flex flex-col items-center bg-slate-900/85 backdrop-blur-xs p-2 rounded-2xl border-2 border-amber-400 shadow-xl"
                  title="Tap to remove"
                >
                  <span className="text-3xl filter drop-shadow-md">{slot1.icon}</span>
                  <span className="text-[10px] text-amber-200 font-bold max-w-[60px] truncate">
                    {slot1.name.en}
                  </span>
                  <span className="text-[9px] text-slate-400 opacity-0 group-hover:opacity-100">✕</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Plus sign between slots if both present */}
            {slot1 && slot2 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-amber-300 font-black text-xl drop-shadow"
              >
                +
              </motion.span>
            )}

            {/* Slot 2 item badge */}
            <AnimatePresence>
              {slot2 && (
                <motion.div
                  key={`slot2-${slot2.id}`}
                  initial={{ scale: 0, y: -20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => onRemoveSlot(2)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer group flex flex-col items-center bg-slate-900/85 backdrop-blur-xs p-2 rounded-2xl border-2 border-amber-400 shadow-xl"
                  title="Tap to remove"
                >
                  <span className="text-3xl filter drop-shadow-md">{slot2.icon}</span>
                  <span className="text-[10px] text-amber-200 font-bold max-w-[60px] truncate">
                    {slot2.name.en}
                  </span>
                  <span className="text-[9px] text-slate-400 opacity-0 group-hover:opacity-100">✕</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Encouraging helper pill when empty / holding 1 item */}
      <div className="mt-3 min-h-[28px] flex items-center justify-center">
        {state === 'idle' && !slot1 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-700/50 text-violet-200 text-xs font-semibold shadow-inner"
          >
            <span>✨ Drag 2 items here ✨</span>
          </motion.div>
        )}

        {state === 'hasOne' && slot1 && !slot2 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/60 text-amber-300 text-xs font-semibold"
          >
            <span>Add one more item! 🌟</span>
          </motion.div>
        )}

        {state === 'combining' && (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-fuchsia-900/80 border border-pink-400 text-pink-200 text-xs font-bold shadow-lg"
          >
            <span className="animate-spin text-sm">✨</span>
            <span>Mixing magic...</span>
          </motion.div>
        )}

        {state === 'noMatch' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-900/90 border border-indigo-400 text-indigo-100 text-xs font-medium shadow-md"
          >
            <span>✨ Hmm... Let's try something else!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
