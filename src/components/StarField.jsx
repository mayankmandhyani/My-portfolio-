import { useEffect, useRef } from 'react';

const STAR_COUNT = 180;
const LAYER_SPEEDS = [0.05, 0.12, 0.25]; // parallax per scroll px

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let stars = [];
    let raf;
    let scrollY = 0;
    let targetScrollY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildStars();
    };

    const buildStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const layer = Math.floor(i / (STAR_COUNT / 3));
        stars.push({
          x: randomBetween(0, canvas.width),
          y: randomBetween(0, canvas.height),
          size: randomBetween(0.5, layer === 2 ? 2.2 : 1.5),
          opacity: randomBetween(0.3, 1),
          twinkleSpeed: randomBetween(0.002, 0.008),
          twinkleOffset: randomBetween(0, Math.PI * 2),
          layer,
        });
      }
    };

    const draw = () => {
      scrollY += (targetScrollY - scrollY) * 0.08;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = performance.now() * 0.001;

      stars.forEach((s) => {
        const speed = LAYER_SPEEDS[s.layer];
        const dy = scrollY * speed;
        const twinkle = 0.4 + 0.6 * Math.sin(t * s.twinkleSpeed * 1000 + s.twinkleOffset);

        ctx.save();
        ctx.globalAlpha = s.opacity * twinkle;
        ctx.fillStyle = s.layer === 2 ? '#00e5ff' : '#f0f0ff';
        ctx.fillRect(
          Math.round(s.x),
          Math.round(((s.y - dy) % canvas.height + canvas.height) % canvas.height),
          Math.ceil(s.size),
          Math.ceil(s.size)
        );
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        imageRendering: 'pixelated',
      }}
    />
  );
}
