import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './lib/prisma';

import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

// Log das variáveis de ambiente na inicialização
console.log('🚀 NextAuth Inicializando:', {
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  hasGitHubId: !!process.env.AUTH_GITHUB_ID,
  hasGitHubSecret: !!process.env.AUTH_GITHUB_SECRET,
  hasGoogleId: !!process.env.AUTH_GOOGLE_ID,
  hasGoogleSecret: !!process.env.AUTH_GOOGLE_SECRET,
  hasAuthSecret: !!process.env.AUTH_SECRET,
  timestamp: new Date().toISOString()
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(prisma), // Temporariamente desabilitado para debug
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
    async signIn({ user, account, profile, email, credentials }) {
      console.log('🔐 SignIn Callback Chamado:', {
        provider: account?.provider,
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name,
        accountType: account?.type,
        accountProviderAccountId: account?.providerAccountId,
        profileId: profile?.id,
        timestamp: new Date().toISOString()
      });
      
      try {
        // Log detalhado antes de tentar conectar com Prisma
        console.log('🗄️ Testando conexão com Prisma...', {
          databaseUrl: process.env.DATABASE_URL ? 'definida' : 'undefined',
          timestamp: new Date().toISOString()
        });
        
        // Teste de conexão com o banco (sem await para não bloquear)
        const testConnection = prisma.$connect().then(() => {
          console.log('✅ Prisma conectado com sucesso');
        }).catch((error) => {
          console.error('❌ Erro na conexão Prisma:', error);
        });
        
        return true;
      } catch (error) {
        console.error('❌ Erro geral no signIn callback:', error);
        return true; // Retorna true mesmo com erro para não bloquear o login JWT
      }
    },
    async jwt({ token, user, account, profile, session }) {
      console.log('🎫 JWT Callback Chamado:', {
        hasUser: !!user,
        hasAccount: !!account,
        provider: account?.provider,
        tokenSub: token?.sub,
        tokenEmail: token?.email,
        userEmail: user?.email,
        timestamp: new Date().toISOString()
      });
      
      if (user) {
        token.id = user.id;
      }
      
      return token;
    },
    async session({ session, token }) {
      console.log('📱 Session Callback Chamado:', {
        sessionUserId: session?.user?.id,
        sessionUserEmail: session?.user?.email,
        sessionUserName: session?.user?.name,
        tokenSub: token?.sub,
        tokenId: token?.id,
        tokenEmail: token?.email,
        timestamp: new Date().toISOString()
      });
      
      // Inclui o userId no session
      if (token.sub) session.user.id = token.sub;
      if (token.id && typeof token.id === 'string') session.user.id = token.id;
      
      return session;
    },
  },
  pages: {
    error: '/auth/error', // Página customizada de erro
  },
  debug: true, // Debug sempre ativo
  logger: {
    error(error: Error) {
      console.error('🔴 NextAuth Error:', { 
        name: error.name,
        message: error.message, 
        stack: error.stack, 
        timestamp: new Date().toISOString() 
      });
    },
    warn(code: string) {
      console.warn('🟡 NextAuth Warning:', { code, timestamp: new Date().toISOString() });
    },
    debug(code: string, metadata?: any) {
      console.log('🔍 NextAuth Debug:', { code, metadata, timestamp: new Date().toISOString() });
    },
  },
  trustHost: true, // Importante para produção
});

