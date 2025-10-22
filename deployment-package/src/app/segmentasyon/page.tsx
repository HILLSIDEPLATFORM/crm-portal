'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Segment } from './types';
import { mockSegments } from './mockData';
import { Search, Plus, Edit, Eye } from 'lucide-react';
import SegmentFormPopup from './_components/SegmentFormPopup';

export default function SegmentationPage() {
  const router = useRouter();
  const [segments, setSegments] = useState<Segment[]>(mockSegments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null);

  // Filtering logic
  const filteredSegments = segments.filter(segment => {
    const matchesSearch = segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      segment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = filterActive === 'all' ||
      (filterActive === 'active' ? segment.isActive : !segment.isActive);
    return matchesSearch && matchesActive;
  });

  const handleCardClick = (id: number) => {
    router.push(`/segmentasyon/${id}`);
  };

  const handleEdit = (segment: Segment, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSegment(segment);
    setIsCreateOpen(true);
  };

  const handleSave = (segment: Segment) => {
    if (editingSegment) {
      // Update existing segment
      setSegments(segments.map(s => s.id === segment.id ? segment : s));
    } else {
      // Add new segment
      setSegments([...segments, segment]);
    }
    setIsCreateOpen(false);
    setEditingSegment(null);
  };

  const handleCloseForm = () => {
    setIsCreateOpen(false);
    setEditingSegment(null);
  };

  return (
    <div className="min-h-screen bg-hillside-bg">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Müşteri Segmentasyonu</h1>
          <p className="text-gray-600">Dinamik kural grupları ile müşteri segmentleri oluşturun ve yönetin</p>
        </div>

        {/* Search + Filters Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-accent mb-2">
                Ara
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Segment adı veya açıklama ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-accent mb-2">
                Durum
              </label>
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="all">Tümü</option>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="mt-4 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Yeni Segment Ekle
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredSegments.length}</span> segment bulundu
          </p>
        </div>

        {/* Segment Cards Grid */}
        {filteredSegments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSegments.map((segment) => {
              const totalRules = segment.ruleGroups.reduce((sum, group) => sum + group.rules.length, 0);
              const groupCount = segment.ruleGroups.length;

              return (
                <div
                  key={segment.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header with status badge */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 flex-1 pr-2">
                        {segment.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          segment.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {segment.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                      {segment.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Müşteri Sayısı</span>
                        <p className="text-xl font-bold text-accent">
                          {segment.matchingCustomerCount || 0}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Kural Grupları</span>
                        <p className="text-xl font-bold text-primary">
                          {groupCount}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-xs text-gray-500 block mb-1">Toplam Kural</span>
                        <p className="text-lg font-semibold text-gray-700">
                          {totalRules}
                        </p>
                      </div>
                    </div>

                    {/* Date info */}
                    <div className="text-xs text-gray-500 mb-4">
                      <p>Oluşturulma: {new Date(segment.createdDate).toLocaleDateString('tr-TR')}</p>
                      <p>Güncellenme: {new Date(segment.updatedDate).toLocaleDateString('tr-TR')}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCardClick(segment.id)}
                        className="flex-1 px-3 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        Detay
                      </button>
                      <button
                        onClick={(e) => handleEdit(segment, e)}
                        className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit size={16} />
                        Düzenle
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="mb-4">
              <Search className="mx-auto text-gray-300" size={64} />
            </div>
            <p className="text-gray-500 text-lg mb-2">Arama kriterlerine uygun segment bulunamadı</p>
            <p className="text-gray-400 text-sm">
              Farklı arama terimleri deneyin veya yeni bir segment oluşturun
            </p>
          </div>
        )}
      </main>

      {/* Create/Edit Popup */}
      <SegmentFormPopup
        isOpen={isCreateOpen}
        onClose={handleCloseForm}
        onSave={handleSave}
        editingSegment={editingSegment}
      />
    </div>
  );
}
