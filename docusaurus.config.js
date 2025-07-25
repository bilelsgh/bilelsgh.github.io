import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bilel S.',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',


  url: 'https://bilelsgh.github.io',
  baseUrl: '/',
  projectName: 'bilelsgh.github.io',
  organizationName: 'bilelsgh',
  deploymentBranch: 'main',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

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
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/bilelsgh/bilelsgh.github.io',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            copyright: `Copyright © ${new Date().getFullYear()} Julien CAPOSIENA`,
            xslt: true,
          },
          editUrl:
            'https://github.com/bilelsgh/bilelsgh.github.io/',

          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Bilel S.',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },

        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },

          {
            to: '/blog', 
            label: 'Blog', 
            position: 'left'},

            
          {
            to: '/publications', 
            label: 'Publications', 
            position: 'left'},
            
            {
              to: '/projects', 
              label: 'Projets', 
              position: 'left'},
            
            {
              to: '/cv', 
              label: 'CV', 
              position: 'left'},
                
          {
            type: 'localeDropdown',
            position: 'right',
            position: 'right',
          },

          {
            href: 'https://github.com/bilelsgh/',
            position: 'right',
            label: 'GitHub',
            'aria-label': 'Profil GitHub',
            target: '_blank',
          },
          {
            href: 'https://linkedin.com/in/bilel-saghrouchni/',
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
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'X',
          //       href: 'https://x.com/docusaurus',
          //     },
          //   ],
          // },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/bilelsgh',
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/bilel-saghrouchni/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Bilel Saghrouchni. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
