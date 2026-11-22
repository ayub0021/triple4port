import {useEffect} from 'react';
import {
  FileText,
  Home,
  Mail,
  Terminal,
} from 'lucide-react';
import {MODULES} from '../data/portfolioData';
import {useEnvironment} from '../context/EnvironmentContext';
import {BootScreen} from './BootScreen';
import {NavigationHistory} from './NavigationHistory';
import {MobileNavigation} from './MobileNavigation';
import {Dashboard} from './Dashboard';
import {WindowManager} from './WindowManager';
import {ResumeModal} from './ResumeModal';
import {CustomCursor} from './CustomCursor';

export function DesktopEnvironment() {
  const {
    hasBooted,
    enterEnvironment,
    skipBoot,
    activeWindow,
    openWindows,
    focusWindow,
    openModule,
    goHome,
    resumeOpen,
    setResumeOpen,
  } = useEnvironment();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && resumeOpen) {
        setResumeOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [resumeOpen, setResumeOpen]);

  if (!hasBooted) {
    return (
      <>
        <CustomCursor />
        <BootScreen onEnter={enterEnvironment} onSkip={skipBoot} />
      </>
    );
  }

  const runningDesktopApps = openWindows.filter(
    (id) => id !== 'terminal' && id !== 'contact'
  );

  return (
    <div className="relative flex min-h-dvh lg:h-dvh w-full flex-col overflow-x-clip lg:overflow-hidden os-wallpaper text-[#E8F0EA]">
      <CustomCursor />

      {/* Slim Top Status Bar (Desktop & Mobile) */}
      <NavigationHistory />
      <MobileNavigation />

      {/* Main Desktop / Window Canvas */}
      <main
        id="main-content"
        className="relative z-10 flex-1 overflow-y-auto pb-16 lg:pb-0 lg:overflow-hidden"
      >
        {activeWindow === null ? <Dashboard /> : <WindowManager />}
      </main>

      {/* Compact Bottom Dock: Home, Terminal, Contact, Resume (+ Running Apps) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center p-2.5 sm:p-3 lg:static lg:p-0 lg:pb-3 no-print">
        <nav
          aria-label="System Dock"
          className="pointer-events-auto flex items-center gap-1.5 rounded-2xl border border-[#E8F0EA]/12 bg-[#0D1210]/94 px-2.5 py-1.5 shadow-xl backdrop-blur-md"
        >
          {/* Home */}
          <button
            type="button"
            onClick={goHome}
            title="Home — Desktop"
            aria-label="Home — Return to Desktop"
            className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeWindow === null
                ? 'bg-[#39E75F]/14 text-[#39E75F]'
                : 'text-[#84938A] hover:bg-[#101613] hover:text-[#E8F0EA]'
            }`}
          >
            <Home className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            <span className="hidden sm:inline">Home</span>
          </button>

          {/* Terminal */}
          <button
            type="button"
            onClick={() => openModule('terminal')}
            title="Terminal — Interactive Shell"
            aria-label="Open Terminal"
            className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeWindow === 'terminal'
                ? 'bg-[#00D9FF]/14 text-[#00D9FF]'
                : 'text-[#84938A] hover:bg-[#101613] hover:text-[#E8F0EA]'
            }`}
          >
            <Terminal className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            <span className="hidden sm:inline">Terminal</span>
          </button>

          {/* Contact */}
          <button
            type="button"
            onClick={() => openModule('contact')}
            title="Contact — Email & Profiles"
            aria-label="Open Contact"
            className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeWindow === 'contact'
                ? 'bg-[#39E75F]/14 text-[#39E75F]'
                : 'text-[#84938A] hover:bg-[#101613] hover:text-[#E8F0EA]'
            }`}
          >
            <Mail className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            <span className="hidden sm:inline">Contact</span>
          </button>

          {/* Resume */}
          <button
            type="button"
            onClick={() => setResumeOpen(true)}
            title="Resume — View & Download PDF"
            aria-label="Open Resume"
            className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              resumeOpen
                ? 'bg-[#39E75F]/14 text-[#39E75F]'
                : 'text-[#84938A] hover:bg-[#101613] hover:text-[#39E75F]'
            }`}
          >
            <FileText className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            <span className="hidden sm:inline">Resume</span>
          </button>

          {/* Open / Minimized Primary Apps quick-restore */}
          {runningDesktopApps.length > 0 && (
            <>
              <span
                aria-hidden="true"
                className="mx-1 hidden h-5 w-px bg-[#E8F0EA]/12 lg:inline-block"
              />
              <div className="hidden lg:flex items-center gap-1">
                {runningDesktopApps.map((appId) => {
                  const meta = MODULES.find((m) => m.id === appId);
                  if (!meta) return null;
                  const isFocused = activeWindow === appId;
                  return (
                    <button
                      key={appId}
                      type="button"
                      onClick={() => focusWindow(appId)}
                      title={`Switch to ${meta.title}`}
                      className={`rounded-xl px-2.5 py-1.5 font-mono text-[11px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isFocused
                          ? 'bg-[#101613] text-[#39E75F] border border-[#39E75F]/35'
                          : 'text-[#84938A] hover:bg-[#101613] hover:text-[#E8F0EA]'
                      }`}
                    >
                      {meta.shortLabel}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </nav>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
