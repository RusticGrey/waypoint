import Link from 'next/link';
import { getDocNavTree, DocNavItem } from '@/lib/docs';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navTree = getDocNavTree();

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
              Documentation
            </h2>
          </div>
          {navTree.map((item) => (
            <NavItem key={item.slug} item={item} />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ item, depth = 0 }: { item: DocNavItem; depth?: number }) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="space-y-1">
      <Link
        href={item.href}
        className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          depth === 0 ? 'text-gray-900 hover:bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        style={{ paddingLeft: `${(depth + 1) * 0.75}rem` }}
      >
        {item.title}
      </Link>
      {hasChildren && (
        <div className="ml-1 space-y-1">
          {item.children!.map((child) => (
            <NavItem key={child.slug} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
