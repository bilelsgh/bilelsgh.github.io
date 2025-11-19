import React from 'react';
import styles from '/static/components/TechStack.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Item = {
  label: string;
  src: string;
  href?: string;
};

type TechCategory = {
  title: string;
  items: Item[];
};

const techStack: TechCategory[] = [
  {
    title: 'Blockchain & Smart Contracts',
    items: [
      {
        label: 'Solidity',
        src: '/img/stack/solidity.svg',
        href: 'https://soliditylang.org/',
      },
      {
        label: 'Vyper',
        src: '/img/stack/vyper.svg',
        href: 'https://vyperlang.org/',
      },
      {
        label: 'Ethereum',
        src: '/img/stack/ethereum.svg',
        href: 'https://ethereum.org/',
      },
      {
        label: 'Foundry',
        src: '/img/stack/foundry.png',
        href: 'https://getfoundry.sh/',
      },
      {
        label: 'Hardhat',
        src: '/img/stack/hardhat.png',
        href: 'https://hardhat.org/',
      },
      {
        label: 'The Graph',
        src: '/img/stack/thegraph.png',
        href: 'https://thegraph.com/',
      },
    ],
  },
  {
    title: 'Backend',
    items: [
      {
        label: 'Node.js',
        src: '/img/stack/nodejs.svg',
        href: 'https://nodejs.org/',
      },
      {
        label: 'TypeScript',
        src: '/img/stack/typescript.svg',
        href: 'https://www.typescriptlang.org/',
      },
      {
        label: 'Golang',
        src: '/img/stack/go.svg',
        href: 'https://go.dev/',
      },
      {
        label: 'Rust',
        src: '/img/stack/rust.svg',
        href: 'https://www.rust-lang.org/',
      },
    ],
  },
  {
    title: 'Frontend',
    items: [
      {
        label: 'React',
        src: '/img/stack/react.svg',
        href: 'https://reactjs.org/',
      },
      {
        label: 'TypeScript',
        src: '/img/stack/typescript.svg',
        href: 'https://www.typescriptlang.org/',
      },
    ],
  },
  {
    title: 'Database',
    items: [
      {
        label: 'PostgreSQL',
        src: '/img/stack/postgresql.svg',
        href: 'https://www.postgresql.org/',
      },
      {
        label: 'MongoDB',
        src: '/img/stack/mongodb.png',
        href: 'https://www.mongodb.com/',
      },
    ],
  },
  {
    title: 'DevOps & Tools',
    items: [
      {
        label: 'Docker',
        src: '/img/stack/docker.svg',
        href: 'https://www.docker.com/',
      },
      {
        label: 'Git',
        src: '/img/stack/git.svg',
        href: 'https://git-scm.com/',
      },
      {
        label: 'Linux',
        src: '/img/stack/linux.svg',
        href: 'https://www.linux.org/',
      },
    ],
  },
];

export default function TechStack() {
  return (
    <div className={styles.container}>
      {techStack.map((category, idx) => (
        <div key={idx} className={styles.category}>
          <h3 className={styles.categoryTitle}>{category.title}</h3>
          <div className={styles.row} role="list" aria-label={category.title}>
            {category.items.map(it => {
              const imgUrl = useBaseUrl(it.src);
              const Tag = it.href ? 'a' : 'div';
              const tooltipId = `tt-${category.title}-${it.label.replace(/\s+/g, '-').toLowerCase()}`;

              return (
                <Tag
                  key={it.label}
                  className={styles.item}
                  {...(it.href
                    ? { href: it.href, target: '_blank', rel: 'noopener noreferrer' }
                    : { tabIndex: 0 })}
                  aria-label={it.label}
                  aria-describedby={tooltipId}
                  role="listitem"
                >
                  <img
                    src={imgUrl}
                    alt=""
                    aria-hidden="true"
                    className={styles.icon}
                  />
                  <span id={tooltipId} role="tooltip" className={styles.tooltip}>
                    {it.label}
                  </span>
                </Tag>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
