import React, {useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const BOXES = [
  {key: 'state', x: 10},
  {key: 'action', x: 200},
  {key: 'reward', x: 390},
];

function Step({x, y, n}) {
  return (
    <g className={styles.loopStep}>
      <circle cx={x} cy={y} r="11" />
      <text x={x} y={y}>
        {n}
      </text>
    </g>
  );
}

// Boucle bandit contextuel vs boucle d'apprentissage par renforcement profond :
// seule la seconde a la flèche 3, où l'action influence l'état suivant.
export default function BanditVsDrl({labels}) {
  const [mode, setMode] = useState('cb');
  const isDrl = mode === 'drl';

  return (
    <figure className={clsx(styles.loopDiagram, isDrl && styles.loopDrl)}>
      <div className={styles.toggle} role="group" aria-label={labels.toggle}>
        <button type="button" aria-pressed={!isDrl} onClick={() => setMode('cb')}>
          {labels.cb}
        </button>
        <button type="button" aria-pressed={isDrl} onClick={() => setMode('drl')}>
          {labels.drl}
        </button>
      </div>

      <svg viewBox="0 0 520 230" role="img" aria-label={isDrl ? labels.drlText : labels.cbText}>
        <text x="260" y="222" className={styles.loopTitle}>
          {isDrl ? labels.drl : labels.cb}
        </text>
        <defs>
          <marker id="loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" className={styles.loopHead} />
          </marker>
        </defs>

        <path d="M130 110 H198" className={styles.loopArrow} markerEnd="url(#loop-arrow)" />
        <path d="M320 110 H388" className={styles.loopArrow} markerEnd="url(#loop-arrow)" />
        <path d="M70 138 V185 H450 V140" className={styles.loopArrow} markerEnd="url(#loop-arrow)" />
        <path
          d="M260 82 V30 H70 V80"
          className={clsx(styles.loopArrow, styles.loopReturn, isDrl && styles.loopReturnVisible)}
          markerEnd="url(#loop-arrow)"
        />
        {/* Jeton qui parcourt la boucle de retour, pour montrer que l'action modifie l'état suivant */}
        {isDrl && (
          <circle r="6" className={styles.loopToken}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M260 82 V30 H70 V80" />
          </circle>
        )}

        {BOXES.map(({key, x}) => (
          <g key={key}>
            <rect x={x} y="82" width="120" height="56" rx="8" className={styles.loopBox} />
            <text x={x + 60} y="110" className={styles.loopLabel}>
              {labels[key]}
            </text>
          </g>
        ))}

        <Step x={164} y={94} n={1} />
        <Step x={354} y={94} n={2} />
        <Step x={260} y={185} n={2} />
        <g className={clsx(styles.loopReturn, isDrl && styles.loopReturnVisible)}>
          <Step x={165} y={30} n={3} />
        </g>
      </svg>

      <figcaption aria-live="polite">{isDrl ? labels.drlText : labels.cbText}</figcaption>
    </figure>
  );
}
