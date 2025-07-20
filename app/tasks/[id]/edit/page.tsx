import Form from 'next/form';
import prisma from '@/lib/prisma';
import { redirect, notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function EditTask({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });

  if (!task) notFound();

  // Server Action para atualizar a tarefa
  async function updateTask(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const completed = formData.get('completed') === 'on';

    await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        completed,
      },
    });

    revalidatePath(`/tasks/${id}`);
    redirect(`/tasks/${id}`);
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Editar Tarefa</h1>
      <Form action={updateTask} className='space-y-6'>
        <div>
          <label htmlFor='title' className='block text-lg mb-2'>
            Título
          </label>
          <input
            type='text'
            id='title'
            name='title'
            defaultValue={task.title}
            className='w-full px-4 py-2 border rounded-lg'
          />
        </div>

        <div>
          <label htmlFor='description' className='block text-lg mb-2'>
            Descrição
          </label>
          <textarea
            id='description'
            name='description'
            defaultValue={task.description ?? ''}
            rows={6}
            className='w-full px-4 py-2 border rounded-lg'
          />
        </div>

        <div className='flex items-center gap-2'>
          <input type='checkbox' id='completed' name='completed' defaultChecked={task.completed} />
          <label htmlFor='completed' className='text-lg'>
            Tarefa finalizada?
          </label>
        </div>

        <button
          type='submit'
          className='w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600'
        >
          Salvar alterações
        </button>
      </Form>
    </div>
  );
}
