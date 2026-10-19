import React, { useState } from 'react';
import type { StoryConfig } from '../utils/storyEngine';
import { Mail, Heart, Sparkles, Check, Edit3, ArrowRight } from 'lucide-react';

interface LoveLetterModalProps {
  config: StoryConfig;
  isOpen: boolean;
  onClose?: () => void;
  onOpenCustomizer?: () => void;
  onNextScene?: () => void;
  isInlineScene?: boolean;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  config,
  isOpen,
  onClose,
  onOpenCustomizer,
  onNextScene,
  isInlineScene = false,
}) => {
  const [isOpened, setIsOpened] = useState(isInlineScene);

  if (!isOpen) return null;

  return (
    <div
      className={
        isInlineScene
          ? 'relative w-full max-w-xl mx-auto px-4 z-20 my-4'
          : 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md'
      }
      onClick={(e) => e.stopPropagation()}
    >
      {!isOpened ? (
        /* Sealed Envelope */
        <div
          role="button"
          tabIndex={0}
          aria-label="Mở bức thư bí mật"
          onClick={() => setIsOpened(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setIsOpened(true);
          }}
          className="group relative cursor-pointer bg-gradient-to-br from-amber-900/40 via-purple-900/40 to-slate-900/70 border border-amber-400/40 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-[0_0_35px_rgba(251,191,36,0.25)] hover:shadow-[0_0_50px_rgba(251,191,36,0.45)] transition-all duration-300 text-center animate-float"
        >
          {/* Glowing wax seal */}
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-700 via-red-600 to-rose-400 border-2 border-amber-300/60 shadow-[0_0_20px_rgba(225,29,72,0.8)] flex items-center justify-center text-amber-100 font-bold text-xs sm:text-sm tracking-wider transform group-hover:scale-105 transition-transform">
            <div className="flex flex-col items-center">
              <Heart className="w-5 h-5 fill-amber-200 text-amber-200" />
              <span className="text-[10px] uppercase font-mono mt-0.5">20/10</span>
            </div>
          </div>

          <h3 className="mt-5 text-lg sm:text-xl font-semibold text-amber-200 font-courier text-glow-gold">
            Bức thư gửi riêng cho {config.recipientName}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-cyan-200/70">
            Từ: <span className="text-pink-300 font-medium">{config.senderName}</span>
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-200 text-xs sm:text-sm font-medium tracking-wide group-hover:bg-amber-400/30 transition-colors">
            <Mail className="w-4 h-4" />
            <span>Chạm để mở phong thư</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
        </div>
      ) : (
        /* Unfolded Letter */
        <div className="relative bg-gradient-to-b from-[#1c1829] via-[#161224] to-[#0c0a17] border border-amber-300/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(251,191,36,0.3)] animate-scale-up">
          {/* Vintage top ribbon */}
          <div className="flex items-center justify-between border-b border-amber-400/20 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                Thiệp Chúc Mừng 20/10
              </span>
            </div>
            <span className="text-[11px] font-mono text-cyan-300/60">20.10.2026</span>
          </div>

          {/* Letter Body */}
          <div className="space-y-4 text-left">
            <p className="text-sm font-medium text-amber-200/90 font-courier">
              Gửi <span className="text-pink-300 text-base font-bold underline decoration-pink-500/50">{config.recipientName}</span> thân yêu,
            </p>

            <div className="text-xs sm:text-sm leading-relaxed text-gray-200/95 bg-white/5 p-4 rounded-xl border border-white/10 font-normal italic">
              &ldquo;{config.customWish}&rdquo;
            </div>

            <div className="pt-2 flex justify-between items-end border-t border-amber-400/20">
              <div className="text-[11px] text-cyan-300/70">
                Chúc {config.recipientName} luôn ngập tràn niềm vui! ✨
              </div>
              <div className="text-right">
                <p className="text-xs text-amber-300/80">Thương mến,</p>
                <p className="text-sm font-bold text-pink-300 font-courier">{config.senderName}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3">
            {onOpenCustomizer && (
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-cyan-200 border border-white/15 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Sửa lời chúc này</span>
              </button>
            )}

            {isInlineScene && onNextScene ? (
              <button
                type="button"
                onClick={onNextScene}
                className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs sm:text-sm font-medium shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all cursor-pointer"
              >
                <span>Phóng máy bay điều ước</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-xs text-pink-200 border border-pink-500/40 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Đóng lại</span>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
