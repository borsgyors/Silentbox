import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { openQuoteRequest } from './QuoteRequest';
import { useLanguage } from './LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const ambientLightRef = useRef<HTMLDivElement>(null);
  const imageLightRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    let frame = 0;

    const updateLight = (x: number, y: number) => {
      const ambient = `radial-gradient(circle at ${x}% ${y}%, rgba(42, 168, 132, 0.32), transparent 50%)`;
      const image = `radial-gradient(circle at ${x}% ${y}%, rgba(31, 111, 139, 0.24), transparent 70%)`;

      if (ambientLightRef.current) {
        ambientLightRef.current.style.background = ambient;
      }

      if (imageLightRef.current) {
        imageLightRef.current.style.background = image;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateLight(
          (event.clientX / window.innerWidth) * 100,
          (event.clientY / window.innerHeight) * 100
        );
      });
    };

    updateLight(50, 45);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-[var(--graphite)] via-[#1f5d78] to-[var(--charcoal)]"
      style={{ opacity }}
    >
      <motion.div
        ref={ambientLightRef}
        className="absolute inset-0 opacity-30"
      />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

      <motion.div
        style={{ y }}
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-start px-4 pb-8 pt-24 text-center sm:px-6 sm:pt-28 xl:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 sm:mb-6"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--sage-green)] sm:text-base">
            Atlasz Silent Boxes
          </p>
          <h1
            className="text-[var(--warm-white)]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.75rem)',
              fontWeight: 600,
              lineHeight: 1,
              fontFamily: 'Manrope, sans-serif',
            }}
          >
            {t('heroTitle')}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[clamp(360px,calc(100svh-15rem),680px)] w-full max-w-7xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-transparent to-transparent z-10" />
          <motion.img
            src="https://images.unsplash.com/photo-1594235045856-a6315f0c4083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBvZmZpY2UlMjBib290aCUyMGFjb3VzdGljJTIwcG9kJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzg2NzgyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Silent Box acoustic booth"
            className="h-full w-full rounded-3xl object-cover object-center shadow-2xl"
            style={{
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            }}
          />
          <div
            ref={imageLightRef}
            className="absolute inset-0 rounded-3xl opacity-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/15 bg-[var(--graphite)]/55 p-4 text-left shadow-2xl shadow-black/20 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[25rem] sm:p-5 lg:bottom-8 lg:left-8 lg:max-w-[28rem]"
          >
            <p
              className="mb-5 text-[var(--soft-gray)]"
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.25rem)',
                fontWeight: 400,
                lineHeight: 1.55,
              }}
            >
              {t('heroBody')}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openQuoteRequest}
                className="group rounded-xl bg-[var(--warm-white)] px-6 py-4 text-[var(--graphite)] transition-all duration-300 hover:shadow-2xl hover:shadow-white/10"
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  {t('requestQuote')}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-xl border border-[var(--soft-gray)]/30 bg-white/5 px-6 py-4 text-[var(--warm-white)] backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-[var(--soft-gray)]/50"
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                {t('exploreModels')}
              </motion.button>
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                {t('trustedBy')}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/75">
                <span>Northstar</span>
                <span>UrbanLab</span>
                <span>StudioWorks</span>
                <span>Arc Offices</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

    </motion.section>
  );
}
