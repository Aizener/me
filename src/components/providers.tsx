import { ReactNode } from 'react';

import SessionProvider from './auth/session-provider';
import QueryProvider from './query-provider';
import { ThemeProvider } from './theme-provider';

function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryProvider>
    </SessionProvider>
  );
}

export default Providers;
