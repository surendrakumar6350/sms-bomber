import React, { useState, useEffect, useRef } from 'react';
import {  Send, Loader2 } from 'lucide-react';
import { validatePhoneNumber } from './utils/validation';

interface PhoneInputProps {
  onSubmit: (number: string) => void;
  isActive: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onSubmit, isActive }) => {
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on input when page loads
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Real-time validation
    if (number) {
      const validation = validatePhoneNumber(number);
      setIsValid(validation.isValid);
      setError(validation.error);
    } else {
      setIsValid(false);
      setError('');
    }
  }, [number]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isActive) {
      onSubmit(number);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 10) {
      setNumber(value);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="tel"
            value={number}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
            className={`w-full pl-4 pr-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border-2 rounded-lg 
              text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 
              focus:outline-none focus:ring-2 transition-all duration-300
              ${error ? 'border-red-500 focus:ring-red-500/20' :
                isValid ? 'border-green-500 focus:ring-green-500/20' :
                  'border-gray-300 dark:border-gray-600 focus:ring-purple-500/20'}`}
            disabled={isActive}
          />
          {number && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {isValid ? (
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              ) : error ? (
                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
              ) : null}
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-400 text-sm animate-fadeIn">{error}</p>
        )}

        <button
          type="submit"
          disabled={!isValid || isActive}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 
            flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95
            ${isValid && !isActive
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-400 dark:bg-gray-600 text-gray-300 cursor-not-allowed'}`}
        >
          {isActive ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Start Bombing</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PhoneInput;