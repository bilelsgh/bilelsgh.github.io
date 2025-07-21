import React from 'react';

const allCards = [
  {
    href: "/publications",
    title: "📚 Publications",
    description: "Découvrez mes travaux de recherche."
  },
  {
    href: "/projets",
    title: "🔧 Projets",
    description: "Explorez mes contributions en code, mes démos, et outils développés."
  },
  {
    href: "/cv",
    title: "📖 CV",
    description: "Mon parcours académique et professionnel."
  },
  {
    href: "/blog",
    title: "🖊️ Blog",
    description: "Des réflexions et découvertes autour de mes travaux et au-delà."
  }
];

function getRandomCards(arr, n = 2) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function RandomCards() {
  const cards = getRandomCards(allCards);

  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
      {cards.map(({ href, title, description }) => (
        <a key={href} href={href} className="mycard" style={{ flex: '1 1 200px' }}>
          <h3>{title}</h3>
          <p>{description}</p>
        </a>
      ))}
    </div>
  );
}
