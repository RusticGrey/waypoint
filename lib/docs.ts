import fs from 'fs';
import path from 'path';

// Use process.cwd() to get the root directory of the project
const DOCS_DIRECTORY = path.join(process.cwd(), 'docs');

export interface DocNavItem {
  title: string;
  slug: string;
  href: string;
  children?: DocNavItem[];
}

export function getDocNavTree(dir: string = DOCS_DIRECTORY): DocNavItem[] {
  if (!fs.existsSync(dir)) return [];
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const navItems: DocNavItem[] = [];

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(DOCS_DIRECTORY, fullPath);
    
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
    } else if (item.name.toLowerCase().endsWith('.md')) {
      const slug = relativePath.replace(/\.md$/i, '');
      navItems.push({
        title: formatTitle(item.name.replace(/\.md$/i, '')),
        slug: slug,
        href: `/counselor/docs/${slug}`,
      });
    }
  }

  return navItems.sort((a, b) => {
    if (a.slug.toLowerCase() === 'readme') return -1;
    if (b.slug.toLowerCase() === 'readme') return 1;
    return a.title.localeCompare(b.title);
  });
}

export async function getDocContent(slug: string[]) {
  try {
    // Ensure we are working with an array and filter out empty strings
    const pathParts = slug.filter(p => p && p.trim() !== '');
    
    // If slug is empty or just ['README'], try the root README.md directly
    if (pathParts.length === 0 || (pathParts.length === 1 && pathParts[0].toUpperCase() === 'README')) {
       const rootReadmePath = path.join(DOCS_DIRECTORY, 'README.md');
       if (fs.existsSync(rootReadmePath)) {
         return fs.readFileSync(rootReadmePath, 'utf8');
       }
    }

    // 1. Try exact path with .md
    let fullPath = path.join(DOCS_DIRECTORY, ...pathParts) + '.md';
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, 'utf8');
    }

    // 2. Try as a directory with index
    let dirPath = path.join(DOCS_DIRECTORY, ...pathParts);
    if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
      const indexNames = ['README.md', 'readme.md', 'index.md'];
      for (const name of indexNames) {
        const indexPath = path.join(dirPath, name);
        if (fs.existsSync(indexPath)) return fs.readFileSync(indexPath, 'utf8');
      }
    }

    // 3. Case-insensitive fallback
    const fileName = pathParts[pathParts.length - 1];
    const parentDir = path.join(DOCS_DIRECTORY, ...pathParts.slice(0, -1));
    
    if (fs.existsSync(parentDir)) {
      const files = fs.readdirSync(parentDir);
      const match = files.find(f => f.toLowerCase() === `${fileName.toLowerCase()}.md`);
      if (match) {
        return fs.readFileSync(path.join(parentDir, match), 'utf8');
      }
    }

    return null;
  } catch (error) {
    console.error('Error reading doc content:', error);
    return null;
  }
}

function formatTitle(str: string): string {
  if (str.toLowerCase() === 'readme') return 'Introduction';
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
