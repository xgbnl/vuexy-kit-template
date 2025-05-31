'use client'

// React Imports
import { useEffect, type ReactElement } from 'react'

// Libs Imports
import { get } from '@/libs/fetch/react'
import type { JsonResponse } from '@/libs/fetch/types'

const Page = () => {
  useEffect((): void => {
    const getPage = async () => {
      const res = await get<JsonResponse<null>>('errors/404')
    }

    getPage()
  }, [])

  return (
    <div>
      {/* <p>{res.msg}</p> */}
      <h3>Fetcher</h3>
    </div>
  )
}

export default Page
