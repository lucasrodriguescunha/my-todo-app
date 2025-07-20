import Form from 'next/form';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function Task({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-xl bg-white shadow-lg rounded-xl p-8 text-center space-y-4'>
        <h1 className='text-3xl font-bold text-gray-800'>{task.title}</h1>
        <p className='text-gray-600'>Descrição: {task.description}</p>
        <p className='text-gray-600'>
          Progresso: <span className={task.completed ? 'text-green-600' : 'text-yellow-600'}>
            {task.completed ? 'Finalizada' : 'Pendente'}
          </span>
        </p>
        <p className='text-gray-500'>Por {task.user.name}</p>

        <div className='flex gap-4 mt-6 justify-center'>
          <a
            href={`/tasks/${task.id}/edit`}
            className='bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition shadow-md'
          >
            Editar
          </a>

          <Form action={deleteTask}>
            <button
              type='submit'
              className='bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition shadow-md'
            >
              Deletar
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}