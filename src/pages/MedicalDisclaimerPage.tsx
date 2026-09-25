import React from 'react';
import { NavigationPage } from '../types';
import { useClinic } from '../context/ClinicContext';
import { ShieldAlert, ArrowLeft, HeartPulse, CheckCircle2 } from 'lucide-react';

interface Props {
  onNavigate: (page: NavigationPage) => void;
}

export const MedicalDisclaimerPage: React.FC<Props> = ({ onNavigate }) => {
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
            <ShieldAlert className="w-4 h-4" />
            <span>Healthcare Compliance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Medical & Dental Health Disclaimer
          </h1>
          <p className="text-xs text-slate-500">
            Official health notice · {settings.name}
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm mb-1">Important Patient Notice</p>
              <p className="text-xs leading-relaxed">
                The information on this website is for general informational purposes only and is not medical advice. Individual results and clinical suitability vary. Please consult a dental surgeon for an individual assessment.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. No Doctor-Patient Relationship Established Online</h2>
            <p>
              Browsing this website, submitting an appointment enquiry, or reading about dental conditions does not form a legal or clinical doctor-patient relationship until an in-person clinical examination has occurred at {settings.name} (DSS 73, Sector 10 Market, Opposite Polyclinic, Sector 10, Ambala, Haryana 134003).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Individual Variability</h2>
            <p>
              Oral conditions such as dental caries, periodontal infections, malocclusion, and tooth pain require direct physical visualization, diagnostic dental radiography, and clinical probing. Treatments described on this website are general overviews and must be adapted to individual anatomical factors.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Dental Emergencies</h2>
            <p>
              If you are experiencing severe acute swelling affecting your airway or breathing, uncontrolled oral bleeding after severe trauma, or intense facial trauma, please seek immediate emergency medical care at the nearest hospital or polyclinic emergency department.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};
