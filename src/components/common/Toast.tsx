import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  return (
    <div className={`fixed bottom-20 md:bottom-8 right-4 z-50 max-w-md p-4 rounded-xl shadow-lg border flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${
      type === 'success' 
        ? 'bg-white border-emerald-200 text-slate-800' 
        : type === 'error'
        ? 'bg-white border-rose-200 text-slate-800'
        : 'bg-white border-slate-200 text-slate-800'
    }`}>
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
      )}
      <div className="flex-1 text-sm font-medium pr-2">
        {message}
      </div>
      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
