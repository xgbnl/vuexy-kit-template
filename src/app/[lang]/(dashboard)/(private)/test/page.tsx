'use client'

import { useEffect } from 'react'
import { get, post, SymfonyResponse } from '@/libs/fetch'
import { toast } from 'react-toastify'

type User = {
  id: string
}

const Test = () => {



  useEffect(() => {
    get<SymfonyResponse<User[]>>('auth').then(res => {

    })
  }, [])

  return <div>
    <h1>Hello,Next.js</h1>
  </div>
}

export default Test
