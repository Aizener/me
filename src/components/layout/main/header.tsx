'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import UserProfile from '@/components/auth/user-profile';

import HeaderNavs from './header-nav';

const ThemeButton = dynamic(() => import('@/components/theme-button'), {
  ssr: false,
});

function Header() {
  return (
    <header className="bg-background/50 sticky top-0 z-30 mt-4 flex w-full items-center justify-between rounded-md border px-4 py-2 shadow backdrop-blur-xs">
      <div className="flex items-center gap-x-2">
        {/* <Image src="/next.svg" alt="logo" width={64} height={32} />       */}
        <Link href="/home">
          <span className="text-md text-shadow-foreground/50 cursor-pointer font-mono font-bold tracking-[-1px] text-shadow-2xs hover:underline sm:text-lg">
            I&apos;am Cooola
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <HeaderNavs />
        <div className="h-6 w-[1px] bg-gray-300"></div>
        <div className="flex items-center gap-x-2">
          <UserProfile />
        </div>
        <ThemeButton />
      </div>
    </header>
  );
}

export default Header;
