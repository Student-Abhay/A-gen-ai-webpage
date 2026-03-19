import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useInView from "../hooks/useInView";

const testimonials = [
  {
    quote:
      "NEXUS cut our page load times by 73%. Our conversion rate doubled within the first quarter. Nothing else comes close.",
    name: "Maren Solberg",
    role: "CTO, Vektora Systems",
    avatar: "MS",
  },
  {
    quote:
      "We migrated 14 microservices in a weekend. The developer experience is genuinely unmatched—everything just works.",
    name: "Daisuke Tanaka",
    role: "Lead Engineer, KaizenOps",
    avatar: "DT",
  },
  {
    quote:
      "The security audit was the smoothest we've ever run. Post-quantum encryption out of the box changed the game for our compliance team.",
    name: "Adaeze Okoro",
    role: "VP Security, Helix Financial",
    avatar: "AO",
  },
  {
    quote:
      "Our design team went from prototyping to production in half the time. The motion system is elegant and performant at once.",
    name: "Luca Ferreira",
    role: "Design Director, NovaBrand",
    avatar: "LF",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { threshold: 0.2 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const current = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
        </motion.div>

        {/* Quote Card */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="relative p-8 sm:p-12 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
                <span className="absolute top-4 left-6 text-6xl text-cyan-500/10 font-serif leading-none select-none">
                  "
                </span>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed italic mb-8 max-w-2xl">
                  {current.quote}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {current.avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">{current.name}</p>
                    <p className="text-gray-500 text-sm">{current.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "bg-cyan-400 w-8"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}