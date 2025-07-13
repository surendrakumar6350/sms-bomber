import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Target, Trash2 } from 'lucide-react';
import { RefObject } from 'react';

export interface HistoryEntry {
  id: string;
  phoneNumber: string | RefObject<string>;
  messagesSent: number;
  startTime: Date;
  endTime: Date;
  duration: string;
}

interface ProcessingHistoryProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
}

const ProcessingHistory: React.FC<ProcessingHistoryProps> = ({ history, onClearHistory }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between hover:bg-white/5 dark:hover:bg-gray-700/5 transition-colors"
        >
          <div className="flex items-center space-x-2">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Processing History ({history.length})
            </h3>
          </div>
          
          {history.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClearHistory();
              }}
              className="p-1 hover:bg-red-500/20 rounded transition-colors"
              title="Clear history"
            >
              <Trash2 className="h-4 w-4 text-red-400" />
            </button>
          )}
        </button>

        {isExpanded && (
          <div className="border-t border-white/10 dark:border-gray-700/10 max-h-64 overflow-y-auto">
            {history.map((entry) => (
              <div key={entry.id} className="p-4 border-b border-white/5 dark:border-gray-700/5 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-mono text-gray-900 dark:text-white">
                      +91 {entry.phoneNumber.toString()}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {entry.messagesSent} msgs
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{entry.startTime.toLocaleTimeString()}</span>
                  </div>
                  <span>Duration: {entry.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingHistory;