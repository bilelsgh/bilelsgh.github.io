import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useLabels from '@site/src/components/useLabels';
import styles from './styles.module.css';

function PostCard({content, featured}) {
  const labels = useLabels();
  const {metadata, assets} = content;
  const {title, permalink, description, date, readingTime, tags, frontMatter} = metadata;
  const image = useBaseUrl(assets?.image ?? frontMatter.image);
  const formattedDate = new Intl.DateTimeFormat(labels.locale, {dateStyle: 'long', timeZone: 'UTC'}).format(
    new Date(date),
  );

  return (
    <Link to={permalink} className={clsx(styles.card, featured && styles.featured, 'hover-card')}>
      {image && (
        <div className={styles.cover}>
          <img src={image} alt="" loading="lazy" />
        </div>
      )}
      <div className={styles.body}>
        <ul className={styles.tags}>
          {featured && <li className={styles.featuredTag}>{labels.latestPost}</li>}
          {tags.map((tag) => (
            <li key={tag.permalink}>{tag.label}</li>
          ))}
        </ul>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.meta}>
          {formattedDate}
          {readingTime && ` · ${Math.ceil(readingTime)} ${labels.minRead}`}
        </p>
        <p className={styles.excerpt}>{description}</p>
        <span className={styles.more}>{labels.readPost} →</span>
      </div>
    </Link>
  );
}

// Listes d'articles (blog, tags, auteurs) : une grille de cartes au lieu des articles empilés,
// avec le plus récent mis en avant.
export default function BlogPostItems({items}) {
  return (
    <div className={styles.grid}>
      {items.map(({content}, index) => (
        <PostCard key={content.metadata.permalink} content={content} featured={index === 0} />
      ))}
    </div>
  );
}
