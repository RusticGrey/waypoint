import { getDocContent } from '@/lib/docs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';

export default async function DynamicDocPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const content = await getDocContent(params.slug);

  if (!content) {
    notFound();
  }

  return (
    <article className="prose prose-slate prose-brand max-w-none prose-headings:text-slate-900 prose-a:text-brand-600 prose-strong:text-slate-900 prose-code:text-brand-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
