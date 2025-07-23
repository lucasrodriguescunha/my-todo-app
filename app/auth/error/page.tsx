'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  console.log('🚨 Auth Error Page:', {
    error,
    searchParams: Object.fromEntries(searchParams.entries()),
    timestamp: new Date().toISOString()
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erro de Autenticação</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Tipo de Erro:</h2>
            <p className="text-gray-700">{error || 'Desconhecido'}</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold">Detalhes:</h2>
            <div className="bg-gray-100 p-3 rounded text-sm">
              <pre>{JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}</pre>
            </div>
          </div>
          
          <div className="pt-4">
            <Link 
              href="/"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block text-center"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
