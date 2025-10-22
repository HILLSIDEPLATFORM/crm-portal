'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Segment, RuleGroup } from '../types';
import RuleBuilder from './RuleBuilder';
import QueryPreviewModal from './QueryPreviewModal';

interface SegmentFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (segment: Segment) => void;
  editingSegment?: Segment | null;
}

export default function SegmentFormPopup({
  isOpen,
  onClose,
  onSave,
  editingSegment
}: SegmentFormPopupProps) {
  const [name, setName] = useState(editingSegment?.name || '');
  const [description, setDescription] = useState(editingSegment?.description || '');
  const [isActive, setIsActive] = useState(editingSegment?.isActive ?? true);
  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>(
    editingSegment?.ruleGroups || [
      {
        id: 'group-1',
        logicOperator: 'AND',
        rules: []
      }
    ]
  );
  const [showQueryPreview, setShowQueryPreview] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      alert('Segment adı giriniz!');
      return;
    }

    if (ruleGroups.every(g => g.rules.length === 0)) {
      alert('En az bir kural ekleyiniz!');
      return;
    }

    // Validate rules have required fields
    const hasInvalidRules = ruleGroups.some(group =>
      group.rules.some(rule => !rule.field)
    );

    if (hasInvalidRules) {
      alert('Tüm kurallar için alan seçimi yapınız!');
      return;
    }

    const newSegment: Segment = {
      id: editingSegment?.id || Date.now(),
      name,
      description,
      ruleGroups,
      isActive,
      createdDate: editingSegment?.createdDate || new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      matchingCustomerCount: Math.floor(Math.random() * 100) + 1 // Mock count
    };

    onSave(newSegment);
  };

  // Calculate estimated count (mock)
  const estimatedCount = Math.max(
    5,
    Math.floor(Math.random() * 50) + ruleGroups.reduce((sum, g) => sum + g.rules.length * 3, 0)
  );

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-bold text-accent">
              {editingSegment ? 'Segment Düzenle' : 'Yeni Segment Oluştur'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Basic Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Temel Bilgiler</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Segment Adı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn: VIP Spa Müşterileri"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Segment hakkında kısa açıklama..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">
                    Segment aktif
                  </label>
                </div>
              </div>
            </div>

            {/* Rule Builder */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Kural Grupları</h3>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">{estimatedCount}</span> müşteri eşleşiyor (tahmini)
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>💡 İpucu:</strong> Her grup kendi içinde AND veya OR mantığı ile çalışır.
                  Gruplar arasında ise her zaman AND uygulanır.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Örnek: (Erkek VE HBC Ziyaret &gt; 5) VE (SANDA SPA ilgisi VEYA Fitness ilgisi)
                </p>
              </div>

              <RuleBuilder
                ruleGroups={ruleGroups}
                onRuleGroupsChange={setRuleGroups}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between sticky bottom-0">
            <button
              onClick={() => setShowQueryPreview(true)}
              className="px-6 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded-lg transition-colors"
            >
              🔍 SQL Önizle
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors"
              >
                {editingSegment ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Query Preview Modal */}
      <QueryPreviewModal
        isOpen={showQueryPreview}
        onClose={() => setShowQueryPreview(false)}
        ruleGroups={ruleGroups}
        estimatedCount={estimatedCount}
      />
    </>
  );
}
