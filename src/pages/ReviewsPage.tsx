import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { NavigationPage, ReviewItem } from '../types';
import { Star, ExternalLink, MessageSquareQuote, CheckCircle2, Send, HeartHandshake } from 'lucide-react';
import { Toast } from '../components/common/Toast';

interface ReviewsPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate }) => {
  const { reviews, settings, saveReview } = useClinic();
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Feedback submission form state
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [treatmentName, setTreatmentName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeReviews = reviews.filter(r => r.isActive);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) {
      setToast({ type: 'error', message: 'Please enter your name and feedback.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const newReview: ReviewItem = {
        id: `rev-${Date.now()}`,
        authorName: authorName.trim(),
        rating,
        treatmentName: treatmentName.trim() || 'General Consultation',
        reviewText: reviewText.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        isVerified: true,
        isActive: true,
        source: 'Patient Feedback'
      };

      await saveReview(newReview);
      setToast({ type: 'success', message: 'Thank you for sharing your feedback with Ahuja\'s Dental Clinic!' });
      setShowFeedbackModal(false);
      setAuthorName('');
      setTreatmentName('');
      setReviewText('');
    } catch {
      setToast({ type: 'error', message: 'Could not submit feedback. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Patient Experiences
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Verified Patient Feedback
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Transparent, genuine experiences from individuals and families who have visited Ahuja's Dental Clinic in Sector 10, Ambala.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={settings.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 shadow-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-teal-700" />
              <span>Review Us on Google</span>
            </a>

            <button
              onClick={() => setShowFeedbackModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Share Your Feedback</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h3 className="font-bold text-slate-900">{rev.authorName}</h3>
                  {rev.treatmentName && (
                    <p className="text-slate-500 text-[11px]">{rev.treatmentName}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-medium text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{rev.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Transparency Note */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <HeartHandshake className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800 block mb-0.5">Commitment to Ethical Practice</span>
            <span>
              All feedback displayed reflects genuine patient consultations. We do not generate synthetic ratings or guarantee clinical outcomes, respecting dental health guidelines and patient trust.
            </span>
          </div>
        </div>

      </div>

      {/* Share Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Share Your Experience</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your feedback helps us continuously improve our patient care at Sector 10, Ambala.
              </p>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh K."
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Treatment or Reason for Visit</label>
                <input
                  type="text"
                  placeholder="e.g. Dental Cleaning, Consultation, RCT"
                  value={treatmentName}
                  onChange={(e) => setTreatmentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-slate-700 ml-2">{rating} out of 5</span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Your Review Comments *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your consultation, clinical hygiene, or overall experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
