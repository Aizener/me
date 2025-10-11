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
    <nav className="mr-2 flex gap-x-5">
      {navs.map((nav) => (
        <Link
          key={nav.path}
          href={nav.path}
          className={cn(
            'after:bg-foreground/80 after:origin-[center center] relative flex cursor-pointer items-center gap-x-1 text-sm after:absolute after:-bottom-1 after:left-[50%] after:h-0.5 after:w-0 after:-translate-x-[50%] after:transition-all after:duration-300 after:content-[""]',
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
