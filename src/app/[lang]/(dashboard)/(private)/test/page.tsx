'use client'

import { useEffect } from 'react'
import { get, Responder } from '@/libs/fetch'

type User = {
  id: string
}

const Test = () => {
  useEffect(() => {
    get<Responder<User[]>>('auth').then(res => {})
  }, [])

  return (
    <div>
      <h1>Hello,Next.js</h1>
    </div>
  )
}

export default Test
