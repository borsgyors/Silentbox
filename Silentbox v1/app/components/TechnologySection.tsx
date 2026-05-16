import { motion } from 'motion/react';
import { Shield, Leaf, Zap, Wind, Thermometer, Gauge } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const technologies = [
  {
    icon: Shield,
    title: 'techAcousticTitle',
    description: 'techAcousticDesc',
    specs: ['specReduction', 'specAbsorption', 'specEcho'],
  },
  {
    icon: Wind,
    title: 'techVentTitle',
    description: 'techVentDesc',
    specs: ['specFans', 'specFreshAir', 'specSensors'],
  },
  {
    icon: Zap,
    title: 'techPowerTitle',
    description: 'techPowerDesc',
    specs: ['specUsb', 'specWireless', 'specCable'],
  },
  {
    icon: Thermometer,
    title: 'techClimateTitle',
    description: 'techClimateDesc',
    specs: ['specCooling', 'specHeat', 'specHumidity'],
  },
  {
    icon: Leaf,
    title: 'techSustainTitle',
    description: 'techSustainDesc',
    specs: ['specRecycled', 'specVoc', 'specCarbon'],
  },
  {
    icon: Gauge,
    title: 'techAnalyticsTitle',
    description: 'techAnalyticsDesc',
    specs: ['specOccupancy', 'specPatterns', 'specMaintenance'],
  },
];

export default function TechnologySection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 px-6 bg-[var(--graphite)] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(42, 168, 132, 0.14) 1px, transparent 1px),
              linear-gradient(90deg, rgba(42, 168, 132, 0.14) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--sage-green)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--wood-beige)]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className="mb-6 text-[var(--warm-white)]"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              fontFamily: 'Manrope, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {t('techTitle')}
          </h2>
          <p
            className="mx-auto max-w-2xl text-[var(--soft-gray)]"
            style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
          >
            {t('techBody')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[var(--sage-green)]/50 transition-all duration-500"
            >
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--sage-green)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 mb-6 rounded-2xl bg-[var(--sage-green)]/10 flex items-center justify-center border border-[var(--sage-green)]/20"
                >
                  <tech.icon className="w-7 h-7 text-[var(--sage-green)]" />
                </motion.div>

                <h3
                  className="mb-3 text-white"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {t(tech.title)}
                </h3>

                <p
                  className="mb-6 text-[var(--soft-gray)]"
                  style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}
                >
                  {t(tech.description)}
                </p>

                <ul className="space-y-2">
                  {tech.specs.map((spec, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-[var(--soft-gray)]"
                      style={{ fontSize: '0.875rem' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--sage-green)]" />
                      {t(spec)}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm sm:p-12"
        >
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '10+', label: t('statYears') },
              { value: '50+', label: t('statPatents') },
              { value: '99.9%', label: t('statUptime') },
              { value: '5yr', label: t('statWarranty') },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div
                  className="mb-2 text-white"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 600,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {stat.value}
                </div>
                <p
                  className="text-[var(--soft-gray)]"
                  style={{ fontSize: '0.9375rem' }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
