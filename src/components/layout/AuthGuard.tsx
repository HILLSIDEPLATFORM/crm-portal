'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('hillside_crm_auth') === 'true';
      setIsAuthenticated(loggedIn);
      setIsLoading(false);

      if (!loggedIn && pathname !== '/login') {
        router.push('/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img src="/logo.png" alt="Hillside" className="mx-auto mb-4 animate-pulse" style={{ maxWidth: '150px' }} />
          <p className="text-hillside-gray">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
}
