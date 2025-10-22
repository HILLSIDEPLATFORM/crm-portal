'use client';

import { useState } from 'react';

interface OzelListe {
  id: number;
  listType: string;
  fullName: string;
  jobTitle: string;
  company: string;
  budget: string;
  message: string;
  deliveryPlace: string;
  deliveryAddress: {
    country: string;
    city: string;
    county: string;
    address: string;
    postalCode: string;
  };
  assistantCaptainContact: string;
  boatName: string;
  businessCard1: string;
  businessCard2: string;
  businessCard3: string;
  businessCard4: string;
  businessCard5: string;
}

interface CreateListPopupProps {
  isOpen: boolean;
  onClose: () => void;
  editingListe?: OzelListe | null;
  prefilledCustomerName?: string;
  listTypes: string[];
  budgets: string[];
  mockCustomerData: { [key: string]: {
    jobTitle: string;
    company: string;
    homeAddress: string;
    homeCity: string;
    homeCounty: string;
    homeCountry: string;
    businessAddress: string;
    businessCity: string;
    businessCounty: string;
    businessCountry: string;
  } };
}

export default function CreateListPopup({
  isOpen,
  onClose,
  editingListe,
  prefilledCustomerName,
  listTypes,
  budgets,
  mockCustomerData
}: CreateListPopupProps) {
  const [addressType, setAddressType] = useState<'ev' | 'is' | 'custom'>('custom');
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>(prefilledCustomerName || '');
  const [isCustomerSearchOpen, setIsCustomerSearchOpen] = useState(false);

  // Search page states
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchTcKimlik, setSearchTcKimlik] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Mock search results
  const mockSearchResults = Object.entries(mockCustomerData).map(([name, data], index) => ({
    id: index + 1,
    name: name,
    dataSource: data.jobTitle,
    email: `${name.toLowerCase().replace(/\s+/g, '')}@hillside.com.tr`,
    phone: '(543) 542 5143',
  }));

  const handleCustomerSearch = () => {
    // Filter results based on search criteria
    const filtered = mockSearchResults.filter(result => {
      const matchesFirstName = !searchFirstName || result.name.toLowerCase().includes(searchFirstName.toLowerCase());
      const matchesLastName = !searchLastName || result.name.toLowerCase().includes(searchLastName.toLowerCase());
      const matchesEmail = !searchEmail || result.email.toLowerCase().includes(searchEmail.toLowerCase());
      const matchesPhone = !searchPhone || result.phone.includes(searchPhone);
      return matchesFirstName && matchesLastName && matchesEmail && matchesPhone;
    });
    setSearchResults(filtered);
    setShowSearchResults(true);
  };

  const handleSelectCustomer = (customerName: string) => {
    setSelectedCustomerName(customerName);
    setIsCustomerSearchOpen(false);
    // Reset search
    setSearchFirstName('');
    setSearchLastName('');
    setSearchEmail('');
    setSearchPhone('');
    setSearchTcKimlik('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-accent">
            {editingListe ? 'Liste Düzenle' : 'Yeni Liste Ekle'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Popup Content */}
        <div className="p-6 space-y-6">
          {/* Fullname - Button to open customer search */}
          <div>
            <label className="block text-sm text-accent font-semibold mb-2">Ad Soyad</label>
            {selectedCustomerName ? (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={selectedCustomerName}
                  className="flex-1 px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg bg-gray-100"
                  readOnly
                />
                <button
                  onClick={() => {
                    setSelectedCustomerName('');
                    setIsCustomerSearchOpen(true);
                  }}
                  className="px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
                >
                  Değiştir
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsCustomerSearchOpen(true)}
                className="w-full px-4 py-3 text-lg font-semibold text-gray-600 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Misafir Seç
              </button>
            )}
          </div>

          {/* Job Title & Company - Readonly, auto-filled from customer data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-accent font-semibold mb-2">Görevi</label>
              <input
                type="text"
                value={selectedCustomerName && mockCustomerData[selectedCustomerName]
                  ? mockCustomerData[selectedCustomerName].jobTitle
                  : editingListe?.jobTitle || ''}
                className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-accent font-semibold mb-2">Şirket</label>
              <input
                type="text"
                value={selectedCustomerName && mockCustomerData[selectedCustomerName]
                  ? mockCustomerData[selectedCustomerName].company
                  : editingListe?.company || ''}
                className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg bg-gray-100"
                readOnly
              />
            </div>
          </div>

          {/* Liste Tipi & Bütçe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-accent font-semibold mb-2">Liste Tipi</label>
              <select
                defaultValue={editingListe?.listType || ''}
                className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Seçiniz</option>
                {listTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-accent font-semibold mb-2">Bütçe</label>
              <select
                defaultValue={editingListe?.budget || ''}
                className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Seçiniz</option>
                {budgets.map(budget => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mesaj */}
          <div>
            <label className="block text-sm text-accent font-semibold mb-2">Mesaj</label>
            <textarea
              placeholder="Mesaj giriniz"
              defaultValue={editingListe?.message || ''}
              className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              rows={3}
            />
          </div>

          {/* Adres Tipi */}
          <div>
            <label className="block text-sm text-accent font-semibold mb-2">Adres Tipi</label>
            <select
              value={addressType}
              onChange={(e) => setAddressType(e.target.value as 'ev' | 'is' | 'custom')}
              className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="ev">Ev Adres</option>
              <option value="is">İş Adres</option>
              <option value="custom">Custom Adres</option>
            </select>
          </div>

          {/* Gönderim Adresi */}
          <div>
            <label className="block text-sm text-accent font-semibold mb-4">Gönderim Adresi</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Ülke</label>
                <input
                  type="text"
                  placeholder="Ülke giriniz"
                  defaultValue={editingListe?.deliveryAddress.country || ''}
                  className="w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">İl</label>
                <input
                  type="text"
                  placeholder="İl giriniz"
                  defaultValue={editingListe?.deliveryAddress.city || ''}
                  className="w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">İlçe</label>
                <input
                  type="text"
                  placeholder="İlçe giriniz"
                  defaultValue={editingListe?.deliveryAddress.county || ''}
                  className="w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Posta Kodu</label>
                <input
                  type="text"
                  placeholder="Posta kodu giriniz"
                  defaultValue={editingListe?.deliveryAddress.postalCode || ''}
                  className="w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-600 mb-1">Adres</label>
                <input
                  type="text"
                  placeholder="Adres giriniz"
                  defaultValue={editingListe?.deliveryAddress.address || ''}
                  className="w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Asistan/Kaptan İletişim & Tekne Adı */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-accent font-semibold mb-2">Asistan/Kaptan İletişim</label>
              <input
                type="text"
                placeholder="Telefon numarası giriniz"
                defaultValue={editingListe?.assistantCaptainContact || ''}
                className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-accent font-semibold mb-2">Tekne Adı</label>
              <input
                type="text"
                placeholder="Tekne adı giriniz (opsiyonel)"
                defaultValue={editingListe?.boatName || ''}
                className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Business Cards */}
          <div>
            <label className="block text-sm text-accent font-semibold mb-4">Kartvizitler</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5].map((num) => {
                const cardKey = `businessCard${num}` as keyof OzelListe;
                return (
                  <div key={num}>
                    <label className="block text-xs text-gray-600 mb-1">Kartvizit {num}</label>
                    <input
                      type="text"
                      defaultValue={editingListe ? (editingListe[cardKey] as string) || '' : ''}
                      placeholder="İsim giriniz"
                      className="w-full px-4 py-3 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-300 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg transition-colors"
          >
            İptal
          </button>
          <button
            onClick={() => {
              // TODO: Create/Update logic will be implemented here
              alert(editingListe ? 'Liste güncellendi!' : 'Yeni liste eklendi!');
              onClose();
            }}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors"
          >
            Kaydet
          </button>
        </div>
      </div>

      {/* Customer Search Popup - Full Search Page Clone */}
      {isCustomerSearchOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10 overflow-y-auto">
          <div className="bg-hillside-bg rounded-lg shadow-xl max-w-5xl w-full my-8">
            {/* Popup Header with Close Button */}
            <div className="sticky top-0 bg-white border-b border-gray-300 px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h4 className="text-xl font-bold text-accent">Misafir Ara</h4>
              <button
                onClick={() => {
                  setIsCustomerSearchOpen(false);
                  setSearchFirstName('');
                  setSearchLastName('');
                  setSearchEmail('');
                  setSearchPhone('');
                  setSearchTcKimlik('');
                  setSearchResults([]);
                  setShowSearchResults(false);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Search Form - Clone of search page */}
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-10 border border-hillside-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Ad */}
                  <div>
                    <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                      Ad
                    </label>
                    <input
                      type="text"
                      value={searchFirstName}
                      onChange={(e) => setSearchFirstName(e.target.value)}
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
                      value={searchLastName}
                      onChange={(e) => setSearchLastName(e.target.value)}
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
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
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
                      value={searchPhone}
                      onChange={(e) => setSearchPhone(e.target.value)}
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
                      value={searchTcKimlik}
                      onChange={(e) => setSearchTcKimlik(e.target.value)}
                      maxLength={11}
                      className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder=""
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center mt-8 md:mt-12">
                  <button
                    onClick={handleCustomerSearch}
                    className="w-full md:w-64 h-12 md:h-[61px] bg-accent hover:bg-accent-dark text-white font-bold text-base md:text-lg rounded-lg transition-colors uppercase shadow-md hover:shadow-lg"
                  >
                    ara
                  </button>
                </div>
              </div>

              {/* Search Results */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Arama Sonuçları ({searchResults.length})</h2>
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => handleSelectCustomer(result.name)}
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
                </div>
              )}

              {/* No Results Message */}
              {showSearchResults && searchResults.length === 0 && (
                <div className="mt-8 text-center py-12">
                  <p className="text-xl text-gray-600">Sonuç bulunamadı.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
