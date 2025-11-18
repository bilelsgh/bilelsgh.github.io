import React, { useEffect, useState } from 'react';

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
  JupyterNotebook: '#DA5B0B',
  default: '#cccccc',
};

export default function GitHubProjects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/bilelsgh/repos?per_page=100')
      .then(res => res.json())
      .then(data => {
        const publicRepos = data.filter(repo => !repo.private);
        setRepos(publicRepos);
      })
      .catch(err =>
        console.error('Erreur lors de la récupération des repos GitHub :', err)
      );
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {repos.map(repo => {
        const language = repo.language || 'Inconnu';
        const color = languageColors[language] || languageColors.default;

        return (
          <a
            key={repo.id}
            href={repo.html_url}
            className="mycard"
            style={{ flex: '1 1 300px', textDecoration: 'none' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 style={{ marginBottom: '0.5rem' }}>{repo.name}</h3>
            <p style={{ minHeight: '3rem' }}>
              {repo.description || 'Aucune description disponible.'}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '0.5rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: color,
                  marginRight: 6,
                }}
              />
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                {language}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
