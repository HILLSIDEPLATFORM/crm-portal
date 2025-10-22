'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CreateListPopup from '@/components/CreateListPopup';
import Header from '@/components/Header';

interface CustomerDetail {
  id: number;
  fullName: string;
  hillCode: string;
  jobTitle: string;
  companyName: string;
  referencedBy: string;
  externalReference: string;
  email: string;
  email2: string;
  mobilePhone: string;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  // İş Bilgileri
  businessPhone: string;
  businessCountry: string;
  businessCity: string;
  businessCounty: string;
  businessAddress: string;
  // Ev Bilgileri
  homePhone: string;
  homeCountry: string;
  homeCity: string;
  homeCounty: string;
  homeAddress: string;
  // HBC/HCC Bilgileri
  hbcLastCheckInDate: string;
  hbcRepeatCount: string;
  hccLastMembershipExpireDate: string;
  hccMembershipDuration: string;
  hccLastSpaDate: string;
  hccSpaRep: string;
  hbcLastSpaDate: string;
  familyRelation: string;
  // Badge Bilgileri
  isHccMember: boolean;
  isHbcMember: boolean;
  isDavlist: boolean;
  // Diğer
  magazineSubscription: boolean;
  calendarSubscription: boolean;
  picture: string | null;
}

// Mock data
const mockCustomerData: { [key: number]: CustomerDetail } = {
  1: {
    id: 1,
    fullName: 'MERTCAN YÜKSEL',
    hillCode: 'HILL3+',
    jobTitle: 'VERİ ANALİSTİ',
    companyName: 'HILLSIDE',
    referencedBy: 'ÖMER REFİK DEMİR 15866390110',
    externalReference: '',
    email: 'mertcanyuksel@hillside.com.tr',
    email2: '',
    mobilePhone: '(543) 542 5143',
    birthDate: '20/11/1905',
    gender: 'Erkek',
    maritalStatus: 'Bekar',
    businessPhone: '',
    businessCountry: 'TÜRKİYE',
    businessCity: 'İSTANBUL',
    businessCounty: 'BEŞİKTAŞ',
    businessAddress: 'NİŞPETİYE CADDESİ AHULAR SOKAK NO:6',
    homePhone: '(543) 542 5143',
    homeCountry: 'TÜRKİYE',
    homeCity: 'İSTANBUL',
    homeCounty: 'SANCAKTEPE',
    homeAddress: 'ABDURRAHMANGAZÎ MAHALLESİ GENÇLİK SOKAK',
    hbcLastCheckInDate: '16/09/2025',
    hbcRepeatCount: '3',
    hccLastMembershipExpireDate: '22/01/2026',
    hccMembershipDuration: '10',
    hccLastSpaDate: '17/03/2025',
    hccSpaRep: '3',
    hbcLastSpaDate: '09/06/2025',
    familyRelation: 'YÜKSEL1',
    isHccMember: true,
    isHbcMember: true,
    isDavlist: true,
    magazineSubscription: false,
    calendarSubscription: false,
    picture: null,
  },
};

// Mock Özel Liste Data
const mockOzelListeler = [
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
  }
];

// Mock Customer Data for address and job info lookups
const mockCustomerDataForLists: { [key: string]: {
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
  'MERTCAN YÜKSEL': {
    jobTitle: 'VERİ ANALİSTİ',
    company: 'HILLSIDE',
    homeAddress: 'ABDURRAHMANGAZÎ MAHALLESİ GENÇLİK SOKAK',
    homeCity: 'İSTANBUL',
    homeCounty: 'SANCAKTEPE',
    homeCountry: 'TÜRKİYE',
    businessAddress: 'NİŞPETİYE CADDESİ AHULAR SOKAK NO:6',
    businessCity: 'İSTANBUL',
    businessCounty: 'BEŞİKTAŞ',
    businessCountry: 'TÜRKİYE'
  },
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
  }
};

// Get unique values for filters
const listTypes = Array.from(new Set(mockOzelListeler.map(l => l.listType)));
const budgets = Array.from(new Set(mockOzelListeler.map(l => l.budget)));

// Mock Geçmiş Gönderimler Data
const mockGecmisGonderimler = [
  {
    id: 1,
    barcode: 'BRK-2024-001234',
    contact: 'AHMET DEMİR',
    contactId: 1,
    status: 'Gönderildi',
    year: 2024,
    date: '15.12.2024',
    listType: 'FeelGood Obje',
    receiver: 'MEHMET YILMAZ'
  },
  {
    id: 2,
    barcode: 'ACT-2024-005678',
    contact: 'AYŞE KAYA',
    contactId: 3,
    status: 'Teslim Edildi',
    year: 2024,
    date: '20.11.2024',
    listType: 'Yatkart',
    receiver: 'ZEYNEP ACAR'
  },
  {
    id: 3,
    barcode: 'BRK-2024-002456',
    contact: 'MEHMET YILMAZ',
    contactId: 2,
    status: 'Beklemede',
    year: 2024,
    date: '05.01.2025',
    listType: 'Dergi',
    receiver: 'ALİ VURAL'
  },
  {
    id: 4,
    barcode: 'ACT-2023-009876',
    contact: 'AHMET DEMİR',
    contactId: 1,
    status: 'Gönderildi',
    year: 2023,
    date: '25.12.2023',
    listType: 'FeelGood Obje',
    receiver: 'AYŞE KAYA'
  }
];

// Mock İlgi Grupları Data
const mockIlgiGruplari = [
  {
    id: 1,
    facility: 'HILLSIDE BEACH CLUB',
    interest: 'SANDA SPA'
  },
  {
    id: 2,
    facility: 'HILLSIDE BEACH CLUB',
    interest: 'Pasha Restoran'
  },
  {
    id: 3,
    facility: 'HILLSIDE BEACH CLUB',
    interest: 'Beach Restoran'
  },
  {
    id: 4,
    facility: 'HILLSIDE CITY CLUB',
    interest: 'SANDA SPA'
  }
];

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const customerId = parseInt(params.id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const customer: CustomerDetail = mockCustomerData[customerId] || {
    ...mockCustomerData[1],
    id: customerId,
    fullName: `MİSAFİR ${customerId}`,
  };

  // Badge hesaplama fonksiyonları
  const isHccActive = () => {
    if (!customer.isHccMember || !customer.hccLastMembershipExpireDate) return false;
    const [day, month, year] = customer.hccLastMembershipExpireDate.split('/');
    const expireDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return expireDate > new Date();
  };

  const isHbcActive = () => {
    return customer.isHbcMember;
  };

  const isRepeatGuest = () => {
    return parseInt(customer.hbcRepeatCount || '0') > 4;
  };

  const isActiveThisYear = () => {
    if (!customer.hbcLastCheckInDate) return false;
    const [day, month, year] = customer.hbcLastCheckInDate.split('/');
    const checkInYear = parseInt(year);
    const currentYear = new Date().getFullYear();
    return checkInYear === currentYear && isHccActive();
  };

  // Date states
  const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const [birthDate, setBirthDate] = useState<Date | null>(parseDate(customer.birthDate));
  const [hbcLastCheckInDate, setHbcLastCheckInDate] = useState<Date | null>(parseDate(customer.hbcLastCheckInDate));
  const [hccLastMembershipExpireDate, setHccLastMembershipExpireDate] = useState<Date | null>(parseDate(customer.hccLastMembershipExpireDate));
  const [hccLastSpaDate, setHccLastSpaDate] = useState<Date | null>(parseDate(customer.hccLastSpaDate));
  const [hbcLastSpaDate, setHbcLastSpaDate] = useState<Date | null>(parseDate(customer.hbcLastSpaDate));

  // Additional Info state
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ozelListe');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<any>(null);
  const [addressType, setAddressType] = useState<'ev' | 'is' | 'custom'>('custom');
  const [isCreateListPopupOpen, setIsCreateListPopupOpen] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-hillside-bg">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Detail Card */}
        <div className="bg-white rounded-lg shadow-md">
          {/* Profile Photo Section */}
          <div className="p-6 md:p-10 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {customer.picture ? (
                    <img src={customer.picture} alt={customer.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  )}
                </div>
              </div>

              {/* Photo Upload Form */}
              <div className="flex-1">
                <form className="space-y-4">
                  <div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-dark"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors"
                  >
                    Yükle
                  </button>
                </form>

                {/* Main Form Fields Start Here */}
                <div className="mt-6 space-y-6">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3">
                    {/* HCC Üyesi Badge */}
                    <div className="relative group">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xs transition-all cursor-pointer ${
                        isHccActive()
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                        <div className="font-bold mb-1">HCC Üyesi</div>
                        <div className="text-gray-300">
                          {isHccActive() ? (
                            <>
                              Durum: <span className="text-green-400">Aktif</span><br/>
                              Bitiş: {customer.hccLastMembershipExpireDate}
                            </>
                          ) : (
                            <span className="text-gray-400">Üyelik Yok</span>
                          )}
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>

                    {/* HBC Üyesi Badge */}
                    <div className="relative group">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xs transition-all cursor-pointer ${
                        isHbcActive()
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                        <div className="font-bold mb-1">HBC Üyesi</div>
                        <div className="text-gray-300">
                          {isHbcActive() ? (
                            <>
                              Durum: <span className="text-blue-400">Aktif</span><br/>
                              Son Check-in: {customer.hbcLastCheckInDate}<br/>
                              Toplam Ziyaret: {customer.hbcRepeatCount}
                            </>
                          ) : (
                            <span className="text-gray-400">Üyelik Yok</span>
                          )}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>

                    {/* Repeat Count > 4 Badge */}
                    <div className="relative group">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xs transition-all cursor-pointer ${
                        isRepeatGuest()
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                        <div className="font-bold mb-1">VIP Misafir</div>
                        <div className="text-gray-300">
                          {isRepeatGuest() ? (
                            <>
                              <span className="text-purple-400">5+ Ziyaret</span><br/>
                              Toplam: {customer.hbcRepeatCount} kez
                            </>
                          ) : (
                            <span className="text-gray-400">5'ten az ziyaret</span>
                          )}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>

                    {/* Bu Yıl Check-In + HCC Aktif Badge */}
                    <div className="relative group">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xs transition-all cursor-pointer ${
                        isActiveThisYear()
                          ? 'bg-amber-500 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
                        </svg>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                        <div className="font-bold mb-1">Aktif Misafir 2025</div>
                        <div className="text-gray-300">
                          {isActiveThisYear() ? (
                            <>
                              <span className="text-amber-400">Bu yıl aktif</span><br/>
                              HCC üyeliği + 2025 check-in
                            </>
                          ) : (
                            <span className="text-gray-400">Bu yıl aktif değil</span>
                          )}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DAVLIST Warning - Only show if isDavlist is true */}
                  {customer.isDavlist && (
                    <div className="relative flex items-center justify-center py-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-red-600"></div>
                      </div>
                      <div className="relative px-4 bg-white">
                        <span className="text-red-600 font-bold text-lg tracking-wider">DAVLIST</span>
                      </div>
                    </div>
                  )}

                  {/* Ad ve Soyad */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Ad</label>
                      <input
                        type="text"
                        value={customer.fullName.split(' ')[0]}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Soyad</label>
                      <input
                        type="text"
                        value={customer.fullName.split(' ').slice(1).join(' ')}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* Görevi ve Şirket */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Görevi</label>
                      <input
                        type="text"
                        value={customer.jobTitle}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Şirket</label>
                      <input
                        type="text"
                        value={customer.companyName}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* İç Referans ve Dış Referans */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">İç Referans</label>
                      <input
                        type="text"
                        value={customer.referencedBy}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Dış Referans</label>
                      <input
                        type="text"
                        value={customer.externalReference}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Email ve Hill Kod */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={customer.email}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Hill Kod</label>
                      <input
                        type="text"
                        value={customer.hillCode}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Mobil, Doğum Tarihi, Cinsiyet, Medeni Hal */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Mobil</label>
                      <input
                        type="text"
                        value={customer.mobilePhone}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Doğum Tarihi</label>
                      <DatePicker
                        selected={birthDate}
                        onChange={(date) => setBirthDate(date)}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        yearDropdownItemNumber={100}
                        scrollableYearDropdown
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        placeholderText="Tarih seçiniz"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Cinsiyet</label>
                      <select className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                        <option value="">Seçiniz</option>
                        <option value="1" selected={customer.gender === 'Erkek'}>Erkek</option>
                        <option value="2" selected={customer.gender === 'Kadın'}>Kadın</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Medeni Hal</label>
                      <select className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                        <option value="">Seçiniz</option>
                        <option value="1" selected={customer.maritalStatus === 'Bekar'}>Bekar</option>
                        <option value="2" selected={customer.maritalStatus === 'Evli'}>Evli</option>
                      </select>
                    </div>
                  </div>

                  {/* İş ve Ev Bilgileri - Side by Side */}
                  <div className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* İş Bilgileri Container */}
                      <div className="bg-white border border-gray-300 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-accent mb-6">İş Bilgileri</h3>
                        <div className="space-y-6">
                          {/* Telefon */}
                          <div>
                            <label className="block text-sm text-accent font-semibold mb-2">Telefon</label>
                            <input
                              type="text"
                              value={customer.businessPhone}
                              className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            />
                          </div>

                          {/* Ülke */}
                          <div>
                            <label className="block text-sm text-accent font-semibold mb-2">Ülke</label>
                            <select className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                              <option value="">{customer.businessCountry}</option>
                            </select>
                          </div>

                          {/* Şehir */}
                          <div>
                            <label className="block text-sm text-accent font-semibold mb-2">Şehir</label>
                            <select className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                              <option value="">{customer.businessCity}</option>
                            </select>
                          </div>

                          {/* İlçe */}
                          <div>
                            <label className="block text-sm text-accent font-semibold mb-2">İlçe</label>
                            <select className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                              <option value="">{customer.businessCounty}</option>
                            </select>
                          </div>

                          {/* Divider */}
                          <div className="h-px bg-gray-300"></div>

                          {/* Adres */}
                          <div>
                            <label className="block text-sm text-accent font-semibold mb-2">Adres</label>
                            <input
                              type="text"
                              value={customer.businessAddress}
                              className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Ev Bilgileri Container */}
                      <div className="bg-white border border-gray-300 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-accent mb-6">Ev Bilgileri</h3>
                        <div className="space-y-6">
                          {/* Telefon */}
                          <div>
                            <label className="block text-sm text-accent font-semibold mb-2">Telefon</label>
                            <input
                              type="text"
                              value={customer.homePhone}
                              className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            />
                          </div>

                          {/* Ülke */}
                          <div>
                            <label className="block text-sm text-accent font-semibold mb-2">Ülke</label>
                            <select className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                              <option value="">{customer.homeCountry}</option>
                            </select>
                          </div>

                          {/* Şehir */}
                          <div>
                            <label className="block text-sm text-accent font-semibold mb-2">Şehir</label>
                            <select className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                              <option value="">{customer.homeCity}</option>
                            </select>
                          </div>

                          {/* İlçe */}
                          <div>
                            <label className="block text-sm text-accent font-semibold mb-2">İlçe</label>
                            <select className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                              <option value="">{customer.homeCounty}</option>
                            </select>
                          </div>

                          {/* Divider */}
                          <div className="h-px bg-gray-300"></div>

                          {/* Adres */}
                          <div>
                            <label className="block text-sm text-accent font-semibold mb-2">Adres</label>
                            <input
                              type="text"
                              value={customer.homeAddress}
                              className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HBC/HCC Bilgileri */}
                  <div className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">HBC Last Check-In Date</label>
                        <DatePicker
                          selected={hbcLastCheckInDate}
                          onChange={(date) => setHbcLastCheckInDate(date)}
                          dateFormat="dd/MM/yyyy"
                          showYearDropdown
                          showMonthDropdown
                          dropdownMode="select"
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-100"
                          placeholderText="Tarih seçiniz"
                          readOnly
                          disabled
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">HBC Repeat Count</label>
                        <input
                          type="text"
                          value={customer.hbcRepeatCount}
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-100"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">HCC Last Membership Expire Date</label>
                        <DatePicker
                          selected={hccLastMembershipExpireDate}
                          onChange={(date) => setHccLastMembershipExpireDate(date)}
                          dateFormat="dd/MM/yyyy"
                          showYearDropdown
                          showMonthDropdown
                          dropdownMode="select"
                          minDate={new Date()}
                          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 5))}
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-100"
                          placeholderText="Tarih seçiniz"
                          readOnly
                          disabled
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">HCC Üyelik Süresi (Ay)</label>
                        <input
                          type="text"
                          value={customer.hccMembershipDuration}
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-100"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">HCC Last Spa Date</label>
                        <DatePicker
                          selected={hccLastSpaDate}
                          onChange={(date) => setHccLastSpaDate(date)}
                          dateFormat="dd/MM/yyyy"
                          showYearDropdown
                          showMonthDropdown
                          dropdownMode="select"
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-100"
                          placeholderText="Tarih seçiniz"
                          readOnly
                          disabled
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">HCC Spa Rep</label>
                        <input
                          type="text"
                          value={customer.hccSpaRep}
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-100"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">HBC Last Spa Date</label>
                        <DatePicker
                          selected={hbcLastSpaDate}
                          onChange={(date) => setHbcLastSpaDate(date)}
                          dateFormat="dd/MM/yyyy"
                          showYearDropdown
                          showMonthDropdown
                          dropdownMode="select"
                          minDate={new Date()}
                          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 5))}
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-100"
                          placeholderText="Tarih seçiniz"
                          readOnly
                          disabled
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">Aile Yakınlığı</label>
                        <input
                          type="text"
                          value={customer.familyRelation}
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ek Bilgiler Section */}
          <div className="mt-6 bg-gray-50 rounded-lg border border-gray-300">
            {/* Toggle Header */}
            <button
              onClick={() => setIsAdditionalInfoOpen(!isAdditionalInfoOpen)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-t-lg"
            >
              <h3 className="text-xl font-bold text-gray-900">Ek Bilgiler</h3>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`text-accent transition-transform ${isAdditionalInfoOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Expandable Content */}
            {isAdditionalInfoOpen && (
              <div className="border-t border-gray-300">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 px-6 pt-6 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('ozelListe')}
                    className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                      activeTab === 'ozelListe'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Özel Liste
                  </button>
                  <button
                    onClick={() => setActiveTab('gecmisGonderimler')}
                    className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                      activeTab === 'gecmisGonderimler'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Geçmiş Gönderimler
                  </button>
                  <button
                    onClick={() => setActiveTab('notlar')}
                    className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                      activeTab === 'notlar'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Notlar
                  </button>
                  <button
                    onClick={() => setActiveTab('ilgiGruplari')}
                    className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                      activeTab === 'ilgiGruplari'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    İlgi Grupları
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'ozelListe' && (
                    <div className="space-y-3">
                      {/* Yeni Liste Ekle Button */}
                      <button
                        onClick={() => setIsCreateListPopupOpen(true)}
                        className="w-full px-6 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Yeni Liste Ekle
                      </button>

                      {mockOzelListeler.map((liste) => (
                        <div key={liste.id} className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <button
                            onClick={() => {
                              setSelectedList(liste);
                              setIsPopupOpen(true);
                            }}
                            className="w-full text-left"
                          >
                            <div className="flex flex-col gap-3">
                              <div className="flex items-start justify-between">
                                <h4 className="font-bold text-accent text-lg">{liste.listType}</h4>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-accent">
                                  <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-600">Ad Soyad: </span>
                                  <span className="font-semibold text-gray-900">{liste.fullName}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Bütçe: </span>
                                  <span className="font-semibold text-primary">{liste.budget}</span>
                                </div>
                              </div>

                              <div className="border-t border-gray-200 pt-2">
                                <div className="text-sm mb-2">
                                  <span className="text-gray-600">Mesaj: </span>
                                  <span className="text-gray-900">{liste.message}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 text-xs">
                                  {liste.businessCard1 && (
                                    <span className="bg-accent text-white px-2 py-1 rounded">
                                      {liste.businessCard1}
                                    </span>
                                  )}
                                  {liste.businessCard2 && (
                                    <span className="bg-accent text-white px-2 py-1 rounded">
                                      {liste.businessCard2}
                                    </span>
                                  )}
                                  {liste.businessCard3 && (
                                    <span className="bg-accent text-white px-2 py-1 rounded">
                                      {liste.businessCard3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'gecmisGonderimler' && (
                    <div className="space-y-3">
                      {mockGecmisGonderimler.map((gonderim) => (
                        <div key={gonderim.id} className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Barkod/Acente */}
                            <div>
                              <span className="block text-xs text-gray-500 mb-1">Barkod/Acente</span>
                              <span className="text-sm font-semibold text-accent">{gonderim.barcode}</span>
                            </div>

                            {/* Contact - Tıklanabilir */}
                            <div>
                              <span className="block text-xs text-gray-500 mb-1">Contact</span>
                              <button
                                onClick={() => router.push(`/search/${gonderim.contactId}`)}
                                className="text-sm font-semibold text-primary hover:underline"
                              >
                                {gonderim.contact}
                              </button>
                            </div>

                            {/* Durum */}
                            <div>
                              <span className="block text-xs text-gray-500 mb-1">Durum</span>
                              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                                gonderim.status === 'Gönderildi' ? 'bg-blue-100 text-blue-800' :
                                gonderim.status === 'Teslim Edildi' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {gonderim.status}
                              </span>
                            </div>

                            {/* Yıl */}
                            <div>
                              <span className="block text-xs text-gray-500 mb-1">Yıl</span>
                              <span className="text-sm font-semibold text-gray-900">{gonderim.year}</span>
                            </div>

                            {/* Tarih */}
                            <div>
                              <span className="block text-xs text-gray-500 mb-1">Tarih</span>
                              <span className="text-sm font-semibold text-gray-900">{gonderim.date}</span>
                            </div>

                            {/* Özel Liste Tipi */}
                            <div>
                              <span className="block text-xs text-gray-500 mb-1">Özel Liste Tipi</span>
                              <span className="text-sm font-semibold text-gray-900">{gonderim.listType}</span>
                            </div>

                            {/* Alan Kişi */}
                            <div>
                              <span className="block text-xs text-gray-500 mb-1">Alan Kişi</span>
                              <span className="text-sm font-semibold text-gray-900">{gonderim.receiver}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'notlar' && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-4 py-3 border-b border-gray-200">
                        <span className="text-sm text-gray-500 min-w-[120px]">15.10.2025 14:30</span>
                        <p className="text-gray-900">Müşteri ile görüşme yapıldı. Yeni rezervasyon talebi var.</p>
                      </div>
                      <div className="flex items-start gap-4 py-3 border-b border-gray-200">
                        <span className="text-sm text-gray-500 min-w-[120px]">10.10.2025 09:15</span>
                        <p className="text-gray-900">Özel talepleri not edildi: Deniz manzaralı oda tercihi.</p>
                      </div>
                      <div className="flex items-start gap-4 py-3 border-b border-gray-200">
                        <span className="text-sm text-gray-500 min-w-[120px]">05.10.2025 16:45</span>
                        <p className="text-gray-900">İletişim bilgileri güncellendi.</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'ilgiGruplari' && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-gray-300">
                            <th className="text-left py-3 px-4 text-sm font-bold text-accent">Facility</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-accent">Interest</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockIlgiGruplari.map((grup) => (
                            <tr key={grup.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                              <td className="py-3 px-4">
                                <span className="text-sm font-semibold text-primary">{grup.facility}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm font-semibold text-primary">{grup.interest}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === 'rezervasyonlar' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3 border-b border-gray-200">
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Rezervasyon No</span>
                          <span className="text-gray-900">RES-2025-001234</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Tarih</span>
                          <span className="text-gray-900">20.12.2025 - 25.12.2025</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Oda Tipi</span>
                          <span className="text-gray-900">Deluxe Suite</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Durum</span>
                          <span className="text-primary font-semibold">Onaylandı</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3 border-b border-gray-200">
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Rezervasyon No</span>
                          <span className="text-gray-900">RES-2025-001189</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Tarih</span>
                          <span className="text-gray-900">15.08.2025 - 22.08.2025</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Oda Tipi</span>
                          <span className="text-gray-900">Premium Room</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Durum</span>
                          <span className="text-gray-500">Tamamlandı</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'odemeler' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3 border-b border-gray-200">
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Ödeme Tarihi</span>
                          <span className="text-gray-900">15.10.2025</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Tutar</span>
                          <span className="text-gray-900">₺15,500.00</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Ödeme Yöntemi</span>
                          <span className="text-gray-900">Kredi Kartı</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Durum</span>
                          <span className="text-primary font-semibold">Ödendi</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3 border-b border-gray-200">
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Ödeme Tarihi</span>
                          <span className="text-gray-900">08.08.2025</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Tutar</span>
                          <span className="text-gray-900">₺22,800.00</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Ödeme Yöntemi</span>
                          <span className="text-gray-900">Havale/EFT</span>
                        </div>
                        <div>
                          <span className="text-sm text-accent font-semibold block mb-1">Durum</span>
                          <span className="text-primary font-semibold">Ödendi</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'aktiviteler' && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-4 py-3 border-b border-gray-200">
                        <span className="text-sm text-gray-500 min-w-[120px]">14.10.2025 18:20</span>
                        <p className="text-gray-900"><span className="font-semibold">Ahmet Yılmaz</span> müşteri bilgilerini güncelledi</p>
                      </div>
                      <div className="flex items-start gap-4 py-3 border-b border-gray-200">
                        <span className="text-sm text-gray-500 min-w-[120px]">12.10.2025 11:30</span>
                        <p className="text-gray-900"><span className="font-semibold">Ayşe Demir</span> yeni rezervasyon ekledi</p>
                      </div>
                      <div className="flex items-start gap-4 py-3 border-b border-gray-200">
                        <span className="text-sm text-gray-500 min-w-[120px]">10.10.2025 09:45</span>
                        <p className="text-gray-900"><span className="font-semibold">Mehmet Kaya</span> not ekledi</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'belgeler' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                          <div>
                            <p className="font-semibold text-gray-900">Kimlik Fotokopisi.pdf</p>
                            <p className="text-sm text-gray-500">Yükleme: 15.10.2025 - 245 KB</p>
                          </div>
                        </div>
                        <button className="text-primary hover:text-primary-dark font-semibold">İndir</button>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                          <div>
                            <p className="font-semibold text-gray-900">Sözleşme.pdf</p>
                            <p className="text-sm text-gray-500">Yükleme: 10.10.2025 - 1.2 MB</p>
                          </div>
                        </div>
                        <button className="text-primary hover:text-primary-dark font-semibold">İndir</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-10 py-3 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors text-base">
                DÜZENLE
              </button>
              <button className="px-10 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors text-base">
                PAYLAŞ
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Popup Modal */}
      {isPopupOpen && selectedList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="sticky top-0 bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-accent">{selectedList.listType}</h3>
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
                  onClick={() => router.push(`/search/${selectedList.id}`)}
                  className="w-full text-left px-4 py-3 text-lg font-semibold text-primary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors underline"
                >
                  {selectedList.fullName}
                </button>
              </div>

              {/* Job Title & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Görevi</label>
                  <input
                    type="text"
                    value={selectedList.jobTitle}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Şirket</label>
                  <input
                    type="text"
                    value={selectedList.company}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
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
                    value={selectedList.listType}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Bütçe</label>
                  <input
                    type="text"
                    value={selectedList.budget}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    readOnly
                  />
                </div>
              </div>

              {/* Mesaj */}
              <div>
                <label className="block text-sm text-accent font-semibold mb-2">Mesaj</label>
                <textarea
                  value={selectedList.message}
                  className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
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
                        addressType === 'ev'
                          ? customer.homeCountry
                          : addressType === 'is'
                          ? customer.businessCountry
                          : selectedList.deliveryAddress.country
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
                        addressType === 'ev'
                          ? customer.homeCity
                          : addressType === 'is'
                          ? customer.businessCity
                          : selectedList.deliveryAddress.city
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
                        addressType === 'ev'
                          ? customer.homeCounty
                          : addressType === 'is'
                          ? customer.businessCounty
                          : selectedList.deliveryAddress.county
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
                      value={selectedList.deliveryAddress.postalCode}
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
                        addressType === 'ev'
                          ? customer.homeAddress
                          : addressType === 'is'
                          ? customer.businessAddress
                          : selectedList.deliveryAddress.address
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
                    value={selectedList.assistantCaptainContact}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Tekne Adı</label>
                  <input
                    type="text"
                    value={selectedList.boatName || '-'}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    readOnly
                  />
                </div>
              </div>

              {/* Business Cards */}
              <div>
                <label className="block text-sm text-accent font-semibold mb-4">Kartvizitler</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const cardKey = `businessCard${num}` as keyof typeof selectedList;
                    const cardValue = selectedList[cardKey];
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
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-300 px-6 py-4 flex justify-end gap-4">
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
      )}

      {/* Create List Popup */}
      <CreateListPopup
        isOpen={isCreateListPopupOpen}
        onClose={() => setIsCreateListPopupOpen(false)}
        prefilledCustomerName={customer.fullName}
        listTypes={listTypes}
        budgets={budgets}
        mockCustomerData={mockCustomerDataForLists}
      />
    </div>
  );
}
