'use client';

import { HomeIcon, LucideProps, Rss } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { cn } from '@/lib/utils';

type NavType = {
  path: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>;
};

const navs: NavType[] = [
  {
    path: '/home',
    title: '首页',
    icon: HomeIcon,
  },
  {
    path: '/posts',
    title: '博客',
    icon: Rss,
  },
  // {
  //   path: '/message',
  //   title: '留言板',
  //   icon: <MessagesSquareIcon />
  // },
  // {
  //   path: '/about',
  //   title: '关于',
  //   icon: <Info />
  // }
];

function HeaderNavs() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-x-5 mr-2">
      {navs.map((nav) => (
        <Link
          key={nav.path}
          href={nav.path}
          className={cn(
            'cursor-pointer flex items-center gap-x-1 text-sm relative after:content-[""] after:h-0.5 after:bg-foreground/80 after:transition-all after:duration-300 after:w-0 after:absolute after:left-[50%] after:-translate-x-[50%] after:-bottom-1 after:origin-[center center]',
            nav.path.includes(pathname) ? 'after:w-full' : ''
          )}
        >
          <nav.icon size={16} />
          <span className="text-foreground/80 font-bold">{nav.title}</span>
        </Link>
      ))}
    </nav>
  );
}

export default HeaderNavs;
