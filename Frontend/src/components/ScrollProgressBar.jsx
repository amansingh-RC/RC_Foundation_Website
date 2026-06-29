import { useEffect, useMemo, useState } from 'react'

const ScrollProgressBar = ({
  height = 3,
  color = 'var(--accent)',
  position = 'fixed',
  zIndex = 9999,
}) => {
  const [progress, setProgress] = useState(0)


  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) return

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const doc = document.documentElement
        const total = Math.max(1, doc.scrollHeight - doc.clientHeight)
        setProgress((doc.scrollTop / total) * 100)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const style = useMemo(
    () => ({
      position,
      zIndex,
      top: 0,
      left: 0,
      height,
      width: `${progress}%`,
      background: color,
      boxShadow: `0 0 16px rgba(201, 162, 39, 0.35)`,
      transition: 'width 0.1s linear',
      pointerEvents: 'none',
    }),
    [height, color, position, zIndex, progress]
  )


  return <div style={style} aria-hidden="true" />
}

export default ScrollProgressBar

