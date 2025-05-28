// Next Imports
import { NextResponse } from 'next/server'

// Types Imports
import type { JsonResponse, Throwable } from '@/libs/fetch/types'

// Libs Imports
import { post } from '@/libs/fetch/next'
import type { Authenticatable } from '@/libs/auth'
import { HttpStatus } from '@/libs/fetch/types'

export async function POST(req: Request) {
  const path: string | undefined = process.env.NEXT_PUBLIC_API_AUTH

  if (path === undefined) {
    throw new Error('Please configure env.NEXT_PUBLIC_API_AUTH.')
  }

  const credentials = await req.json()

  let response: JsonResponse<Authenticatable>

  try {
    response = await post<JsonResponse<Authenticatable>>(path, { body: credentials })
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
