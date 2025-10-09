import { getServerSession } from 'next-auth';

import Empty from '@/components/empty';
import Page from '@/components/pagination';
import PostCard from '@/components/posts/post-card';
import { queryPublicPostsList } from '@/lib/api/posts';
import { authOptions } from '@/lib/auth';

async function BlogPage() {
  const session = await getServerSession(authOptions);
  const data = await queryPublicPostsList();

  const [posts, total] = data.data;

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        {
          posts.length > 0 ? posts.map(item => (
            <PostCard
              key={item.title}
              post={item}
              url={`/posts/${item.id}`}
              user={session?.user}
            />
          )) : (
            <Empty />
          )
        }
      </div>
      <div className="w-full mt-4 flex justify-end">
        {
          total > 10 && (
            <Page
              total={total}
              size={10}
            />
          )
        }
      </div>
    </div>
  );
}

export default BlogPage;