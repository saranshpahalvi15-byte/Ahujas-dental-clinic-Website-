import { ClinicSettings, OpeningHourDay, Treatment, FAQItem, GalleryItem, ReviewItem } from '../types';

export const initialClinicSettings: ClinicSettings = {
  name: "Ahuja's Dental Clinic",
  tagline: "Thoughtful & Patient-Focused Dental Care in Ambala",
  address: "DSS 73, Sector 10 Market, Opposite Polyclinic, Sector 10",
  landmark: "Opposite Polyclinic",
  city: "Ambala",
  state: "Haryana",
  pincode: "134003",
  phone: "+91 98960 12345",
  whatsapp: "+919896012345",
  email: "contact@ahujasdentalclinic.com",
  mapsUrl: "https://maps.google.com/?q=DSS+73+Sector+10+Market+Opposite+Polyclinic+Sector+10+Ambala+Haryana+134003",
  googleBusinessUrl: "https://maps.google.com/?q=DSS+73+Sector+10+Market+Opposite+Polyclinic+Sector+10+Ambala+Haryana+134003",
  heroTitle: "Your Smile Deserves Thoughtful Dental Care",
  heroSubtitle: "Professional dental care in Sector 10, Ambala with convenient appointment and enquiry options. Located opposite Polyclinic in Sector 10 Market.",
  aboutText: "Ahuja's Dental Clinic is dedicated to providing gentle, high-standard dental healthcare for individuals and families in Sector 10 and across Ambala. We focus on clear communication, thorough clinical hygiene, and personalized treatment plans designed around your long-term oral well-being.",
  doctorName: "Dr. Ahuja & Clinical Team",
  doctorTitle: "Dental Surgeon & Oral Healthcare Practitioner",
  doctorSpecialization: "General Dentistry, Restorative & Preventive Care",
  doctorExperience: "Practicing in Sector 10, Ambala",
  doctorBio: "Our clinical team is committed to ethical, transparent, and comfortable dental care. Every patient receives a detailed consultation before any procedure is recommended.",
  doctorPhoto: ""
};

export const initialOpeningHours: OpeningHourDay[] = [
  { day: 'Monday', isOpen: true, morningSlot: '09:00 AM - 01:00 PM', eveningSlot: '05:00 PM - 08:30 PM' },
  { day: 'Tuesday', isOpen: true, morningSlot: '09:00 AM - 01:00 PM', eveningSlot: '05:00 PM - 08:30 PM' },
  { day: 'Wednesday', isOpen: true, morningSlot: '09:00 AM - 01:00 PM', eveningSlot: '05:00 PM - 08:30 PM' },
  { day: 'Thursday', isOpen: true, morningSlot: '09:00 AM - 01:00 PM', eveningSlot: '05:00 PM - 08:30 PM' },
  { day: 'Friday', isOpen: true, morningSlot: '09:00 AM - 01:00 PM', eveningSlot: '05:00 PM - 08:30 PM' },
  { day: 'Saturday', isOpen: true, morningSlot: '09:00 AM - 01:00 PM', eveningSlot: '05:00 PM - 08:30 PM' },
  { day: 'Sunday', isOpen: true, morningSlot: '10:30 AM - 01:30 PM', eveningSlot: 'By Prior Appointment', note: 'Morning Session / Prior Appointment' },
];

export const initialTreatments: Treatment[] = [
  {
    id: 't-1',
    slug: 'dental-consultation',
    name: 'Comprehensive Dental Consultation',
    category: 'General Dentistry',
    iconName: 'Stethoscope',
    shortDescription: 'Thorough oral examination, clinical assessment, and personalized treatment planning.',
    fullDescription: 'A detailed evaluation of your teeth, gums, and oral structures. We discuss your dental history, evaluate any discomfort, and provide transparent guidance on preventive or corrective steps.',
    benefits: [
      'Early detection of cavities and gum inflammation',
      'Clear, pressure-free treatment recommendations',
      'Personalized oral hygiene guidance',
      'Review of dental hygiene habits'
    ],
    whoNeedsIt: [
      'Patients due for a routine bi-annual dental check-up',
      'Anyone experiencing tooth sensitivity or mild discomfort',
      'Patients seeking a professional second opinion on dental procedures'
    ],
    procedureSteps: [
      'Visual examination of teeth and gums',
      'Assessment of bite alignment and jaw mobility',
      'Discussion of findings and tailored treatment roadmap'
    ],
    aftercare: [
      'Follow advised brushing and flossing routines',
      'Schedule periodic review check-ups as recommended'
    ],
    faqs: [
      {
        question: 'How often should I come for a dental consultation?',
        answer: 'Most dentists recommend a routine check-up every 6 months to maintain optimal oral health.'
      },
      {
        question: 'Will there be any painful procedures during the consultation?',
        answer: 'No. A standard consultation is an observational clinical assessment and discussion.'
      }
    ],
    isActive: true,
    order: 1
  },
  {
    id: 't-2',
    slug: 'teeth-cleaning-scaling',
    name: 'Teeth Cleaning & Scaling',
    category: 'Preventive Care',
    iconName: 'Sparkles',
    shortDescription: 'Professional ultrasonic removal of plaque and tartar deposits to support healthy gums.',
    fullDescription: 'Scaling safely removes hardened calculus (tartar) and bacterial plaque from tooth surfaces and around the gumline, helping prevent periodontal disease and freshening breath.',
    benefits: [
      'Prevents gum bleeding and inflammation (gingivitis)',
      'Removes stubborn surface stains from tea, coffee, or food',
      'Helps eliminate bad breath (halitosis)',
      'Maintains foundation of dental health'
    ],
    whoNeedsIt: [
      'Individuals noticing tartar buildup or gum bleeding during brushing',
      'Patients with persistent bad breath or discoloration',
      'Adults and teenagers as part of regular oral maintenance'
    ],
    procedureSteps: [
      'Gentle ultrasonic scaling to dislodge tartar',
      'Fine manual scaling for precision around delicate margins',
      'Polishing with specialized dental paste for smooth enamel'
    ],
    aftercare: [
      'Avoid intensely colored food/beverages for a few hours',
      'Mild temporary sensitivity is normal and settles quickly',
      'Continue gentle brushing with a soft-bristled brush'
    ],
    faqs: [
      {
        question: 'Does teeth cleaning weaken tooth enamel?',
        answer: 'No. Professional ultrasonic scaling vibrates tartar away without eroding healthy natural enamel.'
      }
    ],
    isActive: true,
    order: 2
  },
  {
    id: 't-3',
    slug: 'dental-fillings',
    name: 'Tooth-Colored Dental Fillings',
    category: 'Restorative Dentistry',
    iconName: 'ShieldCheck',
    shortDescription: 'Durable composite resin fillings that restore decayed or fractured teeth naturally.',
    fullDescription: 'Composite restorations closely mimic the natural shade and contours of your teeth. Decayed tooth structure is carefully removed and replaced with biocompatible resin that bonds securely.',
    benefits: [
      'Natural tooth shade matching for seamless appearance',
      'Stops cavity progression and protects inner pulp',
      'Restores chewing function and structural integrity',
      'Direct bonding requires minimal healthy tooth removal'
    ],
    whoNeedsIt: [
      'Teeth with visible decay or dark spots',
      'Chipped or cracked teeth from minor trauma',
      'Replacement of old, failing, or dislodged fillings'
    ],
    procedureSteps: [
      'Gentle local numbing if required for complete comfort',
      'Meticulous removal of decay and cleaning of cavity',
      'Layered application and light-curing of composite material',
      'Bite adjustment and high-gloss polishing'
    ],
    aftercare: [
      'Wait for numbness to wear off before chewing',
      'Avoid extremely hard or sticky candies on freshly restored teeth'
    ],
    faqs: [
      {
        question: 'How long do composite fillings last?',
        answer: 'With good oral hygiene and regular dental checkups, composite fillings typically last many years.'
      }
    ],
    isActive: true,
    order: 3
  },
  {
    id: 't-4',
    slug: 'root-canal-treatment',
    name: 'Root Canal Treatment (RCT)',
    category: 'Endodontics',
    iconName: 'Activity',
    shortDescription: 'Gentle, tooth-saving procedure to resolve infection deep inside the tooth root.',
    fullDescription: 'When decay reaches the inner nerve canal (pulp), Root Canal Treatment cleans out bacteria and inflamed tissue, disinfects the canals, and seals them to relieve pain and preserve your natural tooth.',
    benefits: [
      'Relieves persistent throbbing toothache and pressure',
      'Saves the natural tooth from needing extraction',
      'Prevents infection from spreading to surrounding jawbone',
      'Restores normal biting and chewing comfort'
    ],
    whoNeedsIt: [
      'Severe or throbbing pain, especially while chewing or lying down',
      'Prolonged sensitivity to hot or cold drinks',
      'Gum swelling, pimple-like bump, or tenderness near the tooth'
    ],
    procedureSteps: [
      'Effective local anesthesia for painless treatment',
      'Careful access and cleaning of infected root canals',
      'Disinfection and biocompatible root canal sealing (Gutta-Percha)',
      'Placement of core restoration, followed by crown assessment'
    ],
    aftercare: [
      'Chew on the opposite side until full restoration/crown is placed',
      'Take prescribed medications as directed by the doctor',
      'Maintain regular brushing around the treated area'
    ],
    faqs: [
      {
        question: 'Is a Root Canal Treatment painful?',
        answer: 'Modern dental techniques and effective local anesthesia make the procedure as comfortable as getting a standard filling.'
      }
    ],
    isActive: true,
    order: 4
  },
  {
    id: 't-5',
    slug: 'crowns-and-bridges',
    name: 'Dental Crowns & Bridges',
    category: 'Prosthodontics',
    iconName: 'Layers',
    shortDescription: 'Custom ceramic and zirconia caps to reinforce weakened teeth or bridge missing spaces.',
    fullDescription: 'Dental crowns provide a protective full-coverage cap over a compromised tooth (e.g., after RCT or severe fracture). Bridges utilize adjacent supporting teeth to replace one or more missing teeth.',
    benefits: [
      'Restores original shape, strength, and aesthetic appearance',
      'Protects root-canal-treated or heavily filled teeth from fracture',
      'Bridges restore seamless chewing and prevent adjacent teeth shifting'
    ],
    whoNeedsIt: [
      'Teeth after root canal treatment',
      'Severely worn down, cracked, or discolored teeth',
      'Patients looking to replace missing teeth without surgery'
    ],
    procedureSteps: [
      'Tooth preparation and precise impression / digital record',
      'Placement of a temporary protective cap if needed',
      'Custom laboratory fabrication in ceramic/zirconia',
      'Final cementation and bite verification'
    ],
    aftercare: [
      'Practice regular flossing under bridge units',
      'Avoid crunching ice or hard nuts with newly crowned teeth'
    ],
    faqs: [
      {
        question: 'What materials are used for crowns?',
        answer: 'Crowns are commonly crafted from high-strength zirconia, porcelain-fused-to-metal (PFM), or all-ceramic materials based on location and aesthetic needs.'
      }
    ],
    isActive: true,
    order: 5
  },
  {
    id: 't-6',
    slug: 'tooth-extraction',
    name: 'Tooth Extraction & Wisdom Tooth Care',
    category: 'Oral Surgery',
    iconName: 'Crosshair',
    shortDescription: 'Comfortable, safe removal of non-restorable teeth or impacted wisdom teeth.',
    fullDescription: 'When a tooth cannot be saved through conservative methods, or when wisdom teeth cause crowding and recurrent infection, gentle extraction provides definitive relief under local anesthesia.',
    benefits: [
      'Eliminates source of persistent pain or severe chronic infection',
      'Prevents damage to adjacent healthy teeth',
      'Prepares the area for future tooth replacement (bridge/implant)'
    ],
    whoNeedsIt: [
      'Severely damaged or fractured teeth below the gumline',
      'Impacted or painfully erupting wisdom teeth',
      'Teeth loosened by advanced periodontal disease'
    ],
    procedureSteps: [
      'Detailed clinical and radiographic assessment',
      'Complete local anesthesia for painless extraction',
      'Gentle removal and sterile gauze placement for clotting'
    ],
    aftercare: [
      'Keep the gauze in place for 45-60 minutes',
      'Avoid spitting, using straws, or hot foods for the first 24 hours',
      'Follow soft diet and prescribed pain relief'
    ],
    faqs: [
      {
        question: 'How long does recovery take after an extraction?',
        answer: 'Initial soft tissue healing typically takes 3 to 7 days, with comfort improving significantly within 24 to 48 hours.'
      }
    ],
    isActive: true,
    order: 6
  },
  {
    id: 't-7',
    slug: 'childrens-dentistry',
    name: "Children's Dental Care",
    category: 'Pediatric Dentistry',
    iconName: 'Smile',
    shortDescription: 'Friendly, gentle dental checkups, fluoride treatments, and cavity care for kids.',
    fullDescription: 'We strive to build a positive dental experience for young patients in Ambala. From early dental development checks to preventive pit-and-fissure sealants, we help children develop lifelong healthy smiles.',
    benefits: [
      'Calm, patient, fear-free clinic atmosphere',
      'Cavity prevention with fluoride application and sealants',
      'Monitoring dental eruption and jaw alignment'
    ],
    whoNeedsIt: [
      'Children getting their first teeth or mixed dentition',
      'Kids with tooth sensitivity or milk tooth cavities',
      'Parents seeking diet and oral habit guidance'
    ],
    procedureSteps: [
      'Friendly introduction to the dental chair',
      'Gentle count of teeth and visual check',
      'Preventive treatment if indicated and tailored advice for parents'
    ],
    aftercare: [
      'Supervise daily brushing twice a day',
      'Limit sugary snacks and sticky sweets'
    ],
    faqs: [
      {
        question: 'When should a child first visit the dentist?',
        answer: 'It is recommended to schedule a first dental visit around the eruption of the first tooth or by their first birthday.'
      }
    ],
    isActive: true,
    order: 7
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I request an appointment at Ahuja\'s Dental Clinic?',
    answer: 'You can submit an appointment request through the website form, message us directly on WhatsApp, or call our clinic number. We will confirm the appointment slot that fits your schedule.',
    category: 'Appointments',
    order: 1,
    isActive: true
  },
  {
    id: 'faq-2',
    question: 'Where is the clinic located in Ambala?',
    answer: 'Ahuja\'s Dental Clinic is located at DSS 73, Sector 10 Market, directly opposite the Polyclinic in Sector 10, Ambala, Haryana 134003. Parking is easily accessible in the Sector 10 Market.',
    category: 'Location',
    order: 2,
    isActive: true
  },
  {
    id: 'faq-3',
    question: 'Do I need an appointment before visiting?',
    answer: 'Prior appointment requests are strongly recommended to ensure minimal waiting time. Walk-ins are also accommodated based on doctor availability between scheduled appointments.',
    category: 'Appointments',
    order: 3,
    isActive: true
  },
  {
    id: 'faq-4',
    question: 'What should I bring to my first appointment?',
    answer: 'Please bring any previous dental records or X-rays if available, a list of current medications (if any), and your contact details. Arriving 5-10 minutes early helps with registration.',
    category: 'Consultation',
    order: 4,
    isActive: true
  },
  {
    id: 'faq-5',
    question: 'How are clinical hygiene and sterilization maintained?',
    answer: 'We follow strict multi-step autoclaving and sterilization protocols for all reusable dental instruments, and use disposable barrier supplies for each patient to ensure highest safety standards.',
    category: 'Safety & Hygiene',
    order: 5,
    isActive: true
  },
  {
    id: 'faq-6',
    question: 'What payment methods are accepted at the clinic?',
    answer: 'We accept Cash, UPI (Google Pay, PhonePe, Paytm), and major Debit/Credit Cards for your convenience.',
    category: 'General',
    order: 6,
    isActive: true
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Modern Dental Operatory',
    imageUrl: '/src/assets/images/hero_dental_clinic_1790239444640.jpg',
    category: 'Treatment Room',
    altText: 'Clean modern dental operatory room at Ahuja\'s Dental Clinic Sector 10 Ambala',
    order: 1,
    isActive: true
  },
  {
    id: 'gal-2',
    title: 'Sterilized Instruments & Care Setup',
    imageUrl: '/src/assets/images/treatment_dental_care_1790239458757.jpg',
    category: 'Equipment',
    altText: 'Autoclaved dental instruments ready for clinical examination',
    order: 2,
    isActive: true
  },
  {
    id: 'gal-3',
    title: 'Patient Waiting Lounge & Reception',
    imageUrl: '/src/assets/images/clinic_reception_lounge_1790239479013.jpg',
    category: 'Reception',
    altText: 'Welcoming reception and waiting area for patients and families',
    order: 3,
    isActive: true
  },
  {
    id: 'gal-4',
    title: 'Ergonomic Treatment Chair',
    imageUrl: '/src/assets/images/dental_operatory_room_1790239491905.jpg',
    category: 'Clinic',
    altText: 'Ergonomic patient dental chair setup in clean consultation room',
    order: 4,
    isActive: true
  }
];

export const initialReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'R. Sharma',
    rating: 5,
    reviewText: 'Very calm and reassuring dental visit. The doctor took time to explain the issue thoroughly without rushing into unnecessary procedures.',
    treatmentName: 'Dental Consultation & Cleaning',
    date: 'Recent Visit',
    isVerified: true,
    isActive: true,
    source: 'Clinic Feedback'
  },
  {
    id: 'rev-2',
    authorName: 'M. Gupta',
    rating: 5,
    reviewText: 'Clean clinic setup right in Sector 10 Market opposite Polyclinic. Appointment was on time and treatment was done with great care.',
    treatmentName: 'Tooth Restoration',
    date: 'Recent Visit',
    isVerified: true,
    isActive: true,
    source: 'Verified Patient'
  },
  {
    id: 'rev-3',
    authorName: 'S. Verma',
    rating: 5,
    reviewText: 'Gentle handling and very transparent communication about what was needed. Highly recommend for family dental checkups in Ambala.',
    treatmentName: 'Routine Dental Checkup',
    date: 'Recent Visit',
    isVerified: true,
    isActive: true,
    source: 'Clinic Feedback'
  }
];
