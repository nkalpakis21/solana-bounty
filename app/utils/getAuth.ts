import { NextRequest } from 'next/server';
import { getCookie } from './cookies';

// Define the type for the authentication data
interface AuthData {
  user: any; // Replace with your actual user data type
  isLoggedIn: boolean;
}

export async function getAuthData(req: NextRequest): Promise<AuthData> {
  const cookieData = getCookie(req, 'user');
  if (cookieData) {
    try {
      const userData = JSON.parse(cookieData);
      return {
        user: userData,
        isLoggedIn: !!userData.token, // Check if the token exists to determine if the user is logged in
      };
    } catch (error) {
      console.error('Error parsing cookie data:', error);
      return { user: null, isLoggedIn: false };
    }
  }
  return { user: null, isLoggedIn: false };
}
