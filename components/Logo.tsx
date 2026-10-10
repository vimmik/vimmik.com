import { useId } from 'react';

/*
 * VIMMIK brand mark: the split "V" with the falcon head rising from its notch.
 * Traced from public/mainlogo.jpeg (1600×1600 artboard).
 *
 * `tone="dark"` (default) is for the site's dark surfaces: the navy "V" of the
 * print logo would vanish on #050C1A, so it is lifted to a light ice-blue.
 * `tone="light"` reproduces the original navy + blue logo for light backgrounds.
 */

export const BRAND = {
  blue: '#0094EE',
  navy: '#002D68',
};

const V_LEFT =
  '490,617 292,290 625,290 788,495 788,1112 515,655 583,612 708,800 708,520 596,375 440,375 560,575';
const V_RIGHT =
  '1126,617 1324,290 991,290 828,495 828,1112 1101,655 1033,612 908,800 908,520 1020,375 1176,375 1056,575';
const FALCON =
  'M710 290 L812 412 L962 236 C1010 200 1060 194 1108 198 C1100 150 1062 124 1004 116 C950 82 872 74 804 104 C744 130 700 160 642 174 L590 173 C652 200 760 210 842 204 C782 224 702 238 652 246 C722 258 802 256 876 244 C830 270 770 286 710 290 Z';
const EYE = 'M912 128 Q942 110 980 120 Q948 132 912 128 Z';

type LogoMarkProps = {
  size?: number;
  tone?: 'dark' | 'light';
  className?: string;
  title?: string;
};

export function LogoMark({ size = 28, tone = 'dark', className, title }: LogoMarkProps) {
  const vFill = tone === 'dark' ? '#E6F1FB' : BRAND.navy;
  const maskId = `vimmik-eye${useId()}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="270 60 1080 1080"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="1600" height="1600" fill="white" />
          <path d={EYE} fill="black" />
        </mask>
      </defs>
      <polygon points={V_LEFT} fill={vFill} />
      <polygon points={V_RIGHT} fill={vFill} />
      <path d={FALCON} fill={BRAND.blue} mask={`url(#${maskId})`} />
    </svg>
  );
}

export function LogoLockup({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <LogoMark size={size} />
      <span
        className="text-white font-bold tracking-[0.2em] text-lg"
        style={{ fontFamily: 'var(--font-orbitron)' }}
      >
        VIMMIK
      </span>
    </span>
  );
}
