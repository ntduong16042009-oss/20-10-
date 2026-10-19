import React, { useEffect } from 'react';
import type { StoryConfig } from '../utils/storyEngine';
import { Mail, RotateCcw, Share2, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RealityGalaxyProps {
  config: StoryConfig;
  onOpenLetter: () => void;
  onOpenCustomizer: () => void;
  onRestart: () => void;
}

export const RealityGalaxy: React.FC<RealityGalaxyProps> = ({
  config,
  onOpenLetter,
  onOpenCustomizer,
  onRestart,
}) => {
  useEffect(() => {
    // Grand celebratory fireworks
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#38bdf8', '#f472b6', '#fbbf24', '#34d399'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#38bdf8', '#f472b6', '#fbbf24', '#34d399'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center my-4 z-20 w-full max-w-xl px-4 text-center select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Celestial Portal Aura */}
      <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center my-2">
        {/* Outer orbital ring */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-orbit shadow-[0_0_20px_rgba(56,189,248,0.2)]" />
        {/* Inner dashed orbital ring */}
        <div className="absolute inset-4 rounded-full border border-dashed border-pink-400/40 animate-orbit-reverse" />
        {/* Core portal glow */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/25 to-pink-500/30 blur-xl animate-pulse" />

        {/* Floating Heart / Crystal in center */}
        <div className="relative z-10 flex flex-col items-center justify-center animate-float">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400 fill-pink-400/80 drop-shadow-[0_0_16px_rgba(244,114,182,0.9)]" />
          <span className="text-[11px] font-bold text-amber-200 uppercase font-mono tracking-widest mt-1">
            20 · 10
          </span>
        </div>
      </div>

      {/* Grand Message */}
      <div className="space-y-2 mt-2">
        <h2 className="text-xl sm:text-2xl font-bold font-courier text-pink-200 text-glow-pink">
          Hạnh Phúc & Rực Rỡ Nhé, {config.recipientName}!
        </h2>
        <p className="text-xs sm:text-sm text-cyan-200/80 max-w-md mx-auto leading-relaxed">
          Cảm ơn vì đã luôn mang đến những năng lượng tích cực và sự ấm áp diệu kỳ!
        </p>
      </div>

      {/* Moon rover illustration silhouette */}
      <div className="w-full my-4 flex justify-center">
        <svg viewBox="0 0 400 60" className="w-full max-w-xs opacity-70">
          {/* Lunar curve */}
          <path d="M 0 50 Q 200 20 400 50" stroke="rgba(148,163,184,0.4)" strokeWidth="2" fill="none" />
          {/* Small rover on the curve */}
          <g transform="translate(190, 24) scale(0.6)">
            <rect x="0" y="5" width="28" height="14" rx="3" fill="#cbd5e1" />
            <circle cx="6" cy="22" r="5" fill="#94a3b8" />
            <circle cx="22" cy="22" r="5" fill="#94a3b8" />
            <line x1="8" y1="5" x2="4" y2="-4" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="4" cy="-4" r="2.5" fill="#38bdf8" />
          </g>
        </svg>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <button
          type="button"
          onClick={onOpenLetter}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/80 to-rose-600/80 hover:from-pink-500 hover:to-rose-600 text-white text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Mở lại bức thư</span>
        </button>

        <button
          type="button"
          onClick={onOpenCustomizer}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600/80 hover:bg-cyan-500 text-white text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Tạo link của bạn</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-xs sm:text-sm border border-white/10 transition-colors cursor-pointer"
          title="Xem lại từ đầu"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Xem lại</span>
        </button>
      </div>
    </div>
  );
};
