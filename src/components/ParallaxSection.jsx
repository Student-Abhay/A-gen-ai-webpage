import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      tl.to(orb1.current, { y: -180, x: 40, scale: 1.15 }, 0)
        .to(orb2.current, { y: -260, x: -60, scale: 0.9 }, 0)
        .to(orb3.current, { y: -140, rotate: 30 }, 0)
        .to(headingRef.current, { y: -90 }, 0)
        .to(subRef.current, { y: -50 }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center
        bg-linear-to-b from-gray-950 via-[#0a0f1e] to-gray-950"
    >
      {/* floating orbs */}
      <div
        ref={orb1}
        className="absolute w-72 h-72 rounded-full
          bg-cyan-500/10 blur-3xl top-[10%] left-[15%]"
      />
      <div
        ref={orb2}
        className="absolute w-96 h-96 rounded-full
          bg-violet-600/10 blur-3xl top-[30%] right-[10%]"
      />
      <div
        ref={orb3}
        className="absolute w-64 h-64 rounded-full
          bg-fuchsia-500/10 blur-3xl bottom-[15%] left-[40%]"
      />

      {/* grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold tracking-tight
            bg-linear-to-r from-cyan-300 via-violet-400 to-fuchsia-400
            bg-clip-text text-transparent leading-tight"
        >
          Built for the Next Decade
        </h2>
        <p
          ref={subRef}
          className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Every interaction engineered at sub-frame precision. Scroll, hover,
          drag—each gesture resolves into motion that feels physical, inevitable,
          like light bending through glass.
        </p>
      </div>

      {/* horizontal scan line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />
    </section>
  );
}