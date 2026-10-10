'use client';

import { useEffect, useRef } from 'react';

export default function CursorRig() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const root = document.documentElement;

    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      // Reveal the rig (and hide the native cursor) on the first real mouse move
      if (!root.classList.contains('cursor-rig-active')) {
        root.classList.add('cursor-rig-active');
        outerX = e.clientX;
        outerY = e.clientY;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      inner.style.left = `${mouseX}px`;
      inner.style.top = `${mouseY}px`;
    };

    const loop = () => {
      outerX += (mouseX - outerX) * 0.12;
      outerY += (mouseY - outerY) * 0.12;
      outer.style.left = `${outerX}px`;
      outer.style.top = `${outerY}px`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      root.classList.remove('cursor-rig-active');
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-outer" aria-hidden="true" />
      <div ref={innerRef} className="cursor-inner" aria-hidden="true" />
    </>
  );
}
