import React from 'react';
import { User, Bell, Shield, Moon, Smartphone, Globe } from 'lucide-react';

const settingsOptions = [
  {
    id: 'account',
    icon: User,
    label: 'Account Settings',
    description: 'Manage your profile and preferences'
  },
  {
    id: 'notifications',
    icon: Bell,
    label: 'Notifications',
    description: 'Configure how you receive alerts'
  },
  {
    id: 'privacy',
    icon: Shield,
    label: 'Privacy & Security',
    description: 'Control your privacy settings'
  },
  {
    id: 'appearance',
    icon: Moon,
    label: 'Appearance',
    description: 'Customize your visual experience'
  },
  {
    id: 'devices',
    icon: Smartphone,
    label: 'Connected Devices',
    description: 'Manage your connected devices'
  },
  {
    id: 'language',
    icon: Globe,
    label: 'Language & Region',
    description: 'Set your preferred language'
  }
];

const SettingsPanel = () => {
  return (
    <div className="bg-gray-900/95 backdrop-blur-md border border-violet-800/30 rounded-lg shadow-xl p-3 animate-slideIn">
      <div className="mb-3 pb-2 border-b border-violet-800/30">
        <h3 className="text-blue-300 font-medium">Settings</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        <div className="space-y-1">
          {settingsOptions.map(option => (
            <button
              key={option.id}
              className="w-full text-left p-2 rounded-md transition-all hover:bg-violet-800/20 flex items-start gap-3"
            >
              <div className="bg-violet-800/20 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                <option.icon size={14} className="text-blue-300" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-200">{option.label}</div>
                <p className="text-xs text-gray-400 mt-0.5">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-violet-800/30">
        <div className="flex items-center justify-between px-1">
          <div>
            <p className="text-xs text-gray-400">SMS Pulse v1.0</p>
          </div>
          <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;