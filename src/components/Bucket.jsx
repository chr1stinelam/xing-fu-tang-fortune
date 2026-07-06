import { useMemo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toChineseNumeral } from '../data/fortunes'

const STICK_COUNT = 36

function useStickLayout() {
  return useMemo(() => {
    const sticks = []
    for (let i = 0; i < STICK_COUNT; i++) {
      const t = i / (STICK_COUNT - 1) // 0..1
      const baseAngle = (t - 0.5) * 26 + (Math.random() * 6 - 3) // -16..16 deg spread
      const xPercent = 49 + (t - 0.5) * 3 + (Math.random() * 3 - 1.5) // clustered near center like real bundled sticks
      const height = 260 + Math.random() * 90
      const redPortion = 0.3 + Math.random() * 0.15
      sticks.push({
        id: i,
        baseAngle,
        xPercent,
        height,
        redPortion,
        z: Math.round(100 - Math.abs(t - 0.5) * 100),
      })
    }
    return sticks
  }, [])
}

function Stick({ stick, mouseX, containerWidth, isDrawn, isOther, onDraw }) {
  const stickCenterX = containerWidth ? (stick.xPercent / 100) * containerWidth : 0
  let proximityTilt = 0
  let proximityLift = 0

  if (mouseX != null && containerWidth) {
    const dist = mouseX - stickCenterX
    const influence = Math.max(0, 1 - Math.abs(dist) / 100)
    proximityTilt = -Math.sign(dist) * influence * 6
    proximityLift = influence * -4
  }

  const maxTotalRotate = 21
  const idleRotate = Math.max(-maxTotalRotate, Math.min(maxTotalRotate, stick.baseAngle + proximityTilt))
  const idleY = proximityLift

  return (
    <motion.button
      type="button"
      aria-label={`Draw fortune stick ${stick.id + 1}`}
      onClick={() => onDraw(stick)}
      className="absolute bottom-0 flex origin-bottom justify-center cursor-pointer touch-manipulation"
      style={{
        left: `${stick.xPercent}%`,
        width: '28px',
        marginLeft: '-14px',
        zIndex: isDrawn ? 150 : stick.z,
      }}
      initial={false}
      animate={
        isDrawn
          ? { rotate: 0, y: -230, scale: 1.08, opacity: 1 }
          : isOther
            ? { rotate: stick.baseAngle * 0.6, y: 40, opacity: 0 }
            : { rotate: idleRotate, y: idleY, opacity: 1 }
      }
      transition={
        isDrawn
          ? { type: 'spring', stiffness: 80, damping: 15 }
          : isOther
            ? { duration: 0.7, ease: 'easeIn' }
            : { type: 'spring', stiffness: 140, damping: 26 }
      }
    >
      <div
        className="rounded-t-full rounded-b-sm shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
        style={{
          width: '7px',
          height: `${stick.height}px`,
          background: `linear-gradient(180deg,
            var(--color-stick-red) 0%,
            var(--color-stick-red) ${stick.redPortion * 100}%,
            var(--color-wood-light) ${stick.redPortion * 100}%,
            var(--color-wood) 70%,
            var(--color-wood-dark) 100%)`,
        }}
      />
      {isDrawn && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center whitespace-nowrap rounded-sm bg-[#f3e8d4] px-2 py-3 shadow-lg ring-1 ring-black/10"
        >
          <span className="font-brush text-lg font-bold leading-none text-[#1a1a1a]">第</span>
          <span className="font-brush text-xl font-bold leading-none text-[#1a1a1a] my-0.5">
            {toChineseNumeral(stick.drawnNumber)}
          </span>
          <span className="font-brush text-lg font-bold leading-none text-[#1a1a1a]">首</span>
          <span className="mt-1.5 rounded-full bg-[var(--color-temple-red)] px-1.5 py-0.5 text-[10px] font-bold leading-none text-[#fdf0e0]">
            No. {stick.drawnNumber}
          </span>
        </motion.div>
      )}
    </motion.button>
  )
}

export default function Bucket({ onDrawComplete, playDraw }) {
  const sticks = useStickLayout()
  const containerRef = useRef(null)
  const [mouseX, setMouseX] = useState(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [drawnStick, setDrawnStick] = useState(null)
  const [drawing, setDrawing] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setContainerWidth(rect.width)
    setMouseX(e.clientX - rect.left)
  }, [])

  const handleMouseLeave = useCallback(() => setMouseX(null), [])

  const handleDraw = useCallback(
    (stick) => {
      if (drawing) return
      setDrawing(true)
      const drawnNumber = 1 + Math.floor(Math.random() * 100)
      setDrawnStick({ ...stick, drawnNumber })
      playDraw?.()
      setTimeout(() => {
        onDrawComplete(drawnNumber)
      }, 3000)
    },
    [drawing, onDrawComplete, playDraw]
  )

  return (
    <div className="flex h-full w-full flex-col items-center justify-end px-4 pb-0">
      <motion.div
        className="mb-6 text-center"
        animate={{ opacity: drawing ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: drawing ? 'none' : 'auto' }}
      >
        <h1 className="font-brush text-3xl font-bold text-[#3a2a1a] sm:text-4xl">求籤問卜</h1>
        <p className="mt-2 text-sm text-[#7a6a55] sm:text-base">
          Reach in and draw a fortune stick — click any stick to reveal your number.
        </p>
      </motion.div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex h-[420px] w-full max-w-md items-end justify-center sm:h-[460px]"
      >
        <AnimatePresence>
          {sticks.map((stick) =>
            drawnStick && drawnStick.id !== stick.id ? (
              <Stick key={stick.id} stick={stick} isOther onDraw={() => {}} />
            ) : (
              <Stick
                key={stick.id}
                stick={drawnStick && drawnStick.id === stick.id ? drawnStick : stick}
                mouseX={mouseX}
                containerWidth={containerWidth}
                isDrawn={drawnStick?.id === stick.id}
                onDraw={handleDraw}
              />
            )
          )}
        </AnimatePresence>

        {/* Canister */}
        <div className="pointer-events-none relative z-[100] mb-[-4px] h-[190px] w-[150px] sm:h-[210px] sm:w-[170px]">
          <div className="bg-lacquer absolute inset-0 rounded-b-2xl rounded-t-lg shadow-[0_10px_25px_rgba(0,0,0,0.4)]" />
          <div className="absolute inset-x-3 top-3 bottom-3 rounded-lg ring-1 ring-white/10" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-0.5">
            <span className="font-brush text-lg font-bold text-stroke-gold sm:text-xl">幸福堂</span>
            <span className="text-[9px] tracking-[0.2em] text-stroke-gold opacity-80 sm:text-[10px]">
              XING FU TANG
            </span>
          </div>
          <div className="absolute inset-x-0 top-0 h-3 rounded-t-lg bg-gradient-to-b from-white/10 to-transparent" />
        </div>
      </div>

      {drawing && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 mb-8 text-sm text-[#7a6a55]"
        >
          Your fortune is being revealed...
        </motion.p>
      )}
      {!drawing && <div className="mt-10 mb-8 h-5" />}
    </div>
  )
}
