import { SVGProps } from 'react';

export const CtaBackgroundPattern = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 380 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Main large rounded rectangle */}
    <path
      d="M236.469 13.4837C243.344 5.31351 254.195 1.03662 264.445 1.03662H340.512C358.995 1.03662 374.012 16.0537 374.012 34.5366V117.47C374.012 127.97 369.366 137.957 361.94 144.604L299.71 197.947"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="2"
    />
    {/* Inner hexagon-like shape */}
    <path
      d="M327.93 111.411C329.98 108.195 334.338 108.195 336.388 111.411L343.856 123.479C345.906 126.695 343.727 130.979 339.968 130.979H324.35C320.591 130.979 318.412 126.695 320.462 123.479L327.93 111.411Z"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="2"
    />
    {/* Middle small rounded square */}
    <rect
      x="228.428"
      y="55.8896"
      width="45"
      height="45"
      rx="10"
      transform="rotate(-15 228.428 55.8896)"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="2"
    />
    {/* Large partial circle */}
    <circle
      cx="240"
      cy="200"
      r="90"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="2"
    />
    {/* Top right small circles */}
    <circle cx="355" cy="20" r="4" stroke="white" strokeOpacity="0.4" />
    <circle cx="340" cy="20" r="4" stroke="white" strokeOpacity="0.4" />
    <circle cx="325" cy="20" r="4" stroke="white" strokeOpacity="0.4" />
    {/* Faint grid lines */}
    <path d="M-10 150H400" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
    <path d="M-10 170H400" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
    <path d="M-10 190H400" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
  </svg>
);
