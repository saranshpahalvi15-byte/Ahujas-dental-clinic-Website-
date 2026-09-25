import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { NavigationPage } from '../types';
import { Calendar, Clock, CheckCircle2, Phone, MessageSquare, ShieldCheck, MapPin, User, ArrowRight } from 'lucide-react';
import { Toast } from '../components/common/Toast';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

interface AppointmentPageProps {
  onNavigate: (page: NavigationPage) => void;
  preSelectedTreatment?: string;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = ({ onNavigate, preSelectedTreatment }) => {
  const { settings, treatments, submitAppointmentRequest } = useClinic();

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('09:00 AM - 11:00 AM (Morning Slot)');
  const [treatmentName, setTreatmentName] = useState(preSelectedTreatment || 'General Dental Consultation');
  const [message, setMessage] = useState('');
  const [consentGiven, setConsentGiven] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const activeTreatments = treatments.filter(t => t.isActive);

  // Suggested minimum date is today
  const todayStr = new Date().toISOString().split('T')[0];

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Hello, I have submitted an appointment request for ${patientName || 'a consultation'} on ${preferredDate || 'upcoming slot'}. Please confirm availability.`)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      setToast({ type: 'error', message: 'Please enter patient name.' });
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setToast({ type: 'error', message: 'Please provide a valid contact phone number.' });
      return;
    }
    if (!preferredDate) {
      setToast({ type: 'error', message: 'Please choose your preferred appointment date.' });
      return;
    }
    if (!consentGiven) {
      setToast({ type: 'error', message: 'Please accept the communication consent to proceed.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitAppointmentRequest({
        patientName: patientName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        preferredDate,
        preferredTime,
        treatmentName,
        message: message.trim() || undefined,
        consentGiven: true
      });

      if (res.success) {
        setIsSubmitted(true);
        setToast({ type: 'success', message: 'Appointment request received!' });
      }
    } catch {
      setToast({ type: 'error', message: 'Could not submit request. Please reach out to us via phone or WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Consultation Booking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Request a Dental Appointment
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Submit your preferred time and dental concern. Our clinic team in Sector 10, Ambala will contact you promptly to confirm your scheduled slot.
          </p>
        </div>

        {isSubmitted ? (
          /* Confirmation State */
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-emerald-200 shadow-md text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">
                Appointment Request Submitted
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thank you, <strong>{patientName}</strong>. We have logged your request for <strong>{preferredDate}</strong> ({preferredTime}). Our clinic staff will contact you at <strong>{phone}</strong> to confirm your slot.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Clinic:</span>
                <span className="font-semibold text-slate-800">{settings.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-slate-800">DSS 73, Sector 10 Market, Ambala</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Treatment:</span>
                <span className="font-semibold text-slate-800">{treatmentName}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setPatientName('');
                  setPhone('');
                  setMessage('');
                }}
                className="px-5 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            
            <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
              
              {/* Patient Details */}
              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-700" />
                  <span>1. Patient Information</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98123 45678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* Appointment Preferences */}
              <div className="space-y-4 pt-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-700" />
                  <span>2. Schedule & Treatment Preference</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Preferred Time Window
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                      <option value="09:00 AM - 11:00 AM (Morning Slot)">09:00 AM - 11:00 AM (Morning Slot)</option>
                      <option value="11:00 AM - 01:00 PM (Noon Slot)">11:00 AM - 01:00 PM (Noon Slot)</option>
                      <option value="05:00 PM - 07:00 PM (Evening Slot)">05:00 PM - 07:00 PM (Evening Slot)</option>
                      <option value="07:00 PM - 08:30 PM (Late Evening)">07:00 PM - 08:30 PM (Late Evening)</option>
                      <option value="Any Available Slot">Any Available Slot</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Dental Treatment / Reason for Consultation
                  </label>
                  <select
                    value={treatmentName}
                    onChange={(e) => setTreatmentName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="Comprehensive Dental Consultation">Comprehensive Dental Consultation</option>
                    {activeTreatments.map((t) => (
                      <option key={t.id} value={t.name}>{t.name} ({t.category})</option>
                    ))}
                    <option value="Tooth Pain / Emergency Checkup">Tooth Pain / Emergency Checkup</option>
                    <option value="Other Dental Concern">Other Dental Concern</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Describe any specific symptoms or notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Sensitivity to cold water on lower left side, bleeding gums, loose crown..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* Consent & Submit */}
              <div className="pt-2 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 w-4 h-4 text-teal-800 rounded border-slate-300 focus:ring-teal-600"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I consent to Ahuja's Dental Clinic contacting me by phone, SMS, or WhatsApp regarding my dental appointment request.
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-slate-500">
                    * This request is subject to clinic confirmation.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 active:bg-teal-950 rounded-xl shadow-md disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Request...' : 'Confirm Appointment Request'}</span>
                  </button>
                </div>
              </div>

            </form>

          </div>
        )}

        {/* Clinic Location Quick Reference */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Clinic: DSS 73, Sector 10 Market, Opposite Polyclinic, Ambala.</span>
          </div>
          <a
            href={`tel:${cleanPhone}`}
            className="font-semibold text-teal-900 hover:underline flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Call</span>
          </a>
        </div>

        <MedicalDisclaimer />

      </div>
    </div>
  );
};
