import React from 'react';
import { NavigationPage } from '../types';
import { useClinic } from '../context/ClinicContext';
import { FileText, ArrowLeft } from 'lucide-react';

interface Props {
  onNavigate: (page: NavigationPage) => void;
}

export const TermsPage: React.FC<Props> = ({ onNavigate }) => {
  const { settings } = useClinic();

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200">
        
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Website Terms</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Terms of Use
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: September 2026 · {settings.name}
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you agree to these Terms of Use. If you do not agree, please refrain from using the site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Informational Purpose Only</h2>
            <p>
              The content provided on this website—including treatment descriptions, clinic details, and dental hygiene guides—is intended solely for informational and educational purposes. It does not constitute formal medical diagnosis, prognosis, or clinical prescription.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Appointment Requests</h2>
            <p>
              Submitting an online appointment request form does not guarantee an immediate or confirmed booking. An appointment is only finalized once verified and confirmed directly by our clinic front-desk staff.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Limitation of Liability</h2>
            <p>
              {settings.name} and its practitioners will not be liable for any direct, indirect, incidental, or consequential outcomes resulting from the use or interpretation of website materials prior to an in-person clinical examination.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};
