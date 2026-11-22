import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {MODULES, PROJECTS, type ModuleId} from '../data/portfolioData';

const BOOT_STORAGE_KEY = 'ayub_triple4_booted';
const VALID_MODULE_IDS = new Set<string>(MODULES.map((m) => m.id));

interface EnvironmentContextValue {
  hasBooted: boolean;
  enterEnvironment: () => void;
  skipBoot: () => void;
  replayBoot: () => void;
  openWindows: ModuleId[];
  minimizedWindows: ModuleId[];
  activeWindow: ModuleId | null;
  maximizedWindow: ModuleId | null;
  selectedProjectId: string | null;
  resumeOpen: boolean;
  setResumeOpen: (open: boolean) => void;
  openModule: (id: ModuleId) => void;
  openProject: (projectId: string) => void;
  closeProjectDetail: () => void;
  closeWindow: (id: ModuleId) => void;
  minimizeWindow: (id: ModuleId) => void;
  focusWindow: (id: ModuleId) => void;
  toggleMaximize: (id: ModuleId) => void;
  goHome: () => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  historyEntries: string[];
  historyIndex: number;
}

const EnvironmentContext = createContext<EnvironmentContextValue | null>(null);

function parseRoute(pathname: string): {
  moduleId: ModuleId | null;
  projectId: string | null;
} {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) {
    return {moduleId: null, projectId: null};
  }
  const segments = clean.split('/');
  const first = segments[0];

  if (first === 'projects') {
    const second = segments[1] ?? null;
    const validProject =
      second && PROJECTS.some((p) => p.id === second) ? second : null;
    return {moduleId: 'projects', projectId: validProject};
  }

  if (VALID_MODULE_IDS.has(first)) {
    return {moduleId: first as ModuleId, projectId: null};
  }

  return {moduleId: null, projectId: null};
}

export function EnvironmentProvider({children}: {children: ReactNode}) {
  const location = useLocation();
  const navigate = useNavigate();

  const initialRoute = parseRoute(location.pathname);

  const [hasBooted, setHasBooted] = useState<boolean>(() => {
    // Deep links bypass boot so bookmarked URLs open directly
    if (initialRoute.moduleId !== null) {
      return true;
    }
    try {
      return sessionStorage.getItem(BOOT_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [openWindows, setOpenWindows] = useState<ModuleId[]>(() =>
    initialRoute.moduleId ? [initialRoute.moduleId] : []
  );
  const [minimizedWindows, setMinimizedWindows] = useState<ModuleId[]>([]);
  const [activeWindow, setActiveWindow] = useState<ModuleId | null>(
    initialRoute.moduleId
  );
  const [maximizedWindow, setMaximizedWindow] = useState<ModuleId | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    initialRoute.projectId
  );
  const [resumeOpen, setResumeOpen] = useState(false);

  // Track navigable history stack for UI Back/Forward controls
  const [historyEntries, setHistoryEntries] = useState<string[]>([
    location.pathname || '/',
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Sync URL -> workspace state when location changes (e.g. browser back/forward)
  useEffect(() => {
    const path = location.pathname || '/';
    const {moduleId, projectId} = parseRoute(path);

    if (moduleId) {
      setHasBooted(true);
      setOpenWindows((prev) =>
        prev.includes(moduleId) ? prev : [...prev, moduleId]
      );
      setMinimizedWindows((prev) => prev.filter((w) => w !== moduleId));
      setActiveWindow(moduleId);
      setSelectedProjectId(moduleId === 'projects' ? projectId : null);
    } else {
      setActiveWindow(null);
      setSelectedProjectId(null);
      setMaximizedWindow(null);
    }
  }, [location.pathname]);

  const navigateWithHistory = useCallback(
    (targetPath: string) => {
      const current = location.pathname || '/';
      if (current === targetPath) return;

      setHistoryEntries((prev) => {
        const sliced = prev.slice(0, historyIndex + 1);
        const next = [...sliced, targetPath];
        setHistoryIndex(next.length - 1);
        return next;
      });
      navigate(targetPath);
    },
    [historyIndex, location.pathname, navigate]
  );

  const persistBoot = useCallback(() => {
    setHasBooted(true);
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage failures
    }
  }, []);

  const enterEnvironment = useCallback(() => {
    persistBoot();
  }, [persistBoot]);

  const skipBoot = useCallback(() => {
    persistBoot();
  }, [persistBoot]);

  const replayBoot = useCallback(() => {
    try {
      sessionStorage.removeItem(BOOT_STORAGE_KEY);
    } catch {
      // Ignore storage failures
    }
    setHasBooted(false);
    navigate('/');
  }, [navigate]);

  const openModule = useCallback(
    (id: ModuleId) => {
      setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setMinimizedWindows((prev) => prev.filter((w) => w !== id));
      setActiveWindow(id);
      navigateWithHistory(`/${id}`);
    },
    [navigateWithHistory]
  );

  const openProject = useCallback(
    (projectId: string) => {
      setOpenWindows((prev) =>
        prev.includes('projects') ? prev : [...prev, 'projects']
      );
      setMinimizedWindows((prev) => prev.filter((w) => w !== 'projects'));
      setActiveWindow('projects');
      setSelectedProjectId(projectId);
      navigateWithHistory(`/projects/${projectId}`);
    },
    [navigateWithHistory]
  );

  const closeProjectDetail = useCallback(() => {
    setSelectedProjectId(null);
    navigateWithHistory('/projects');
  }, [navigateWithHistory]);

  const focusWindow = useCallback(
    (id: ModuleId) => {
      setMinimizedWindows((prev) => prev.filter((w) => w !== id));
      setActiveWindow(id);
      if (id === 'projects' && selectedProjectId) {
        navigateWithHistory(`/projects/${selectedProjectId}`);
      } else {
        navigateWithHistory(`/${id}`);
      }
    },
    [navigateWithHistory, selectedProjectId]
  );

  const minimizeWindow = useCallback(
    (id: ModuleId) => {
      setMinimizedWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
      if (maximizedWindow === id) {
        setMaximizedWindow(null);
      }
      if (activeWindow === id) {
        const remaining = openWindows.filter(
          (w) => w !== id && !minimizedWindows.includes(w)
        );
        const nextActive = remaining[remaining.length - 1] ?? null;
        setActiveWindow(nextActive);
        navigateWithHistory(nextActive ? `/${nextActive}` : '/');
      }
    },
    [activeWindow, maximizedWindow, minimizedWindows, navigateWithHistory, openWindows]
  );

  const closeWindow = useCallback(
    (id: ModuleId) => {
      const nextOpen = openWindows.filter((w) => w !== id);
      setOpenWindows(nextOpen);
      setMinimizedWindows((prev) => prev.filter((w) => w !== id));
      if (maximizedWindow === id) {
        setMaximizedWindow(null);
      }
      if (id === 'projects') {
        setSelectedProjectId(null);
      }
      if (activeWindow === id) {
        const visibleRemaining = nextOpen.filter(
          (w) => !minimizedWindows.includes(w)
        );
        const nextActive = visibleRemaining[visibleRemaining.length - 1] ?? null;
        setActiveWindow(nextActive);
        navigateWithHistory(nextActive ? `/${nextActive}` : '/');
      }
    },
    [activeWindow, maximizedWindow, minimizedWindows, navigateWithHistory, openWindows]
  );

  const toggleMaximize = useCallback((id: ModuleId) => {
    setMaximizedWindow((prev) => (prev === id ? null : id));
    setActiveWindow(id);
  }, []);

  const goHome = useCallback(() => {
    setActiveWindow(null);
    setMaximizedWindow(null);
    navigateWithHistory('/');
  }, [navigateWithHistory]);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < historyEntries.length - 1;

  const goBack = useCallback(() => {
    if (!canGoBack) return;
    const nextIndex = historyIndex - 1;
    setHistoryIndex(nextIndex);
    navigate(historyEntries[nextIndex]);
  }, [canGoBack, historyEntries, historyIndex, navigate]);

  const goForward = useCallback(() => {
    if (!canGoForward) return;
    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    navigate(historyEntries[nextIndex]);
  }, [canGoForward, historyEntries, historyIndex, navigate]);

  const value = useMemo<EnvironmentContextValue>(
    () => ({
      hasBooted,
      enterEnvironment,
      skipBoot,
      replayBoot,
      openWindows,
      minimizedWindows,
      activeWindow,
      maximizedWindow,
      selectedProjectId,
      resumeOpen,
      setResumeOpen,
      openModule,
      openProject,
      closeProjectDetail,
      closeWindow,
      minimizeWindow,
      focusWindow,
      toggleMaximize,
      goHome,
      goBack,
      goForward,
      canGoBack,
      canGoForward,
      historyEntries,
      historyIndex,
    }),
    [
      activeWindow,
      canGoBack,
      canGoForward,
      closeProjectDetail,
      closeWindow,
      enterEnvironment,
      focusWindow,
      goBack,
      goForward,
      goHome,
      hasBooted,
      historyEntries,
      historyIndex,
      maximizedWindow,
      minimizeWindow,
      openModule,
      openProject,
      openWindows,
      replayBoot,
      resumeOpen,
      selectedProjectId,
      skipBoot,
      toggleMaximize,
    ]
  );

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const ctx = useContext(EnvironmentContext);
  if (!ctx) {
    throw new Error('useEnvironment must be used within EnvironmentProvider');
  }
  return ctx;
}
