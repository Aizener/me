import dayjs from 'dayjs';

import MarkdownRenderer from '@/components/markdown-renderer';
import { QueryPostType } from '@/lib/api/posts';

function PostDetail({ post }: { post: QueryPostType }) {
  return (
    <div className="border-background-200 w-full rounded-md border p-2 shadow lg:w-4xl lg:p-4">
      <h1 className="text-foreground text-2xl font-bold">{post.title}</h1>
      <div className="text-foreground/80 my-4 flex items-center justify-between border-b pb-4 text-sm">
        <p>作者：{post.author.name || post.author.email}</p>
        <span>
          发布时间：{dayjs(post.createdAt).format('YYYY/MM/DD HH:mm')}
        </span>
      </div>
      <div>
        <MarkdownRenderer content={post.content} />
      </div>
    </div>
  );
}

export default PostDetail;
