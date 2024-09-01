import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const userCookie = cookies().get('user')
  
  if (!userCookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const userData = JSON.parse(userCookie.value)
  return NextResponse.json(userData)
}