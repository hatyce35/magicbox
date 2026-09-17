import { World } from '../types/game';

export const GAME_WORLDS: World[] = [
  {
    id: 'world_nature',
    name: { en: 'Little Nature', tr: 'Minik Doğa' },
    icon: '🌱',
    themeColor: '#22c55e',
    bgGradient: 'from-emerald-900 via-teal-950 to-indigo-950',
    requiredDiscoveries: 0,
    description: {
      en: 'A green meadow filled with flowers, sunny breezes, and friendly creatures.',
      tr: 'Çiçekler, ılık rüzgarlar ve sevimli hayvanlarla dolu yemyeşil bir çayır.',
    },
    unlocked: true,
  },
  {
    id: 'world_ocean',
    name: { en: 'Ocean Deep', tr: 'Derin Okyanus' },
    icon: '🌊',
    themeColor: '#0ea5e9',
    bgGradient: 'from-blue-900 via-cyan-950 to-indigo-950',
    requiredDiscoveries: 10,
    description: {
      en: 'Dive into crystal waters with coral reefs, playful fish, and sunken treasures.',
      tr: 'Mercan resifleri ve neşeli balıklarla dolu masmavi sulara dal.',
    },
    unlocked: false,
  },
  {
    id: 'world_dino',
    name: { en: 'Dino Valley', tr: 'Dino Vadisi' },
    icon: '🦖',
    themeColor: '#f97316',
    bgGradient: 'from-amber-950 via-orange-950 to-stone-950',
    requiredDiscoveries: 18,
    description: {
      en: 'Ancient towering fern forests where friendly dinosaurs stomp and play!',
      tr: 'Tarih öncesi dev eğrelti otları ve neşeli dinozorların vadisi!',
    },
    unlocked: false,
  },
  {
    id: 'world_cosmic',
    name: { en: 'Cosmic Galaxy', tr: 'Kozmik Uzay' },
    icon: '🚀',
    themeColor: '#a855f7',
    bgGradient: 'from-purple-950 via-indigo-950 to-slate-950',
    requiredDiscoveries: 26,
    description: {
      en: 'Float among glowing nebulas, sparkling constellations, and spinning planets.',
      tr: 'Parlayan nebulalar, ışıltılı takımyıldızlar ve dönen gezegenler arasında süzül.',
    },
    unlocked: false,
  },
  {
    id: 'world_magic',
    name: { en: 'Enchanted Realm', tr: 'Büyülü Diyar' },
    icon: '🪄',
    themeColor: '#ec4899',
    bgGradient: 'from-fuchsia-950 via-pink-950 to-purple-950',
    requiredDiscoveries: 34,
    description: {
      en: 'A whimsical fairytale kingdom where magic wands, crystals, and fairies live.',
      tr: 'Sihirli değneklerin, parıldayan kristallerin ve perilerin masal krallığı.',
    },
    unlocked: false,
  },
];
