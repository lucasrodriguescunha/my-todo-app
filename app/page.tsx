'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const { data: session } = useSession();

  // ✅ Se o usuário está logado → tela de boas-vindas
  if (session?.user) {
    return (
      <div className='bg-gray-50 flex items-center justify-center min-h-screen'>
        <div className='w-full max-w-xl bg-white shadow-lg rounded-xl p-6'>
          <p className='text-gray-600 mb-6 text-center'>
            Você está conectado e pronto para visualizar suas tarefas.
          </p>

          {/* Avatar e informações do usuário */}
          <div className='text-center mb-6'>
            <Image
              src={session.user.image || '/placeholder-avatar.png'}
              alt='Avatar'
              width={80}
              height={80}
              className='rounded-full mx-auto mb-3 ring-4 ring-indigo-100 shadow-md'
            />
            <p className='text-lg font-semibold text-gray-800'>
              {session.user.name}
            </p>
            <p className='text-gray-600 text-sm'>{session.user.email}</p>
          </div>

          {/* Botões */}
          <div className='space-y-4'>
            <Link
              href='/tasks'
              className='w-full block bg-indigo-500 text-white py-3 rounded-lg font-medium text-center hover:bg-indigo-600 transition shadow-md hover:shadow-lg cursor-pointer'
            >
              Visualizar tarefas
            </Link>

            <button
              onClick={() => signOut()}
              className='w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition shadow-sm cursor-pointer'
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Caso NÃO esteja logado → tela de login
  return (
    <div className='bg-gray-50 flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-xl bg-white shadow-lg rounded-xl p-6'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2 text-center'>
          Fazer Login
        </h1>
        <p className='text-gray-600 mb-6 text-center'>
          Escolha uma forma de acessar sua conta
        </p>

        {/* Botões de login */}
        <div className='flex flex-col items-center justify-center space-y-4'>
          <button
            onClick={() => signIn('github')}
            className='w-full flex items-center justify-center gap-3 h-12 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50 transition cursor-pointer'
          >
            <i className='pi pi-github text-lg'></i>
            Continuar com GitHub
          </button>

          <button
            onClick={() => signIn('google')}
            className='w-full flex items-center justify-center gap-3 h-12 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50 transition cursor-pointer'
          >
            <i className='pi pi-google text-lg'></i>
            Continuar com Google
          </button>
        </div>

        {/* Termos de uso */}
        <div className='mt-6 text-center'>
          <p className='text-xs text-gray-500'>
            Ao fazer login, você concorda com nossos termos de uso
          </p>
        </div>
      </div>
    </div>
  );
}
