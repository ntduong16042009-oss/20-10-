import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);

  // Play audio on first user interaction if allowed
  useEffect(() => {
    if (autoPlayTrigger && !hasStartedOnce && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStartedOnce(true);
        })
        .catch(() => {
          // Autoplay policy prevented; user can click button
        });
    }
  }, [autoPlayTrigger, hasStartedOnce, volume]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStartedOnce(true);
        })
        .catch((err) => console.log('Audio playback prevented:', err));
    }
  };

  return (
    <div
      className="fixed top-4 left-4 z-40 flex items-center gap-2 bg-slate-900/70 backdrop-blur-md border border-cyan-500/20 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <audio
        ref={audioRef}
        src="/audio/soundtrack.mp3"
        loop
        preload="auto"
      />

      <button
        type="button"
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        onClick={togglePlay}
        className="flex items-center gap-2 text-xs font-mono text-cyan-200 hover:text-white transition-colors cursor-pointer"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-gray-400" />
        )}

        <span className="hidden sm:inline text-[11px] font-sans tracking-wide">
          {isPlaying ? 'Nhạc 20/10' : 'Bật nhạc'}
        </span>

        {/* Animated sound bars */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 ml-0.5">
            <span className="w-0.5 h-full bg-cyan-400 rounded-full animate-pulse" />
            <span className="w-0.5 h-2/3 bg-pink-400 rounded-full animate-pulse delay-100" />
            <span className="w-0.5 h-4/5 bg-cyan-300 rounded-full animate-pulse delay-200" />
          </div>
        )}
      </button>
    </div>
  );
};
