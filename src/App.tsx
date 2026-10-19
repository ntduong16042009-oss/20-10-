/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  STORY_SCENES,
  parseStoryParams,
  computeNextSceneIndex,
  computePrevSceneIndex,
  DEFAULT_CONFIG,
  StoryConfig,
  StoryScene,
} from './utils/storyEngine';
import { CosmicSky } from './components/CosmicSky';
import { TinyFace } from './components/TinyFace';
import { StoryDialogue } from './components/StoryDialogue';
import { CloverScene } from './components/CloverScene';
import { LoveLetterModal } from './components/LoveLetterModal';
import { AirplaneFlight } from './components/AirplaneFlight';
import { RealityGalaxy } from './components/RealityGalaxy';
import { MusicPlayer } from './components/MusicPlayer';
import { PersonalizerModal } from './components/PersonalizerModal';
import { Sparkles, Mail, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<StoryConfig>(() => {
    if (typeof window !== 'undefined') {
      return parseStoryParams(window.location.search);
    }
    return DEFAULT_CONFIG;
  });

  const [sceneIndex, setSceneIndex] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        return 1; // Skip intro directly to wake
      }
    }
    return 0;
  });

  const [canAdvance, setCanAdvance] = useState(true);
  const [hasStartedMusic, setHasStartedMusic] = useState(false);
  const [isPersonalizerOpen, setIsPersonalizerOpen] = useState(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);

  const currentScene: StoryScene = STORY_SCENES[sceneIndex] || 'intro';

  // Handle advancing to next scene
  const handleNext = useCallback(() => {
    if (!canAdvance) return;
    if (!hasStartedMusic) {
      setHasStartedMusic(true);
    }

    // Temporary debounce to prevent double skipping
    setCanAdvance(false);
    setTimeout(() => setCanAdvance(true), 400);

    setSceneIndex((prev) => computeNextSceneIndex(prev));
  }, [canAdvance, hasStartedMusic]);

  const handlePrev = useCallback(() => {
    setSceneIndex((prev) => computePrevSceneIndex(prev));
  }, []);

  const handleRestart = useCallback(() => {
    setSceneIndex(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPersonalizerOpen || isLetterModalOpen) return;

      if (e.code === 'Space' || e.code === 'ArrowRight' || e.code === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isPersonalizerOpen, isLetterModalOpen]);

  // Update URL state when config is customized
  const handleApplyConfig = (newConfig: StoryConfig) => {
    setConfig(newConfig);
    // Refresh URL search params without reload
    const url = new URL(window.location.href);
    if (newConfig.recipientName !== DEFAULT_CONFIG.recipientName) {
      url.searchParams.set('to', newConfig.recipientName);
    } else {
      url.searchParams.delete('to');
    }
    if (newConfig.senderName !== DEFAULT_CONFIG.senderName) {
      url.searchParams.set('from', newConfig.senderName);
    } else {
      url.searchParams.delete('from');
    }
    if (newConfig.customWish !== DEFAULT_CONFIG.customWish) {
      url.searchParams.set('msg', newConfig.customWish);
    } else {
      url.searchParams.delete('msg');
    }
    window.history.replaceState({}, '', url.toString());
    // Rewind to beginning to let user view their personalized version
    setSceneIndex(0);
  };

  const isCloverScene =
    currentScene === 'clover_offer' ||
    currentScene === 'clover_take' ||
    currentScene === 'clover_luck';

  const isAirplaneScene = currentScene === 'airplane_fuel';
  const isLetterScene = currentScene === 'letter_reveal';
  const isGalaxyScene = currentScene === 'galaxy_reality';
  const isBeautyScene = currentScene === 'wish_beauty';

  return (
    <main
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-black select-none cursor-pointer"
      onClick={handleNext}
      aria-label="Nhấn để tiếp tục câu chuyện"
      data-scene={currentScene}
      data-testid="story-container"
    >
      {/* Background Cosmic Sky & Effects */}
      <CosmicSky currentScene={currentScene} />

      {/* Floating Vietnamese Woman Illustration in Beauty scene */}
      {isBeautyScene && (
        <div className="absolute bottom-0 right-0 sm:right-8 w-44 sm:w-64 md:w-80 pointer-events-none opacity-85 transition-opacity duration-1000 z-5">
          <img
            src="/images/anh-hai-nguoi.png"
            alt="Hai cô gái duyên dáng"
            className="w-full h-auto object-contain filter drop-shadow-[0_0_20px_rgba(244,114,182,0.4)]"
            onError={(e) => {
              // Hide silently if image format is unsupported
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Floating Top Controls */}
      <header
        className="fixed top-0 left-0 right-0 z-40 p-3 sm:p-4 flex items-center justify-between pointer-events-none"
      >
        {/* Audio Player */}
        <div className="pointer-events-auto">
          <MusicPlayer autoPlayTrigger={hasStartedMusic} />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Secret Letter Button */}
          <button
            type="button"
            aria-label="Xem bức thư chúc mừng 20/10"
            onClick={(e) => {
              e.stopPropagation();
              setIsLetterModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-800/90 border border-amber-400/30 text-amber-200 text-xs font-sans font-medium backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
            title="Xem thư chúc mừng"
          >
            <Mail className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Thư 20/10</span>
          </button>

          {/* Personalizer Button */}
          <button
            type="button"
            aria-label="Tùy chỉnh link này cho riêng bạn"
            onClick={(e) => {
              e.stopPropagation();
              setIsPersonalizerOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/80 to-purple-600/80 hover:from-pink-500 hover:to-purple-600 border border-pink-400/40 text-white text-xs font-medium backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.4)] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Tùy chỉnh link</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 my-auto">
        {/* Tiny Robot Face (Visible in all scenes except letter modal and airplane fuel) */}
        {!isAirplaneScene && !isGalaxyScene && (
          <div className="mb-6 sm:mb-8 transition-transform duration-700">
            <TinyFace scene={currentScene} isSleeping={currentScene === 'intro'} />
          </div>
        )}

        {/* Story Dialogue */}
        {!isLetterScene && !isAirplaneScene && !isGalaxyScene && (
          <StoryDialogue
            scene={currentScene}
            config={config}
            canClick={canAdvance}
          />
        )}

        {/* Scene-Specific Interactive Elements */}
        {/* 1. Clover Scene */}
        {isCloverScene && (
          <CloverScene
            scene={currentScene as 'clover_offer' | 'clover_take' | 'clover_luck'}
            onCollect={handleNext}
          />
        )}

        {/* 2. Love Letter Scene */}
        {isLetterScene && (
          <LoveLetterModal
            config={config}
            isOpen={true}
            isInlineScene={true}
            onOpenCustomizer={() => setIsPersonalizerOpen(true)}
            onNextScene={handleNext}
          />
        )}

        {/* 3. Airplane Flight Scene */}
        {isAirplaneScene && (
          <AirplaneFlight
            recipientName={config.recipientName}
            senderName={config.senderName}
            onLaunched={() => {
              setSceneIndex((prev) => computeNextSceneIndex(prev));
            }}
          />
        )}

        {/* 4. Grand Galaxy Reality Scene */}
        {isGalaxyScene && (
          <RealityGalaxy
            config={config}
            onOpenLetter={() => setIsLetterModalOpen(true)}
            onOpenCustomizer={() => setIsPersonalizerOpen(true)}
            onRestart={handleRestart}
          />
        )}
      </div>

      {/* Bottom Scene Progress Dots & Step Controls */}
      <footer
        className="fixed bottom-3 sm:bottom-4 left-0 right-0 z-30 flex flex-col items-center justify-center gap-2 select-none pointer-events-none"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 pointer-events-auto">
          <button
            type="button"
            aria-label="Quay lại phân đoạn trước"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            disabled={sceneIndex === 0}
            className="p-1 rounded-full text-cyan-300 hover:text-white disabled:opacity-30 disabled:hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1">
            {STORY_SCENES.map((_, idx) => (
              <span
                key={idx}
                className={`transition-all duration-300 rounded-full ${
                  idx === sceneIndex
                    ? 'w-4 h-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]'
                    : idx < sceneIndex
                    ? 'w-1.5 h-1.5 bg-cyan-600/70'
                    : 'w-1.5 h-1.5 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Tiếp tục phân đoạn sau"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            disabled={sceneIndex === STORY_SCENES.length - 1}
            className="p-1 rounded-full text-cyan-300 hover:text-white disabled:opacity-30 disabled:hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono text-cyan-300/60 ml-1">
            {sceneIndex + 1}/{STORY_SCENES.length}
          </span>
        </div>
      </footer>

      {/* Floating Personalizer Modal */}
      <PersonalizerModal
        isOpen={isPersonalizerOpen}
        currentConfig={config}
        onClose={() => setIsPersonalizerOpen(false)}
        onApplyConfig={handleApplyConfig}
      />

      {/* Standalone Love Letter Modal */}
      <LoveLetterModal
        config={config}
        isOpen={isLetterModalOpen}
        isInlineScene={false}
        onClose={() => setIsLetterModalOpen(false)}
        onOpenCustomizer={() => {
          setIsLetterModalOpen(false);
          setIsPersonalizerOpen(true);
        }}
      />
    </main>
  );
}
