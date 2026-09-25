import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { GalleryCategory, GalleryItem, NavigationPage } from '../types';
import { X, ZoomIn, Image as ImageIcon, MapPin } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { gallery } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories: string[] = ['All', 'Clinic', 'Reception', 'Treatment Room', 'Equipment', 'Team', 'Exterior'];

  const activeItems = gallery.filter(item => item.isActive);
  const filteredItems = selectedCategory === 'All' 
    ? activeItems 
    : activeItems.filter(item => item.category === selectedCategory);

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sector 10 Market, Ambala</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Clinic & Facility Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Take a visual tour of our clean operatory room, patient waiting lounge, and clinical equipment at Ahuja's Dental Clinic.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-slate-600 font-medium">No photos found in this category.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs font-semibold text-teal-800 hover:underline"
            >
              Show all photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.altText || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-md">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white flex items-center justify-between border-t border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>
                  </div>
                  <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note on Photography */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
          Note: Authentic photographs of our Sector 10 clinic facilities and sterilized operatory environment.
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxItem(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <div>
                <h3 className="font-bold text-sm sm:text-base">{lightboxItem.title}</h3>
                <p className="text-xs text-slate-400">{lightboxItem.category} · Ahuja's Dental Clinic</p>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-2 bg-black flex items-center justify-center max-h-[75vh]">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.altText || lightboxItem.title}
                className="max-h-[70vh] max-w-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            {lightboxItem.altText && (
              <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-300">
                {lightboxItem.altText}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
