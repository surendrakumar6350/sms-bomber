import React, { useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id?: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastWithId extends Toast {
  id: string;
}

const TOAST_ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const TOAST_COLORS = {
  success: 'bg-green-500 border-green-600',
  error: 'bg-red-500 border-red-600',
  warning: 'bg-yellow-500 border-yellow-600',
  info: 'bg-blue-500 border-blue-600',
};

const ToastComponent: React.FC<{
  toast: ToastWithId;
  onClose: (id: string) => void;
}> = ({ toast, onClose }) => {
  const Icon = TOAST_ICONS[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  return (
    <div
      className={`
        ${TOAST_COLORS[toast.type]}
        text-white p-4 rounded-lg shadow-lg border-l-4 
        transform transition-all duration-300 ease-in-out
        flex items-center justify-between gap-3 max-w-md w-full
        animate-slide-in
      `}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium leading-tight">{toast.message}</span>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);

  const addToast = useCallback((toast: Toast) => {
    const id = toast.id || Math.random().toString(36).substring(2, 9);
    const newToast: ToastWithId = { ...toast, id };

    // Only keep the latest 3 toasts to avoid screen clutter
    setToasts(prev => {
      const updated = [newToast, ...prev];
      return updated.slice(0, 3); // Keep only the latest 3 toasts
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const ToastContainer: React.FC = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          toast={toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );

  return {
    addToast,
    removeToast,
    clearAllToasts,
    ToastContainer,
  };
};

// Add custom animations to global CSS
const toastStyles = `
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = toastStyles;
  document.head.appendChild(styleElement);
}