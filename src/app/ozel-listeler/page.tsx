'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CreateListPopup from '@/components/CreateListPopup';
import Header from '@/components/Header';

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

// Mock Customer Data for address and job info lookups
const mockCustomerData: { [key: string]: {
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
} } = {
  'AHMET DEMİR': {
    jobTitle: 'CEO',
    company: 'Demir Holding',
    homeAddress: 'Atatürk Mah. Cumhuriyet Cad. No:45',
    homeCity: 'İSTANBUL',
    homeCounty: 'KADIKÖY',
    homeCountry: 'TÜRKİYE',
    businessAddress: 'Etiler Mah. Nispetiye Cad. No:12',
    businessCity: 'İSTANBUL',
    businessCounty: 'BEŞİKTAŞ',
    businessCountry: 'TÜRKİYE'
  },
  'MEHMET YILMAZ': {
    jobTitle: 'Girişimci',
    company: 'Yılmaz Yatçılık',
    homeAddress: 'Sahil Yolu No:78',
    homeCity: 'İZMİR',
    homeCounty: 'ÇEŞME',
    homeCountry: 'TÜRKİYE',
    businessAddress: 'Yalıkavak Marina',
    businessCity: 'MUĞLA',
    businessCounty: 'BODRUM',
    businessCountry: 'TÜRKİYE'
  },
  'AYŞE KAYA': {
    jobTitle: 'Genel Müdür',
    company: 'Kaya Teknoloji A.Ş.',
    homeAddress: 'Bahçelievler Mah. Gül Sok. No:12',
    homeCity: 'ANKARA',
    homeCounty: 'ÇANKAYA',
    homeCountry: 'TÜRKİYE',
    businessAddress: 'Çankaya Mah. Atatürk Bulvarı No:45',
    businessCity: 'ANKARA',
    businessCounty: 'ÇANKAYA',
    businessCountry: 'TÜRKİYE'
  },
  'CAN YILDIRIM': {
    jobTitle: 'Yönetim Kurulu Başkanı',
    company: 'Yıldırım Group',
    homeAddress: 'Lara Mah. Sahil Cad. No:56',
    homeCity: 'ANTALYA',
    homeCounty: 'MURATPAŞA',
    homeCountry: 'TÜRKİYE',
    businessAddress: 'Göynük Mah. Sahil Yolu',
    businessCity: 'ANTALYA',
    businessCounty: 'KEMER',
    businessCountry: 'TÜRKİYE'
  },
  'SEDA ARSLAN': {
    jobTitle: 'Kaptan',
    company: 'Arslan Denizcilik',
    homeAddress: 'Çeşme Mah. Marina Sok. No:23',
    homeCity: 'İZMİR',
    homeCounty: 'ÇEŞME',
    homeCountry: 'TÜRKİYE',
    businessAddress: 'Alaçatı Marina',
    businessCity: 'İZMİR',
    businessCounty: 'ÇEŞME',
    businessCountry: 'TÜRKİYE'
  }
};

// Mock Data
const mockListeler: OzelListe[] = [
  {
    id: 1,
    listType: 'FeelGood Obje',
    fullName: 'AHMET DEMİR',
    jobTitle: 'CEO',
    company: 'Demir Holding',
    budget: 'HILLSIDE LEISURE',
    message: 'Yıldönümü kutlaması için özel düzenleme talep edildi.',
    deliveryPlace: 'Otel Resepsiyon',
    deliveryAddress: {
      country: 'TÜRKİYE',
      city: 'İSTANBUL',
      county: 'BEŞİKTAŞ',
      address: 'Etiler Mah. Nispetiye Cad. No:12',
      postalCode: '34337'
    },
    assistantCaptainContact: '+90 532 123 4567',
    boatName: 'Deniz Yıldızı',
    businessCard1: 'MEHMET YILMAZ',
    businessCard2: 'AYŞE KAYA',
    businessCard3: '',
    businessCard4: '',
    businessCard5: ''
  },
  {
    id: 2,
    listType: 'Dergi',
    fullName: 'MEHMET YILMAZ',
    jobTitle: 'Girişimci',
    company: 'Yılmaz Yatçılık',
    budget: 'HILLSIDE PREMIUM',
    message: 'Marina için özel park talebi var.',
    deliveryPlace: 'Marina',
    deliveryAddress: {
      country: 'TÜRKİYE',
      city: 'MUĞLA',
      county: 'BODRUM',
      address: 'Yalıkavak Marina',
      postalCode: '48400'
    },
    assistantCaptainContact: '+90 533 987 6543',
    boatName: 'Blue Dream',
    businessCard1: 'ALİ VURAL',
    businessCard2: '',
    businessCard3: '',
    businessCard4: '',
    businessCard5: ''
  },
  {
    id: 3,
    listType: 'Yatkart',
    fullName: 'AYŞE KAYA',
    jobTitle: 'Genel Müdür',
    company: 'Kaya Teknoloji A.Ş.',
    budget: 'HILLSIDE BUSINESS',
    message: 'Şirket toplantısı için 50 kişilik organizasyon.',
    deliveryPlace: 'Konferans Salonu',
    deliveryAddress: {
      country: 'TÜRKİYE',
      city: 'ANKARA',
      county: 'ÇANKAYA',
      address: 'Çankaya Mah. Atatürk Bulvarı No:45',
      postalCode: '06690'
    },
    assistantCaptainContact: '+90 534 555 7788',
    boatName: '',
    businessCard1: 'ZEYNEP ACAR',
    businessCard2: 'BURAK DEMİR',
    businessCard3: 'CAN ÖZTÜRK',
    businessCard4: '',
    businessCard5: ''
  },
  {
    id: 4,
    listType: 'FeelGood Obje',
    fullName: 'CAN YILDIRIM',
    jobTitle: 'Yönetim Kurulu Başkanı',
    company: 'Yıldırım Group',
    budget: 'HILLSIDE LEISURE',
    message: 'Düğün organizasyonu için özel istekler.',
    deliveryPlace: 'Beach Club',
    deliveryAddress: {
      country: 'TÜRKİYE',
      city: 'ANTALYA',
      county: 'KEMER',
      address: 'Göynük Mah. Sahil Yolu',
      postalCode: '07980'
    },
    assistantCaptainContact: '+90 535 111 2233',
    boatName: 'Sunset Queen',
    businessCard1: 'EMRE ŞAHİN',
    businessCard2: 'DENİZ ÖZER',
    businessCard3: '',
    businessCard4: '',
    businessCard5: ''
  },
  {
    id: 5,
    listType: 'Dergi',
    fullName: 'SEDA ARSLAN',
    jobTitle: 'Kaptan',
    company: 'Arslan Denizcilik',
    budget: 'HILLSIDE PREMIUM',
    message: 'Tekne bakım ve özel servis talebi.',
    deliveryPlace: 'Marina',
    deliveryAddress: {
      country: 'TÜRKİYE',
      city: 'İZMİR',
      county: 'ÇEŞME',
      address: 'Alaçatı Marina',
      postalCode: '35930'
    },
    assistantCaptainContact: '+90 536 444 5566',
    boatName: 'Ocean Breeze',
    businessCard1: 'KEMAL KOÇAK',
    businessCard2: '',
    businessCard3: '',
    businessCard4: '',
    businessCard5: ''
  }
];

export default function OzelListelerPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterListType, setFilterListType] = useState('');
  const [filterBudget, setFilterBudget] = useState('');
  const [filterBusinessCard, setFilterBusinessCard] = useState('');
  const [selectedListe, setSelectedListe] = useState<OzelListe | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCreateEditOpen, setIsCreateEditOpen] = useState(false);
  const [editingListe, setEditingListe] = useState<OzelListe | null>(null);
  const [addressType, setAddressType] = useState<'ev' | 'is' | 'custom'>('custom');
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>('');

  // Filter logic
  const filteredListeler = mockListeler.filter(liste => {
    const matchesSearch =
      liste.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      liste.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      liste.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesListType = !filterListType || liste.listType === filterListType;
    const matchesBudget = !filterBudget || liste.budget === filterBudget;

    const matchesBusinessCard = !filterBusinessCard ||
      liste.businessCard1.toLowerCase().includes(filterBusinessCard.toLowerCase()) ||
      liste.businessCard2.toLowerCase().includes(filterBusinessCard.toLowerCase()) ||
      liste.businessCard3.toLowerCase().includes(filterBusinessCard.toLowerCase()) ||
      liste.businessCard4.toLowerCase().includes(filterBusinessCard.toLowerCase()) ||
      liste.businessCard5.toLowerCase().includes(filterBusinessCard.toLowerCase());

    return matchesSearch && matchesListType && matchesBudget && matchesBusinessCard;
  });

  // Get unique values for filters
  const listTypes = Array.from(new Set(mockListeler.map(l => l.listType)));
  const budgets = Array.from(new Set(mockListeler.map(l => l.budget)));

  const handleViewDetails = (liste: OzelListe) => {
    setSelectedListe(liste);
    setIsPopupOpen(true);
  };

  const handleEdit = (liste: OzelListe) => {
    setEditingListe(liste);
    setIsCreateEditOpen(true);
  };

  const handleCreate = () => {
    setEditingListe(null);
    setSelectedCustomerName('');
    setIsCreateEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-hillside-bg">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Özel Liste Yönetimi</h1>
          <p className="text-gray-600 mt-2">Özel listeleri görüntüleyin, düzenleyin ve yönetin</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-semibold text-accent mb-2">Ara</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ad, şirket veya mesaj ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
            </div>

            {/* Filter: Kartvizit */}
            <div>
              <label className="block text-sm font-semibold text-accent mb-2">Kartvizit</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Kartvizit ara..."
                  value={filterBusinessCard}
                  onChange={(e) => setFilterBusinessCard(e.target.value)}
                  className="w-full px-4 py-3 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>

            {/* Filter: Liste Tipi */}
            <div>
              <label className="block text-sm font-semibold text-accent mb-2">Liste Tipi</label>
              <select
                value={filterListType}
                onChange={(e) => setFilterListType(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Tümü</option>
                {listTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Filter: Bütçe */}
            <div>
              <label className="block text-sm font-semibold text-accent mb-2">Bütçe</label>
              <select
                value={filterBudget}
                onChange={(e) => setFilterBudget(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Tümü</option>
                {budgets.map(budget => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCreate}
              className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Yeni Liste Ekle
            </button>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterListType('');
                setFilterBudget('');
                setFilterBusinessCard('');
              }}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{filteredListeler.length}</span> liste bulundu
          </p>
        </div>

        {/* Liste Cards */}
        <div className="space-y-4">
          {filteredListeler.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">Arama kriterlerine uygun liste bulunamadı.</p>
            </div>
          ) : (
            filteredListeler.map((liste) => (
              <div key={liste.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Side - Main Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold text-accent">{liste.listType}</h3>
                      <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                        {liste.budget}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                      <div>
                        <span className="text-xs text-gray-500">Ad Soyad</span>
                        <p className="font-semibold text-gray-900">{liste.fullName}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Görevi</span>
                        <p className="font-semibold text-gray-900">{liste.jobTitle}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Şirket</span>
                        <p className="font-semibold text-gray-900">{liste.company}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Şehir</span>
                        <p className="font-semibold text-gray-900">{liste.deliveryAddress.city}</p>
                      </div>
                      {liste.boatName && (
                        <div>
                          <span className="text-xs text-gray-500">Tekne Adı</span>
                          <p className="font-semibold text-gray-900">{liste.boatName}</p>
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <span className="text-xs text-gray-500">Mesaj</span>
                      <p className="text-sm text-gray-700">{liste.message}</p>
                    </div>

                    {/* Business Cards */}
                    {(liste.businessCard1 || liste.businessCard2 || liste.businessCard3) && (
                      <div className="flex flex-wrap gap-2">
                        {liste.businessCard1 && (
                          <span className="bg-accent text-white px-3 py-1 rounded text-xs font-semibold">
                            {liste.businessCard1}
                          </span>
                        )}
                        {liste.businessCard2 && (
                          <span className="bg-accent text-white px-3 py-1 rounded text-xs font-semibold">
                            {liste.businessCard2}
                          </span>
                        )}
                        {liste.businessCard3 && (
                          <span className="bg-accent text-white px-3 py-1 rounded text-xs font-semibold">
                            {liste.businessCard3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <button
                      onClick={() => handleViewDetails(liste)}
                      className="flex-1 lg:flex-none px-4 py-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                      Detay
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Detail Popup */}
      {isPopupOpen && selectedListe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="sticky top-0 bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-accent">{selectedListe.listType} - Detaylar</h3>
              <button
                onClick={() => setIsPopupOpen(false)}
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
              {/* Fullname - Tıklanabilir */}
              <div>
                <label className="block text-sm text-accent font-semibold mb-2">Ad Soyad</label>
                <button
                  onClick={() => router.push(`/search/${selectedListe.id}`)}
                  className="w-full text-left px-4 py-3 text-lg font-semibold text-primary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors underline"
                >
                  {selectedListe.fullName}
                </button>
              </div>

              {/* Job Title & Company - Readonly, from customer data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Görevi</label>
                  <input
                    type="text"
                    value={mockCustomerData[selectedListe.fullName]?.jobTitle || selectedListe.jobTitle}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Şirket</label>
                  <input
                    type="text"
                    value={mockCustomerData[selectedListe.fullName]?.company || selectedListe.company}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>
              </div>

              {/* Liste Tipi & Bütçe */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Liste Tipi</label>
                  <input
                    type="text"
                    value={selectedListe.listType}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Bütçe</label>
                  <input
                    type="text"
                    value={selectedListe.budget}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>
              </div>

              {/* Mesaj */}
              <div>
                <label className="block text-sm text-accent font-semibold mb-2">Mesaj</label>
                <textarea
                  value={selectedListe.message}
                  className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg"
                  rows={3}
                  readOnly
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
                      value={
                        addressType === 'ev' && mockCustomerData[selectedListe.fullName]
                          ? mockCustomerData[selectedListe.fullName].homeCountry
                          : addressType === 'is' && mockCustomerData[selectedListe.fullName]
                          ? mockCustomerData[selectedListe.fullName].businessCountry
                          : selectedListe.deliveryAddress.country
                      }
                      className={`w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary ${
                        addressType !== 'custom' ? 'bg-gray-100' : ''
                      }`}
                      readOnly={addressType !== 'custom'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">İl</label>
                    <input
                      type="text"
                      value={
                        addressType === 'ev' && mockCustomerData[selectedListe.fullName]
                          ? mockCustomerData[selectedListe.fullName].homeCity
                          : addressType === 'is' && mockCustomerData[selectedListe.fullName]
                          ? mockCustomerData[selectedListe.fullName].businessCity
                          : selectedListe.deliveryAddress.city
                      }
                      className={`w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary ${
                        addressType !== 'custom' ? 'bg-gray-100' : ''
                      }`}
                      readOnly={addressType !== 'custom'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">İlçe</label>
                    <input
                      type="text"
                      value={
                        addressType === 'ev' && mockCustomerData[selectedListe.fullName]
                          ? mockCustomerData[selectedListe.fullName].homeCounty
                          : addressType === 'is' && mockCustomerData[selectedListe.fullName]
                          ? mockCustomerData[selectedListe.fullName].businessCounty
                          : selectedListe.deliveryAddress.county
                      }
                      className={`w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary ${
                        addressType !== 'custom' ? 'bg-gray-100' : ''
                      }`}
                      readOnly={addressType !== 'custom'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Posta Kodu</label>
                    <input
                      type="text"
                      value={selectedListe.deliveryAddress.postalCode}
                      className={`w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary ${
                        addressType !== 'custom' ? 'bg-gray-100' : ''
                      }`}
                      readOnly={addressType !== 'custom'}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-600 mb-1">Adres</label>
                    <input
                      type="text"
                      value={
                        addressType === 'ev' && mockCustomerData[selectedListe.fullName]
                          ? mockCustomerData[selectedListe.fullName].homeAddress
                          : addressType === 'is' && mockCustomerData[selectedListe.fullName]
                          ? mockCustomerData[selectedListe.fullName].businessAddress
                          : selectedListe.deliveryAddress.address
                      }
                      className={`w-full px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary ${
                        addressType !== 'custom' ? 'bg-gray-100' : ''
                      }`}
                      readOnly={addressType !== 'custom'}
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
                    value={selectedListe.assistantCaptainContact}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Tekne Adı</label>
                  <input
                    type="text"
                    value={selectedListe.boatName || '-'}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>
              </div>

              {/* Business Cards */}
              <div>
                <label className="block text-sm text-accent font-semibold mb-4">Kartvizitler</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const cardKey = `businessCard${num}` as keyof typeof selectedListe;
                    const cardValue = selectedListe[cardKey];
                    return (
                      <div key={num}>
                        <label className="block text-xs text-gray-600 mb-1">Kartvizit {num}</label>
                        <input
                          type="text"
                          defaultValue={cardValue || ''}
                          placeholder="İsim giriniz"
                          className="w-full px-4 py-3 text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Popup Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-300 px-6 py-4 flex justify-between items-center">
              <button
                onClick={() => {
                  if (confirm('Bu listeyi silmek istediğinizden emin misiniz?')) {
                    // TODO: Delete logic will be implemented here
                    alert('Liste silindi!');
                    setIsPopupOpen(false);
                  }
                }}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
              >
                Sil
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    // TODO: Save logic will be implemented here
                    alert('Değişiklikler kaydedildi!');
                    setIsPopupOpen(false);
                  }}
                  className="px-6 py-2 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Popup */}
      <CreateListPopup
        isOpen={isCreateEditOpen}
        onClose={() => setIsCreateEditOpen(false)}
        editingListe={editingListe}
        prefilledCustomerName={selectedCustomerName}
        listTypes={listTypes}
        budgets={budgets}
        mockCustomerData={mockCustomerData}
      />
    </div>
  );
}
