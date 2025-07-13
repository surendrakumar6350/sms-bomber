import React from 'react';
import { Github, Heart, Shield } from 'lucide-react';
import FeedbackTrigger from './FeedbackTrigger';

type FooterProps = {
  setIsFeedbackModalOpen: (open: boolean) => void;
};

const Footer: React.FC<FooterProps> = ({ setIsFeedbackModalOpen }) => {
  return (
    <footer className="w-full p-6 text-center border-t border-white/20 dark:border-gray-700/20 backdrop-blur-sm bg-white/5 dark:bg-gray-900/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Shield className="h-4 w-4" />
            <span>Built for educational purposes only</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
            <span>by developers</span>
          </div>


          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/surendrakumar6350/sms-bomber"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-400 transition-colors duration-300"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-8">
            <FeedbackTrigger onClick={() => setIsFeedbackModalOpen(true)} />
          </div>


        </div>

        <div className="mt-4 pt-4 border-t border-white/10 dark:border-gray-700/10">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © 2025 SMS Blaster Pro. Use responsibly and in accordance with local laws.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;