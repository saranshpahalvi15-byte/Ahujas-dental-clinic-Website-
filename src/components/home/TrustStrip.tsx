import React from 'react';
import { MapPin, HeartHandshake, ShieldCheck, Clock } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustFeatures = [
    {
      icon: MapPin,
      title: 'Sector 10 Market Location',
      description: 'Easily accessible opposite Polyclinic with convenient parking space.'
    },
    {
      icon: ShieldCheck,
      title: 'Strict Clinical Hygiene',
      description: 'Sterilized instrumentation and protective protocols for every visit.'
    },
    {
      icon: HeartHandshake,
      title: 'Patient-First Approach',
      description: 'Transparent treatment discussions with zero pressure or rush.'
    },
    {
      icon: Clock,
      title: 'Prompt Scheduling',
      description: 'Quick appointment confirmation via online form, phone, or WhatsApp.'
    }
  ];

  return (
    <section className="bg-white border-b border-slate-200/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-teal-50 text-teal-800 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-0.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
