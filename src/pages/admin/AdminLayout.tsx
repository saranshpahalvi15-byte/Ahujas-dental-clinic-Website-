import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavigationPage } from '../../types';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Stethoscope, 
  Image as ImageIcon, 
  Star, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Globe, 
  ShieldCheck 
} from 'lucide-react';
import { AdminOverview } from './AdminOverview';
import { AdminAppointments } from './AdminAppointments';
import { AdminEnquiries } from './AdminEnquiries';
import { AdminTreatments } from './AdminTreatments';
import { AdminGallery } from './AdminGallery';
import { AdminReviews } from './AdminReviews';
import { AdminFaqs } from './AdminFaqs';
import { AdminSettings } from './AdminSettings';
import { AdminLogin } from './AdminLogin';

interface AdminLayoutProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPage, onNavigate }) => {
  const { user, isAdmin, logout } = useAuth();

  // If not logged in OR not authorized admin (gridandgift@gmail.com), show login/unauthorized screen
  if (!user || !isAdmin) {
    return <AdminLogin onNavigate={onNavigate} />;
  }

  const tabs: { label: string; page: NavigationPage; icon: React.ElementType }[] = [
    { label: 'Overview', page: 'admin', icon: LayoutDashboard },
    { label: 'Appointments', page: 'admin-appointments', icon: Calendar },
    { label: 'Enquiries', page: 'admin-enquiries', icon: MessageSquare },
    { label: 'Treatments', page: 'admin-treatments', icon: Stethoscope },
    { label: 'Gallery', page: 'admin-gallery', icon: ImageIcon },
    { label: 'Reviews', page: 'admin-reviews', icon: Star },
    { label: 'FAQs', page: 'admin-faqs', icon: HelpCircle },
    { label: 'Settings & Schedule', page: 'admin-settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-800 text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base leading-tight">
                  Ahuja's Dental Clinic Admin
                </h1>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-semibold bg-teal-900/80 border border-teal-700 text-teal-200 rounded-full">
                  Owner: gridandgift@gmail.com
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Sector 10, Ambala Control Suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar gap-1 border-t border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentPage === tab.page;
            return (
              <button
                key={tab.page}
                onClick={() => onNavigate(tab.page)}
                className={`inline-flex items-center gap-2 py-3 px-3.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-teal-400 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'admin' && <AdminOverview onNavigate={onNavigate} />}
        {currentPage === 'admin-appointments' && <AdminAppointments />}
        {currentPage === 'admin-enquiries' && <AdminEnquiries />}
        {currentPage === 'admin-treatments' && <AdminTreatments />}
        {currentPage === 'admin-gallery' && <AdminGallery />}
        {currentPage === 'admin-reviews' && <AdminReviews />}
        {currentPage === 'admin-faqs' && <AdminFaqs />}
        {currentPage === 'admin-settings' && <AdminSettings />}
      </main>

    </div>
  );
};
