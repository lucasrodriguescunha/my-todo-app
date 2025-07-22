# 📝 Todo App

Uma aplicação moderna de gerenciamento de tarefas construída com Next.js 15, Prisma e autenticação OAuth.

![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.12.0-2D3748?style=flat-square&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-06B6D4?style=flat-square&logo=tailwindcss)

## 🚀 Demo

**Produção**: [https://my-todo-6ybz334kp-lr7647407gmailcoms-projects.vercel.app](https://my-todo-6ybz334kp-lr7647407gmailcoms-projects.vercel.app)

## ✨ Funcionalidades

- 🔐 **Autenticação OAuth** com GitHub e Google
- ✅ **CRUD completo** de tarefas
- 🎯 **Estados de tarefa**: Pendente, Em andamento, Finalizada
- 👤 **Perfil de usuário** com avatar
- 📱 **Design responsivo** e moderno
- 🔄 **Revalidação automática** de dados
- 🛡️ **Middleware de autenticação**
- 🎨 **Interface intuitiva** com Tailwind CSS

## 🛠️ Tecnologias

### Frontend
- **Next.js 15.4.2** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Next/Image** - Otimização de imagens

### Backend
- **Next.js API Routes** - API serverless
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados (Neon)
- **NextAuth.js** - Autenticação OAuth

### Deploy & DevOps
- **Vercel** - Platform de deploy
- **ESLint** - Linting de código
- **Git** - Controle de versão

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no GitHub/Google para OAuth
- Banco PostgreSQL (recomendado: Neon)

### 1. Clone o repositório
```bash
git clone https://github.com/lucasrodriguescunha/my-todo-app.git
cd my-todo-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL="sua_connection_string_postgresql"

# NextAuth
AUTH_SECRET="seu_auth_secret_gerado"

# GitHub OAuth
AUTH_GITHUB_ID="seu_github_oauth_id"
AUTH_GITHUB_SECRET="seu_github_oauth_secret"

# Google OAuth  
AUTH_GOOGLE_ID="seu_google_oauth_id"
AUTH_GOOGLE_SECRET="seu_google_oauth_secret"
```

### 4. Configure o banco de dados
```bash
# Gerar o Prisma Client
npx prisma generate

# Executar migrações
npx prisma migrate dev

# (Opcional) Seed do banco
npx prisma db seed
```

### 5. Execute o projeto
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuração OAuth

### GitHub OAuth
1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Crie uma nova OAuth App
3. Configure:
   - **Homepage URL**: `http://localhost:3000` (dev) / `sua_url_producao` (prod)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

### Google OAuth
1. Acesse [Google Console](https://console.developers.google.com)
2. Crie um novo projeto ou selecione um existente
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Configure:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

## 🗄️ Estrutura do Banco de Dados

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  tasks         Task[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  status      Status   @default(PENDING)
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Status {
  PENDING
  IN_PROGRESS
  COMPLETED
}
```

## 📂 Estrutura do Projeto

```
my-todo-app/
├── app/                          # App Router (Next.js 13+)
│   ├── api/auth/[...nextauth]/   # API de autenticação
│   ├── tasks/                    # Páginas de tarefas
│   │   ├── [id]/                 # Tarefa individual
│   │   │   ├── edit/             # Editar tarefa
│   │   │   └── page.tsx          # Visualizar tarefa
│   │   ├── new/                  # Nova tarefa
│   │   ├── layout.tsx            # Layout das tarefas
│   │   └── page.tsx              # Lista de tarefas
│   ├── components/               # Componentes React
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página inicial
├── lib/                          # Utilitários
│   └── prisma.ts                 # Cliente Prisma
├── prisma/                       # Schema e migrações
│   ├── migrations/               # Migrações do banco
│   ├── schema.prisma             # Schema do banco
│   └── seed.ts                   # Dados iniciais
├── auth.ts                       # Configuração NextAuth
├── middleware.ts                 # Middleware de autenticação
└── next.config.ts                # Configuração Next.js
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no dashboard
3. Deploy automático a cada push

### Outras plataforms
- **Netlify**: Configure build command como `npm run build`
- **Railway**: Configure banco PostgreSQL e variáveis
- **Heroku**: Use Heroku Postgres addon

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build de produção
npm run start        # Inicia servidor de produção

# Banco de dados
npm run db:push      # Push schema para banco
npm run db:studio    # Abre Prisma Studio
npm run db:seed      # Executa seed do banco

# Linting
npm run lint         # Executa ESLint
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Lucas Rodrigues**
- GitHub: [@lucasrodriguescunha](https://github.com/lucasrodriguescunha)
- LinkedIn: [Lucas Rodrigues](https://linkedin.com/in/lucas-rodrigues-cunha)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) pela excelente framework
- [Prisma](https://prisma.io/) pelo ORM intuitivo
- [NextAuth.js](https://next-auth.js.org/) pela autenticação simplificada
- [Tailwind CSS](https://tailwindcss.com/) pelo CSS utilitário
- [Vercel](https://vercel.com/) pela plataforma de deploy

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
