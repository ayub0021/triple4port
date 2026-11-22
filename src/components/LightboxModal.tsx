import {useEffect} from 'react';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import type {CreativeItem} from '../data/portfolioData';

interface LightboxModalProps {
  items: CreativeItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function LightboxModal({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxModalProps) {
  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, activeIndex, items.length, onClose, onChangeIndex]);

  if (!isOpen || activeIndex === null) return null;

  const currentItem = items[activeIndex];

  const handlePrev = () => {
    onChangeIndex((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    onChangeIndex((activeIndex + 1) % items.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080B0A]/92 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[#E8F0EA]/15 bg-[#101613]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[#E8F0EA]/10 px-5 py-3.5">
          <div>
            <p className="font-mono text-xs text-[#00D9FF]">
              {currentItem.category} &nbsp;·&nbsp; {activeIndex + 1} / {items.length}
            </p>
            <h3
              id="lightbox-title"
              className="font-display text-base font-semibold text-[#E8F0EA] sm:text-lg"
            >
              {currentItem.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E8F0EA]/15 bg-[#080B0A] text-[#E8F0EA] hover:border-[#00D9FF] hover:text-[#00D9FF] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Media Viewport */}
        <div className="relative flex flex-1 items-center justify-center bg-[#080B0A] p-4 sm:p-6 overflow-hidden">
          <img
            src={currentItem.image}
            alt={currentItem.imageAlt}
            referrerPolicy="no-referrer"
            className="max-h-[62vh] w-auto rounded-lg object-contain"
          />

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous creative item"
                className="absolute left-3 sm:left-5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E8F0EA]/20 bg-[#080B0A]/85 text-[#E8F0EA] hover:border-[#39E75F] hover:text-[#39E75F] transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next creative item"
                className="absolute right-3 sm:right-5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E8F0EA]/20 bg-[#080B0A]/85 text-[#E8F0EA] hover:border-[#39E75F] hover:text-[#39E75F] transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Footer Caption */}
        <div className="flex flex-col gap-1 border-t border-[#E8F0EA]/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#E8F0EA]/90">{currentItem.caption}</p>
          <p className="font-mono text-xs text-[#84938A]">
            {currentItem.placeholderNotice}
          </p>
        </div>
      </div>
    </div>
  );
}
