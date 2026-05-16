import { motion } from 'motion/react';
import { useState } from 'react';
import { openQuoteRequest } from './QuoteRequest';
import { useLanguage } from './LanguageContext';

const colors = [
  { name: 'colorCharcoal', value: '#3a3a3a' },
  { name: 'colorSage', value: '#8b9a8f' },
  { name: 'colorWarmWhite', value: '#fafaf8' },
  { name: 'colorWood', value: '#d4c4b0' },
  { name: 'colorGraphite', value: '#1a1a1a' },
];

const materials = [
  { name: 'materialOak', finish: 'materialOakFinish' },
  { name: 'materialFelt', finish: 'materialFeltFinish' },
  { name: 'materialPowder', finish: 'materialPowderFinish' },
  { name: 'materialGlass', finish: 'materialGlassFinish' },
];

const sizes = [
  { name: 'SOLO', dimensions: '100 × 100 cm' },
  { name: 'DUO', dimensions: '150 × 150 cm' },
  { name: 'MEET', dimensions: '200 × 200 cm' },
];

export default function CustomizationSection() {
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <section id="customization" className="scroll-mt-28 py-32 px-6 bg-[var(--soft-gray)]">
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
            {t('customizationTitle')}
          </h2>
          <p
            className="mx-auto max-w-2xl text-[var(--charcoal)]"
            style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
          >
            {t('customizationBody')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <h3
                className="mb-4 text-[var(--graphite)]"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {t('colorLabel')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <motion.button
                    key={color.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-16 h-16 rounded-full border-4 transition-all duration-300 ${
                      selectedColor.name === color.name
                        ? 'border-[var(--graphite)] scale-110'
                        : 'border-white/50'
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    {selectedColor.name === color.name && (
                      <motion.div
                        layoutId="color-selected"
                        className="absolute inset-0 rounded-full border-2 border-[var(--sage-green)]"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              <p
                className="mt-3 text-[var(--charcoal)]"
                style={{ fontSize: '0.9375rem' }}
              >
                {t('selectedLabel')}: {t(selectedColor.name)}
              </p>
            </div>

            <div>
              <h3
                className="mb-4 text-[var(--graphite)]"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {t('materialLabel')}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {materials.map((material) => (
                  <motion.button
                    key={material.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMaterial(material)}
                    className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                      selectedMaterial.name === material.name
                        ? 'bg-[var(--graphite)] text-white'
                        : 'bg-white text-[var(--graphite)] hover:bg-white/80'
                    }`}
                  >
                    <div
                      className="font-medium mb-1"
                      style={{ fontSize: '1rem' }}
                    >
                      {t(material.name)}
                    </div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                      {t(material.finish)}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3
                className="mb-4 text-[var(--graphite)]"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {t('sizeLabel')}
              </h3>
              <div className="space-y-3">
                {sizes.map((size) => (
                  <motion.button
                    key={size.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSize(size)}
                    className={`w-full p-4 rounded-2xl flex justify-between items-center transition-all duration-300 ${
                      selectedSize.name === size.name
                        ? 'bg-[var(--graphite)] text-white'
                        : 'bg-white text-[var(--graphite)] hover:bg-white/80'
                    }`}
                  >
                    <div>
                      <div
                        className="font-semibold"
                        style={{
                          fontSize: '1.25rem',
                          fontFamily: 'Manrope, sans-serif',
                        }}
                      >
                        {size.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                        {size.dimensions}
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedSize.name === size.name
                          ? 'border-white'
                          : 'border-[var(--charcoal)]/30'
                      }`}
                    >
                      {selectedSize.name === size.name && (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openQuoteRequest}
              className="w-full py-5 bg-[var(--sage-green)] text-white rounded-2xl transition-all duration-300 hover:bg-[var(--sage-green)]/90 hover:shadow-2xl"
              style={{ fontSize: '1.125rem', fontWeight: 500 }}
            >
              {t('customQuote')}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square"
          >
            <motion.div
              key={`${selectedColor.name}-${selectedMaterial.name}-${selectedSize.name}`}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: selectedColor.value }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1646153389640-958d7ba1a864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBvZmZpY2UlMjBib290aCUyMGFjb3VzdGljJTIwcG9kJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzg2NzgyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={t('customizedBoothAlt')}
                  className="w-4/5 h-4/5 object-contain mix-blend-overlay opacity-60"
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 backdrop-blur-sm sm:bottom-8 sm:left-8 sm:right-8 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[var(--graphite)]"
                    style={{ fontSize: '0.875rem', fontWeight: 600 }}
                  >
                    {t('yourConfiguration')}
                  </span>
                  <span
                    className="text-[var(--sage-green)]"
                    style={{ fontSize: '0.875rem', fontWeight: 500 }}
                  >
                    {t('livePreview')}
                  </span>
                </div>
                <div className="space-y-1 text-[var(--charcoal)]">
                  <div style={{ fontSize: '0.875rem' }}>
                    {selectedSize.name} · {t(selectedColor.name)} ·{' '}
                    {t(selectedMaterial.name)}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -z-10 inset-0 rounded-3xl blur-3xl opacity-50"
              style={{ backgroundColor: selectedColor.value }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
