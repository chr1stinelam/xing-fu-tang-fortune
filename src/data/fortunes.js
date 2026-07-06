import rawFortunes from './fortunes-full.json'

// Full fortune set, keyed by stick number (1-100).
// Each entry: { luckLevel, luckLevelZh, englishFortune, chinesePoem (array of lines) }

function normalize(entry) {
  return {
    luckLevel: entry.luckLevel,
    luckLevelZh: entry.luckLevelZh,
    englishFortune: entry.englishFortune,
    chinesePoem: entry.chinesePoem.split('\n'),
  }
}

export const fortunes = Object.fromEntries(
  Object.entries(rawFortunes).map(([n, entry]) => [n, normalize(entry)])
)

// Overrides for sticks shown verbatim in the reference photos, so the demo
// matches the real Xing Fu Tang slips exactly.
Object.assign(fortunes, {
  1: {
    luckLevel: 'Great Luck',
    luckLevelZh: '上上籤',
    englishFortune:
      'The clouds part and the moon shines bright. What you have hoped for is finally within reach.',
    chinesePoem: ['雲開月出見分明', '花開結子自然成', '若問前程君莫問', '福祿自有天來成'],
  },
  25: {
    luckLevel: 'Good Luck',
    luckLevelZh: '中上籤',
    englishFortune:
      'A journey begun with patience will end in quiet success. Do not rush what is already in motion.',
    chinesePoem: ['行到水窮山又轉', '柳暗花明又一村', '莫嫌此去無知己', '前路自有貴人存'],
  },
  48: {
    luckLevel: 'Middle Luck',
    luckLevelZh: '中平籤',
    englishFortune:
      'The path ahead is unclear, but do not mistake stillness for stagnation. Rest before you continue.',
    chinesePoem: ['風雨飄搖未定時', '且將心事付東籬', '安身且待雲霧散', '自有晴光照舊枝'],
  },
  68: {
    luckLevel: 'Average Middle Luck',
    luckLevelZh: '中平籤',
    englishFortune: "The one you love doesn't love you. It's time to search for new love.",
    chinesePoem: ['喜歡你的你不喜歡', '你喜歡的不喜歡你', '這樣的戀愛還是算了吧', '再找一個更好的'],
  },
  100: {
    luckLevel: 'Great Luck',
    luckLevelZh: '上上籤',
    englishFortune:
      'A hundred rivers return to the sea. All that you have worked for comes full circle now.',
    chinesePoem: ['百川到海終有時', '功成名就正當時', '莫道人生無定數', '一分耕耘一分之'],
  },
})

export function getFortune(n) {
  return fortunes[n] ?? fortunes[1]
}

const CN_DIGITS = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']

export function toChineseNumeral(num) {
  if (num === 100) return '一百'
  if (num < 10) return CN_DIGITS[num]
  if (num < 20) return num === 10 ? '十' : `十${CN_DIGITS[num % 10]}`
  const tens = Math.floor(num / 10)
  const ones = num % 10
  return ones === 0 ? `${CN_DIGITS[tens]}十` : `${CN_DIGITS[tens]}十${CN_DIGITS[ones]}`
}
