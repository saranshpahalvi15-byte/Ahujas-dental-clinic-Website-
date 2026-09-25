import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Treatment } from '../../types';
import { Stethoscope, Plus, Edit2, Trash2, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Toast } from '../../components/common/Toast';

export const AdminTreatments: React.FC = () => {
  const { treatments, saveTreatment, deleteTreatment } = useClinic();
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('General Dentistry');
  const [iconName, setIconName] = useState('Stethoscope');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [benefitsStr, setBenefitsStr] = useState('');
  const [whoNeedsStr, setWhoNeedsStr] = useState('');
  const [stepsStr, setStepsStr] = useState('');
  const [aftercareStr, setAftercareStr] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleOpenEdit = (t: Treatment) => {
    setEditingTreatment(t);
    setName(t.name);
    setSlug(t.slug);
    setCategory(t.category);
    setIconName(t.iconName || 'Stethoscope');
    setShortDescription(t.shortDescription);
    setFullDescription(t.fullDescription);
    setBenefitsStr(t.benefits ? t.benefits.join('\n') : '');
    setWhoNeedsStr(t.whoNeedsIt ? t.whoNeedsIt.join('\n') : '');
    setStepsStr(t.procedureSteps ? t.procedureSteps.join('\n') : '');
    setAftercareStr(t.aftercare ? t.aftercare.join('\n') : '');
    setIsActive(t.isActive);
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    setEditingTreatment(null);
    setName('');
    setSlug('');
    setCategory('General Dentistry');
    setIconName('Stethoscope');
    setShortDescription('');
    setFullDescription('');
    setBenefitsStr('');
    setWhoNeedsStr('');
    setStepsStr('');
    setAftercareStr('');
    setIsActive(true);
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !shortDescription.trim()) {
      setToast({ type: 'error', message: 'Name and Short Description are required.' });
      return;
    }

    const calculatedSlug = slug.trim() ? slug.trim() : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = editingTreatment ? editingTreatment.id : `t-${Date.now()}`;

    const newTreatment: Treatment = {
      id,
      slug: calculatedSlug,
      name: name.trim(),
      category: category.trim() || 'General Dentistry',
      iconName: iconName || 'Stethoscope',
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim() || shortDescription.trim(),
      benefits: benefitsStr.split('\n').map(s => s.trim()).filter(Boolean),
      whoNeedsIt: whoNeedsStr.split('\n').map(s => s.trim()).filter(Boolean),
      procedureSteps: stepsStr.split('\n').map(s => s.trim()).filter(Boolean),
      aftercare: aftercareStr.split('\n').map(s => s.trim()).filter(Boolean),
      faqs: editingTreatment?.faqs || [],
      isActive,
      order: editingTreatment?.order || treatments.length + 1
    };

    try {
      await saveTreatment(newTreatment);
      setToast({ type: 'success', message: 'Treatment updated successfully!' });
      setEditingTreatment(null);
      setIsCreating(false);
    } catch {
      setToast({ type: 'error', message: 'Failed to save treatment.' });
    }
  };

  const handleToggleActive = async (t: Treatment) => {
    try {
      await saveTreatment({ ...t, isActive: !t.isActive });
      setToast({ type: 'success', message: `${t.name} is now ${!t.isActive ? 'Active' : 'Inactive'}` });
    } catch {
      setToast({ type: 'error', message: 'Failed to toggle status' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this treatment?')) {
      try {
        await deleteTreatment(id);
        setToast({ type: 'success', message: 'Treatment removed.' });
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
            <Stethoscope className="w-5 h-5 text-teal-700" />
            <span>Dental Treatments Catalog</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage procedures, descriptions, aftercare instructions, and public visibility.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs rounded-xl shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Treatment</span>
        </button>
      </div>

      {/* Treatments List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100">
          {treatments.map((t) => (
            <div key={t.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{t.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    t.isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {t.isActive ? 'Active' : 'Hidden'}
                  </span>
                  <span className="text-xs text-slate-400">· {t.category}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1">{t.shortDescription}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleActive(t)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border cursor-pointer ${
                    t.isActive 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.isActive ? 'Visible' : 'Hidden'}
                </button>

                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 text-slate-500 hover:text-teal-800 hover:bg-slate-100 rounded-lg cursor-pointer"
                  title="Edit details"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  title="Delete treatment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Create Modal */}
      {(editingTreatment || isCreating) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900">
              {isCreating ? 'Add New Treatment' : `Edit: ${editingTreatment?.name}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Treatment Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Endodontics, Preventive Care"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Short Description (for cards) *</label>
                <textarea
                  required
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Detailed Explanation</label>
                <textarea
                  rows={4}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Key Benefits (1 per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Benefit 1&#10;Benefit 2"
                    value={benefitsStr}
                    onChange={(e) => setBenefitsStr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Who Needs It (1 per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Indication 1&#10;Indication 2"
                    value={whoNeedsStr}
                    onChange={(e) => setWhoNeedsStr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Procedure Steps (1 per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Step 1&#10;Step 2"
                    value={stepsStr}
                    onChange={(e) => setStepsStr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Aftercare Instructions (1 per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Instruction 1&#10;Instruction 2"
                    value={aftercareStr}
                    onChange={(e) => setAftercareStr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-teal-800 focus:ring-teal-600"
                />
                <label htmlFor="isActiveToggle" className="text-xs font-semibold text-slate-800">
                  Publish on website (Active)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTreatment(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs rounded-xl shadow-sm cursor-pointer"
                >
                  Save Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
