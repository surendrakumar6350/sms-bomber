import React from 'react';
import { Zap, Moon, Sun } from 'lucide-react';
import { useTheme } from './hooks/useTheme';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full p-6 flex justify-between items-center backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 border-b border-white/20 dark:border-gray-700/20">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            SMS Blaster Pro
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">v2.0 Professional</p>
        </div>
      </div>
      
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 backdrop-blur-sm"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 text-blue-400" />
        )}
      </button>
    </header>
  );
};

export default Header;