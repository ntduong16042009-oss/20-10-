import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface CloverSceneProps {
  scene: 'clover_offer' | 'clover_take' | 'clover_luck';
  onCollect?: () => void;
}

export const CloverScene: React.FC<CloverSceneProps> = ({ scene, onCollect }) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleCloverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTouched(true);

    // Burst emerald stardust
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x, y },
      colors: ['#34d399', '#10b981', '#6ee7b7', '#fef08a'],
      shapes: ['circle'],
      scalar: 0.8,
    });

    if (onCollect) {
      onCollect();
    }
  };

  const isTake = scene === 'clover_take' || scene === 'clover_luck' || isTouched;

  return (
    <div className="relative flex flex-col items-center justify-center my-4 z-20">
      {/* Emerald aura blur behind clover */}
      <div className="absolute w-44 h-44 rounded-full bg-emerald-500/25 blur-3xl animate-pulse pointer-events-none" />

      {/* 4-leaf clover container */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Ngọn cỏ bốn lá may mắn"
        onClick={handleCloverClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCloverClick(e as unknown as React.MouseEvent);
          }
        }}
        className={`relative cursor-pointer transition-all duration-700 ease-out transform ${
          isTake ? 'scale-125' : 'scale-100 hover:scale-110'
        }`}
        style={{
          filter: 'drop-shadow(0 0 25px rgba(52, 211, 153, 0.95))',
        }}
      >
        <svg
          viewBox="0 0 160 180"
          className="w-28 h-32 sm:w-36 sm:h-40 animate-float"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="leafGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </radialGradient>
            <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Stem */}
          <path
            d="M 80 85 C 80 120, 95 155, 105 170"
            stroke="url(#stemGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* 4 Clover Leaves (Heart shapes rotated by 90deg) */}
          {/* Top Leaf */}
          <path
            d="M 80 80 C 60 55, 45 35, 65 15 C 80 5, 80 30, 80 30 C 80 30, 80 5, 95 15 C 115 35, 100 55, 80 80 Z"
            fill="url(#leafGlow)"
            stroke="#a7f3d0"
            strokeWidth="1.5"
          />
          {/* Right Leaf */}
          <path
            d="M 80 80 C 105 60, 125 45, 145 65 C 155 80, 130 80, 130 80 C 130 80, 155 80, 145 95 C 125 115, 105 100, 80 80 Z"
            fill="url(#leafGlow)"
            stroke="#a7f3d0"
            strokeWidth="1.5"
          />
          {/* Bottom Leaf */}
          <path
            d="M 80 80 C 100 105, 115 125, 95 145 C 80 155, 80 130, 80 130 C 80 130, 80 155, 65 145 C 45 125, 60 105, 80 80 Z"
            fill="url(#leafGlow)"
            stroke="#a7f3d0"
            strokeWidth="1.5"
          />
          {/* Left Leaf */}
          <path
            d="M 80 80 C 55 100, 35 115, 15 95 C 5 80, 30 80, 30 80 C 30 80, 5 80, 15 65 C 35 45, 55 60, 80 80 Z"
            fill="url(#leafGlow)"
            stroke="#a7f3d0"
            strokeWidth="1.5"
          />

          {/* Golden luminous center nucleus */}
          <circle cx="80" cy="80" r="5" fill="#fef08a" filter="drop-shadow(0 0 6px #fef08a)" />
        </svg>

        {/* Orbiting sparkling particles */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-2 left-4 text-xs text-emerald-200 animate-ping">✦</span>
          <span className="absolute bottom-4 right-2 text-sm text-yellow-200 animate-ping" style={{ animationDelay: '0.8s' }}>✧</span>
          <span className="absolute top-8 right-2 text-xs text-emerald-300 animate-ping" style={{ animationDelay: '1.4s' }}>★</span>
        </div>
      </div>

      <p className="mt-3 text-xs text-emerald-300/90 font-sans font-medium tracking-wide animate-pulse">
        {scene === 'clover_offer' ? '✦ Cỏ 4 lá mang đến may mắn ✦' : '✨ Chạm để đón nhận điều kỳ diệu ✨'}
      </p>
    </div>
  );
};
