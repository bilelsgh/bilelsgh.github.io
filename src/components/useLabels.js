import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const labels = {
  fr: {
    forthcoming: 'À paraître',
    latestPost: 'Dernier article',
    blogIntro: 'Des réflexions et découvertes autour de mes travaux et au-delà.',
    latestPublication: 'Dernière publication',
    readPost: "Lire l'article",
    readPaper: 'Lire le papier',
    discoverPaper: 'Le papier expliqué',
    minRead: 'min de lecture',
    loading: 'Chargement des projets…',
    loadError: 'Impossible de charger les projets pour le moment.',
    seeOnGithub: 'Voir tous mes dépôts sur GitHub',
    noDescription: 'Aucune description disponible.',
    updated: 'Mis à jour',
  },
  en: {
    forthcoming: 'Forthcoming',
    latestPost: 'Latest post',
    blogIntro: 'Thoughts and findings around my research and beyond.',
    latestPublication: 'Latest publication',
    readPost: 'Read the post',
    readPaper: 'Read the paper',
    discoverPaper: 'The paper explained',
    minRead: 'min read',
    loading: 'Loading projects…',
    loadError: 'Projects cannot be loaded right now.',
    seeOnGithub: 'See all my repositories on GitHub',
    noDescription: 'No description available.',
    updated: 'Updated',
  },
};

// Libellés des composants dans la langue courante du site.
export default function useLabels() {
  const {i18n} = useDocusaurusContext();
  return {locale: i18n.currentLocale, ...(labels[i18n.currentLocale] ?? labels.fr)};
}
