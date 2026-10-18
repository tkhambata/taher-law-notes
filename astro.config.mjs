import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const { subjects } = JSON.parse(
  readFileSync(new URL('./src/data/subjects.json', import.meta.url), 'utf8')
);

if (!Array.isArray(subjects) || subjects.length === 0) {
  throw new Error('Add at least one subject to src/data/subjects.json.');
}
const directories = new Set();
const destinations = new Set();
for (const subject of subjects) {
  for (const key of ['title', 'directory', 'href', 'description']) {
    if (typeof subject[key] !== 'string' || !subject[key].trim()) {
      throw new Error(`Each subject needs a non-empty ${key}.`);
    }
  }
  if (subject.directory.includes('..') || subject.directory.startsWith('/') ||
      subject.directory.includes('\\') || !/^\/[^?#]*\/$/.test(subject.href) ||
      subject.href.startsWith('//')) {
    throw new Error(`Invalid folder or destination for ${subject.title}.`);
  }
  if (directories.has(subject.directory) || destinations.has(subject.href)) {
    throw new Error(`Duplicate subject folder or destination: ${subject.title}.`);
  }
  directories.add(subject.directory);
  destinations.add(subject.href);
}

export default defineConfig({
  integrations: [
    starlight({
      title: "Eh Hoser's Notes",
      description: 'A personal workspace for law notes, authorities and revision.',
      customCss: ['./src/styles/study.css'],
      components: {
        MarkdownContent: './src/components/ContentWithMedia.astro',
      },
      sidebar: [
        { label: 'Home', link: '/' },
        { label: 'Editing help', link: '/editing-guide/' },
        ...subjects.map((subject) => ({
          label: subject.title,
          collapsed: true,
          items: [{ autogenerate: { directory: subject.directory } }],
        })),
      ],
    }),
  ],
});
