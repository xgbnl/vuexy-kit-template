'use client'

import { useEffect } from 'react'
import { HttpRequest, ResponseInterface, useReactFetch } from '@/libs/fetch'
import { toast } from 'react-toastify'

type User = {
  id: string
}

const Test = () => {

  const fetch: HttpRequest = useReactFetch()

  useEffect(() => {
    fetch.post<ResponseInterface<null>>('auth', {
      body:{
        username: 'admin',
        password: '123456'
      }
    }).then(res => {
      if (res.code === 201) {
        toast.success(res.msg)
      }
    }).catch(err => console.log(err))

  }, [])

  return <div>
    <h1>Hello,Next.js</h1>
  </div>
}

export default Test
