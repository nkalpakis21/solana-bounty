import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  console.log('got here');
  cookies().delete('user')
  return NextResponse.json({ success: true })
}