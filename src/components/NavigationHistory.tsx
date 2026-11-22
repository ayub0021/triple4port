import {useEffect, useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import {MODULES, PROJECTS} from '../data/portfolioData';
import {useEnvironment} from '../context/EnvironmentContext';

function formatLocalTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function NavigationHistory() {
  const {
    activeWindow,
    selectedProjectId,
    canGoBack,
    canGoForward,
    goHome,
    goBack,
    goForward,
    openModule,
    closeProjectDetail,
    replayBoot,
  } = useEnvironment();

  const [clock, setClock] = useState(() => formatLocalTime(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(formatLocalTime(new Date()));
    }, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const currentModule = activeWindow
    ? MODULES.find((m) => m.id === activeWindow) ?? null
    : null;

  const currentProject =
    activeWindow === 'projects' && selectedProjectId
      ? PROJECTS.find((p) => p.id === selectedProjectId) ?? null
      : null;

  return (
    <header className="hidden lg:flex h-10 shrink-0 items-center justify-between gap-6 border-b border-[#E8F0EA]/10 bg-[#080B0A]/90 px-5 backdrop-blur-md no-print">
      {/* Left: Brand + History Navigation + Breadcrumbs */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={goHome}
          title="Return to TRIPLE 4 OS Desktop"
          className="font-display text-xs font-bold tracking-wider text-[#E8F0EA] hover:text-[#39E75F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          TRIPLE 4 OS
        </button>

        {(canGoBack || canGoForward || currentModule) && (
          <div className="flex items-center gap-1 border-l border-[#E8F0EA]/10 pl-3">
            <button
              type="button"
              onClick={goBack}
              disabled={!canGoBack}
              aria-label="Navigate back"
              title="Back"
              className="inline-flex h-6 w-6 items-center justify-center rounded text-[#84938A] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#101613] hover:text-[#E8F0EA] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goForward}
              disabled={!canGoForward}
              aria-label="Navigate forward"
              title="Forward"
              className="inline-flex h-6 w-6 items-center justify-center rounded text-[#84938A] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#101613] hover:text-[#E8F0EA] transition-colors cursor-pointer"
            >
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        )}

        {currentModule && (
          <nav
            aria-label="System breadcrumbs"
            className="flex min-w-0 items-center gap-1 border-l border-[#E8F0EA]/10 pl-3 font-mono text-[11px] text-[#84938A]"
          >
            <button
              type="button"
              onClick={goHome}
              className="hover:text-[#E8F0EA] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Desktop
            </button>

            <ChevronRight className="h-3 w-3 shrink-0 opacity-50" aria-hidden="true" />

            <button
              type="button"
              onClick={() => {
                if (currentModule.id === 'projects' && currentProject) {
                  closeProjectDetail();
                } else {
                  openModule(currentModule.id);
                }
              }}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentProject ? 'hover:text-[#E8F0EA]' : 'text-[#00D9FF]'
              }`}
            >
              {currentModule.title}
            </button>

            {currentProject && (
              <>
                <ChevronRight className="h-3 w-3 shrink-0 opacity-50" aria-hidden="true" />
                <span className="truncate text-[#39E75F]">
                  {currentProject.title}
                </span>
              </>
            )}
          </nav>
        )}
      </div>

      {/* Right: Subtle System Status + Local Time */}
      <div className="flex items-center gap-4 shrink-0 font-mono text-[11px] text-[#84938A]">
        <button
          type="button"
          onClick={replayBoot}
          aria-label="Replay initialization sequence"
          title="Replay Boot Screen"
          className="inline-flex items-center gap-1 text-[#84938A] hover:text-[#E8F0EA] transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
        </button>

        <span className="text-[#84938A]">
          {currentModule ? `Active: ${currentModule.shortLabel}` : 'Ready'}
        </span>

        <time className="tabular-nums text-[#E8F0EA]/90">{clock}</time>
      </div>
    </header>
  );
}
