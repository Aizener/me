import dayjs from 'dayjs';
import { ChevronRightIcon } from 'lucide-react';
import { Session } from 'next-auth';
import Link from 'next/link';

import { QueryPostType } from '@/lib/api/posts';
import { UserRole } from '@/lib/enum';

import { Button } from '../ui/button';
import PostEditBtn from './post-edit-btn';

function PostCard({
  post,
  url,
  user,
}: {
  post: QueryPostType;
  url: string;
  user?: Session['user'];
}) {
  return (
    <div className="border-background-200 bg-background/50 rounded-sm border p-4 shadow">
      <h1 className="text-lg font-bold">{post.title}</h1>
      <div className="text-foreground/60 mt-2 flex justify-between gap-x-2 text-sm">
        <span>发布者：{post.author.name || post.author.email}</span>
        <span>
          发布时间：{dayjs(post.createdAt).format('YYYY/MM/DD HH:mm')}
        </span>
      </div>
      <div className="text-foreground/70 mt-2 text-sm">
        {post.content.slice(0, 200)}...
      </div>
      <div className="border-background-200 mt-4 flex justify-between border-t pt-4">
        <div className="text-foreground/80 flex items-center text-sm">
          {user?.role === UserRole.ADMIN &&
            (post.published ? (
              <span className="text-sm font-bold text-green-500 dark:text-green-800">
                已公开
              </span>
            ) : (
              <span className="text-sm font-bold text-gray-300">未公开</span>
            ))}
          {/* <div className="flex items-center gap-x-1">
            <Button variant={'ghost'} className="cursor-pointer">
              <Heart />
              <span>1</span>
            </Button>
          </div>
          <div className="flex items-center gap-x-1">
            <Button variant={'ghost'} className="cursor-pointer">
              <MessageCircle />
              <span>2</span>
            </Button>
          </div> */}
        </div>

        <div className="flex items-center gap-x-2">
          <PostEditBtn id={post.id} />
          <Link href={url}>
            <Button variant="outline" className="cursor-pointer">
              <span>详细</span>
              <ChevronRightIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
