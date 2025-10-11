import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log('req.nextauth.token', req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log(
          '%c [ token ]-11',
          'font-size:13px; background:skyblue; color:#bf2c9f;',
          token
        );
        return token?.role === 'ADMIN';
      },
    },
  }
);

export const config = { matcher: ['/admin/:path*'] };
