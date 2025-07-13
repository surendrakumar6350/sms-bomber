export interface ValidationResult {
  isValid: boolean;
  error: string;
}

export const validatePhoneNumber = (number: string): ValidationResult => {
  // Remove any spaces or special characters
  const cleanNumber = number.replace(/\D/g, '');
  
  if (!cleanNumber) {
    return { isValid: false, error: '' };
  }
  
  if (cleanNumber.length < 10) {
    return { isValid: false, error: 'Number must be 10 digits long' };
  }
  
  if (cleanNumber.length > 10) {
    return { isValid: false, error: 'Number cannot exceed 10 digits' };
  }
  
  // Check for valid Indian mobile number prefixes
  const validPrefixes = ['6', '7', '8', '9'];
  if (!validPrefixes.includes(cleanNumber[0])) {
    return { isValid: false, error: 'Indian mobile numbers start with 6, 7, 8, or 9' };
  }
  
  // Check for obvious invalid patterns
  if (/^(.)\1{9}$/.test(cleanNumber)) {
    return { isValid: false, error: 'Invalid number pattern' };
  }
  
  if (cleanNumber === '0000000000') {
    return { isValid: false, error: 'Invalid number' };
  }
  
  return { isValid: true, error: '' };
};