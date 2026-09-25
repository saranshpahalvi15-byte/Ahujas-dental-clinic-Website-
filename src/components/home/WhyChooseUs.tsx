import React from 'react';
import { MapPin, ShieldCheck, HeartPulse, Sparkles, PhoneCall, CheckCircle } from 'lucide-react';
import { NavigationPage } from '../../types';

interface WhyChooseUsProps {
  onNavigate: (page: NavigationPage) => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onNavigate }) => {
  const points = [
    {
      icon: MapPin,
      title: 'Accessible Sector 10 Location',
      description: 'Centrally located at DSS 73, Sector 10 Market, directly opposite the Polyclinic in Ambala with effortless parking.'
    },
    {
      icon: ShieldCheck,
      title: 'Sterilization & Clinical Hygiene',
      description: 'Uncompromising infection control protocols with modern autoclaving and disposable safety barriers for every single patient.'
    },
    {
      icon: HeartPulse,
      title: 'Comfort-First Patient Care',
      description: 'We prioritize pain-relief, gentle handling, and open communication to ensure children and adults feel at ease throughout treatment.'
    },
    {
      icon: CheckCircle,
      title: 'Ethical & Transparent Advice',
      description: 'We explain the diagnosis thoroughly and outline clear restorative options without pushing unneeded procedures.'
    },
    {
      icon: Sparkles,
      title: 'Modern Clinical Equipment',
      description: 'Equipped with digital diagnostic tools and ergonomic dental chairs for precise and efficient dental restorations.'
    },
    {
      icon: PhoneCall,
      title: 'Responsive Communication',
      description: 'Direct WhatsApp and phone assistance for appointment queries, schedule confirmations, and post-visit advice.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Patient Care Principles
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Why Patients Choose Ahuja's Dental Clinic
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Grounded in clinical ethics, modern hygiene standards, and genuine consideration for our patients in Sector 10, Ambala.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('appointment')}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Request a Consultation at Sector 10
          </button>
        </div>

      </div>
    </section>
  );
};
