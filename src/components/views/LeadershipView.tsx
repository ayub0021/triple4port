import {LEADERSHIP_ITEMS} from '../../data/portfolioData';

export function LeadershipView() {
  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="border-b border-[#E8F0EA]/10 pb-5">
        <p className="font-mono text-xs text-[#C084FC]">
          05. Leadership &amp; Milestones
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold text-[#E8F0EA] sm:text-3xl">
          Community stewardship &amp; recognized impact.
        </h2>
      </div>

      <ol className="divide-y divide-[#E8F0EA]/10 rounded-xl border border-[#E8F0EA]/12 bg-[#0B0F0D]">
        {LEADERSHIP_ITEMS.map((item) => (
          <li
            key={item.index}
            className="grid grid-cols-1 gap-3 p-5 md:grid-cols-12 md:items-center md:gap-6"
          >
            <div className="flex items-center gap-4 md:col-span-4">
              <span className="font-mono text-sm font-semibold tabular-nums text-[#39E75F]">
                {item.index}
              </span>
              <div>
                <p className="font-mono text-[11px] text-[#84938A]">
                  {item.category}
                </p>
                <h3 className="font-display text-base font-semibold text-[#E8F0EA]">
                  {item.role}
                </h3>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#E8F0EA]/85 md:col-span-5">
              {item.description}
            </p>

            <div className="md:col-span-3 md:text-right">
              <span className="font-mono text-xs font-medium tabular-nums text-[#00D9FF]">
                {item.metric}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
