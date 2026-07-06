import { useRef, useCallback } from 'react'

// Lightweight synthesized sound effects via WebAudio — no external asset files needed.
export function useSound() {
  const ctxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return null
      ctxRef.current = new AudioCtx()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playTone = useCallback(
    (ctx, { freq, start, duration, type = 'sine', gainPeak = 0.15, freqEnd }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, start)
      if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, start + duration)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(gainPeak, start + duration * 0.15)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + duration + 0.02)
    },
    []
  )

  const playRustle = useCallback(() => {
    const ctx = getCtx()
    if (!ctx) return
    const bufferSize = ctx.sampleRate * 0.25
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 2200
    filter.Q.value = 0.6
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25)
    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start()
  }, [getCtx])

  const playDraw = useCallback(() => {
    const ctx = getCtx()
    if (!ctx) return
    playRustle()
    playTone(ctx, { freq: 520, freqEnd: 780, start: ctx.currentTime + 0.05, duration: 0.35, type: 'triangle', gainPeak: 0.12 })
  }, [getCtx, playRustle, playTone])

  const playChime = useCallback(() => {
    const ctx = getCtx()
    if (!ctx) return
    ;[880, 1108, 1318].forEach((freq, i) => {
      playTone(ctx, { freq, start: ctx.currentTime + i * 0.09, duration: 0.5, type: 'sine', gainPeak: 0.08 })
    })
  }, [getCtx, playTone])

  return { playDraw, playChime }
}
