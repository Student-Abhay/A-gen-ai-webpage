// src/components/GlowCursor.jsx
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GlowCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    let mouseX = 0, mouseY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(cursor, {
        x: mouseX - 10,
        y: mouseY - 10,
        duration: 0.1,
        ease: 'power2.out',
      })
      gsap.to(follower, {
        x: mouseX - 150,
        y: mouseY - 150,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    const onEnterInteractive = () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: 'back.out(2)' })
      gsap.to(follower, { scale: 1.5, opacity: 0.15, duration: 0.4 })
    }

    const onLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
      gsap.to(follower, { scale: 1, opacity: 0.08, duration: 0.4 })
    }

    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll('a, button, [data-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    // Hide on mobile
    const mq = window.matchMedia('(pointer: coarse)')
    if (mq.matches) {
      cursor.style.display = 'none'
      follower.style.display = 'none'
    }

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-99999"
        style={{
          background: 'radial-gradient(circle, rgba(108,99,255,0.9) 0%, transparent 70%)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={followerRef}
        className="custom-cursor fixed top-0 left-0 w-75 h-75 rounded-full pointer-events-none z-9998 opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.6) 0%, rgba(108,99,255,0.3) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </>
  )
}