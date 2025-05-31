// React Imports
import type { ReactElement } from 'react'

// Libs Imports
import { get, scope } from '@/libs/fetch/next'
import type { JsonResponse } from '@/libs/fetch/types'

const Page = async (): Promise<ReactElement> => {
  let res: JsonResponse<null> | undefined

  try {
    res = await get<JsonResponse<null>>('errors/422')
  } catch (err) {
    console.log(scope(err))
  }

  console.log(res)

  return (
    <div>
      {/* <p>{res.msg}</p> */}
      <h3>Fetcher</h3>
    </div>
  )
}

export default Page
