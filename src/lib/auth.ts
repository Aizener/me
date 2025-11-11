import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { userLogin } from './api/user';
import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: '用户名', type: 'text', placeholder: 'Cola...' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('credentials', credentials);
          const { username, password } = credentials as {
            username: string;
            password: string;
          };
          const res = await userLogin({ username, password });
          const user = res.data;
          console.log('res', res);

          if (res.success && user) {
            return user;
          }
          return null;
        } catch (err: unknown) {
          console.log('Credentials auth err:', err);
          return null;
        }
      },
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        const u = user as User & { role: 'ADMIN' | 'USER' };
        token.id = u.id;
        token.role = u.role;
        token.email = u.email;
        token.name = u.name;
      }
      return token;
    },

    async session({ session, token }) {
      // console.log('%c [ { session, token } ]-39', 'font-size:13px; background:skyblue; color:#bf2c9f;', { session, token });
      if (session.user && token?.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
