import React, {useEffect, useRef} from 'react';
import Link from '@docusaurus/Link';
import Reveal from './Reveal';
import styles from './Cv.module.css';

function Tags({items}) {
  if (!items?.length) {
    return null;
  }
  return (
    <ul className={styles.tags}>
      {items.map((item, index) => (
        <li key={item} style={{'--tag-index': index}}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CvHeader({name, role, location, languages, downloadHref, downloadLabel}) {
  return (
    <Reveal as="header" className={styles.header}>
      <div>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.role}>{role}</p>
        <ul className={styles.contact}>
          <li>{location}</li>
          <li>
            <a href="mailto:bilel.saghrouchni@gmail.com">bilel.saghrouchni@gmail.com</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/bilel-saghrouchni" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/bilel-saghrouchni
            </a>
          </li>
          <li>{languages}</li>
        </ul>
      </div>
      <a className="button button--primary" href={downloadHref} target="_blank" rel="noopener noreferrer">
        {downloadLabel}
      </a>
    </Reveal>
  );
}

// La frise se remplit au fil du défilement : --cv-progress vaut 0 en haut de la frise, 1 en bas.
export function CvTimeline({children}) {
  const ref = useRef(null);

  useEffect(() => {
    const timeline = ref.current;
    let frame = null;

    function update() {
      frame = null;
      const rect = timeline.getBoundingClientRect();
      const progress = (window.innerHeight * 0.65 - rect.top) / rect.height;
      timeline.style.setProperty('--cv-progress', Math.min(1, Math.max(0, progress)));
    }

    function onScroll() {
      if (frame === null) {
        frame = requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={styles.timeline}>
      {children}
    </div>
  );
}

export function CvEntry({title, org, date, location, stack, children}) {
  return (
    <Reveal as="article" className={styles.entry} visibleClassName={styles.entryVisible}>
      <div className={styles.entryHead}>
        <h3>{title}</h3>
        <span className={styles.date}>{date}</span>
      </div>
      <p className={styles.org}>
        {org}
        {location && <span> · {location}</span>}
      </p>
      {children}
      <Tags items={stack} />
    </Reveal>
  );
}

export function CvGrid({children}) {
  return <div className={styles.grid}>{children}</div>;
}

export function CvCard({title, tags, children}) {
  return (
    <Reveal>
      <div className={`${styles.card} hover-card`}>
        <h3>{title}</h3>
        {children}
        <Tags items={tags} />
      </div>
    </Reveal>
  );
}

// Petit bouton placé dans un titre de section, vers une page plus complète.
export function CvMoreLink({to, label}) {
  return (
    <Link to={to} className={styles.moreLink}>
      {label}
    </Link>
  );
}
