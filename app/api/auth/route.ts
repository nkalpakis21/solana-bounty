import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Define the type for the authentication data
interface AuthData {
  user: any; // Replace with your actual user data type
  isLoggedIn: boolean;
}

export async function GET() {
  const userCookie = cookies().get('user');

  if (!userCookie) {
    return NextResponse.json({ user: null, isLoggedIn: false }, { status: 401 });
  }

  try {
    const userData = JSON.parse(userCookie.value);
    return NextResponse.json({
      user: userData,
      isLoggedIn: !!userData.token, // Check if the token exists to determine if the user is logged in
    });
  } catch (error) {
    console.error('Error parsing cookie data:', error);
    return NextResponse.json({ user: null, isLoggedIn: false }, { status: 500 });
  }
}
