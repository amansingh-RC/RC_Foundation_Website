import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
const AnimatedReveal = ({
  children,
  animation = 'fadeUp',
  duration = 0.8,
  delay = 0,
  distance = 24,
  easing = 'power3.out',
  once = true,
  style,
  className,
}) => {
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) return

    let initialVars
    if (animation === 'fadeUp') {
      initialVars = { opacity: 0, y: distance }
    } else if (animation === 'fadeIn') {
      initialVars = { opacity: 0 }
    } else if (animation === 'scaleIn') {
      initialVars = { opacity: 0, scale: 0.98 }
    } else {
      initialVars = { opacity: 0, y: distance }
    }

    gsap.set(el, initialVars)

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return

        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: easing,
          onComplete: () => {
            if (once) io.disconnect()
          },
        })
      },
      { threshold: 0.2 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [animation, delay, distance, duration, easing, once])

  return (
    <div ref={rootRef} style={style} className={className}>
      {children}
    </div>
  )
}

export default AnimatedReveal

