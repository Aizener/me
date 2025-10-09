export default function middleware() {
  console.log('req.nextauth.token');
}

export const config = {
  matcher: ['/', '/posts'],
};
