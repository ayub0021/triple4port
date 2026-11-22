import {useState} from 'react';
import {Check, Copy, Download, ExternalLink, Mail} from 'lucide-react';
import {PERSONAL_INFO, SOCIAL_PROFILES} from '../../data/portfolioData';
import {useEnvironment} from '../../context/EnvironmentContext';

export function ContactView() {
  const {setResumeOpen} = useEnvironment();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const input = document.createElement('input');
      input.value = PERSONAL_INFO.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="p-5 sm:p-8 space-y-8">
      <div className="border-b border-[#E8F0EA]/10 pb-5">
        <p className="font-mono text-xs text-[#39E75F]">08. Connect</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-[#E8F0EA] sm:text-3xl">
          LET&apos;S BUILD SOMETHING INTERESTING.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[#84938A]">
          Open to software engineering collaborations, cybersecurity study groups, design
          direction, and technical conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-5">
          <div className="rounded-xl border border-[#E8F0EA]/12 bg-[#0B0F0D] p-5 space-y-4">
            <div>
              <p className="font-mono text-xs text-[#84938A]">Direct Email</p>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="mt-1 inline-block font-mono text-sm sm:text-base font-medium text-[#E8F0EA] hover:text-[#39E75F] transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-md border border-[#39E75F]/40 bg-[#39E75F]/10 px-4 py-2 text-xs font-medium text-[#39E75F] hover:bg-[#39E75F] hover:text-[#080B0A] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-[#E8F0EA]/15 bg-[#080B0A] px-4 py-2 text-xs font-medium text-[#E8F0EA] hover:border-[#00D9FF] hover:text-[#00D9FF] transition-colors"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setResumeOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#E8F0EA] px-5 py-3 text-sm font-semibold text-[#080B0A] hover:bg-[#39E75F] transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>Download / Preview Resume</span>
          </button>
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-xl border border-[#E8F0EA]/12 bg-[#0B0F0D]">
            <div className="flex items-center justify-between border-b border-[#E8F0EA]/10 px-5 py-3 font-mono text-xs text-[#84938A]">
              <span>Profile Directory</span>
              <span>Engineering · Security · Social</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {SOCIAL_PROFILES.map((profile, idx) => {
                const rightBorder =
                  idx % 2 === 0 ? 'sm:border-r sm:border-[#E8F0EA]/8' : '';
                const bottomBorder =
                  idx < SOCIAL_PROFILES.length - 2
                    ? 'sm:border-b sm:border-[#E8F0EA]/8'
                    : '';

                if (profile.isPlaceholder) {
                  return (
                    <div
                      key={profile.id}
                      className={`border-b border-[#E8F0EA]/8 sm:border-b-0 p-4 ${rightBorder} ${bottomBorder}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-semibold text-[#E8F0EA]/70">
                          {profile.platform}
                        </span>
                        <span className="font-mono text-[11px] text-[#84938A]">
                          Editable slot
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-xs text-[#84938A]">
                        {profile.handle}
                      </p>
                    </div>
                  );
                }

                return (
                  <a
                    key={profile.id}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between gap-3 border-b border-[#E8F0EA]/8 sm:border-b-0 p-4 hover:bg-[#141D18] transition-colors ${rightBorder} ${bottomBorder}`}
                  >
                    <div>
                      <span className="font-display text-sm font-semibold text-[#E8F0EA] group-hover:text-[#39E75F] transition-colors">
                        {profile.platform}
                      </span>
                      <p className="mt-0.5 font-mono text-xs text-[#84938A]">
                        {profile.handle}
                      </p>
                    </div>
                    <ExternalLink
                      className="h-4 w-4 text-[#84938A] group-hover:text-[#00D9FF] shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
