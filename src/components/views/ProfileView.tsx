import {useState} from 'react';
import {
  ABOUT_INTERESTS,
  PERSONAL_INFO,
  SKILL_CATEGORIES,
} from '../../data/portfolioData';

export function ProfileView() {
  const [tab, setTab] = useState<'overview' | 'skills'>('overview');

  return (
    <div className="p-5 sm:p-8 space-y-8">
      {/* Header & Internal Tab Switcher */}
      <div className="flex flex-col gap-4 border-b border-[#E8F0EA]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs text-[#39E75F]">
            01. Identity &amp; Technical Inventory
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[#E8F0EA] sm:text-3xl">
            {PERSONAL_INFO.fullName}
          </h2>
          <p className="mt-1 text-sm text-[#00D9FF]">
            {PERSONAL_INFO.roles.join('  ·  ')}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Profile sections"
          className="flex items-center gap-1 rounded-lg border border-[#E8F0EA]/10 bg-[#080B0A] p-1 self-start"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'overview'}
            onClick={() => setTab('overview')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              tab === 'overview'
                ? 'bg-[#39E75F] text-[#080B0A] font-semibold'
                : 'text-[#84938A] hover:text-[#E8F0EA]'
            }`}
          >
            Profile &amp; Interests
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'skills'}
            onClick={() => setTab('skills')}
            className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              tab === 'skills'
                ? 'bg-[#39E75F] text-[#080B0A] font-semibold'
                : 'text-[#84938A] hover:text-[#E8F0EA]'
            }`}
          >
            Skills Inventory
          </button>
        </div>
      </div>

      {tab === 'overview' ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Academic & Philosophy Left Column */}
          <div className="space-y-5 lg:col-span-5">
            <div className="rounded-xl border border-[#E8F0EA]/10 bg-[#0B0F0D] p-5 space-y-4">
              <div>
                <p className="font-mono text-xs text-[#84938A]">Institution</p>
                <p className="mt-1 text-sm font-medium text-[#E8F0EA]">
                  {PERSONAL_INFO.institution}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-[#E8F0EA]/8 pt-4">
                <div>
                  <p className="font-mono text-xs text-[#84938A]">Degree</p>
                  <p className="mt-1 text-sm font-medium text-[#E8F0EA]">
                    {PERSONAL_INFO.degree}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#84938A]">Current CGPA</p>
                  <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-[#39E75F]">
                    {PERSONAL_INFO.cgpa}
                  </p>
                </div>
              </div>
              <p className="border-t border-[#E8F0EA]/8 pt-3 text-xs leading-relaxed text-[#84938A]">
                {PERSONAL_INFO.cgpaNote}
              </p>
            </div>

            <blockquote className="rounded-xl border border-[#00D9FF]/25 bg-[#0B0F0D] p-5">
              <p className="font-mono text-xs text-[#00D9FF]">Philosophy</p>
              <p className="mt-2 font-display text-base font-medium leading-snug text-[#E8F0EA]">
                &ldquo;{PERSONAL_INFO.philosophy}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Narrative & 6 Interest Cards */}
          <div className="space-y-6 lg:col-span-7">
            <p className="text-sm sm:text-base leading-relaxed text-[#E8F0EA]/85">
              {PERSONAL_INFO.intro} Studying Information Technology at KPR Institute of
              Engineering and Technology, I explore how software systems behave under the
              hood while crafting clean, deliberate visual interfaces.
            </p>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {ABOUT_INTERESTS.map((interest, idx) => (
                <div
                  key={interest.title}
                  className="rounded-lg border border-[#E8F0EA]/10 bg-[#0B0F0D] p-4"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-sm font-semibold text-[#E8F0EA]">
                      {interest.title}
                    </h3>
                    <span className="font-mono text-[11px] tabular-nums text-[#84938A]">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#84938A]">
                    {interest.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <p className="font-mono text-xs text-[#84938A]">
            Working technical inventory across engineering, security labs, data workflows, and
            creative tools — listed cleanly without arbitrary proficiency percentages.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_CATEGORIES.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-[#E8F0EA]/10 bg-[#0B0F0D] p-5"
              >
                <h3 className="border-b border-[#E8F0EA]/8 pb-2.5 font-mono text-xs font-semibold text-[#39E75F]">
                  {group.category}
                </h3>
                <ul className="mt-3.5 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs sm:text-sm text-[#E8F0EA]/90"
                    >
                      <span className="h-1 w-1 shrink-0 bg-[#84938A]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
