import { motion } from 'motion/react';
import { openQuoteRequest } from './QuoteRequest';
import { useLanguage } from './LanguageContext';

const environments = [
  {
    title: 'envLawTitle',
    description: 'envLawDesc',
    image:
      'https://images.unsplash.com/photo-1623351143485-b1d4937747f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3b3Jrc3BhY2UlMjBwcmVtaXVtJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc4Njc4Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'envTechTitle',
    description: 'envTechDesc',
    image:
      'https://images.unsplash.com/photo-1764410481612-7544525b2991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB3b3Jrc3BhY2UlMjBwcmVtaXVtJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc4Njc4Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'envCoworkTitle',
    description: 'envCoworkDesc',
    image:
      'https://images.unsplash.com/photo-1628746041542-e48da7ad1c23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjB3b3Jrc3BhY2UlMjBwcmVtaXVtJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc4Njc4Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'envHealthTitle',
    description: 'envHealthDesc',
    image:
      'https://images.unsplash.com/photo-1776482128008-2c9cf5bc0edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjB3b3Jrc3BhY2UlMjBwcmVtaXVtJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc4Njc4Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'envEnterpriseTitle',
    description: 'envEnterpriseDesc',
    image:
      'https://images.unsplash.com/photo-1776482128000-14cda1ad9e3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjB3b3Jrc3BhY2UlMjBwcmVtaXVtJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc4Njc4Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'envArchTitle',
    description: 'envArchDesc',
    image:
      'https://images.unsplash.com/photo-1765371512707-9e0e96fd9e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtaW5pbWFsJTIwU2NhbmRpbmF2aWFuJTIwb2ZmaWNlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3ODY3ODI3OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function EnvironmentSection() {
  const { t } = useLanguage();

  return (
    <section className="py-32 px-6 bg-[var(--warm-white)]">
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
            {t('environmentTitle')}
          </h2>
          <p
            className="mx-auto max-w-2xl text-[var(--charcoal)]"
            style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
          >
            {t('environmentBody')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {environments.map((env, index) => (
            <motion.div
              key={env.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img
                src={env.image}
                alt={t(env.title)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--graphite)] via-[var(--graphite)]/50 to-transparent opacity-90" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.h3
                  className="mb-2 text-white"
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {t(env.title)}
                </motion.h3>
                <p
                  className="text-[var(--soft-gray)]"
                  style={{ fontSize: '1rem', lineHeight: 1.5 }}
                >
                  {t(env.description)}
                </p>
              </div>

              <motion.div
                className="absolute inset-0 bg-[var(--sage-green)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openQuoteRequest}
            className="px-10 py-5 bg-[var(--graphite)] text-[var(--warm-white)] rounded-2xl transition-all duration-300 hover:bg-[var(--charcoal)] hover:shadow-2xl"
            style={{ fontSize: '1.125rem', fontWeight: 500 }}
          >
            {t('caseStudies')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
