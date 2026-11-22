import {ArrowLeft, Award, Github, Info} from 'lucide-react';
import type {ProjectItem} from '../data/portfolioData';
import {useEnvironment} from '../context/EnvironmentContext';

interface ProjectDetailProps {
  project: ProjectItem;
}

export function ProjectDetail({project}: ProjectDetailProps) {
  const {closeProjectDetail} = useEnvironment();

  return (
    <div className="p-5 sm:p-8 space-y-8 overflow-y-auto">
      {/* Top Action & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8F0EA]/10 pb-5">
        <button
          type="button"
          onClick={closeProjectDetail}
          className="inline-flex items-center gap-2 rounded-md border border-[#E8F0EA]/15 bg-[#080B0A] px-3.5 py-2 font-mono text-xs text-[#E8F0EA] hover:border-[#39E75F] hover:text-[#39E75F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to Project Explorer</span>
        </button>

        <div className="font-mono text-xs text-[#84938A]">
          <span>{project.primaryCategory}</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span className="text-[#39E75F]">{project.statusTag}</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>{project.status}</span>
        </div>
      </div>

      {/* Header & Visual Preview */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        <div className="space-y-4 lg:col-span-7">
          <p className="font-mono text-xs text-[#00D9FF]">{project.fileName}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#E8F0EA]">
            {project.title}
          </h2>
          <p className="text-base leading-relaxed text-[#E8F0EA]/90">
            {project.overview}
          </p>

          {project.achievement && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#39E75F]/35 bg-[#39E75F]/10 px-4 py-2.5 font-mono text-xs text-[#39E75F]">
              <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Recognition: {project.achievement}</span>
            </div>
          )}

          {project.isConcept && (
            <div className="flex items-start gap-2.5 rounded-lg border border-[#00D9FF]/30 bg-[#00D9FF]/8 px-4 py-3 text-xs leading-relaxed text-[#00D9FF]">
              <Info className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Concept / Exploration: Documented as an architectural and visual direction
                study rather than a shipped production product.
              </span>
            </div>
          )}
        </div>

        {/* Visual Frame */}
        <div className="overflow-hidden rounded-xl border border-[#E8F0EA]/12 bg-[#080B0A] lg:col-span-5">
          {project.isArchitecturalFallback ? (
            <div className="flex aspect-[4/3] flex-col justify-between p-6 cyber-grid">
              <span className="font-mono text-xs text-[#39E75F]">
                ACADEMIC PROJECT RECORD
              </span>
              <div className="my-auto text-center">
                <p className="font-display text-lg font-semibold text-[#E8F0EA]">
                  {project.title}
                </p>
                <p className="mt-1 font-mono text-xs text-[#84938A]">
                  {project.achievement}
                </p>
              </div>
              <span className="font-mono text-xs text-[#84938A]">
                Status: {project.status}
              </span>
            </div>
          ) : (
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              className="aspect-[4/3] w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Structured Case Study Sections: Problem, Approach, Tech, Future Direction */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-[#E8F0EA]/10 bg-[#0B0F0D] p-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#00D9FF]">
            Problem &amp; Context
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[#E8F0EA]/85">
            {project.problem}
          </p>
        </div>

        <div className="rounded-xl border border-[#E8F0EA]/10 bg-[#0B0F0D] p-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#39E75F]">
            Approach &amp; Execution
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[#E8F0EA]/85">
            {project.approach}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Key Details */}
        <div className="rounded-xl border border-[#E8F0EA]/10 bg-[#0B0F0D] p-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#84938A]">
            Verified Highlights
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-[#E8F0EA]/85">
            {project.details.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#39E75F]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {project.scaleNote && (
            <p className="mt-3 font-mono text-xs text-[#00D9FF]">
              {project.scaleNote}
            </p>
          )}
        </div>

        {/* Technologies & Future Direction */}
        <div className="space-y-5">
          <div className="rounded-xl border border-[#E8F0EA]/10 bg-[#0B0F0D] p-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#84938A]">
              Technologies &amp; Stack
            </h3>
            {project.technologies.length > 0 ? (
              <p className="mt-2.5 font-mono text-sm text-[#E8F0EA]">
                {project.technologies.join('  ·  ')}
              </p>
            ) : (
              <p className="mt-2.5 text-xs text-[#84938A]">
                Academic build record — specific implementation stack intentionally omitted.
              </p>
            )}
          </div>

          {project.futureDirection && (
            <div className="rounded-xl border border-[#E8F0EA]/10 bg-[#0B0F0D] p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#C084FC]">
                Future Direction
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#E8F0EA]/85">
                {project.futureDirection}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Repository Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E8F0EA]/10 pt-5">
        <span className="font-mono text-xs text-[#84938A]">
          {project.githubLabel}
        </span>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#E8F0EA] px-4 py-2 text-xs font-semibold text-[#080B0A] hover:bg-[#39E75F] transition-colors"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Open GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
}
