const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Adds `is-visible` once the element scrolls into view; the stagger index comes from `--i`.
export function reveal(node, index = 0) {
  node.classList.add('reveal');
  node.style.setProperty('--i', index);
  if (!('IntersectionObserver' in window) || reduceMotion()) { node.classList.add('is-visible'); return; }
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { node.classList.add('is-visible'); observer.disconnect(); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  observer.observe(node);
  return { destroy: () => observer.disconnect() };
}

// Tilts the element toward the pointer; skipped on touch screens and with reduced motion.
export function tilt(node, max = 7) {
  if (reduceMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const move = (e) => {
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    node.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
    node.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
    node.style.setProperty('--gx', `${((x + .5) * 100).toFixed(1)}%`);
    node.style.setProperty('--gy', `${((y + .5) * 100).toFixed(1)}%`);
  };
  const leave = () => { node.style.setProperty('--rx', '0deg'); node.style.setProperty('--ry', '0deg'); };
  node.addEventListener('pointermove', move, { passive: true });
  node.addEventListener('pointerleave', leave);
  return { destroy() { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', leave); } };
}
