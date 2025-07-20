import Form from 'next/form';
import prisma from '@/lib/prisma';
import { redirect, notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function EditTask({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });

  if (!task) notFound();

  async function updateTask(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const completed = formData.get('completed') === 'on';

    await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, completed },
    });

    revalidatePath(`/tasks/${id}`);
    redirect(`/tasks/${id}`);
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-xl bg-white shadow-lg rounded-xl p-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Editar tarefa</h1>
        <p className='text-gray-600 mb-6'>
          Altere os campos abaixo e salve as alterações.
        </p>

        <Form action={updateTask} className='space-y-6'>
          <div>
            <label
              htmlFor='title'
              className='block text-1xl font-medium text-gray-700 mb-2'
            >
              Título
            </label>
            <input
              type='text'
              id='title'
              name='title'
              defaultValue={task.title}
              className='w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition outline-none'
            />
          </div>

          <div>
            <label
              htmlFor='description'
              className='block text-1xl font-medium text-gray-700 mb-2'
            >
              Descrição
            </label>
            <textarea
              id='description'
              name='description'
              defaultValue={task.description ?? ''}
              rows={5}
              className='w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition outline-none'
            />
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='completed'
              name='completed'
              defaultChecked={task.completed}
              className='h-5 w-5 text-indigo-500 rounded focus:ring-indigo-400'
            />
            <label htmlFor='completed' className='text-gray-700'>
              Tarefa finalizada?
            </label>
          </div>

          <button
            type='submit'
            className='w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition shadow-md hover:shadow-lg cursor-pointer'
          >
            Salvar alterações
          </button>
        </Form>
      </div>
    </div>
  );
}
