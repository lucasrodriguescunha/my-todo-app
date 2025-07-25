
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'

export default function NewTask() {
  async function createTask(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const userId = formData.get('userId') as string;

    await prisma.task.create({
      data: {
        title,
        description,
        userId
      },
    });

    revalidatePath('/tasks');
    redirect('/tasks');
  }

  return (
    <div className='bg-gray-50 flex items-center justify-center'>
      <div className='w-full max-w-xl bg-white shadow-lg rounded-xl p-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Criar nova tarefa</h1>
        <p className='text-gray-600 mb-6'>
          Preencha os campos abaixo para adicionar uma nova tarefa.
        </p>

        <form action={createTask} className='space-y-6'>
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
              placeholder='Digite o título da sua tarefa'
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
              placeholder='Escreva a descrição da sua tarefa aqui...'
              rows={5}
              className='w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition outline-none' />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition shadow-md hover:shadow-lg cursor-pointer'
          >
            Criar tarefa
          </button>
        </form>
      </div>
    </div>
  );
}
