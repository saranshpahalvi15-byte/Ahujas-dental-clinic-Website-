import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface Props {
  variant?: 'banner' | 'card' | 'inline';
  className?: string;
}

export const MedicalDisclaimer: React.FC<Props> = ({ variant = 'card', className = '' }) => {
  if (variant === 'banner') {
    return (
      <div className={`bg-slate-100 border-y border-slate-200 px-4 py-2.5 text-xs text-slate-600 ${className}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0" />
            <span><strong>Medical Disclaimer:</strong> The information on this website is for general informational purposes and does not replace professional clinical evaluation or advice.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 ${className}`}>
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-800 mb-1">Professional Dental Care Disclaimer</p>
          <p className="leading-relaxed">
            Dental conditions and treatment suitability vary individually. Information presented here is educational and must not be used as self-diagnosis. A physical consultation with a dental surgeon is required to recommend suitable clinical treatment.
          </p>
        </div>
      </div>
    </div>
  );
};
