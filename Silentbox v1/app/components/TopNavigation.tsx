import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { openQuoteRequest } from './QuoteRequest';
import { useLanguage } from './LanguageContext';
import ukFlagUrl from '../../media/uk flag.svg';
import deFlagUrl from '../../media/de flag.svg';
import huFlagUrl from '../../media/hu flag.svg';

const flagUrls = {
  en: ukFlagUrl,
  de: deFlagUrl,
  hu: huFlagUrl,
};

const links = [
  { label: 'navProducts', href: '#products' },
  { label: 'navSound', href: '#sound-demo' },
  { label: 'navCustomization', href: '#customization' },
  { label: 'navShowroom', href: '#showroom' },
  { label: 'navContact', href: '#contact' },
] as const;

export default function TopNavigation() {
  const { language, setLanguage, t, languageNames } = useLanguage();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/15 bg-[var(--graphite)]/72 px-4 py-3 text-white shadow-xl shadow-black/10 backdrop-blur-xl sm:px-5">
        <a href="#" className="text-sm font-semibold tracking-[0.18em]">
          SILENT BOX
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/72 transition-colors hover:text-white"
            >
              {t(link.label)}
            </a>
          ))}
        </div>

        <div className="hidden rounded-xl border border-white/10 bg-white/5 p-1 sm:flex">
          {(['en', 'de', 'hu'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLanguage(item)}
              className={`rounded-lg p-1.5 transition-colors ${
                language === item
                  ? 'bg-white text-[var(--graphite)]'
                  : 'text-white/65 hover:text-white'
              }`}
              aria-label={`Switch language to ${languageNames[item]}`}
              title={languageNames[item]}
            >
              <img
                src={flagUrls[item]}
                alt=""
                className="h-4 w-6 rounded-[2px] object-cover shadow-sm"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={openQuoteRequest}
          className="flex items-center gap-2 rounded-xl bg-[var(--warm-white)] px-4 py-2 text-sm font-semibold text-[var(--graphite)] transition-all duration-300 hover:bg-white"
        >
          {t('navQuote')}
          <ArrowRight className="h-4 w-4" />
        </button>
      </nav>
    </motion.header>
  );
}
