export const validateIndianPhoneNumber = (phoneNumber: string): boolean => {
  // Check if the number is exactly 10 digits and starts with a valid Indian mobile prefix
  if (phoneNumber.length !== 10) {
    return false;
  }
  
  // Valid Indian mobile prefixes
  const validPrefixes = ['6', '7', '8', '9'];
  return validPrefixes.includes(phoneNumber.charAt(0));
};