'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('hillside_crm_auth') === 'true';
    setIsAuthenticated(loggedIn);
    setIsLoading(false);

    // Redirect to login if not authenticated
    if (!loggedIn && pathname !== '/login') {
      router.push('/login');
    }
  }, [pathname, router]);

  const login = () => {
    localStorage.setItem('hillside_crm_auth', 'true');
    setIsAuthenticated(true);
    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('hillside_crm_auth');
    setIsAuthenticated(false);
    router.push('/login');
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
