import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { NavigationPage } from '../types';
import { MapPin, Phone, MessageSquare, Mail, Send, Clock, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';
import { OpeningHoursCard } from '../components/home/OpeningHoursCard';
import { Toast } from '../components/common/Toast';

interface ContactPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { settings, submitEnquiry } = useClinic();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello, I would like to make an enquiry at Ahuja's Dental Clinic.")}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setToast({ type: 'error', message: 'Please fill in all required fields (Name, Phone, and Message).' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        subject: subject.trim() || 'General Enquiry',
        message: message.trim()
      });

      if (res.success) {
        setToast({ type: 'success', message: res.message });
        setName('');
        setPhone('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch {
      setToast({ type: 'error', message: 'Something went wrong. Please call or WhatsApp us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Contact & Clinic Location
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Reach out for appointment enquiries, treatment questions, or directions to our Sector 10 clinic in Ambala.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Clinic Address</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
            </p>
            <p className="text-xs font-semibold text-teal-800 pt-1">
              Opposite Polyclinic
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Phone Call</h3>
            <p className="text-xs text-slate-600">
              For direct assistance & instant appointments:
            </p>
            <a href={`tel:${cleanPhone}`} className="block text-sm font-bold text-teal-900 hover:underline pt-1">
              {settings.phone}
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">WhatsApp</h3>
            <p className="text-xs text-slate-600">
              Message our clinic directly for quick enquiries:
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block text-sm font-bold text-emerald-800 hover:underline pt-1">
              Chat on WhatsApp →
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Email</h3>
            <p className="text-xs text-slate-600">
              For written correspondence & administrative records:
            </p>
            <a href={`mailto:${settings.email}`} className="block text-xs font-bold text-teal-900 hover:underline pt-1 truncate">
              {settings.email}
            </a>
          </div>

        </div>

        {/* Main Grid: Form + Opening Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: 7 cols */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Send an Enquiry</h2>
              <p className="text-xs text-slate-500 mt-1">
                Have a question or looking for appointment options? Fill out the form below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98123 45678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Subject / Treatment of Interest</label>
                  <input
                    type="text"
                    placeholder="e.g. Toothache, Scaling, RCT query"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Message / Question *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe how we can assist you..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavigate('appointment')}
                  className="text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
                >
                  Need a confirmed appointment? Book directly →
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl shadow-sm disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right: Opening Hours & Map Link (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <OpeningHoursCard />

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Map & Directions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                DSS 73, Sector 10 Market, Opposite Polyclinic, Sector 10, Ambala, Haryana 134003.
              </p>
              <div className="flex gap-2.5">
                <a
                  href={settings.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Directions</span>
                </a>
                <a
                  href={settings.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
