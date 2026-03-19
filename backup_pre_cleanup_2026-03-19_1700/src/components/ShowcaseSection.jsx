import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useInView from "../hooks/useInView";

const showcaseItems = [
  {
    title: "Adaptive Intelligence",
    description:
      "Our neural engine processes 12 million data points per second, learning and evolving with every interaction to deliver hyper-personalized experiences.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
    tags: ["AI/ML", "Real-Time", "Personalization"],
  },
  {
    title: "Quantum-Grade Security",
    description:
      "256-bit post-quantum encryption shields every transaction. Zero-knowledge proofs ensure your data remains yours—always.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    tags: ["Encryption", "Zero-Knowledge", "Compliance"],
  },
  {
    title: "Distributed Edge Network",
    description:
      "Content served from 340+ edge nodes across six continents. Sub-14ms latency regardless of geography.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    tags: ["CDN", "Low Latency", "Global"],
  },
];

function ShowcaseCard({ item, index }) {
  const cardRef = useRef(null);
  const isVisible = useInView(cardRef, { threshold: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -80 : 80 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 lg:gap-16 items-center`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 space-y-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block text-cyan-400 text-sm font-mono tracking-widest uppercase"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-white leading-tight"
        >
          {item.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-400 text-lg leading-relaxed"
        >
          {item.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-xs font-mono tracking-wider text-cyan-300 border border-cyan-500/30 rounded-full bg-cyan-500/5 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button className="group/btn flex items-center gap-2 text-white font-medium mt-2 hover:text-cyan-400 transition-colors duration-300">
            Explore Feature
            <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-2">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ShowcaseSection() {
  const sectionRef = useRef(null);
  const headerVisible = useInView(sectionRef, { threshold: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      {/* Parallax accent */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Built for the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Impossible
            </span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Every component engineered to push beyond conventional limits.
          </p>
        </motion.div>

        {/* Showcase Cards */}
        <div className="space-y-32">
          {showcaseItems.map((item, i) => (
            <ShowcaseCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}