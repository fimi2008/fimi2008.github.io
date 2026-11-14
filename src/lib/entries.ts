import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'entries'>;
export const seriesLabels = { skills: 'Skills', weekly: '前沿技术' } as const;

export const trainingLabels = {
  strength: '撸铁日记',
  running: '长跑',
  cycling: '公路车',
  hiking: '徒步',
} as const;

export function entryPath({ data }: Entry) {
  return data.kind === 'ai' ? `/ai/${data.series}/${data.issue}/` : data.path;
}

export function entryLabel({ data }: Entry) {
  if (data.kind === 'ai') return seriesLabels[data.series];
  if (data.kind === 'training') return trainingLabels[data.activity];
  return data.kind === 'note' ? '日常小记' : '技术文章';
}

export async function getEntries() {
  const entries = await getCollection('entries');
  const paths = new Set();
  for (const entry of entries) {
    const path = entryPath(entry);
    if (paths.has(path)) throw new Error(`Duplicate entry URL: ${path}`);
    paths.add(path);
    if (entry.data.kind === 'note' && !/^\/notes\/[a-z\d-]+\/$/.test(path)) {
      throw new Error(`Notes must use /notes/<slug>/: ${path}`);
    }
    if (entry.data.kind === 'training' && !/^\/training\/[a-z\d-]+\/$/.test(path)) {
      throw new Error(`Training entries must use /training/<slug>/: ${path}`);
    }
    if (entry.data.kind === 'article' && !/^\/(?:articles\/[a-z\d-]+|\d{4}\/\d{2}\/\d{2}\/[^/]+)\/$/.test(path)) {
      throw new Error(`Invalid article URL: ${path}`);
    }
    if (entry.data.kind === 'ai') {
      const { series, issue, period, date } = entry.data;
      if (entry.id !== `${series}-${issue}` || period.start > period.end || issue !== period.end || date < issue) {
        throw new Error(`Invalid AI issue metadata: ${entry.id}`);
      }
    }
  }
  return entries.filter(({ data }) => !data.draft).sort((a, b) =>
    b.data.date.localeCompare(a.data.date) || entryPath(a).localeCompare(entryPath(b)),
  );
}
