// React Imports
import type { ReactElement } from 'react'

// Libs Imports
import { get } from '@/libs/fetch/next'
import type { JsonResponse } from '@/libs/fetch/types'

const Page = async (): Promise<ReactElement> => {
  const res = await get<JsonResponse<null>>('errors/401')

  return (
    <div>
      <p>{res.msg}</p>
      <h3>Fetcher</h3>
    </div>
  )
}

export default Page
