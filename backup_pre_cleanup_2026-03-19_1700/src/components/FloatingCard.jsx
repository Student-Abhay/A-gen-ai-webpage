import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function FloatingCard({
  children,
  className = '',
  glowColor = 'rgba(6,182,212,0.15)',
}) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), {
    stiffness: 260,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), {
    stiffness: 260,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        boxShadow: `0 8px 60px ${glowColor}`,
      }}
      className={`relative rounded-2xl border border-white/10
        bg-white/[0.04] backdrop-blur-xl p-6
        transition-colors duration-300 hover:border-cyan-400/30 ${className}`}
    >
      {/* inner glow orb */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0
          hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x,50%) var(--mouse-y,50%),
            ${glowColor}, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}