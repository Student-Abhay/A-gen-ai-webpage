import { useEffect, useRef, useState } from 'react'
export default function useInView(options = {}) {
const ref = useRef(null)
const [isInView, setIsInView] = useState(false)
// FIX: stringify options so the effect re-runs if caller changes threshold etc.
const optKey = JSON.stringify(options)
useEffect(() => {
const el = ref.current
if (!el) return
const observer = new IntersectionObserver(
([entry]) => setIsInView(entry.isIntersecting),
{ threshold: 0.1, ...options }
)
observer.observe(el)
return () => observer.unobserve(el)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [optKey])
return [ref, isInView]
}