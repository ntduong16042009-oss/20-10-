import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseStoryParams,
  generateShareUrl,
  getSceneDialogue,
  computeNextSceneIndex,
  computePrevSceneIndex,
  DEFAULT_CONFIG,
  STORY_SCENES,
} from './storyEngine.ts';

test('parseStoryParams parses URL search string correctly', () => {
  const result = parseStoryParams('?to=Mai+Anh&from=Hoang&msg=Chuc+em+luon+hanh+phuc');
  assert.equal(result.recipientName, 'Mai Anh');
  assert.equal(result.senderName, 'Hoang');
  assert.equal(result.customWish, 'Chuc em luon hanh phuc');
});

test('parseStoryParams falls back to default values when empty', () => {
  const result = parseStoryParams('');
  assert.equal(result.recipientName, DEFAULT_CONFIG.recipientName);
  assert.equal(result.senderName, DEFAULT_CONFIG.senderName);
  assert.equal(result.customWish, DEFAULT_CONFIG.customWish);
});

test('generateShareUrl creates parameterized URL', () => {
  const url = generateShareUrl('https://example.com/20-10', {
    recipientName: 'Lan',
    senderName: 'Tuấn',
    customWish: 'Chúc 20/10 vui vẻ',
  });
  assert.match(url, /to=Lan/);
  assert.match(url, /from=Tu%E1%BA%A5n/);
  assert.match(url, /msg=Ch%C3%BAc\+20%2F10\+vui\+v%E1%BA%BB/);
});

test('getSceneDialogue interpolates names dynamically', () => {
  const dialogueIntro = getSceneDialogue('intro', {
    recipientName: 'Thu Hà',
    senderName: 'Nam',
    customWish: 'Test wish',
  });
  assert.equal(dialogueIntro.title, 'này Thu Hà ơi');

  const dialogueMission = getSceneDialogue('mission', {
    recipientName: 'Thu Hà',
    senderName: 'Nam',
    customWish: 'Test wish',
  });
  assert.equal(dialogueMission.title, 'Hôm nay tớ nhận nhiệm vụ đặc biệt từ Nam gửi đến cậu...');

  const dialogueHealth = getSceneDialogue('wish_health', {
    recipientName: 'Mẹ yêu',
    senderName: 'Con gái',
    customWish: 'Test wish',
  });
  assert.equal(dialogueHealth.title, 'chúc Mẹ yêu thật nhiều sức khỏe');
});

test('computeNextSceneIndex stops at the last scene boundary', () => {
  const maxIdx = STORY_SCENES.length - 1;
  assert.equal(computeNextSceneIndex(0), 1);
  assert.equal(computeNextSceneIndex(maxIdx), maxIdx);
  assert.equal(computePrevSceneIndex(0), 0);
  assert.equal(computePrevSceneIndex(3), 2);
});
