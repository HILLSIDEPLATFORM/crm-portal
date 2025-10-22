'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import { Segment } from '../types';
import { mockSegments } from '../mockData';
import { ArrowLeft, Edit, Trash2, Power, Eye, Database } from 'lucide-react';
import { generateQueries } from '../_components/QueryGenerator';
import QueryPreviewModal from '../_components/QueryPreviewModal';
import SegmentFormPopup from '../_components/SegmentFormPopup';

// Mock customer data for matched customers
const mockMatchedCustomers = [
  { id: 1, name: 'Mertcan Yüksel', email: 'mertcan@hillside.com.tr', phone: '(543) 542 5140', city: 'İSTANBUL' },
  { id: 2, name: 'Ahmet Demir', email: 'ahmet@hillside.com.tr', phone: '(532) 123 4567', city: 'İZMİR' },
  { id: 3, name: 'Ayşe Kaya', email: 'ayse@hillside.com.tr', phone: '(544) 987 6543', city: 'ANKARA' },
  { id: 4, name: 'Mehmet Yılmaz', email: 'mehmet@hillside.com.tr', phone: '(555) 111 2222', city: 'MUĞLA' },
  { id: 5, name: 'Zeynep Acar', email: 'zeynep@hillside.com.tr', phone: '(533) 444 5555', city: 'İSTANBUL' },
];

export default function SegmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const segmentId = parseInt(params.id as string);

  const [segment, setSegment] = useState<Segment | null>(null);
  const [showQueryPreview, setShowQueryPreview] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  useEffect(() => {
    const foundSegment = mockSegments.find(s => s.id === segmentId);
    if (foundSegment) {
      setSegment(foundSegment);
    }
  }, [segmentId]);

  if (!segment) {
    return (
      <div className="min-h-screen bg-hillside-bg">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">Segment bulunamadı</p>
            <button
              onClick={() => router.push('/segmentasyon')}
              className="mt-4 px-6 py-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg"
            >
              Geri Dön
            </button>
          </div>
        </main>
      </div>
    );
  }

  const { explanation } = generateQueries(segment.ruleGroups);
  const totalRules = segment.ruleGroups.reduce((sum, g) => sum + g.rules.length, 0);

  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = mockMatchedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(mockMatchedCustomers.length / customersPerPage);

  const handleToggleActive = () => {
    setSegment({ ...segment, isActive: !segment.isActive });
  };

  const handleDelete = () => {
    if (confirm(`"${segment.name}" segmentini silmek istediğinize emin misiniz?`)) {
      router.push('/segmentasyon');
    }
  };

  const handleEditSave = (updatedSegment: Segment) => {
    setSegment(updatedSegment);
    setShowEditForm(false);
  };

  return (
    <div className="min-h-screen bg-hillside-bg">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => router.push('/segmentasyon')}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Segmentlere Dön
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{segment.name}</h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    segment.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {segment.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{segment.description}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>Oluşturulma: {new Date(segment.createdDate).toLocaleDateString('tr-TR')}</span>
                <span>•</span>
                <span>Güncellenme: {new Date(segment.updatedDate).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditForm(true)}
                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
                title="Düzenle"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={handleToggleActive}
                className={`p-2 rounded-lg transition-colors ${
                  segment.isActive
                    ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                    : 'bg-green-100 hover:bg-green-200 text-green-800'
                }`}
                title={segment.isActive ? 'Pasif Yap' : 'Aktif Yap'}
              >
                <Power size={20} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
                title="Sil"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">
                {segment.matchingCustomerCount || 0}
              </div>
              <div className="text-sm text-gray-600">Eşleşen Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {segment.ruleGroups.length}
              </div>
              <div className="text-sm text-gray-600">Kural Grubu</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-700 mb-1">
                {totalRules}
              </div>
              <div className="text-sm text-gray-600">Toplam Kural</div>
            </div>
          </div>
        </div>

        {/* Rule Groups Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Kural Grupları</h2>
            <button
              onClick={() => setShowQueryPreview(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded-lg transition-colors"
            >
              <Database size={18} />
              SQL Önizle
            </button>
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Sorgu Açıklaması:</h3>
            <p className="text-blue-800">{explanation}</p>
          </div>

          {/* Rule Groups */}
          <div className="space-y-4">
            {segment.ruleGroups.map((group, groupIndex) => (
              <div key={group.id}>
                <div
                  className={`border-2 rounded-lg p-4 ${
                    group.logicOperator === 'AND'
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-orange-300 bg-orange-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-gray-700">GRUP {groupIndex + 1}</span>
                    <span className="text-sm text-gray-600">-</span>
                    <span
                      className={`px-3 py-1 rounded font-semibold text-sm ${
                        group.logicOperator === 'AND'
                          ? 'bg-blue-200 text-blue-900'
                          : 'bg-orange-200 text-orange-900'
                      }`}
                    >
                      {group.logicOperator}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({group.rules.length} kural)
                    </span>
                  </div>

                  <div className="space-y-2">
                    {group.rules.map((rule, ruleIndex) => (
                      <div key={rule.id} className="bg-white border border-gray-300 rounded p-3 text-sm">
                        <span className="font-semibold text-gray-700">Kural {ruleIndex + 1}:</span>{' '}
                        <span className="text-gray-600">
                          {rule.field} {rule.operator} {JSON.stringify(rule.value)}
                          {rule.nestedFields && (
                            <span className="text-blue-600">
                              {' '}({JSON.stringify(rule.nestedFields)})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {groupIndex < segment.ruleGroups.length - 1 && (
                  <div className="flex items-center justify-center py-2">
                    <div className="px-4 py-1 bg-gray-200 rounded-full text-xs font-bold text-gray-700">
                      VE (AND)
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Matched Customers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Eşleşen Müşteriler ({mockMatchedCustomers.length})
          </h2>

          {currentCustomers.length > 0 ? (
            <>
              <div className="space-y-3">
                {currentCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/search/${customer.id}`)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <span>{customer.email}</span>
                        <span className="mx-2">•</span>
                        <span>{customer.phone}</span>
                        <span className="mx-2">•</span>
                        <span>{customer.city}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Eye size={18} className="text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    Önceki
                  </button>
                  <span className="text-sm text-gray-600">
                    Sayfa {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    Sonraki
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Bu segmente eşleşen müşteri bulunamadı
            </div>
          )}
        </div>
      </main>

      {/* Query Preview Modal */}
      <QueryPreviewModal
        isOpen={showQueryPreview}
        onClose={() => setShowQueryPreview(false)}
        ruleGroups={segment.ruleGroups}
        estimatedCount={segment.matchingCustomerCount || 0}
      />

      {/* Edit Form Modal */}
      <SegmentFormPopup
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        onSave={handleEditSave}
        editingSegment={segment}
      />
    </div>
  );
}
