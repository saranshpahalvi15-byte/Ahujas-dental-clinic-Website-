import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';
import { NavigationPage } from '../../types';

interface MobileActionBarProps {
  onNavigate: (page: NavigationPage) => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onNavigate }) => {
  const { settings } = useClinic();

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello, I would like to enquire about an appointment at Ahuja's Dental Clinic.")}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl px-3 py-2">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Call CTA */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors active:scale-95"
          aria-label="Call clinic directly"
        >
          <Phone className="w-4 h-4 text-teal-700 mb-0.5" />
          <span>Call</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Book Appointment CTA */}
        <button
          onClick={() => onNavigate('appointment')}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-sm transition-colors active:scale-95 cursor-pointer"
          aria-label="Request appointment"
        >
          <Calendar className="w-4 h-4 text-teal-200 mb-0.5" />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};
