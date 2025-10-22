'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';

interface Condition {
  field: string;
  operator: string;
  value: string;
}

interface Badge {
  id: number;
  name: string;
  color: string;
  icon: string;
  conditions: Condition[];
  logicOperator: 'AND' | 'OR';  // Koşullar arası bağlantı (AND/OR)
  description: string;
  isActive: boolean;
}

// Mock badge data
const mockBadges: Badge[] = [
  {
    id: 1,
    name: 'HCC Üyesi',
    color: 'green',
    icon: 'check-circle',
    conditions: [
      { field: 'isHccMember', operator: 'equals', value: 'true' }
    ],
    logicOperator: 'AND',
    description: 'HCC üyeliği aktif olan misafirler için',
    isActive: true,
  },
  {
    id: 2,
    name: 'HBC Üyesi',
    color: 'blue',
    icon: 'home',
    conditions: [
      { field: 'isHbcMember', operator: 'equals', value: 'true' }
    ],
    logicOperator: 'AND',
    description: 'HBC üyeliği olan misafirler için',
    isActive: true,
  },
  {
    id: 3,
    name: 'VIP Misafir (5+)',
    color: 'purple',
    icon: 'users',
    conditions: [
      { field: 'hbcRepeatCount', operator: 'greaterThan', value: '4' }
    ],
    logicOperator: 'AND',
    description: 'Repeat count 4\'ten büyük misafirler için',
    isActive: true,
  },
  {
    id: 4,
    name: 'Aktif Misafir 2025',
    color: 'amber',
    icon: 'calendar',
    conditions: [
      { field: 'hbcLastCheckInDate', operator: 'thisYear', value: '2025' },
      { field: 'isHccMember', operator: 'equals', value: 'true' }
    ],
    logicOperator: 'AND',
    description: 'Bu yıl check-in yapmış VE HCC üyeliği aktif olan misafirler için',
    isActive: true,
  },
];

export default function BadgeYonetimiPage() {
  const router = useRouter();
  const [badges, setBadges] = useState<Badge[]>(mockBadges);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [formName, setFormName] = useState('');
  const [formColor, setFormColor] = useState('green');
  const [formIcon, setFormIcon] = useState('check-circle');
  const [formConditions, setFormConditions] = useState<Condition[]>([
    { field: '', operator: 'equals', value: '' }
  ]);
  const [formLogicOperator, setFormLogicOperator] = useState<'AND' | 'OR'>('AND');
  const [formDescription, setFormDescription] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);

  const handleAddNew = () => {
    setEditingBadge(null);
    setFormName('');
    setFormColor('green');
    setFormIcon('check-circle');
    setFormConditions([{ field: '', operator: 'equals', value: '' }]);
    setFormLogicOperator('AND');
    setFormDescription('');
    setFormIsActive(true);
    setIsPopupOpen(true);
  };

  const handleEdit = (badge: Badge) => {
    setEditingBadge(badge);
    setFormName(badge.name);
    setFormColor(badge.color);
    setFormIcon(badge.icon);
    setFormConditions(badge.conditions.length > 0 ? [...badge.conditions] : [{ field: '', operator: 'equals', value: '' }]);
    setFormLogicOperator(badge.logicOperator);
    setFormDescription(badge.description);
    setFormIsActive(badge.isActive);
    setIsPopupOpen(true);
  };

  const addCondition = () => {
    setFormConditions([...formConditions, { field: '', operator: 'equals', value: '' }]);
  };

  const removeCondition = (index: number) => {
    if (formConditions.length > 1) {
      setFormConditions(formConditions.filter((_, i) => i !== index));
    }
  };

  const updateCondition = (index: number, field: keyof Condition, value: string) => {
    const updated = [...formConditions];
    updated[index] = { ...updated[index], [field]: value };
    setFormConditions(updated);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bu badge\'i silmek istediğinizden emin misiniz?')) {
      setBadges(badges.filter(b => b.id !== id));
      alert('Badge silindi!');
    }
  };

  const handleSave = () => {
    if (!formName) {
      alert('Lütfen badge adını girin!');
      return;
    }

    // Validate conditions
    const validConditions = formConditions.filter(c => c.field && c.value);
    if (validConditions.length === 0) {
      alert('Lütfen en az bir koşul ekleyin!');
      return;
    }

    if (editingBadge) {
      // Update existing badge
      setBadges(badges.map(b =>
        b.id === editingBadge.id
          ? {
              ...b,
              name: formName,
              color: formColor,
              icon: formIcon,
              conditions: validConditions,
              logicOperator: formLogicOperator,
              description: formDescription,
              isActive: formIsActive,
            }
          : b
      ));
      alert('Badge güncellendi!');
    } else {
      // Add new badge
      const newBadge: Badge = {
        id: badges.length > 0 ? Math.max(...badges.map(b => b.id)) + 1 : 1,
        name: formName,
        color: formColor,
        icon: formIcon,
        conditions: validConditions,
        logicOperator: formLogicOperator,
        description: formDescription,
        isActive: formIsActive,
      };
      setBadges([...badges, newBadge]);
      alert('Yeni badge eklendi!');
    }

    setIsPopupOpen(false);
  };

  const toggleActive = (id: number) => {
    setBadges(badges.map(b =>
      b.id === id ? { ...b, isActive: !b.isActive } : b
    ));
  };

  const filteredBadges = badges.filter(badge =>
    badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      amber: 'bg-amber-500',
      red: 'bg-red-500',
      gray: 'bg-gray-500',
      pink: 'bg-pink-500',
      indigo: 'bg-indigo-500',
    };
    return colors[color] || 'bg-gray-500';
  };

  const getIconSvg = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'check-circle': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      'home': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      'users': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      'calendar': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
      'star': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
      'award': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      ),
    };
    return icons[iconName] || icons['check-circle'];
  };

  return (
    <div className="min-h-screen bg-hillside-bg">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Badge Yönetimi</h1>
              <p className="text-gray-600">Misafir detay sayfasında gösterilen badge'leri yönetin</p>
            </div>
            <button
              onClick={handleAddNew}
              className="px-6 py-3 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Yeni Badge Ekle
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Badge ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Badge List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              className={`bg-white rounded-lg shadow-md p-6 transition-all ${
                badge.isActive ? 'border-2 border-transparent' : 'opacity-60 border-2 border-gray-300'
              }`}
            >
              {/* Badge Preview */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getColorClass(badge.color)} text-white shadow-lg`}>
                  {getIconSvg(badge.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{badge.name}</h3>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    badge.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {badge.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">{badge.description}</p>

              {/* Conditions */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-500 mb-2">Koşullar ({badge.logicOperator}):</p>
                <div className="space-y-1">
                  {badge.conditions.map((cond, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      {idx > 0 && (
                        <span className="text-xs font-bold text-accent">{badge.logicOperator}</span>
                      )}
                      <code className="text-xs font-mono text-gray-800">
                        {cond.field} {cond.operator} {cond.value}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(badge.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    badge.isActive
                      ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                      : 'bg-green-100 hover:bg-green-200 text-green-800'
                  }`}
                >
                  {badge.isActive ? 'Pasif Et' : 'Aktif Et'}
                </button>
                <button
                  onClick={() => handleEdit(badge)}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded-lg transition-colors"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(badge.id)}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 font-semibold rounded-lg transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBadges.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">Arama sonucu bulunamadı.</p>
          </div>
        )}
      </main>

      {/* Add/Edit Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="sticky top-0 bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-accent">
                {editingBadge ? 'Badge Düzenle' : 'Yeni Badge Ekle'}
              </h3>
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
              {/* Badge Name */}
              <div>
                <label className="block text-sm text-accent font-semibold mb-2">Badge Adı *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Örn: HCC Üyesi"
                  className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              {/* Color and Icon */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Renk</label>
                  <select
                    value={formColor}
                    onChange={(e) => setFormColor(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="green">Yeşil</option>
                    <option value="blue">Mavi</option>
                    <option value="purple">Mor</option>
                    <option value="amber">Turuncu</option>
                    <option value="red">Kırmızı</option>
                    <option value="gray">Gri</option>
                    <option value="pink">Pembe</option>
                    <option value="indigo">İndigo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Icon</label>
                  <select
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="check-circle">Check Circle</option>
                    <option value="home">Home</option>
                    <option value="users">Users</option>
                    <option value="calendar">Calendar</option>
                    <option value="star">Star</option>
                    <option value="award">Award</option>
                  </select>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-3">Önizleme:</p>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getColorClass(formColor)} text-white shadow-lg`}>
                  {getIconSvg(formIcon)}
                </div>
              </div>

              {/* Logic Operator (AND/OR) */}
              {formConditions.length > 1 && (
                <div>
                  <label className="block text-sm text-accent font-semibold mb-2">Koşullar Arası Bağlantı</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormLogicOperator('AND')}
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
                        formLogicOperator === 'AND'
                          ? 'bg-accent text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      VE (AND)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormLogicOperator('OR')}
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
                        formLogicOperator === 'OR'
                          ? 'bg-accent text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      VEYA (OR)
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {formLogicOperator === 'AND' ? 'Tüm koşullar sağlanmalı' : 'En az bir koşul sağlanmalı'}
                  </p>
                </div>
              )}

              {/* Dynamic Conditions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm text-accent font-semibold">Koşullar *</label>
                  <button
                    type="button"
                    onClick={addCondition}
                    className="px-3 py-1 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded transition-colors flex items-center gap-1"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Koşul Ekle
                  </button>
                </div>

                <div className="space-y-4">
                  {formConditions.map((condition, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">Koşul {index + 1}</span>
                        {formConditions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCondition(index)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {/* Field */}
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Alan</label>
                          <select
                            value={condition.field}
                            onChange={(e) => updateCondition(index, 'field', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          >
                            <option value="">Seçiniz</option>
                            <option value="isHccMember">HCC Üyeliği</option>
                            <option value="isHbcMember">HBC Üyeliği</option>
                            <option value="hbcRepeatCount">HBC Repeat Count</option>
                            <option value="hbcLastCheckInDate">HBC Last Check-In Date</option>
                            <option value="hccLastMembershipExpireDate">HCC Membership Expire Date</option>
                            <option value="isDavlist">DAVLIST</option>
                          </select>
                        </div>

                        {/* Operator */}
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Operatör</label>
                          <select
                            value={condition.operator}
                            onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          >
                            <option value="equals">Eşittir (=)</option>
                            <option value="notEquals">Eşit Değildir (!=)</option>
                            <option value="greaterThan">Büyüktür (&gt;)</option>
                            <option value="lessThan">Küçüktür (&lt;)</option>
                            <option value="greaterThanOrEqual">Büyük veya Eşittir (&gt;=)</option>
                            <option value="lessThanOrEqual">Küçük veya Eşittir (&lt;=)</option>
                            <option value="thisYear">Bu Yıl</option>
                            <option value="contains">İçerir</option>
                          </select>
                        </div>

                        {/* Value */}
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Değer</label>
                          <input
                            type="text"
                            value={condition.value}
                            onChange={(e) => updateCondition(index, 'value', e.target.value)}
                            placeholder="Örn: true, 4, 2025"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-accent font-semibold mb-2">Açıklama</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Badge'in ne zaman gösterileceğini açıklayın"
                  rows={3}
                  className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <label htmlFor="isActive" className="text-lg font-semibold text-gray-900">
                  Badge aktif olsun
                </label>
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
                onClick={handleSave}
                className="px-6 py-2 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors"
              >
                {editingBadge ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
