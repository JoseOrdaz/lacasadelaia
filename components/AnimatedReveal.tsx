'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'fade'
}

export default function AnimatedReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hiddenClass =
    direction === 'up'
      ? 'opacity-0 translate-y-6'
      : 'opacity-0'

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : hiddenClass} ${className}`}
    >
      {children}
    </div>
  )
}
