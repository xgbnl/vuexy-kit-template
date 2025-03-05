'use client'

import { useEffect } from 'react'
import { get, Responder } from '@/libs/fetch'
import { Paginator } from '@/types/fetchTypes'

type User = {
  id: number
}

const Test = () => {
  useEffect(() => {
    get<Responder<Paginator<User>>>('auth')
      .then(res => {
        console.log(res);

      })
  }, [])

  return (
    <div>
      <h1>Hello,Next.js</h1>
    </div>
  )
}

export default Test
