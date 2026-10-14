import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import publications from '@site/src/data/publications';
import PublicationActions from './PublicationActions';
import useLabels from './useLabels';
import styles from './Home.module.css';

function LatestPost() {
  const labels = useLabels();
  const {latestPost} = usePluginData('docusaurus-plugin-content-blog');
  if (!latestPost) {
    return null;
  }
  const date = new Intl.DateTimeFormat(labels.locale, {dateStyle: 'long', timeZone: 'UTC'}).format(
    new Date(latestPost.date),
  );

  return (
    <Link to={latestPost.permalink} className={`${styles.highlight} hover-card`}>
      <span className={styles.eyebrow}>{labels.latestPost}</span>
      <h2>{latestPost.title}</h2>
      <p className={styles.meta}>
        {date}
        {latestPost.readingTime && ` · ${Math.ceil(latestPost.readingTime)} ${labels.minRead}`}
      </p>
      <p className={styles.excerpt}>{latestPost.description}</p>
      <span className={styles.more}>{labels.readPost} →</span>
    </Link>
  );
}

function LatestPublication() {
  const labels = useLabels();
  const [latest] = publications;
  return (
    <article className={clsx(styles.highlight, !latest.link && styles.forthcoming)}>
      <span className={styles.eyebrow}>{labels.latestPublication}</span>
      <h2>{latest.title}</h2>
      <p className={styles.meta}>
        {latest.venue}
        {!latest.link && <span className={styles.badge}>{labels.forthcoming}</span>}
      </p>
      <div className={styles.actions}>
        <PublicationActions link={latest.link} page={latest.page} />
      </div>
    </article>
  );
}

export default function HomeHighlights() {
  return (
    <section className={styles.highlights}>
      <LatestPost />
      <LatestPublication />
    </section>
  );
}
