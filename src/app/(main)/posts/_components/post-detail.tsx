import PostDetail from '@/components/posts/post-detail';
import { queryPostDetail } from '@/lib/api/posts';

async function PostDetailContent({ id }: { id: string }) {
  const data = await queryPostDetail(id);

  return (
    <div>
      <PostDetail post={data.data} />
    </div>
  );
}

export default PostDetailContent;
