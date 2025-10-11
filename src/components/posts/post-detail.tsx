import dayjs from 'dayjs';

import MarkdownRenderer from '@/components/markdown-renderer';
import { QueryPostType } from '@/lib/api/posts';

function PostDetail({ post }: { post: QueryPostType }) {
  return (
    <div className="w-full p-2 lg:w-4xl lg:p-4 rounded-md shadow border border-background-200">
      <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>
      <div className="flex justify-between items-center border-b my-4 pb-4 text-sm text-foreground/80">
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
