import fs from 'fs';
import path from 'path';

const DOCS_DIRECTORY = path.join(process.cwd(), 'docs');

export interface DocNavItem {
  title: string;
  slug: string;
  href: string;
  children?: DocNavItem[];
}

export function getDocNavTree(dir: string = DOCS_DIRECTORY): DocNavItem[] {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const navItems: DocNavItem[] = [];

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(DOCS_DIRECTORY, fullPath);
    
    // Ignore hidden files and directories
    if (item.name.startsWith('.')) continue;

    if (item.isDirectory()) {
      const children = getDocNavTree(fullPath);
      if (children.length > 0) {
        navItems.push({
          title: formatTitle(item.name),
          slug: relativePath,
          href: `/counselor/docs/${relativePath}`,
          children: children.sort((a, b) => a.title.localeCompare(b.title)),
        });
      }
    } else if (item.name.endsWith('.md')) {
      const slug = relativePath.replace(/\.md$/, '');
      navItems.push({
        title: formatTitle(item.name.replace(/\.md$/, '')),
        slug: slug,
        href: `/counselor/docs/${slug}`,
      });
    }
  }

  return navItems.sort((a, b) => {
    // Put README at the top
    if (a.slug === 'README') return -1;
    if (b.slug === 'README') return 1;
    return a.title.localeCompare(b.title);
  });
}

export async function getDocContent(slug: string[]) {
  try {
    const fullPath = path.join(DOCS_DIRECTORY, ...slug) + '.md';
    if (!fs.existsSync(fullPath)) {
      // Try as index if it's a directory
      const indexPath = path.join(DOCS_DIRECTORY, ...slug, 'README.md');
      if (fs.existsSync(indexPath)) {
        return fs.readFileSync(indexPath, 'utf8');
      }
      return null;
    }
    return fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error('Error reading doc content:', error);
    return null;
  }
}

function formatTitle(str: string): string {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
