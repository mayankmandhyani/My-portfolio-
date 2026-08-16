import { useEffect, useRef } from 'react';

export default function Starfield({ density = 180 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animId;
    let scrollY = 0;

    canvas.width = width;
    canvas.height = height;

    // Generate stars
    const stars = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() < 0.8 ? 1 : 2,
      brightness: 0.2 + Math.random() * 0.8,
      twinkleSpeed: 0.005 + Math.random() * 0.015,
      twinkleOffset: Math.random() * Math.PI * 2,
      parallaxFactor: 0.02 + Math.random() * 0.06,
      color: Math.random() < 0.1 ? '#b0c8ff'
           : Math.random() < 0.05 ? '#ffd0a0'
           : '#e8e8f0',
    }));

    // Occasional pixel clusters
    const clusters = Array.from({ length: 6 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      stars: Array.from({ length: 4 + Math.floor(Math.random() * 6) }, () => ({
        dx: (Math.random() - 0.5) * 20,
        dy: (Math.random() - 0.5) * 20,
        size: 1,
        brightness: 0.3 + Math.random() * 0.4,
      })),
    }));

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', onResize);

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Stars
      stars.forEach(star => {
        const parallaxY = prefersReducedMotion ? 0 : -scrollY * star.parallaxFactor;
        const twinkle = prefersReducedMotion ? star.brightness
          : star.brightness * (0.6 + 0.4 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset));

        ctx.save();
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = star.color;

        const sy = ((star.y + parallaxY) % height + height) % height;
        ctx.fillRect(Math.floor(star.x), Math.floor(sy), star.size, star.size);
        ctx.restore();
      });

      // Clusters (nebula hints)
      clusters.forEach(cluster => {
        const parallaxY = prefersReducedMotion ? 0 : -scrollY * 0.03;
        const cy = ((cluster.y + parallaxY) % height + height) % height;

        cluster.stars.forEach(s => {
          ctx.save();
          ctx.globalAlpha = s.brightness * (0.5 + 0.3 * Math.sin(t * 0.008 + s.dx));
          ctx.fillStyle = '#b060ff';
          ctx.fillRect(Math.floor(cluster.x + s.dx), Math.floor(cy + s.dy), s.size, s.size);
          ctx.restore();
        });
      });

      if (!prefersReducedMotion) t++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
