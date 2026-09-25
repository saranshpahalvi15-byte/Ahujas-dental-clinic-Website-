import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { NavigationPage } from '../../types';
import { Calendar, MessageSquare, Stethoscope, Image as ImageIcon, Star, HelpCircle, ArrowRight, Clock, AlertCircle } from 'lucide-react';

interface AdminOverviewProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigate }) => {
  const { appointments, enquiries, treatments, reviews, gallery, faqs } = useClinic();

  const newAppointments = appointments.filter(a => a.status === 'new');
  const newEnquiries = enquiries.filter(e => e.status === 'new');
  const activeTreatments = treatments.filter(t => t.isActive);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-2 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold">Ahuja's Dental Clinic Management</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Real-time patient appointment requests, enquiries, treatment catalog, and clinic operational settings for Sector 10, Ambala.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => onNavigate('admin-appointments')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-sm cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Appointments</span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-800">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{appointments.length}</span>
            {newAppointments.length > 0 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {newAppointments.length} New
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">Manage patient booking requests</p>
        </div>

        <div 
          onClick={() => onNavigate('admin-enquiries')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-sm cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Enquiries</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{enquiries.length}</span>
            {newEnquiries.length > 0 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {newEnquiries.length} New
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">Messages & questions submitted</p>
        </div>

        <div 
          onClick={() => onNavigate('admin-treatments')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-sm cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Treatments</span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-800">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{activeTreatments.length}</span>
            <span className="text-xs text-slate-400">of {treatments.length} active</span>
          </div>
          <p className="text-[11px] text-slate-400">Procedure catalog & guidelines</p>
        </div>

        <div 
          onClick={() => onNavigate('admin-reviews')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-sm cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Reviews</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{reviews.length}</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px] font-medium">Verified</span>
          </div>
          <p className="text-[11px] text-slate-400">Feedback & testimonials</p>
        </div>

      </div>

      {/* Recent Requests Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Appointments */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span>Latest Appointment Requests</span>
            </h3>
            <button
              onClick={() => onNavigate('admin-appointments')}
              className="text-xs font-semibold text-teal-800 hover:underline flex items-center gap-1"
            >
              <span>View all ({appointments.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {appointments.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No appointment requests yet.</p>
          ) : (
            <div className="space-y-3">
              {appointments.slice(0, 4).map((apt) => (
                <div key={apt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{apt.patientName}</h4>
                    <p className="text-slate-600">{apt.phone} · <span className="font-medium text-teal-900">{apt.treatmentName}</span></p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{apt.preferredDate} ({apt.preferredTime})</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    apt.status === 'new' ? 'bg-emerald-100 text-emerald-800' :
                    apt.status === 'confirmed' ? 'bg-teal-100 text-teal-800' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-700" />
              <span>Latest Messages & Enquiries</span>
            </h3>
            <button
              onClick={() => onNavigate('admin-enquiries')}
              className="text-xs font-semibold text-teal-800 hover:underline flex items-center gap-1"
            >
              <span>View all ({enquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {enquiries.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 4).map((enq) => (
                <div key={enq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">{enq.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      enq.status === 'new' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-slate-600 line-clamp-2 italic">"{enq.message}"</p>
                  <p className="text-[11px] text-slate-400">{enq.phone}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
