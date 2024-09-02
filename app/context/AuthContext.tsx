import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuthData } from '../utils/getAuth';
import { NextRequest } from 'next/server';

// Define the type for the authentication state
interface AuthContextProps {
  user: any; // Replace with your actual user data type
  isLoggedIn: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthContextProps>({
    user: null,
    isLoggedIn: false,
    loading: true,
  });

  useEffect(() => {
    const fetchAuthData = async () => {
      // You need to provide the request object here
      // For client-side fetching, you'll use a different method
      // This is just a placeholder to show how you might call getAuthData
      const req = {} as NextRequest; // Replace with actual request object in real use
      const authData = await getAuthData(req);
      setAuthState({
        user: authData.user,
        isLoggedIn: authData.isLoggedIn,
        loading: false,
      });
    };

    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
