'use client';

import { usePathname } from 'next/navigation';
import AuthGuard from './AuthGuard';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}
