// Next Imports
import { NextResponse } from 'next/server'

// Configs Imports
import type { JsonResponse, Throwable } from '@/configs/fetch'

// Libs Imports
import { Post } from '@/libs/fetch/next'
import type { Authenticatable } from '@/libs/auth/types'

export async function POST(req: Request) {
  // Vars
  const credentials = await req.json()

  let response: JsonResponse<Authenticatable>

  try {
    response = await Post<JsonResponse<Authenticatable>>(String(process.env.NEXT_PUBLIC_API_AUTH), credentials)
  } catch (e) {
    const error = e as Throwable

    return NextResponse.json({
      code: error.code,
      msg: error.msg,
      data: null
    })
  }

  if (response.code !== 200) {
    return NextResponse.json({
      code: response.code,
      msg: response.msg,
      data: null
    })
  }

  return NextResponse.json(response)
}
