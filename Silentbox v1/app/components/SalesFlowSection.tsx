import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  CheckCircle2,
  FileDown,
  Headphones,
  ShieldCheck,
  Users,
  Video,
} from 'lucide-react';
import { openQuoteRequest } from './QuoteRequest';
import { useLanguage } from './LanguageContext';

const boothUseCases = [
  {
    id: 'solo',
    name: 'Matterhorn',
    title: 'boothSoloTitle',
    description: 'boothSoloDesc',
    icon: Headphones,
  },
  {
    id: 'duo',
    name: 'Kilimanjaro',
    title: 'boothDuoTitle',
    description: 'boothDuoDesc',
    icon: Users,
  },
  {
    id: 'meet',
    name: 'Everest',
    title: 'boothMeetTitle',
    description: 'boothMeetDesc',
    icon: Video,
  },
];

const comparisonRows = [
  ['compareTime', 'compareFast', 'compareProject', 'compareImmediate', 'compareWeeks'],
  ['comparePrivacy', 'compareHigh', 'compareMedium', 'compareLow', 'compareHigh'],
  ['compareFlex', 'compareRelocatable', 'compareFixedRoom', 'compareIndividual', 'compareFixedLayout'],
  ['compareDisruption', 'compareLow', 'compareHigh', 'compareLow', 'compareHigh'],
];

const proofItems = [
  {
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    title: 'proofOpenTitle',
    result: 'proofOpenResult',
  },
  {
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    title: 'proofStudioTitle',
    result: 'proofStudioResult',
  },
  {
    image:
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    title: 'proofOpsTitle',
    result: 'proofOpsResult',
  },
];

const getRecommendation = (employees: number) => {
  if (employees < 20) return 'recSmall';
  if (employees < 60) return 'recMedium';
  if (employees < 120) return 'recLarge';
  return 'recCustom';
};

export default function SalesFlowSection() {
  const { t } = useLanguage();
  const [selectedUse, setSelectedUse] = useState(boothUseCases[0].id);
  const [employees, setEmployees] = useState(42);

  const selectedBooth = boothUseCases.find((item) => item.id === selectedUse) ?? boothUseCases[0];
  const recommendation = useMemo(() => getRecommendation(employees), [employees]);

  return (
    <section className="bg-[var(--warm-white)] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--sage-green)]">
              {t('planFaster')}
            </p>
            <h2
              className="max-w-3xl text-[var(--graphite)]"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                fontFamily: 'Manrope, sans-serif',
              }}
            >
              {t('salesTitle')}
            </h2>
          </div>
          <button
            type="button"
            onClick={openQuoteRequest}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--graphite)] px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-[var(--charcoal)] md:w-auto"
          >
            {t('freeAssessment')}
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <BadgeCheck className="h-6 w-6 text-[var(--sage-green)]" />
              <h3 className="text-2xl font-semibold">{t('findBooth')}</h3>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {boothUseCases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedUse(item.id)}
                  className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                    selectedUse === item.id
                      ? 'border-[var(--sage-green)] bg-[var(--sage-green)]/10'
                      : 'border-[var(--border)] bg-[var(--warm-white)] hover:border-[var(--sage-green)]/40'
                  }`}
                >
                  <item.icon className="mb-4 h-6 w-6 text-[var(--sage-green)]" />
                  <div className="text-lg font-semibold">{item.name}</div>
                  <div className="mt-1 text-sm text-[var(--charcoal)]">{t(item.title)}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-[var(--soft-gray)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sage-green)]">
                {t('recommendedFor')}
              </p>
              <h4 className="mt-2 text-2xl font-semibold">{t(selectedBooth.title)}</h4>
              <p className="mt-2 text-[var(--charcoal)]">{t(selectedBooth.description)}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--graphite)] p-6 text-white shadow-sm sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <Calculator className="h-6 w-6 text-[var(--sage-green)]" />
              <h3 className="text-2xl font-semibold">{t('employeeCalculator')}</h3>
            </div>
            <label htmlFor="employee-count" className="mb-3 block text-sm text-white/70">
              {t('employeeQuestion')}
            </label>
            <div className="flex items-center gap-4">
              <input
                id="employee-count"
                type="range"
                min="5"
                max="180"
                value={employees}
                onChange={(event) => setEmployees(Number(event.target.value))}
                className="w-full accent-[var(--sage-green)]"
              />
              <input
                type="number"
                min="5"
                max="180"
                value={employees}
                onChange={(event) => setEmployees(Number(event.target.value))}
                className="h-11 w-20 rounded-lg border border-white/15 bg-white/10 px-3 text-center text-white outline-none focus:border-[var(--sage-green)]"
              />
            </div>
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--sage-green)]">
                {t('startingPlan')}
              </p>
              <p className="mt-2 text-3xl font-semibold">{t(recommendation)}</p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {t('finalQuantity')}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm"
          >
            <div className="border-b border-[var(--border)] p-6">
              <h3 className="text-2xl font-semibold">{t('compareOptions')}</h3>
              <p className="mt-2 text-[var(--charcoal)]">
                {t('compareBody')}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-[var(--soft-gray)] text-[var(--graphite)]">
                  <tr>
                    {[
                      t('compareNeed'),
                      t('compareSilent'),
                      t('compareMeeting'),
                      t('compareHeadphones'),
                      t('compareRenovation'),
                    ].map(
                      (heading) => (
                        <th key={heading} className="px-5 py-4 font-semibold">
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row[0]} className="border-t border-[var(--border)]">
                      {row.map((cell, index) => (
                        <td
                          key={cell}
                          className={`px-5 py-4 ${
                            index === 1 ? 'font-semibold text-[var(--sage-green)]' : ''
                          }`}
                        >
                          {t(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--soft-gray)] p-6 sm:p-8"
          >
            <h3 className="text-2xl font-semibold">{t('lowerFriction')}</h3>
            <div className="mt-6 space-y-4">
              {[
                ['frictionInstallTitle', 'frictionInstallDesc'],
                ['frictionWarrantyTitle', 'frictionWarrantyDesc'],
                ['frictionDeliveryTitle', 'frictionDeliveryDesc'],
                ['frictionFinanceTitle', 'frictionFinanceDesc'],
              ].map(([title, detail]) => (
                <div key={title} className="flex gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--sage-green)]" />
                  <div>
                    <p className="font-semibold">{t(title)}</p>
                    <p className="text-sm leading-6 text-[var(--charcoal)]">{t(detail)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {proofItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm"
            >
              <img src={item.image} alt={t(item.title)} className="h-48 w-full object-cover" />
              <div className="p-5">
                <p className="text-lg font-semibold">{t(item.title)}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--charcoal)]">{t(item.result)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 grid gap-4 rounded-2xl border border-[var(--sage-green)]/25 bg-[var(--sage-green)]/10 p-6 md:grid-cols-[1fr_auto_auto] md:items-center"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sage-green)]">
              {t('buyerResources')}
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{t('buyerTitle')}</h3>
            <p className="mt-2 text-[var(--charcoal)]">
              {t('buyerBody')}
            </p>
          </div>
          <button
            type="button"
            onClick={openQuoteRequest}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 font-semibold text-[var(--graphite)] shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <FileDown className="h-5 w-5 text-[var(--sage-green)]" />
            {t('getSpecSheet')}
          </button>
          <button
            type="button"
            onClick={openQuoteRequest}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--graphite)] px-5 py-4 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <Building2 className="h-5 w-5 text-[var(--sage-green)]" />
            {t('architectPack')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
