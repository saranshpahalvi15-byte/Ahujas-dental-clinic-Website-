import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { NavigationPage } from '../types';
import { User, ShieldCheck, HeartPulse, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

interface AboutPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { settings } = useClinic();

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sector 10, Ambala, Haryana</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            About {settings.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Providing attentive, gentle, and transparent oral healthcare for families and residents in Sector 10 and across the Ambala region.
          </p>
        </div>

        {/* Section 1: Clinic Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 bg-white p-8 rounded-2xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">
              Our Clinical Philosophy
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {settings.aboutText}
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We believe a successful dental visit begins with listening carefully to your concerns. Whether you are coming in for a routine check-up, managing tooth sensitivity, or requiring restorative care, we ensure you have complete clarity on every clinical step beforehand.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Conservative, tooth-preserving techniques</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Multi-step autoclaving & sterilization</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Clear & ethical treatment discussions</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Warm, anxiety-free clinic setting</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <img
                src="/src/assets/images/clinic_reception_lounge_1790239479013.jpg"
                alt="Reception & Patient Lounge at Ahuja's Dental Clinic"
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white text-xs text-slate-500">
                Patient reception and waiting lounge at Sector 10 Market, Ambala.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Doctor & Clinical Team Block (Editable) */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Clinical Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Doctor & Clinical Team
            </h2>
            <p className="text-slate-600 text-sm">
              Our clinical practitioners bring dedicated attention to every patient case.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              {settings.doctorPhoto ? (
                <img
                  src={settings.doctorPhoto}
                  alt={settings.doctorName}
                  className="w-32 h-32 rounded-2xl object-cover border-2 border-teal-600 shadow-sm mb-4"
                />
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-3xl mb-4">
                  <User className="w-14 h-14 text-teal-700" />
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900">
                {settings.doctorName}
              </h3>
              <p className="text-sm font-semibold text-teal-800 mt-0.5">
                {settings.doctorTitle}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {settings.doctorSpecialization}
              </p>
            </div>

            <div className="md:col-span-8 space-y-4 text-sm text-slate-600 leading-relaxed border-t md:border-t-0 md:border-l md:border-slate-200 pt-6 md:pt-0 md:pl-8">
              <p>
                {settings.doctorBio}
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-3 text-xs text-slate-700">
                <Award className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-slate-900 mb-0.5">Experience & Local Service</span>
                  <span>{settings.doctorExperience || "Serving the community of Sector 10 and Ambala with dedication."}</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('appointment')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request an Appointment with Doctor</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Hygiene & Facilities */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
              Safety & Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Hygiene & Clinic Standards
            </h2>
            <p className="text-slate-400 text-sm">
              Your health and safety are protected through rigorous clinical protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
              <ShieldCheck className="w-6 h-6 text-teal-400" />
              <h3 className="text-base font-bold text-white">Instrument Autoclaving</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All reusable stainless-steel dental instruments undergo high-temperature pressurized steam autoclaving.
              </p>
            </div>
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
              <HeartPulse className="w-6 h-6 text-teal-400" />
              <h3 className="text-base font-bold text-white">Single-Use Disposables</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Suction tips, gloves, patient drapes, and barrier sleeves are fresh and discarded immediately after each visit.
              </p>
            </div>
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-teal-400" />
              <h3 className="text-base font-bold text-white">Surface Disinfection</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dental operatory chairs and touch surfaces are disinfected between appointments with medical-grade sanitizers.
              </p>
            </div>
          </div>
        </div>

        <MedicalDisclaimer />

      </div>
    </div>
  );
};
