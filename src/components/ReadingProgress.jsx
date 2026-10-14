import React, {useEffect, useRef} from 'react';
import styles from './ReadingProgress.module.css';

// Barre fine en haut de l'écran qui avance avec la lecture de la page.
export default function ReadingProgress() {
  const ref = useRef(null);

  useEffect(() => {
    let frame = null;

    function update() {
      frame = null;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      ref.current.style.transform = `scaleX(${Math.min(1, progress)})`;
    }

    function onScroll() {
      if (frame === null) {
        frame = requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div ref={ref} className={styles.bar} aria-hidden="true" />;
}
