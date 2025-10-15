'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: number;
  name: string;
  dataSource: string;
  email: string;
  phone: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tcKimlik, setTcKimlik] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const resultsPerPage = 10;

  // Demo data - gerçek uygulamada API'den gelecek
  const mockResults: SearchResult[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Mertcan Yüksel ${i + 1}`,
    dataSource: 'VERİ ANALİSTİ',
    email: `mertcanyuksel${i + 1}@hillside.com.tr`,
    phone: `(543) 542 514${i}`,
  }));

  const handleSearch = () => {
    console.log('Arama butonu tıklandı!');
    console.log('Mock results:', mockResults);
    setSearchResults(mockResults);
    setShowResults(true);
    setCurrentPage(1);
    console.log('State güncellendi - showResults:', true);

    // Sonuçlara scroll
    setTimeout(() => {
      const resultsElement = document.getElementById('search-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem('hillside_crm_auth');
    window.location.href = '/login';
  };

  const handleViewDetail = (customerId: number) => {
    router.push(`/search/${customerId}`);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  console.log('Render - showResults:', showResults, 'searchResults.length:', searchResults.length);
  console.log('currentResults:', currentResults);

  return (
    <div className="min-h-screen">
      {/* Header */}
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

            <button className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors text-sm md:text-base font-semibold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span className="hidden sm:inline">Misafir Ekle</span>
            </button>

            <button className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors text-sm md:text-base font-semibold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <span className="hidden sm:inline">Arama Yap</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-12 max-w-5xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 border border-hillside-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Ad */}
            <div>
              <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                Ad
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder=""
              />
            </div>

            {/* Soyad */}
            <div>
              <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                Soyad
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder=""
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder=""
              />
            </div>

            {/* Mobil */}
            <div>
              <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                Mobil
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder=""
              />
            </div>

            {/* TCKN - Full Width */}
            <div className="md:col-span-2">
              <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                TCKN
              </label>
              <input
                type="text"
                value={tcKimlik}
                onChange={(e) => setTcKimlik(e.target.value)}
                maxLength={11}
                className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder=""
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-8 md:mt-12">
            <button
              onClick={handleSearch}
              className="w-full md:w-64 h-12 md:h-[61px] bg-accent hover:bg-accent-dark text-white font-bold text-base md:text-lg rounded-lg transition-colors uppercase shadow-md hover:shadow-lg"
            >
              ara
            </button>
          </div>
        </div>

        {/* Search Results */}
        {showResults && searchResults.length > 0 && (
          <div id="search-results" className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Arama Sonuçları ({searchResults.length})</h2>
            {currentResults.map((result) => (
              <div
                key={result.id}
                onClick={() => handleViewDetail(result.id)}
                className="bg-white rounded-lg shadow-lg border-2 border-accent p-6 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {result.name}
                    </h3>
                    <p className="text-accent font-semibold text-sm uppercase mb-3">
                      {result.dataSource}
                    </p>
                    <div className="space-y-1 text-gray-700">
                      <p className="text-sm md:text-base">{result.email}</p>
                      <p className="text-sm md:text-base font-medium">{result.phone}</p>
                    </div>
                  </div>
                  <div className="flex md:block justify-end">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-accent text-white hover:bg-accent-dark'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span className="hidden sm:inline">Önceki</span>
              </button>

              <div className="px-4 py-2 bg-accent text-white rounded-lg font-bold min-w-[60px] text-center">
                {currentPage}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-accent text-white hover:bg-accent-dark'
                }`}
              >
                <span className="hidden sm:inline">Sonraki</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {showResults && searchResults.length === 0 && (
          <div className="mt-8 text-center py-12">
            <p className="text-xl text-gray-600">Sonuç bulunamadı.</p>
          </div>
        )}
      </main>
    </div>
  );
}
