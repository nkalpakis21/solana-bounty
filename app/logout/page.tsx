'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // Use this for Next.js 13+ app directory
import { logoutUser } from "app/utils/api";
import { mutate } from 'swr';

export default function AppLogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Invalidate the cache and refetch the data
      mutate('/api/auth', { user: null, isLoggedIn: false }, false);
      router.push('/'); // Use router.push for client-side navigation
    } catch (error) {
      // Handle the error or show a message to the user
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <div className="mb-4 text-4xl">🌟</div>
          <h2 className="text-2xl font-bold text-gray-900">See You Soon</h2>
          <p className="mt-2 text-sm text-gray-600">Are you sure you want to log out?</p>
        </div>
        <Button
          className="w-full bg-gray-900 text-white hover:bg-gray-800"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Changed your mind?{" "}
          <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
            Return to Dashboard
          </Link>
        </p>
        <div className="mt-6 text-center text-xs text-gray-500">
          By logging out, you will need to sign in again to access your account
        </div>
      </div>
    </div>
  );
}
