import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { NavigationPage } from '../../types';
import { ArrowRight, Stethoscope, Sparkles, ShieldCheck, Activity, Layers, Crosshair, Smile, Check } from 'lucide-react';

interface FeaturedTreatmentsProps {
  onNavigate: (page: NavigationPage, params?: { slug?: string }) => void;
}

export const FeaturedTreatments: React.FC<FeaturedTreatmentsProps> = ({ onNavigate }) => {
  const { treatments } = useClinic();

  const activeTreatments = treatments.filter(t => t.isActive).slice(0, 6);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return Sparkles;
      case 'ShieldCheck': return ShieldCheck;
      case 'Activity': return Activity;
      case 'Layers': return Layers;
      case 'Crosshair': return Crosshair;
      case 'Smile': return Smile;
      default: return Stethoscope;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Clinical Procedures
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Comprehensive Dental Treatments
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every procedure is recommended following a thorough clinical examination and tailored to your individual oral health needs.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={() => onNavigate('treatments')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 hover:text-teal-950 cursor-pointer"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Treatment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTreatments.map((treatment) => {
            const Icon = getIcon(treatment.iconName);
            return (
              <div
                key={treatment.id}
                className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white group-hover:bg-teal-50 text-teal-800 border border-slate-200/80 group-hover:border-teal-200 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {treatment.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-950 transition-colors mb-2">
                    {treatment.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {treatment.shortDescription}
                  </p>

                  {treatment.benefits && treatment.benefits.length > 0 && (
                    <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                      {treatment.benefits.slice(0, 2).map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('treatment-detail', { slug: treatment.slug })}
                    className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onNavigate('appointment')}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white group-hover:bg-teal-800 text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-teal-800 transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Notice */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Treatment suitability varies by individual. A comprehensive consultation is required for an accurate medical assessment.
        </div>

      </div>
    </section>
  );
};
