import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FloatingCard from './FloatingCard';
import MagneticButton from './MagneticButton';

const plans = [
  {
    name: 'Starter',
    price: '0',
    description: 'Everything you need to prototype at velocity.',
    features: [
      '3 active projects',
      'Community support',
      '5 GB asset storage',
      'Basic analytics dashboard',
    ],
    cta: 'Get Started',
    highlighted: false,
    glow: 'rgba(6,182,212,0.12)',
  },
  {
    name: 'Pro',
    price: '29',
    description: 'Unlimited power for teams shipping at scale.',
    features: [
      'Unlimited projects',
      'Priority support — 4 h SLA',
      '100 GB asset storage',
      'Advanced analytics & A/B',
      'Custom domain + SSL',
      'Team roles & permissions',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
    glow: 'rgba(139,92,246,0.25)',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated infra, compliance, and white-glove onboarding.',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'SSO / SAML',
      '99.99 % uptime SLA',
      'Custom integrations',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    highlighted: false,
    glow: 'rgba(236,72,153,0.12)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-32 px-6 bg-gray-950 overflow-hidden"
    >
      {/* ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px]
        rounded-full bg-violet-600/[0.06] blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest
            uppercase text-cyan-300 border border-cyan-400/20 bg-cyan-400/5 mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Transparent Plans, Zero Surprises
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Start free. Scale when you're ready. No credit card required.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={cardVariants}>
              <FloatingCard
                glowColor={plan.glow}
                className={`flex flex-col h-full ${
                  plan.highlighted
                    ? 'border-violet-500/40 ring-1 ring-violet-500/20'
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1
                    rounded-full text-[11px] font-bold tracking-widest uppercase
                    bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed min-h-[48px]">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  {plan.price !== 'Custom' && (
                    <span className="text-sm text-gray-500 self-start mt-2">$</span>
                  )}
                  <span className="text-5xl font-extrabold tracking-tight text-white">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="text-sm text-gray-500 mb-1.5">/mo</span>
                  )}
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                      <svg
                        className="mt-0.5 w-4 h-4 shrink-0 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <MagneticButton
                    strength={24}
                    className={`w-full text-sm ${
                      plan.highlighted
                        ? ''
                        : 'bg-gradient-to-r from-white/10 to-white/5 shadow-none hover:shadow-[0_0_24px_rgba(255,255,255,0.08)]'
                    }`}
                  >
                    {plan.cta}
                  </MagneticButton>
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}