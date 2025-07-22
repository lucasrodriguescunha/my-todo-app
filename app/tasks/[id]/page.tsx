import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic'

export default async function Task({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
    include: { user: true },
  });

  if (!task) notFound();

  async function deleteTask() {
    'use server';
    await prisma.task.delete({ where: { id: parseInt(id) } });
    revalidatePath('/tasks');
    redirect('/tasks');
  }

  const statusLabel =
    task.status === 'COMPLETED'
      ? '✅ Finalizada'
      : task.status === 'IN_PROGRESS'
        ? '⏳ Em andamento'
        : '🕓 Pendente';

  const statusColor =
    task.status === 'COMPLETED'
      ? 'text-green-600'
      : task.status === 'IN_PROGRESS'
        ? 'text-blue-600'
        : 'text-yellow-600';

  return (
    <div className='bg-gray-50 flex items-center justify-center'>
      <div className='w-full max-w-xl bg-white shadow-lg rounded-xl p-8 text-center space-y-4'>
        <h1 className='text-2xl font-bold text-gray-800'>{task.title}</h1>
        <p className='text-gray-600'>
          {task.description || 'Sem descrição'}
        </p>
        <p className='text-gray-600'>
          Criada em: {task.createdAt.toLocaleDateString('pt-BR', {
            dateStyle: 'short',
          })}
        </p>
        <p className='text-gray-600'>
          Atualizada em: {task.updatedAt.toLocaleDateString('pt-BR', {
            dateStyle: 'short',
          })}
        </p>
        <p className={`font-medium ${statusColor}`}>
          Status: {statusLabel}
        </p>
        <p className='text-gray-500'>Criada por: {task.user.name}</p>
        <div className='flex gap-4 mt-6 justify-center'>
          <a
            href={`/tasks/${task.id}/edit`}
            className='bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition shadow-md'
          >
            Editar
          </a>
          <form action={deleteTask}>
            <button
              type='submit'
              className='bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition shadow-md'
            >
              Deletar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
