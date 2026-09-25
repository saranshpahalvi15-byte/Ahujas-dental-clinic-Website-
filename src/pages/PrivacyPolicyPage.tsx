import React from 'react';
import { NavigationPage } from '../types';
import { useClinic } from '../context/ClinicContext';
import { Shield, ArrowLeft } from 'lucide-react';

interface Props {
  onNavigate: (page: NavigationPage) => void;
}

export const PrivacyPolicyPage: React.FC<Props> = ({ onNavigate }) => {
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
            <Shield className="w-4 h-4" />
            <span>Legal Policy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: September 2026 · {settings.name}
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you use our website to submit an appointment request or contact enquiry, we may collect your name, phone number, email address, preferred appointment schedule, and any voluntary message describing your dental consultation interest.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. How We Use Your Information</h2>
            <p>
              The collected information is used solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Schedule, confirm, and coordinate your clinical dental appointment.</li>
              <li>Respond to your direct enquiries and messages.</li>
              <li>Maintain administrative clinic records and provide post-consultation care instructions when requested.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Data Security & Confidentiality</h2>
            <p>
              We treat all patient contact requests with medical confidentiality. We do not sell, trade, or distribute your personal or contact information to any third-party marketing companies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to have your contact details updated or removed from our appointment request log, please contact {settings.name} at DSS 73, Sector 10 Market, Opposite Polyclinic, Sector 10, Ambala, Haryana 134003 or call {settings.phone}.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};
