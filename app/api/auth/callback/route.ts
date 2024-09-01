import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const clientId = process.env.GITHUB_CLIENT_ID || ''
const clientSecret = process.env.GITHUB_SECRET_ID || ''
const BASE_URL = process.env.BASE_URL || 'https://n0va-io.com';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect('/login')
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error('Failed to obtain access token')
    }

    // Fetch user data
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    // Set a cookie with the user data (you might want to use a more secure method in production)
    cookies().set('user', JSON.stringify(userData), { httpOnly: true, secure: true })

    return NextResponse.redirect(`${BASE_URL}/dashboard`);
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.redirect(`${BASE_URL}`);
  }
}