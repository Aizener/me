import { ReactNode } from 'react';

import MainLayout from '@/components/layout/main/layout';

function Layout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}

export default Layout;