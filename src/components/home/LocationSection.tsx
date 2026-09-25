import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { MapPin, Navigation, ExternalLink, Phone, MessageSquare, Car, Building } from 'lucide-react';
import { OpeningHoursCard } from './OpeningHoursCard';

export const LocationSection: React.FC = () => {
  const { settings } = useClinic();

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello, I would like to enquire about directions to Ahuja's Dental Clinic in Sector 10 Ambala.")}`;

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Find Our Clinic
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Convenient Location in Sector 10, Ambala
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Situated in the well-connected Sector 10 Market, opposite the Polyclinic, with easy ground-level access and ample parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Location Card & Landmarks (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-teal-800 text-white shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {settings.name}
                  </h3>
                  <p className="text-sm font-semibold text-teal-800 mt-0.5">
                    {settings.landmark}
                  </p>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {settings.address}, {settings.city}, {settings.state} - {settings.pincode}, India
                  </p>
                </div>
              </div>

              {/* Landmark Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80">
                <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60">
                  <Building className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Key Landmark</span>
                    <span>Directly opposite the Government Polyclinic in Sector 10.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60">
                  <Car className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Parking & Transit</span>
                    <span>Ample market parking and easy auto/cab access from all parts of Ambala.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={settings.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl shadow-sm transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions in Maps</span>
                </a>

                <a
                  href={settings.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Direct Contacts row */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-700" />
                  <span>Call: </span>
                  <a href={`tel:${cleanPhone}`} className="font-semibold text-slate-900 hover:underline">
                    {settings.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp: </span>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-800 hover:underline">
                    Chat with Clinic
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Opening Hours Component (5 cols) */}
          <div className="lg:col-span-5">
            <OpeningHoursCard />
          </div>

        </div>

      </div>
    </section>
  );
};
