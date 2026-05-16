import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const testimonials = [
  {
    quote: 'testQuote1',
    author: 'Sarah Chen',
    role: 'roleOps',
    company: 'TechVentures',
  },
  {
    quote: 'testQuote2',
    author: 'Michael Roberts',
    role: 'rolePartner',
    company: 'Roberts & Associates Law',
  },
  {
    quote: 'testQuote3',
    author: 'Emma Larsson',
    role: 'roleDesign',
    company: 'Studio Nord',
  },
  {
    quote: 'testQuote4',
    author: 'David Park',
    role: 'roleFacilities',
    company: 'Innovate Corp',
  },
  {
    quote: 'testQuote5',
    author: 'Lisa Anderson',
    role: 'roleEngineer',
    company: 'DataFlow Systems',
  },
  {
    quote: 'testQuote6',
    author: 'James Wilson',
    role: 'roleCoo',
    company: 'Growth Partners',
  },
];

export default function Testimonials() {
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
            {t('testimonialsTitle')}
          </h2>
          <p
            className="mx-auto max-w-2xl text-[var(--charcoal)]"
            style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
          >
            {t('testimonialsBody')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-white border border-[var(--soft-gray)]/50 hover:border-[var(--sage-green)]/50 transition-all duration-500"
            >
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--sage-green)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              <div className="relative z-10">
                <Quote className="w-10 h-10 text-[var(--sage-green)]/30 mb-6" />

                <p
                  className="mb-6 text-[var(--graphite)]"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.6 }}
                >
                  "{t(testimonial.quote)}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--sage-green)] to-[var(--wood-beige)] flex items-center justify-center text-white">
                    <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div
                      className="text-[var(--graphite)]"
                      style={{ fontSize: '1rem', fontWeight: 600 }}
                    >
                      {testimonial.author}
                    </div>
                    <div
                      className="text-[var(--charcoal)]"
                      style={{ fontSize: '0.875rem' }}
                    >
                      {t(testimonial.role)}
                    </div>
                    <div
                      className="text-[var(--muted-foreground)]"
                      style={{ fontSize: '0.8125rem' }}
                    >
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
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
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            {[
              { rating: '4.9', label: t('avgRating') },
              { rating: '2000+', label: t('companies') },
              { rating: '10K+', label: t('boothsInstalled') },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-[var(--graphite)]"
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 600,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {stat.rating}
                </div>
                <div
                  className="text-[var(--charcoal)]"
                  style={{ fontSize: '0.9375rem' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
