// Next Imports
import { NextResponse } from 'next/server'

// Utils Imports
import { getAppUrl } from '@/utils/getAppUrl'

// Configs Imports
import type { JsonResponse } from '@/configs/fetch'

// Libs Imports
import { Get } from '@/libs/fetch/next'
import type { Authenticatable } from '@/libs/auth/types'

export async function POST(req: Request) {
  // Vars
  const credentials = await req.json()

  let promise: Response

  try {
    promise = await Get(getAppUrl(String(process.env.NEXT_PUBLIC_API_AUTH)))
    console.log(promise)
  } catch (e) {
    const error = e instanceof TypeError ? e.message : (e as string)

    return NextResponse.json({
      code: 500,
      msg: `[${error}] Please check whether the server is running normally`,
      data: null
    })
  }

  if (promise.status !== 200 && !promise.ok) {
    return NextResponse.json({
      code: 500,
      msg: 'Unable to connect to server',
      data: null
    })
  }

  const jsonResponse: JsonResponse<Authenticatable> = await promise.json()

  return NextResponse.json(jsonResponse)
}
