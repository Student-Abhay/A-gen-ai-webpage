import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger);

/*
  ScrollSmoother requires a GSAP Club membership.
  If you don't have it, this component gracefully falls back
  to native scroll with no visual breakage.
*/

const HAS_SMOOTHER = typeof ScrollSmoother !== 'undefined';

export default function SmoothScroll({ children }) {
  const wrapper = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    if (!HAS_SMOOTHER) return;

    try {
      gsap.registerPlugin(ScrollSmoother);
      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
      });
      return () => smoother.kill();
    } catch {
      // club plugin missing — silent fallback
    }
  }, []);

  if (!HAS_SMOOTHER) return <>{children}</>;

  return (
    <div ref={wrapper} id="smooth-wrapper" className="overflow-hidden">
      <div ref={content} id="smooth-content">
        {children}
      </div>
    </div>
  );
}