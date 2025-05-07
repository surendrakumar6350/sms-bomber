
import React, { useState, useRef, useEffect } from 'react';
import { Zap, Menu, X, Bell, Settings } from 'lucide-react';
import NotificationPanel from './NotificationPanel';
import SettingsPanel from './SettingsPanel';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsNotificationsOpen(false);
    setIsSettingsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsSettingsOpen(false);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setIsNotificationsOpen(false);
  };

  // Close panels when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-notification-toggle]')) {
        setIsNotificationsOpen(false);
      }

      if (settingsRef.current &&
        !settingsRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-settings-toggle]')) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full py-3 px-4 md:px-6 bg-gradient-to-r from-violet-900/90 to-blue-900/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Zap size={24} className="text-purple-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
              SMS Pulse
            </h1>
          </div>

          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <button
              className="p-2 hover:bg-violet-800/50 rounded-full transition-colors relative"
              onClick={toggleNotifications}
              data-notification-toggle
            >
              <Bell size={20} className="text-blue-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              className="p-2 hover:bg-violet-800/50 rounded-full transition-colors"
              onClick={toggleSettings}
              data-settings-toggle
            >
              <Settings size={20} className="text-blue-300" />
            </button>

            {/* Desktop Notifications Panel */}
            {isNotificationsOpen && (
              <div
                ref={notificationRef}
                className="absolute top-full right-0 mt-2 origin-top-right w-80"
              >
                <NotificationPanel />
              </div>
            )}

            {/* Desktop Settings Panel */}
            {isSettingsOpen && (
              <div
                ref={settingsRef}
                className="absolute top-full right-0 mt-2 origin-top-right w-72"
              >
                <SettingsPanel />
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button onClick={toggleMenu} className="p-2 hover:bg-violet-800/50 rounded-full transition-colors">
              {isMenuOpen ? <X size={24} className="text-blue-300" /> : <Menu size={24} className="text-blue-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-violet-700/50 mt-3 animate-fadeIn">
            <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-violet-700/50 relative">
              <button
                className="p-2 hover:bg-violet-800/50 rounded-full transition-colors relative"
                onClick={toggleNotifications}
                data-notification-toggle
              >
                <Bell size={20} className="text-blue-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                className="p-2 hover:bg-violet-800/50 rounded-full transition-colors"
                onClick={toggleSettings}
                data-settings-toggle
              >
                <Settings size={20} className="text-blue-300" />
              </button>

              {/* Mobile Notifications Panel */}
              {isNotificationsOpen && (
                <div
                  ref={notificationRef}
                  className="absolute top-full left-0 mt-2 w-full"
                >
                  <NotificationPanel />
                </div>
              )}

              {/* Mobile Settings Panel */}
              {isSettingsOpen && (
                <div
                  ref={settingsRef}
                  className="absolute top-full left-0 mt-2 w-full"
                >
                  <SettingsPanel />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
