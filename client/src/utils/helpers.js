/**
 * General Purpose Helper Functions and Utilities
 * Provides common utility functions for string, array, object, and date manipulation
 */

// ============================================================================
// STRING UTILITIES
// ============================================================================

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => capitalize(word)).join(' ');
};

export const truncate = (str, length = 50, suffix = '...') => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length) + suffix;
};

export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const camelCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase());
};

export const snakeCase = (str) => {
  if (!str) return '';
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : '_' + word.toLowerCase()
    );
};

export const kebabCase = (str) => {
  if (!str) return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const isPalindrome = (str) => {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
};

export const reverseString = (str) => {
  if (!str) return '';
  return str.split('').reverse().join('');
};

export const countWords = (str) => {
  if (!str) return 0;
  return str.trim().split(/\s+/).length;
};

export const highlightText = (text, highlight) => {
  if (!text || !highlight) return text;
  const regex = new RegExp(`(${highlight})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// ============================================================================
// ARRAY UTILITIES
// ============================================================================

export const unique = (arr) => {
  return Array.from(new Set(arr));
};

export const uniqueBy = (arr, key) => {
  const seen = new Set();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
};

export const flatten = (arr) => {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};

export const chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export const shuffle = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const sample = (arr) => {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
};

export const samples = (arr, n) => {
  if (!arr || arr.length === 0) return [];
  const shuffled = shuffle(arr);
  return shuffled.slice(0, Math.min(n, arr.length));
};

export const difference = (arr1, arr2) => {
  return arr1.filter(item => !arr2.includes(item));
};

export const intersection = (arr1, arr2) => {
  return arr1.filter(item => arr2.includes(item));
};

export const union = (...arrays) => {
  return unique(arrays.flat());
};

export const sortBy = (arr, key, order = 'asc') => {
  const sorted = [...arr];
  sorted.sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
  return sorted;
};

export const groupBy = (arr, key) => {
  return arr.reduce((grouped, item) => {
    const value = item[key];
    if (!grouped[value]) grouped[value] = [];
    grouped[value].push(item);
    return grouped;
  }, {});
};

// ============================================================================
// OBJECT UTILITIES
// ============================================================================

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const isEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const merge = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
};

export const deepMerge = (obj1, obj2) => {
  const result = { ...obj1 };
  for (const key in obj2) {
    if (typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {
      result[key] = deepMerge(result[key] || {}, obj2[key]);
    } else {
      result[key] = obj2[key];
    }
  }
  return result;
};

export const pick = (obj, keys) => {
  const result = {};
  keys.forEach(key => {
    if (key in obj) result[key] = obj[key];
  });
  return result;
};

export const omit = (obj, keys) => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};

export const keys = (obj) => Object.keys(obj);

export const values = (obj) => Object.values(obj);

export const entries = (obj) => Object.entries(obj);

export const invert = (obj) => {
  const result = {};
  for (const key in obj) {
    result[obj[key]] = key;
  }
  return result;
};

export const hasProperty = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export const getNestedValue = (obj, path, defaultValue = null) => {
  const keys = path.split('.');
  let value = obj;
  for (const key of keys) {
    value = value?.[key];
  }
  return value ?? defaultValue;
};

export const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return obj;
};

// ============================================================================
// NUMBER UTILITIES
// ============================================================================

export const round = (num, decimals = 0) => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

export const lerp = (start, end, t) => {
  return start + (end - start) * t;
};

export const percentage = (value, total) => {
  return (value / total) * 100;
};

export const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isEven = (num) => num % 2 === 0;

export const isOdd = (num) => num % 2 !== 0;

export const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

export const factorial = (num) => {
  if (num < 0) return undefined;
  if (num === 0 || num === 1) return 1;
  return num * factorial(num - 1);
};

export const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// ============================================================================
// DATE UTILITIES
// ============================================================================

export const formatDate = (date, format = 'MMM DD, YYYY') => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return format
    .replace('MM', months[month])
    .replace('DD', String(day).padStart(2, '0'))
    .replace('YYYY', year);
};

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const subtractDays = (date, days) => {
  return addDays(date, -days);
};

export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.toDateString() === d2.toDateString();
};

export const isToday = (date) => {
  return isSameDay(date, new Date());
};

export const isYesterday = (date) => {
  return isSameDay(date, subtractDays(new Date(), 1));
};

export const getTodayStart = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getTodayEnd = () => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
};

// ============================================================================
// TYPE CHECKING UTILITIES
// ============================================================================

export const isString = (val) => typeof val === 'string';
export const isNumber = (val) => typeof val === 'number' && !isNaN(val);
export const isBoolean = (val) => typeof val === 'boolean';
export const isFunction = (val) => typeof val === 'function';
export const isArray = (val) => Array.isArray(val);
export const isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);
export const isNull = (val) => val === null;
export const isUndefined = (val) => val === undefined;
export const isNullish = (val) => val === null || val === undefined;
export const isDate = (val) => val instanceof Date;
export const isRegex = (val) => val instanceof RegExp;
export const isPromise = (val) => val instanceof Promise;

export default {
  // String utilities
  capitalize,
  truncate,
  slugify,

  // Array utilities
  unique,
  flatten,
  chunk,
  shuffle,
  sortBy,
  groupBy,

  // Object utilities
  isEmpty,
  deepClone,
  merge,
  pick,
  omit,
  getNestedValue,

  // Number utilities
  round,
  clamp,
  randomInt,

  // Date utilities
  formatDate,
  addDays,
  daysBetween,

  // Type checking
  isString,
  isNumber,
  isArray,
  isObject
};
