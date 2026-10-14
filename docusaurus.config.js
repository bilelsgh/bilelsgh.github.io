import {themes as prismThemes} from 'prism-react-renderer';

const socialLink = (name, label, href) =>
  `<a href="${href}" class="social-link social-link--${name}" aria-label="${label}" title="${label}" target="_blank" rel="noopener noreferrer"></a>`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bilel S.',
  tagline: "Doctorant en Machine Learning — apprentissage par renforcement et détection d'intrusion",
  favicon: 'img/favicon.ico',

  url: 'https://bilelsgh.github.io',
  baseUrl: '/',
  projectName: 'bilelsgh.github.io',
  organizationName: 'bilelsgh',
  deploymentBranch: 'main',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: false,
        // Le blog est déclaré dans `plugins` (version étendue du plugin officiel).
        blog: false,
        theme: {
          customCss: [
            './node_modules/@fontsource-variable/inter/index.css',
            './node_modules/@fontsource-variable/source-serif-4/index.css',
            './src/css/custom.css',
          ],
        },
      }),
    ],
  ],

  plugins: [
    [
      './plugins/blog-latest-post.js',
      {
        showReadingTime: true,
        blogSidebarCount: 0,
        blogDescription: 'Réflexions et découvertes autour de mes travaux de recherche en IA',
        feedOptions: {
          type: ['rss', 'atom'],
          copyright: `Copyright © ${new Date().getFullYear()} Bilel Saghrouchni`,
          xslt: true,
        },
        editUrl: 'https://github.com/bilelsgh/bilelsgh.github.io/',
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/pp.jpg',
      navbar: {
        title: 'Bilel S.',
        logo: {
          alt: 'Bilel S.',
          src: 'img/logo.png',
        },

        items: [
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/publications', label: 'Publications', position: 'left'},
          {to: '/projects', label: 'Projets', position: 'left'},
          {to: '/cv', label: 'CV', position: 'left'},
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/bilelsgh/',
            position: 'right',
            label: 'GitHub',
            className: 'social-link social-link--github',
            'aria-label': 'Profil GitHub',
            title: 'GitHub',
            target: '_blank',
          },
          {
            href: 'https://linkedin.com/in/bilel-saghrouchni/',
            position: 'right',
            label: 'LinkedIn',
            className: 'social-link social-link--linkedin',
            'aria-label': 'Profil LinkedIn',
            title: 'LinkedIn',
            target: '_blank',
          },
        ],
      },

      footer: {
        links: [
          {html: socialLink('github', 'GitHub', 'https://github.com/bilelsgh')},
          {html: socialLink('linkedin', 'LinkedIn', 'https://linkedin.com/in/bilel-saghrouchni/')},
          {html: socialLink('email', 'Email', 'mailto:bilel.saghrouchni@gmail.com')},
        ],
        copyright: `© ${new Date().getFullYear()} Bilel Saghrouchni`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
