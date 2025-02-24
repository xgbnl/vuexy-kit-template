This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install

npm exec auth secret

npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Fetch Guide

Edit `.env.local`
```dotenv
NEXT_API_PREFIX=/api
NEXT_PUBLIC_API_URL=https://myapi.test${NEXT_API_PREFIX}
```

Request Methods:

```ts
// Fetch Imports
import { get, post, patch, destroy, SymfonyResponse } from '@/libs/fetch'

// Type Imports
import { Paginator } from './fetchTypes'

type User = {
  id: number,
  email: string,
  avatar: string,
  username: string,
}

type GetUserResponse = {
  details: User
}

// Get user details
// Request to https://api.com/api/users/1
get<SymfonyResponse<User>>('users/:id', {
  pathVariables: [
    { key: 'id', value: 1 }
  ]
}).then((res): void => {
  console.log(res.data.details) // User
})

// Get user list
// Request to https://api.com/api/users?page=1&pageSize=10
get<SymfonyResponse<Paginator<User>>>('users', {
  params: {
    page: 1,
    pageSize: 10
  }
}).then((res): void => {
  console.log(res.data.total)
  console.log(res.data.perPage)
  console.log(res.data.currentPage)
  console.log(res.data.list) // User[]
})

// Post created
post<SymfonyResponse<User>>('users', {
  body: {
    username: 'test',
    email: 'test@test.com'
  }
}).then((res): void => {
  console.log(res.msg)
})

// Patch updated
patch<SymfonyResponse<User>>('users/:id', {
  body: {
    username: 'test',
    email: 'test@test.com'
  },
  pathVariables: [
    { key: 'id', value: 1 }
  ]
}).then((res): void => {
  console.log(res.msg)
})

// Delete
destroy<SymfonyResponse<User>>('users/:id', {
  pathVariables: [
    { key: 'id', value: 1 }
  ]
}).then(res => {
  console.log(res.msg)
})

```
