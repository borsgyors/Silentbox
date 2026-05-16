import { motion } from 'motion/react';
import { useState } from 'react';
import { Wind, Volume2, Lightbulb, Armchair, Cpu, Zap, Leaf } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const hotspots = [
  {
    id: 'ventilation',
    icon: Wind,
    title: 'hotspotVentTitle',
    description: 'hotspotVentDesc',
    position: { top: '15%', left: '20%' },
  },
  {
    id: 'sound',
    icon: Volume2,
    title: 'hotspotSoundTitle',
    description: 'hotspotSoundDesc',
    position: { top: '35%', left: '75%' },
  },
  {
    id: 'lighting',
    icon: Lightbulb,
    title: 'hotspotLightTitle',
    description: 'hotspotLightDesc',
    position: { top: '10%', right: '15%' },
  },
  {
    id: 'seating',
    icon: Armchair,
    title: 'hotspotSeatTitle',
    description: 'hotspotSeatDesc',
    position: { bottom: '30%', left: '50%' },
  },
  {
    id: 'sensors',
    icon: Cpu,
    title: 'hotspotSensorsTitle',
    description: 'hotspotSensorsDesc',
    position: { top: '45%', right: '20%' },
  },
  {
    id: 'power',
    icon: Zap,
    title: 'hotspotPowerTitle',
    description: 'hotspotPowerDesc',
    position: { bottom: '20%', right: '30%' },
  },
  {
    id: 'eco',
    icon: Leaf,
    title: 'hotspotEcoTitle',
    description: 'hotspotEcoDesc',
    position: { top: '60%', left: '15%' },
  },
];

export default function InteractiveBooth() {
  const { t } = useLanguage();
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-[var(--soft-gray)] to-[var(--warm-white)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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
            {t('interactiveTitle')}
          </h2>
          <p
            className="mx-auto max-w-2xl text-[var(--charcoal)]"
            style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
          >
            {t('interactiveBody')}
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] rounded-3xl bg-gradient-to-br from-[var(--charcoal)] to-[var(--graphite)]"
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1646153389640-958d7ba1a864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBvZmZpY2UlMjBib290aCUyMGFjb3VzdGljJTIwcG9kJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzg2NzgyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Interactive booth"
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--graphite)]/60 to-transparent" />
            </div>

            {hotspots.map((hotspot, index) => (
              <motion.div
                key={hotspot.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className={`absolute ${activeHotspot === hotspot.id ? 'z-30' : 'z-10'}`}
                style={hotspot.position}
              >
                <motion.button
                  onHoverStart={() => setActiveHotspot(hotspot.id)}
                  onHoverEnd={() => setActiveHotspot(null)}
                  onFocus={() => setActiveHotspot(hotspot.id)}
                  onBlur={() => setActiveHotspot(null)}
                  onClick={() =>
                    setActiveHotspot((current) =>
                      current === hotspot.id ? null : hotspot.id
                    )
                  }
                  aria-label={t(hotspot.title)}
                  whileHover={{ scale: 1.2 }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      scale: activeHotspot === hotspot.id ? [1, 1.5, 1] : 1,
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-[var(--sage-green)]/30 blur-xl"
                  />
                  <div className="relative w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl border border-white/20 cursor-pointer">
                    <hotspot.icon className="w-5 h-5 text-[var(--graphite)]" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.92 }}
                    animate={
                      activeHotspot === hotspot.id
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 8, scale: 0.92 }
                    }
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-1/2 mb-4 w-64 -translate-x-1/2 origin-bottom rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-xl pointer-events-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--sage-green)]/10 flex items-center justify-center flex-shrink-0">
                        <hotspot.icon className="w-5 h-5 text-[var(--sage-green)]" />
                      </div>
                      <div>
                        <h4
                          className="mb-1 text-[var(--graphite)]"
                          style={{ fontSize: '1rem', fontWeight: 600 }}
                        >
                          {t(hotspot.title)}
                        </h4>
                        <p
                          className="text-[var(--charcoal)]"
                          style={{ fontSize: '0.875rem', lineHeight: 1.4 }}
                        >
                          {t(hotspot.description)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-8 text-[var(--muted-foreground)]"
            style={{ fontSize: '0.9375rem' }}
          >
            {t('hotspotHint')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
