'use client'

// Import custom type.
import type { JSXElement } from '@types/elementTypes'

import type { GetRequestBody, ResponseInterface } from '@types/requestTypes'

// Import react element.
import { ReactElement, useEffect } from 'react'

// Import request.
import { useFetch } from '@/libs/fetch/fetch'

// type CustomRequest = {
//   params: {
//     name: string
//     email: string
//   }
// } & GetRequestBody

const Test: JSXElement = (): ReactElement => {

  const { fetch } = useFetch()

  useEffect((): void => {
    fetch.get<GetRequestBody, ResponseInterface>('regions',{})
      .then((response: ResponseInterface) => {
      console.log(response)
    })
  }, [])

  return <div>
    <h1>Hello,Next.js</h1>
  </div>
}

export default Test
