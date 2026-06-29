import { useEffect, useMemo, useState } from 'react'

const ScrollToTop = ({
  threshold = 600,
  label = 'Back to top',
  accent = 'var(--accent)',
}) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold)
    }


    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  const style = useMemo(
    () => ({
      position: 'fixed',
      right: 18,
      bottom: 18,
      zIndex: 9999,
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 0.2s ease',
      width: 46,
      height: 46,
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.14)',
      background: 'rgba(8,19,35,0.55)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: '#fff',
      boxShadow: '0 18px 50px rgba(0,0,0,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }),
    [visible]
  )

  return (
    <button
      type="button"
      style={style}
      aria-label={label}
      onClick={() => {
        const reduceMotion =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
      }}
    >
      <span aria-hidden="true" style={{ color: accent, fontSize: 18, lineHeight: 1 }}>
        ↑
      </span>
    </button>
  )
}

export default ScrollToTop

