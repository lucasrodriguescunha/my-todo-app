import prisma from '@/lib/prisma';

export default async function Tasks() {
  const tasks = await prisma.task.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-10'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-10'>
        Minhas tarefas
      </h1>

      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition'
          >
            <h2 className='text-xl font-bold text-gray-800 mb-2'>
              {task.title}
            </h2>

            <p className='text-gray-600 text-sm mb-4'>
              {task.description ? task.description : 'Sem descrição'}
            </p>

            <p className='text-gray-600 text-sm'>
              Status:{' '}
              <span
                className={`font-medium ${task.completed ? 'text-green-600' : 'text-yellow-600'
                  }`}
              >
                {task.completed ? 'Finalizada' : 'Pendente'}
              </span>
            </p>

            <p className='text-xs text-gray-500 mt-1'>
              Criada por {task.user.name}
            </p>

            <div className='flex justify-between mt-4'>
              <a
                href={`/tasks/${task.id}`}
                className='text-indigo-500 text-sm font-medium hover:underline'
              >
                Ver detalhes
              </a>
              <a
                href={`/tasks/${task.id}/edit`}
                className='text-yellow-500 text-sm font-medium hover:underline'
              >
                Editar
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
