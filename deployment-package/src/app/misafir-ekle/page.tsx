'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function MisafirEklePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tcKimlik: '',
    birthDate: '',
    gender: '',
    nationality: '',
    company: '',
    position: '',
    homePhone: '',
    homeAddress: '',
    homeCity: '',
    homeCounty: '',
    homeCountry: '',
    workPhone: '',
    workAddress: '',
    workCity: '',
    workCounty: '',
    workCountry: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Misafir ekleniyor:', formData);
    // TODO: API call yapılacak
    alert('Misafir başarıyla eklendi!');
    // Form temizle
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      tcKimlik: '',
      birthDate: '',
      gender: '',
      nationality: '',
      company: '',
      position: '',
      homePhone: '',
      homeAddress: '',
      homeCity: '',
      homeCounty: '',
      homeCountry: '',
      workPhone: '',
      workAddress: '',
      workCity: '',
      workCounty: '',
      workCountry: '',
      notes: '',
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-12 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 border border-hillside-border">
          <h1 className="text-2xl md:text-3xl font-bold text-accent mb-8">YENİ MİSAFİR EKLE</h1>

          <form onSubmit={handleSubmit}>
            {/* Kişisel Bilgiler */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-accent pb-2">Kişisel Bilgiler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ad */}
                <div>
                  <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                    Ad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                {/* Soyad */}
                <div>
                  <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                    Soyad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                {/* Mobil */}
                <div>
                  <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                    Mobil <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                {/* TCKN */}
                <div>
                  <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                    TCKN
                  </label>
                  <input
                    type="text"
                    name="tcKimlik"
                    value={formData.tcKimlik}
                    onChange={handleInputChange}
                    maxLength={11}
                    className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                {/* Doğum Tarihi */}
                <div>
                  <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                    Doğum Tarihi
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                {/* Cinsiyet */}
                <div>
                  <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                    Cinsiyet
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="">Seçiniz</option>
                    <option value="erkek">Erkek</option>
                    <option value="kadın">Kadın</option>
                  </select>
                </div>

                {/* Uyruk */}
                <div>
                  <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                    Uyruk
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Türkiye"
                  />
                </div>
              </div>
            </div>

            {/* İş Bilgileri */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-accent pb-2">İş Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Şirket */}
                <div>
                  <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                    Şirket
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                {/* Görev */}
                <div>
                  <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                    Görev
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full h-12 md:h-[61px] px-4 md:px-6 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Adres Bilgileri */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-accent pb-2">Adres Bilgileri</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* İş Bilgileri Container */}
                <div className="bg-white border border-gray-300 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-accent mb-6">İş Bilgileri</h3>
                  <div className="space-y-6">
                    {/* Telefon */}
                    <div>
                      <label className="block text-sm text-accent font-semibold mb-2">Telefon</label>
                      <input
                        type="tel"
                        name="workPhone"
                        value={formData.workPhone || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>

                    {/* Ülke */}
                    <div>
                      <label className="block text-sm text-accent font-semibold mb-2">Ülke</label>
                      <select
                        name="workCountry"
                        value={formData.workCountry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="">Seçiniz</option>
                        <option value="TÜRKİYE">TÜRKİYE</option>
                      </select>
                    </div>

                    {/* Şehir */}
                    <div>
                      <label className="block text-sm text-accent font-semibold mb-2">Şehir</label>
                      <select
                        name="workCity"
                        value={formData.workCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="">Seçiniz</option>
                        <option value="İSTANBUL">İSTANBUL</option>
                        <option value="ANKARA">ANKARA</option>
                        <option value="İZMİR">İZMİR</option>
                      </select>
                    </div>

                    {/* İlçe */}
                    <div>
                      <label className="block text-sm text-accent font-semibold mb-2">İlçe</label>
                      <select
                        name="workCounty"
                        value={formData.workCounty || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="">Seçiniz</option>
                        <option value="BEŞİKTAŞ">BEŞİKTAŞ</option>
                        <option value="KADIKÖY">KADIKÖY</option>
                        <option value="SANCAKTEPE">SANCAKTEPE</option>
                      </select>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-300"></div>

                    {/* Adres */}
                    <div>
                      <label className="block text-sm text-accent font-semibold mb-2">Adres</label>
                      <input
                        type="text"
                        name="workAddress"
                        value={formData.workAddress}
                        onChange={handleInputChange}
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
                        type="tel"
                        name="homePhone"
                        value={formData.homePhone || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>

                    {/* Ülke */}
                    <div>
                      <label className="block text-sm text-accent font-semibold mb-2">Ülke</label>
                      <select
                        name="homeCountry"
                        value={formData.homeCountry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="">Seçiniz</option>
                        <option value="TÜRKİYE">TÜRKİYE</option>
                      </select>
                    </div>

                    {/* Şehir */}
                    <div>
                      <label className="block text-sm text-accent font-semibold mb-2">Şehir</label>
                      <select
                        name="homeCity"
                        value={formData.homeCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="">Seçiniz</option>
                        <option value="İSTANBUL">İSTANBUL</option>
                        <option value="ANKARA">ANKARA</option>
                        <option value="İZMİR">İZMİR</option>
                      </select>
                    </div>

                    {/* İlçe */}
                    <div>
                      <label className="block text-sm text-accent font-semibold mb-2">İlçe</label>
                      <select
                        name="homeCounty"
                        value={formData.homeCounty || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="">Seçiniz</option>
                        <option value="BEŞİKTAŞ">BEŞİKTAŞ</option>
                        <option value="KADIKÖY">KADIKÖY</option>
                        <option value="SANCAKTEPE">SANCAKTEPE</option>
                      </select>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-300"></div>

                    {/* Adres */}
                    <div>
                      <label className="block text-sm text-accent font-semibold mb-2">Adres</label>
                      <input
                        type="text"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notlar */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-accent pb-2">Ek Bilgiler</h2>
              <div>
                <label className="block text-accent font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
                  Notlar
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 md:px-6 py-3 border border-hillside-border rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Misafir hakkında ek notlar..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => router.push('/search')}
                className="w-full md:w-48 h-12 md:h-[61px] bg-gray-500 hover:bg-gray-600 text-white font-bold text-base md:text-lg rounded-lg transition-colors uppercase shadow-md hover:shadow-lg"
              >
                İptal
              </button>
              <button
                type="submit"
                className="w-full md:w-48 h-12 md:h-[61px] bg-accent hover:bg-accent-dark text-white font-bold text-base md:text-lg rounded-lg transition-colors uppercase shadow-md hover:shadow-lg"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
