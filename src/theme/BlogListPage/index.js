import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import useLabels from '@site/src/components/useLabels';
import styles from './styles.module.css';

function BlogListPageMetadata(props) {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

// En-tête du blog : titre, accroche et tags des articles affichés (liens vers les pages de tag).
function BlogHeader({metadata, items}) {
  const labels = useLabels();
  const tags = new Map();
  items.forEach(({content}) => {
    content.metadata.tags.forEach((tag) => tags.set(tag.permalink, tag.label));
  });

  return (
    <header className={styles.header}>
      <h1>{metadata.blogTitle}</h1>
      <p>{labels.blogIntro}</p>
      <ul className={styles.tags}>
        {[...tags].map(([permalink, label]) => (
          <li key={permalink}>
            <Link to={permalink}>{label}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

function BlogListPageContent(props) {
  const {metadata, items, sidebar} = props;
  return (
    <BlogLayout sidebar={sidebar}>
      <BlogHeader metadata={metadata} items={items} />
      <BlogPostItems items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
