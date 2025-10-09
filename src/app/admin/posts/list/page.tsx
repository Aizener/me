'use client';

import { useQuery } from '@tanstack/react-query';

import Loading from '@/components/loading';
import Page from '@/components/pagination';
import PostCard from '@/components/posts/post-card';
import { queryPostsList } from '@/lib/api/posts';

function PostsListPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: queryPostsList
  });
  return (
    <div>
      { isPending && <Loading /> }
      {
        !isPending && !isError && (
          <>
            <div className="flex flex-col gap-y-4">
              {
                data.data[0]?.map(item => (
                  <PostCard key={item.title} post={item} url={`/admin/posts/${item.id}`}  />
                ))
              }
            </div>
            <div className="w-full mt-4 flex justify-end">
              {
                data.data[1] > 10 && (
                  <Page
                    total={data.data[1]}
                    size={10}
                  />
                )
              }
            </div>
          </>
        )
      }
    </div>
  );
}

export default PostsListPage;