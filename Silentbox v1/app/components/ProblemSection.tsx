import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const noiseBars = [34, 58, 44, 72, 39, 64, 48, 76];

export default function ProblemSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const noiseOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0, 0]);
  const silenceOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0, 1, 1]);

  return (
    <section ref={containerRef} className="relative py-32 px-6 bg-[var(--soft-gray)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2
            className="mb-6 text-[var(--graphite)]"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              fontFamily: 'Manrope, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {t('problemTitle')}
          </h2>
          <p
            className="mx-auto max-w-3xl text-[var(--charcoal)]"
            style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
          >
            {t('problemBody')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{ opacity: noiseOpacity }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a]"
          >
            <img
              src="https://images.unsplash.com/photo-1727857714181-1019d2d5f9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBvZmZpY2UlMjBib290aCUyMGFjb3VzdGljJTIwcG9kJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzg2NzgyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt={t('problemBusyAlt')}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <Volume2 className="w-16 h-16 text-amber-400 mb-4" />
              <motion.div
                className="flex h-20 items-end gap-2"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {noiseBars.map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-1 origin-bottom rounded-full bg-amber-400"
                    style={{ height }}
                    animate={{
                      scaleY: [0.65, 1, 0.75],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
              <p className="mt-6 text-white text-xl font-medium">85 dB</p>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: silenceOpacity }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--sage-green)] to-[var(--wood-beige)]"
          >
            <img
              src="https://images.unsplash.com/photo-1594235045856-a6315f0c4083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBvZmZpY2UlMjBib290aCUyMGFjb3VzdGljJTIwcG9kJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzg2NzgyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt={t('problemSilentAlt')}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--graphite)] to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <VolumeX className="w-16 h-16 text-[var(--sage-green)] mb-4" />
              <div className="flex gap-2">
                {noiseBars.map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-[var(--sage-green)] rounded-full"
                    style={{ height: i < 3 ? '8px' : '4px' }}
                  />
                ))}
              </div>
              <p className="mt-6 text-white text-xl font-medium">30 dB</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 grid md:grid-cols-3 gap-8"
        >
          {[
            { stat: '86%', label: t('problemStat1') },
            { stat: '65%', label: t('problemStat2') },
            { stat: '23min', label: t('problemStat3') },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div
                className="mb-2 text-[var(--graphite)]"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 600,
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {item.stat}
              </div>
              <p
                className="text-[var(--charcoal)]"
                style={{ fontSize: '1rem', lineHeight: 1.5 }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
