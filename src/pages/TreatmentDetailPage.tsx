import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { NavigationPage } from '../types';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';
import { ArrowLeft, CheckCircle2, HelpCircle, Calendar, MessageSquare, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

interface TreatmentDetailPageProps {
  slug?: string;
  onNavigate: (page: NavigationPage, params?: { slug?: string }) => void;
}

export const TreatmentDetailPage: React.FC<TreatmentDetailPageProps> = ({ slug, onNavigate }) => {
  const { treatments, settings } = useClinic();

  const treatment = treatments.find(t => t.slug === slug && t.isActive) || treatments.find(t => t.isActive);

  if (!treatment) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800">Treatment Not Found</h2>
        <button
          onClick={() => onNavigate('treatments')}
          className="mt-4 px-4 py-2 bg-teal-800 text-white rounded-lg text-sm font-semibold"
        >
          View All Treatments
        </button>
      </div>
    );
  }

  const cleanWhatsapp = settings.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Hello, I would like to enquire about ${treatment.name} at Ahuja's Dental Clinic.`)}`;

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => onNavigate('treatments')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Treatments
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-medium truncate">{treatment.name}</span>
        </div>

        {/* Back Button */}
        <div>
          <button
            onClick={() => onNavigate('treatments')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all treatments</span>
          </button>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              {treatment.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              {treatment.name}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
              {treatment.shortDescription}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('appointment')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment for this Treatment</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Query</span>
            </a>
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            Overview of Procedure
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {treatment.fullDescription}
          </p>

          {treatment.benefits && treatment.benefits.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
                Key Benefits & Clinical Outcomes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {treatment.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Who may need it */}
        {treatment.whoNeedsIt && treatment.whoNeedsIt.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Who May Need This Treatment
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {treatment.whoNeedsIt.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* General Process */}
        {treatment.procedureSteps && treatment.procedureSteps.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              What to Expect: Clinical Process
            </h2>
            <div className="space-y-4">
              {treatment.procedureSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-teal-200">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aftercare */}
        {treatment.aftercare && treatment.aftercare.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
              <h2 className="text-xl font-bold text-slate-900">
                Care & Instructions
              </h2>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {treatment.aftercare.map((care, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-teal-700 font-bold">·</span>
                  <span>{care}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Treatment Specific FAQs */}
        {treatment.faqs && treatment.faqs.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-teal-700" />
              <h2 className="text-xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4 divide-y divide-slate-100">
              {treatment.faqs.map((faq, i) => (
                <div key={i} className={i > 0 ? 'pt-4' : ''}>
                  <p className="font-bold text-sm text-slate-900 mb-1">
                    {faq.question}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medical Disclaimer */}
        <MedicalDisclaimer />

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-md">
          <h3 className="text-xl sm:text-2xl font-bold">
            Ready to Discuss Your Dental Health?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Book an appointment at our Sector 10 clinic for an in-person assessment and professional treatment plan.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('appointment')}
              className="px-6 py-3 bg-white text-teal-950 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Request Consultation
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
