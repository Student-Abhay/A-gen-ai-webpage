// src/components/FeaturesSection.jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Blazing Fast Pipelines",
    description:
      "Sub-50ms build times through edge-compiled modules and incremental invalidation. Your deploy pipeline finishes before your coffee cools.",
    gradient: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: "Adaptive Design Tokens",
    description:
      "A living design system that mutates with your brand. Tokens propagate across every component, every breakpoint — no stale stylesheets, ever.",
    gradient: "from-nexus-400 to-nexus-600",
    shadow: "shadow-nexus-500/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Multiplayer Editing",
    description:
      "CRDTs under the hood mean zero merge conflicts. Watch cursors dance across the canvas, each keystroke synced within 12ms over WebSocket.",
    gradient: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "AI Co-Pilot",
    description:
      "Context-aware suggestions that understand your codebase topology. Not autocomplete — an actual second pair of eyes scanning architecture.",
    gradient: "from-violet-400 to-purple-600",
    shadow: "shadow-violet-500/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Zero-Trust by Default",
    description:
      "Every request authenticated at the edge. Row-level security, encrypted state, and audit trails that satisfy SOC 2 without the paperwork migraine.",
    gradient: "from-rose-400 to-pink-600",
    shadow: "shadow-rose-500/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Composable Layouts",
    description:
      "Drag, nest, and reconfigure. Every section is a self-contained island with its own data scope, styles, and lifecycle hooks — fully tree-shakable.",
    gradient: "from-cyan-400 to-blue-500",
    shadow: "shadow-cyan-500/20",
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div className="relative h-full p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
        {/* Hover glow */}
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`}
        />

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} ${feature.shadow} shadow-lg flex items-center justify-center text-white mb-5`}
        >
          {feature.icon}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-gradient transition-all duration-300">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-nexus-400 group-hover:text-nexus-300 transition-colors duration-300">
          {feature.description}
        </p>

        {/* Bottom accent line */}
        <div
          className={`absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} transition-all duration-700`}
        />
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need.
            <span className="block text-gradient">Nothing You Don’t.</span>
          </h2>
          <p className="text-nexus-400 text-lg leading-relaxed">
            A modern platform engineered for velocity, collaboration, and
            security — designed to scale from side projects to global products.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}