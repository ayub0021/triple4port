import {useEffect, useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {ArrowRight, FastForward, Terminal} from 'lucide-react';
import {PERSONAL_INFO} from '../data/portfolioData';

interface BootScreenProps {
  onEnter: () => void;
  onSkip: () => void;
}

const BOOT_SEQUENCE = [
  'Initializing TRIPLE 4 OS workspace...',
  'Identity loaded: Mohammed Ayub A (B.Tech IT · KPRIET)',
  'Applications ready: Profile · Projects · Security · Creative · Data Lab · Leadership',
  'Environment ready.',
];

export function BootScreen({onEnter, onSkip}: BootScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState<number>(
    prefersReducedMotion ? BOOT_SEQUENCE.length : 1
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleLines(BOOT_SEQUENCE.length);
      return;
    }

    const timers: number[] = [];
    BOOT_SEQUENCE.forEach((_, idx) => {
      if (idx === 0) return;
      const t = window.setTimeout(() => {
        setVisibleLines(idx + 1);
      }, idx * 280);
      timers.push(t);
    });

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [prefersReducedMotion]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onEnter();
      } else if (e.key === 'Escape') {
        onSkip();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onEnter, onSkip]);

  const ready = visibleLines >= BOOT_SEQUENCE.length;

  return (
    <div
      role="main"
      aria-label="TRIPLE 4 OS Initialization"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-4 py-10 os-wallpaper"
    >
      <div className="absolute top-5 right-5 z-10">
        <button
          type="button"
          onClick={onSkip}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#E8F0EA]/12 bg-[#101613] px-3.5 py-2 font-mono text-xs text-[#84938A] hover:border-[#00D9FF]/50 hover:text-[#E8F0EA] transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Skip</span>
          <FastForward className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <motion.div
        initial={prefersReducedMotion ? false : {opacity: 0, y: 12}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
        className="relative z-10 w-full max-w-xl rounded-xl border border-[#E8F0EA]/12 bg-[#101613]/95 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#E8F0EA]/10 px-5 py-3 font-mono text-xs text-[#84938A]">
          <span className="inline-flex items-center gap-2 text-[#E8F0EA]">
            <Terminal className="h-3.5 w-3.5 text-[#39E75F]" aria-hidden="true" />
            <span>TRIPLE 4 OS</span>
          </span>
          <span>{PERSONAL_INFO.brand}</span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <p className="font-mono text-xs tracking-wider text-[#39E75F]">
              {PERSONAL_INFO.heroBrand}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#E8F0EA] sm:text-4xl">
              {PERSONAL_INFO.tagline}
            </h1>
            <p className="mt-2 text-sm text-[#84938A]">
              {PERSONAL_INFO.roles.join('  ·  ')}
            </p>
          </div>

          <div
            aria-live="polite"
            className="rounded-lg border border-[#E8F0EA]/8 bg-[#080B0A] p-4 font-mono text-xs space-y-2 min-h-[112px]"
          >
            {BOOT_SEQUENCE.slice(0, visibleLines).map((line, idx) => (
              <motion.div
                key={line}
                initial={prefersReducedMotion ? false : {opacity: 0, x: -4}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.18}}
                className="flex items-start gap-2.5"
              >
                <span className="text-[#39E75F] shrink-0" aria-hidden="true">
                  0{idx + 1}
                </span>
                <span
                  className={
                    idx === BOOT_SEQUENCE.length - 1
                      ? 'text-[#39E75F]'
                      : 'text-[#E8F0EA]/85'
                  }
                >
                  {line}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onEnter}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#39E75F] px-5 py-2.5 text-sm font-semibold text-[#080B0A] hover:bg-[#52ee74] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{ready ? 'Enter Desktop' : 'Initialize Desktop'}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <span className="font-mono text-[11px] text-[#84938A]">
              Enter to launch · Esc to skip
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
