/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ClinicProvider } from './context/ClinicContext';
import { NavigationPage } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileActionBar } from './components/layout/MobileActionBar';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { TreatmentDetailPage } from './pages/TreatmentDetailPage';
import { WhyChooseUsPage } from './pages/WhyChooseUsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { MedicalDisclaimerPage } from './pages/MedicalDisclaimerPage';
import { AdminLayout } from './pages/admin/AdminLayout';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [activeSlug, setActiveSlug] = useState<string | undefined>(undefined);

  const handleNavigate = (page: NavigationPage, params?: { slug?: string }) => {
    setCurrentPage(page);
    if (params?.slug) {
      setActiveSlug(params.slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminPage = currentPage.startsWith('admin');

  return (
    <AuthProvider>
      <ClinicProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
          
          {/* Public Navbar (Hidden on Admin pages for focused workspace) */}
          {!isAdminPage && (
            <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
          )}

          {/* Main View Area */}
          <main className="flex-1">
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
            {currentPage === 'treatments' && <TreatmentsPage onNavigate={handleNavigate} />}
            {currentPage === 'treatment-detail' && (
              <TreatmentDetailPage slug={activeSlug} onNavigate={handleNavigate} />
            )}
            {currentPage === 'why-choose-us' && <WhyChooseUsPage onNavigate={handleNavigate} />}
            {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
            {currentPage === 'reviews' && <ReviewsPage onNavigate={handleNavigate} />}
            {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
            {currentPage === 'appointment' && (
              <AppointmentPage 
                onNavigate={handleNavigate} 
                preSelectedTreatment={activeSlug} 
              />
            )}
            {currentPage === 'privacy-policy' && <PrivacyPolicyPage onNavigate={handleNavigate} />}
            {currentPage === 'terms' && <TermsPage onNavigate={handleNavigate} />}
            {currentPage === 'medical-disclaimer' && <MedicalDisclaimerPage onNavigate={handleNavigate} />}
            
            {isAdminPage && (
              <AdminLayout currentPage={currentPage} onNavigate={handleNavigate} />
            )}
          </main>

          {/* Public Footer */}
          {!isAdminPage && (
            <Footer onNavigate={handleNavigate} />
          )}

          {/* Sticky Mobile Action Bar */}
          {!isAdminPage && (
            <MobileActionBar onNavigate={handleNavigate} />
          )}

        </div>
      </ClinicProvider>
    </AuthProvider>
  );
}
