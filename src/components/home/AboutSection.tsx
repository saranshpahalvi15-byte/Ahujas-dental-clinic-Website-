import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { NavigationPage } from '../../types';
import { User, CheckCircle2, ArrowRight, Award } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { settings } = useClinic();

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Clinic Introduction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
              <span>About The Practice</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Thoughtful Dental Care Tailored to Your Comfort
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {settings.aboutText}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong>Preventive & Restorative Focus:</strong> We aim to preserve your natural teeth using modern techniques, composite bonding, and precise endodontics.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong>Transparent Communication:</strong> You will always understand your oral health status and treatment choices before making a decision.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong>Comfortable Setting:</strong> Clean, calming atmosphere designed to alleviate dental anxiety for adults and children alike.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-teal-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 shadow-sm transition-colors cursor-pointer"
              >
                <span>Know More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Doctor / Clinical Team Profile Block (Editable) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative">
              <div className="flex items-start gap-4 mb-5">
                {settings.doctorPhoto ? (
                  <img
                    src={settings.doctorPhoto}
                    alt={settings.doctorName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-teal-600"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl shrink-0">
                    <User className="w-8 h-8 text-teal-700" />
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {settings.doctorName || "Dr. Ahuja & Team"}
                  </h3>
                  <p className="text-xs font-semibold text-teal-800">
                    {settings.doctorTitle || "Dental Surgeon"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {settings.doctorSpecialization}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="text-xs text-slate-600 leading-relaxed">
                  {settings.doctorBio}
                </div>

                <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 flex items-center gap-2.5 border border-slate-100">
                  <Award className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>{settings.doctorExperience || "Dedicated to compassionate dental service in Ambala"}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Location: Sector 10 Market, Ambala</span>
                <button
                  onClick={() => onNavigate('appointment')}
                  className="font-semibold text-teal-800 hover:text-teal-950 cursor-pointer"
                >
                  Consult Doctor →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
