import {useEffect, useState} from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({x: -100, y: -100});
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) {
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({x: e.clientX, y: e.clientY});
      setVisible(true);
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('a, button, [role="button"], input, textarea, select')
        );
        setInteractive(isClickable);
      }
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove, {passive: true});
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!enabled || !visible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block no-print"
      style={{
        transform: `translate3d(${position.x - (interactive ? 16 : 10)}px, ${
          position.y - (interactive ? 16 : 10)
        }px, 0)`,
        transition: 'transform 60ms linear',
      }}
    >
      <div
        className={`rounded-full border transition-all duration-150 ${
          interactive
            ? 'h-8 w-8 border-[#00D9FF]/80 bg-[#00D9FF]/10'
            : 'h-5 w-5 border-[#39E75F]/65'
        }`}
      />
    </div>
  );
}
