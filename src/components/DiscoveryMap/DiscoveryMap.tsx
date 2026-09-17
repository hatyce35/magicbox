import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GAME_OBJECTS } from '../../data/objects';
import { Language } from '../../types/game';
import { translations } from '../../data/localization';
import { X, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface ChainStep {
  fromIds: string[];
  toId: string;
}

interface DiscoveryChain {
  id: string;
  title: { en: string; tr: string };
  icon: string;
  themeColor: string;
  steps: ChainStep[];
}

const DISCOVERY_CHAINS: DiscoveryChain[] = [
  {
    id: 'nature_chain',
    title: { en: 'Forest & Honey Path', tr: 'Orman ve Bal Yolu' },
    icon: '🌱',
    themeColor: '#22c55e',
    steps: [
      { fromIds: ['seed', 'water'], toId: 'plant' },
      { fromIds: ['plant', 'sun'], toId: 'flower' },
      { fromIds: ['flower', 'sun'], toId: 'bee' },
      { fromIds: ['bee', 'flower'], toId: 'honey' },
      { fromIds: ['honey', 'bread'], toId: 'sweet_snack' },
    ],
  },
  {
    id: 'weather_chain',
    title: { en: 'Weather & Skies Path', tr: 'Hava ve Gökyüzü Yolu' },
    icon: '🌧️',
    themeColor: '#38bdf8',
    steps: [
      { fromIds: ['fire', 'water'], toId: 'steam' },
      { fromIds: ['steam', 'water'], toId: 'cloud' },
      { fromIds: ['cloud', 'water'], toId: 'rain' },
      { fromIds: ['rain', 'sun'], toId: 'rainbow' },
      { fromIds: ['rainbow', 'cloud'], toId: 'rainbow_cloud' },
    ],
  },
  {
    id: 'elemental_chain',
    title: { en: 'Earth & Wonders Path', tr: 'Toprak ve Harikalar Yolu' },
    icon: '🌋',
    themeColor: '#f97316',
    steps: [
      { fromIds: ['stone', 'fire'], toId: 'lava' },
      { fromIds: ['water', 'stone'], toId: 'river' },
      { fromIds: ['river', 'water'], toId: 'fish' },
      { fromIds: ['fish', 'water'], toId: 'aquarium' },
      { fromIds: ['lava', 'stone'], toId: 'gem' },
    ],
  },
  {
    id: 'space_chain',
    title: { en: 'Cosmic Constellation Path', tr: 'Kozmik Takımyıldız Yolu' },
    icon: '⭐',
    themeColor: '#a855f7',
    steps: [
      { fromIds: ['sun', 'fire'], toId: 'star' },
      { fromIds: ['star', 'stone'], toId: 'moon' },
      { fromIds: ['moon', 'star'], toId: 'night_sky' },
      { fromIds: ['star', 'magic_dust'], toId: 'shooting_star' },
      { fromIds: ['night_sky', 'stone'], toId: 'planet' },
    ],
  },
  {
    id: 'magic_chain',
    title: { en: 'Enchanted Spells Path', tr: 'Büyülü İksirler Yolu' },
    icon: '🪄',
    themeColor: '#ec4899',
    steps: [
      { fromIds: ['star', 'flower'], toId: 'magic_dust' },
      { fromIds: ['tree', 'magic_dust'], toId: 'wand' },
      { fromIds: ['wand', 'stone'], toId: 'crystal' },
      { fromIds: ['flower', 'magic_dust'], toId: 'fairy' },
      { fromIds: ['water', 'magic_dust'], toId: 'potion' },
    ],
  },
];

interface Props {
  discoveredIds: string[];
  language: Language;
  onClose: () => void;
}

export const DiscoveryMap: React.FC<Props> = ({ discoveredIds, language, onClose }) => {
  const [selectedChainId, setSelectedChainId] = useState<string>(DISCOVERY_CHAINS[0].id);
  const t = translations[language];

  const currentChain =
    DISCOVERY_CHAINS.find(c => c.id === selectedChainId) || DISCOVERY_CHAINS[0];

  const getObject = (id: string) => GAME_OBJECTS.find(o => o.id === id);

  return (
    <div
      id="modal-discovery-map"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md select-none"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-violet-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col overflow-hidden text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-violet-800/40">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-violet-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-violet-200">
                {t.map}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'tr'
                  ? 'Keşfettiğin nesnelerin arasındaki gizli bağlar'
                  : 'Follow the secret recipe paths to new creations'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-map"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chain Path Selectors */}
        <div className="flex gap-2 overflow-x-auto py-2.5 scrollbar-none no-scrollbar">
          {DISCOVERY_CHAINS.map(chain => {
            const isSelected = chain.id === currentChain.id;
            return (
              <button
                key={chain.id}
                onClick={() => setSelectedChainId(chain.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all select-none active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg border border-violet-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/90'
                }`}
              >
                <span className="text-base">{chain.icon}</span>
                <span>{chain.title[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Visual Map Flow Diagram */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 flex flex-col gap-4">
          {currentChain.steps.map((step, index) => {
            const in1 = getObject(step.fromIds[0]);
            const in2 = getObject(step.fromIds[1]);
            const out = getObject(step.toId);

            if (!in1 || !in2 || !out) return null;

            const isDiscovered = discoveredIds.includes(out.id);
            const in1Known = discoveredIds.includes(in1.id);
            const in2Known = discoveredIds.includes(in2.id);

            return (
              <motion.div
                key={step.toId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-slate-800/60 border border-violet-800/30 rounded-2xl p-3 flex items-center justify-between gap-2 sm:gap-4 shadow-sm"
              >
                {/* Left Side: 2 Inputs */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Input 1 */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex flex-col items-center justify-center p-1 border ${
                        in1Known
                          ? 'bg-slate-800 border-violet-500/40 text-slate-100'
                          : 'bg-slate-900 border-slate-700 opacity-60 text-slate-500'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl">
                        {in1Known ? in1.icon : '❓'}
                      </span>
                      <span className="text-[9px] sm:text-[10px] truncate max-w-[50px] font-semibold mt-0.5">
                        {in1Known ? in1.name[language] : '???'}
                      </span>
                    </div>
                  </div>

                  <span className="text-amber-300 font-bold text-sm">+</span>

                  {/* Input 2 */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex flex-col items-center justify-center p-1 border ${
                        in2Known
                          ? 'bg-slate-800 border-violet-500/40 text-slate-100'
                          : 'bg-slate-900 border-slate-700 opacity-60 text-slate-500'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl">
                        {in2Known ? in2.icon : '❓'}
                      </span>
                      <span className="text-[9px] sm:text-[10px] truncate max-w-[50px] font-semibold mt-0.5">
                        {in2Known ? in2.name[language] : '???'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center text-violet-400">
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </div>

                {/* Right Side: Result Item */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-18 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center p-1.5 border-2 transition-all ${
                      isDiscovered
                        ? 'bg-violet-900/40 border-amber-400 text-white shadow-md'
                        : 'bg-slate-900 border-slate-700 text-slate-500 opacity-70'
                    }`}
                    style={{
                      boxShadow: isDiscovered ? `0 0 15px ${out.color}44` : 'none',
                    }}
                  >
                    {isDiscovered ? (
                      <>
                        <span className="text-3xl sm:text-4xl filter drop-shadow">
                          {out.icon}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-amber-200 truncate max-w-[65px] mt-0.5">
                          {out.name[language]}
                        </span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-7 h-7 text-slate-600 mb-0.5" />
                        <span className="text-[9px] font-bold text-slate-500">
                          {t.locked}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
