import { NextRequest } from 'next/server';

export function getCookie(req: NextRequest, cookieName: string): string | undefined {
  const cookieHeader = req.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const cookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
    return cookie ? cookie.split('=')[1] : undefined;
  }
  return undefined;
}
