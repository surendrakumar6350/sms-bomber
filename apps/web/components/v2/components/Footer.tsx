import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-xs text-gray-500 text-center">
          This service is for demonstration purposes only. Use responsibly and legally.
        </p>
        <p className="text-xs text-gray-600 mt-2">
          &copy; {new Date().getFullYear()} SMS Pulse. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;