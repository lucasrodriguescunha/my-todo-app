import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import PrimeSSRProvider from '@/prime-ssr-provider';
import Providers from './components/Providers';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ],
});

export const metadata: Metadata = {
  title: 'Login - Todo App',
  description: 'Faça login no seu Todo App',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body className={`${poppins.variable} antialiased`}>
        <PrimeSSRProvider>
          <Providers>
            <main>{children}</main>
          </Providers>
        </PrimeSSRProvider>
      </body>
    </html>
  );
}
