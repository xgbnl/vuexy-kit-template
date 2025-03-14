'use client'

import { useEffect } from 'react'

import { get, type Responder } from '@/libs/fetch'
import type { Paginator } from '@/types/paginationTypes'

type User = {
  id: number
}

const Test = () => {
  useEffect(() => {
    get<Responder<Paginator<User>>>('auth').then(res => {
      console.log(res)
    })
  }, [])

  return (
    <div>
      <h1>Hello,Next.js</h1>
    </div>
  )
}

export default Test
