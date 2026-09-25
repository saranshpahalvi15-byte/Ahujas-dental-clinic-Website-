import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { NavigationPage } from '../types';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';
import { Stethoscope, Sparkles, ShieldCheck, Activity, Layers, Crosshair, Smile, ArrowRight, Search, Check } from 'lucide-react';

interface TreatmentsPageProps {
  onNavigate: (page: NavigationPage, params?: { slug?: string }) => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({ onNavigate }) => {
  const { treatments } = useClinic();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const activeTreatments = treatments.filter(t => t.isActive);

  // Extract categories
  const categories = ['All', ...Array.from(new Set(activeTreatments.map(t => t.category)))];

  const filteredTreatments = activeTreatments.filter(treatment => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          treatment.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || treatment.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return Sparkles;
      case 'ShieldCheck': return ShieldCheck;
      case 'Activity': return Activity;
      case 'Layers': return Layers;
      case 'Crosshair': return Crosshair;
      case 'Smile': return Smile;
      default: return Stethoscope;
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Clinical Services
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Dental Treatments & Procedures
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore our dental services available at Sector 10, Ambala. Each procedure is performed with clinical care, thorough hygiene, and personalized guidance.
          </p>
        </div>

        {/* Filter Controls (Interactive Segmented Tabs compliant with zero-pill rule) */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
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

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Treatment Grid */}
        {filteredTreatments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <p className="text-slate-600 font-medium">No treatments found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs font-semibold text-teal-800 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTreatments.map((treatment) => {
              const Icon = getIcon(treatment.iconName);
              return (
                <div
                  key={treatment.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-teal-50 text-teal-800 border border-teal-100">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {treatment.category}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 mb-2">
                      {treatment.name}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {treatment.shortDescription}
                    </p>

                    {treatment.benefits && treatment.benefits.length > 0 && (
                      <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                        {treatment.benefits.slice(0, 3).map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate('treatment-detail', { slug: treatment.slug })}
                      className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Complete Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onNavigate('appointment')}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-800 hover:text-white transition-colors cursor-pointer"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <MedicalDisclaimer />

      </div>
    </div>
  );
};
