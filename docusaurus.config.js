import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Gabriel F.',
  tagline: 'Dinosaurs are cool',
  favicon: 'https://www.remilia.com/identity/pfp/veryinternetperson/2608',

  url: 'https://gabiwaxxxx.github.io',
  baseUrl: '/gabiwaxx.github.io/',
  
  // GitHub pages deployment config.
  organizationName: 'gabiwaxxxx',
  projectName: 'gabiwaxx.github.io',
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
      // '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/gabiwaxxxX/gabiwaxx.github.io',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            copyright: `Copyright © ${new Date().getFullYear()} Julien CAPOSIENA`,
            xslt: true,
          },
          editUrl: 'https://github.com/gabiwaxxxX/gabiwaxx.github.io/',

          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Gabriel F.',
        logo: {
          alt: 'My Site Logo',
          src: 'https://www.remilia.com/identity/pfp/veryinternetperson/2608',
        },

        items: [
          {
            to: '/projects',
            label: 'Projets',
            position: 'left',
          },

          {
            to: '/cv',
            label: 'CV',
            position: 'left',
          },

          {
            type: 'localeDropdown',
            position: 'right',
            position: 'right',
          },

          {
            href: 'https://github.com/gabiwaxxxX/',
            position: 'right',
            label: 'GitHub',
            'aria-label': 'Profil GitHub',
            target: '_blank',
          },
          {
            href: 'https://linkedin.com/in/0xgabriel/',
            position: 'right',
            label: 'LinkedIn',
            'aria-label': 'Profil LinkedIn',
            target: '_blank',
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/GabiwaxX',
              },
              {
                label: 'X',
                href: 'https://x.com/IvizzCut',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/gabiwaxxxX',
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/0xgabriel/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Gabriel F. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
