import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { OpeningHourDay, ClinicSettings } from '../../types';
import { Settings, Save, Clock, MapPin, User, Phone, CheckCircle2, RotateCcw } from 'lucide-react';
import { Toast } from '../../components/common/Toast';

export const AdminSettings: React.FC = () => {
  const { settings, openingHours, updateClinicSettings, updateOpeningHours, resetToInitialData } = useClinic();
  const [formData, setFormData] = useState<ClinicSettings>(settings);
  const [hoursData, setHoursData] = useState<OpeningHourDay[]>(openingHours);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSettingsChange = (field: keyof ClinicSettings, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleHourChange = (index: number, field: keyof OpeningHourDay, value: string | boolean) => {
    setHoursData(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateClinicSettings(formData);
      await updateOpeningHours(hoursData);
      setToast({ type: 'success', message: 'Clinic settings & schedule updated successfully!' });
    } catch {
      setToast({ type: 'error', message: 'Failed to update settings.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all clinic data to initial defaults?')) {
      try {
        await resetToInitialData();
        setFormData(settings);
        setHoursData(openingHours);
        setToast({ type: 'success', message: 'Reset to default data.' });
      } catch {
        setToast({ type: 'error', message: 'Reset failed' });
      }
    }
  };

  return (
    <div className="space-y-8">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-teal-700" />
            <span>Clinic Settings & Operational Schedule</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure contact details, address, doctor bio, and opening hours for Sector 10, Ambala.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8 text-xs sm:text-sm">
        
        {/* Section 1: Basic Clinic Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-teal-700" />
            <span>Clinic Name & Location Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Clinic Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleSettingsChange('name', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleSettingsChange('tagline', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">Street Address *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => handleSettingsChange('address', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Landmark *</label>
              <input
                type="text"
                required
                value={formData.landmark}
                onChange={(e) => handleSettingsChange('landmark', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleSettingsChange('city', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleSettingsChange('state', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleSettingsChange('pincode', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Google Maps URL</label>
              <input
                type="text"
                value={formData.mapsUrl}
                onChange={(e) => handleSettingsChange('mapsUrl', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Google Business Listing URL</label>
              <input
                type="text"
                value={formData.googleBusinessUrl}
                onChange={(e) => handleSettingsChange('googleBusinessUrl', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Channels */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Phone className="w-4 h-4 text-teal-700" />
            <span>Contact Channels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Primary Phone *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => handleSettingsChange('phone', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">WhatsApp Number *</label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => handleSettingsChange('whatsapp', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleSettingsChange('email', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Doctor / Clinical Team Profile (Editable) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <User className="w-4 h-4 text-teal-700" />
            <span>Doctor & Clinical Team Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Doctor / Team Name</label>
              <input
                type="text"
                value={formData.doctorName}
                onChange={(e) => handleSettingsChange('doctorName', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Doctor Title</label>
              <input
                type="text"
                value={formData.doctorTitle}
                onChange={(e) => handleSettingsChange('doctorTitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Specialization Focus</label>
              <input
                type="text"
                value={formData.doctorSpecialization}
                onChange={(e) => handleSettingsChange('doctorSpecialization', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Experience Note</label>
              <input
                type="text"
                value={formData.doctorExperience}
                onChange={(e) => handleSettingsChange('doctorExperience', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Doctor Bio</label>
            <textarea
              rows={3}
              value={formData.doctorBio}
              onChange={(e) => handleSettingsChange('doctorBio', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
        </div>

        {/* Section 4: 7-Day Opening Hours Schedule */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Clock className="w-4 h-4 text-teal-700" />
            <span>7-Day Clinic Opening Hours Schedule</span>
          </h3>

          <div className="space-y-3">
            {hoursData.map((hr, idx) => (
              <div key={hr.day} className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-2 font-bold text-slate-800">
                  {hr.day}
                </div>

                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`isOpen-${hr.day}`}
                    checked={hr.isOpen}
                    onChange={(e) => handleHourChange(idx, 'isOpen', e.target.checked)}
                    className="rounded text-teal-800 focus:ring-teal-600"
                  />
                  <label htmlFor={`isOpen-${hr.day}`} className="text-xs font-semibold text-slate-700">
                    {hr.isOpen ? 'Open' : 'Closed'}
                  </label>
                </div>

                <div className="sm:col-span-4">
                  <input
                    type="text"
                    placeholder="Morning slot (e.g. 10:00 AM - 02:00 PM)"
                    value={hr.morningSlot}
                    onChange={(e) => handleHourChange(idx, 'morningSlot', e.target.value)}
                    disabled={!hr.isOpen}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-40"
                  />
                </div>

                <div className="sm:col-span-4">
                  <input
                    type="text"
                    placeholder="Evening slot (e.g. 05:00 PM - 08:30 PM)"
                    value={hr.eveningSlot}
                    onChange={(e) => handleHourChange(idx, 'eveningSlot', e.target.value)}
                    disabled={!hr.isOpen}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-40"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-800 hover:bg-teal-900 active:bg-teal-950 text-white font-semibold text-sm rounded-xl shadow-md disabled:opacity-50 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save All Settings & Schedule'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
