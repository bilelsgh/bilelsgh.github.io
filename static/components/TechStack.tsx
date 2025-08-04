import React from 'react';
import styles from '/static/components/TechStack.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Item = {
  label: string;
  src: string;      
  href?: string;    
};

const items: Item[] = [
  { label: 'Python',      src: '/img/stack/python.png',      href: 'https://www.python.org/' },
  { label: 'TensorFlow',  src: '/img/stack/tensorflow.png',  href: 'https://www.tensorflow.org/' },
  { label: 'Gymnasium',   src: '/img/stack/gym.png',   href: 'https://github.com/Farama-Foundation/Gymnasium' },
  { label: 'Stable-baseline3',   src: '/img/stack/sb3.png',   href: 'https://github.com/DLR-RM/stable-baselines3/' },
  { label: 'Scikit Learn',  src: '/img/stack/sklearn.png',  href: 'https://github.com/scikit-learn/scikit-learn' },
  { label: 'Langchain',  src: '/img/stack/langchain.png',  href: 'https://github.com/langchain-ai/langchain' },
  { label: 'Streamlit',  src: '/img/stack/streamlit.png',  href: 'https://github.com/streamlit/streamlit' },
  { label: 'ML-Flow',  src: '/img/stack/mlflow.png',  href: 'https://mlflow.org/' },
  { label: 'UV',  src: '/img/stack/uv.svg',  href: 'https://github.com/astral-sh/uv' },
  { label: 'pre-commit',  src: '/img/stack/precommit.png',  href: 'https://github.com/pre-commit/pre-commit'},
];

export default function TechStack() {
  return (
    <div className={styles.row} role="list" aria-label="tech-stack">
      {items.map((it) => {
        const imgUrl = useBaseUrl(it.src);
        const Tag = it.href ? 'a' : 'div';
        const tooltipId = `tt-${it.label.replace(/\s+/g, '-').toLowerCase()}`;

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
            <img src={imgUrl} alt="" aria-hidden="true" className={styles.icon} />
            <span id={tooltipId} role="tooltip" className={styles.tooltip}>
              {it.label}
            </span>
          </Tag>
        );
      })}
    </div>
  );
}