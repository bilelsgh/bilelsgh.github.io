import React from 'react';
import clsx from 'clsx';
import publications, {talks} from '@site/src/data/publications';
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
        <h3>{venue}</h3>
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

// Workshops et tutoriels : cartes sobres, sans image, pour les distinguer des articles.
function TalkCard({kind, venue, title, details}) {
  const {locale} = useLabels();
  return (
    <article className={styles.talk}>
      <p className={styles.talkMeta}>
        <span className={styles.talkKind}>{kind}</span> {venue}
      </p>
      <p className={styles.talkTitle}>{title}</p>
      <p className={styles.talkDetails}>{details[locale] ?? details.fr}</p>
    </article>
  );
}

export function Talks() {
  return (
    <div className={styles.talks}>
      {talks.map((talk) => (
        <TalkCard key={talk.venue} {...talk} />
      ))}
    </div>
  );
}
