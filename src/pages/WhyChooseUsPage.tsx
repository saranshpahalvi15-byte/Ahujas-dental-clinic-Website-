import React from 'react';
import { NavigationPage } from '../types';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { TrustStrip } from '../components/home/TrustStrip';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';
import { ShieldCheck, HeartHandshake, MapPin, Award, CheckCircle } from 'lucide-react';

interface WhyChooseUsPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const WhyChooseUsPage: React.FC<WhyChooseUsPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Our Care Standards
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Why Patients Trust Ahuja's Dental Clinic
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We understand visiting a dental clinic can cause anxiety. Our commitment is to deliver gentle, ethical, and hygienic oral healthcare right here in Sector 10, Ambala.
          </p>
        </div>

        <TrustStrip />

        <WhyChooseUs onNavigate={onNavigate} />

        {/* Detailed standards card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 w-fit rounded-xl bg-teal-50 text-teal-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Infection Control & Sterilization
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We uphold clinical sterilization protocols. From autoclaving metal handpieces to utilizing single-use barrier covers, our environment is prepared with patient safety as the baseline.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700" />
                <span>Standardized multi-tier autoclaving system</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700" />
                <span>Disposable patient draping and suction tips</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700" />
                <span>Surface decontamination between patient visits</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 w-fit rounded-xl bg-teal-50 text-teal-800">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Gentle & Transparent Treatment
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We never perform unnecessary dental procedures. Before any work begins, we explain our clinical diagnosis, discuss all viable restorative pathways, and answer your questions openly.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700" />
                <span>Clear discussion of treatment necessity</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700" />
                <span>Attentive pain-management and comfortable numbing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700" />
                <span>Long-term preventive oral guidance</span>
              </li>
            </ul>
          </div>
        </div>

        <MedicalDisclaimer />

      </div>
    </div>
  );
};
