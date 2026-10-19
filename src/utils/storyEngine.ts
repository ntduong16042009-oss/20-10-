export interface StoryConfig {
  recipientName: string;
  senderName: string;
  customWish: string;
  songUrl?: string;
}

export const DEFAULT_CONFIG: StoryConfig = {
  recipientName: 'cậu',
  senderName: 'người thương',
  customWish: 'Chúc bạn một ngày 20/10 thật nhiều niềm vui, luôn xinh đẹp, hạnh phúc và nhận được thật nhiều tình yêu thương!',
  songUrl: '/audio/soundtrack.mp3',
};

export type StoryScene =
  | 'intro'           // 0: Này cậu gì ơi...
  | 'wake'            // 1: Tớ là Tiny...
  | 'mission'         // 2: Hôm nay tớ nhận lệnh đặc biệt từ...
  | 'compliment'      // 3: Ui cậu xinh xắn quá...
  | 'approaching'     // 4: À thì cũng sắp 20/10 rồi...
  | 'wish_intro'      // 5: Nên là tớ muốn...
  | 'wish_health'     // 6: Chúc cậu thật nhiều sức khỏe...
  | 'wish_beauty'     // 7: Chúc cậu thật xinh đẹp...
  | 'wish_smile'      // 8: Và chúc cậu luôn giữ nụ cười trên môi...
  | 'clover_offer'    // 9: Tớ tặng cậu ngọn cỏ 4 lá này...
  | 'clover_take'     // 10: Nè cầm lấy đi...
  | 'clover_luck'     // 11: Chúc cậu gặp được thật nhiều điều may mắn...
  | 'letter_reveal'   // 12: Bức thư tay riêng tư từ người gửi
  | 'airplane_fuel'   // 13: Tiếp nhiên liệu cho máy bay điều ước
  | 'galaxy_reality'; // 14: Vũ trụ bao la & những vì sao may mắn

export const STORY_SCENES: StoryScene[] = [
  'intro',
  'wake',
  'mission',
  'compliment',
  'approaching',
  'wish_intro',
  'wish_health',
  'wish_beauty',
  'wish_smile',
  'clover_offer',
  'clover_take',
  'clover_luck',
  'letter_reveal',
  'airplane_fuel',
  'galaxy_reality',
];

export function parseStoryParams(search: string): StoryConfig {
  try {
    const params = new URLSearchParams(search);
    const to = params.get('to')?.trim();
    const from = params.get('from')?.trim();
    const msg = params.get('msg')?.trim();
    const song = params.get('song')?.trim();

    return {
      recipientName: to || DEFAULT_CONFIG.recipientName,
      senderName: from || DEFAULT_CONFIG.senderName,
      customWish: msg || DEFAULT_CONFIG.customWish,
      songUrl: song || DEFAULT_CONFIG.songUrl,
    };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function generateShareUrl(baseUrl: string, config: StoryConfig): string {
  try {
    const url = new URL(baseUrl);
    if (config.recipientName && config.recipientName !== DEFAULT_CONFIG.recipientName) {
      url.searchParams.set('to', config.recipientName);
    } else {
      url.searchParams.delete('to');
    }

    if (config.senderName && config.senderName !== DEFAULT_CONFIG.senderName) {
      url.searchParams.set('from', config.senderName);
    } else {
      url.searchParams.delete('from');
    }

    if (config.customWish && config.customWish !== DEFAULT_CONFIG.customWish) {
      url.searchParams.set('msg', config.customWish);
    } else {
      url.searchParams.delete('msg');
    }

    return url.toString();
  } catch {
    return baseUrl;
  }
}

export function getSceneDialogue(scene: StoryScene, config: StoryConfig): { title: string; subtitle?: string } {
  const to = config.recipientName;
  const from = config.senderName;

  switch (scene) {
    case 'intro':
      return {
        title: to === 'cậu' ? 'này cậu gì ơi' : `này ${to} ơi`,
        subtitle: 'Chạm vào màn hình để bắt đầu câu chuyện',
      };
    case 'wake':
      return {
        title: 'tớ là Tiny',
      };
    case 'mission':
      return {
        title: from === 'người thương'
          ? 'Hôm nay tớ có một điều đặc biệt muốn nói với cậu...'
          : `Hôm nay tớ nhận nhiệm vụ đặc biệt từ ${from} gửi đến cậu...`,
      };
    case 'compliment':
      return {
        title: `ui hôm nay ${to} đẹp quá à`,
      };
    case 'approaching':
      return {
        title: 'à thì cũng sắp 20/10 rồi',
      };
    case 'wish_intro':
      return {
        title: `nên là tớ và ${from} muốn`,
      };
    case 'wish_health':
      return {
        title: `chúc ${to} thật nhiều sức khỏe`,
        subtitle: 'Bình an, mạnh khỏe và luôn tràn đầy năng lượng tích cực',
      };
    case 'wish_beauty':
      return {
        title: `chúc ${to} thật xinh đẹp`,
        subtitle: 'Rạng ngời, tươi tắn như những đóa hoa tỏa sắc sớm mai',
      };
    case 'wish_smile':
      return {
        title: `và chúc ${to} luôn giữ nụ cười trên môi`,
        subtitle: 'Nụ cười của cậu chính là điều ấm áp và đáng yêu nhất',
      };
    case 'clover_offer':
      return {
        title: 'tớ tặng cậu ngọn cỏ 4 lá này',
      };
    case 'clover_take':
      return {
        title: 'nè cầm lấy đi',
      };
    case 'clover_luck':
      return {
        title: 'chúc cậu gặp được thật nhiều điều may mắn',
      };
    case 'letter_reveal':
      return {
        title: `Bức thư bí mật gửi tặng ${to}`,
        subtitle: `Từ: ${from}`,
      };
    case 'airplane_fuel':
      return {
        title: 'Gửi ngàn lời chúc bay vào vũ trụ',
        subtitle: 'Nạp năng lượng yêu thương cho chiếc máy bay giấy cất cánh!',
      };
    case 'galaxy_reality':
      return {
        title: `Chúc mừng ngày Phụ nữ Việt Nam 20/10!`,
        subtitle: `Mỗi ngày đều là ngày ngập tràn niềm vui và yêu thương dành cho ${to}!`,
      };
    default:
      return { title: '' };
  }
}

export function computeNextSceneIndex(currentIndex: number): number {
  if (currentIndex < 0) return 0;
  if (currentIndex >= STORY_SCENES.length - 1) return currentIndex;
  return currentIndex + 1;
}

export function computePrevSceneIndex(currentIndex: number): number {
  if (currentIndex <= 0) return 0;
  return currentIndex - 1;
}
