'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

const highStyle = atomDark;

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        [remarkToc, { heading: '目录', maxDepth: 2, prefix: 'post-title-' }],
      ]}
      rehypePlugins={[
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'before' }],
      ]}
      components={{
        h1: ({ id, children }) => (
          <h1
            id={`post-title-${id}`}
            className="my-8 border-b border-gray-500 pb-3 text-3xl font-bold"
          >
            {children}
          </h1>
        ),
        h2: ({ id, children }) => (
          <h2
            id={`post-title-${id}`}
            className="my-6 border-b border-gray-400 pb-2 text-2xl font-semibold"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 text-xl font-semibold">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        ul: ({ children }) => (
          <ul className="mb-4 list-inside list-disc space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-inside list-decimal space-y-1">
            {children}
          </ol>
        ),
        table: ({ children }) => <table className="text-sm">{children}</table>,
        th: ({ children }) => (
          <th className="border border-gray-500 p-2">{children}</th>
        ),
        tr: ({ children }) => (
          <tr className="border border-gray-500">{children}</tr>
        ),
        td: ({ children }) => (
          <td className="border border-gray-500 p-2">{children}</td>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mb-4 border-l-4 border-gray-300 bg-gray-100 pt-4 pr-2 pb-0.5 pl-4 italic">
            {children}
          </blockquote>
        ),
        a(param) {
          const { href, children } = param;
          if (href?.includes('post-title')) {
            return (
              <a href={href} className="text-blue-500 underline">
                {children}
              </a>
            );
          }
          return <a href={href}>{children}</a>;
        },
        code(param) {
          const { className, children, ...props } = param;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              // @ts-expect-error
              style={highStyle}
              showLineNumbers={true}
              showInlineLineNumbers={true}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className={`${className} mx-1 rounded-sm bg-gray-300 px-1 text-black/80`}
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="my-2 rounded-md border border-gray-300 px-2 py-0.5 shadow">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;
