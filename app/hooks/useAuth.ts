'use client';

import useSWR from 'swr';

interface AuthData {
  user: any; // Replace with your actual user data type
  isLoggedIn: boolean;
}

async function fetchAuthData(): Promise<AuthData> {
  const response = await fetch('/api/auth');
  if (!response.ok) {
    throw new Error('Failed to fetch auth data');
  }
  const data = await response.json();
  return data;
}

export function useAuth() {
  const { data, error } = useSWR<AuthData>('/api/auth', fetchAuthData);

  const loading = !data && !error;
  const isLoggedIn = data?.isLoggedIn || false;
  const user = data?.user || null;

  return {
    user,
    isLoggedIn,
    loading,
    error,
  };
}
