import React, { useState } from 'react';
import { NavigationPage } from '../../types';
import { useClinic } from '../../context/ClinicContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Calendar, UserCheck, Shield } from 'lucide-react';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage, params?: { slug?: string }) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { settings } = useClinic();
  const { user, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: NavigationPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Treatments', page: 'treatments' },
    { label: 'Why Us', page: 'why-choose-us' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-md py-1"
            >
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-900 transition-colors">
                {settings.name || "Ahuja's Dental Clinic"}
              </span>
            </button>
          </div>

          {/* Zone 2: Primary Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page || (currentPage === 'treatment-detail' && link.page === 'treatments');
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`py-1 cursor-pointer transition-colors relative hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded ${
                    isActive ? 'text-teal-900 font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Admin */}
          <div className="hidden sm:flex items-center gap-3">
            {user && isAdmin ? (
              <button
                onClick={() => handleNavClick('admin')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border cursor-pointer ${
                  currentPage.startsWith('admin')
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="Admin Control Panel"
              >
                <Shield className="w-3.5 h-3.5 text-teal-600" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('admin')}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors cursor-pointer"
                title="Admin Portal"
              >
                Admin
              </button>
            )}

            <button
              onClick={() => handleNavClick('appointment')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 active:bg-teal-950 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('appointment')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-800 rounded-lg hover:bg-teal-900"
            >
              Book
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-medium text-slate-600 px-3 py-1">
            Sector 10 Market, Ambala
          </div>
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? 'bg-teal-50 text-teal-900 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('appointment')}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg"
            >
              Request Appointment
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full py-2 px-4 text-center text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
            >
              {user ? 'Admin Dashboard' : 'Admin / Staff Portal'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
