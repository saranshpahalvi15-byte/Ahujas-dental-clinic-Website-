import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { ReviewItem } from '../../types';
import { Star, Plus, Trash2, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Toast } from '../../components/common/Toast';

export const AdminReviews: React.FC = () => {
  const { reviews, saveReview, deleteReview } = useClinic();
  const [isAdding, setIsAdding] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [treatmentName, setTreatmentName] = useState('');
  const [source, setSource] = useState('Clinic Feedback');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) {
      setToast({ type: 'error', message: 'Author name and review text are required.' });
      return;
    }

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      authorName: authorName.trim(),
      rating,
      reviewText: reviewText.trim(),
      treatmentName: treatmentName.trim() || undefined,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      isVerified: true,
      isActive: true,
      source
    };

    try {
      await saveReview(newRev);
      setToast({ type: 'success', message: 'Review added.' });
      setIsAdding(false);
      setAuthorName('');
      setReviewText('');
      setTreatmentName('');
    } catch {
      setToast({ type: 'error', message: 'Failed to save review.' });
    }
  };

  const handleToggle = async (rev: ReviewItem) => {
    try {
      await saveReview({ ...rev, isActive: !rev.isActive });
      setToast({ type: 'success', message: 'Review visibility toggled.' });
    } catch {
      setToast({ type: 'error', message: 'Failed to toggle visibility.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this review?')) {
      try {
        await deleteReview(id);
        setToast({ type: 'success', message: 'Review deleted.' });
      } catch {
        setToast({ type: 'error', message: 'Failed to delete review.' });
      }
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            <span>Verified Patient Reviews</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage genuine patient reviews and feedback for Ahuja's Dental Clinic.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs rounded-xl shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>

              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{rev.reviewText}"
              </p>

              <div className="text-xs">
                <span className="font-bold text-slate-900">{rev.authorName}</span>
                {rev.treatmentName && <span className="text-slate-500"> ({rev.treatmentName})</span>}
                <span className="ml-2 text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                  {rev.source}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => handleToggle(rev)}
                className={`flex items-center gap-1 font-medium ${rev.isActive ? 'text-emerald-700' : 'text-slate-400'}`}
              >
                {rev.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{rev.isActive ? 'Visible on Website' : 'Hidden'}</span>
              </button>

              <button
                onClick={() => handleDelete(rev.id)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Add Patient Feedback</h3>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Khanna"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Good)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Treatment Name</label>
                <input
                  type="text"
                  placeholder="e.g. Teeth Cleaning, Crown"
                  value={treatmentName}
                  onChange={(e) => setTreatmentName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Review Source</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Clinic Feedback, Google Review"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Feedback Text *</label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-800 text-white font-semibold rounded-lg hover:bg-teal-900"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
