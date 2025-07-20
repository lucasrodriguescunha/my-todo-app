import prisma from '@/lib/prisma';

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-xl bg-white shadow-lg rounded-xl p-8 text-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>My Todo App</h1>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>Fazer login com:</h1>
        <ol className='list-decimal list-inside text-gray-700 space-y-2'>
          {users.map((user) => (
            <li key={user.id} className='hover:text-indigo-500 transition'>
              {user.name}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
