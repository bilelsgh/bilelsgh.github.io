import React, {useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// Score de normalité du papier KES 2026, avec α = β = 0,5 :
// η = 0,5 × (taille / taille moyenne) + 0,5 × (densité / densité moyenne).
function normality(cluster, clusters) {
  const mean = (key) => clusters.reduce((sum, c) => sum + c[key], 0) / clusters.length;
  return 0.5 * (cluster.size / mean('size')) + 0.5 * (cluster.density / mean('density'));
}

function Slider({label, value, display, ...props}) {
  return (
    <label>
      {label} : <strong>{display}</strong>
      <input type="range" value={value} {...props} />
    </label>
  );
}

export default function NormalitySimulator({labels}) {
  const [sizeA, setSizeA] = useState(70);
  const [densities, setDensities] = useState([0.6, 0.8]);
  const [flowCluster, setFlowCluster] = useState(1);
  const [membership, setMembership] = useState(0.8);
  const [agentSaysBenign, setAgentSaysBenign] = useState(false);

  const clusters = [
    {size: sizeA, density: densities[0]},
    {size: 100 - sizeA, density: densities[1]},
  ];
  const scores = clusters.map((cluster) => normality(cluster, clusters));
  const normalCluster = scores[0] >= scores[1] ? 0 : 1;
  // Récompense ±μ : positive si l'agent dit « normal » pour un flux du groupe normal,
  // ou « alerte » pour un flux de l'autre groupe.
  const reward = (agentSaysBenign === (flowCluster === normalCluster) ? 1 : -1) * membership;

  return (
    <div className={styles.simulator}>
      <div className={styles.voters}>
        {clusters.map((cluster, index) => (
          <div key={labels.clusters[index]} className={styles.voter}>
            <h4>{labels.clusters[index]}</h4>
            <Slider
              label={labels.size}
              value={cluster.size}
              display={`${cluster.size} %`}
              min="10"
              max="90"
              step="5"
              onChange={(event) => {
                const value = Number(event.target.value);
                setSizeA(index === 0 ? value : 100 - value);
              }}
            />
            <Slider
              label={labels.density}
              value={cluster.density}
              display={cluster.density.toFixed(1)}
              min="0.1"
              max="1"
              step="0.1"
              onChange={(event) =>
                setDensities(densities.map((d, i) => (i === index ? Number(event.target.value) : d)))
              }
            />
            <p className={clsx(styles.vote, index === normalCluster ? styles.voteBenign : styles.voteAlert)}>
              {labels.score} : {scores[index].toFixed(2)} — {index === normalCluster ? labels.benign : labels.suspect}
            </p>
          </div>
        ))}
        <div className={styles.voter}>
          <h4>{labels.flow}</h4>
          <div className={styles.toggle} role="group" aria-label={labels.flow}>
            {labels.clusters.map((name, index) => (
              <button key={name} type="button" aria-pressed={flowCluster === index} onClick={() => setFlowCluster(index)}>
                {name}
              </button>
            ))}
          </div>
          <Slider
            label={labels.membership}
            value={membership}
            display={membership.toFixed(1)}
            min="0.5"
            max="1"
            step="0.1"
            onChange={(event) => setMembership(Number(event.target.value))}
          />
        </div>
      </div>

      <div className={styles.verdict}>
        <div>
          <span className={styles.verdictLabel}>{labels.agentAction}</span>
          <div className={styles.toggle} role="group" aria-label={labels.agentAction}>
            <button type="button" aria-pressed={agentSaysBenign} onClick={() => setAgentSaysBenign(true)}>
              {labels.benign}
            </button>
            <button type="button" aria-pressed={!agentSaysBenign} onClick={() => setAgentSaysBenign(false)}>
              {labels.alert}
            </button>
          </div>
        </div>
        <div>
          <span className={styles.verdictLabel}>{labels.normalCluster}</span>
          <strong>{labels.clusters[normalCluster]}</strong>
        </div>
        <div>
          <span className={styles.verdictLabel}>{labels.reward}</span>
          <strong className={clsx(styles.reward, reward > 0 ? styles.voteBenign : styles.voteAlert)}>
            {reward > 0 ? '+' : '−'}
            {Math.abs(reward).toFixed(2)}
          </strong>
        </div>
      </div>
      <p className={styles.simulatorNote}>{labels.note}</p>
    </div>
  );
}
