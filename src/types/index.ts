export interface ClinicSettings {
  name: string;
  tagline: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapsUrl: string;
  googleBusinessUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  doctorName: string;
  doctorTitle: string;
  doctorSpecialization: string;
  doctorExperience: string;
  doctorBio: string;
  doctorPhoto: string;
}

export interface OpeningHourDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isOpen: boolean;
  morningSlot: string; // e.g. "10:00 AM - 02:00 PM"
  eveningSlot: string; // e.g. "05:00 PM - 08:30 PM"
  note?: string;
}

export interface Treatment {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  iconName: string;
  benefits: string[];
  whoNeedsIt: string[];
  procedureSteps: string[];
  aftercare: string[];
  faqs: { question: string; answer: string }[];
  isActive: boolean;
  order: number;
}

export type AppointmentStatus = 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';

export interface AppointmentRequest {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  treatmentId?: string;
  treatmentName: string;
  message?: string;
  consentGiven: boolean;
  status: AppointmentStatus;
  adminNotes?: string;
  createdAt: string;
}

export type EnquiryStatus = 'new' | 'replied' | 'archived';

export interface ContactEnquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  rating: number; // 1 to 5
  reviewText: string;
  treatmentName?: string;
  date: string;
  isVerified: boolean;
  isActive: boolean;
  source: string; // e.g. "Clinic Feedback", "Verified Patient", "Google Review"
}

export type GalleryCategory = 'Clinic' | 'Reception' | 'Treatment Room' | 'Equipment' | 'Team' | 'Exterior';

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: GalleryCategory;
  altText: string;
  order: number;
  isActive: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

export type NavigationPage = 
  | 'home'
  | 'about'
  | 'treatments'
  | 'treatment-detail'
  | 'why-choose-us'
  | 'gallery'
  | 'reviews'
  | 'contact'
  | 'appointment'
  | 'privacy-policy'
  | 'terms'
  | 'medical-disclaimer'
  | 'admin'
  | 'admin-appointments'
  | 'admin-enquiries'
  | 'admin-treatments'
  | 'admin-gallery'
  | 'admin-reviews'
  | 'admin-faqs'
  | 'admin-settings';
