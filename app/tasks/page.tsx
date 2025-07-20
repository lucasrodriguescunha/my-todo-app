import prisma from '@/lib/prisma';

export default async function Tasks() {
  const tasks = await prisma.task.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16'>
      <h1 className='text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]'>
        Tarefas
      </h1>
      <ul className='font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4'>
        {tasks.map((task) => (
          <li key={task.id}>
            <span className='font-semibold'>{task.title}</span>
            <span className='text-sm text-gray-600 ml-2'>by {task.user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}