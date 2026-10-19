import React, { useMemo } from 'react';
import type { StoryScene } from '../utils/storyEngine';

interface CosmicSkyProps {
  currentScene: StoryScene;
}

export const CosmicSky: React.FC<CosmicSkyProps> = ({ currentScene }) => {
  // Generate deterministic stars
  const stars = useMemo(() => {
    return Array.from({ length: 70 }, (_, i) => {
      const top = ((i * 37 + 13) % 100).toFixed(2);
      const left = ((i * 53 + 29) % 100).toFixed(2);
      const size = (1.5 + (i % 3) * 0.9).toFixed(1);
      const delay = ((i % 7) * 0.5).toFixed(1);
      const duration = (2.2 + (i % 5) * 0.6).toFixed(1);
      const opacity = (0.3 + (i % 5) * 0.15).toFixed(2);
      return { top, left, size, delay, duration, opacity };
    });
  }, []);

  // Meteors (shooting stars)
  const meteors = useMemo(() => {
    return [
      { top: '12%', left: '88%', delay: '0.5s', duration: '5.2s' },
      { top: '28%', left: '96%', delay: '2.8s', duration: '6.0s' },
      { top: '6%', left: '70%', delay: '4.2s', duration: '5.5s' },
      { top: '40%', left: '92%', delay: '1.8s', duration: '7.0s' },
    ];
  }, []);

  // Petals for beauty & flower scenes
  const isFloralScene = currentScene === 'wish_beauty' || currentScene === 'clover_offer' || currentScene === 'clover_take';
  const isHealthScene = currentScene === 'wish_health';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background radial gradient nebula */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: isHealthScene
            ? 'radial-gradient(circle at 50% 40%, rgba(244, 63, 94, 0.18) 0%, rgba(15, 23, 42, 0.8) 55%, #020617 100%)'
            : isFloralScene
            ? 'radial-gradient(circle at 50% 35%, rgba(236, 72, 153, 0.16) 0%, rgba(16, 185, 129, 0.12) 35%, #030712 100%)'
            : 'radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.14) 0%, rgba(99, 102, 241, 0.08) 40%, #030712 100%)',
        }}
      />

      {/* Aurora glow ribbon */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vw] h-[400px] bg-gradient-to-b from-cyan-500/10 via-pink-500/10 to-transparent blur-3xl opacity-70 pointer-events-none" />

      {/* Stars */}
      {stars.map((star, idx) => (
        <span
          key={idx}
          className="absolute rounded-full bg-white animate-twinkle"
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: '0 0 6px 1px rgba(220, 244, 255, 0.7)',
              '--delay': `${star.delay}s`,
              '--duration': `${star.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Meteors */}
      {meteors.map((m, idx) => (
        <div
          key={idx}
          className="absolute h-[2px] w-[140px] bg-gradient-to-r from-white via-cyan-200/90 to-transparent rounded-full shadow-[0_0_8px_rgba(186,230,253,0.8)] animate-meteor"
          style={
            {
              top: m.top,
              left: m.left,
              '--delay': m.delay,
              '--duration': m.duration,
            } as React.CSSProperties
          }
        >
          <span className="absolute -left-1 -top-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_2px_rgba(224,242,254,1)]" />
        </div>
      ))}

      {/* Floating flower petals during beauty scene */}
      {isFloralScene && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-300/80 animate-float"
              style={{
                left: `${(i * 19 + 5) % 95}%`,
                top: `${(i * 23 + 10) % 90}%`,
                fontSize: `${12 + (i % 4) * 4}px`,
                animationDuration: `${4 + (i % 3) * 2}s`,
                animationDelay: `${(i % 5) * 0.7}s`,
                filter: 'drop-shadow(0 0 8px rgba(244,114,182,0.6))',
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}

      {/* Floating warm hearts and birds during health scene */}
      {isHealthScene && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-rose-400/70 animate-float"
              style={{
                left: `${(i * 29 + 12) % 92}%`,
                top: `${(i * 31 + 15) % 85}%`,
                fontSize: `${14 + (i % 3) * 5}px`,
                animationDuration: `${3.5 + (i % 4) * 1.5}s`,
                animationDelay: `${(i % 4) * 0.8}s`,
                filter: 'drop-shadow(0 0 10px rgba(244,63,94,0.6))',
              }}
            >
              {i % 2 === 0 ? '✨' : '💖'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
