import { useEffect, useMemo, useState } from 'react'

export default function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false)
  const normalizedOptions = useMemo(() => ({ threshold: 0.1, ...options }), [options])

  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      normalizedOptions
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
      observer.disconnect()
    }
  }, [ref, normalizedOptions])

  return isInView
}
