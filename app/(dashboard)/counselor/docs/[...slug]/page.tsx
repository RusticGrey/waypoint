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
    <article className="prose prose-blue max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
