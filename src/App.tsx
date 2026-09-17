/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameState } from './hooks/useGameState';
import { MagicBox } from './components/MagicBox/MagicBox';
import { ObjectTray } from './components/ObjectTray/ObjectTray';
import { Companion } from './components/Companion/Companion';
import { DiscoveryModal } from './components/DiscoveryModal/DiscoveryModal';
import { DiscoveryCollection } from './components/DiscoveryCollection/DiscoveryCollection';
import { DiscoveryMap } from './components/DiscoveryMap/DiscoveryMap';
import { WorldSelector } from './components/WorldSelector/WorldSelector';
import { ParentArea } from './components/ParentArea/ParentArea';
import { DailySecretModal } from './components/DailySecretModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { translations } from './data/localization';
import { GAME_OBJECTS } from './data/objects';
import { audioService } from './services/audioService';
import {
  Sparkles,
  BookOpen,
  Map as MapIcon,
  Globe2,
  Shield,
  Volume2,
  VolumeX,
  Star,
  Gift,
} from 'lucide-react';

export default function App() {
  const {
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
  } = useGameState();

  const [isDropTargetActive, setIsDropTargetActive] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const t = translations[gameState.settings.language];
  const totalObjects = GAME_OBJECTS.length;
  const discoveredCount = gameState.discoveredIds.length;

  const getBoxRect = () => {
    if (!boxRef.current) return null;
    return boxRef.current.getBoundingClientRect();
  };

  const handleDragStateChange = (isDragging: boolean, isNearBox: boolean) => {
    setIsDropTargetActive(isDragging && isNearBox);
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !gameState.settings.soundEnabled });
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white select-none">
      {/* Background Animated Starlight Field */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-10 left-12 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        <div className="absolute top-28 right-16 w-2 h-2 bg-yellow-200 rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-cyan-300 rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse" />
        <div className="absolute bottom-40 left-10 w-2 h-2 bg-purple-300 rounded-full animate-ping" />
        <div className="absolute bottom-1/3 right-12 w-1 h-1 bg-amber-200 rounded-full" />
      </div>

      {/* TOP HEADER BAR */}
      <header className="relative z-30 w-full px-3 py-2 sm:px-6 sm:py-3 flex items-center justify-between bg-slate-950/60 backdrop-blur-md border-b border-violet-900/40">
        {/* Left: Brand & Progress Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl">✨</span>
            <span className="font-fredoka font-black text-base sm:text-lg tracking-wider bg-gradient-to-r from-amber-300 via-pink-400 to-violet-300 bg-clip-text text-transparent">
              MAGIC BOX
            </span>
          </div>

          {/* Discovery Counter Badge */}
          <button
            id="btn-open-collection-badge"
            onClick={() => {
              audioService.playTap();
              setShowCollection(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold transition-all hover:bg-amber-400/25 active:scale-95 cursor-pointer"
          >
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>{discoveredCount}/{totalObjects}</span>
          </button>
        </div>

        {/* Right Navigation & Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* PWA Install Button if available */}
          <PWAInstallButton language={gameState.settings.language} />

          {/* Daily Discovery Secret Button */}
          <button
            id="btn-daily-secret"
            onClick={() => {
              audioService.playTap();
              setShowDailySecret(true);
            }}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-indigo-900/80 text-amber-300 border border-amber-400/30 transition-all active:scale-95 cursor-pointer shadow"
            title={t.dailyDiscovery}
            aria-label={t.dailyDiscovery}
          >
            <Gift className="w-4 h-4" />
          </button>

          {/* Discoveries / Collection */}
          <button
            id="btn-nav-collection"
            onClick={() => {
              audioService.playTap();
              setShowCollection(true);
            }}
            className="hidden xs:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-violet-500/30 transition-all active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-violet-300" />
            <span className="hidden sm:inline">{t.collection}</span>
          </button>

          {/* Discovery Map */}
          <button
            id="btn-nav-map"
            onClick={() => {
              audioService.playTap();
              setShowMap(true);
            }}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-violet-500/30 transition-all active:scale-95 cursor-pointer"
            title={t.map}
            aria-label={t.map}
          >
            <MapIcon className="w-4 h-4 text-sky-300" />
          </button>

          {/* Worlds */}
          <button
            id="btn-nav-worlds"
            onClick={() => {
              audioService.playTap();
              setShowWorlds(true);
            }}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-violet-500/30 transition-all active:scale-95 cursor-pointer"
            title={t.worlds}
            aria-label={t.worlds}
          >
            <Globe2 className="w-4 h-4 text-emerald-300" />
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={toggleSound}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-violet-500/30 transition-all active:scale-95 cursor-pointer"
            title={gameState.settings.soundEnabled ? 'Mute' : 'Unmute'}
            aria-label="Toggle sound"
          >
            {gameState.settings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Parent / Settings Area */}
          <button
            id="btn-nav-parent-area"
            onClick={() => {
              audioService.playTap();
              setShowParentArea(true);
            }}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-violet-500/30 transition-all active:scale-95 cursor-pointer"
            title={t.settings}
            aria-label={t.settings}
          >
            <Shield className="w-4 h-4 text-indigo-300" />
          </button>
        </div>
      </header>

      {/* CENTER PLAY STAGE */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-2 overflow-hidden">
        {/* Play Stage Flex Layout */}
        <div className="relative w-full max-w-md flex flex-col items-center justify-center my-auto">
          {/* Friendly Companion Sitting Beside Box */}
          <div className="absolute -top-12 right-4 sm:right-8 z-20">
            <Companion mood={companionMood} />
          </div>

          {/* The Magic Box */}
          <MagicBox
            state={boxState}
            slot1={slot1}
            slot2={slot2}
            onRemoveSlot={removeSlot}
            isDropTargetActive={isDropTargetActive}
            boxRef={boxRef}
          />

          {/* Gentle First-Time Onboarding Hint */}
          {!gameState.hasSeenOnboarding && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/60 text-amber-200 text-xs font-bold animate-bounce shadow-lg"
            >
              <span>👇 {languagePrompt(gameState.settings.language)}</span>
            </motion.div>
          )}
        </div>
      </main>

      {/* BOTTOM OBJECT TRAY */}
      <ObjectTray
        discoveredObjects={discoveredObjects}
        onDropInBox={insertObject}
        getBoxRect={getBoxRect}
        onDragStateChange={handleDragStateChange}
        language={gameState.settings.language}
        hasSeenOnboarding={gameState.hasSeenOnboarding}
      />

      {/* MODALS */}
      {/* 1. Discovery Celebration Modal */}
      {celebrationObject && (
        <DiscoveryModal
          discoveredObject={celebrationObject}
          funFact={celebrationFunFact}
          isNewDiscovery={isNewDiscovery}
          language={gameState.settings.language}
          onClose={closeDiscoveryModal}
        />
      )}

      {/* 2. Collection Screen Modal */}
      {showCollection && (
        <DiscoveryCollection
          discoveredIds={gameState.discoveredIds}
          language={gameState.settings.language}
          onClose={() => setShowCollection(false)}
          onSelectObjectForBox={insertObject}
        />
      )}

      {/* 3. Discovery Map Modal */}
      {showMap && (
        <DiscoveryMap
          discoveredIds={gameState.discoveredIds}
          language={gameState.settings.language}
          onClose={() => setShowMap(false)}
        />
      )}

      {/* 4. World Selector Modal */}
      {showWorlds && (
        <WorldSelector
          activeWorldId={gameState.activeWorldId}
          discoveredCount={discoveredCount}
          language={gameState.settings.language}
          onSelectWorld={setActiveWorld}
          onClose={() => setShowWorlds(false)}
        />
      )}

      {/* 5. Parent Area Modal */}
      {showParentArea && (
        <ParentArea
          settings={gameState.settings}
          stats={gameState.stats}
          discoveredCount={discoveredCount}
          totalObjects={totalObjects}
          onUpdateSettings={updateSettings}
          onResetProgress={resetProgress}
          onClose={() => setShowParentArea(false)}
        />
      )}

      {/* 6. Daily Secret Modal */}
      {showDailySecret && (
        <DailySecretModal
          discoveredIds={gameState.discoveredIds}
          language={gameState.settings.language}
          onSelectForBox={(obj1, obj2) => {
            insertObject(obj1);
            insertObject(obj2);
          }}
          onClose={() => setShowDailySecret(false)}
        />
      )}
    </div>
  );
}

function languagePrompt(lang: 'en' | 'tr') {
  return lang === 'tr'
    ? 'Aşağıdan iki nesne seç veya kutuya sürükle!'
    : 'Drag or tap two items from below into the box!';
}
