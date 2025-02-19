import type { ReactNode } from 'react'

import { useReactFetch } from '@/libs/fetch'

import type { ResponseInterface } from '@types/requestTypes'

const Example = (): ReactNode => {
  const { fetch } = useReactFetch()

  // Get method.
  fetch
    .get<ResponseInterface>('users/:id', {
      pathVariables: [
        {
          key: 'id',
          value: 1
        }
      ]
    })
    .then((response: ResponseInterface): void => {
      console.log(response)
    })

  // Get method.
  fetch
    .get<ResponseInterface>('users', {
      params: {
        page: 1,
        pageSize: 10
      }
    })
    .then((response: ResponseInterface): void => {
      console.log(response)
    })

  // Post method.
  fetch
    .post<ResponseInterface>('users', {
      body: {
        name: 'tom',
        email: 'tom@tom.com'
      }
    })
    .then((response: ResponseInterface): void => {
      console.log(response)
    })

  // Update method.
  fetch
    .patch<ResponseInterface>('users/:id', {
      body: { name: 'tom', email: 'tom@tom.com' },
      pathVariables: [{ key: 'id', value: 1 }]
    })
    .then((response: ResponseInterface): void => {
      console.log(response)
    })

  // Delete method.
  fetch.delete<ResponseInterface>('users/:id', {pathVariables: [{ key: 'id', value: 1 }]}).then((response: ResponseInterface): void => {
    console.log(response)
  })

  return <div>xxx</div>
}

export default Example
