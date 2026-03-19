import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useInView from "../hooks/useInView";

const metrics = [
  { value: 99.99, suffix: "%", label: "Uptime SLA", decimals: 2 },
  { value: 14, suffix: "ms", label: "Avg. Latency", decimals: 0 },
  { value: 340, suffix: "+", label: "Edge Nodes", decimals: 0 },
  { value: 12, suffix: "M", label: "Requests / Sec", decimals: 0 },
];

function AnimatedCounter({ target, suffix, decimals, trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let frame;
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [trigger, target]);

  return (
    <span className="tabular-nums">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  const ref = useRef(null);
  const isVisible = useInView(ref, { threshold: 0.4 });

  return (
    <section ref={ref} className="relative py-28 sm:py-36 overflow-hidden">
      {/* Divider lines */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Numbers That Speak
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Infrastructure performance measured in real-time across our global
            network.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="group relative text-center p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-cyan-500/20 transition-colors duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <p className="text-4xl sm:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  <AnimatedCounter
                    target={m.value}
                    suffix={m.suffix}
                    decimals={m.decimals}
                    trigger={isVisible}
                  />
                </p>
                <p className="text-sm text-gray-500 font-mono tracking-wider uppercase">
                  {m.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}