import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning';
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
  };

  const colors = {
    success: 'bg-green-500/90 text-white border-green-400',
    error: 'bg-red-500/90 text-white border-red-400',
    warning: 'bg-yellow-500/90 text-white border-yellow-400',
  };

  const Icon = icons[type];

  return (
    <div className={`
      flex items-center space-x-3 p-4 rounded-lg border backdrop-blur-sm
      animate-slideIn transform transition-all duration-300 ease-out
      ${colors[type]}
    `}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id, onClose: removeToast }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );

  return { addToast, ToastContainer };
};

export default Toast;