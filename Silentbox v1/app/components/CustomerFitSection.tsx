import { motion } from 'motion/react';
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Headphones,
  HeartHandshake,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

const customerGroups = [
  {
    icon: Building2,
    title: 'cfFacilityTitle',
    need: 'cfFacilityNeed',
    proof: 'cfFacilityProof',
  },
  {
    icon: HeartHandshake,
    title: 'cfHrTitle',
    need: 'cfHrNeed',
    proof: 'cfHrProof',
  },
  {
    icon: Calculator,
    title: 'cfFinanceTitle',
    need: 'cfFinanceNeed',
    proof: 'cfFinanceProof',
  },
  {
    icon: ShieldCheck,
    title: 'cfLegalTitle',
    need: 'cfLegalNeed',
    proof: 'cfLegalProof',
  },
  {
    icon: Users,
    title: 'cfTeamsTitle',
    need: 'cfTeamsNeed',
    proof: 'cfTeamsProof',
  },
  {
    icon: BriefcaseBusiness,
    title: 'cfCoworkingTitle',
    need: 'cfCoworkingNeed',
    proof: 'cfCoworkingProof',
  },
];

const featureDetails = [
  {
    icon: Headphones,
    title: 'featureAcousticTitle',
    items: ['featureAcoustic1', 'featureAcoustic2', 'featureAcoustic3'],
  },
  {
    icon: Wrench,
    title: 'featureOpsTitle',
    items: ['featureOps1', 'featureOps2', 'featureOps3'],
  },
  {
    icon: BadgeCheck,
    title: 'featureQualityTitle',
    items: ['featureQuality1', 'featureQuality2', 'featureQuality3'],
  },
];

const useCases = [
  'useCase1',
  'useCase2',
  'useCase3',
  'useCase4',
  'useCase5',
  'useCase6',
  'useCase7',
  'useCase8',
];

export default function CustomerFitSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[var(--soft-gray)] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <h2
              className="mb-6 text-[var(--graphite)]"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.8rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                fontFamily: 'Manrope, sans-serif',
              }}
            >
              {t('customerFitTitle')}
            </h2>
            <p
              className="max-w-2xl text-[var(--charcoal)]"
              style={{ fontSize: '1.2rem', lineHeight: 1.65 }}
            >
              {t('customerFitBody')}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {featureDetails.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-2xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-sm"
              >
                <feature.icon className="mb-4 h-7 w-7 text-[var(--sage-green)]" />
                <h3
                  className="mb-3 text-[var(--graphite)]"
                  style={{ fontSize: '1rem', fontWeight: 600 }}
                >
                  {t(feature.title)}
                </h3>
                <ul className="space-y-2">
                  {feature.items.map((item) => (
                    <li
                      key={item}
                      className="text-[var(--charcoal)]"
                      style={{ fontSize: '0.9rem', lineHeight: 1.45 }}
                    >
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {customerGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="group rounded-2xl border border-white/70 bg-[var(--warm-white)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--sage-green)]/40 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--sage-green)]/12 text-[var(--sage-green)]">
                <group.icon className="h-6 w-6" />
              </div>
              <h3
                className="mb-3 text-[var(--graphite)]"
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {t(group.title)}
              </h3>
              <p
                className="mb-4 text-[var(--charcoal)]"
                style={{ fontSize: '1rem', lineHeight: 1.55 }}
              >
                {t(group.need)}
              </p>
              <p
                className="border-t border-[var(--sage-green)]/20 pt-4 text-[var(--muted-foreground)]"
                style={{ fontSize: '0.92rem', lineHeight: 1.5 }}
              >
                {t(group.proof)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-16 rounded-3xl bg-[var(--graphite)] p-6 text-[var(--warm-white)] sm:p-8"
        >
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h3
                className="mb-2"
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 600,
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {t('useCasesTitle')}
              </h3>
              <p className="max-w-2xl text-[var(--soft-gray)]">
                {t('useCasesBody')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {useCases.map((useCase) => (
              <span
                key={useCase}
                className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-[var(--soft-gray)]"
              >
                {t(useCase)}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
