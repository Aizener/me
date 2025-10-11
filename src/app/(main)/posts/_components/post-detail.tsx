import PostDetail from '@/components/posts/post-detail';
import { queryPostDetail } from '@/lib/api/posts';

import PostCatalog from './post-catalog';

async function PostDetailContent({ id }: { id: string }) {
  const data = await queryPostDetail(id);

  return (
    <div>
      <PostDetail post={data.data} />
      {/* <PostCatalog post={data.data} /> */}
    </div>
  );
}

export default PostDetailContent;
