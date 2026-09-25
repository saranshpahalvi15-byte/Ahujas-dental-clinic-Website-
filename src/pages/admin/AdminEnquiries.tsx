import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { ContactEnquiry, EnquiryStatus } from '../../types';
import { MessageSquare, Search, Phone, Mail, Trash2, CheckCircle2, Archive, MessageCircle } from 'lucide-react';
import { Toast } from '../../components/common/Toast';

export const AdminEnquiries: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useClinic();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const filtered = enquiries.filter(enq => {
    const matchesSearch = enq.name.toLowerCase().includes(search.toLowerCase()) ||
                          enq.phone.includes(search) ||
                          enq.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || enq.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    try {
      await updateEnquiryStatus(id, status);
      setToast({ type: 'success', message: `Enquiry marked as ${status}` });
    } catch {
      setToast({ type: 'error', message: 'Failed to update enquiry status' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this message?')) {
      try {
        await deleteEnquiry(id);
        setToast({ type: 'success', message: 'Enquiry deleted' });
      } catch {
        setToast({ type: 'error', message: 'Failed to delete' });
      }
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-700" />
            <span>General Contact Enquiries</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Incoming patient messages from website contact form.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {['all', 'new', 'replied', 'archived'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize cursor-pointer ${
                filterStatus === st
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 text-xs">
          No enquiries found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(enq => {
            const cleanPhone = enq.phone.replace(/[^0-9]/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${enq.name}, this is Ahuja's Dental Clinic replying to your enquiry.`)}`;

            return (
              <div key={enq.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{enq.name}</h3>
                      <p className="text-[11px] text-slate-400">{enq.subject || 'General Enquiry'}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      enq.status === 'new' ? 'bg-emerald-100 text-emerald-800' :
                      enq.status === 'replied' ? 'bg-teal-100 text-teal-800' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {enq.status}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                    "{enq.message}"
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                    <span className="font-semibold text-slate-800">{enq.phone}</span>
                    {enq.email && <span>· {enq.email}</span>}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${enq.phone}`}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md font-medium flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-1">
                    {enq.status !== 'replied' && (
                      <button
                        onClick={() => handleStatusChange(enq.id, 'replied')}
                        className="p-1 text-slate-400 hover:text-teal-800 rounded"
                        title="Mark Replied"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    {enq.status !== 'archived' && (
                      <button
                        onClick={() => handleStatusChange(enq.id, 'archived')}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded"
                        title="Archive"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(enq.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
