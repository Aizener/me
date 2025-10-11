import { ReactNode } from 'react';

import Header from './header';

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full pt-18">
      <Header />
      <div className="flex w-full lg:w-4xl mx-auto mt-4 gap-x-4">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
