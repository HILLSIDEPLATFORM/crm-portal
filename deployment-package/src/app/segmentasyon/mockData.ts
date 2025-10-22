import { Segment } from './types';

// Mock Segments Data
export const mockSegments: Segment[] = [
  {
    id: 1,
    name: 'VIP Erkek Spa Müşterileri',
    description: 'Erkek, 5+ HBC ziyareti olan ve SANDA SPA ilgisi bulunan müşteriler',
    ruleGroups: [
      {
        id: 'group-1',
        name: 'Temel Kriterler',
        logicOperator: 'AND',
        rules: [
          {
            id: 'rule-1',
            field: 'gender',
            operator: 'equals',
            value: 'Erkek',
            dataType: 'select'
          },
          {
            id: 'rule-2',
            field: 'hbcRepeatCount',
            operator: 'greaterThan',
            value: 5,
            dataType: 'number'
          },
          {
            id: 'rule-3',
            field: 'isHccMember',
            operator: 'equals',
            value: true,
            dataType: 'boolean'
          }
        ]
      },
      {
        id: 'group-2',
        name: 'İlgi Alanları',
        logicOperator: 'OR',
        rules: [
          {
            id: 'rule-4',
            field: 'interests',
            operator: 'exists',
            value: true,
            dataType: 'nested',
            nestedPath: 'interests',
            nestedFields: {
              facility: 'HILLSIDE BEACH CLUB',
              interest: 'SANDA SPA'
            }
          },
          {
            id: 'rule-5',
            field: 'hccSpaRep',
            operator: 'greaterThan',
            value: 10,
            dataType: 'number'
          }
        ]
      }
    ],
    createdDate: '2024-01-15',
    updatedDate: '2024-01-20',
    isActive: true,
    matchingCustomerCount: 12
  },
  {
    id: 2,
    name: 'Premium Liste Müşterileri',
    description: 'HILLSIDE PREMIUM bütçeli özel listelerde olan müşteriler',
    ruleGroups: [
      {
        id: 'group-1',
        logicOperator: 'AND',
        rules: [
          {
            id: 'rule-1',
            field: 'specialLists',
            operator: 'exists',
            value: true,
            dataType: 'nested',
            nestedPath: 'specialLists',
            nestedFields: {
              budget: 'HILLSIDE PREMIUM'
            }
          },
          {
            id: 'rule-2',
            field: 'magazineSubscription',
            operator: 'equals',
            value: true,
            dataType: 'boolean'
          }
        ]
      }
    ],
    createdDate: '2024-02-01',
    updatedDate: '2024-02-01',
    isActive: true,
    matchingCustomerCount: 8
  },
  {
    id: 3,
    name: 'Aktif Restoran Müşterileri',
    description: 'Restoran ilgisi olan ve son 180 gün içinde check-in yapan müşteriler',
    ruleGroups: [
      {
        id: 'group-1',
        logicOperator: 'AND',
        rules: [
          {
            id: 'rule-1',
            field: 'hbcLastCheckInDate',
            operator: 'greaterThan',
            value: '2024-07-01',
            dataType: 'date'
          }
        ]
      },
      {
        id: 'group-2',
        logicOperator: 'OR',
        rules: [
          {
            id: 'rule-2',
            field: 'interests',
            operator: 'exists',
            value: true,
            dataType: 'nested',
            nestedPath: 'interests',
            nestedFields: {
              interest: 'Pasha Restoran'
            }
          },
          {
            id: 'rule-3',
            field: 'interests',
            operator: 'exists',
            value: true,
            dataType: 'nested',
            nestedPath: 'interests',
            nestedFields: {
              interest: 'Beach Restoran'
            }
          }
        ]
      }
    ],
    createdDate: '2024-03-10',
    updatedDate: '2024-03-15',
    isActive: true,
    matchingCustomerCount: 23
  },
  {
    id: 4,
    name: 'Yeni HCC Üyeleri',
    description: 'Son 1 yıl içinde HCC üyeliği başlayan müşteriler',
    ruleGroups: [
      {
        id: 'group-1',
        logicOperator: 'AND',
        rules: [
          {
            id: 'rule-1',
            field: 'isHccMember',
            operator: 'equals',
            value: true,
            dataType: 'boolean'
          },
          {
            id: 'rule-2',
            field: 'hccLastMembershipExpireDate',
            operator: 'greaterThan',
            value: '2026-01-01',
            dataType: 'date'
          }
        ]
      }
    ],
    createdDate: '2024-01-05',
    updatedDate: '2024-01-05',
    isActive: true,
    matchingCustomerCount: 35
  },
  {
    id: 5,
    name: 'İstanbul İş Adresi',
    description: 'İş adresi İstanbul olan müşteriler',
    ruleGroups: [
      {
        id: 'group-1',
        logicOperator: 'AND',
        rules: [
          {
            id: 'rule-1',
            field: 'businessCity',
            operator: 'equals',
            value: 'İSTANBUL',
            dataType: 'string'
          }
        ]
      }
    ],
    createdDate: '2024-02-20',
    updatedDate: '2024-02-20',
    isActive: false,
    matchingCustomerCount: 145
  },
  {
    id: 6,
    name: 'FeelGood & Dergi Kombinasyonu',
    description: 'FeelGood Obje veya Dergi listesinde olan müşteriler',
    ruleGroups: [
      {
        id: 'group-1',
        logicOperator: 'OR',
        rules: [
          {
            id: 'rule-1',
            field: 'specialLists',
            operator: 'exists',
            value: true,
            dataType: 'nested',
            nestedPath: 'specialLists',
            nestedFields: {
              listType: 'FeelGood Obje'
            }
          },
          {
            id: 'rule-2',
            field: 'specialLists',
            operator: 'exists',
            value: true,
            dataType: 'nested',
            nestedPath: 'specialLists',
            nestedFields: {
              listType: 'Dergi'
            }
          }
        ]
      }
    ],
    createdDate: '2024-03-01',
    updatedDate: '2024-03-01',
    isActive: true,
    matchingCustomerCount: 18
  }
];
