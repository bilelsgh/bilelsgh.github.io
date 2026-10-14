import React, {useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const THRESHOLD = 0.3;
const ALGORITHMS = ['Fuzzy C-Means', 'Fuzzy DBSCAN', 'Fuzzy HDBSCAN'];

// Reproduit le vote du papier : un algorithme vote « normal » si le groupe du flux est
// majoritairement normal ET si le flux y appartient suffisamment (degré > seuil).
// La récompense vaut ±(1 + confiance) / 2, la confiance étant le degré moyen de la majorité.
function computeReward(voters, agentSaysBenign) {
  const votes = voters.map(({benignCluster, membership}) => benignCluster && membership > THRESHOLD);
  const benignVotes = votes.filter(Boolean).length;
  const majorityBenign = benignVotes > voters.length / 2;
  const majority = voters.filter((_, index) => votes[index] === majorityBenign);
  const confidence = majority.reduce((sum, {membership}) => sum + membership, 0) / majority.length;
  const agreed = agentSaysBenign === majorityBenign;
  return {votes, majorityBenign, confidence, reward: ((agreed ? 1 : -1) * (1 + confidence)) / 2};
}

export default function RewardSimulator({labels}) {
  const [voters, setVoters] = useState([
    {benignCluster: true, membership: 0.8},
    {benignCluster: false, membership: 0.7},
    {benignCluster: false, membership: 0.5},
  ]);
  const [agentSaysBenign, setAgentSaysBenign] = useState(false);
  const {votes, majorityBenign, confidence, reward} = computeReward(voters, agentSaysBenign);

  const update = (index, patch) =>
    setVoters(voters.map((voter, i) => (i === index ? {...voter, ...patch} : voter)));

  return (
    <div className={styles.simulator}>
      <div className={styles.voters}>
        {voters.map((voter, index) => (
          <div key={ALGORITHMS[index]} className={styles.voter}>
            <h4>{ALGORITHMS[index]}</h4>
            <div className={styles.toggle} role="group" aria-label={labels.cluster}>
              <button
                type="button"
                aria-pressed={voter.benignCluster}
                onClick={() => update(index, {benignCluster: true})}
              >
                {labels.benignCluster}
              </button>
              <button
                type="button"
                aria-pressed={!voter.benignCluster}
                onClick={() => update(index, {benignCluster: false})}
              >
                {labels.attackCluster}
              </button>
            </div>
            <label>
              {labels.membership} : <strong>{voter.membership.toFixed(1)}</strong>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voter.membership}
                onChange={(event) => update(index, {membership: Number(event.target.value)})}
              />
            </label>
            <p className={clsx(styles.vote, votes[index] ? styles.voteBenign : styles.voteAlert)}>
              {labels.vote} : {votes[index] ? labels.benign : labels.alert}
            </p>
          </div>
        ))}
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
          <span className={styles.verdictLabel}>{labels.majority}</span>
          <strong className={majorityBenign ? styles.voteBenign : styles.voteAlert}>
            {majorityBenign ? labels.benign : labels.alert}
          </strong>
        </div>
        <div>
          <span className={styles.verdictLabel}>{labels.confidence}</span>
          <strong>{confidence.toFixed(2)}</strong>
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
