import { ReactNode } from 'react';

import CanvasNest from '@/components/canvas-nest';

import Providers from '../../providers';
import Footer from './footer';
import Header from './header';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="mx-auto flex min-h-dvh w-full flex-col md:w-3xl lg:w-4xl">
        <Header />
        <main className="relative mt-4 flex-1">{children}</main>
        <Footer />
        <CanvasNest />
      </div>
    </Providers>
  );
}

export default MainLayout;
