import {useEffect, useState} from 'react';
import {ArrowLeft} from 'lucide-react';
import {MODULES} from '../data/portfolioData';
import {useEnvironment} from '../context/EnvironmentContext';

function formatLocalTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function MobileNavigation() {
  const {
    activeWindow,
    selectedProjectId,
    canGoBack,
    goHome,
    goBack,
    closeProjectDetail,
  } = useEnvironment();

  const [clock, setClock] = useState(() => formatLocalTime(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(formatLocalTime(new Date()));
    }, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const currentModule = activeWindow
    ? MODULES.find((m) => m.id === activeWindow)
    : null;

  return (
    <header className="sticky top-0 z-40 flex h-11 items-center justify-between gap-3 border-b border-[#E8F0EA]/10 bg-[#080B0A]/92 px-4 backdrop-blur-md lg:hidden no-print">
      <div className="flex items-center gap-2.5 min-w-0">
        {activeWindow !== null && (
          <button
            type="button"
            onClick={() => {
              if (selectedProjectId) {
                closeProjectDetail();
              } else if (canGoBack) {
                goBack();
              } else {
                goHome();
              }
            }}
            aria-label="Go back"
            className="inline-flex h-7 w-7 items-center justify-center rounded border border-[#E8F0EA]/15 bg-[#101613] text-[#E8F0EA] shrink-0 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}

        <button
          type="button"
          onClick={goHome}
          className="truncate font-display text-xs font-bold tracking-wider text-[#E8F0EA] cursor-pointer"
        >
          {currentModule ? `TRIPLE 4 OS / ${currentModule.title}` : 'TRIPLE 4 OS'}
        </button>
      </div>

      <time className="font-mono text-[11px] tabular-nums text-[#84938A] shrink-0">
        {clock}
      </time>
    </header>
  );
}
