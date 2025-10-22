// Segmentation Type Definitions

export type RuleOperator =
  | 'equals' | 'notEquals'
  | 'contains' | 'notContains'
  | 'greaterThan' | 'lessThan'
  | 'greaterThanOrEqual' | 'lessThanOrEqual'
  | 'between'
  | 'in' | 'notIn'
  | 'exists' | 'notExists';

export type DataType = 'string' | 'number' | 'date' | 'boolean' | 'select' | 'nested';

export interface DateRange {
  from: string;
  to: string;
}

export interface Rule {
  id: string;
  field: string;
  operator: RuleOperator;
  value: string | string[] | number | boolean | DateRange;
  dataType: DataType;
  nestedPath?: string;
  nestedFields?: { [key: string]: any };
}

export interface RuleGroup {
  id: string;
  name?: string;
  rules: Rule[];
  logicOperator: 'AND' | 'OR';
}

export interface Segment {
  id: number;
  name: string;
  description: string;
  ruleGroups: RuleGroup[];
  createdDate: string;
  updatedDate: string;
  isActive: boolean;
  matchingCustomerCount?: number;
  sqlQuery?: string;
  elasticsearchQuery?: object;
  lastQueryGenerated?: string;
}

export interface FieldDefinition {
  value: string;
  label: string;
  type: DataType;
  options?: string[];
  nestedPath?: string;
  nestedFields?: NestedFieldDefinition[];
}

export interface NestedFieldDefinition {
  value: string;
  label: string;
  type: DataType;
  options?: string[];
}

// Available fields for segmentation
export const availableFields: FieldDefinition[] = [
  // Temel Bilgiler
  { value: 'gender', label: 'Cinsiyet', type: 'select', options: ['Erkek', 'Kadın'] },
  { value: 'maritalStatus', label: 'Medeni Durum', type: 'select', options: ['Bekar', 'Evli'] },
  { value: 'jobTitle', label: 'Meslek', type: 'string' },
  { value: 'companyName', label: 'Şirket', type: 'string' },

  // Sayısal Alanlar
  { value: 'hbcRepeatCount', label: 'HBC Ziyaret Sayısı', type: 'number' },
  { value: 'hccSpaRep', label: 'HCC Spa Ziyaret Sayısı', type: 'number' },

  // Tarih Alanları
  { value: 'hbcLastCheckInDate', label: 'Son HBC Check-in', type: 'date' },
  { value: 'hccLastMembershipExpireDate', label: 'HCC Üyelik Bitiş', type: 'date' },
  { value: 'birthDate', label: 'Doğum Tarihi', type: 'date' },

  // Boolean Alanlar
  { value: 'isHccMember', label: 'HCC Üyesi', type: 'boolean' },
  { value: 'isHbcMember', label: 'HBC Üyesi', type: 'boolean' },
  { value: 'isDavlist', label: 'Dav Listesi', type: 'boolean' },
  { value: 'magazineSubscription', label: 'Dergi Aboneliği', type: 'boolean' },
  { value: 'calendarSubscription', label: 'Takvim Aboneliği', type: 'boolean' },

  // Lokasyon
  { value: 'homeCity', label: 'Ev Şehri', type: 'string' },
  { value: 'businessCity', label: 'İş Şehri', type: 'string' },
  { value: 'homeCountry', label: 'Ev Ülkesi', type: 'string' },
  { value: 'businessCountry', label: 'İş Ülkesi', type: 'string' },

  // İlgi Grupları (Nested)
  {
    value: 'interests',
    label: 'İlgi Grupları',
    type: 'nested',
    nestedPath: 'interests',
    nestedFields: [
      { value: 'facility', label: 'Facility', type: 'select', options: ['HILLSIDE BEACH CLUB', 'HILLSIDE CITY CLUB'] },
      { value: 'interest', label: 'İlgi Alanı', type: 'string' }
    ]
  },

  // Özel Liste Üyeliği (Nested)
  {
    value: 'specialLists',
    label: 'Özel Listeler',
    type: 'nested',
    nestedPath: 'specialLists',
    nestedFields: [
      { value: 'listType', label: 'Liste Tipi', type: 'select', options: ['FeelGood Obje', 'Dergi', 'Yatkart'] },
      { value: 'budget', label: 'Bütçe', type: 'select', options: ['HILLSIDE LEISURE', 'HILLSIDE PREMIUM', 'HILLSIDE BUSINESS'] }
    ]
  }
];

// Operator options based on data type
export const operatorOptions: { [key: string]: { value: RuleOperator; label: string }[] } = {
  string: [
    { value: 'equals', label: 'eşittir' },
    { value: 'notEquals', label: 'eşit değildir' },
    { value: 'contains', label: 'içerir' },
    { value: 'notContains', label: 'içermez' }
  ],
  number: [
    { value: 'equals', label: 'eşittir' },
    { value: 'notEquals', label: 'eşit değildir' },
    { value: 'greaterThan', label: 'büyüktür' },
    { value: 'lessThan', label: 'küçüktür' },
    { value: 'greaterThanOrEqual', label: 'büyük veya eşittir' },
    { value: 'lessThanOrEqual', label: 'küçük veya eşittir' },
    { value: 'between', label: 'arasında' }
  ],
  boolean: [
    { value: 'equals', label: 'eşittir' }
  ],
  date: [
    { value: 'equals', label: 'eşittir' },
    { value: 'greaterThan', label: 'sonra' },
    { value: 'lessThan', label: 'önce' },
    { value: 'between', label: 'arasında' }
  ],
  select: [
    { value: 'equals', label: 'eşittir' },
    { value: 'notEquals', label: 'eşit değildir' },
    { value: 'in', label: 'içinde (çoklu)' }
  ],
  nested: [
    { value: 'exists', label: 'var' },
    { value: 'notExists', label: 'yok' }
  ]
};
