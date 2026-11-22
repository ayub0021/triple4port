import {useEffect, useRef, useState, type FormEvent, type KeyboardEvent} from 'react';
import {CornerDownLeft, Terminal as TerminalIcon} from 'lucide-react';
import {
  LEADERSHIP_ITEMS,
  MODULES,
  PERSONAL_INFO,
  PROJECTS,
  SKILL_CATEGORIES,
  SOCIAL_PROFILES,
  type ModuleId,
} from '../data/portfolioData';
import {useEnvironment} from '../context/EnvironmentContext';

interface OutputLine {
  id: string;
  kind: 'command' | 'info' | 'success' | 'error' | 'links' | 'projects';
  text?: string;
  items?: {label: string; value?: string; action?: () => void; url?: string}[];
}

const QUICK_COMMANDS = [
  'help',
  'whoami',
  'about',
  'projects',
  'skills',
  'security',
  'creative',
  'leadership',
  'data',
  'contact',
  'socials',
  'resume',
  'clear',
];

export function InteractiveTerminal() {
  const {openModule, openProject, goHome, setResumeOpen} = useEnvironment();
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyCursor, setHistoryCursor] = useState<number>(-1);
  const [lines, setLines] = useState<OutputLine[]>([
    {
      id: 'welcome-1',
      kind: 'success',
      text: `${PERSONAL_INFO.brand} Interactive Shell — Portfolio Navigation & Explorer`,
    },
    {
      id: 'welcome-2',
      kind: 'info',
      text: "Type 'help' for available commands, or click any quick command below.",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const appendLines = (...newLines: Omit<OutputLine, 'id'>[]) => {
    const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setLines((prev) => [
      ...prev,
      ...newLines.map((l, idx) => ({...l, id: `${stamp}-${idx}`})),
    ]);
  };

  const executeCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryCursor(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    appendLines({kind: 'command', text: trimmed});

    switch (cmd) {
      case 'help':
      case '?':
        appendLines(
          {
            kind: 'info',
            text: 'Available commands:',
          },
          {
            kind: 'links',
            items: [
              {label: 'whoami', value: 'Identity & roles'},
              {label: 'about', value: 'Education, CGPA & philosophy'},
              {label: 'projects', value: 'List projects & open explorer'},
              {label: 'skills', value: 'Display technical inventory'},
              {label: 'security', value: 'Open Security Lab module'},
              {label: 'creative', value: 'Open Creative Lab module'},
              {label: 'leadership', value: 'View & open Leadership milestones'},
              {label: 'data', value: 'Open Data & ML Lab module'},
              {label: 'contact', value: 'Open Contact module & email'},
              {label: 'socials', value: 'Display external profile links'},
              {label: 'resume', value: 'Open Resume preview & download'},
              {label: 'open <target>', value: 'Navigate to module or project ID'},
              {label: 'home', value: 'Return to Dashboard'},
              {label: 'clear', value: 'Clear terminal output'},
            ],
          }
        );
        break;

      case 'whoami':
        appendLines(
          {
            kind: 'success',
            text: `${PERSONAL_INFO.fullName} // ${PERSONAL_INFO.brand}`,
          },
          {
            kind: 'info',
            text: `Roles: ${PERSONAL_INFO.roles.join(' · ')}`,
          },
          {
            kind: 'info',
            text: `${PERSONAL_INFO.degree} at ${PERSONAL_INFO.institution}`,
          }
        );
        break;

      case 'about':
        appendLines(
          {
            kind: 'success',
            text: `${PERSONAL_INFO.fullName} — ${PERSONAL_INFO.degree}`,
          },
          {
            kind: 'info',
            text: `Institution: ${PERSONAL_INFO.institution} | Current CGPA: ${PERSONAL_INFO.cgpa}`,
          },
          {
            kind: 'info',
            text: `Philosophy: "${PERSONAL_INFO.philosophy}"`,
          },
          {
            kind: 'links',
            items: [
              {
                label: 'Open Profile Window →',
                action: () => openModule('profile'),
              },
            ],
          }
        );
        break;

      case 'ls':
      case 'projects':
        appendLines(
          {
            kind: 'info',
            text: `Project Archive (${PROJECTS.length} entries) — click any file to inspect or run "open <id>":`,
          },
          {
            kind: 'projects',
            items: PROJECTS.map((p) => ({
              label: p.fileName,
              value: `${p.title} [${p.statusTag}]`,
              action: () => openProject(p.id),
            })),
          },
          {
            kind: 'links',
            items: [
              {
                label: 'Open Project Explorer →',
                action: () => openModule('projects'),
              },
            ],
          }
        );
        break;

      case 'skills':
        appendLines(
          {kind: 'info', text: 'Technical Inventory (no arbitrary proficiency ratings):'},
          {
            kind: 'links',
            items: SKILL_CATEGORIES.map((cat) => ({
              label: cat.category,
              value: cat.items.join(', '),
            })),
          }
        );
        break;

      case 'security':
        appendLines({
          kind: 'success',
          text: 'Navigating to SECURITY LAB (TryHackMe · SOC Fundamentals · Arch Linux · Cyber Law)...',
        });
        openModule('security');
        break;

      case 'creative':
        appendLines({
          kind: 'success',
          text: 'Navigating to CREATIVE LAB (Posters · LaunchPad Branding · Photography)...',
        });
        openModule('creative');
        break;

      case 'leadership':
        appendLines(
          {
            kind: 'info',
            text: 'Leadership & Achievements:',
          },
          {
            kind: 'links',
            items: LEADERSHIP_ITEMS.map((item) => ({
              label: item.index,
              value: `${item.role} (${item.metric})`,
            })),
          },
          {
            kind: 'links',
            items: [
              {
                label: 'Open Leadership Window →',
                action: () => openModule('leadership'),
              },
            ],
          }
        );
        break;

      case 'data':
        appendLines({
          kind: 'success',
          text: 'Navigating to DATA LAB (Amazon ML Challenge 2026 · SQLite FTS5 · ML Foundations)...',
        });
        openModule('data');
        break;

      case 'contact':
        appendLines(
          {
            kind: 'info',
            text: `Email: ${PERSONAL_INFO.email}`,
          },
          {
            kind: 'success',
            text: 'Opening CONTACT module...',
          }
        );
        openModule('contact');
        break;

      case 'socials':
        appendLines(
          {kind: 'info', text: 'Verified Profiles:'},
          {
            kind: 'links',
            items: SOCIAL_PROFILES.filter((s) => !s.isPlaceholder).map((s) => ({
              label: s.platform,
              value: s.handle,
              url: s.url,
            })),
          }
        );
        break;

      case 'resume':
        appendLines({
          kind: 'success',
          text: 'Opening Resume Preview & Export modal...',
        });
        setResumeOpen(true);
        break;

      case 'home':
      case 'dashboard':
        appendLines({
          kind: 'success',
          text: 'Returning to Main Dashboard...',
        });
        goHome();
        break;

      case 'open':
      case 'cd': {
        if (!arg) {
          appendLines({
            kind: 'error',
            text: 'Specify a module or project id. Example: "open projects" or "open anchorman".',
          });
          break;
        }
        const matchedModule = MODULES.find(
          (m) =>
            m.id === arg ||
            m.shortLabel.toLowerCase() === arg ||
            m.title.toLowerCase() === arg
        );
        if (matchedModule) {
          appendLines({
            kind: 'success',
            text: `Opening ${matchedModule.title}...`,
          });
          openModule(matchedModule.id as ModuleId);
          break;
        }
        const matchedProject = PROJECTS.find(
          (p) =>
            p.id === arg ||
            p.fileName.toLowerCase() === arg ||
            p.title.toLowerCase().includes(arg)
        );
        if (matchedProject) {
          appendLines({
            kind: 'success',
            text: `Opening project ${matchedProject.title}...`,
          });
          openProject(matchedProject.id);
          break;
        }
        appendLines({
          kind: 'error',
          text: `Target "${arg}" not found. Type "projects" or "help" to list valid targets.`,
        });
        break;
      }

      default:
        appendLines({
          kind: 'error',
          text: `Command not recognized: "${trimmed}". Type 'help' to see available commands.`,
        });
        break;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = Math.min(historyCursor + 1, cmdHistory.length - 1);
      setHistoryCursor(next);
      setInput(cmdHistory[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyCursor <= 0) {
        setHistoryCursor(-1);
        setInput('');
      } else {
        const next = historyCursor - 1;
        setHistoryCursor(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.trim().toLowerCase();
      if (!val) return;
      const match = QUICK_COMMANDS.find((c) => c.startsWith(val));
      if (match) setInput(match);
    }
  };

  return (
    <div
      className="flex h-full min-h-[420px] flex-col bg-[#080B0A] font-mono text-xs sm:text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Quick Command Bar */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#E8F0EA]/10 bg-[#0D1210] px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-[#84938A] mr-2">
          <TerminalIcon className="h-3.5 w-3.5 text-[#39E75F]" aria-hidden="true" />
          <span>Quick commands:</span>
        </span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(cmd);
            }}
            className="rounded border border-[#E8F0EA]/10 bg-[#101613] px-2 py-1 text-[11px] text-[#E8F0EA]/85 hover:border-[#39E75F]/60 hover:text-[#39E75F] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Output Log */}
      <div
        ref={scrollRef}
        aria-live="polite"
        className="flex-1 space-y-2.5 overflow-y-auto p-4 sm:p-5"
      >
        {lines.map((line) => {
          if (line.kind === 'command') {
            return (
              <div key={line.id} className="flex items-center gap-2 text-[#E8F0EA]">
                <span className="text-[#39E75F]">ayub@triple4:~$</span>
                <span>{line.text}</span>
              </div>
            );
          }

          if (line.kind === 'error') {
            return (
              <p key={line.id} className="text-[#FB7185] pl-2">
                {line.text}
              </p>
            );
          }

          if (line.kind === 'success') {
            return (
              <p key={line.id} className="text-[#39E75F] pl-2">
                {line.text}
              </p>
            );
          }

          if (line.kind === 'links' || line.kind === 'projects') {
            return (
              <div key={line.id} className="space-y-1.5 pl-2 py-1">
                {line.items?.map((item, i) => (
                  <div key={`${item.label}-${i}`} className="flex flex-wrap items-baseline gap-2">
                    {item.action ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          item.action?.();
                        }}
                        className="text-left text-[#00D9FF] hover:text-[#39E75F] underline underline-offset-4 cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ) : item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#00D9FF] hover:text-[#39E75F] underline underline-offset-4"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-[#39E75F] min-w-[110px]">
                        {item.label}
                      </span>
                    )}

                    {item.value && (
                      <span className="text-[#84938A]">— {item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            );
          }

          return (
            <p key={line.id} className="text-[#E8F0EA]/85 pl-2">
              {line.text}
            </p>
          );
        })}
      </div>

      {/* Input Prompt */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-[#E8F0EA]/10 bg-[#0D1210] px-4 py-3"
      >
        <label htmlFor="terminal-command-input" className="text-[#39E75F] shrink-0">
          ayub@triple4:~$
        </label>
        <input
          id="terminal-command-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command (e.g. help, projects, skills)..."
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-[#E8F0EA] placeholder:text-[#84938A]/60 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Run command"
          className="inline-flex items-center gap-1 rounded border border-[#E8F0EA]/15 bg-[#101613] px-2.5 py-1 text-xs text-[#E8F0EA] hover:border-[#39E75F] hover:text-[#39E75F] transition-colors cursor-pointer shrink-0"
        >
          <span>Run</span>
          <CornerDownLeft className="h-3 w-3" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
