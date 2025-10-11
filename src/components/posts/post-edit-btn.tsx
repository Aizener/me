'use client';

import { Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { UserRole } from '@/lib/enum';

import { Button } from '../ui/button';

function PostEditBtn({ id }: { id: string }) {
  const { data } = useSession();
  return (
    <>
      {data?.user?.role === UserRole.ADMIN && (
        <Link href={`/admin/posts/create?id=${id}`}>
          <Button variant="outline" className="cursor-pointer">
            <span>编辑</span>
            <Edit />
          </Button>
        </Link>
      )}
    </>
  );
}

export default PostEditBtn;
