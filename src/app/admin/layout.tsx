import { ReactNode } from 'react';

import AdminLayout from '@/components/layout/admin/layout';

function Layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

export default Layout;
