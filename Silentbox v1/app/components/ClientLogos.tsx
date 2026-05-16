import { motion } from 'motion/react';

const clients = [
  'MICROSOFT',
  'GOOGLE',
  'SPOTIFY',
  'AIRBNB',
  'STRIPE',
  'NOTION',
  'FIGMA',
  'SLACK',
];

export default function ClientLogos() {
  return (
    <section className="py-24 px-6 bg-[var(--warm-white)]">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 text-[var(--muted-foreground)] uppercase tracking-widest"
          style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em' }}
        >
          Trusted by forward-thinking companies
        </motion.p>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-16"
            animate={{
              x: [0, -1600],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-[var(--charcoal)]/30 hover:text-[var(--graphite)] transition-colors duration-300"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {client}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
