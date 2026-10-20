// Publications, de la plus récente à la plus ancienne.
// Sans `link`, la publication est affichée comme « à paraître ».
// `page` pointe vers une page du site qui présente le papier.
const publications = [
  {
    venue: 'ACSAC 2026',
    image: '/img/acsac26.jpg',
    title:
      'TRACER: a Threat-aware Reinforcement-Learning Agent using Clustering Ensemble Rewards for Intrusion Detection',
    page: '/tracer',
  },
  {
    venue: 'KES 2026',
    image: '/img/kes26.jpg',
    title:
      'Deep reinforcement learning for continuous intrusion detection using unsupervised fuzzy clustering-based rewards',
    // Page /kes26 prête, à relier ici (page: '/kes26') une fois son contenu validé.
  },
  {
    venue: 'KES 2025',
    image: '/img/kes25.jpg',
    title:
      'Comprehensive Comparison of Streaming Clustering-Based IDS: Evaluation Across Clustering Families with a Novel Ensemble Classifier',
    link: 'https://www.sciencedirect.com/science/article/pii/S187705092502928X',
  },
  {
    venue: 'CSNet 2024',
    image: '/img/paris_csnet.jpg',
    title:
      'Towards an Unsupervised Reward Function for a Deep Reinforcement Learning Based Intrusion Detection System',
    link: 'https://ieeexplore.ieee.org/abstract/document/10851732',
  },
];

export default publications;

// Workshops et tutoriels : présentations sans article, affichées plus discrètement.
export const talks = [
  {
    kind: 'Workshop',
    venue: 'LASER 2026',
    title: 'From Benchmark to Deployment: How Should We Evaluate Learning-Based IDS?',
    details: {
      fr: 'Co-localisé avec ACSAC 2026 · Los Angeles · 8 décembre 2026',
      en: 'Co-located with ACSAC 2026 · Los Angeles · December 8, 2026',
    },
  },
  {
    kind: 'Tutorial',
    venue: 'CCNC 2027',
    title: 'Leveraging Graph Neural Networks for Root Cause Analysis in Complex Computer Networks',
    details: {
      fr: 'Tutoriel d’une demi-journée · avec A. Nageotte, K. Murphy, H. Suzanne',
      en: 'Half-day tutorial · with A. Nageotte, K. Murphy, H. Suzanne',
    },
  },
];
