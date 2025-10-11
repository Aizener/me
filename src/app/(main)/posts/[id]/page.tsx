import { Suspense } from 'react';

import Loading from '@/components/loading';

import PostDetailContent from '../_components/post-detail';

async function PostsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <PostDetailContent id={id} />
      </Suspense>
    </div>
  );
}

export default PostsDetailPage;
