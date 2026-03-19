// src/components/ScrollReveal.jsx
import { useRef, useEffect, useState, cloneElement, Children } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const presets = {
  fade: { autoAlpha: 0 },
  slideUp: { autoAlpha: 0, y: 80 },
  slideDown: { autoAlpha: 0, y: -80 },
  slideLeft: { autoAlpha: 0, x: 80 },
  slideRight: { autoAlpha: 0, x: -80 },
  scale: { autoAlpha: 0, scale: 0.85 },
  rotate: { autoAlpha: 0, rotate: 8, y: 40 },
  flip: { autoAlpha: 0, rotationX: 90, transformPerspective: 800 },
  blur: { autoAlpha: 0, filter: 'blur(12px)', y: 30 },
};

export default function ScrollReveal({
  children,
  preset = 'slideUp',
  duration = 1,
  delay = 0,
  ease = 'power3.out',
  stagger = 0.12,
  start = 'top 88%',
  end = 'bottom 20%',
  scrub = false,
  once = true,
  markers = false,
  className = '',
  as: Tag = 'div',
  threshold = 0,
  customFrom = null,
  customTo = null,
}) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current) return;

    const el = containerRef.current;
    const targets = el.querySelectorAll('[data-sr-item]');
    const animTargets = targets.length > 0 ? targets : [el];

    const fromVars = customFrom || presets[preset] || presets.slideUp;
    const toVars = customTo || {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      rotationX: 0,
      filter: 'blur(0px)',
      duration,
      delay,
      ease,
      stagger: animTargets.length > 1 ? stagger : 0,
    };

    gsap.set(animTargets, { ...fromVars, visibility: 'hidden' });

    const scrollConfig = {
      trigger: el,
      start,
      end,
      markers,
      toggleActions: once ? 'play none none none' : 'play reverse play reverse',
    };

    if (scrub) {
      scrollConfig.scrub = typeof scrub === 'number' ? scrub : 1;
      delete scrollConfig.toggleActions;
    }

    const tl = gsap.timeline({ scrollTrigger: scrollConfig });

    tl.fromTo(animTargets, fromVars, {
      ...toVars,
      visibility: 'visible',
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [ready, preset, duration, delay, ease, stagger, start, end, scrub, once, markers, customFrom, customTo]);

  return (
    <Tag ref={containerRef} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </Tag>
  );
}

/* ── Convenience wrapper: marks each child as a stagger target ── */
export function ScrollRevealGroup({
  children,
  preset = 'slideUp',
  stagger = 0.1,
  className = '',
  ...rest
}) {
  return (
    <ScrollReveal preset={preset} stagger={stagger} className={className} {...rest}>
      {Children.map(children, (child, i) =>
        child
          ? cloneElement(child, {
              'data-sr-item': '',
              key: child.key ?? i,
            })
          : null
      )}
    </ScrollReveal>
  );
}