// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollProgress from "../hooks/useScrollProgress";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Metrics", href: "#metrics" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#cta" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-nexus-950/80 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="relative group flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nexus-400 to-nexus-600 flex items-center justify-center shadow-lg shadow-nexus-500/25">
              <span className="text-white font-display font-bold text-sm">N</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">
              NEXUS
            </span>
            <div className="absolute -inset-2 rounded-xl bg-nexus-500/0 group-hover:bg-nexus-500/5 transition-colors duration-300" />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="relative px-4 py-2 text-sm font-medium text-nexus-300 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-nexus-400 to-nexus-600 group-hover:w-3/4 transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="px-5 py-2 text-sm font-medium text-nexus-300 hover:text-white transition-colors duration-200">
              Log in
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-nexus-500 to-nexus-600 rounded-xl hover:shadow-lg hover:shadow-nexus-500/25 active:scale-[0.97] transition-all duration-200">
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-end gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                className="block h-0.5 bg-white rounded-full origin-center"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: 12 } : { opacity: 1, x: 0 }}
                className="block h-0.5 w-4 bg-nexus-400 rounded-full"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7, width: 24 } : { rotate: 0, y: 0, width: 18 }}
                className="block h-0.5 bg-white rounded-full origin-center"
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>

        {/* Scroll Progress */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-nexus-400 via-nexus-500 to-nexus-600"
          style={{ width: `${progress * 100}%` }}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-nexus-950/95 backdrop-blur-3xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(link.href)}
                  className="text-3xl font-display font-bold text-nexus-200 hover:text-white py-3 transition-colors duration-200"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.4 }}
                className="mt-8 flex flex-col gap-3 w-full max-w-xs"
              >
                <button className="w-full py-3 text-base font-medium text-nexus-300 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                  Log in
                </button>
                <button className="w-full py-3 text-base font-semibold text-white bg-gradient-to-r from-nexus-500 to-nexus-600 rounded-xl hover:shadow-lg hover:shadow-nexus-500/25 transition-all">
                  Get Started
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}