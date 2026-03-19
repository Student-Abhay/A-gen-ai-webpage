import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  strength = 40,
  onClick,
  href,
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) / width;
    const deltaY = (e.clientY - centerY) / height;
    setPosition({ x: deltaX * strength, y: deltaY * strength });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const Tag = href ? motion.a : motion.button;
  const extraProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.6 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full
        px-8 py-4 font-semibold tracking-wide text-white
        bg-gradient-to-r from-cyan-500 to-violet-600
        shadow-[0_0_24px_rgba(6,182,212,0.35)]
        hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]
        transition-shadow duration-300 cursor-pointer select-none ${className}`}
      {...extraProps}
    >
      {/* shine sweep */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          group-hover:translate-x-full transition-transform duration-700"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Tag>
  );
}