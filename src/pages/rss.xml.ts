import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { entryPath, getEntries } from '../lib/entries';

export async function GET({ site }: APIContext) {
  if (!site) throw new Error('The site URL is required for RSS.');
  return rss({
    title: 'Lionxxw 的个人博客',
    description: '技术文章、日常小记、训练手记与 AI 观察',
    site,
    customData: '<language>zh-CN</language>',
    items: (await getEntries()).map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: new Date(`${entry.data.date}T00:00:00+08:00`),
      link: entryPath(entry),
    })),
  });
}
