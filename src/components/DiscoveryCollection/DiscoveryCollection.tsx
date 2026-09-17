import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GAME_OBJECTS } from '../../data/objects';
import { GameObject, ObjectCategory, Language } from '../../types/game';
import { translations } from '../../data/localization';
import { X, Star, HelpCircle, Sparkles } from 'lucide-react';

interface Props {
  discoveredIds: string[];
  language: Language;
  onClose: () => void;
  onSelectObjectForBox?: (object: GameObject) => void;
}

export const DiscoveryCollection: React.FC<Props> = ({
  discoveredIds,
  language,
  onClose,
  onSelectObjectForBox,
}) => {
  const [activeCategory, setActiveCategory] = useState<ObjectCategory | 'all'>('all');
  const [selectedDetail, setSelectedDetail] = useState<GameObject | null>(null);
  const t = translations[language];

  const total = GAME_OBJECTS.length;
  const discoveredCount = discoveredIds.length;
  const percentage = Math.round((discoveredCount / total) * 100);

  const categories: Array<{ id: ObjectCategory | 'all'; label: string; icon: string }> = [
    { id: 'all', label: t.allCategories, icon: '🌟' },
    { id: 'nature', label: t.nature, icon: '🌱' },
    { id: 'elements', label: t.elements, icon: '💧' },
    { id: 'animals', label: t.animals, icon: '🐝' },
    { id: 'magic', label: t.magic, icon: '✨' },
    { id: 'space', label: t.space, icon: '🪐' },
    { id: 'items', label: t.items, icon: '🥞' },
  ];

  const displayedObjects =
    activeCategory === 'all'
      ? GAME_OBJECTS
      : GAME_OBJECTS.filter(o => o.category === activeCategory);

  return (
    <div
      id="modal-discovery-collection"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md select-none"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-violet-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col overflow-hidden text-white"
      >
        {/* Header with Title & Progress */}
        <div className="flex items-center justify-between pb-3 border-b border-violet-800/40">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-amber-200">
                {t.collection}
              </h2>
              <p className="text-xs text-slate-400">
                {discoveredCount} / {total} ⭐ ({percentage}%)
              </p>
            </div>
          </div>

          <button
            id="btn-close-collection"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 my-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500 rounded-full"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {categories.map(cat => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid of Objects (Discovered vs Undiscovered ?) */}
        <div className="flex-1 overflow-y-auto pr-1 py-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
          {displayedObjects.map(obj => {
            const isDiscovered = discoveredIds.includes(obj.id);

            return (
              <motion.div
                key={obj.id}
                whileHover={isDiscovered ? { scale: 1.05 } : {}}
                whileTap={isDiscovered ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (isDiscovered) {
                    setSelectedDetail(obj);
                  }
                }}
                className={`relative rounded-2xl p-2.5 flex flex-col items-center justify-center text-center transition-all ${
                  isDiscovered
                    ? 'bg-slate-800/90 border border-violet-500/40 cursor-pointer hover:border-amber-400'
                    : 'bg-slate-900/60 border border-slate-800 opacity-60'
                }`}
                style={{
                  boxShadow: isDiscovered ? `0 4px 12px ${obj.color}22` : 'none',
                }}
              >
                {isDiscovered ? (
                  <>
                    <span className="text-3xl filter drop-shadow mb-1">{obj.icon}</span>
                    <span className="text-xs font-bold text-slate-200 truncate w-full">
                      {obj.name[language]}
                    </span>
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1"
                      style={{ backgroundColor: obj.color }}
                    />
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-1">
                      <HelpCircle className="w-5 h-5 text-slate-500" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500">???</span>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Selected Item Detail Popover */}
        <AnimatePresence>
          {selectedDetail && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-3 p-3 bg-violet-950/90 border border-violet-600/50 rounded-2xl flex items-center justify-between gap-3 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedDetail.icon}</span>
                <div>
                  <h4 className="font-bold text-amber-300 text-sm">
                    {selectedDetail.name[language]}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 max-w-sm">
                    {selectedDetail.description[language]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {onSelectObjectForBox && (
                  <button
                    onClick={() => {
                      onSelectObjectForBox(selectedDetail);
                      setSelectedDetail(null);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black whitespace-nowrap shadow cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'tr' ? 'Kutuya Koy' : 'Put in Box'}</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedDetail(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
