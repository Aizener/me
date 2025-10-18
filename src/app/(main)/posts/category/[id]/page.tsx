import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { queryPostCategory } from '@/lib/api/posts';

import PostList from '../../_components/post-list';

async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await queryPostCategory();
  const categories = [{ id: 'all', name: 'all', title: '全部' }, ...data.data];
  const title = categories.find((item) => item.id === id)?.title || '全部';

  return (
    <div>
      <div className="top-16 mb-2 flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span>分类 -&gt; {title}</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((item) => (
              <Link key={item.id} href={`/posts/category/${item.id}`}>
                <DropdownMenuItem>{item.title}</DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Suspense fallback={<Loading />}>
        <PostList postCategoryId={id === 'all' ? '' : id} />
      </Suspense>
    </div>
  );
}

export default BlogCategoryPage;
