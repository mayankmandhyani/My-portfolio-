import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let scrollY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Generate stars in 3 layers (parallax)
    const layers = [
      { count: 120, speed: 0.05, size: 1, opacity: 0.4 },
      { count: 80,  speed: 0.12, size: 1.5, opacity: 0.65 },
      { count: 40,  speed: 0.25, size: 2, opacity: 0.9 },
    ];

    const stars = [];
    layers.forEach(({ count, speed, size, opacity }) => {
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * 2000,
          y: Math.random() * 2000,
          size,
          speed,
          opacity: opacity * (0.6 + Math.random() * 0.4),
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.01 + Math.random() * 0.02,
          color: Math.random() > 0.9 ? '#9b5de5' : Math.random() > 0.8 ? '#00ffe0' : '#e8e8f0',
        });
      }
    });

    // Pixel clusters — distant nebula dots
    const nebulaDots = Array.from({ length: 30 }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 2000,
      size: 3,
      color: `hsla(${200 + Math.random() * 120}, 80%, 60%, ${0.08 + Math.random() * 0.12})`,
    }));

    let t = 0;

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nebula blobs (static bg)
      nebulaDots.forEach(d => {
        const px = (d.x - scrollY * 0.02) % (canvas.width * 1.5);
        const py = (d.y - scrollY * 0.01) % (canvas.height * 2);
        ctx.fillStyle = d.color;
        ctx.fillRect(Math.round(px), Math.round(py), d.size * 6, d.size * 6);
      });

      // Stars
      stars.forEach(s => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset);
        const px = ((s.x - scrollY * s.speed) % (canvas.width + 100) + canvas.width + 100) % (canvas.width + 100) - 50;
        const py = (s.y % (canvas.height + 50));

        ctx.globalAlpha = s.opacity * (0.5 + 0.5 * twinkle);
        ctx.fillStyle = s.color;

        // Pixel star: crisp square
        const sz = Math.ceil(s.size);
        ctx.fillRect(Math.round(px), Math.round(py), sz, sz);

        // Cross sparkle for large stars
        if (s.size >= 2 && twinkle > 0.7) {
          ctx.globalAlpha = s.opacity * 0.3;
          ctx.fillRect(Math.round(px) - 1, Math.round(py), sz + 2, sz);
          ctx.fillRect(Math.round(px), Math.round(py) - 1, sz, sz + 2);
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
