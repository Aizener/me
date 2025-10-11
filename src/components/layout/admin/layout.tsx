import { ReactNode } from 'react';

import Header from './header';

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full pt-18">
      <Header />
      <div className="mx-auto mt-4 flex w-full gap-x-4 lg:w-4xl">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
