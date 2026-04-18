import { getDocContent } from '@/lib/docs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function DocsPage() {
  const content = await getDocContent(['README']);

  if (!content) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Documentation Not Found</h1>
        <p className="mt-2 text-gray-600">Please select a topic from the sidebar.</p>
      </div>
    );
  }

  return (
    <article className="prose prose-blue max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
