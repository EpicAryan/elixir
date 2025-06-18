'use client';

import { motion, easeInOut } from 'framer-motion';
import { SVGProps } from 'react';

// We pass isInView as a prop to trigger the animation from the parent
export const WavyUnderline = ({ isInView, ...props }: { isInView: boolean } & SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 233 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <motion.path
      d="M2 17.2C33.7 11.7 97.7 1.4 100.5 4.2c3.5 3.5-18 14-11.5 16s70-26 71.5-19c1.5 7-13 10.5-8.5 17s34.5-19.5 72.5-14.5"
      stroke="#FF824C"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isInView ? 1 : 0 }}
      transition={{ duration: 1, delay: 0.3, ease: easeInOut }}
    />
  </svg>
);
