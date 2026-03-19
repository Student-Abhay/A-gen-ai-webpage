import { useState, useEffect } from 'react'
export default function useScrollProgress() {
const [progress, setProgress] = useState(0)
useEffect(() => {
const handler = () => {
const scrolled = window.scrollY
const total = document.documentElement.scrollHeight - window.innerHeight
setProgress(total > 0 ? scrolled / total : 0)
}
window.addEventListener('scroll', handler, { passive: true })
return () => window.removeEventListener('scroll', handler)
}, [])
return progress
}