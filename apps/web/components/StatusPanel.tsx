import React from 'react';
import { Activity, Clock, Target, Zap } from 'lucide-react';
import { useTimer } from './hooks/useTimer';
import { RefObject } from 'react';

interface StatusPanelProps {
  isActive: boolean;
  phoneNumber: null | RefObject<string>;
  messagesSent: number;
  startTime: Date | null;
}

const motivationalTexts = [
  "Blasting bits...",
  "Engaging circuits...",
  "Sending digital pigeons...",
  "Unleashing the kraken...",
  "Firing photon torpedoes...",
  "Activating hyperdrive...",
  "Charging plasma cannons...",
  "Initializing warp core..."
];

const StatusPanel: React.FC<StatusPanelProps> = ({ 
  isActive, 
  phoneNumber, 
  messagesSent, 
  startTime 
}) => {
  const timer = useTimer(startTime);
  const [currentText, setCurrentText] = React.useState(0);

  React.useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCurrentText(prev => (prev + 1) % motivationalTexts.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!phoneNumber?.current) return null;

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <Activity className="h-5 w-5 text-purple-400" />
          <span>Operation Status</span>
        </h3>
        {isActive && (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">ACTIVE</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 dark:bg-gray-700/5 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 text-blue-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Target</span>
          </div>
          <p className="text-sm font-mono text-gray-900 dark:text-white">+91 {phoneNumber.current.toString()}</p>
        </div>

        <div className="bg-white/5 dark:bg-gray-700/5 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Sent</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{messagesSent}</p>
        </div>

        <div className="bg-white/5 dark:bg-gray-700/5 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 text-green-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Duration</span>
          </div>
          <p className="text-sm font-mono text-gray-900 dark:text-white">{timer}</p>
        </div>
      </div>

      {isActive && (
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
          <p className="text-center text-sm text-gray-900 dark:text-white animate-pulse">
            {motivationalTexts[currentText]}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatusPanel;