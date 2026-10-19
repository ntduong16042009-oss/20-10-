import React, { useState } from 'react';
import type { StoryConfig } from '../utils/storyEngine';
import { generateShareUrl, DEFAULT_CONFIG } from '../utils/storyEngine';
import { X, Copy, Check, Sparkles, Heart, Wand2, Share2 } from 'lucide-react';

interface PersonalizerModalProps {
  isOpen: boolean;
  currentConfig: StoryConfig;
  onClose: () => void;
  onApplyConfig: (newConfig: StoryConfig) => void;
}

const TEMPLATES = [
  {
    label: 'Dành cho Người yêu / Crush',
    to: 'Em yêu',
    from: 'Anh',
    wish: 'Chúc em có một ngày 20/10 thật hạnh phúc, luôn rạng rỡ và nhận được thật nhiều điều ngọt ngào. Cảm ơn em vì đã đến và làm cho mỗi ngày của anh trở nên thật ý nghĩa! ❤️',
  },
  {
    label: 'Dành tặng Mẹ',
    to: 'Mẹ yêu',
    from: 'Con',
    wish: 'Nhân ngày 20/10, con chúc Mẹ luôn mạnh khỏe, bình an và luôn nở nụ cười trên môi. Con cảm ơn Mẹ vì tất cả những hy sinh và tình yêu thương vô bờ bến dành cho gia đình!',
  },
  {
    label: 'Dành tặng Bạn bè / Đồng nghiệp',
    to: 'Bạn thân',
    from: 'Tớ',
    wish: 'Chúc cậu một ngày 20/10 thật vui vẻ, công việc thuận lợi, luôn xinh đẹp rạng ngời và sớm đạt được mọi ước mơ nhé! ✨',
  },
];

export const PersonalizerModal: React.FC<PersonalizerModalProps> = ({
  isOpen,
  currentConfig,
  onClose,
  onApplyConfig,
}) => {
  const [recipient, setRecipient] = useState(currentConfig.recipientName);
  const [sender, setSender] = useState(currentConfig.senderName);
  const [wish, setWish] = useState(currentConfig.customWish);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleApplyTemplate = (tpl: (typeof TEMPLATES)[0]) => {
    setRecipient(tpl.to);
    setSender(tpl.from);
    setWish(tpl.wish);
  };

  const currentGeneratedUrl = generateShareUrl(window.location.href.split('?')[0], {
    recipientName: recipient.trim(),
    senderName: sender.trim(),
    customWish: wish.trim(),
  });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentGeneratedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = currentGeneratedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSaveAndApply = () => {
    const updated: StoryConfig = {
      recipientName: recipient.trim() || DEFAULT_CONFIG.recipientName,
      senderName: sender.trim() || DEFAULT_CONFIG.senderName,
      customWish: wish.trim() || DEFAULT_CONFIG.customWish,
    };
    onApplyConfig(updated);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/40 rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-[0_0_60px_rgba(14,165,233,0.3)] my-8 select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-courier text-glow-cyan">
                Tùy Chỉnh Link 20/10 Của Bạn
              </h2>
              <p className="text-[11px] text-cyan-300/70">
                Tạo thiệp riêng mang tên bạn và người bạn thương
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Đóng bảng tùy chỉnh"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Templates */}
        <div className="mb-4">
          <label className="text-[12px] font-medium text-cyan-300/90 tracking-wide block mb-1.5">
            Mẫu lời chúc gợi ý:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {TEMPLATES.map((tpl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyTemplate(tpl)}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-[11px] text-cyan-200 hover:text-white transition-colors cursor-pointer"
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-3.5">
          {/* Recipient Name */}
          <div>
            <label className="text-xs font-medium text-cyan-200 block mb-1">
              Tên người nhận (Người phụ nữ bạn yêu quý):
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Ví dụ: Em yêu, Lan Anh, Mẹ yêu..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm placeholder-gray-500 font-sans"
            />
          </div>

          {/* Sender Name */}
          <div>
            <label className="text-xs font-medium text-cyan-200 block mb-1">
              Tên người gửi (Tên của bạn):
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Ví dụ: Anh, Tuấn, Người ấy, Con..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm placeholder-gray-500 font-sans"
            />
          </div>

          {/* Custom Wish */}
          <div>
            <label className="text-xs font-medium text-cyan-200 block mb-1">
              Lời chúc trong bức thư riêng:
            </label>
            <textarea
              rows={3}
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Nhập những lời yêu thương chân thành nhất..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm placeholder-gray-500 resize-none font-sans"
            />
          </div>
        </div>

        {/* Generated Share Link Box */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-pink-500/30">
          <div className="flex items-center justify-between text-[11px] text-pink-300 font-medium mb-1">
            <span className="flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" />
              Link riêng của bạn:
            </span>
            {copied && <span className="text-emerald-400 font-bold">✓ Đã sao chép!</span>}
          </div>
          <div className="flex items-center gap-2">
            <input
              readOnly
              type="text"
              value={currentGeneratedUrl}
              className="w-full bg-transparent text-[11px] text-gray-300 font-mono focus:outline-none truncate"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/50 text-pink-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép' : 'Copy link'}</span>
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-gray-300 transition-colors cursor-pointer"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={handleSaveAndApply}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(14,165,233,0.5)] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Wand2 className="w-4 h-4" />
            <span>Áp dụng & Xem ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
