import React, { useEffect, useState } from 'react';
import type { StoryScene } from '../utils/storyEngine';

interface TinyFaceProps {
  scene: StoryScene;
  isSleeping?: boolean;
}

export const TinyFace: React.FC<TinyFaceProps> = ({ scene, isSleeping = false }) => {
  const [blink, setBlink] = useState(false);
  const [lookOffset, setLookOffset] = useState({ x: 0, y: 0 });

  // Natural blinking effect
  useEffect(() => {
    if (isSleeping || scene === 'intro') return;

    let timeout: NodeJS.Timeout;
    const scheduleBlink = () => {
      const delay = Math.random() * 3000 + 2000;
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          scheduleBlink();
        }, 180);
      }, delay);
    };

    scheduleBlink();
    return () => clearTimeout(timeout);
  }, [isSleeping, scene]);

  // Subtle wandering glance for lively presence
  useEffect(() => {
    if (isSleeping || scene === 'intro') return;

    const interval = setInterval(() => {
      if (scene === 'compliment') {
        // Look shyly slightly down and right
        setLookOffset({ x: 4, y: 3 });
      } else if (scene === 'clover_offer' || scene === 'clover_take') {
        // Look down towards the clover
        setLookOffset({ x: 0, y: 6 });
      } else {
        const rx = (Math.random() - 0.5) * 6;
        const ry = (Math.random() - 0.5) * 4;
        setLookOffset({ x: rx, y: ry });
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isSleeping, scene]);

  const isAwake = !isSleeping && scene !== 'intro';
  const isSmile = scene === 'wish_smile' || scene === 'galaxy_reality';
  const isWink = scene === 'clover_take' || scene === 'clover_luck';
  const hasBlush = scene === 'compliment' || scene === 'wish_smile' || scene === 'galaxy_reality' || scene === 'clover_take';

  // Responsive eye dimensions
  const eyeSize = 'w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32';
  const eyeGap = 'gap-8 sm:gap-14 md:gap-20';

  if (!isAwake) {
    return (
      <div className={`flex items-center justify-center ${eyeGap} transition-all duration-700 opacity-20`}>
        <div className={`${eyeSize} rounded-2xl sm:rounded-3xl bg-cyan-900/40 border border-cyan-500/20`} />
        <div className={`${eyeSize} rounded-2xl sm:rounded-3xl bg-cyan-900/40 border border-cyan-500/20`} />
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center select-none transition-transform duration-500"
      style={{
        transform: `translate(${lookOffset.x}px, ${lookOffset.y}px)`,
      }}
    >
      <div className={`flex items-center justify-center ${eyeGap}`}>
        {/* Left Eye */}
        <div className="relative">
          {isSmile ? (
            // Smiling crescent eye ^
            <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center tiny-eye-glow-smile">
              <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-300 fill-none stroke-current" strokeWidth="14" strokeLinecap="round">
                <path d="M 18 68 C 30 25, 70 25, 82 68" />
              </svg>
            </div>
          ) : isWink ? (
            // Left eye winking ^
            <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center tiny-eye-glow-smile">
              <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-300 fill-none stroke-current" strokeWidth="14" strokeLinecap="round">
                <path d="M 18 68 C 30 28, 70 28, 82 68" />
              </svg>
            </div>
          ) : (
            // Normal rounded glowing robot eye
            <div
              className={`${eyeSize} rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-200 via-cyan-400 to-sky-500 tiny-eye-glow transition-all duration-150 flex items-center justify-center overflow-hidden`}
              style={{
                transform: blink ? 'scaleY(0.08)' : 'scaleY(1)',
              }}
            >
              {/* Inner pupil reflection highlight */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-white/90 blur-[0.5px]" />
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-100/70" />
            </div>
          )}

          {/* Left Cheerful Blush */}
          {hasBlush && (
            <div className="absolute -bottom-3 sm:-bottom-5 -left-2 sm:-left-4 w-7 h-3 sm:w-12 sm:h-5 rounded-full bg-pink-400/80 tiny-blush-glow blur-[2px] transition-opacity duration-700" />
          )}
        </div>

        {/* Right Eye */}
        <div className="relative">
          {isSmile ? (
            // Smiling crescent eye ^
            <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center tiny-eye-glow-smile">
              <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-300 fill-none stroke-current" strokeWidth="14" strokeLinecap="round">
                <path d="M 18 68 C 30 25, 70 25, 82 68" />
              </svg>
            </div>
          ) : (
            // Normal right eye
            <div
              className={`${eyeSize} rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-200 via-cyan-400 to-sky-500 tiny-eye-glow transition-all duration-150 flex items-center justify-center overflow-hidden`}
              style={{
                transform: blink ? 'scaleY(0.08)' : 'scaleY(1)',
              }}
            >
              {/* Inner pupil reflection highlight */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-white/90 blur-[0.5px]" />
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-100/70" />
            </div>
          )}

          {/* Right Cheerful Blush */}
          {hasBlush && (
            <div className="absolute -bottom-3 sm:-bottom-5 -right-2 sm:-right-4 w-7 h-3 sm:w-12 sm:h-5 rounded-full bg-pink-400/80 tiny-blush-glow blur-[2px] transition-opacity duration-700" />
          )}
        </div>
      </div>
    </div>
  );
};
