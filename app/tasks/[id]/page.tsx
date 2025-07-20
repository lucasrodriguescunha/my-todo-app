import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function Task({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: true,
    },
  });

  if (!task) {
    notFound();
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-[#333333]">{task.title}</h1>
        <p className="text-gray-600 text-center">Descrição: {task.description}</p>
        <p className="text-gray-600 text-center">Progresso: {task.completed ? 'Pendente' : 'Finalizada'}</p>
        <p className="text-gray-600 text-center">por {task.user.name}</p>
        <div className="prose prose-gray mt-8">
          {/* task.description */}
          {task.title || 'Nenhum conteúdo disponível.'}
        </div>
      </article>
    </div>
  );
}