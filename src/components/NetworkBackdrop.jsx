import React, {useEffect, useRef} from 'react';
import styles from './NetworkBackdrop.module.css';

const LINK_DISTANCE = 140;

// Constellation animée en fond de page : les nœuds dérivent et se relient au pointeur à son passage.
export default function NetworkBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = {x: null, y: null};
    let nodes = [];
    let width = 0;
    let height = 0;
    let color = '';
    let frame = null;

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(90, Math.round((width * height) / 14000));
      nodes = Array.from({length: count}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
      draw();
    }

    // La couleur suit le thème clair/sombre (définie en CSS sur le canvas).
    function readColor() {
      color = getComputedStyle(canvas).color;
      draw();
    }

    function link(a, b, strength) {
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance < LINK_DISTANCE) {
        ctx.globalAlpha = (1 - distance / LINK_DISTANCE) * strength;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      nodes.forEach((node, i) => {
        for (let j = i + 1; j < nodes.length; j++) {
          link(node, nodes[j], 0.5);
        }
        if (pointer.x !== null) {
          link(node, pointer, 1);
        }
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function tick() {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });
      draw();
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (!reducedMotion && frame === null && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    }

    function stop() {
      cancelAnimationFrame(frame);
      frame = null;
    }

    function onPointerMove(event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (reducedMotion) draw();
    }

    function onPointerLeave() {
      pointer.x = null;
      pointer.y = null;
      if (reducedMotion) draw();
    }

    function onVisibilityChange() {
      if (document.hidden) stop();
      else start();
    }

    const themeObserver = new MutationObserver(readColor);
    themeObserver.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove);
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    readColor();
    resize();
    start();

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.backdrop} aria-hidden="true" />;
}
