import {useMemo, useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {
  ChevronRight,
  FileCode2,
  Folder,
  FolderOpen,
  Search,
} from 'lucide-react';
import {
  PROJECTS,
  type ProjectCategory,
  type ProjectStatusTag,
} from '../data/portfolioData';
import {useEnvironment} from '../context/EnvironmentContext';
import {ProjectDetail} from './ProjectDetail';

const FOLDERS: {id: ProjectCategory; label: string; count: number}[] = [
  {id: 'All', label: 'All Files', count: PROJECTS.length},
  {
    id: 'Development',
    label: 'Development',
    count: PROJECTS.filter((p) => p.categories.includes('Development')).length,
  },
  {
    id: 'Machine Learning',
    label: 'Machine Learning',
    count: PROJECTS.filter((p) => p.categories.includes('Machine Learning'))
      .length,
  },
  {
    id: 'Concepts',
    label: 'Concepts',
    count: PROJECTS.filter((p) => p.categories.includes('Concepts')).length,
  },
  {
    id: 'Creative',
    label: 'Creative',
    count: PROJECTS.filter((p) => p.categories.includes('Creative')).length,
  },
];

const STATUS_FILTERS: ('ALL' | ProjectStatusTag)[] = [
  'ALL',
  'ACTIVE',
  'COMPLETED',
  'CONCEPT',
  'EXPLORATION',
];

function getStatusTextColor(tag: ProjectStatusTag) {
  switch (tag) {
    case 'ACTIVE':
      return 'text-[#00D9FF]';
    case 'COMPLETED':
      return 'text-[#39E75F]';
    case 'CONCEPT':
      return 'text-[#C084FC]';
    case 'EXPLORATION':
      return 'text-[#39E75F]';
    case 'LEARNING':
      return 'text-[#00D9FF]';
  }
}

export function ProjectExplorer() {
  const prefersReducedMotion = useReducedMotion();
  const {selectedProjectId, openProject} = useEnvironment();
  const [selectedFolder, setSelectedFolder] = useState<ProjectCategory>('All');
  const [statusFilter, setStatusFilter] = useState<'ALL' | ProjectStatusTag>(
    'ALL'
  );
  const [query, setQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const folderMatch =
        selectedFolder === 'All' ||
        project.categories.includes(selectedFolder);
      const statusMatch =
        statusFilter === 'ALL' || project.statusTag === statusFilter;
      const q = query.trim().toLowerCase();
      const queryMatch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.fileName.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));
      return folderMatch && statusMatch && queryMatch;
    });
  }, [query, selectedFolder, statusFilter]);

  if (selectedProjectId) {
    const project = PROJECTS.find((p) => p.id === selectedProjectId);
    if (project) {
      return <ProjectDetail project={project} />;
    }
  }

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Left File Explorer Directory Tree */}
      <aside
        aria-label="Project folders"
        className="w-full shrink-0 border-b border-[#E8F0EA]/10 bg-[#0B0F0D] p-4 lg:w-64 lg:border-r lg:border-b-0"
      >
        <p className="px-2 font-mono text-[11px] uppercase tracking-wider text-[#84938A]">
          Directory Tree
        </p>

        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {FOLDERS.map((folder) => {
            const active = selectedFolder === folder.id;
            return (
              <button
                key={folder.id}
                type="button"
                onClick={() => setSelectedFolder(folder.id)}
                className={`flex items-center justify-between gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#15201A] text-[#39E75F]'
                    : 'text-[#84938A] hover:bg-[#101613] hover:text-[#E8F0EA]'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {active ? (
                    <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <Folder className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  <span>{folder.label}</span>
                </span>
                <span className="font-mono text-[11px] tabular-nums opacity-75">
                  {folder.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 hidden lg:block border-t border-[#E8F0EA]/8 pt-4 px-2">
          <p className="font-mono text-[11px] text-[#84938A]">Status Legend</p>
          <ul className="mt-2.5 space-y-1.5 font-mono text-[11px]">
            <li className="text-[#00D9FF]">ACTIVE · In progress</li>
            <li className="text-[#39E75F]">COMPLETED · Finished build</li>
            <li className="text-[#C084FC]">CONCEPT · Product study</li>
            <li className="text-[#39E75F]">EXPLORATION · R&amp;D</li>
          </ul>
        </div>
      </aside>

      {/* Main File Explorer List */}
      <div className="flex-1 p-5 sm:p-6 overflow-y-auto">
        <div className="flex flex-col gap-4 border-b border-[#E8F0EA]/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs text-[#84938A]">
              /projects/{selectedFolder === 'All' ? 'all' : selectedFolder.toLowerCase().replace(/\s+/g, '-')}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-[#E8F0EA]">
              Project Archive
            </h2>
          </div>

          {/* Search input */}
          <label className="relative flex items-center">
            <Search
              className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#84938A]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter files or stack..."
              aria-label="Filter projects"
              className="w-full sm:w-56 rounded-md border border-[#E8F0EA]/12 bg-[#080B0A] py-2 pl-9 pr-3 font-mono text-xs text-[#E8F0EA] placeholder:text-[#84938A] focus:border-[#00D9FF] focus:outline-none"
            />
          </label>
        </div>

        {/* Status Filter Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {STATUS_FILTERS.map((status) => {
            const active = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                aria-pressed={active}
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#39E75F] text-[#080B0A] font-semibold'
                    : 'border border-[#E8F0EA]/10 bg-[#080B0A] text-[#84938A] hover:text-[#E8F0EA]'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* File Grid */}
        {filteredProjects.length === 0 ? (
          <div className="mt-10 rounded-xl border border-[#E8F0EA]/10 bg-[#080B0A] p-8 text-center">
            <p className="font-mono text-sm text-[#E8F0EA]">
              No matching project files found.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFolder('All');
                setStatusFilter('ALL');
                setQuery('');
              }}
              className="mt-3 font-mono text-xs text-[#39E75F] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <motion.button
                key={project.id}
                type="button"
                onClick={() => openProject(project.id)}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.22, delay: idx * 0.03}}
                className="group flex flex-col justify-between rounded-xl border border-[#E8F0EA]/12 bg-[#0B0F0D] p-5 text-left hover:border-[#39E75F]/45 hover:bg-[#121915] transition-colors cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="inline-flex items-center gap-2 text-[#84938A]">
                      <FileCode2 className="h-3.5 w-3.5 text-[#00D9FF]" aria-hidden="true" />
                      <span>{project.fileName}</span>
                    </span>
                    <span className={`font-semibold ${getStatusTextColor(project.statusTag)}`}>
                      {project.statusTag}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-lg font-semibold text-[#E8F0EA] group-hover:text-[#39E75F] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#84938A]">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E8F0EA]/8 pt-3 font-mono text-[11px]">
                  <span className="truncate text-[#E8F0EA]/75">
                    {project.technologies.length > 0
                      ? project.technologies.join(' · ')
                      : project.achievement ?? project.primaryCategory}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#39E75F] shrink-0">
                    <span>Inspect</span>
                    <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
