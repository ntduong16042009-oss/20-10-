import React, { useState, useEffect } from 'react';
import { Send, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AirplaneFlightProps {
  recipientName: string;
  senderName: string;
  onLaunched: () => void;
}

export const AirplaneFlight: React.FC<AirplaneFlightProps> = ({
  recipientName,
  senderName,
  onLaunched,
}) => {
  const [fuel, setFuel] = useState(80);
  const [isPumping, setIsPumping] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);

  const startFueling = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPumping || isLaunched) return;
    setIsPumping(true);

    const interval = setInterval(() => {
      setFuel((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          triggerLaunch();
          return 100;
        }
        return prev + 4;
      });
    }, 60);
  };

  const triggerLaunch = () => {
    setIsLaunched(true);
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#f472b6', '#fef08a'],
    });

    setTimeout(() => {
      onLaunched();
    }, 1800);
  };

  useEffect(() => {
    if (fuel >= 100 && !isLaunched) {
      triggerLaunch();
    }
  }, [fuel, isLaunched]);

  return (
    <div
      className="relative flex flex-col items-center justify-center my-6 z-20 w-full max-w-md px-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Paper Airplane with energetic aura */}
      <div
        className={`relative transition-all duration-1000 ease-in-out ${
          isLaunched
            ? '-translate-y-96 translate-x-80 scale-50 opacity-0 rotate-12'
            : 'animate-float'
        }`}
        style={{
          filter: 'drop-shadow(0 0 25px rgba(56, 189, 248, 0.85))',
        }}
      >
        <svg
          viewBox="0 0 200 160"
          className="w-36 h-28 sm:w-44 sm:h-36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="planeShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>

          {/* Paper airplane facets */}
          {/* Main left wing */}
          <polygon points="100,20 20,130 100,105" fill="url(#planeGrad)" />
          {/* Main right wing */}
          <polygon points="100,20 180,130 100,105" fill="url(#planeGrad)" opacity="0.9" />
          {/* Center fold left */}
          <polygon points="100,20 100,105 85,120" fill="url(#planeShadow)" opacity="0.8" />
          {/* Center fold right */}
          <polygon points="100,20 100,105 115,120" fill="url(#planeShadow)" opacity="0.9" />
          {/* Cockpit / wish core */}
          <circle cx="100" cy="70" r="6" fill="#f472b6" filter="drop-shadow(0 0 8px #f472b6)" />
        </svg>

        {/* Trail sparkles */}
        {isLaunched && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping delay-100" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping delay-200" />
          </div>
        )}
      </div>

      {/* Fuel station controls */}
      {!isLaunched ? (
        <div className="mt-6 w-full bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(14,165,233,0.2)]">
          <div className="flex items-center justify-between text-xs text-cyan-200 font-sans font-medium mb-2">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              Năng Lượng Yêu Thương
            </span>
            <span className="font-bold text-cyan-300 font-mono">{fuel}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-cyan-500/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-pink-400 shadow-[0_0_10px_rgba(56,189,248,0.8)] transition-all duration-150"
              style={{ width: `${fuel}%` }}
            />
          </div>

          {/* Button */}
          <div className="mt-4 flex flex-col items-center">
            <button
              type="button"
              onClick={startFueling}
              disabled={isPumping}
              className={`w-full py-3 px-6 rounded-xl font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                isPumping
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 animate-pulse'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.5)]'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isPumping ? 'Đang nạp năng lượng...' : 'Nạp đầy 100% để cất cánh'}</span>
            </button>
            <p className="mt-2 text-[11px] text-cyan-300/60 text-center">
              Gửi lời chúc từ <span className="text-pink-300 font-semibold">{senderName}</span> đến <span className="text-pink-300 font-semibold">{recipientName}</span>!
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center text-cyan-200 animate-pulse font-courier">
          <p className="text-base sm:text-lg text-glow-cyan">✈ Máy bay đang bay vào dải ngân hà...</p>
        </div>
      )}
    </div>
  );
};
