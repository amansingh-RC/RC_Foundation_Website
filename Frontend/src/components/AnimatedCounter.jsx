import { useEffect, useMemo, useRef, useState } from 'react'

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))


/**
 * AnimatedCounter
 * - Animates from 0 to `value` once when visible.
 * - Supports values like: "10,000+" (commas) and optional suffix (+, etc).
 */
const AnimatedCounter = ({
  value,
  duration = 1100,
  delay = 0,
  once = true,
  className,
  style,
  decimals = 0,
  suffix = '',
}) => {
  const rootRef = useRef(null)
  const [display, setDisplay] = useState(0)

  const parsed = useMemo(() => {
    // Extract numeric part
    // e.g. "10,000+" -> { num: 10000, suffix: "+" }
    const str = String(value ?? '')
    const m = str.replace(/\s/g, '').match(/([0-9.,]+)(.*)/)
    const numStr = m?.[1] ?? '0'
    const rest = m?.[2] ?? ''

    const num = Number(numStr.replace(/,/g, ''))
    return {
      num: Number.isFinite(num) ? num : 0,
      suffix: suffix || rest,
    }
  }, [value, suffix])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      // Avoid calling setState synchronously during effect render.
      queueMicrotask(() => setDisplay(parsed.num))
      return
    }


    let raf = 0
    let start = 0
    let running = false

    const step = (ts) => {
      if (!running) return
      if (!start) start = ts
      const t = clamp((ts - start - delay) / duration, 0, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      const current = parsed.num * eased
      setDisplay(current)

      if (t < 1) {
        raf = requestAnimationFrame(step)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        running = true
        raf = requestAnimationFrame(step)
        if (once) io.disconnect()
      },
      { threshold: 0.35 }
    )

    io.observe(el)

    return () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [delay, duration, once, parsed.num])

  const formatted = useMemo(() => {
    const opts = {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }
    const str = Number(display).toLocaleString(undefined, opts)
    return `${str}${parsed.suffix}`
  }, [display, decimals, parsed.suffix])

  return (
    <span ref={rootRef} className={className} style={style} aria-label={`Counter: ${formatted}`}>
      {formatted}
    </span>
  )
}

export default AnimatedCounter

