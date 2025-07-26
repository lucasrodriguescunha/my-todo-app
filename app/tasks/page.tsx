import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function Tasks() {
  const tasks = await prisma.task.findMany({
    include: {
      user: true,
    },
  })

  return (
    <div className='px-4 py-10'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-10'>
        Minhas tarefas
      </h1>
      <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {tasks.map((task) => {
          const statusLabel =
            task.status === 'COMPLETED'
              ? '✅ Finalizada'
              : task.status === 'IN_PROGRESS'
                ? '⏳ Em andamento'
                : '🕓 Pendente'

          const statusColor =
            task.status === 'COMPLETED'
              ? 'text-green-600'
              : task.status === 'IN_PROGRESS'
                ? 'text-blue-600'
                : 'text-yellow-600'

          return (
            <div
              key={task.id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition flex flex-col"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {task.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {task.description || 'Sem descrição'}
              </p>
              <p className="text-gray-600 text-sm">
                Status:{' '}
                <span className={`font-medium ${statusColor}`}>
                  {statusLabel}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Criada em{' '}
                {task.createdAt.toLocaleDateString('pt-BR', {
                  dateStyle: 'short',
                })}
              </p>
              <p className="text-xs text-gray-500">
                Criada por {task.user.name}
              </p>

              {/* mt-auto empurra este bloco para o final do card */}
              <div className="flex justify-between mt-auto pt-4">
                <a
                  href={`/tasks/${task.id}`}
                  className="text-indigo-500 text-sm font-medium hover:underline"
                >
                  Ver detalhes
                </a>
                <a
                  href={`/tasks/${task.id}/edit`}
                  className="text-yellow-500 text-sm font-medium hover:underline"
                >
                  Editar
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
