import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import Headbar from './headbar';

function Header() {
  return (
    <div className="w-full fixed left-0 top-0 h-16 border-b px-32 flex justify-between items-center bg-background/80 backdrop-blur-sm z-50">
      <Link href="/home" prefetch={false}>
        <Button variant="ghost" className="flex items-center cursor-pointer">
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