import { ReactNode } from 'react';

import CanvasNest from '@/components/canvas-nest';

import Providers from '../../providers';
import Footer from './footer';
import Header from './header';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="flex flex-col w-full min-h-dvh md:w-3xl lg:w-4xl mx-auto">
        <Header />
        <main className="mt-4 flex-1 relative">
          {children}
        </main>
        <Footer />
        <CanvasNest />
      </div>
    </Providers>
  );
}

export default MainLayout;