import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, Mail, Phone, MessageCircle } from 'lucide-react';
import { openQuoteRequest } from './QuoteRequest';
import { useLanguage } from './LanguageContext';

export default function FinalCTA() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative scroll-mt-28 py-40 px-6 bg-[var(--graphite)] overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1646153389640-958d7ba1a864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBvZmZpY2UlMjBib290aCUyMGFjb3VzdGljJTIwcG9kJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzg2NzgyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Silent Box final"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--graphite)] via-[var(--graphite)]/95 to-[var(--graphite)]/80" />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="mb-8 text-[var(--warm-white)]"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 600,
              lineHeight: 1,
              fontFamily: 'Manrope, sans-serif',
              letterSpacing: '-0.03em',
            }}
          >
            {t('finalTitle')}
          </h2>
          <p
            className="mx-auto max-w-3xl mb-16 text-[var(--soft-gray)]"
            style={{ fontSize: '1.5rem', lineHeight: 1.5 }}
          >
            {t('finalBody')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openQuoteRequest}
            className="group px-12 py-6 bg-[var(--warm-white)] text-[var(--graphite)] rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
            style={{ fontSize: '1.25rem', fontWeight: 600 }}
          >
            <span className="flex items-center gap-3">
              {t('getStarted')}
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openQuoteRequest}
            className="px-12 py-6 bg-transparent border-2 border-white/20 text-[var(--warm-white)] rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            style={{ fontSize: '1.25rem', fontWeight: 600 }}
          >
            {t('downloadBrochure')}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Mail,
              title: t('contactEmail'),
              detail: 'hello@silentbox.com',
            },
            {
              icon: Phone,
              title: t('contactPhone'),
              detail: '+1 (555) 123-4567',
            },
            {
              icon: MessageCircle,
              title: t('contactChat'),
              detail: t('chatHours'),
            },
          ].map((contact, index) => (
            <motion.div
              key={contact.title}
              whileHover={{ y: -8, scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[var(--sage-green)]/50 transition-all duration-500 cursor-pointer"
            >
              <contact.icon className="w-8 h-8 text-[var(--sage-green)] mb-4 mx-auto" />
              <div
                className="mb-2 text-white"
                style={{ fontSize: '1.125rem', fontWeight: 600 }}
              >
                {contact.title}
              </div>
              <div
                className="text-[var(--soft-gray)]"
                style={{ fontSize: '0.9375rem' }}
              >
                {contact.detail}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mt-32 pt-12 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <div
                className="mb-2 text-white"
                style={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  fontFamily: 'Manrope, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                SILENT BOX
              </div>
              <p
                className="text-[var(--soft-gray)]"
                style={{ fontSize: '0.9375rem' }}
              >
                {t('footerTagline')}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {[
                [t('footerProducts'), t('footerFeatures'), t('footerPricing'), t('footerCustomization')],
                [t('footerCompany'), t('footerAbout'), t('footerCareers'), t('footerPress')],
                [t('footerSupport'), t('footerContact'), t('footerFaq'), t('footerWarranty')],
              ].map((column, colIndex) => (
                <div key={colIndex}>
                  <div
                    className="mb-4 text-white"
                    style={{ fontSize: '0.875rem', fontWeight: 600 }}
                  >
                    {column[0]}
                  </div>
                  <ul className="space-y-2">
                    {column.slice(1).map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href="#"
                          className="text-[var(--soft-gray)] hover:text-white transition-colors"
                          style={{ fontSize: '0.875rem' }}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-[var(--soft-gray)]"
              style={{ fontSize: '0.875rem' }}
            >
              © 2026 Silent Box. {t('footerRights')}
            </p>
            <div className="flex gap-6">
              {[t('footerPrivacy'), t('footerTerms'), t('footerCookies')].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[var(--soft-gray)] hover:text-white transition-colors"
                  style={{ fontSize: '0.875rem' }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
