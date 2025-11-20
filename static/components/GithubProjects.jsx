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
  const [loading, setLoading] = useState(true);

  const featuredProjects = [
    'go-bot-cli',
    'golang-random-EVM',
    'multisig-automate-proposer',
    'Irboz-multi-tx',
    'eth-dca-bot',
    'remilia_api',
    'test-diamond-proxy',
    'ClaimAndSell',
  ];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const [gabiwaxxxResponse, gfournieriExecResponse] = await Promise.all([
          fetch('https://api.github.com/users/gabiwaxxxX/repos?per_page=100'),
          fetch('https://api.github.com/users/gfournieriExec/repos?per_page=100')
        ]);

        const gabiwaxxxData = await gabiwaxxxResponse.json();
        const gfournieriExecData = await gfournieriExecResponse.json();

        const gabiwaxxxRepos = gabiwaxxxData
          .filter(repo => !repo.private)
          .map(repo => ({ ...repo, accountName: 'gabiwaxxxX' }));
        
        const gfournieriExecRepos = gfournieriExecData
          .filter(repo => !repo.private)
          .map(repo => ({ ...repo, accountName: 'gfournieriExec' }));
        const allRepos = [...gabiwaxxxRepos, ...gfournieriExecRepos];

        const featured = allRepos.filter(repo => 
          featuredProjects.includes(repo.name)
        );
        const nonFeatured = allRepos.filter(repo => 
          !featuredProjects.includes(repo.name)
        );

        featured.sort((a, b) => 
          featuredProjects.indexOf(a.name) - featuredProjects.indexOf(b.name)
        );

        nonFeatured.sort((a, b) => {
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          if (b.forks_count !== a.forks_count) {
            return b.forks_count - a.forks_count;
          }
          return new Date(b.updated_at) - new Date(a.updated_at);
        });

        // Combine: featured first, then sorted non-featured
        setRepos([...featured, ...nonFeatured]);
      } catch (err) {
        console.error('Erreur lors de la récupération des repos GitHub :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {loading && <p>Loading repositories...</p>}
      {repos.map(repo => {
        const language = repo.language || 'Inconnu';
        const color = languageColors[language] || languageColors.default;
        const isFeatured = featuredProjects.includes(repo.name);

        return (
          <a
            key={`${repo.accountName}-${repo.id}`}
            href={repo.html_url}
            className="mycard"
            style={{ 
              flex: '1 1 300px', 
              textDecoration: 'none',
              border: isFeatured ? '2px solid #ffd700' : undefined,
              boxShadow: isFeatured ? '0 4px 8px rgba(255, 215, 0, 0.2)' : undefined,
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.25rem' }}>
              <h3 style={{ margin: 0, flex: 1 }}>
                {isFeatured && <span style={{ marginRight: '0.25rem' }}>⭐</span>}
                {repo.name}
              </h3>
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '12px',
                  backgroundColor: repo.accountName === 'gabiwaxxxX' ? '#e3f2fd' : '#f3e5f5',
                  color: repo.accountName === 'gabiwaxxxX' ? '#1976d2' : '#7b1fa2',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                }}
              >
                {repo.accountName}
              </span>
            </div>
            <p style={{ minHeight: '3rem' }}>
              {repo.description || 'Aucune description disponible.'}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
              {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: '#666' }}>
                </div>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}
