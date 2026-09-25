import React from 'react';
import { NavigationPage } from '../types';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStrip } from '../components/home/TrustStrip';
import { AboutSection } from '../components/home/AboutSection';
import { FeaturedTreatments } from '../components/home/FeaturedTreatments';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { LocationSection } from '../components/home/LocationSection';
import { FaqSection } from '../components/home/FaqSection';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

interface HomePageProps {
  onNavigate: (page: NavigationPage, params?: { slug?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div>
      <MedicalDisclaimer variant="banner" />
      <HeroSection onNavigate={onNavigate} />
      <TrustStrip />
      <FeaturedTreatments onNavigate={onNavigate} />
      <AboutSection onNavigate={onNavigate} />
      <WhyChooseUs onNavigate={onNavigate} />
      <LocationSection />
      <FaqSection />
    </div>
  );
};
