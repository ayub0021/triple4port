import {ArrowUpRight, Database} from 'lucide-react';
import {DATA_LAB, PROJECTS} from '../../data/portfolioData';
import {useEnvironment} from '../../context/EnvironmentContext';

export function DataLabView() {
  const {openProject} = useEnvironment();
  const featured = PROJECTS.find((p) => p.id === DATA_LAB.featuredProjectId);

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="flex flex-col gap-4 border-b border-[#E8F0EA]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs text-[#39E75F]">05. Data Lab</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[#E8F0EA] sm:text-3xl">
            {DATA_LAB.title}
          </h2>
          <p className="mt-1.5 text-sm text-[#84938A]">{DATA_LAB.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start">
          {featured && (
            <button
              type="button"
              onClick={() => openProject(featured.id)}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#39E75F]/40 bg-[#39E75F]/10 px-3.5 py-2 font-mono text-xs text-[#39E75F] hover:bg-[#39E75F] hover:text-[#080B0A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>ML Challenge Record</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={() => openProject('scoutx')}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#00D9FF]/35 bg-[#00D9FF]/10 px-3.5 py-2 font-mono text-xs text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#080B0A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>ScoutX Concept</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {DATA_LAB.highlights.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[#E8F0EA]/10 bg-[#0B0F0D] p-5"
          >
            <p className="font-mono text-[11px] text-[#00D9FF]">{item.label}</p>
            <h3 className="mt-1.5 font-display text-base font-semibold text-[#E8F0EA]">
              {item.value}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#84938A]">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Pipeline Workflow + Featured Visual */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        <div className="space-y-3 lg:col-span-7">
          <div className="flex items-center gap-2 font-mono text-xs text-[#84938A]">
            <Database className="h-3.5 w-3.5 text-[#39E75F]" aria-hidden="true" />
            <span>Entity Matching Pipeline Architecture</span>
          </div>

          <div className="space-y-3">
            {DATA_LAB.workflowSteps.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-4 rounded-xl border border-[#E8F0EA]/10 bg-[#0B0F0D] p-4"
              >
                <span className="font-mono text-sm font-semibold tabular-nums text-[#39E75F]">
                  {step.step}
                </span>
                <div>
                  <h4 className="font-display text-sm font-semibold text-[#E8F0EA]">
                    {step.name}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#84938A]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {featured?.image && (
          <div className="overflow-hidden rounded-xl border border-[#E8F0EA]/12 bg-[#080B0A] lg:col-span-5">
            <img
              src={featured.image}
              alt={featured.imageAlt}
              referrerPolicy="no-referrer"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
