'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import UserProfile from '@/components/auth/user-profile';

import HeaderNavs from './header-nav';

const ThemeButton = dynamic(() => import('@/components/theme-button'), { ssr: false });

function Header() {
  return (
    <header className="w-full sticky z-30 top-0 mt-4 flex justify-between items-center border px-4 py-2 rounded-md shadow bg-background/50 backdrop-blur-xs">
      <div className="flex items-center gap-x-2">
        {/* <Image src="/next.svg" alt="logo" width={64} height={32} />       */}
        <Link href="/home">
          <span className="text-md font-mono font-bold tracking-[-1px] text-shadow-2xs text-shadow-foreground/50 cursor-pointer hover:underline sm:text-lg">
            I&apos;am Cooola
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <HeaderNavs />
        <div className="w-[1px] h-6 bg-gray-300"></div>
        <div className="flex items-center gap-x-2">
          <UserProfile />
        </div>
        <ThemeButton />
      </div>
    </header>
  );
}

export default Header;