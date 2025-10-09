'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { UserRole } from '@/lib/enum';

import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import SignInButton from './sign-in-button';

function UserProfile() {
  const { data, status } = useSession();
  return (
    <div className="ml-2">
      {status === 'loading' && <Skeleton className="h-12 w-12 rounded-full" />}
      {status === 'unauthenticated' && <SignInButton />}
      {status === 'authenticated' && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="size-8">
              <AvatarImage src="https://img2.baidu.com/it/u=2889559798,3207819863&fm=253&fmt=auto&app=138&f=JPEG?w=514&h=500" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {
              data.user.role === UserRole.ADMIN && (
                <DropdownMenuItem>
                  <Link href="/admin">
                    <Button variant="ghost">后台管理</Button>
                  </Link>
                </DropdownMenuItem>
              )
            }
            <DropdownMenuItem>
              <Button variant="ghost" onClick={() => signOut({
                callbackUrl: '/'
              })}>退出登录</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

export default UserProfile;