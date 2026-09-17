import { GameState, Language } from '../types/game';
import { STARTER_OBJECT_IDS } from '../data/objects';

const STORAGE_KEY = 'magic_box_save_v1';

export const DEFAULT_GAME_STATE: GameState = {
  discoveredIds: [...STARTER_OBJECT_IDS],
  activeWorldId: 'world_nature',
  stars: 5, // Starts with 5 stars for the 5 starter discoveries!
  settings: {
    soundEnabled: true,
    musicEnabled: false,
    language: 'en',
    hapticsEnabled: true,
  },
  stats: {
    totalCombinationsTried: 0,
    totalSuccesses: 0,
    playSessions: 1,
    firstPlayed: new Date().toISOString(),
    lastPlayed: new Date().toISOString(),
  },
  history: [],
  hasSeenOnboarding: false,
};

export const storageService = {
  loadState(): GameState {
    try {
      if (typeof window === 'undefined') return DEFAULT_GAME_STATE;
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return DEFAULT_GAME_STATE;
      const parsed = JSON.parse(data) as Partial<GameState>;
      
      // Ensure all starter objects are present
      const discovered = Array.from(new Set([...STARTER_OBJECT_IDS, ...(parsed.discoveredIds || [])]));

      return {
        discoveredIds: discovered,
        activeWorldId: parsed.activeWorldId || DEFAULT_GAME_STATE.activeWorldId,
        stars: Math.max(discovered.length, parsed.stars || discovered.length),
        settings: {
          ...DEFAULT_GAME_STATE.settings,
          ...(parsed.settings || {}),
        },
        stats: {
          ...DEFAULT_GAME_STATE.stats,
          ...(parsed.stats || {}),
          playSessions: (parsed.stats?.playSessions || 0) + 1,
          lastPlayed: new Date().toISOString(),
        },
        history: parsed.history || [],
        hasSeenOnboarding: parsed.hasSeenOnboarding ?? false,
      };
    } catch (e) {
      console.warn('Could not load from localStorage, using defaults:', e);
      return DEFAULT_GAME_STATE;
    }
  },

  saveState(state: GameState): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  },

  resetState(): GameState {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Could not reset localStorage:', e);
    }
    return { ...DEFAULT_GAME_STATE, discoveredIds: [...STARTER_OBJECT_IDS] };
  },
};
