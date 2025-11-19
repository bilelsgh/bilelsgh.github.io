import React from 'react';
import { useLocation } from '@docusaurus/router';

const allCardsData = {
  fr: [
    {
      href: '/projects',
      title: '🔧 Projets',
      description:
        'Explorez mes contributions en code, mes démos, et outils développés.',
    },
    {
      href: '/cv',
      title: '📖 CV',
      description: 'Mon parcours académique et professionnel.',
    }
  ],
  en: [
    {
      href: '/en/projects',
      title: '🔧 Projects',
      description:
        'Explore my code contributions, demos, and developed tools.',
    },
    {
      href: '/en/cv',
      title: '📖 CV',
      description: 'My academic and professional background.',
    }
  ]
};

function getRandomCards(arr, n = 2) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function RandomCards() {
  const location = useLocation();
  const locale = location.pathname.startsWith('/en') ? 'en' : 'fr';
  const allCards = allCardsData[locale];
  const cards = getRandomCards(allCards);

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
        flexWrap: 'wrap',
      }}
    >
      {cards.map(({ href, title, description }) => (
        <a
          key={href}
          href={href}
          className="mycard"
          style={{ flex: '1 1 200px' }}
        >
          <h3>{title}</h3>
          <p>{description}</p>
        </a>
      ))}
    </div>
  );
}
