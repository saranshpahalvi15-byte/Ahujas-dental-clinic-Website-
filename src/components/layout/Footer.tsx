import React from 'react';
import { NavigationPage } from '../../types';
import { useClinic } from '../../context/ClinicContext';
import { MapPin, Phone, MessageSquare, Clock, ShieldAlert, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage, params?: { slug?: string }) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, openingHours, treatments } = useClinic();
  const currentYear = new Date().getFullYear();

  const activeTreatments = treatments.filter(t => t.isActive).slice(0, 5);

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello, I would like to enquire about an appointment at Ahuja's Dental Clinic.")}`;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-28 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Col 1: Brand & Location */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {settings.name}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {settings.tagline}
            </p>
            <div className="pt-2 space-y-2.5 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
                <span>
                  {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left cursor-pointer">
                  About Clinic & Team
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('treatments')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Dental Treatments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('why-choose-us')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Clinic Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Patient Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Location & Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('appointment')} className="text-teal-400 hover:text-teal-300 font-medium transition-colors text-left cursor-pointer">
                  Request Appointment →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Treatments */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
              Dental Treatments
            </h4>
            <ul className="space-y-2.5 text-sm">
              {activeTreatments.map((treatment) => (
                <li key={treatment.id}>
                  <button
                    onClick={() => onNavigate('treatment-detail', { slug: treatment.slug })}
                    className="hover:text-white transition-colors text-left cursor-pointer truncate max-w-full block"
                  >
                    {treatment.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('treatments')}
                  className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>View all dental services</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Location Action */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Clinic Timings</span>
            </h4>
            {(() => {
              const monHour = openingHours.find(h => h.day === 'Monday') || { morningSlot: '09:00 AM - 01:00 PM', eveningSlot: '05:00 PM - 08:30 PM' };
              const sunHour = openingHours.find(h => h.day === 'Sunday') || { morningSlot: '10:30 AM - 01:30 PM', note: 'Prior Appt' };
              return (
                <div className="text-xs text-slate-300 space-y-1.5 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="flex justify-between font-medium text-slate-200">
                    <span>Mon - Sat:</span>
                    <span>{monHour.morningSlot}</span>
                  </div>
                  {monHour.eveningSlot && (
                    <div className="flex justify-between text-slate-400">
                      <span>Evening:</span>
                      <span>{monHour.eveningSlot}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 border-t border-slate-700 text-slate-300">
                    <span>Sunday:</span>
                    <span>{sunHour.morningSlot} {sunHour.note ? `(${sunHour.note})` : ''}</span>
                  </div>
                </div>
              );
            })()}

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Get Directions in Google Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* Medical Notice */}
        <div className="py-4 px-4 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-3 mb-8">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Medical Disclaimer:</strong> Information published on this website is for general informational guidance only and is not intended to be medical or dental advice. An individual clinical examination by a qualified dental professional is required to determine suitable treatment.
          </p>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {settings.name}. All rights reserved. Sector 10, Ambala, Haryana.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <button onClick={() => onNavigate('privacy-policy')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Terms of Use
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('medical-disclaimer')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Medical Disclaimer
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('admin')} className="text-teal-400 hover:text-teal-300 font-medium transition-colors cursor-pointer">
              Staff / Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
