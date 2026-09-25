import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { AppointmentRequest, AppointmentStatus } from '../../types';
import { Calendar, Search, Filter, Phone, Mail, Trash2, Edit3, CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { Toast } from '../../components/common/Toast';

export const AdminAppointments: React.FC = () => {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useClinic();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingApt, setEditingApt] = useState<AppointmentRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const statuses: { label: string; value: string }[] = [
    { label: 'All Requests', value: 'all' },
    { label: 'New', value: 'new' },
    { label: 'Contacted', value: 'contacted' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  const filtered = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
                          apt.phone.includes(search) ||
                          apt.treatmentName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    try {
      await updateAppointmentStatus(id, status);
      setToast({ type: 'success', message: `Appointment status updated to ${status}` });
    } catch {
      setToast({ type: 'error', message: 'Failed to update status' });
    }
  };

  const handleSaveNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApt) return;
    try {
      await updateAppointmentStatus(editingApt.id, editingApt.status, adminNotes);
      setToast({ type: 'success', message: 'Staff notes saved' });
      setEditingApt(null);
    } catch {
      setToast({ type: 'error', message: 'Failed to save notes' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment request?')) {
      try {
        await deleteAppointment(id);
        setToast({ type: 'success', message: 'Appointment deleted' });
      } catch {
        setToast({ type: 'error', message: 'Failed to delete appointment' });
      }
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-700" />
            <span>Patient Appointment Requests</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming bookings from Sector 10 and Ambala residents.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
          {statuses.map(st => (
            <button
              key={st.value}
              onClick={() => setFilterStatus(st.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterStatus === st.value
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
      </div>

      {/* Appointments List / Table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 text-xs">
          No appointment requests found matching your filter.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100">
            {filtered.map((apt) => {
              const cleanPhone = apt.phone.replace(/[^0-9]/g, '');
              const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${apt.patientName}, this is Ahuja's Dental Clinic regarding your appointment request for ${apt.treatmentName} on ${apt.preferredDate}.`)}`;

              return (
                <div key={apt.id} className="p-5 hover:bg-slate-50/60 transition-colors space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 font-bold text-xs flex items-center justify-center">
                        {apt.patientName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{apt.patientName}</h3>
                        <p className="text-xs text-teal-900 font-semibold">{apt.treatmentName}</p>
                      </div>
                    </div>

                    {/* Status Dropdown / Indicator */}
                    <div className="flex items-center gap-2">
                      <select
                        value={apt.status}
                        onChange={(e) => handleStatusChange(apt.id, e.target.value as AppointmentStatus)}
                        className={`text-xs font-bold uppercase rounded-lg px-2.5 py-1 border cursor-pointer ${
                          apt.status === 'new' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          apt.status === 'confirmed' ? 'bg-teal-50 text-teal-800 border-teal-200' :
                          apt.status === 'contacted' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          apt.status === 'completed' ? 'bg-slate-100 text-slate-800 border-slate-200' :
                          'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => handleDelete(apt.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Schedule Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Preferred Date & Time</span>
                      <span className="font-semibold text-slate-800">{apt.preferredDate}</span> · <span className="text-slate-600">{apt.preferredTime}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Contact Details</span>
                      <div className="flex items-center gap-2">
                        <a href={`tel:${apt.phone}`} className="font-semibold text-slate-900 hover:underline">
                          {apt.phone}
                        </a>
                        {apt.email && <span className="text-slate-400 truncate">({apt.email})</span>}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Fast Actions</span>
                      <div className="flex items-center gap-3 mt-0.5">
                        <a href={`tel:${apt.phone}`} className="text-teal-800 hover:underline font-semibold flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-semibold flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Message & Staff notes */}
                  {apt.message && (
                    <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-700">Patient Note: </span>
                      <span>{apt.message}</span>
                    </div>
                  )}

                  {/* Admin notes display / edit */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="text-slate-500">
                      {apt.adminNotes ? (
                        <span><strong className="text-slate-700">Clinic Notes:</strong> {apt.adminNotes}</span>
                      ) : (
                        <span className="italic text-slate-400">No staff notes added.</span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setEditingApt(apt);
                        setAdminNotes(apt.adminNotes || '');
                      }}
                      className="text-teal-800 hover:underline font-medium text-[11px] flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{apt.adminNotes ? 'Edit note' : 'Add note'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Edit Notes Modal */}
      {editingApt && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              Internal Staff Note ({editingApt.patientName})
            </h3>
            <form onSubmit={handleSaveNotes} className="space-y-4">
              <textarea
                rows={3}
                placeholder="e.g. Called on 24 Sep, confirmed appointment for 11:30 AM with Dr. Ahuja..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setEditingApt(null)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-800 text-white font-semibold rounded-lg hover:bg-teal-900"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
