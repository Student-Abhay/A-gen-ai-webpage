import { lazy, Suspense } from 'react';
import SmoothScroll from './components/SmoothScroll';
import GlowCursor from './components/GlowCursor';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
const HeroSection = lazy(() => import('./components/HeroSection'));
const FeaturesSection = lazy(() => import('./components/FeaturesSection'));
const ShowcaseSection = lazy(() => import('./components/ShowcaseSection'));
const ParallaxSection = lazy(() => import('./components/ParallaxSection'));
const MetricsSection = lazy(() => import('./components/MatricesSection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const PricingSection = lazy(() => import('./components/PricingSection'));
const CTASection = lazy(() => import('./components/CTASection'));
const Footer = lazy(() => import('./components/Footer'));
function Loader() {
return (
<div className="flex items-center justify-center h-40">
<div className="w-8 h-8 rounded-full border-2 border-cyan-400
border-t-transparent animate-spin" />
</div>
);
}
export default function App() {
return (
<SmoothScroll>
<GlowCursor />
<ParticleField />
<Navbar />
<main className="relative z-10">
<Suspense fallback={<Loader />}><HeroSection /></Suspense>
<Suspense fallback={<Loader />}><FeaturesSection /></Suspense>
<Suspense fallback={<Loader />}><ShowcaseSection /></Suspense>
<Suspense fallback={<Loader />}><ParallaxSection /></Suspense>
<Suspense fallback={<Loader />}><MetricsSection /></Suspense>
<Suspense fallback={<Loader />}><TestimonialsSection /></Suspense>
<Suspense fallback={<Loader />}><PricingSection /></Suspense>
<Suspense fallback={<Loader />}><CTASection /></Suspense>
<Suspense fallback={<Loader />}><Footer /></Suspense>
</main>
</SmoothScroll>
);
}