import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType, testConnection } from '../lib/firebase';
import { 
  ClinicSettings, 
  OpeningHourDay, 
  Treatment, 
  AppointmentRequest, 
  ContactEnquiry, 
  ReviewItem, 
  GalleryItem, 
  FAQItem,
  AppointmentStatus,
  EnquiryStatus
} from '../types';
import { 
  initialClinicSettings, 
  initialOpeningHours, 
  initialTreatments, 
  initialFAQs, 
  initialGallery, 
  initialReviews 
} from '../data/initialData';

interface ClinicContextType {
  settings: ClinicSettings;
  openingHours: OpeningHourDay[];
  treatments: Treatment[];
  faqs: FAQItem[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  appointments: AppointmentRequest[];
  enquiries: ContactEnquiry[];
  isLoading: boolean;
  
  // Public submissions
  submitAppointmentRequest: (data: Omit<AppointmentRequest, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; message: string; id?: string }>;
  submitEnquiry: (data: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; message: string; id?: string }>;
  
  // Admin operations
  updateClinicSettings: (newSettings: Partial<ClinicSettings>) => Promise<void>;
  updateOpeningHours: (hours: OpeningHourDay[]) => Promise<void>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, notes?: string) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;
  
  saveTreatment: (treatment: Treatment) => Promise<void>;
  deleteTreatment: (id: string) => Promise<void>;
  
  saveReview: (review: ReviewItem) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  
  saveFAQ: (faq: FAQItem) => Promise<void>;
  deleteFAQ: (id: string) => Promise<void>;
  
  saveGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  
  resetToInitialData: () => Promise<void>;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ClinicSettings>(() => {
    const saved = localStorage.getItem('ahuja_clinic_settings');
    return saved ? JSON.parse(saved) : initialClinicSettings;
  });

  const [openingHours, setOpeningHours] = useState<OpeningHourDay[]>(() => {
    const saved = localStorage.getItem('ahuja_opening_hours');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as OpeningHourDay[];
        // Auto-upgrade legacy morning slots if present
        const hasLegacySlots = parsed.some(d => d.morningSlot === '10:00 AM - 02:00 PM');
        if (hasLegacySlots) {
          return parsed.map(d => d.day !== 'Sunday' && d.morningSlot === '10:00 AM - 02:00 PM' ? { ...d, morningSlot: '09:00 AM - 01:00 PM' } : d);
        }
        return parsed;
      } catch {
        return initialOpeningHours;
      }
    }
    return initialOpeningHours;
  });

  const [treatments, setTreatments] = useState<Treatment[]>(() => {
    const saved = localStorage.getItem('ahuja_treatments');
    return saved ? JSON.parse(saved) : initialTreatments;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('ahuja_faqs');
    return saved ? JSON.parse(saved) : initialFAQs;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('ahuja_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('ahuja_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [appointments, setAppointments] = useState<AppointmentRequest[]>(() => {
    const saved = localStorage.getItem('ahuja_appointments');
    return saved ? JSON.parse(saved) : [
      {
        id: 'apt-demo-1',
        patientName: 'Harpreet Singh',
        phone: '+91 98123 45678',
        email: 'harpreet.s@example.com',
        preferredDate: '2026-09-28',
        preferredTime: '11:00 AM',
        treatmentName: 'Comprehensive Dental Consultation',
        message: 'Looking for a routine dental checkup and teeth scaling.',
        consentGiven: true,
        status: 'new',
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(() => {
    const saved = localStorage.getItem('ahuja_enquiries');
    return saved ? JSON.parse(saved) : [
      {
        id: 'enq-demo-1',
        name: 'Sunita Mehra',
        phone: '+91 98765 43210',
        email: 'sunita.m@example.com',
        subject: 'Appointment Enquiry for Sector 10 Clinic',
        message: 'Are evening slots available on Saturday for dental cleaning?',
        status: 'new',
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ahuja_clinic_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('ahuja_opening_hours', JSON.stringify(openingHours));
  }, [openingHours]);

  useEffect(() => {
    localStorage.setItem('ahuja_treatments', JSON.stringify(treatments));
  }, [treatments]);

  useEffect(() => {
    localStorage.setItem('ahuja_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('ahuja_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('ahuja_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('ahuja_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('ahuja_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  // Load from Firestore on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await testConnection();

        // 1. Settings
        const settingsSnap = await getDocs(collection(db, 'clinicSettings'));
        if (!settingsSnap.empty) {
          const docData = settingsSnap.docs[0].data() as ClinicSettings;
          setSettings(prev => ({ ...prev, ...docData }));
        }

        // 2. Treatments
        const treatmentsSnap = await getDocs(collection(db, 'treatments'));
        if (!treatmentsSnap.empty) {
          const loadedTreatments = treatmentsSnap.docs.map(d => ({ ...d.data(), id: d.id } as Treatment));
          loadedTreatments.sort((a, b) => a.order - b.order);
          setTreatments(loadedTreatments);
        }

        // 3. Opening Hours
        const hoursSnap = await getDocs(collection(db, 'openingHours'));
        if (!hoursSnap.empty) {
          const loadedHours = hoursSnap.docs.map(d => d.data() as OpeningHourDay);
          setOpeningHours(loadedHours);
        }

        // 4. FAQs
        const faqsSnap = await getDocs(collection(db, 'faqs'));
        if (!faqsSnap.empty) {
          const loadedFaqs = faqsSnap.docs.map(d => ({ ...d.data(), id: d.id } as FAQItem));
          loadedFaqs.sort((a, b) => a.order - b.order);
          setFaqs(loadedFaqs);
        }

        // 5. Gallery
        const gallerySnap = await getDocs(collection(db, 'gallery'));
        if (!gallerySnap.empty) {
          const loadedGallery = gallerySnap.docs.map(d => ({ ...d.data(), id: d.id } as GalleryItem));
          loadedGallery.sort((a, b) => a.order - b.order);
          setGallery(loadedGallery);
        }

        // 6. Reviews
        const reviewsSnap = await getDocs(collection(db, 'reviews'));
        if (!reviewsSnap.empty) {
          const loadedReviews = reviewsSnap.docs.map(d => ({ ...d.data(), id: d.id } as ReviewItem));
          setReviews(loadedReviews);
        }
      } catch (err) {
        console.warn('Initial Firestore fetch notes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Real-time Firestore sync for Appointments and Enquiries when verified admin is signed in
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      const isAuthorizedAdmin = user && user.email && user.email.trim().toLowerCase() === 'gridandgift@gmail.com';
      if (isAuthorizedAdmin) {
        // Subscribe to appointments
        const unsubAppointments = onSnapshot(
          collection(db, 'appointments'),
          (snapshot) => {
            if (!snapshot.empty) {
              const items = snapshot.docs.map(d => ({ ...d.data(), id: d.id } as AppointmentRequest));
              // Sort descending by creation date
              items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
              setAppointments(items);
            }
          },
          (error) => {
            console.warn('Appointments snapshot listener warning:', error);
          }
        );

        // Subscribe to enquiries
        const unsubEnquiries = onSnapshot(
          collection(db, 'enquiries'),
          (snapshot) => {
            if (!snapshot.empty) {
              const items = snapshot.docs.map(d => ({ ...d.data(), id: d.id } as ContactEnquiry));
              items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
              setEnquiries(items);
            }
          },
          (error) => {
            console.warn('Enquiries snapshot listener warning:', error);
          }
        );

        return () => {
          unsubAppointments();
          unsubEnquiries();
        };
      }
    });

    return () => unsubAuth();
  }, []);

  // Public Appointment Request Submission
  const submitAppointmentRequest = async (data: Omit<AppointmentRequest, 'id' | 'createdAt' | 'status'>) => {
    const id = `apt-${Date.now()}`;
    const newAppointment: AppointmentRequest = {
      ...data,
      id,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'appointments', id), newAppointment);
    } catch (err) {
      console.warn('Firestore appointment save (fallback to local state):', err);
    }

    setAppointments(prev => [newAppointment, ...prev]);
    return { 
      success: true, 
      message: 'Your appointment request has been received. The clinic will contact you to confirm the appointment.',
      id 
    };
  };

  // Public General Contact Enquiry Submission
  const submitEnquiry = async (data: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const id = `enq-${Date.now()}`;
    const newEnquiry: ContactEnquiry = {
      ...data,
      id,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'enquiries', id), newEnquiry);
    } catch (err) {
      console.warn('Firestore enquiry save (fallback to local state):', err);
    }

    setEnquiries(prev => [newEnquiry, ...prev]);
    return {
      success: true,
      message: 'Thank you. Your message has been received and our team will get in touch soon.',
      id
    };
  };

  // Admin: Update settings
  const updateClinicSettings = async (newSettings: Partial<ClinicSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      await setDoc(doc(db, 'clinicSettings', 'general'), updated, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'clinicSettings/general');
    }
  };

  // Admin: Update opening hours
  const updateOpeningHours = async (hours: OpeningHourDay[]) => {
    setOpeningHours(hours);
    try {
      for (const dayItem of hours) {
        await setDoc(doc(db, 'openingHours', dayItem.day), dayItem, { merge: true });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'openingHours');
    }
  };

  // Admin: Update Appointment Status
  const updateAppointmentStatus = async (id: string, status: AppointmentStatus, notes?: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status, adminNotes: notes !== undefined ? notes : a.adminNotes } : a));
    try {
      const updatePayload: Record<string, unknown> = { status };
      if (notes !== undefined) updatePayload.adminNotes = notes;
      await updateDoc(doc(db, 'appointments', id), updatePayload);
    } catch (err) {
      console.warn('Appointment status update:', err);
    }
  };

  // Admin: Delete Appointment
  const deleteAppointment = async (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    try {
      await deleteDoc(doc(db, 'appointments', id));
    } catch (err) {
      console.warn('Appointment deletion:', err);
    }
  };

  // Admin: Update Enquiry Status
  const updateEnquiryStatus = async (id: string, status: EnquiryStatus) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    try {
      await updateDoc(doc(db, 'enquiries', id), { status });
    } catch (err) {
      console.warn('Enquiry status update:', err);
    }
  };

  // Admin: Delete Enquiry
  const deleteEnquiry = async (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
    try {
      await deleteDoc(doc(db, 'enquiries', id));
    } catch (err) {
      console.warn('Enquiry deletion:', err);
    }
  };

  // Admin: Save Treatment (Create or Update)
  const saveTreatment = async (treatment: Treatment) => {
    setTreatments(prev => {
      const exists = prev.some(t => t.id === treatment.id);
      if (exists) {
        return prev.map(t => t.id === treatment.id ? treatment : t);
      }
      return [...prev, treatment];
    });

    try {
      await setDoc(doc(db, 'treatments', treatment.id), treatment, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `treatments/${treatment.id}`);
    }
  };

  // Admin: Delete Treatment
  const deleteTreatment = async (id: string) => {
    setTreatments(prev => prev.filter(t => t.id !== id));
    try {
      await deleteDoc(doc(db, 'treatments', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `treatments/${id}`);
    }
  };

  // Admin: Save Review
  const saveReview = async (review: ReviewItem) => {
    setReviews(prev => {
      const exists = prev.some(r => r.id === review.id);
      if (exists) {
        return prev.map(r => r.id === review.id ? review : r);
      }
      return [review, ...prev];
    });

    try {
      await setDoc(doc(db, 'reviews', review.id), review, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `reviews/${review.id}`);
    }
  };

  // Admin: Delete Review
  const deleteReview = async (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    try {
      await deleteDoc(doc(db, 'reviews', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `reviews/${id}`);
    }
  };

  // Admin: Save FAQ
  const saveFAQ = async (faq: FAQItem) => {
    setFaqs(prev => {
      const exists = prev.some(f => f.id === faq.id);
      if (exists) {
        return prev.map(f => f.id === faq.id ? faq : f);
      }
      return [...prev, faq];
    });

    try {
      await setDoc(doc(db, 'faqs', faq.id), faq, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `faqs/${faq.id}`);
    }
  };

  // Admin: Delete FAQ
  const deleteFAQ = async (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    try {
      await deleteDoc(doc(db, 'faqs', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `faqs/${id}`);
    }
  };

  // Admin: Save Gallery Item
  const saveGalleryItem = async (item: GalleryItem) => {
    setGallery(prev => {
      const exists = prev.some(g => g.id === item.id);
      if (exists) {
        return prev.map(g => g.id === item.id ? item : g);
      }
      return [...prev, item];
    });

    try {
      await setDoc(doc(db, 'gallery', item.id), item, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `gallery/${item.id}`);
    }
  };

  // Admin: Delete Gallery Item
  const deleteGalleryItem = async (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `gallery/${id}`);
    }
  };

  // Reset to initial demo data
  const resetToInitialData = async () => {
    setSettings(initialClinicSettings);
    setOpeningHours(initialOpeningHours);
    setTreatments(initialTreatments);
    setFaqs(initialFAQs);
    setGallery(initialGallery);
    setReviews(initialReviews);
  };

  return (
    <ClinicContext.Provider value={{
      settings,
      openingHours,
      treatments,
      faqs,
      gallery,
      reviews,
      appointments,
      enquiries,
      isLoading,
      submitAppointmentRequest,
      submitEnquiry,
      updateClinicSettings,
      updateOpeningHours,
      updateAppointmentStatus,
      deleteAppointment,
      updateEnquiryStatus,
      deleteEnquiry,
      saveTreatment,
      deleteTreatment,
      saveReview,
      deleteReview,
      saveFAQ,
      deleteFAQ,
      saveGalleryItem,
      deleteGalleryItem,
      resetToInitialData
    }}>
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
