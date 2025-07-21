import React, { useEffect, useState } from 'react';

export default function GitHubProjects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/bilelsgh/repos?per_page=100')
      .then(res => res.json())
      .then(data => {
        const publicRepos = data.filter(repo => !repo.private);
        setRepos(publicRepos);
      })
      .catch(err => console.error("Erreur lors de la récupération des repos GitHub :", err));
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {repos.map(repo => (
        <a
          key={repo.id}
          href={repo.html_url}
          className="mycard"
          style={{ flex: '1 1 300px', textDecoration: 'none' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>{repo.name}</h3>
          <p>{repo.description || "Aucune description disponible."}</p>
        </a>
      ))}
    </div>
  );
}
