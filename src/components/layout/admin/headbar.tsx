'use client';

import { List, Newspaper, Plus, PodcastIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const menus = [
  {
    title: '文章',
    children: [
      {
        title: '列表',
        icon: List,
        url: '/posts/list',
      },
      {
        title: '创建',
        icon: Plus,
        url: '/posts/create',
      },
    ],
  },
  {
    title: '网站信息',
    children: [
      {
        title: '内容设置',
        icon: List,
        url: '/settings',
      },
    ],
  },
];

function Headbar() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="gap-x-0">
        {menus.map((menu) => (
          <NavigationMenuItem key={menu.title}>
            <NavigationMenuTrigger className="px-3">
              <span className="text-foreground/80 font-bold">{menu.title}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {menu.children.map((item) => (
                <NavigationMenuLink key={item.url} asChild>
                  <Button
                    variant="ghost"
                    asChild
                    className="flex flex-row items-center gap-x-2"
                  >
                    <Link href={`/admin/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </Button>
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Headbar;
