import {motion, useReducedMotion} from 'motion/react';
import {
  Award,
  Database,
  FolderGit2,
  Palette,
  Shield,
  User,
} from 'lucide-react';
import {
  DESKTOP_APP_IDS,
  MODULES,
  PERSONAL_INFO,
  type ModuleId,
} from '../data/portfolioData';
import {useEnvironment} from '../context/EnvironmentContext';

const APP_ICONS: Partial<Record<ModuleId, typeof User>> = {
  profile: User,
  projects: FolderGit2,
  security: Shield,
  creative: Palette,
  data: Database,
  leadership: Award,
};

export function Dashboard() {
  const prefersReducedMotion = useReducedMotion();
  const {openModule, openWindows} = useEnvironment();

  const desktopApps = DESKTOP_APP_IDS.map((id) =>
    MODULES.find((m) => m.id === id)
  ).filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col items-center justify-center px-4 py-10 sm:px-8">
      {/* Minimal Portfolio Identity & Short Introduction */}
      <motion.div
        initial={prefersReducedMotion ? false : {opacity: 0, y: 8}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
        className="text-center max-w-xl"
      >
        <p className="font-mono text-xs tracking-widest text-[#39E75F]">
          {PERSONAL_INFO.brand}
        </p>

        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#E8F0EA] sm:text-5xl">
          {PERSONAL_INFO.fullName}
        </h1>

        <p className="mt-2.5 font-mono text-xs sm:text-sm tracking-wide text-[#00D9FF]">
          {PERSONAL_INFO.tagline}
        </p>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#84938A]">
          {PERSONAL_INFO.intro}
        </p>
      </motion.div>

      {/* Spacious 6 Primary Application Icons Grid */}
      <nav
        aria-label="Desktop Applications"
        className="mt-12 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-10"
      >
        {desktopApps.map((app, idx) => {
          const Icon = APP_ICONS[app.id] ?? User;
          const isOpen = openWindows.includes(app.id);

          const hoverBorder =
            app.accent === 'cyan'
              ? 'group-hover:border-[#00D9FF]/60 group-hover:text-[#00D9FF]'
              : app.accent === 'violet'
              ? 'group-hover:border-[#C084FC]/60 group-hover:text-[#C084FC]'
              : 'group-hover:border-[#39E75F]/60 group-hover:text-[#39E75F]';

          return (
            <motion.button
              key={app.id}
              type="button"
              onClick={() => openModule(app.id)}
              title={app.summary}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{
                duration: 0.28,
                delay: Math.min(idx * 0.04, 0.24),
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={prefersReducedMotion ? undefined : {y: -3}}
              className="group relative flex flex-col items-center gap-3 rounded-xl p-2 focus-visible:outline-none cursor-pointer"
            >
              <span
                className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E8F0EA]/12 bg-[#101613]/90 text-[#E8F0EA]/90 transition-colors duration-150 ${hoverBorder}`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              </span>

              <span className="font-display text-sm font-medium tracking-wide text-[#E8F0EA] group-hover:text-[#39E75F] transition-colors whitespace-nowrap">
                {app.title}
              </span>

              {isOpen && (
                <span className="font-mono text-[10px] text-[#39E75F]">
                  Running
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
