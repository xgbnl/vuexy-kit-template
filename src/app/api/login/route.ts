// Next Imports
import { NextResponse } from 'next/server'

// Types Imports
import type { JsonResponse, Throwable } from '@/types/fetchTypes'

// Libs Imports
import { Post } from '@/libs/fetch/next'
import type { Authenticatable } from '@/libs/auth'
import { HttpStatus } from '@/configs/fetch'

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

  if (HttpStatus.includes(response.code)) {
    return NextResponse.json({
      code: response.code,
      msg: response.msg,
      data: null
    })
  }

  return NextResponse.json(response)
}
