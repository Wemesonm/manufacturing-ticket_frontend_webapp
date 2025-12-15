This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API e Domain Services

O frontend utiliza a mesma abordagem de _domain/services_ do app React Native (`nubbleapp-main`):

- `src/api`: configuração do Axios (`apiConfig`), adapters e tipos paginados iguais ao backend Django (meta + data).
- `src/domain/Auth`: funções de login/refresh/verify via SimpleJWT com conversores (`authAdapter`) e `authService`.
- `src/domain/Ticket`: acesso aos endpoints de tickets/ticket-status com conversão `snake_case` → `camelCase` e paginação.
- `src/domain/Catalog`: lista de catálogos (sites, linhas, estações, falhas, severidades, SLA) com filtros opcionais.

### Configuração do endpoint

Defina a variável `NEXT_PUBLIC_API_URL` para apontar para o backend (ex.: `http://localhost:8000/ticket/api/`). Sem essa variável, o cliente usa o fallback local acima.

### Exemplo de uso

```ts
'use server';
import {ticketService} from '@/src/domain';

export async function loadTickets() {
  const page = await ticketService.getList({page: 1, perPage: 10});
  return page.data;
}
```

O interceptor em `src/api/apiConfig.ts` pode ser registrado em um provider de contexto para renovar o token automaticamente chamando `authService.refreshAccessToken`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
