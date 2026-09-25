import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { NavigationPage } from '../../types';
import { Calendar, MessageSquare, MapPin, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: NavigationPage) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { settings } = useClinic();

  const cleanWhatsapp = settings.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello, I would like to enquire about an appointment at Ahuja's Dental Clinic.")}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Location Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-900 bg-teal-50/80 border border-teal-200/80 px-3 py-1.5 rounded-md">
              <MapPin className="w-3.5 h-3.5 text-teal-700" />
              <span>Sector 10 Market, Opposite Polyclinic, Ambala</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              {settings.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {settings.heroSubtitle}
            </p>

            {/* Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Modern Sterilization & Clinical Hygiene</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Convenient Sector 10 Market Location</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Transparent Treatment Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Prompt WhatsApp & Call Support</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('appointment')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-teal-800 hover:bg-teal-900 active:bg-teal-950 rounded-xl shadow-md hover:shadow transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <Calendar className="w-5 h-5" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <MapPin className="w-4 h-4 text-teal-700" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100">
              <img
                src="/src/assets/images/hero_dental_clinic_1790239444640.jpg"
                alt="Ahuja's Dental Clinic operatory room in Sector 10 Ambala"
                className="w-full h-80 sm:h-96 object-cover object-center"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              
              {/* Overlay location footer card */}
              <div className="p-4 bg-white/95 backdrop-blur-md border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Ahuja's Dental Clinic</h2>
                    <p className="text-xs text-slate-500">DSS 73, Sector 10 Market, Ambala</p>
                  </div>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
