import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { toChineseNumeral } from '../data/fortunes'

const TOTAL_DRAWERS = 100
const COLUMNS = 10

export default function Cabinet({ drawnNumber, onOpened, playChime }) {
  const [phase, setPhase] = useState('grid') // grid -> highlight -> open
  const drawers = useMemo(() => Array.from({ length: TOTAL_DRAWERS }, (_, i) => i + 1), [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('highlight'), 1100)
    const t2 = setTimeout(() => {
      setPhase('open')
    }, 3100)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const handleContinue = () => {
    if (phase !== 'open') return
    playChime?.()
    onOpened(drawnNumber)
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-3 py-6">
      <p className="mb-10 text-center text-sm text-[#7a6a55]">
        {phase === 'open' ? (
          <>
            Tap the open drawer <span className="font-bold text-[#3a2a1a]">第{toChineseNumeral(drawnNumber)}首</span> to
            reveal your fortune
          </>
        ) : (
          <>
            Locating drawer <span className="font-bold text-[#3a2a1a]">第{toChineseNumeral(drawnNumber)}首</span>...
          </>
        )}
      </p>

      <div className="relative w-full max-w-lg">
        {/* Ribbon + pom-poms */}
        <div className="pointer-events-none absolute -top-6 left-4 z-10 flex gap-1">
          <PomPom />
        </div>
        <div className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2">
          <PomPom size="lg" />
        </div>
        <div className="pointer-events-none absolute -top-6 right-4 z-10 flex gap-1">
          <PomPom />
        </div>
        <Ribbon side="left" />
        <Ribbon side="right" />

        {/* Carved wood header */}
        <div className="relative z-0 mx-2 rounded-t-2xl bg-gradient-to-b from-[#c98f4c] to-[#a06a2e] px-4 py-3 shadow-inner">
          <div className="flex items-center justify-center gap-2 text-[#3a2410]">
            <div className="h-px flex-1 bg-[#3a2410]/30" />
            <span className="font-brush text-lg font-bold tracking-widest">幸福堂籤櫃</span>
            <div className="h-px flex-1 bg-[#3a2410]/30" />
          </div>
        </div>

        {/* Drawer grid */}
        <div className="bg-wood-grain mx-2 rounded-b-2xl p-2 shadow-[inset_0_4px_12px_rgba(0,0,0,0.35)]">
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))` }}
          >
            {drawers.map((n) => {
              const isTarget = n === drawnNumber
              const clickable = isTarget && phase === 'open'
              return (
                <motion.div
                  key={n}
                  onClick={clickable ? handleContinue : undefined}
                  className={`relative aspect-square rounded-[2px] border border-[#5c3517]/60 bg-gradient-to-b from-[#8a5a2c] to-[#6b431f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${clickable ? 'cursor-pointer' : ''}`}
                  animate={
                    isTarget && phase === 'highlight'
                      ? {
                          boxShadow: [
                            '0 0 0px 0px rgba(216,182,98,0)',
                            '0 0 12px 3px rgba(216,182,98,0.9)',
                            '0 0 4px 1px rgba(216,182,98,0.6)',
                          ],
                        }
                      : isTarget && phase === 'open'
                        ? {
                            y: [10, 6, 10],
                            scale: 1.35,
                            zIndex: 20,
                            boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                          }
                        : { boxShadow: '0 0 0px 0px rgba(0,0,0,0)' }
                  }
                  transition={
                    isTarget && phase === 'highlight'
                      ? { duration: 1, repeat: 1, repeatType: 'reverse' }
                      : isTarget && phase === 'open'
                        ? { y: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }, default: { type: 'spring', stiffness: 140, damping: 16 } }
                        : { type: 'spring', stiffness: 140, damping: 16 }
                  }
                  style={{ zIndex: isTarget ? 10 : 1 }}
                >
                  <span className="absolute inset-0 flex items-start justify-center pt-1 text-[6px] font-bold text-[#f0dfa8]/90 sm:text-[8px]">
                    {toChineseNumeral(n)}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function PomPom({ size = 'sm' }) {
  const dim = size === 'lg' ? 32 : 22
  return (
    <div
      className="rounded-full bg-[radial-gradient(circle_at_35%_30%,#e2685c,var(--color-temple-red)_60%,var(--color-temple-red-dark)_100%)] shadow-md"
      style={{ width: dim, height: dim }}
    />
  )
}

function Ribbon({ side }) {
  return (
    <div
      className={`absolute -top-3 z-[5] h-16 w-10 bg-gradient-to-b from-[var(--color-temple-red)] to-[var(--color-temple-red-dark)] shadow-md ${
        side === 'left' ? 'left-0 -rotate-6 rounded-tl-md' : 'right-0 rotate-6 rounded-tr-md'
      }`}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
    />
  )
}
