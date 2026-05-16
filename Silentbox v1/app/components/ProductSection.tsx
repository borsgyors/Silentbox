import { motion } from 'motion/react';
import { useState } from 'react';
import { Users, User, Video } from 'lucide-react';
import { openQuoteRequest } from './QuoteRequest';
import { useLanguage } from './LanguageContext';

const products = [
  {
    name: 'Matterhorn',
    taglineKey: 'productMatterhornTagline',
    size: 'SOLO',
    capacity: '1 person',
    icon: User,
    priceKey: 'priceMatterhorn',
    image:
      'https://images.unsplash.com/photo-1567141066565-990c12b2318c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjBvZmZpY2UlMjBib290aCUyMGFjb3VzdGljJTIwcG9kJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzg2NzgyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['productMatterhornFeature1', 'productMatterhornFeature2', 'productMatterhornFeature3'],
  },
  {
    name: 'Kilimanjaro',
    taglineKey: 'productKilimanjaroTagline',
    size: 'DUO',
    capacity: '2 people',
    icon: Users,
    priceKey: 'priceKilimanjaro',
    image:
      'https://images.unsplash.com/photo-1646153389640-958d7ba1a864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBvZmZpY2UlMjBib290aCUyMGFjb3VzdGljJTIwcG9kJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzg2NzgyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['productKilimanjaroFeature1', 'productKilimanjaroFeature2', 'productKilimanjaroFeature3'],
  },
  {
    name: 'Everest',
    taglineKey: 'productEverestTagline',
    size: 'MEET',
    capacity: '4-6 people',
    icon: Video,
    priceKey: 'priceEverest',
    image:
      'https://images.unsplash.com/photo-1594235045856-a6315f0c4083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBvZmZpY2UlMjBib290aCUyMGFjb3VzdGljJTIwcG9kJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzg2NzgyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['productEverestFeature1', 'productEverestFeature2', 'productEverestFeature3'],
  },
];

export default function ProductSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section id="products" className="scroll-mt-28 py-32 px-6 bg-[var(--warm-white)]">
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
            {t('productsTitle')}
          </h2>
          <p
            className="mx-auto max-w-2xl text-[var(--charcoal)]"
            style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
          >
            {t('productsBody')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative rounded-3xl overflow-hidden bg-[var(--soft-gray)] cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--sage-green)]/0 to-[var(--sage-green)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                animate={
                  hoveredIndex === index
                    ? { scale: 1.05, rotate: 3 }
                    : { scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  animate={
                    hoveredIndex === index ? { scale: 1.1 } : { scale: 1 }
                  }
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--graphite)] via-transparent to-transparent" />

                <motion.div
                  className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  animate={
                    hoveredIndex === index
                      ? { scale: 1.1, rotate: 360 }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.6 }}
                >
                  <product.icon className="w-6 h-6 text-[var(--graphite)]" />
                </motion.div>
              </div>

              <div className="relative z-20 p-8">
                <h3
                  className="mb-2 text-[var(--graphite)]"
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 600,
                    fontFamily: 'Manrope, sans-serif',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {product.name}
                </h3>
                <p
                  className="mb-4 text-[var(--charcoal)]"
                  style={{ fontSize: '1.125rem', lineHeight: 1.5 }}
                >
                  {t(product.taglineKey)}
                </p>
                <p
                  className="mb-6 text-[var(--muted-foreground)]"
                  style={{ fontSize: '0.875rem' }}
                >
                  {product.size} · {product.capacity}
                </p>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-[var(--charcoal)]"
                      style={{ fontSize: '0.9375rem' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--sage-green)]" />
                      {t(feature)}
                    </li>
                  ))}
                </ul>

                <div
                  className="mb-6 text-[var(--graphite)]"
                  style={{ fontSize: '1.5rem', fontWeight: 600 }}
                >
                  {t(product.priceKey)}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openQuoteRequest}
                  className="w-full py-4 bg-[var(--graphite)] text-[var(--warm-white)] rounded-xl transition-all duration-300 hover:bg-[var(--charcoal)]"
                  style={{ fontSize: '1rem', fontWeight: 500 }}
                >
                  {t('getPrice')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
