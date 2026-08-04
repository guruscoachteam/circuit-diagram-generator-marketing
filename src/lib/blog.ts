import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/**
 * Public posts, newest first.
 *
 * Drafts are visible in `astro dev` and hidden in every build, so a draft can
 * be reviewed at its real URL before going live but can never reach the
 * deployed site. `import.meta.env.DEV` is true only under the dev server.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts
    .filter((post) => import.meta.env.DEV || !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatPostDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function postPath(post: Post): string {
  return `/blog/${post.id}/`;
}
