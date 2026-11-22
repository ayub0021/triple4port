import {useEffect, useState} from 'react';
import {Download, ExternalLink, FileText, X} from 'lucide-react';
import {
  LEADERSHIP_ITEMS,
  PERSONAL_INFO,
  PROJECTS,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({isOpen, onClose}: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'pdf' | 'summary'>('pdf');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const resumePdfUrl = `${baseUrl}${PERSONAL_INFO.resumePdfRelativePath}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080B0A]/88 p-3 sm:p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[#E8F0EA]/15 bg-[#101613] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8F0EA]/10 bg-[#0B0F0D] px-5 py-4 no-print">
          <div>
            <p className="font-mono text-xs text-[#39E75F]">
              Resume · PDF Document
            </p>
            <h3
              id="resume-modal-title"
              className="mt-0.5 font-display text-lg sm:text-xl font-bold text-[#E8F0EA]"
            >
              {PERSONAL_INFO.fullName}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View toggle for mobile / quick reading */}
            <div className="flex items-center rounded-md border border-[#E8F0EA]/12 bg-[#080B0A] p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-[#101613] text-[#39E75F]'
                    : 'text-[#84938A] hover:text-[#E8F0EA]'
                }`}
              >
                PDF View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('summary')}
                className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors cursor-pointer ${
                  viewMode === 'summary'
                    ? 'bg-[#101613] text-[#00D9FF]'
                    : 'text-[#84938A] hover:text-[#E8F0EA]'
                }`}
              >
                Quick Summary
              </button>
            </div>

            <a
              href={resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#E8F0EA]/20 bg-[#080B0A] px-3 py-2 text-xs font-medium text-[#E8F0EA] hover:border-[#00D9FF] hover:text-[#00D9FF] transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Open Tab</span>
            </a>

            <a
              href={resumePdfUrl}
              download={PERSONAL_INFO.resumeFileName}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#39E75F] px-3.5 py-2 text-xs font-semibold text-[#080B0A] hover:bg-[#52ee74] transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume modal"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#E8F0EA]/15 bg-[#080B0A] text-[#84938A] hover:text-[#E8F0EA] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Body */}
        {viewMode === 'pdf' ? (
          <div className="relative flex-1 bg-[#080B0A]">
            <object
              data={resumePdfUrl}
              type="application/pdf"
              aria-label="Mohammed Ayub A Resume PDF"
              className="h-full w-full"
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <FileText className="h-10 w-10 text-[#39E75F]" aria-hidden="true" />
                <div>
                  <p className="font-display text-base font-semibold text-[#E8F0EA]">
                    Inline PDF preview is unavailable on this browser.
                  </p>
                  <p className="mt-1 text-xs text-[#84938A]">
                    Use the Download PDF button below to save or view {PERSONAL_INFO.resumeFileName}.
                  </p>
                </div>
                <a
                  href={resumePdfUrl}
                  download={PERSONAL_INFO.resumeFileName}
                  className="inline-flex items-center gap-2 rounded-md bg-[#39E75F] px-5 py-2.5 text-xs font-semibold text-[#080B0A] hover:bg-[#52ee74] transition-colors"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Download {PERSONAL_INFO.resumeFileName}</span>
                </a>
              </div>
            </object>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-[#E8F0EA]/90">
            <div className="border-b border-[#E8F0EA]/10 pb-4">
              <p className="font-display text-lg font-semibold text-[#E8F0EA]">
                {PERSONAL_INFO.fullName} &nbsp;·&nbsp; {PERSONAL_INFO.brand}
              </p>
              <p className="mt-1 text-xs text-[#00D9FF]">
                {PERSONAL_INFO.roles.join('  |  ')}
              </p>
              <p className="mt-2 font-mono text-xs text-[#84938A]">
                {PERSONAL_INFO.email} &nbsp;·&nbsp; github.com/ayub0021 &nbsp;·&nbsp; tryhackme.com/p/triple4verse
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#39E75F]">
                Education
              </h4>
              <p className="mt-2 font-medium text-[#E8F0EA]">
                {PERSONAL_INFO.degree} — {PERSONAL_INFO.institution}
              </p>
              <p className="mt-1 font-mono text-xs text-[#84938A]">
                CGPA: {PERSONAL_INFO.cgpa} (2024 – 2028)
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#39E75F]">
                Projects &amp; Exploration
              </h4>
              <ul className="mt-2 space-y-2">
                {PROJECTS.map((p) => (
                  <li key={p.id}>
                    <span className="font-semibold text-[#E8F0EA]">{p.title}</span>{' '}
                    <span className="font-mono text-xs text-[#00D9FF]">
                      [{p.status}]
                    </span>{' '}
                    — <span className="text-[#84938A]">{p.summary}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#39E75F]">
                Leadership &amp; Milestones
              </h4>
              <ul className="mt-2 space-y-1.5">
                {LEADERSHIP_ITEMS.map((item) => (
                  <li key={item.index} className="text-[#E8F0EA]/85">
                    <span className="font-medium text-[#E8F0EA]">{item.role}</span>{' '}
                    <span className="font-mono text-xs text-[#84938A]">
                      ({item.metric})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
