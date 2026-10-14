import React from 'react';
import NetworkBackdrop from './NetworkBackdrop';
import styles from './Home.module.css';

export default function HomeHero({name, role, photoAlt, contactLabel, children}) {
  return (
    <header className={styles.hero}>
      <NetworkBackdrop />
      <div className={styles.intro}>
        <p className={styles.role}>{role}</p>
        <h1 className={styles.name}>{name}</h1>
        <div className={styles.bio}>{children}</div>
        <a className={styles.contact} href="mailto:bilel.saghrouchni@gmail.com">
          {contactLabel} <span aria-hidden="true">→</span>
        </a>
      </div>
      <img className={styles.photo} src="/img/pp.jpg" alt={photoAlt} width={200} height={200} />
    </header>
  );
}
