'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('hillside_crm_auth');
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-sm py-6 px-4 md:px-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo ve Title */}
        <div className="flex items-center gap-4 md:gap-6">
          <img src="/logo.png" alt="Hillside" className="h-16 md:h-20" />
          <div className="hidden md:block border-l-2 border-gray-300 h-16 mx-2"></div>
          <div className="text-center md:text-left">
            <h1 className="text-accent text-xl md:text-2xl font-bold leading-tight">CRM</h1>
            <h2 className="text-gray-800 text-xl md:text-2xl font-bold leading-tight">PORTAL</h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors text-sm md:text-base font-semibold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            <span className="hidden sm:inline">Çıkış Yap</span>
          </button>

          <button
            onClick={() => router.push('/misafir-ekle')}
            className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors text-sm md:text-base font-semibold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="hidden sm:inline">Misafir Ekle</span>
          </button>

          <button
            onClick={() => router.push('/ozel-listeler')}
            className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors text-sm md:text-base font-semibold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Özel Listeler</span>
          </button>

          <button
            onClick={() => router.push('/badge-yonetimi')}
            className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors text-sm md:text-base font-semibold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            <span className="hidden sm:inline">Badge Yönetimi</span>
          </button>

          <button
            onClick={() => router.push('/segmentasyon')}
            className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors text-sm md:text-base font-semibold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18"/>
              <path d="M18 17V9"/>
              <path d="M13 17V5"/>
              <path d="M8 17v-3"/>
            </svg>
            <span className="hidden sm:inline">Segmentasyon</span>
          </button>

          <button
            onClick={() => router.push('/search')}
            className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors text-sm md:text-base font-semibold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <span className="hidden sm:inline">Arama Yap</span>
          </button>
        </div>
      </div>
    </header>
  );
}
