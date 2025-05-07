import React, { useState } from 'react';
import { validateIndianPhoneNumber } from '../utils/validation';

interface PhoneInputProps {
  onSubmit: (phoneNumber: string) => void;
  isActive: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onSubmit, isActive }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers and limit to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isActive) return; // Prevent submission if already active

    if (!phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }

    if (!validateIndianPhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit Indian phone number');
      return;
    }

    onSubmit(phoneNumber);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Enter Indian Mobile Number
        </label>

        <div className="relative">
          <input
            type="text"
            id="phone"
            className={`block w-full py-3 pl-12 pr-4 text-white bg-gray-800/60 border ${error ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:ring-2 focus:outline-none ${isActive ? 'opacity-50 cursor-not-allowed' : 'focus:ring-purple-500'
              } backdrop-blur-sm`}
            placeholder="9876543210"
            value={phoneNumber}
            onChange={handleChange}
            disabled={isActive}
          />
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}

        <p className="mt-2 text-xs text-gray-400">
          Enter a 10-digit mobile number without country code
        </p>
      </div>

      <button
        type="submit"
        disabled={isActive}
        className={`w-full py-4 px-6 flex justify-center items-center rounded-lg text-white font-medium transition-all duration-300 ${isActive
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/20'
          }`}
      >
        {isActive ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Start Bombing'
        )}
      </button>
    </form>
  );
};

export default PhoneInput;