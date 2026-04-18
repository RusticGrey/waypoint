import { getDocContent } from '@/lib/docs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function DocsPage() {
  // Explicitly call with empty array to trigger root README lookup
  const content = await getDocContent([]);

  if (!content) {
    return (
      <div className="py-24 text-center">
        <span className="text-4xl block mb-4">📚</span>
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Introduction Not Found</h1>
        <p className="mt-2 text-slate-500 font-medium text-sm">Please select a topic from the sidebar to get started.</p>
      </div>
    );
  }

  return (
    <article className="prose prose-slate prose-brand max-w-none prose-headings:text-slate-900 prose-a:text-brand-600 prose-strong:text-slate-900 prose-code:text-brand-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
