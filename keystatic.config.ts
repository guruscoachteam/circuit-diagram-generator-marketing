import { config, fields, collection } from '@keystatic/core';

const isProd = process.env.NODE_ENV === 'production';
const repoOwner = process.env.GITHUB_REPO_OWNER ?? 'guruscoachteam';
const repoName = process.env.GITHUB_REPO_NAME ?? 'circuit-diagram-generator-marketing';

export default config({
  storage: isProd
    ? {
        kind: 'github',
        repo: `${repoOwner}/${repoName}`,
      }
    : {
        kind: 'local',
      },
  collections: {
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          description: 'Short summary for SEO and blog cards',
          multiline: true,
        }),
        pubDate: fields.date({
          label: 'Publish date',
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: 'Updated date',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Hide this post from the public blog until ready',
          defaultValue: false,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        heroImage: fields.image({
          label: 'Hero image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),
  },
});
