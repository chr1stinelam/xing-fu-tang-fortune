import { motion } from 'framer-motion'
import { getFortune, toChineseNumeral } from '../data/fortunes'

export default function FortuneCard({ number, onReset }) {
  const fortune = getFortune(number)

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="w-full max-w-sm overflow-hidden rounded-md border border-[#d9c9a3] bg-[#fbf6ec] shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-lacquer px-4 py-3 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-stroke-gold font-brush text-lg font-bold tracking-widest sm:text-xl">
              幸福堂
            </span>
          </div>
          <div className="text-stroke-gold text-[10px] tracking-[0.3em] opacity-80">XING FU TANG</div>
        </motion.div>

        <div className="px-5 py-5">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-brush text-xl font-bold text-[#2a1c0e] sm:text-2xl">
              第{toChineseNumeral(number)}籤 {fortune.luckLevelZh}
            </h2>
            <p className="mt-1 text-xs uppercase tracking-widest text-[#9a8a6a]">{fortune.luckLevel}</p>
          </motion.div>

          <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#c9b990] to-transparent" />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-center text-[15px] leading-relaxed text-[#3a2a1a]"
          >
            {fortune.englishFortune}
          </motion.p>

          <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#c9b990] to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="flex justify-center gap-4 sm:gap-6"
          >
            {fortune.chinesePoem.map((line, i) => (
              <span
                key={i}
                className="font-serif-tc text-base font-semibold text-[#2a1c0e] sm:text-lg"
                style={{ writingMode: 'vertical-rl' }}
              >
                {line}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
        onClick={onReset}
        className="mt-6 rounded-full bg-[var(--color-temple-red)] px-6 py-2.5 text-sm font-semibold text-[#fdf0e0] shadow-md transition-transform hover:scale-105 hover:bg-[var(--color-temple-red-dark)] active:scale-95"
      >
        求 Draw Again
      </motion.button>
    </div>
  )
}
