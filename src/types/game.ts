export type ObjectCategory = 'nature' | 'elements' | 'animals' | 'magic' | 'space' | 'items';

export interface GameObject {
  id: string;
  name: {
    en: string;
    tr: string;
  };
  icon: string;
  category: ObjectCategory;
  description: {
    en: string;
    tr: string;
  };
  color: string; // Accent color for glow/cards
  starter?: boolean; // Is it in the initial starter set?
  unlockedAtWorld?: string; // World ID
}

export interface Combination {
  inputs: [string, string]; // Exactly two objects combine in Magic Box
  result: string; // id of resulting object
  animation?: 'bounce' | 'grow' | 'sparkle' | 'spin' | 'float';
  funFact?: {
    en: string;
    tr: string;
  };
}

export interface World {
  id: string;
  name: {
    en: string;
    tr: string;
  };
  icon: string;
  themeColor: string;
  bgGradient: string;
  requiredDiscoveries: number;
  description: {
    en: string;
    tr: string;
  };
  unlocked: boolean;
}

export type CompanionMood = 'idle' | 'curious' | 'excited' | 'celebrating' | 'thinking' | 'sleeping';

export type Language = 'en' | 'tr';

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  language: Language;
  hapticsEnabled: boolean;
}

export interface GameStats {
  totalCombinationsTried: number;
  totalSuccesses: number;
  playSessions: number;
  firstPlayed: string;
  lastPlayed: string;
}

export interface GameState {
  discoveredIds: string[];
  activeWorldId: string;
  stars: number;
  settings: GameSettings;
  stats: GameStats;
  history: Array<{ input1: string; input2: string; result?: string; timestamp: number }>;
  hasSeenOnboarding: boolean;
}
