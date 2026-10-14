import React, {useState} from 'react';
import styles from './styles.module.css';

function Choice({label, options, value, onChange, format = (option) => option}) {
  return (
    <div className={styles.choice}>
      <span>{label}</span>
      <div className={styles.toggle} role="group" aria-label={label}>
        {options.map((option) => (
          <button key={option} type="button" aria-pressed={option === value} onClick={() => onChange(option)}>
            {format(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

// Explore un tableau de résultats de la forme
// results[jeu de données][ligne][série] = [valeur de chaque mesure].
// `metricOrder` donne l'ordre d'affichage des mesures (la première est sélectionnée).
export default function ResultsExplorer({results, series, metricOrder, initialGroup, labels}) {
  const groups = Object.keys(results);
  const [group, setGroup] = useState(initialGroup ?? groups[0]);
  const [selectedSeries, setSelectedSeries] = useState(series[0]);
  const [metric, setMetric] = useState(metricOrder[0]);

  return (
    <div className={styles.explorer}>
      <Choice label={labels.dataset} options={groups} value={group} onChange={setGroup} />
      <Choice label={labels.technique} options={series} value={selectedSeries} onChange={setSelectedSeries} />
      <Choice
        label={labels.metric}
        options={metricOrder}
        value={metric}
        onChange={setMetric}
        format={(option) => labels.metrics[option]}
      />
      <p className={styles.explorerHint}>{labels.metricHelp[metric]}</p>

      <dl className={styles.explorerBars}>
        {Object.entries(results[group]).map(([row, scores]) => {
          const value = scores[selectedSeries][metric];
          return (
            <div key={row} className={styles.bar}>
              <dt>{row}</dt>
              <dd>
                <span className={styles.liveFill} style={{width: `${value * 100}%`}} />
                <span className={styles.barValue}>{Math.round(value * 100)} %</span>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
