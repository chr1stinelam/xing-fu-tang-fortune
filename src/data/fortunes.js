import rawFortunes from './fortunes-full.json'

// Full fortune set, keyed by stick number (1-100).
// Each entry: { luckLevel, luckLevelZh, englishFortune, chinesePoem (array of lines), qaPairs }

function normalize(entry) {
  return {
    luckLevel: entry.luckLevel,
    luckLevelZh: entry.luckLevelZh,
    englishFortune: entry.englishFortune,
    chinesePoem: entry.chinesePoem.split('\n'),
    qaPairs: entry.qaPairs.map((qa) => ({ question: qa.question, answer: qa.answer })),
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
    qaPairs: [
      { question: '事業', answer: '順利亨通，貴人相助。' },
      { question: '感情', answer: '有情人終成眷屬。' },
      { question: '財運', answer: '財源廣進，宜守不宜貪。' },
      { question: '健康', answer: '平安無虞，宜保持作息。' },
    ],
  },
  25: {
    luckLevel: 'Good Luck',
    luckLevelZh: '中上籤',
    englishFortune:
      'A journey begun with patience will end in quiet success. Do not rush what is already in motion.',
    chinesePoem: ['行到水窮山又轉', '柳暗花明又一村', '莫嫌此去無知己', '前路自有貴人存'],
    qaPairs: [
      { question: '事業', answer: '穩紮穩打，漸入佳境。' },
      { question: '感情', answer: '緣分將至，耐心等待。' },
      { question: '財運', answer: '小有收穫，量入為出。' },
      { question: '出行', answer: '宜出行，途中有貴人。' },
    ],
  },
  48: {
    luckLevel: 'Middle Luck',
    luckLevelZh: '中平籤',
    englishFortune:
      'The path ahead is unclear, but do not mistake stillness for stagnation. Rest before you continue.',
    chinesePoem: ['風雨飄搖未定時', '且將心事付東籬', '安身且待雲霧散', '自有晴光照舊枝'],
    qaPairs: [
      { question: '事業', answer: '暫緩進行，靜待時機。' },
      { question: '感情', answer: '宜多溝通，勿急於一時。' },
      { question: '財運', answer: '收支平平，不宜投資。' },
      { question: '健康', answer: '注意休息，勿過操勞。' },
    ],
  },
  68: {
    luckLevel: 'Average Middle Luck',
    luckLevelZh: '中平籤',
    englishFortune: "The one you love doesn't love you. It's time to search for new love.",
    chinesePoem: ['喜歡你的你不喜歡', '你喜歡的不喜歡你', '這樣的戀愛還是算了吧', '再找一個更好的'],
    qaPairs: [
      { question: '姻緣', answer: '你喜歡的不喜歡你。' },
      { question: '桃花', answer: '你不喜歡的喜歡你。' },
      { question: '建議', answer: '再找一個更好的吧。' },
    ],
  },
  100: {
    luckLevel: 'Great Luck',
    luckLevelZh: '上上籤',
    englishFortune:
      'A hundred rivers return to the sea. All that you have worked for comes full circle now.',
    chinesePoem: ['百川到海終有時', '功成名就正當時', '莫道人生無定數', '一分耕耘一分之'],
    qaPairs: [
      { question: '事業', answer: '大功告成，聲名遠播。' },
      { question: '感情', answer: '圓滿美滿，白頭偕老。' },
      { question: '財運', answer: '財運亨通，投資得利。' },
      { question: '健康', answer: '身體康泰，福壽綿長。' },
    ],
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
