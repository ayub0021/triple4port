import {useEffect, useRef, useState, type PointerEvent} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {
  ArrowLeft,
  Award,
  Database,
  FolderGit2,
  Mail,
  Maximize2,
  Minimize2,
  Minus,
  Palette,
  Shield,
  Terminal,
  User,
  X,
} from 'lucide-react';
import {MODULES, type ModuleId} from '../data/portfolioData';
import {useEnvironment} from '../context/EnvironmentContext';
import {ProjectExplorer} from './ProjectExplorer';
import {InteractiveTerminal} from './InteractiveTerminal';
import {ProfileView} from './views/ProfileView';
import {SecurityView} from './views/SecurityView';
import {CreativeView} from './views/CreativeView';
import {LeadershipView} from './views/LeadershipView';
import {DataLabView} from './views/DataLabView';
import {ContactView} from './views/ContactView';

const WINDOW_ICONS: Record<ModuleId, typeof User> = {
  profile: User,
  projects: FolderGit2,
  security: Shield,
  creative: Palette,
  data: Database,
  leadership: Award,
  terminal: Terminal,
  contact: Mail,
};

function renderModuleBody(id: ModuleId) {
  switch (id) {
    case 'profile':
      return <ProfileView />;
    case 'projects':
      return <ProjectExplorer />;
    case 'security':
      return <SecurityView />;
    case 'creative':
      return <CreativeView />;
    case 'leadership':
      return <LeadershipView />;
    case 'data':
      return <DataLabView />;
    case 'terminal':
      return <InteractiveTerminal />;
    case 'contact':
      return <ContactView />;
  }
}

export function WindowManager() {
  const prefersReducedMotion = useReducedMotion();
  const {
    activeWindow,
    selectedProjectId,
    maximizedWindow,
    minimizeWindow,
    closeWindow,
    toggleMaximize,
    closeProjectDetail,
    goHome,
  } = useEnvironment();

  const [offset, setOffset] = useState({x: 0, y: 0});
  const dragOrigin = useRef<{
    pointerX: number;
    pointerY: number;
    startX: number;
    startY: number;
  } | null>(null);

  // Reset drag offset cleanly whenever window or maximize state changes
  useEffect(() => {
    setOffset({x: 0, y: 0});
  }, [activeWindow, maximizedWindow]);

  useEffect(() => {
    const onPointerMove = (e: globalThis.PointerEvent) => {
      if (!dragOrigin.current) return;
      const dx = e.clientX - dragOrigin.current.pointerX;
      const dy = e.clientY - dragOrigin.current.pointerY;
      // Clamp window movement within safe desktop bounds
      const nextX = Math.max(-180, Math.min(180, dragOrigin.current.startX + dx));
      const nextY = Math.max(-40, Math.min(80, dragOrigin.current.startY + dy));
      setOffset({x: nextX, y: nextY});
    };

    const onPointerUp = () => {
      dragOrigin.current = null;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  if (!activeWindow) {
    return null;
  }

  const currentMeta = MODULES.find((m) => m.id === activeWindow);
  if (!currentMeta) return null;

  const Icon = WINDOW_ICONS[activeWindow];
  const isMaximized = maximizedWindow === activeWindow;

  const handleTitlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (isMaximized || window.innerWidth < 1024) return;
    if ((e.target as HTMLElement).closest('button')) return;
    dragOrigin.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      startX: offset.x,
      startY: offset.y,
    };
  };

  return (
    <div
      className={
        isMaximized
          ? 'fixed inset-0 z-30 flex flex-col bg-[#080B0A] lg:top-10 lg:bottom-16 lg:px-4 lg:py-2'
          : 'mx-auto flex h-full w-full max-w-5xl items-center justify-center lg:px-6 lg:py-4'
      }
    >
      <motion.section
        key={activeWindow}
        aria-label={`${currentMeta.title} Window`}
        initial={prefersReducedMotion ? false : {opacity: 0, scale: 0.985, y: 8}}
        animate={{opacity: 1, scale: 1, y: 0}}
        transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
        style={
          !isMaximized
            ? {transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`}
            : undefined
        }
        className={`flex w-full flex-col overflow-hidden border-[#E8F0EA]/14 bg-[#101613] shadow-2xl ${
          isMaximized
            ? 'h-full rounded-none lg:rounded-xl lg:border'
            : 'min-h-[calc(100dvh-6.75rem)] lg:min-h-0 lg:h-[min(74dvh,660px)] lg:rounded-xl lg:border'
        }`}
      >
        {/* Minimal Consistent Title Bar */}
        <div
          onPointerDown={handleTitlePointerDown}
          className="flex h-11 shrink-0 items-center justify-between gap-4 border-b border-[#E8F0EA]/10 bg-[#0B0F0D] px-4 select-none lg:cursor-grab lg:active:cursor-grabbing"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {activeWindow === 'projects' && selectedProjectId ? (
              <button
                type="button"
                onClick={closeProjectDetail}
                aria-label="Back to Projects"
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-[#E8F0EA]/12 bg-[#101613] text-[#E8F0EA] hover:border-[#39E75F] hover:text-[#39E75F] transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ) : (
              <Icon
                className="h-4 w-4 text-[#39E75F] shrink-0"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            )}

            <h2 className="truncate font-display text-sm font-semibold tracking-wide text-[#E8F0EA]">
              {currentMeta.title}
            </h2>
          </div>

          {/* Window Controls + Persistent Desktop Return */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={goHome}
              className="hidden sm:inline-flex items-center rounded px-2 py-1 font-mono text-[11px] text-[#84938A] hover:bg-[#101613] hover:text-[#E8F0EA] transition-colors cursor-pointer mr-1"
            >
              Desktop
            </button>

            <button
              type="button"
              onClick={() => minimizeWindow(activeWindow)}
              aria-label={`Minimize ${currentMeta.title}`}
              title="Minimize"
              className="hidden lg:inline-flex h-7 w-7 items-center justify-center rounded border border-[#E8F0EA]/10 bg-[#101613] text-[#84938A] hover:border-[#00D9FF]/50 hover:text-[#00D9FF] transition-colors cursor-pointer"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => toggleMaximize(activeWindow)}
              aria-label={
                isMaximized
                  ? `Restore ${currentMeta.title}`
                  : `Maximize ${currentMeta.title}`
              }
              title={isMaximized ? 'Restore' : 'Maximize'}
              className="hidden lg:inline-flex h-7 w-7 items-center justify-center rounded border border-[#E8F0EA]/10 bg-[#101613] text-[#84938A] hover:border-[#39E75F]/50 hover:text-[#39E75F] transition-colors cursor-pointer"
            >
              {isMaximized ? (
                <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => closeWindow(activeWindow)}
              aria-label={`Close ${currentMeta.title}`}
              title="Close"
              className="inline-flex h-7 w-7 items-center justify-center rounded border border-[#E8F0EA]/10 bg-[#101613] text-[#84938A] hover:border-[#FB7185]/60 hover:text-[#FB7185] transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Application Content */}
        <div className="flex-1 overflow-y-auto">
          {renderModuleBody(activeWindow)}
        </div>
      </motion.section>
    </div>
  );
}
