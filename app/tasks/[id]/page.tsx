import Form from 'next/form';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function Task({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      user: true,
    },
  });

  if (!task) notFound();

  async function deleteTask() {
    'use server';
    await prisma.task.delete({
      where: {
        id: parseInt(id)
      }
    });
    revalidatePath('/tasks');
    redirect('/tasks');
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16'>
      <article className='max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]'>
        <h1 className='text-4xl font-bold mb-8 text-[#333333]'>{task.title}</h1>
        <p className='text-gray-600 text-center'>Descrição: {task.description}</p>
        <p className='text-gray-600 text-center'>
          Progresso: {task.completed ? 'Finalizada' : 'Pendente'}
        </p>
        <p className='text-gray-600 text-center'>por {task.user.name}</p>

        <div className='flex gap-4 mt-6 justify-center'>
          {/* Botão de editar (redireciona para página de edição) */}
          <a
            href={`/tasks/${task.id}/edit`}
            className='bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-600'
          >
            Editar
          </a>

          <Form action={deleteTask}>
            <button
              type='submit'
              className='bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600'
            >
              Deletar
            </button>
          </Form>
        </div>
      </article>
    </div>
  );
}