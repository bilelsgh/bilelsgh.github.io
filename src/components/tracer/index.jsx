import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Reveal from '@site/src/components/Reveal';
import styles from './styles.module.css';

export {default as RewardSimulator} from './RewardSimulator';
export {default as ResultsExplorer} from './ResultsExplorer';
export {default as NormalitySimulator} from './NormalitySimulator';
export {default as BanditVsDrl} from './BanditVsDrl';

export function PaperHero({title, tagline, venue, status, authors}) {
  return (
    <header className={styles.hero}>
      <p className={styles.venue}>
        {venue}
        <span className={styles.status}>{status}</span>
      </p>
      <h1>{title}</h1>
      <p className={styles.tagline}>{tagline}</p>
      <p className={styles.authors}>{authors}</p>
    </header>
  );
}

// Compte de 0 jusqu'à `value` quand le chiffre entre à l'écran.
function CountUp({value, decimals = 0}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    setShown(0);
    let frame = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }
      observer.disconnect();
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min(1, (now - start) / 1200);
        setShown(value * (1 - (1 - progress) ** 3));
        if (progress < 1) {
          frame = requestAnimationFrame(step);
        }
      };
      frame = requestAnimationFrame(step);
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{shown.toFixed(decimals)}</span>;
}

export function StatRow({children}) {
  return <div className={styles.stats}>{children}</div>;
}

export function Stat({value, decimals, prefix, suffix, label}) {
  return (
    <Reveal className={styles.stat}>
      <span className={styles.statValue}>
        {prefix}
        <CountUp value={value} decimals={decimals} />
        {suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </Reveal>
  );
}

// Étapes numérotées d'un processus, suivies d'une phrase de rebouclage.
export function LearningLoop({steps, feedback}) {
  return (
    <Reveal className={styles.loop}>
      <ol className={styles.loopSteps}>
        {steps.map(({title, text}, index) => (
          <li key={title}>
            <span className={styles.loopIcon}>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <span>{text}</span>
          </li>
        ))}
      </ol>
      <p className={styles.loopFeedback}>↺ {feedback}</p>
    </Reveal>
  );
}

export function Fork({question, children}) {
  return (
    <Reveal className={styles.fork}>
      <p className={styles.forkQuestion}>{question}</p>
      <div className={styles.forkBranches}>{children}</div>
    </Reveal>
  );
}

export function Branch({label, title, highlight, children}) {
  return (
    <div className={clsx(styles.branch, highlight && styles.branchHighlight)}>
      <span className={styles.branchLabel}>{label}</span>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// Barres horizontales qui se remplissent à l'apparition. `max` fixe l'échelle commune ;
// `highlight` met une barre en couleur d'accent, `muted` l'atténue.
export function BarChart({title, data, max, unit = '', decimals = 0, note}) {
  return (
    <Reveal as="figure" className={styles.chart} visibleClassName={styles.chartVisible}>
      <figcaption>{title}</figcaption>
      <dl>
        {data.map(({label, value, highlight, muted}, index) => (
          <div key={label} className={clsx(styles.bar, highlight && styles.barHighlight, muted && styles.barMuted)}>
            <dt>{label}</dt>
            <dd>
              <span
                className={styles.barFill}
                style={{'--size': `${(value / max) * 100}%`, '--bar-index': index}}
              />
              <span className={styles.barValue}>
                {value.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals})}
                {unit}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className={styles.chartNote}>{note}</p>}
    </Reveal>
  );
}

// Figure reprise du papier : fond blanc dans les deux thèmes, ouverture en grand au clic.
export function PaperFigure({src, alt, caption}) {
  return (
    <Reveal as="figure" className={styles.figure}>
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img src={src} alt={alt} loading="lazy" />
      </a>
      <figcaption>{caption}</figcaption>
    </Reveal>
  );
}

export function Takeaways({children}) {
  return <Reveal className={styles.takeaways}>{children}</Reveal>;
}
