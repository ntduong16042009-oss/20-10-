import React, { useEffect, useState } from 'react';
import type { StoryScene, StoryConfig } from '../utils/storyEngine';
import { getSceneDialogue } from '../utils/storyEngine';

interface StoryDialogueProps {
  scene: StoryScene;
  config: StoryConfig;
  canClick: boolean;
  onClickPrompt?: () => void;
}

export const StoryDialogue: React.FC<StoryDialogueProps> = ({
  scene,
  config,
  canClick,
}) => {
  const dialogue = getSceneDialogue(scene, config);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect
  useEffect(() => {
    setDisplayedTitle('');
    setIsTyping(true);

    const fullText = dialogue.title;
    let currentIdx = 0;

    const interval = setInterval(() => {
      currentIdx++;
      setDisplayedTitle(fullText.slice(0, currentIdx));
      if (currentIdx >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [dialogue.title]);

  const isSpecial2010 = scene === 'approaching' || scene === 'galaxy_reality';

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-4 max-w-2xl select-none z-10 min-h-[90px]">
      <h1
        className={`text-xl sm:text-2xl md:text-3xl font-courier tracking-wide font-medium transition-all duration-300 ${
          isSpecial2010
            ? 'text-pink-200 text-glow-pink'
            : scene.startsWith('wish_')
            ? 'text-amber-100 text-glow-gold'
            : scene.startsWith('clover_')
            ? 'text-emerald-100 text-glow-emerald'
            : 'text-cyan-50 text-glow-cyan'
        }`}
      >
        <span>{displayedTitle}</span>
        {isTyping && (
          <span className="inline-block w-2.5 h-6 ml-1 bg-cyan-300 animate-pulse align-middle" />
        )}
      </h1>

      {dialogue.subtitle && !isTyping && (
        <p className="mt-2 text-xs sm:text-sm text-cyan-200/70 font-light max-w-lg transition-opacity duration-700 animate-fade-in">
          {dialogue.subtitle}
        </p>
      )}

      {/* Touch/Click Hint */}
      {canClick && !isTyping && (
        <div className="mt-6 flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-cyan-400/60 animate-pulse">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Chạm vào màn hình để tiếp tục</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>
      )}
    </div>
  );
};
