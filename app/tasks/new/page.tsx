import Form from 'next/form';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default function newTask() {
  async function createTask(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    await prisma.task.create({
      data: {
        title,
        description,
        userId: 1
      },
    });

    revalidatePath('/tasks');
    redirect('/tasks');
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Criar nova tarefa</h1>
      <Form action={createTask} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Digite o título da sua tarefa"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg mb-2">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Escreva a descrição da sua tarefa aqui..."
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Criar tarefa
        </button>
      </Form>
    </div>
  );
}
