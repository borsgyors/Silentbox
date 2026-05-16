import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Square, Volume2, VolumeX } from 'lucide-react';
import openOfficeAudioUrl from '../../freesound_community-office.mp3';
import officeVideoUrl from '../../media/office video animation.mp4';
import officeVideoReverseUrl from '../../media/office video animation reverse.mp4';
import { openQuoteRequest } from './QuoteRequest';
import { useLanguage } from './LanguageContext';

const soundBars = [52, 74, 61, 86, 58, 93, 68, 82, 55, 77, 64, 88, 59, 71];
const sampleDurationMs = 30000;

export default function SoundComparison() {
  const { t } = useLanguage();
  const [activeMode, setActiveMode] = useState<'noisy' | 'silent'>('noisy');
  const [samplePlaying, setSamplePlaying] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const stopAudioRef = useRef<(() => void) | null>(null);
  const stopTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopCurrentSample();

      const context = audioContextRef.current;
      if (context && context.state !== 'closed') {
        void context.close().catch(() => {
          // The browser may close the context first during hot reload or tab cleanup.
        });
      }

      audioContextRef.current = null;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = false;
    video.playbackRate = 1;
    video.currentTime = 0;
    void video.play().catch(() => {
      // Browsers can pause muted background media to save power.
    });
  }, [activeMode]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          stopCurrentSample();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const getAudioContext = () => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new AudioContext();
    }

    return audioContextRef.current;
  };

  const createNoiseSource = (context: AudioContext) => {
    const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    return source;
  };

  const stopCurrentSample = () => {
    stopAudioRef.current?.();
    stopAudioRef.current = null;
    setSamplePlaying(false);

    if (stopTimerRef.current) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  };

  const playModeSample = async (mode: 'noisy' | 'silent') => {
    stopCurrentSample();

    if (mode === 'noisy') {
      const audio = new Audio(openOfficeAudioUrl);
      audio.volume = 0.72;
      audio.loop = true;
      audio.currentTime = 0;

      stopAudioRef.current = () => {
        const fadeInterval = window.setInterval(() => {
          audio.volume = Math.max(0, audio.volume - 0.12);

          if (audio.volume <= 0) {
            window.clearInterval(fadeInterval);
            audio.pause();
            audio.currentTime = 0;
          }
        }, 40);
      };

      try {
        await audio.play();
      } catch {
        stopCurrentSample();
        return;
      }

      setSamplePlaying(true);
      stopTimerRef.current = window.setTimeout(stopCurrentSample, sampleDurationMs);
      return;
    }

    const context = getAudioContext();
    try {
      await context.resume();
    } catch {
      audioContextRef.current = null;
      return;
    }

    setSamplePlaying(true);

    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(0.0001, context.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.012, context.currentTime + 0.35);
    masterGain.connect(context.destination);

    const noiseSource = createNoiseSource(context);
    const noiseFilter = context.createBiquadFilter();
    noiseFilter.type = mode === 'noisy' ? 'bandpass' : 'lowpass';
    noiseFilter.frequency.value = mode === 'noisy' ? 900 : 220;
    noiseFilter.Q.value = mode === 'noisy' ? 0.8 : 0.45;

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(masterGain);
    noiseSource.start();

    const nodesToStop: Array<AudioBufferSourceNode | OscillatorNode> = [noiseSource];

    if (mode === 'noisy') {
      [180, 310, 520].forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = index === 0 ? 'sawtooth' : 'triangle';
        oscillator.frequency.value = frequency;
        gain.gain.value = 0.025 / (index + 1);

        oscillator.connect(gain);
        gain.connect(masterGain);
        oscillator.start();
        nodesToStop.push(oscillator);
      });
    } else {
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value = 96;
      gain.gain.value = 0.004;

      oscillator.connect(gain);
      gain.connect(masterGain);
      oscillator.start();
      nodesToStop.push(oscillator);
    }

    stopAudioRef.current = () => {
      const fadeStart = context.currentTime;
      masterGain.gain.cancelScheduledValues(fadeStart);
      masterGain.gain.setValueAtTime(Math.max(masterGain.gain.value, 0.0001), fadeStart);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, fadeStart + 0.18);

      window.setTimeout(() => {
        nodesToStop.forEach((node) => {
          try {
            node.stop();
          } catch {
            // Node may have already stopped after a fast button switch.
          }
        });
        masterGain.disconnect();
      }, 220);
    };

    stopTimerRef.current = window.setTimeout(stopCurrentSample, sampleDurationMs);
  };

  const handleModeClick = (mode: 'noisy' | 'silent') => {
    setActiveMode(mode);
    void playModeSample(mode).catch(() => {
      stopCurrentSample();
    });
  };

  return (
    <section
      id="sound-demo"
      ref={sectionRef}
      className="scroll-mt-28 py-32 px-6 bg-[var(--graphite)]"
    >
      <div className="max-w-7xl mx-auto">
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
            {t('soundTitle')}
          </h2>
          <p
            className="mx-auto max-w-2xl text-[var(--soft-gray)]"
            style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
          >
            {t('soundBody')}
          </p>
        </motion.div>

        <div className="mb-16 text-center">
          <p className="mb-5 text-[var(--soft-gray)]" style={{ fontSize: '1rem' }}>
            {t('soundHint')}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModeClick('noisy')}
              className={`px-6 py-4 rounded-2xl transition-all duration-300 sm:px-8 ${
                activeMode === 'noisy'
                  ? 'bg-amber-500/20 border-2 border-amber-500 text-amber-400'
                  : 'bg-white/5 border-2 border-white/10 text-white/50'
              }`}
              style={{ fontSize: '1.125rem', fontWeight: 500 }}
            >
              <Volume2 className="inline-block w-5 h-5 mr-2" />
              {t('openDoor')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModeClick('silent')}
              className={`px-6 py-4 rounded-2xl transition-all duration-300 sm:px-8 ${
                activeMode === 'silent'
                  ? 'bg-[var(--sage-green)]/20 border-2 border-[var(--sage-green)] text-[var(--sage-green)]'
                  : 'bg-white/5 border-2 border-white/10 text-white/50'
              }`}
              style={{ fontSize: '1.125rem', fontWeight: 500 }}
            >
              <VolumeX className="inline-block w-5 h-5 mr-2" />
              {t('closedDoor')}
            </motion.button>
            {samplePlaying && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopCurrentSample}
                className="px-6 py-4 rounded-2xl border-2 border-white/15 bg-white/5 text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white sm:px-8"
                style={{ fontSize: '1.125rem', fontWeight: 500 }}
              >
                <Square className="inline-block w-4 h-4 mr-2 fill-current" />
                {t('stopSound')}
              </motion.button>
            )}
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={false}
            animate={{
              backgroundColor:
                activeMode === 'noisy'
                  ? 'rgba(216, 146, 42, 0.12)'
                  : 'rgba(42, 168, 132, 0.12)',
            }}
            className="rounded-3xl border p-6 backdrop-blur-sm sm:p-12"
            style={{
              borderColor:
                activeMode === 'noisy'
                  ? 'rgba(216, 146, 42, 0.34)'
                  : 'rgba(42, 168, 132, 0.34)',
            }}
          >
            <div className="grid items-center gap-8 md:grid-cols-[minmax(220px,360px)_1fr] md:gap-12">
              <div className="relative mx-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/15 bg-black/20 shadow-2xl shadow-black/20">
                <video
                  key={activeMode}
                  ref={videoRef}
                  className="h-full w-full object-cover object-[30%_50%]"
                  src={activeMode === 'noisy' ? officeVideoUrl : officeVideoReverseUrl}
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Office door sound comparison animation"
                />

                <motion.div
                  aria-hidden="true"
                  initial={false}
                  animate={{
                    opacity: activeMode === 'silent' ? 1 : 0.25,
                    scale: activeMode === 'silent' ? 1 : 0.94,
                  }}
                  transition={{ duration: 0.35 }}
                  className="absolute right-3 top-4 flex items-center gap-2 rounded-full border border-[var(--sage-green)]/25 bg-[var(--graphite)]/75 px-3 py-2 text-[var(--sage-green)] backdrop-blur-sm sm:right-5"
                >
                  {activeMode === 'silent' ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">
                    {activeMode === 'silent' ? t('soundSealed') : t('soundLeaking')}
                  </span>
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white sm:p-5">
                  <motion.div
                    key={activeMode + '-video-label'}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/65">
                      {activeMode === 'noisy' ? t('openDoorLabel') : t('closedDoorLabel')}
                    </p>
                    <p className="mt-1 text-lg font-semibold leading-tight sm:text-xl">
                      {activeMode === 'noisy'
                        ? t('office85')
                        : t('silent30')}
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="text-center md:text-left">
                <div className="mb-10 flex h-36 items-end justify-center gap-1.5 sm:gap-2 md:h-52 md:justify-start">
                  {soundBars.map((height, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 origin-bottom rounded-full sm:w-3 ${
                        activeMode === 'noisy' ? 'bg-amber-400' : 'bg-[var(--sage-green)]'
                      }`}
                      style={{ height: `${height}%` }}
                      animate={{
                        scaleY:
                          activeMode === 'noisy' ? [0.7, 1, 0.8] : [0.16, 0.24, 0.16],
                      }}
                      transition={{
                        duration: activeMode === 'noisy' ? 0.9 : 1.2,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  key={activeMode + '-db'}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 text-white"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontWeight: 600,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {activeMode === 'noisy' ? '85' : '30'} dB
                </motion.div>

                <motion.p
                  key={activeMode + '-desc'}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mx-auto max-w-md text-[var(--soft-gray)] md:mx-0"
                  style={{ fontSize: '1.125rem', lineHeight: 1.6 }}
                >
                  {activeMode === 'noisy'
                    ? t('noisyDesc')
                    : t('silentDesc')}
                </motion.p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm sm:flex-row sm:text-left"
          >
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--sage-green)]">
                {t('showroomDemo')}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {t('hearShowroom')}
              </h3>
              <p className="mt-2 max-w-xl text-[var(--soft-gray)]">
                {t('bringDemo')}
              </p>
            </div>
            <button
              type="button"
              onClick={openQuoteRequest}
              className="w-full rounded-xl bg-[var(--sage-green)] px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#248f72] sm:w-auto"
            >
              {t('bookSoundDemo')}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            {[
              {
                value: '55dB',
                label: t('noiseReduction'),
                icon: '55',
              },
              {
                value: '99.7%',
                label: t('soundAbsorption'),
                icon: '%',
              },
              {
                value: '< 30dB',
                label: t('insideBooth'),
                icon: 'dB',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="mb-3 text-3xl font-semibold text-[var(--sage-green)]">
                  {stat.icon}
                </div>
                <div
                  className="mb-2 text-white"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 600,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {stat.value}
                </div>
                <p
                  className="text-[var(--soft-gray)]"
                  style={{ fontSize: '0.9375rem' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
