// Continia Motion Tokens — v0.1 (JS mirror of motion-tokens.css)
// Durations in seconds (GSAP) and ms (WAAPI).

export const duration = {
  instant: 0.1, fast: 0.15, base: 0.25, moderate: 0.4, slow: 0.6, slower: 0.8,
};
export const durationMs = Object.fromEntries(
  Object.entries(duration).map(([k, v]) => [k, v * 1000])
);

// CSS strings for WAAPI / element.style
export const ease = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  in: 'cubic-bezier(0.7, 0, 0.84, 0)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  linear: 'linear',
};

// Closest GSAP built-in equivalents
export const gsapEase = {
  standard: 'power2.out',
  out: 'expo.out',
  in: 'expo.in',
  inOut: 'power3.inOut',
  linear: 'none',
};

export const stagger = { tight: 0.03, base: 0.06, loose: 0.1 }; // seconds
export const distance = { sm: 8, md: 16, lg: 32 };             // px

export function prefersReducedMotion() {
  const root = document.documentElement.dataset.motion;
  if (root === 'reduced') return true;
  if (root === 'full') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
