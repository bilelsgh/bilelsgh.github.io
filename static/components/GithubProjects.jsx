import React, { useEffect, useState } from 'react';
import useLabels from '@site/src/components/useLabels';
import styles from './GithubProjects.module.css';

const GITHUB_USER = 'bilelsgh';
const MAX_PROJECTS = 9;

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
  default: '#cccccc'
};

// Projets originaux uniquement, les plus étoilés puis les plus récemment mis à jour d'abord.
function selectProjects(repos) {
  return repos
    .filter(repo => !repo.fork && !repo.archived && repo.name !== `${GITHUB_USER}.github.io`)
    .sort((a, b) =>
      b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, MAX_PROJECTS);
}

export default function GitHubProjects() {
  const labels = useLabels();
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setRepos(selectProjects(data));
        setStatus('ready');
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des repos GitHub :", err);
        setStatus('error');
      });
  }, []);

  const dateFormat = new Intl.DateTimeFormat(labels.locale, { month: 'short', year: 'numeric' });

  return (
    <>
      {status === 'loading' && <p className={styles.status}>{labels.loading}</p>}
      {status === 'error' && <p className={styles.status}>{labels.loadError}</p>}

      <div className={styles.grid}>
        {repos.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            className={`${styles.card} hover-card`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>{repo.name}</h3>
            <p className={styles.description}>{repo.description || labels.noDescription}</p>
            <div className={styles.meta}>
              {repo.language && (
                <span>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: languageColors[repo.language] || languageColors.default }}
                  />
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
              <span>{labels.updated} {dateFormat.format(new Date(repo.pushed_at))}</span>
            </div>
          </a>
        ))}
      </div>

      <p className={styles.more}>
        <a href={`https://github.com/${GITHUB_USER}?tab=repositories`} target="_blank" rel="noopener noreferrer">
          {labels.seeOnGithub} →
        </a>
      </p>
    </>
  );
}
