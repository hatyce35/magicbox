import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, GameObject, GameSettings, CompanionMood } from '../types/game';
import { storageService, DEFAULT_GAME_STATE } from '../services/storageService';
import { findCombination } from '../data/combinations';
import { GAME_OBJECTS } from '../data/objects';
import { audioService } from '../services/audioService';
import { BoxState } from '../components/MagicBox/MagicBox';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const [slot1, setSlot1] = useState<GameObject | null>(null);
  const [slot2, setSlot2] = useState<GameObject | null>(null);
  const [boxState, setBoxState] = useState<BoxState>('idle');
  const [companionMood, setCompanionMood] = useState<CompanionMood>('idle');

  // Discovery celebration state
  const [celebrationObject, setCelebrationObject] = useState<GameObject | null>(null);
  const [celebrationFunFact, setCelebrationFunFact] = useState<{ en: string; tr: string } | undefined>();
  const [isNewDiscovery, setIsNewDiscovery] = useState(false);

  // Active modals
  const [showCollection, setShowCollection] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showWorlds, setShowWorlds] = useState(false);
  const [showParentArea, setShowParentArea] = useState(false);
  const [showDailySecret, setShowDailySecret] = useState(false);

  const combiningTimeoutRef = useRef<number | null>(null);

  // Load state on mount
  useEffect(() => {
    const loaded = storageService.loadState();
    setGameState(loaded);
    audioService.setSoundEnabled(loaded.settings.soundEnabled);
    audioService.setMusicEnabled(loaded.settings.musicEnabled);
  }, []);

  // Sync audio with settings changes
  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    setGameState(prev => {
      const updated = {
        ...prev,
        settings: {
          ...prev.settings,
          ...newSettings,
        },
      };
      if (newSettings.soundEnabled !== undefined) {
        audioService.setSoundEnabled(newSettings.soundEnabled);
      }
      if (newSettings.musicEnabled !== undefined) {
        audioService.setMusicEnabled(newSettings.musicEnabled);
      }
      storageService.saveState(updated);
      return updated;
    });
  }, []);

  // Update discovered world
  const setActiveWorld = useCallback((worldId: string) => {
    setGameState(prev => {
      const updated = { ...prev, activeWorldId: worldId };
      storageService.saveState(updated);
      return updated;
    });
  }, []);

  // Reset progress
  const resetProgress = useCallback(() => {
    const reset = storageService.resetState();
    setGameState(reset);
    setSlot1(null);
    setSlot2(null);
    setBoxState('idle');
    setCompanionMood('idle');
  }, []);

  // Dismiss discovery modal
  const closeDiscoveryModal = useCallback(() => {
    setCelebrationObject(null);
    setBoxState('idle');
    setCompanionMood('idle');
  }, []);

  // Clear slots manually
  const removeSlot = useCallback((slotNum: 1 | 2) => {
    if (boxState === 'combining') return;
    audioService.playTap();
    if (slotNum === 1) {
      setSlot1(slot2);
      setSlot2(null);
      setBoxState(slot2 ? 'hasOne' : 'idle');
    } else {
      setSlot2(null);
      setBoxState(slot1 ? 'hasOne' : 'idle');
    }
  }, [boxState, slot1, slot2]);

  // Insert object into Magic Box
  const insertObject = useCallback((obj: GameObject) => {
    if (boxState === 'combining' || boxState === 'revealing') return;

    // Mark onboarding complete on first drop
    setGameState(prev => {
      if (!prev.hasSeenOnboarding) {
        const updated = { ...prev, hasSeenOnboarding: true };
        storageService.saveState(updated);
        return updated;
      }
      return prev;
    });

    audioService.playDropInBox();

    if (!slot1) {
      setSlot1(obj);
      setBoxState('hasOne');
      setCompanionMood('curious');
      return;
    }

    if (!slot2) {
      setSlot2(obj);
      setBoxState('hasTwo');
      setCompanionMood('excited');

      // Now we have both items! Trigger combination evaluation
      const firstItem = slot1;
      const secondItem = obj;

      if (combiningTimeoutRef.current) clearTimeout(combiningTimeoutRef.current);

      // Brief anticipation pause, then box starts vibrating and combining
      combiningTimeoutRef.current = window.setTimeout(() => {
        setBoxState('combining');
        audioService.playBoxRumble();
        audioService.playSparkles();

        // 1.4 seconds of magical combination animation
        combiningTimeoutRef.current = window.setTimeout(() => {
          const combo = findCombination(firstItem.id, secondItem.id);

          if (combo) {
            // MATCH FOUND!
            const resultObject = GAME_OBJECTS.find(o => o.id === combo.result);
            if (resultObject) {
              setBoxState('revealing');
              setCompanionMood('celebrating');
              audioService.playDiscoveryFanfare();

              setGameState(prev => {
                const isNew = !prev.discoveredIds.includes(resultObject.id);
                setIsNewDiscovery(isNew);
                setCelebrationObject(resultObject);
                setCelebrationFunFact(combo.funFact);

                const newDiscovered = isNew
                  ? [...prev.discoveredIds, resultObject.id]
                  : prev.discoveredIds;

                const updated: GameState = {
                  ...prev,
                  discoveredIds: newDiscovered,
                  stars: isNew ? prev.stars + 1 : prev.stars,
                  stats: {
                    ...prev.stats,
                    totalCombinationsTried: prev.stats.totalCombinationsTried + 1,
                    totalSuccesses: prev.stats.totalSuccesses + (isNew ? 1 : 0),
                  },
                  history: [
                    {
                      input1: firstItem.id,
                      input2: secondItem.id,
                      result: resultObject.id,
                      timestamp: Date.now(),
                    },
                    ...prev.history.slice(0, 50),
                  ],
                };

                storageService.saveState(updated);
                return updated;
              });

              // Empty slots after successful reveal
              setSlot1(null);
              setSlot2(null);
              return;
            }
          }

          // NO MATCH FOUND - Gentle Encouraging Feedback
          setBoxState('noMatch');
          setCompanionMood('curious');
          audioService.playFriendlyBoing();

          setGameState(prev => {
            const updated: GameState = {
              ...prev,
              stats: {
                ...prev.stats,
                totalCombinationsTried: prev.stats.totalCombinationsTried + 1,
              },
            };
            storageService.saveState(updated);
            return updated;
          });

          // Softly return objects after gentle wiggle
          combiningTimeoutRef.current = window.setTimeout(() => {
            setSlot1(null);
            setSlot2(null);
            setBoxState('idle');
            setCompanionMood('idle');
          }, 1800);
        }, 1400);
      }, 500);
    }
  }, [boxState, slot1, slot2]);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (combiningTimeoutRef.current) clearTimeout(combiningTimeoutRef.current);
    };
  }, []);

  // Filter objects for the tray
  const discoveredObjects = GAME_OBJECTS.filter(o =>
    gameState.discoveredIds.includes(o.id)
  );

  return {
    gameState,
    slot1,
    slot2,
    boxState,
    companionMood,
    discoveredObjects,
    celebrationObject,
    celebrationFunFact,
    isNewDiscovery,
    showCollection,
    setShowCollection,
    showMap,
    setShowMap,
    showWorlds,
    setShowWorlds,
    showParentArea,
    setShowParentArea,
    showDailySecret,
    setShowDailySecret,
    insertObject,
    removeSlot,
    closeDiscoveryModal,
    updateSettings,
    setActiveWorld,
    resetProgress,
  };
}
