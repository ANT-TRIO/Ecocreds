/**
 * Comprehensive Form Validation and Error Handling
 * Provides validation functions for various data types and formats
 */

// ============================================================================
// EMAIL VALIDATION
// ============================================================================

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmails = (emails) => {
  if (!Array.isArray(emails)) return false;
  return emails.every(email => validateEmail(email));
};

// ============================================================================
// PASSWORD VALIDATION
// ============================================================================

export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    strength: calculatePasswordStrength(password),
    feedback: {
      minLength: password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    }
  };
};

export const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  if (strength <= 2) return 'weak';
  if (strength <= 4) return 'moderate';
  return 'strong';
};

// ============================================================================
// PHONE VALIDATION
// ============================================================================

export const validatePhone = (phone, country = 'IN') => {
  const phoneRegex = {
    IN: /^[6-9]\d{9}$/,
    US: /^[0-9]{10}$/,
    UK: /^[0-9]{11}$/,
    EU: /^[0-9]{7,15}$/
  };

  const regex = phoneRegex[country] || phoneRegex.IN;
  return regex.test(phone.replace(/\D/g, ''));
};

// ============================================================================
// NAME VALIDATION
// ============================================================================

export const validateName = (name, minLength = 2, maxLength = 50) => {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength && /^[a-zA-Z\s'-]+$/.test(trimmed);
};

export const validateFullName = (firstName, lastName) => {
  return validateName(firstName, 2, 30) && validateName(lastName, 2, 30);
};

// ============================================================================
// ADDRESS VALIDATION
// ============================================================================

export const validateAddress = (address) => {
  const addressData = {
    street: address.street || '',
    city: address.city || '',
    state: address.state || '',
    zipCode: address.zipCode || '',
    country: address.country || ''
  };

  const errors = {};

  if (!addressData.street || addressData.street.trim().length < 5) {
    errors.street = 'Street address must be at least 5 characters';
  }

  if (!addressData.city || addressData.city.trim().length < 2) {
    errors.city = 'City is required';
  }

  if (!addressData.state) {
    errors.state = 'State is required';
  }

  if (!validateZipCode(addressData.zipCode, addressData.country)) {
    errors.zipCode = 'Invalid ZIP code';
  }

  if (!addressData.country) {
    errors.country = 'Country is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateZipCode = (zipCode, country = 'IN') => {
  const zipCodeRegex = {
    IN: /^[0-9]{6}$/,
    US: /^[0-9]{5}(-[0-9]{4})?$/,
    UK: /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i,
    EU: /^[0-9]{4,6}$/
  };

  const regex = zipCodeRegex[country] || zipCodeRegex.IN;
  return regex.test(zipCode.replace(/\s/g, ''));
};

// ============================================================================
// PAYMENT VALIDATION
// ============================================================================

export const validateCreditCard = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(cleaned)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv);
};

export const validateExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const expYear = parseInt(year);
  const expMonth = parseInt(month);

  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;

  return month >= 1 && month <= 12;
};

export const validatePaymentAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && num <= 999999.99;
};

// ============================================================================
// PRODUCT VALIDATION
// ============================================================================

export const validateProduct = (product) => {
  const errors = {};

  if (!product.name || product.name.trim().length < 3) {
    errors.name = 'Product name must be at least 3 characters';
  }

  if (!product.description || product.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  if (!product.price || product.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  if (product.category && !['electronics', 'clothing', 'home', 'food', 'beauty', 'other'].includes(product.category)) {
    errors.category = 'Invalid category';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// ============================================================================
// URL VALIDATION
// ============================================================================

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateImageUrl = (url) => {
  if (!validateUrl(url)) return false;
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const ext = url.split('.').pop().toLowerCase();
  return imageExtensions.includes(ext);
};

// ============================================================================
// NUMBER VALIDATION
// ============================================================================

export const validateInteger = (value, min = null, max = null) => {
  const num = parseInt(value);
  if (isNaN(num)) return false;
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
  return true;
};

export const validateFloat = (value, min = null, max = null) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
  return true;
};

export const validatePercentage = (value) => {
  return validateFloat(value, 0, 100);
};

// ============================================================================
// DATE VALIDATION
// ============================================================================

export const validateDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

export const validateDateRange = (startDate, endDate) => {
  if (!validateDate(startDate) || !validateDate(endDate)) return false;
  return new Date(startDate) <= new Date(endDate);
};

export const validateAge = (birthDate, minAge = 18) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= minAge;
};

// ============================================================================
// BATCH VALIDATION
// ============================================================================

export const validateForm = (formData, rules) => {
  const errors = {};

  for (const [fieldName, fieldRules] of Object.entries(rules)) {
    const value = formData[fieldName];

    if (fieldRules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[fieldName] = `${fieldName} is required`;
      continue;
    }

    if (fieldRules.email && value && !validateEmail(value)) {
      errors[fieldName] = 'Invalid email format';
    }

    if (fieldRules.phone && value && !validatePhone(value)) {
      errors[fieldName] = 'Invalid phone number';
    }

    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[fieldName] = `${fieldName} must be at least ${fieldRules.minLength} characters`;
    }

    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      errors[fieldName] = `${fieldName} must not exceed ${fieldRules.maxLength} characters`;
    }

    if (fieldRules.custom && !fieldRules.custom(value)) {
      errors[fieldName] = fieldRules.customMessage || 'Invalid value';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// ============================================================================
// ERROR HANDLING
// ============================================================================

export const createError = (message, code = 'ERROR', details = {}) => {
  return {
    message,
    code,
    details,
    timestamp: new Date().toISOString()
  };
};

export const createValidationError = (field, message) => {
  return createError(message, 'VALIDATION_ERROR', { field });
};

export const createApiError = (status, message, data = {}) => {
  return createError(message, `API_ERROR_${status}`, { status, data });
};

export const handleError = (error) => {
  if (error.response) {
    // API error
    return createApiError(error.response.status, error.response.data?.message || 'Server error', error.response.data);
  } else if (error.message) {
    // Generic error
    return createError(error.message, 'ERROR');
  }
  return createError('An unknown error occurred', 'UNKNOWN_ERROR');
};

export default {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateAddress,
  validateCreditCard,
  validateProduct,
  validateUrl,
  validateForm,
  handleError
};
