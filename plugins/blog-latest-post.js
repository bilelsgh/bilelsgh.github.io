// Étend le plugin blog officiel pour exposer le dernier article en donnée globale
// (lue par la page d'accueil via usePluginData).
const blogPluginExports = require('@docusaurus/plugin-content-blog');

const defaultBlogPlugin = blogPluginExports.default;

async function blogPluginWithLatestPost(...pluginArgs) {
  const blogPlugin = await defaultBlogPlugin(...pluginArgs);

  return {
    ...blogPlugin,
    async contentLoaded(params) {
      const [latest] = params.content.blogPosts;
      params.actions.setGlobalData({
        latestPost: latest
          ? {
              title: latest.metadata.title,
              description: latest.metadata.description,
              permalink: latest.metadata.permalink,
              date: new Date(latest.metadata.date).toISOString(),
              readingTime: latest.metadata.readingTime ?? null,
            }
          : null,
      });
      return blogPlugin.contentLoaded(params);
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginWithLatestPost,
};
