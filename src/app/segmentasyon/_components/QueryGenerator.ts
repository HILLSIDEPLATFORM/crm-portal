import { RuleGroup, Rule } from '../types';

export interface QueryPreview {
  sql: string;
  elasticsearch: object;
  explanation: string;
}

export function generateQueries(ruleGroups: RuleGroup[]): QueryPreview {
  const sql = generateSQL(ruleGroups);
  const elasticsearch = generateElasticsearch(ruleGroups);
  const explanation = generateExplanation(ruleGroups);

  return { sql, elasticsearch, explanation };
}

// SQL Query Generator
function generateSQL(ruleGroups: RuleGroup[]): string {
  if (ruleGroups.length === 0) {
    return 'SELECT * FROM customers';
  }

  const groupClauses = ruleGroups.map(group => generateSQLGroup(group));
  const whereClause = groupClauses.filter(c => c).join('\n  AND\n  ');

  return `SELECT DISTINCT c.*
FROM customers c
LEFT JOIN customer_interests ci ON c.id = ci.customer_id
LEFT JOIN customer_special_lists csl ON c.id = csl.customer_id
WHERE
  ${whereClause || '1=1'}`;
}

function generateSQLGroup(group: RuleGroup): string {
  if (group.rules.length === 0) return '';

  const ruleClauses = group.rules
    .map(rule => generateSQLRule(rule))
    .filter(clause => clause);

  if (ruleClauses.length === 0) return '';

  const operator = group.logicOperator === 'AND' ? '\n    AND ' : '\n    OR ';
  return `(\n    ${ruleClauses.join(operator)}\n  )`;
}

function generateSQLRule(rule: Rule): string {
  if (!rule.field) return '';

  // Nested fields (interests, specialLists)
  if (rule.dataType === 'nested' && rule.nestedPath) {
    const nestedConditions: string[] = [];

    if (rule.nestedFields) {
      Object.entries(rule.nestedFields).forEach(([key, value]) => {
        if (value) {
          const column = `${rule.nestedPath}.${key}`;
          nestedConditions.push(`${column} = '${escapeSQLString(value)}'`);
        }
      });
    }

    if (nestedConditions.length === 0) return '';

    const joinCondition = nestedConditions.join('\n        AND ');
    const tableName = rule.nestedPath === 'interests' ? 'customer_interests' : 'customer_special_lists';
    const tableAlias = rule.nestedPath === 'interests' ? 'ci2' : 'csl2';

    return `EXISTS (
      SELECT 1 FROM ${tableName} ${tableAlias}
      WHERE ${tableAlias}.customer_id = c.id
        AND ${joinCondition}
    )`;
  }

  // Regular fields
  const column = `c.${toSnakeCase(rule.field)}`;
  const value = rule.value;

  switch (rule.operator) {
    case 'equals':
      if (rule.dataType === 'boolean') {
        return `${column} = ${value ? 'TRUE' : 'FALSE'}`;
      }
      return `${column} = '${escapeSQLString(value)}'`;

    case 'notEquals':
      if (rule.dataType === 'boolean') {
        return `${column} != ${value ? 'TRUE' : 'FALSE'}`;
      }
      return `${column} != '${escapeSQLString(value)}'`;

    case 'contains':
      return `${column} LIKE '%${escapeSQLString(value)}%'`;

    case 'notContains':
      return `${column} NOT LIKE '%${escapeSQLString(value)}%'`;

    case 'greaterThan':
      return `${column} > ${typeof value === 'string' ? `'${escapeSQLString(value)}'` : value}`;

    case 'lessThan':
      return `${column} < ${typeof value === 'string' ? `'${escapeSQLString(value)}'` : value}`;

    case 'greaterThanOrEqual':
      return `${column} >= ${typeof value === 'string' ? `'${escapeSQLString(value)}'` : value}`;

    case 'lessThanOrEqual':
      return `${column} <= ${typeof value === 'string' ? `'${escapeSQLString(value)}'` : value}`;

    default:
      return '';
  }
}

// Elasticsearch Query Generator
function generateElasticsearch(ruleGroups: RuleGroup[]): object {
  if (ruleGroups.length === 0) {
    return { query: { match_all: {} } };
  }

  const groupQueries = ruleGroups
    .map(group => generateElasticsearchGroup(group))
    .filter(q => q !== null);

  if (groupQueries.length === 0) {
    return { query: { match_all: {} } };
  }

  return {
    query: {
      bool: {
        must: groupQueries
      }
    }
  };
}

function generateElasticsearchGroup(group: RuleGroup): object | null {
  if (group.rules.length === 0) return null;

  const ruleQueries = group.rules
    .map(rule => generateElasticsearchRule(rule))
    .filter(q => q !== null);

  if (ruleQueries.length === 0) return null;

  if (group.logicOperator === 'AND') {
    return {
      bool: {
        must: ruleQueries
      }
    };
  } else {
    return {
      bool: {
        should: ruleQueries,
        minimum_should_match: 1
      }
    };
  }
}

function generateElasticsearchRule(rule: Rule): object | null {
  if (!rule.field) return null;

  // Nested fields
  if (rule.dataType === 'nested' && rule.nestedPath && rule.nestedFields) {
    const mustConditions: object[] = [];

    Object.entries(rule.nestedFields).forEach(([key, value]) => {
      if (value) {
        mustConditions.push({
          term: { [`${rule.nestedPath}.${key}`]: value }
        });
      }
    });

    if (mustConditions.length === 0) return null;

    return {
      nested: {
        path: rule.nestedPath,
        query: {
          bool: {
            must: mustConditions
          }
        }
      }
    };
  }

  // Regular fields
  const field = rule.field;

  switch (rule.operator) {
    case 'equals':
      if (rule.dataType === 'string' || rule.dataType === 'select') {
        return { term: { [`${field}.keyword`]: rule.value } };
      }
      return { term: { [field]: rule.value } };

    case 'notEquals':
      if (rule.dataType === 'string' || rule.dataType === 'select') {
        return {
          bool: {
            must_not: { term: { [`${field}.keyword`]: rule.value } }
          }
        };
      }
      return {
        bool: {
          must_not: { term: { [field]: rule.value } }
        }
      };

    case 'contains':
      return {
        match: {
          [field]: {
            query: rule.value,
            operator: 'and'
          }
        }
      };

    case 'greaterThan':
      return { range: { [field]: { gt: rule.value } } };

    case 'lessThan':
      return { range: { [field]: { lt: rule.value } } };

    case 'greaterThanOrEqual':
      return { range: { [field]: { gte: rule.value } } };

    case 'lessThanOrEqual':
      return { range: { [field]: { lte: rule.value } } };

    default:
      return null;
  }
}

// Explanation Generator
function generateExplanation(ruleGroups: RuleGroup[]): string {
  if (ruleGroups.length === 0) {
    return 'Tüm müşteriler';
  }

  const groupExplanations = ruleGroups.map((group, index) => {
    const ruleExplanations = group.rules.map(rule => explainRule(rule)).filter(e => e);

    if (ruleExplanations.length === 0) return '';

    const operator = group.logicOperator === 'AND' ? ' VE ' : ' VEYA ';
    const groupText = ruleExplanations.join(operator);

    return group.rules.length > 1 ? `(${groupText})` : groupText;
  }).filter(e => e);

  return groupExplanations.join(' VE ');
}

function explainRule(rule: Rule): string {
  if (!rule.field) return '';

  const fieldLabel = getFieldLabel(rule.field);

  // Nested fields
  if (rule.dataType === 'nested' && rule.nestedFields) {
    const nestedParts: string[] = [];
    Object.entries(rule.nestedFields).forEach(([key, value]) => {
      if (value) {
        nestedParts.push(`${key}: ${value}`);
      }
    });
    return `${fieldLabel} (${nestedParts.join(', ')})`;
  }

  // Regular fields
  const operatorText = getOperatorLabel(rule.operator);
  const valueText = formatValue(rule.value, rule.dataType);

  return `${fieldLabel} ${operatorText} ${valueText}`;
}

function getFieldLabel(field: string): string {
  const labels: { [key: string]: string } = {
    gender: 'Cinsiyet',
    maritalStatus: 'Medeni Durum',
    jobTitle: 'Meslek',
    companyName: 'Şirket',
    hbcRepeatCount: 'HBC Ziyaret Sayısı',
    hccSpaRep: 'HCC Spa Ziyaret',
    isHccMember: 'HCC Üyesi',
    isHbcMember: 'HBC Üyesi',
    homeCity: 'Ev Şehri',
    businessCity: 'İş Şehri',
    interests: 'İlgi Grubu',
    specialLists: 'Özel Liste'
  };
  return labels[field] || field;
}

function getOperatorLabel(operator: string): string {
  const labels: { [key: string]: string } = {
    equals: '=',
    notEquals: '≠',
    contains: 'içerir',
    notContains: 'içermez',
    greaterThan: '>',
    lessThan: '<',
    greaterThanOrEqual: '≥',
    lessThanOrEqual: '≤'
  };
  return labels[operator] || operator;
}

function formatValue(value: any, dataType: string): string {
  if (dataType === 'boolean') {
    return value ? 'Evet' : 'Hayır';
  }
  return String(value);
}

// Helper functions
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function escapeSQLString(str: any): string {
  return String(str).replace(/'/g, "''");
}
