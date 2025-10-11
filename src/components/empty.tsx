'use client';

import { Home, Rainbow, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

function Empty() {
  const router = useRouter();
  const refresh = () => {
    router.refresh();
  };
  return (
    <div className="flex size-full flex-col items-center justify-center rounded-md border border-gray-200 p-8 shadow">
      <Rainbow size={80} className="text-foreground/80" />
      <span className="text-foreground/80 font-bold">没有更多内容了</span>
      <div className="flex gap-x-4 p-4">
        <Link href="/">
          <Button variant="outline" className="cursor-pointer">
            <Home />
            <span>返回首页</span>
          </Button>
        </Link>
        <Button variant="primary" className="cursor-pointer" onClick={refresh}>
          <RefreshCcw />
          <span>重新刷新</span>
        </Button>
      </div>
    </div>
  );
}

export default Empty;
