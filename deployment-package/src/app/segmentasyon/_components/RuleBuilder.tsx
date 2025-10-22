'use client';

import { useState } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import { RuleGroup, Rule, availableFields, operatorOptions } from '../types';

interface RuleBuilderProps {
  ruleGroups: RuleGroup[];
  onRuleGroupsChange: (groups: RuleGroup[]) => void;
}

export default function RuleBuilder({ ruleGroups, onRuleGroupsChange }: RuleBuilderProps) {
  const addRuleGroup = (logicType: 'AND' | 'OR') => {
    const newGroup: RuleGroup = {
      id: `group-${Date.now()}`,
      logicOperator: logicType,
      rules: []
    };
    onRuleGroupsChange([...ruleGroups, newGroup]);
  };

  const removeRuleGroup = (groupId: string) => {
    if (ruleGroups.length <= 1) {
      alert('En az bir kural grubu bulunmalıdır!');
      return;
    }
    onRuleGroupsChange(ruleGroups.filter(g => g.id !== groupId));
  };

  const updateRuleGroup = (groupId: string, updates: Partial<RuleGroup>) => {
    onRuleGroupsChange(
      ruleGroups.map(g => g.id === groupId ? { ...g, ...updates } : g)
    );
  };

  const addRule = (groupId: string) => {
    const newRule: Rule = {
      id: `rule-${Date.now()}`,
      field: '',
      operator: 'equals',
      value: '',
      dataType: 'string'
    };

    onRuleGroupsChange(
      ruleGroups.map(g =>
        g.id === groupId
          ? { ...g, rules: [...g.rules, newRule] }
          : g
      )
    );
  };

  const removeRule = (groupId: string, ruleId: string) => {
    onRuleGroupsChange(
      ruleGroups.map(g =>
        g.id === groupId
          ? { ...g, rules: g.rules.filter(r => r.id !== ruleId) }
          : g
      )
    );
  };

  const updateRule = (groupId: string, ruleId: string, updates: Partial<Rule>) => {
    onRuleGroupsChange(
      ruleGroups.map(g =>
        g.id === groupId
          ? {
              ...g,
              rules: g.rules.map(r =>
                r.id === ruleId ? { ...r, ...updates } : r
              )
            }
          : g
      )
    );
  };

  const handleFieldChange = (groupId: string, ruleId: string, fieldValue: string) => {
    const field = availableFields.find(f => f.value === fieldValue);
    if (!field) return;

    const updates: Partial<Rule> = {
      field: fieldValue,
      dataType: field.type,
      value: field.type === 'boolean' ? false : '',
      operator: 'equals'
    };

    if (field.type === 'nested' && field.nestedPath) {
      updates.nestedPath = field.nestedPath;
      updates.nestedFields = {};
    }

    updateRule(groupId, ruleId, updates);
  };

  return (
    <div className="space-y-6">
      {ruleGroups.map((group, groupIndex) => (
        <div key={group.id}>
          {/* Group Container */}
          <div
            className={`border-2 rounded-lg overflow-hidden ${
              group.logicOperator === 'AND'
                ? 'border-blue-300 bg-blue-50'
                : 'border-orange-300 bg-orange-50'
            }`}
          >
            {/* Group Header */}
            <div
              className={`px-4 py-3 flex items-center justify-between ${
                group.logicOperator === 'AND'
                  ? 'bg-blue-100 border-b-2 border-blue-300'
                  : 'bg-orange-100 border-b-2 border-orange-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-700">
                  GRUP {groupIndex + 1}
                </span>
                <span className="text-sm text-gray-600">-</span>
                <select
                  value={group.logicOperator}
                  onChange={(e) =>
                    updateRuleGroup(group.id, {
                      logicOperator: e.target.value as 'AND' | 'OR'
                    })
                  }
                  className="px-3 py-1 border border-gray-300 rounded font-semibold text-sm focus:outline-none focus:border-primary"
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </select>
                <span className="text-xs text-gray-500">
                  {group.logicOperator === 'AND'
                    ? 'Bu gruptaki TÜM kurallar sağlanmalı'
                    : 'Bu gruptaki HERHANGI BİR kural sağlanabilir'}
                </span>
              </div>
              <button
                onClick={() => removeRuleGroup(group.id)}
                className="p-1 hover:bg-red-100 rounded transition-colors"
                title="Grubu Sil"
              >
                <X size={20} className="text-red-600" />
              </button>
            </div>

            {/* Rules List */}
            <div className="p-4 space-y-3">
              {group.rules.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  Bu grupta henüz kural yok. Kural eklemek için aşağıdaki butona tıklayın.
                </div>
              ) : (
                group.rules.map((rule, ruleIndex) => {
                  const selectedField = availableFields.find(f => f.value === rule.field);
                  const availableOperators = selectedField
                    ? operatorOptions[selectedField.type] || []
                    : [];

                  return (
                    <div
                      key={rule.id}
                      className="bg-white border border-gray-300 rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-3">
                          {/* Rule Number */}
                          <div className="text-xs font-semibold text-gray-500">
                            Kural {ruleIndex + 1}
                          </div>

                          {/* Field Selection */}
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">
                              Alan
                            </label>
                            <select
                              value={rule.field}
                              onChange={(e) => handleFieldChange(group.id, rule.id, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                            >
                              <option value="">Alan seçin...</option>
                              {availableFields.map(field => (
                                <option key={field.value} value={field.value}>
                                  {field.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Nested Fields (for interests, specialLists) */}
                          {rule.dataType === 'nested' && selectedField?.nestedFields && (
                            <div className="pl-4 border-l-2 border-gray-300 space-y-2">
                              {selectedField.nestedFields.map(nestedField => (
                                <div key={nestedField.value}>
                                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    {nestedField.label}
                                  </label>
                                  {nestedField.type === 'select' ? (
                                    <select
                                      value={rule.nestedFields?.[nestedField.value] || ''}
                                      onChange={(e) =>
                                        updateRule(group.id, rule.id, {
                                          nestedFields: {
                                            ...rule.nestedFields,
                                            [nestedField.value]: e.target.value
                                          }
                                        })
                                      }
                                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary text-sm"
                                    >
                                      <option value="">Seçin...</option>
                                      {nestedField.options?.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                    </select>
                                  ) : (
                                    <input
                                      type="text"
                                      value={rule.nestedFields?.[nestedField.value] || ''}
                                      onChange={(e) =>
                                        updateRule(group.id, rule.id, {
                                          nestedFields: {
                                            ...rule.nestedFields,
                                            [nestedField.value]: e.target.value
                                          }
                                        })
                                      }
                                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary text-sm"
                                      placeholder={`${nestedField.label} girin...`}
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Operator Selection (only for non-nested or exists/notExists for nested) */}
                          {rule.field && rule.dataType !== 'nested' && (
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                  Operatör
                                </label>
                                <select
                                  value={rule.operator}
                                  onChange={(e) =>
                                    updateRule(group.id, rule.id, {
                                      operator: e.target.value as any
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                >
                                  {availableOperators.map(op => (
                                    <option key={op.value} value={op.value}>
                                      {op.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Value Input */}
                              <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                  Değer
                                </label>
                                {rule.dataType === 'boolean' ? (
                                  <select
                                    value={rule.value?.toString()}
                                    onChange={(e) =>
                                      updateRule(group.id, rule.id, {
                                        value: e.target.value === 'true'
                                      })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                  >
                                    <option value="true">Evet</option>
                                    <option value="false">Hayır</option>
                                  </select>
                                ) : rule.dataType === 'select' && selectedField?.options ? (
                                  <select
                                    value={rule.value?.toString()}
                                    onChange={(e) =>
                                      updateRule(group.id, rule.id, { value: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                  >
                                    <option value="">Seçin...</option>
                                    {selectedField.options.map(opt => (
                                      <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                  </select>
                                ) : rule.dataType === 'number' ? (
                                  <input
                                    type="number"
                                    value={rule.value?.toString() || ''}
                                    onChange={(e) =>
                                      updateRule(group.id, rule.id, {
                                        value: parseFloat(e.target.value) || 0
                                      })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                    placeholder="Sayı girin..."
                                  />
                                ) : rule.dataType === 'date' ? (
                                  <input
                                    type="date"
                                    value={rule.value?.toString() || ''}
                                    onChange={(e) =>
                                      updateRule(group.id, rule.id, { value: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={rule.value?.toString() || ''}
                                    onChange={(e) =>
                                      updateRule(group.id, rule.id, { value: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                    placeholder="Değer girin..."
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Delete Rule Button */}
                        <button
                          onClick={() => removeRule(group.id, rule.id)}
                          className="p-2 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                          title="Kuralı Sil"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Add Rule Button */}
              <button
                onClick={() => addRule(group.id)}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <Plus size={18} />
                Kural Ekle
              </button>
            </div>
          </div>

          {/* Separator between groups */}
          {groupIndex < ruleGroups.length - 1 && (
            <div className="flex items-center justify-center py-3">
              <div className="px-4 py-1 bg-gray-200 rounded-full text-xs font-bold text-gray-700">
                VE (AND)
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add Group Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => addRuleGroup('AND')}
          className="flex-1 py-3 border-2 border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Yeni AND Grubu Ekle
        </button>
        <button
          onClick={() => addRuleGroup('OR')}
          className="flex-1 py-3 border-2 border-orange-300 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Yeni OR Grubu Ekle
        </button>
      </div>
    </div>
  );
}
