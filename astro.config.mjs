import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';

function preserveLegacyAnchors() {
  return (tree, file) => {
    const anchors = file.data.astro?.frontmatter?.legacyAnchors;
    if (!anchors) return;
    let position = 0;
    visit(tree, 'element', (node) => {
      if (!/^h[2-6]$/.test(node.tagName)) return;
      const id = anchors[position++];
      if (id) node.properties.id = id;
    });
    if (position !== anchors.length) throw new Error(`Legacy headings changed in ${file.path}`);
  };
}

export default defineConfig({
  site: 'https://fimi2008.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: { processor: unified({ rehypePlugins: [preserveLegacyAnchors] }) },
});
