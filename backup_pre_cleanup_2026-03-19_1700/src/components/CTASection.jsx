import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useInView from "../hooks/useInView";

export default function CTASection() {
  const ref = useRef(null);
  const isVisible = useInView(ref, { threshold: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="relative py-32 sm:py-40 overflow-hidden">
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="relative rounded-3xl border border-white/10 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-purple-600/20 to-pink-600/20" />
          <div className="absolute inset-0 backdrop-blur-xl" />

          {/* Animated border shimmer */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(6,182,212,0.15)_10%,transparent_20%)]"
            />
          </div>

          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Build the
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Future?
                </span>
              </h2>
              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
                Join thousands of teams shipping faster, scaling higher, and
                sleeping better with NEXUS infrastructure.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="group relative px-10 py-4 rounded-full bg-white text-black font-semibold text-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Start Free Trial
                </span>
              </button>

              <button className="px-10 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300">
                Talk to Sales
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-500 text-sm mt-8"
            >
              No credit card required · 14-day free trial · Cancel anytime
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}