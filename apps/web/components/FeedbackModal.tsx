import React from 'react';
import { X } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFeedback: (feedback: { rating: number; message: string; category: string }) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmitFeedback }) => {
  if (!isOpen) return null;

  const handleSubmit = (feedback: { rating: number; message: string; category: string }) => {
    onSubmitFeedback(feedback);
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 
            rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        {/* Feedback Form */}
        <FeedbackForm onSubmitFeedback={handleSubmit} />
      </div>
    </div>
  );
};

export default FeedbackModal;