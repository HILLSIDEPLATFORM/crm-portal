'use client';

import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { RuleGroup } from '../types';
import { generateQueries, QueryPreview } from './QueryGenerator';

interface QueryPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  ruleGroups: RuleGroup[];
  estimatedCount?: number;
}

export default function QueryPreviewModal({
  isOpen,
  onClose,
  ruleGroups,
  estimatedCount = 0
}: QueryPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'sql' | 'elasticsearch' | 'explanation'>('sql');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!isOpen) return null;

  const { sql, elasticsearch, explanation } = generateQueries(ruleGroups);

  const handleCopy = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-primary to-primary-dark">
          <h2 className="text-xl font-bold text-white">Sorgu Önizleme</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6">
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'sql'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            SQL
          </button>
          <button
            onClick={() => setActiveTab('elasticsearch')}
            className={`px-4 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'elasticsearch'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Elasticsearch
          </button>
          <button
            onClick={() => setActiveTab('explanation')}
            className={`px-4 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'explanation'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Açıklama
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'sql' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700">SQL Sorgusu</h3>
                <button
                  onClick={() => handleCopy(sql, 'sql')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-semibold transition-colors"
                >
                  {copiedTab === 'sql' ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      Kopyalandı
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Kopyala
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {sql}
              </pre>
            </div>
          )}

          {activeTab === 'elasticsearch' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700">Elasticsearch DSL</h3>
                <button
                  onClick={() => handleCopy(JSON.stringify(elasticsearch, null, 2), 'elasticsearch')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-semibold transition-colors"
                >
                  {copiedTab === 'elasticsearch' ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      Kopyalandı
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Kopyala
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-gray-900 text-yellow-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {JSON.stringify(elasticsearch, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'explanation' && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Sorgu Açıklaması</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-800 text-lg leading-relaxed">
                  {explanation || 'Henüz kural tanımlanmamış.'}
                </p>
              </div>
            </div>
          )}

          {/* Query Statistics */}
          <div className="mt-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              Sorgu İstatistikleri
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Eşleşen Müşteri:</span>
                <p className="font-bold text-accent text-xl">{estimatedCount} kişi</p>
              </div>
              <div>
                <span className="text-gray-600">Kural Grubu:</span>
                <p className="font-bold text-primary text-xl">{ruleGroups.length}</p>
              </div>
              <div>
                <span className="text-gray-600">Toplam Kural:</span>
                <p className="font-bold text-gray-700 text-xl">
                  {ruleGroups.reduce((sum, g) => sum + g.rules.length, 0)}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Tahmini Yürütme:</span>
                <p className="font-bold text-gray-700 text-xl">~120ms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
