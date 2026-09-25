import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { GalleryItem, GalleryCategory } from '../../types';
import { Image as ImageIcon, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { Toast } from '../../components/common/Toast';

export const AdminGallery: React.FC = () => {
  const { gallery, saveGalleryItem, deleteGalleryItem } = useClinic();
  const [isAdding, setIsAdding] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('Clinic');
  const [altText, setAltText] = useState('');

  const categories: GalleryCategory[] = ['Clinic', 'Reception', 'Treatment Room', 'Equipment', 'Team', 'Exterior'];

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      setToast({ type: 'error', message: 'Title and Image URL are required' });
      return;
    }

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: title.trim(),
      imageUrl: imageUrl.trim(),
      category,
      altText: altText.trim() || title.trim(),
      order: gallery.length + 1,
      isActive: true
    };

    try {
      await saveGalleryItem(newItem);
      setToast({ type: 'success', message: 'Photo added to gallery' });
      setIsAdding(false);
      setTitle('');
      setImageUrl('');
      setAltText('');
    } catch {
      setToast({ type: 'error', message: 'Failed to add gallery item' });
    }
  };

  const handleToggle = async (item: GalleryItem) => {
    try {
      await saveGalleryItem({ ...item, isActive: !item.isActive });
      setToast({ type: 'success', message: 'Visibility updated' });
    } catch {
      setToast({ type: 'error', message: 'Failed to update visibility' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this photo from gallery?')) {
      try {
        await deleteGalleryItem(id);
        setToast({ type: 'success', message: 'Photo deleted' });
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
            <ImageIcon className="w-5 h-5 text-teal-700" />
            <span>Clinic Gallery Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Photographs of operatory room, reception lounge, and clinical equipment.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs rounded-xl shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 text-[10px] font-bold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>

            <div className="p-3 bg-white space-y-2">
              <div>
                <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{item.title}</h3>
                <p className="text-[11px] text-slate-400 line-clamp-1">{item.altText}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggle(item)}
                  className={`text-xs flex items-center gap-1 font-medium ${
                    item.isActive ? 'text-emerald-700' : 'text-slate-400'
                  }`}
                >
                  {item.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{item.isActive ? 'Visible' : 'Hidden'}</span>
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Photo Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Add Gallery Image</h3>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Consultation Suite"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://... or /src/assets/images/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Accessibility Alt Text</label>
                <input
                  type="text"
                  placeholder="e.g. Clean operatory chair at Ahuja's Dental Clinic"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
