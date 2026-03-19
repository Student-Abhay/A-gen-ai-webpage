// src/components/animations/TextReveal.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({
  children,
  as: Tag = 'div',
  variant = 'words',    // 'chars' | 'words' | 'lines' | 'mask' | 'scramble' | 'typewriter'
  stagger = 0.035,
  duration = 0.8,
  ease = 'power3.out',
  scrollTrigger = true,
  triggerStart = 'top 85%',
  triggerEnd = 'bottom 20%',
  delay = 0,
  className = '',
  scrub = false,
  once = true,
}) => {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const [scrambleText, setScrambleText] = useState('');
  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated.current) return;

    const text = typeof children === 'string' ? children : container.textContent;
    let ctx = gsap.context(() => {
      switch (variant) {
        case 'chars':
          animateChars(container, text);
          break;
        case 'words':
          animateWords(container, text);
          break;
        case 'lines':
          animateLines(container, text);
          break;
        case 'mask':
          animateMask(container, text);
          break;
        case 'scramble':
          animateScramble(container, text);
          break;
        case 'typewriter':
          animateTypewriter(container, text);
          break;
        default:
          animateWords(container, text);
      }
    }, container);

    return () => ctx.revert();
  }, [children, variant]);

  /* ─── CHAR-BY-CHAR ─── */
  const animateChars = (container, text) => {
    container.innerHTML = '';

    const wordSpans = text.split(' ').map((word) => {
      const wordWrapper = document.createElement('span');
      wordWrapper.style.cssText = 'display:inline-block;white-space:nowrap;';

      word.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.cssText =
          'display:inline-block;opacity:0;transform:translateY(120%) rotateX(-90deg);transform-origin:bottom;';
        span.classList.add('tr-char');
        wordWrapper.appendChild(span);
      });

      container.appendChild(wordWrapper);

      const spacer = document.createElement('span');
      spacer.innerHTML = '&nbsp;';
      spacer.style.display = 'inline-block';
      container.appendChild(spacer);
      return wordWrapper;
    });

    const allChars = container.querySelectorAll('.tr-char');

    const tl = gsap.timeline({
      paused: !scrollTrigger,
      delay,
      ...(scrollTrigger && {
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          end: triggerEnd,
          scrub: scrub ? 1 : false,
          once,
        },
      }),
    });

    tl.to(allChars, {
      opacity: 1,
      y: '0%',
      rotateX: 0,
      duration,
      stagger: stagger * 0.6,
      ease,
    });

    if (!scrollTrigger) tl.play();
  };

  /* ─── WORD-BY-WORD ─── */
  const animateWords = (container, text) => {
    container.innerHTML = '';

    const lineWrapper = document.createElement('div');
    lineWrapper.style.cssText = 'overflow:hidden;display:block;';

    text.split(' ').forEach((word, i) => {
      const outer = document.createElement('span');
      outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:4px;';

      const inner = document.createElement('span');
      inner.textContent = word;
      inner.style.cssText = 'display:inline-block;transform:translateY(110%);opacity:0;';
      inner.classList.add('tr-word');

      outer.appendChild(inner);
      lineWrapper.appendChild(outer);

      if (i < text.split(' ').length - 1) {
        const spacer = document.createElement('span');
        spacer.innerHTML = '&nbsp;';
        spacer.style.display = 'inline-block';
        lineWrapper.appendChild(spacer);
      }
    });

    container.appendChild(lineWrapper);
    const wordEls = container.querySelectorAll('.tr-word');

    const tl = gsap.timeline({
      paused: !scrollTrigger,
      delay,
      ...(scrollTrigger && {
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          end: triggerEnd,
          scrub: scrub ? 1 : false,
          once,
        },
      }),
    });

    tl.to(wordEls, {
      y: '0%',
      opacity: 1,
      duration,
      stagger,
      ease,
    });

    if (!scrollTrigger) tl.play();
  };

  /* ─── LINE-BY-LINE ─── */
  const animateLines = (container, text) => {
    container.innerHTML = '';

    const lines = text.split('\n').length > 1 ? text.split('\n') : splitIntoVisualLines(text, container);

    lines.forEach((line) => {
      const clipper = document.createElement('div');
      clipper.style.cssText = 'overflow:hidden;display:block;';

      const inner = document.createElement('div');
      inner.textContent = line.trim();
      inner.style.cssText = 'transform:translateY(105%);opacity:0;';
      inner.classList.add('tr-line');

      clipper.appendChild(inner);
      container.appendChild(clipper);
    });

    const lineEls = container.querySelectorAll('.tr-line');

    const tl = gsap.timeline({
      paused: !scrollTrigger,
      delay,
      ...(scrollTrigger && {
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          end: triggerEnd,
          scrub: scrub ? 1 : false,
          once,
        },
      }),
    });

    tl.to(lineEls, {
      y: '0%',
      opacity: 1,
      duration: duration * 1.2,
      stagger: stagger * 3,
      ease: 'power4.out',
    });

    if (!scrollTrigger) tl.play();
  };

  /* ─── MASK WIPE ─── */
  const animateMask = (container, text) => {
    container.style.cssText += 'position:relative;overflow:hidden;';

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:absolute;inset:0;
      background:linear-gradient(90deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3));
      transform:scaleX(0);transform-origin:left;z-index:2;
      border-radius:4px;
    `;
    overlay.classList.add('tr-mask');

    const textEl = document.createElement('span');
    textEl.textContent = text;
    textEl.style.cssText = 'opacity:0;display:inline-block;';
    textEl.classList.add('tr-mask-text');

    container.innerHTML = '';
    container.appendChild(textEl);
    container.appendChild(overlay);

    const tl = gsap.timeline({
      paused: !scrollTrigger,
      delay,
      ...(scrollTrigger && {
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          end: triggerEnd,
          once,
        },
      }),
    });

    tl.to(overlay, {
      scaleX: 1,
      duration: duration * 0.6,
      ease: 'power2.inOut',
    })
      .set(textEl, { opacity: 1 })
      .to(overlay, {
        scaleX: 0,
        transformOrigin: 'right',
        duration: duration * 0.5,
        ease: 'power2.inOut',
      });

    if (!scrollTrigger) tl.play();
  };

  /* ─── SCRAMBLE ─── */
  const animateScramble = (container, originalText) => {
    container.innerHTML = '';

    const textSpan = document.createElement('span');
    textSpan.classList.add('tr-scramble');
    container.appendChild(textSpan);

    const totalFrames = Math.ceil(duration * 60);
    let frame = 0;
    let rafId;

    const run = () => {
      const progress = frame / totalFrames;
      const revealedCount = Math.floor(progress * originalText.length);
      let display = '';

      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === ' ') {
          display += ' ';
        } else if (i < revealedCount) {
          display += originalText[i];
        } else {
          display += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }

      textSpan.textContent = display;
      frame++;

      if (frame <= totalFrames) {
        rafId = requestAnimationFrame(run);
      } else {
        textSpan.textContent = originalText;
      }
    };

    if (scrollTrigger) {
      ScrollTrigger.create({
        trigger: container,
        start: triggerStart,
        once,
        onEnter: () => {
          gsap.delayedCall(delay, run);
        },
      });
    } else {
      gsap.delayedCall(delay, run);
    }
  };

  /* ─── TYPEWRITER ─── */
  const animateTypewriter = (container, originalText) => {
    container.innerHTML = '';

    const textSpan = document.createElement('span');
    textSpan.classList.add('tr-typewriter-text');
    container.appendChild(textSpan);

    const cursor = document.createElement('span');
    cursor.textContent = '▌';
    cursor.style.cssText = 'display:inline-block;animation:tr-blink 0.7s step-end infinite;color:rgb(139,92,246);';
    container.appendChild(cursor);

    if (!document.getElementById('tr-blink-style')) {
      const style = document.createElement('style');
      style.id = 'tr-blink-style';
      style.textContent = `@keyframes tr-blink{0%,100%{opacity:1}50%{opacity:0}}`;
      document.head.appendChild(style);
    }

    const type = () => {
      let i = 0;
      const intervalId = setInterval(() => {
        textSpan.textContent = originalText.slice(0, i + 1);
        i++;
        if (i >= originalText.length) {
          clearInterval(intervalId);
          gsap.to(cursor, { opacity: 0, duration: 0.5, delay: 1.5 });
        }
      }, stagger * 1000);
    };

    if (scrollTrigger) {
      ScrollTrigger.create({
        trigger: container,
        start: triggerStart,
        once,
        onEnter: () => gsap.delayedCall(delay, type),
      });
    } else {
      gsap.delayedCall(delay, type);
    }
  };

  /* ─── HELPERS ─── */
  const splitIntoVisualLines = (text, container) => {
    const words = text.split(' ');
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = `
      position:absolute;visibility:hidden;white-space:normal;
      width:${container.offsetWidth}px;font:${getComputedStyle(container).font};
    `;
    document.body.appendChild(tempDiv);

    const lines = [];
    let currentLine = '';

    words.forEach((word) => {
      const test = currentLine ? `${currentLine} ${word}` : word;
      tempDiv.textContent = test;
      if (tempDiv.offsetHeight > parseFloat(getComputedStyle(tempDiv).lineHeight) * 1.5 && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = test;
      }
    });

    if (currentLine) lines.push(currentLine);
    document.body.removeChild(tempDiv);
    return lines.length ? lines : [text];
  };

  return (
    <Tag
      ref={containerRef}
      className={`${className}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </Tag>
  );
};

export default TextReveal;