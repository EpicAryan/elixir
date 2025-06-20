import { useState, useEffect } from 'react';

type Breakpoint = 'mobile' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const getTailwindBreakpoint = (width: number): Breakpoint => {
  if (width < 640) return 'mobile';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
};

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('2xl');

  useEffect(() => {
    const calcInnerWidth = () => {
      setBreakpoint(getTailwindBreakpoint(window.innerWidth));
    };

    calcInnerWidth();
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return breakpoint;
};
