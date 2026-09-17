import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { GameObject } from '../../types/game';
import { audioService } from '../../services/audioService';

interface Props {
  object: GameObject;
  onDropInBox: (object: GameObject) => void;
  getBoxRect: () => DOMRect | null;
  onDragStateChange?: (isDragging: boolean, isNearBox: boolean) => void;
  language: 'en' | 'tr';
  isFirstItemOnboarding?: boolean;
}

export const DraggableObject: React.FC<Props> = ({
  object,
  onDropInBox,
  getBoxRect,
  onDragStateChange,
  language,
  isFirstItemOnboarding,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isNearBox, setIsNearBox] = useState(false);
  const startPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const didMove = useRef(false);

  const checkNearBox = (clientX: number, clientY: number): boolean => {
    const boxRect = getBoxRect();
    if (!boxRect) return false;
    const pad = 40; // generous snap area
    return (
      clientX >= boxRect.left - pad &&
      clientX <= boxRect.right + pad &&
      clientY >= boxRect.top - pad &&
      clientY <= boxRect.bottom + pad
    );
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button/finger
    if (e.button !== 0) return;
    e.preventDefault();
    didMove.current = false;
    startPointerPos.current = { x: e.clientX, y: e.clientY };
    setDragPos({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    audioService.playPickup();

    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }

    if (onDragStateChange) {
      onDragStateChange(true, false);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = Math.abs(e.clientX - startPointerPos.current.x);
    const dy = Math.abs(e.clientY - startPointerPos.current.y);
    if (dx > 4 || dy > 4) {
      didMove.current = true;
    }

    setDragPos({ x: e.clientX, y: e.clientY });
    const near = checkNearBox(e.clientX, e.clientY);
    setIsNearBox(near);

    if (onDragStateChange) {
      onDragStateChange(true, near);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }

    const near = checkNearBox(e.clientX, e.clientY);

    // If dropped inside/near box OR if it was just a quick tap/click
    if (near || !didMove.current) {
      onDropInBox(object);
    }

    setIsNearBox(false);
    if (onDragStateChange) {
      onDragStateChange(false, false);
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setIsNearBox(false);
    if (onDragStateChange) {
      onDragStateChange(false, false);
    }
  };

  return (
    <>
      {/* The base card in the tray */}
      <motion.div
        id={`tray-item-${object.id}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        whileHover={{ scale: 1.06, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none p-1.5 transition-all shadow-md ${
          isDragging ? 'opacity-30 scale-90' : 'opacity-100'
        } bg-slate-800/80 hover:bg-slate-700/90 border border-violet-500/30 hover:border-violet-400`}
        style={{
          boxShadow: `0 4px 14px ${object.color}33`,
          touchAction: 'none',
        }}
      >
        {/* Onboarding gentle glow & pointing hint */}
        {isFirstItemOnboarding && (
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-3 -right-2 bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-lg border border-amber-300"
          >
            TAP / DRAG
          </motion.div>
        )}

        {/* Large icon */}
        <span className="text-3xl sm:text-4xl filter drop-shadow select-none pointer-events-none mb-1">
          {object.icon}
        </span>

        {/* Object Name */}
        <span className="text-[11px] sm:text-xs font-semibold text-slate-200 text-center truncate max-w-[70px] select-none pointer-events-none">
          {object.name[language]}
        </span>

        {/* Category color dot */}
        <div
          className="w-1.5 h-1.5 rounded-full mt-1"
          style={{ backgroundColor: object.color }}
        />
      </motion.div>

      {/* Floating Drag Avatar directly following finger */}
      {isDragging && (
        <div
          className="fixed pointer-events-none z-50 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${dragPos.x}px`,
            top: `${dragPos.y}px`,
          }}
        >
          <motion.div
            animate={{
              scale: isNearBox ? 1.35 : 1.18,
              rotate: isNearBox ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.2 }}
            className={`w-20 h-24 rounded-2xl flex flex-col items-center justify-center p-2 shadow-2xl backdrop-blur-md ${
              isNearBox
                ? 'bg-amber-400/90 border-2 border-white'
                : 'bg-slate-900/90 border-2 border-violet-400'
            }`}
          >
            <span className="text-4xl filter drop-shadow-lg">{object.icon}</span>
            <span
              className={`text-[10px] font-bold mt-1 ${
                isNearBox ? 'text-amber-950' : 'text-amber-300'
              }`}
            >
              {object.name[language]}
            </span>
          </motion.div>
        </div>
      )}
    </>
  );
};
