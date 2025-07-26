import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

const poppins = Poppins({
  subsets: ['latin'],
  weight: [
    '400',
    '500',
    '600',
    '700'
  ],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Todo App • Minhas Tarefas',
}

export default function TasksLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className={`${poppins.variable} min-h-screen flex flex-col bg-gray-100`}>
      {/* HEADER FIXO */}
      <header className='bg-white shadow-md py-4 px-6 flex justify-between items-center'>
        <Link
          href='/'
          className='text-1xl text-gray-600 hover:text-indigo-500 transition'
        >
          ← Voltar para Home
        </Link>
      </header>

      {/* MAIN AJUSTA A ALTURA CORRETAMENTE */}
      <main className='flex-grow flex items-center justify-center'>
        {children}
      </main>
    </section>
  );
}
