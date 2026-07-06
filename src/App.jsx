import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Bucket from './components/Bucket'
import Cabinet from './components/Cabinet'
import FortuneCard from './components/FortuneCard'
import { useSound } from './hooks/useSound'

function App() {
  const [screen, setScreen] = useState('bucket') // bucket -> cabinet -> result
  const [drawnNumber, setDrawnNumber] = useState(null)
  const { playDraw, playChime } = useSound()

  const handleDrawComplete = useCallback((number) => {
    setDrawnNumber(number)
    setScreen('cabinet')
  }, [])

  const handleCabinetOpened = useCallback(() => {
    setScreen('result')
  }, [])

  const handleReset = useCallback(() => {
    setDrawnNumber(null)
    setScreen('bucket')
  }, [])

  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 15%, rgba(185,122,61,0.15), transparent 45%), radial-gradient(circle at 80% 85%, rgba(181,36,26,0.12), transparent 50%)',
        }}
      />
      <div className="relative z-10 flex h-svh w-full max-w-3xl flex-col">
        <AnimatePresence mode="wait">
          {screen === 'bucket' && (
            <motion.div
              key="bucket"
              className="flex h-full w-full flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Bucket onDrawComplete={handleDrawComplete} playDraw={playDraw} />
            </motion.div>
          )}
          {screen === 'cabinet' && (
            <motion.div
              key="cabinet"
              className="flex h-full w-full flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Cabinet drawnNumber={drawnNumber} onOpened={handleCabinetOpened} playChime={playChime} />
            </motion.div>
          )}
          {screen === 'result' && (
            <motion.div
              key="result"
              className="flex h-full w-full flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FortuneCard number={drawnNumber} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
