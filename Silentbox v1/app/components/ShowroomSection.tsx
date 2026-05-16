import { motion } from 'motion/react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { openQuoteRequest } from './QuoteRequest';
import { useLanguage } from './LanguageContext';

const showrooms = [
  { city: 'New York', address: '123 Madison Ave', hours: 'monFri96' },
  { city: 'San Francisco', address: '456 Market St', hours: 'monFri96' },
  { city: 'London', address: '789 Oxford St', hours: 'monFri107' },
  { city: 'Tokyo', address: '321 Shibuya', hours: 'monFri107' },
];

export default function ShowroomSection() {
  const { t } = useLanguage();

  return (
    <section
      id="showroom"
      className="relative scroll-mt-28 py-32 px-6 bg-[var(--graphite)] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1765371512707-9e0e96fd9e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtaW5pbWFsJTIwU2NhbmRpbmF2aWFuJTIwb2ZmaWNlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3ODY3ODI3OXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Showroom background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--graphite)] via-[var(--graphite)]/90 to-[var(--graphite)]" />
      </div>

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
            {t('showroomTitle')}
          </h2>
          <p
            className="mx-auto max-w-2xl text-[var(--soft-gray)]"
            style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
          >
            {t('showroomBody')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {showrooms.map((showroom, index) => (
            <motion.div
              key={showroom.city}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[var(--sage-green)]/50 transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3
                    className="mb-2 text-white"
                    style={{
                      fontSize: '2rem',
                      fontWeight: 600,
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  >
                    {showroom.city}
                  </h3>
                  <div className="flex items-center gap-2 text-[var(--soft-gray)] mb-1">
                    <MapPin className="w-4 h-4" />
                    <span style={{ fontSize: '0.9375rem' }}>
                      {showroom.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--soft-gray)]">
                    <Calendar className="w-4 h-4" />
                    <span style={{ fontSize: '0.9375rem' }}>
                      {t(showroom.hours)}
                    </span>
                  </div>
                </div>
                <motion.div
                  className="w-12 h-12 rounded-full bg-[var(--sage-green)]/10 flex items-center justify-center border border-[var(--sage-green)]/20 group-hover:bg-[var(--sage-green)]/20 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <ArrowRight className="w-5 h-5 text-[var(--sage-green)]" />
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openQuoteRequest}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all duration-300"
                style={{ fontSize: '0.9375rem', fontWeight: 500 }}
              >
                {t('bookVisit')}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto max-w-3xl rounded-3xl border border-[var(--sage-green)]/20 bg-gradient-to-br from-[var(--sage-green)]/20 to-[var(--sage-green)]/5 p-6 text-center backdrop-blur-sm sm:p-12"
        >
          <h3
            className="mb-4 text-white"
            style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
            }}
          >
            {t('virtualTitle')}
          </h3>
          <p
            className="mb-8 text-[var(--soft-gray)]"
            style={{ fontSize: '1.125rem', lineHeight: 1.6 }}
          >
            {t('virtualBody')}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openQuoteRequest}
            className="px-6 py-5 bg-white text-[var(--graphite)] rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 sm:px-10"
            style={{ fontSize: '1.125rem', fontWeight: 500 }}
          >
            {t('virtualTour')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
