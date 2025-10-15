'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    magazineSubscription: false,
    calendarSubscription: false,
    picture: null,
  },
};

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const customerId = parseInt(params.id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const customer: CustomerDetail = mockCustomerData[customerId] || {
    ...mockCustomerData[1],
    id: customerId,
    fullName: `MİSAFİR ${customerId}`,
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
  const [activeTab, setActiveTab] = useState('notlar');

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    localStorage.removeItem('hillside_crm_auth');
    window.location.href = '/login';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-hillside-bg">
      {/* Header */}
      <header className="bg-white shadow-sm py-6 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </header>

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
                  {/* Ad Soyad ve Hill Kod */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex-1">
                      <label className="block text-sm text-accent font-semibold mb-2">Ad Soyad</label>
                      <input
                        type="text"
                        value={customer.fullName}
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

                  {/* Email ve Email2 */}
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
                      <label className="block text-sm text-accent font-semibold mb-2">Email2</label>
                      <input
                        type="text"
                        value={customer.email2}
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
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          placeholderText="Tarih seçiniz"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">HBC Repeat Count</label>
                        <input
                          type="text"
                          value={customer.hbcRepeatCount}
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
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
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          placeholderText="Tarih seçiniz"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">HCC Üyelik Süresi (Ay)</label>
                        <input
                          type="text"
                          value={customer.hccMembershipDuration}
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
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
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          placeholderText="Tarih seçiniz"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-accent font-semibold mb-2">HCC Spa Rep</label>
                        <input
                          type="text"
                          value={customer.hccSpaRep}
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
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
                          className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          placeholderText="Tarih seçiniz"
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
                    onClick={() => setActiveTab('rezervasyonlar')}
                    className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                      activeTab === 'rezervasyonlar'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Rezervasyonlar
                  </button>
                  <button
                    onClick={() => setActiveTab('odemeler')}
                    className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                      activeTab === 'odemeler'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Ödemeler
                  </button>
                  <button
                    onClick={() => setActiveTab('aktiviteler')}
                    className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                      activeTab === 'aktiviteler'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Aktiviteler
                  </button>
                  <button
                    onClick={() => setActiveTab('belgeler')}
                    className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                      activeTab === 'belgeler'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Belgeler
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
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
    </div>
  );
}
