import React from 'react';
import clsx from 'clsx';
import publications from '@site/src/data/publications';
import PublicationActions from './PublicationActions';
import useLabels from './useLabels';
import styles from './Publications.module.css';

function PublicationCard({venue, image, title, link, page}) {
  const {forthcoming} = useLabels();
  return (
    <article className={clsx(styles.card, !link && styles.forthcoming)}>
      <div className={styles.image}>
        <img src={image} alt={venue} width={300} height={180} loading="lazy" />
        {!link && <span className={styles.badge}>{forthcoming}</span>}
      </div>
      <div className={styles.content}>
        <h2>{venue}</h2>
        <p>{title}</p>
        <PublicationActions link={link} page={page} />
      </div>
    </article>
  );
}

export default function Publications() {
  return (
    <div className={styles.grid}>
      {publications.map((publication) => (
        <PublicationCard key={publication.venue} {...publication} />
      ))}
    </div>
  );
}
