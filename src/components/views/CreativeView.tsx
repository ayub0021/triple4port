import {useState} from 'react';
import {ImageIcon, Maximize2} from 'lucide-react';
import {CREATIVE_ITEMS, type CreativeItem} from '../../data/portfolioData';
import {LightboxModal} from '../LightboxModal';

type CreativeFilter = 'All' | CreativeItem['category'];

const CREATIVE_FILTERS: CreativeFilter[] = [
  'All',
  'Graphic & Poster',
  'Event Branding',
  'Photography',
];

export function CreativeView() {
  const [filter, setFilter] = useState<CreativeFilter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleItems =
    filter === 'All'
      ? CREATIVE_ITEMS
      : CREATIVE_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="p-5 sm:p-8 space-y-6">
      <div className="flex flex-col gap-4 border-b border-[#E8F0EA]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs text-[#00D9FF]">04. Creative Lab</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[#E8F0EA] sm:text-3xl">
            Visual design, LaunchPad branding &amp; lens studies.
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#84938A]">
            Placeholder previews awaiting original graphic, branding, and photography exports.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter creative works"
          className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E8F0EA]/10 bg-[#080B0A] p-1 self-start"
        >
          {CREATIVE_FILTERS.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={active}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#00D9FF] text-[#080B0A] font-semibold'
                    : 'text-[#84938A] hover:text-[#E8F0EA]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        {visibleItems.map((item, idx) => {
          const spanClass =
            visibleItems.length === 1
              ? 'md:col-span-12'
              : item.aspect === 'landscape'
              ? 'md:col-span-6'
              : 'md:col-span-3';

          return (
            <figure
              key={item.id}
              className={`group flex flex-col overflow-hidden rounded-xl border border-[#E8F0EA]/12 bg-[#0B0F0D] ${spanClass}`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Inspect ${item.title} in lightbox`}
                className="relative block h-64 sm:h-72 w-full overflow-hidden bg-[#080B0A] text-left cursor-pointer"
              >
                {!failedImages[item.id] ? (
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({...prev, [item.id]: true}))
                    }
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-[#00D9FF]" aria-hidden="true" />
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080B0A]/85 via-[#080B0A]/20 to-transparent"
                />

                <span className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E8F0EA]/20 bg-[#080B0A]/80 text-[#E8F0EA] group-hover:border-[#00D9FF] group-hover:text-[#00D9FF]">
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                </span>

                <div className="absolute bottom-3 left-4 right-4">
                  <p className="font-mono text-[11px] text-[#00D9FF]">
                    {item.category} · Placeholder
                  </p>
                  <h3 className="font-display text-base font-semibold text-[#E8F0EA]">
                    {item.title}
                  </h3>
                </div>
              </button>

              <figcaption className="flex flex-1 flex-col justify-between gap-2 p-4 text-xs text-[#84938A]">
                <p className="text-[#E8F0EA]/85">{item.caption}</p>
                <p className="font-mono text-[11px]">{item.medium}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <LightboxModal
        items={visibleItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </div>
  );
}
