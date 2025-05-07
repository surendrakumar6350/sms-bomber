import React from 'react';

interface StatusPanelProps {
  isActive: boolean;
  phoneNumber: string | null;
  messagesSent: number;
  startTime: Date | null;
}

const StatusPanel: React.FC<StatusPanelProps> = ({
  isActive,
  phoneNumber,
  messagesSent,
  startTime,
}) => {
  // Calculate elapsed time
  const getElapsedTime = (): string => {
    if (!startTime) return '00:00';
    
    const elapsedMs = Date.now() - startTime.getTime();
    const minutes = Math.floor(elapsedMs / 60000);
    const seconds = Math.floor((elapsedMs % 60000) / 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="w-full max-w-md mt-8 p-6 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-700 shadow-lg shadow-purple-500/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Operation Status</h2>
        <div className="flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse mr-2"></div>
          <span className="text-green-400 text-sm">Active</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Target Number:</span>
          <span className="font-medium text-white">+91 {phoneNumber}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Messages Sent:</span>
          <span className="font-medium text-white">{messagesSent}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Elapsed Time:</span>
          <span className="font-medium text-white">{getElapsedTime()}</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full"
            style={{ width: `${Math.min(messagesSent, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;