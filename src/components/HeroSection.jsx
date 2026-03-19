// src/components/HeroSection.jsx
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const STAGGER_CHARS = (text) =>
  text.split("").map((ch, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 60, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: 0.6 + i * 0.03,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-block"
    >
      {ch === " " ? "\u00A0" : ch}
    </motion.span>
  ));

export default function HeroSection() {
  const orbRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* floating orb animation */
      gsap.to(orbRef.current, {
        y: -20,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* grid perspective drift */
      gsap.fromTo(
        gridRef.current,
        { rotateX: 55, opacity: 0 },
        { rotateX: 55, opacity: 0.3, duration: 2, delay: 0.3, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Perspective grid floor */}
      <div
        ref={gridRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[60vh] opacity-0 pointer-events-none"
        style={{ perspective: "800px", transformStyle: "preserve-3d" }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Central glow orb */}
      <div
        ref={orbRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,.15) 0%, rgba(99,102,241,.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating accent rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-nexus-500/10 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-nexus-400/5 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nexus-500/10 border border-nexus-500/20 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-nexus-400 animate-pulse" />
          <span className="text-xs font-mono font-medium text-nexus-300 tracking-wide uppercase">
            Now in Public Beta
          </span>
        </motion.div>

        {/* Main headline */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-white mb-6">
          {STAGGER_CHARS("Build at the")}
          <br />
          <span className="text-gradient">{STAGGER_CHARS("Speed of Thought")}</span>
        </h1>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-nexus-400 leading-relaxed mb-10"
        >
          Nexus fuses real-time collaboration, AI-augmented workflows, and a
          design system that adapts to the way your team actually thinks — not
          the other way around.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="group relative px-8 py-3.5 font-semibold text-white bg-gradient-to-r from-nexus-500 to-nexus-600 rounded-2xl overflow-hidden shadow-xl shadow-nexus-500/20 hover:shadow-nexus-500/40 active:scale-[0.97] transition-all duration-300">
            <span className="relative z-10 flex items-center gap-2">
              Start Free
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-nexus-400 to-nexus-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button className="px-8 py-3.5 font-semibold text-nexus-300 border border-white/10 rounded-2xl hover:bg-white/5 hover:text-white hover:border-white/20 active:scale-[0.97] transition-all duration-300">
            View Demo
          </button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <span className="text-xs text-nexus-600 font-mono uppercase tracking-widest">
            Trusted by teams at
          </span>
          <div className="flex items-center gap-8 opacity-40">
            {["Vercel", "Stripe", "Linear", "Raycast", "Supabase"].map((name) => (
              <span
                key={name}
                className="text-sm font-display font-semibold text-nexus-400 tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-nexus-600 font-mono uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-nexus-700 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-nexus-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}