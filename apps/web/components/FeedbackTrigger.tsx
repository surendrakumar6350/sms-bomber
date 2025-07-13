import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

interface FeedbackTriggerProps {
  onClick: () => void;
}

const FeedbackTrigger: React.FC<FeedbackTriggerProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
        hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold 
        transition-all duration-300 transform hover:scale-105 active:scale-95 
        shadow-lg hover:shadow-xl overflow-hidden"
    >
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 
        opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative flex items-center space-x-2">
        <MessageSquare className="w-5 h-5" />
        <span>Share Feedback</span>
        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
        bg-gradient-to-r from-transparent via-white/20 to-transparent 
        transition-transform duration-700 ease-out" />
    </button>
  );
};

export default FeedbackTrigger;