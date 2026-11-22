import {Cpu, ExternalLink, Scale, ShieldAlert, Terminal} from 'lucide-react';
import {CYBERSECURITY_LAB} from '../../data/portfolioData';

export function SecurityView() {
  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="border-b border-[#E8F0EA]/10 pb-5">
        <p className="font-mono text-xs text-[#39E75F]">
          03. Cybersecurity &amp; Systems Lab
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold text-[#E8F0EA] sm:text-3xl">
          Security practice, Linux internals &amp; governance.
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[#84938A]">
          Structured learning log covering lab platforms, defensive security concepts,
          Arch Linux administration, and cyber law exploration.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-6">
          {/* Platforms */}
          <div className="overflow-hidden rounded-xl border border-[#E8F0EA]/12 bg-[#0B0F0D]">
            <div className="flex items-center justify-between border-b border-[#E8F0EA]/10 px-5 py-3 font-mono text-xs text-[#84938A]">
              <span className="inline-flex items-center gap-2 text-[#E8F0EA]">
                <Terminal className="h-3.5 w-3.5 text-[#39E75F]" aria-hidden="true" />
                <span>labs.platforms</span>
              </span>
              <span>TryHackMe &amp; Hack The Box</span>
            </div>

            <div className="divide-y divide-[#E8F0EA]/8">
              {CYBERSECURITY_LAB.platforms.map((platform) => (
                <div key={platform.name} className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-mono text-[11px] text-[#00D9FF]">
                        {platform.status}
                      </p>
                      <h3 className="mt-0.5 font-display text-lg font-semibold text-[#E8F0EA]">
                        {platform.name}
                      </h3>
                    </div>

                    {platform.isPlaceholder ? (
                      <span className="font-mono text-xs text-[#84938A]">
                        {platform.handle}
                      </span>
                    ) : (
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-[#39E75F]/40 bg-[#39E75F]/10 px-3 py-1.5 font-mono text-xs text-[#39E75F] hover:bg-[#39E75F] hover:text-[#080B0A] transition-colors"
                      >
                        <span>{platform.handle}</span>
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#84938A]">
                    {platform.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SOC / Threat Analysis */}
          <div className="rounded-xl border border-[#E8F0EA]/12 bg-[#0B0F0D] p-5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-[#00D9FF]" aria-hidden="true" />
              <h3 className="font-display text-base font-semibold text-[#E8F0EA]">
                SOC &amp; Threat Analysis Learning
              </h3>
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 font-mono text-xs text-[#E8F0EA]/90">
              {CYBERSECURITY_LAB.socFocus.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#00D9FF]" aria-hidden="true">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-6">
          {/* Arch Linux */}
          <div className="overflow-hidden rounded-xl border border-[#E8F0EA]/12 bg-[#0B0F0D]">
            <div className="flex items-center justify-between border-b border-[#E8F0EA]/10 px-5 py-3 font-mono text-xs text-[#84938A]">
              <span className="inline-flex items-center gap-2 text-[#E8F0EA]">
                <Cpu className="h-3.5 w-3.5 text-[#39E75F]" aria-hidden="true" />
                <span>arch.sysadmin</span>
              </span>
              <span>Linux Exploration</span>
            </div>

            <div className="p-5 space-y-3">
              {CYBERSECURITY_LAB.archExploration.map((entry, idx) => (
                <div key={entry} className="flex items-start gap-3 font-mono text-xs">
                  <span className="tabular-nums text-[#39E75F]">0{idx + 1}</span>
                  <span className="text-[#E8F0EA]/90">{entry}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Law & Governance */}
          <div className="rounded-xl border border-[#C084FC]/30 bg-[#0B0F0D] p-5">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-[#C084FC]" aria-hidden="true" />
              <h3 className="font-display text-base font-semibold text-[#E8F0EA]">
                {CYBERSECURITY_LAB.lawAndGovernance.title}
              </h3>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-[#E8F0EA]/85">
              {CYBERSECURITY_LAB.lawAndGovernance.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
