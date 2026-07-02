import { useEffect, useMemo, useState } from 'react'

const ScrollToTop = ({
  threshold = 600,
  label = 'Back to top',
  accent = '#ffffff',
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
      borderRadius: 14,
      border: 'none',
      background: 'linear-gradient(135deg, #d4a24e, #b58a1f)',
      color: '#fff',
      boxShadow: '0 12px 30px rgba(181,138,31,0.35)',
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

