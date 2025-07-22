import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './lib/prisma';

import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt', // melhor para serverless
  },
  callbacks: {
    async session({ session, token }) {
      // Inclui o userId no session
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
  trustHost: true, // Importante para produção
});

