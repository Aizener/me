import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import Headbar from './headbar';

function Header() {
  return (
    <div className="bg-background/80 fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b px-32 backdrop-blur-sm">
      <Link href="/home" prefetch={false}>
        <Button variant="ghost" className="flex cursor-pointer items-center">
          <ArrowLeft />
          <span>回到首页</span>
        </Button>
      </Link>
      <div className="flex items-center gap-x-2">
        <Headbar />
        {/* <Separator orientation="vertical" className="w-0.5 h-6 bg-gray-300 mr-4" /> */}
        {/* <User /> */}
      </div>
    </div>
  );
}

export default Header;
