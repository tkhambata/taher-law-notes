import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      components: {
        MarkdownContent: './src/components/ContentWithMedia.astro',
      },
      title: "Taher's Law Notes",
      sidebar: [
        { label: 'Home', link: '/' },
        {
          label: 'Contract Law',
          items: [{ autogenerate: { directory: 'contract' } }],
        },
        {
          label: 'Tort Law',
          items: [{ autogenerate: { directory: 'tort' } }],
        },
        {
          label: 'Public Law',
          items: [{ autogenerate: { directory: 'public' } }],
        },
        {
          label: 'Criminal Law',
          items: [{ autogenerate: { directory: 'criminal' } }],
        },
        {
          label: 'Trusts',
          items: [{ autogenerate: { directory: 'trusts' } }],
        },
        {
          label: 'Land Law',
          items: [{ autogenerate: { directory: 'land' } }],
        },
      ],
    }),
  ],
});