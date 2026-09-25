import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { FAQItem } from '../../types';
import { HelpCircle, Plus, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';
import { Toast } from '../../components/common/Toast';

export const AdminFaqs: React.FC = () => {
  const { faqs, saveFAQ, deleteFAQ } = useClinic();
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('Appointments');

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category || 'General');
    setIsAdding(false);
  };

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setQuestion('');
    setAnswer('');
    setCategory('Appointments');
    setIsAdding(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      setToast({ type: 'error', message: 'Question and answer are required.' });
      return;
    }

    const item: FAQItem = {
      id: editingFaq ? editingFaq.id : `faq-${Date.now()}`,
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim() || 'General',
      order: editingFaq?.order || faqs.length + 1,
      isActive: editingFaq ? editingFaq.isActive : true
    };

    try {
      await saveFAQ(item);
      setToast({ type: 'success', message: 'FAQ updated.' });
      setEditingFaq(null);
      setIsAdding(false);
    } catch {
      setToast({ type: 'error', message: 'Failed to save FAQ.' });
    }
  };

  const handleToggle = async (faq: FAQItem) => {
    try {
      await saveFAQ({ ...faq, isActive: !faq.isActive });
      setToast({ type: 'success', message: 'FAQ status toggled.' });
    } catch {
      setToast({ type: 'error', message: 'Failed to update.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this FAQ entry?')) {
      try {
        await deleteFAQ(id);
        setToast({ type: 'success', message: 'FAQ deleted.' });
      } catch {
        setToast({ type: 'error', message: 'Failed to delete.' });
      }
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-700" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage patient questions, consultation rules, and clinical guidelines.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs rounded-xl shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
        {faqs.map((faq) => (
          <div key={faq.id} className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                {faq.category}
              </span>
              <h3 className="font-bold text-sm text-slate-900 pt-1">{faq.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggle(faq)}
                className={`text-xs flex items-center gap-1 font-medium ${faq.isActive ? 'text-emerald-700' : 'text-slate-400'}`}
              >
                {faq.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{faq.isActive ? 'Active' : 'Hidden'}</span>
              </button>

              <button
                onClick={() => handleOpenEdit(faq)}
                className="p-1.5 text-slate-500 hover:text-teal-800 rounded-lg"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(faq.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {(editingFaq || isAdding) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              {isAdding ? 'Add FAQ Item' : 'Edit FAQ Item'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Appointments, Location, Safety"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Answer *</label>
                <textarea
                  required
                  rows={4}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setEditingFaq(null); setIsAdding(false); }}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-800 text-white font-semibold rounded-lg hover:bg-teal-900"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
