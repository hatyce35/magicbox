import React, { useState, useRef } from 'react';
import { GameObject, ObjectCategory, Language } from '../../types/game';
import { DraggableObject } from '../DraggableObject/DraggableObject';
import { translations } from '../../data/localization';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  discoveredObjects: GameObject[];
  onDropInBox: (object: GameObject) => void;
  getBoxRect: () => DOMRect | null;
  onDragStateChange?: (isDragging: boolean, isNearBox: boolean) => void;
  language: Language;
  hasSeenOnboarding: boolean;
}

export const ObjectTray: React.FC<Props> = ({
  discoveredObjects,
  onDropInBox,
  getBoxRect,
  onDragStateChange,
  language,
  hasSeenOnboarding,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ObjectCategory | 'all'>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const categories: Array<{ id: ObjectCategory | 'all'; label: string; icon: string }> = [
    { id: 'all', label: t.allCategories, icon: '🌟' },
    { id: 'nature', label: t.nature, icon: '🌱' },
    { id: 'elements', label: t.elements, icon: '💧' },
    { id: 'animals', label: t.animals, icon: '🐝' },
    { id: 'magic', label: t.magic, icon: '✨' },
    { id: 'space', label: t.space, icon: '🪐' },
    { id: 'items', label: t.items, icon: '🥞' },
  ];

  const filteredObjects =
    selectedCategory === 'all'
      ? discoveredObjects
      : discoveredObjects.filter(obj => obj.category === selectedCategory);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div
      id="object-tray-container"
      className="w-full bg-slate-950/80 backdrop-blur-md border-t border-violet-800/40 px-3 py-2.5 flex flex-col gap-2 z-20"
    >
      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {categories.map(cat => {
          const count =
            cat.id === 'all'
              ? discoveredObjects.length
              : discoveredObjects.filter(o => o.category === cat.id).length;

          // Don't show category if 0 items discovered in it yet (unless 'all')
          if (cat.id !== 'all' && count === 0) return null;

          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all select-none active:scale-95 ${
                isSelected
                  ? 'bg-violet-500 text-white shadow-md shadow-violet-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/90'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-violet-700 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div className="relative flex items-center">
        {/* Left scroll chevron */}
        <button
          onClick={() => handleScroll('left')}
          className="hidden sm:flex absolute -left-2 z-10 w-7 h-7 rounded-full bg-violet-900/90 hover:bg-violet-700 text-white items-center justify-center shadow-lg border border-violet-500/50"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable list */}
        <div
          ref={scrollContainerRef}
          id="tray-scroll-area"
          className="flex gap-2.5 overflow-x-auto py-1 px-1 w-full scroll-smooth scrollbar-none no-scrollbar"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {filteredObjects.map((obj, index) => (
            <DraggableObject
              key={obj.id}
              object={obj}
              onDropInBox={onDropInBox}
              getBoxRect={getBoxRect}
              onDragStateChange={onDragStateChange}
              language={language}
              isFirstItemOnboarding={!hasSeenOnboarding && index === 0}
            />
          ))}
        </div>

        {/* Right scroll chevron */}
        <button
          onClick={() => handleScroll('right')}
          className="hidden sm:flex absolute -right-2 z-10 w-7 h-7 rounded-full bg-violet-900/90 hover:bg-violet-700 text-white items-center justify-center shadow-lg border border-violet-500/50"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
