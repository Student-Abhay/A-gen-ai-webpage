// src/components/animations/HorizontalScroll.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = ({
  children,
  className = '',
  panelClassName = '',
  speed = 1,
  snap = false,
  showProgress = true,
  sectionLabel = '',
}) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const panels = gsap.utils.toArray(track.children);
    if (!panels.length) return;

    let ctx = gsap.context(() => {
      // total width the track needs to travel
      const totalScroll = track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll * speed}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          ...(snap && {
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: { min: 0.2, max: 0.6 },
              ease: 'power2.inOut',
            },
          }),
        },
      });

      tl.to(track, {
        x: -totalScroll,
        ease: 'none',
      });

      // progress bar
      if (showProgress && progressRef.current) {
        tl.to(
          progressRef.current,
          {
            scaleX: 1,
            ease: 'none',
          },
          0
        );
      }

      // per-panel parallax + reveal
      panels.forEach((panel, i) => {
        const img = panel.querySelector('.hs-parallax-img');
        const content = panel.querySelector('.hs-content');

        if (img) {
          gsap.fromTo(
            img,
            { x: 80 },
            {
              x: -80,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tl,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tl,
                start: 'left 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [children, speed, snap, showProgress]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,10,30,0.6) 100%)' }}
    >
      {/* ── top label + progress ── */}
      {(sectionLabel || showProgress) && (
        <div className="absolute top-0 left-0 z-20 w-full px-6 pt-6 md:px-12 md:pt-10">
          {sectionLabel && (
            <span
              className="inline-block mb-3 text-xs font-semibold tracking-[0.25em] uppercase"
              style={{ color: 'rgba(139,92,246,0.8)' }}
            >
              {sectionLabel}
            </span>
          )}
          {showProgress && (
            <div
              className="h-[2px] w-full rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <div
                ref={progressRef}
                className="h-full origin-left rounded-full"
                style={{
                  transform: 'scaleX(0)',
                  background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ── horizontal track ── */}
      <div
        ref={trackRef}
        className="flex items-stretch h-screen will-change-transform"
        style={{ width: 'max-content' }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div
                key={i}
                className={`relative flex-shrink-0 flex items-center justify-center h-full ${panelClassName}`}
                style={{ width: '100vw' }}
              >
                {child}
              </div>
            ))
          : children}
      </div>

      {/* ── scroll hint (fades after first scroll) ── */}
      <ScrollHint containerRef={sectionRef} />
    </section>
  );
};

/* ── tiny self-dismissing scroll hint ── */
const ScrollHint = ({ containerRef }) => {
  const hintRef = useRef(null);

  useEffect(() => {
    if (!hintRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // pulse
      gsap.to(hintRef.current, {
        x: 10,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: 'power1.inOut',
      });

      // fade out once user starts scrolling into the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100',
        onUpdate: (self) => {
          gsap.set(hintRef.current, { opacity: 1 - self.progress });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={hintRef}
      className="absolute z-20 flex items-center gap-2 text-xs tracking-widest uppercase bottom-8 right-8 md:bottom-12 md:right-12"
      style={{ color: 'rgba(255,255,255,0.3)' }}
    >
      <span>Scroll</span>
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 6h16m0 0l-4-4.5M17 6l-4 4.5" />
      </svg>
    </div>
  );
};

export default HorizontalScroll;