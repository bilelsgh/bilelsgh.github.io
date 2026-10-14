import React from 'react';
import Link from '@docusaurus/Link';
import useLabels from './useLabels';
import styles from './PublicationActions.module.css';

// Liens explicites d'une publication : le papier (site externe) et sa page vulgarisée.
// La carte elle-même n'est pas cliquable, pour qu'on sache toujours où mène le clic.
export default function PublicationActions({link, page}) {
  const {readPaper, discoverPaper} = useLabels();
  if (!link && !page) {
    return null;
  }
  return (
    <div className={styles.actions}>
      {page && (
        <Link to={page} className={styles.action}>
          {discoverPaper} <span aria-hidden="true">→</span>
        </Link>
      )}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.action}>
          {readPaper} <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}
