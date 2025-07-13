import React, { useState } from 'react';
import { MessageSquare, Star, Send, Heart } from 'lucide-react';

interface FeedbackFormProps {
  onSubmitFeedback: (feedback: { rating: number; message: string; category: string }) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmitFeedback }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'feature', label: 'Feature Request' },
    { id: 'bug', label: 'Bug Report' },
    { id: 'improvement', label: 'Improvement' },
    { id: 'general', label: 'General Feedback' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    onSubmitFeedback({
      rating: rating || 5,
      message: message.trim(),
      category: selectedCategory
    });

    // Reset form
    setRating(0);
    setMessage('');
    setSelectedCategory('general');
    setIsSubmitting(false);
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredStar(starRating);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const getRatingText = (rating: number) => {
    const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return texts[rating] || '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Share Your Feedback
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Help us improve by sharing your thoughts and suggestions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Feedback Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                    selectedCategory === category.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-500'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Rate Your Experience (Optional)
            </label>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                    className="p-1 transition-all duration-200 transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-all duration-200 ${
                        star <= (hoveredStar || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600 hover:text-yellow-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {(rating > 0 || hoveredStar > 0) && (
                <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  {getRatingText(hoveredStar || rating)}
                </div>
              )}
            </div>
          </div>

          {/* Message Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Your Message
            </label>
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your experience, suggestions for improvement, or any issues you've encountered..."
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                  transition-all duration-200 resize-none"
                rows={4}
                required
                maxLength={500}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
                {message.length}/500
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={!message.trim() || isSubmitting}
              className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
                hover:from-purple-700 hover:to-blue-700 
                disabled:from-gray-400 disabled:to-gray-500
                text-white font-semibold rounded-xl transition-all duration-300 
                transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed
                shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              <div className="flex items-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    <span>Send Feedback</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </form>

        {/* Bottom text */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-1">
            <Heart className="w-4 h-4 text-red-400" />
            <span>Your feedback helps us improve</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;