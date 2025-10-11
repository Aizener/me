'use client';

import { useQuery } from '@tanstack/react-query';
import { use } from 'react';

import Loading from '@/components/loading';
import PostDetail from '@/components/posts/post-detail';
import { queryPostDetail } from '@/lib/api/posts';

function PostsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = use(params).id;
  const { data, isPending, isError } = useQuery({
    queryKey: ['postsDetail', id],
    queryFn: () => queryPostDetail(id),
  });
  return (
    <div>
      {isPending && <Loading />}
      {isError && data?.message}
      {!isPending && !isError && <PostDetail post={data.data} />}
    </div>
  );
}

export default PostsDetailPage;
