import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  MessageSquareText,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useLanguage } from './LanguageContext';

export const openQuoteRequest = () => {
  window.dispatchEvent(new CustomEvent('silentbox:open-quote'));
};

export default function QuoteRequest() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  const boothOptions = [
    t('notSure'),
    'Matterhorn - SOLO',
    'Kilimanjaro - DUO',
    'Everest - MEET',
    t('multipleBooths'),
  ];

  useEffect(() => {
    const handleOpen = () => setOpen(true);

    window.addEventListener('silentbox:open-quote', handleOpen);
    return () => window.removeEventListener('silentbox:open-quote', handleOpen);
  }, []);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 520);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const body = [
      `${t('name')}: ${formData.get('name')}`,
      `${t('company')}: ${formData.get('company')}`,
      `${t('email')}: ${formData.get('email')}`,
      `${t('phone')}: ${formData.get('phone')}`,
      `${t('city')}: ${formData.get('city')}`,
      `${t('boothNeed')}: ${formData.get('booth')}`,
      '',
      `${t('notesPlaceholder')}: ${formData.get('notes')}`,
    ].join('\n');

    window.location.href = `mailto:hello@silentbox.com?subject=${encodeURIComponent(
      t('quoteTitle')
    )}&body=${encodeURIComponent(body)}`;
    setOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-x-4 bottom-4 z-40 flex flex-col gap-2 transition-all duration-300 sm:inset-x-auto sm:bottom-8 sm:right-8 sm:flex-row ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'
        }`}
      >
        <a
          href="#showroom"
          className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-[var(--graphite)] px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--charcoal)] focus:outline-none focus:ring-4 focus:ring-[var(--sage-green)]/30"
        >
          <CalendarDays className="h-4 w-4 text-[var(--sage-green)]" />
          {t('stickyShowroom')}
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-[var(--sage-green)] px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#248f72] focus:outline-none focus:ring-4 focus:ring-[var(--sage-green)]/30"
          aria-label="Request a Silent Box quote"
        >
          <MessageSquareText className="h-4 w-4" />
          {t('requestQuote')}
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92svh] overflow-y-auto border-white/20 bg-[var(--warm-white)] p-0 text-[var(--graphite)] sm:max-w-4xl">
          <div className="grid overflow-hidden rounded-lg md:grid-cols-[0.85fr_1.15fr]">
            <div className="hidden bg-[var(--graphite)] p-10 text-white md:flex md:flex-col md:justify-between">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--sage-green)]/20">
                  <Building2 className="h-6 w-6 text-[var(--sage-green)]" />
                </div>
                <h3 className="mb-4 text-3xl font-semibold">{t('quotePanelTitle')}</h3>
                <p className="text-sm leading-6 text-white/70">
                  {t('quotePanelBody')}
                </p>
              </div>

              <div className="space-y-3 text-sm text-white/80">
                {[
                  t('quoteBenefitPrice'),
                  t('quoteBenefitAssessment'),
                  t('quoteBenefitSlots'),
                  t('quoteBenefitLeasing'),
                ].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[var(--sage-green)]" />
                      <span>{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10">
              <DialogHeader className="mb-8">
                <DialogTitle className="text-3xl">{t('quoteTitle')}</DialogTitle>
                <DialogDescription>
                  {t('quoteDescription')}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  ['name', t('name'), 'text', true],
                  ['company', t('company'), 'text', false],
                  ['email', t('email'), 'email', true],
                  ['phone', t('phone'), 'text', false],
                  ['city', t('city'), 'text', false],
                ].map(([name, label, type, required]) => (
                  <label key={String(name)} className="block">
                    <span className="mb-2 block text-sm font-semibold text-[var(--graphite)]">
                      {label}
                    </span>
                    <Input
                      name={String(name)}
                      type={String(type)}
                      placeholder={String(label)}
                      required={Boolean(required)}
                      className="h-14 rounded-xl bg-white px-4 text-base"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[var(--graphite)]">
                    {t('boothNeed')}
                  </span>
                  <select
                    name="booth"
                    className="h-14 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-base outline-none transition-[color,box-shadow] focus:border-[var(--ring)] focus:ring-4 focus:ring-[var(--ring)]/20"
                    defaultValue={t('notSure')}
                  >
                    {boothOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-semibold text-[var(--graphite)]">
                  {t('notesPlaceholder')}
                </span>
                <Textarea
                  name="notes"
                  placeholder={t('notesPlaceholder')}
                  className="min-h-32 rounded-xl bg-white px-4 py-3 text-base"
                />
              </label>

              <button
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--graphite)] px-6 py-5 text-base font-semibold text-white transition-all duration-300 hover:bg-[var(--charcoal)] focus:outline-none focus:ring-4 focus:ring-[var(--graphite)]/20"
              >
                {t('sendRequest')}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
