export type MemberType = 'general' | 'lifetime' | 'donor';

export type MemberStatus = 'pending' | 'approved' | 'rejected' | 'blocked';

export type UserRole = 'super_admin' | 'admin' | 'member' | 'guest';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

// কিশোরগঞ্জ উপজেলা, নীলফামারী জেলার ৯টি ইউনিয়ন
export const NILPHAMARI_KISHOREGANJ_UNIONS = [
  "কিশোরগঞ্জ সদর",
  "পুটিমারী",
  "চাঁদখানা",
  "বাহাগিলি",
  "রণচণ্ডী",
  "বড়ভিটা",
  "নিতাই",
  "মাগুড়া",
  "গাড়াগ্রাম",
] as const;

export type KishoreganjUnion = typeof NILPHAMARI_KISHOREGANJ_UNIONS[number];

export interface SiteSettings {
  siteTitle: string;
  subTitle: string;
  slogan: string;
  announcementTicker: string;
  heroHeadline: string;
  heroSubheadline: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  statMembers: string;
  statExecutive: string;
  statDonors: string;
  statUnions: string;
  constitutionPdfUrl?: string;
  smsBalance?: number;
  generalSecretaryName?: string;
  generalSecretarySignatureUrl?: string;
  offlineCollectedAmount?: number;
  bkashNumber?: string;
  aboutHeading?: string;
  aboutText1?: string;
  aboutText2?: string;
  heroSubTitle?: string;
}

export interface MemberProfile {
  id: string;
  member_no: string; // e.g. KUSD-2026-0001
  full_name: string;
  father_name: string;
  mother_name: string;
  date_of_birth?: string;
  member_type: MemberType;
  phone: string; // Used as Login ID
  email?: string;
  password?: string;
  blood_group: BloodGroup;
  permanent_district: "নীলফামারী";
  permanent_upazila: "কিশোরগঞ্জ";
  permanent_union: KishoreganjUnion;
  permanent_village: string;
  present_dhaka_address: string;
  dhaka_area?: string;
  profession: string;
  workplace?: string;
  workplace_designation?: string;
  workplace_address?: string;
  nid_no?: string;
  photo_url?: string;
  paper_form_url?: string;
  status: MemberStatus;
  created_at: string;
  approved_at?: string;
  payment_method?: 'bkash' | 'nagad' | 'rocket' | 'bank' | 'cash';
  trx_id?: string;
  fee_amount?: number;
  is_blocked?: boolean;
  is_offline_entry?: boolean;
}

export interface PaymentRecord {
  id: string;
  member_id: string;
  member_name: string;
  member_no?: string;
  fee_type: 'registration' | 'monthly_fee' | 'welfare_donation';
  amount: number;
  payment_method: 'bkash' | 'nagad' | 'rocket' | 'bank' | 'cash';
  sender_number: string;
  trx_id: string;
  receipt_no: string;
  status: 'pending' | 'verified' | 'rejected';
  created_at: string;
  is_offline?: boolean;
}

export interface NoticeItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  published_date: string;
  is_pinned: boolean;
  category: 'general' | 'meeting' | 'emergency' | 'event';
  status?: 'active' | 'completed' | 'archived';
  attachment_url?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  banner_url?: string;
  video_url?: string;
  news_link?: string;
  caption?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  year: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  committee_type: 'advisory' | 'executive';
  order_index: number;
  phone: string;
  email?: string;
  union: KishoreganjUnion;
  village: string;
  term: string; // e.g. "২০২৬-২০২৮"
  bio?: string;
  photo_url?: string;
}

export interface BloodDonor {
  id: string;
  name: string;
  blood_group: BloodGroup;
  dhaka_area: string;
  phone: string;
  union: KishoreganjUnion;
  last_donation_date?: string;
  is_available: boolean;
}

export interface BloodRequest {
  id: string;
  patient_name: string;
  blood_group: BloodGroup;
  hospital: string;
  units_needed: number;
  contact_phone: string;
  date_needed: string;
  status: 'urgent' | 'managed' | 'closed';
  created_at: string;
  notes?: string;
}

export interface WelfareApplication {
  id: string;
  applicant_name: string;
  phone: string;
  union: KishoreganjUnion;
  village: string;
  category: 'education' | 'treatment' | 'emergency';
  amount_requested: number;
  description: string;
  documents_url?: string;
  status: 'submitted' | 'under_review' | 'approved' | 'disbursed';
  created_at: string;
}

export interface ConstitutionClause {
  id: string;
  clause: string;
  title: string;
  content: string;
  order_index: number;
}

export interface SmsLog {
  id: string;
  recipient_type: 'all' | 'union' | 'individual';
  recipient_target: string;
  phone_count: number;
  sample_phone: string;
  message: string;
  sent_at: string;
  status: 'sent' | 'delivered';
}

export interface WardMember {
  ward_no: number;
  name: string;
  phone: string;
}

export interface TouristSpot {
  name: string;
  description: string;
  image_url: string;
  video_url?: string;
}

export interface UnionProfile {
  id: string;
  name: KishoreganjUnion;
  description: string;
  chairman_name: string;
  chairman_phone: string;
  ward_members: WardMember[];
  tourist_spots: TouristSpot[];
}

export interface HeritageItem {
  id: string;
  title: string;
  union: KishoreganjUnion | "সার্বিক";
  description: string;
  image_url: string;
  video_url?: string;
  category: 'ঐতিহাসিক নিদর্শন' | 'নদী ও প্রকৃতি' | 'লোকসংস্কৃতি' | 'কৃতি ব্যক্তিত্ব';
}

export interface GalleryItem {
  id: string;
  title: string;
  event_year: string;
  category: 'মিলনমেলা' | 'শিক্ষা' | 'ব্লাড ব্যাংক' | 'সভা' | 'বনভোজন' | 'ঐতিহ্য';
  image_url: string;
  video_url?: string;
  caption?: string;
  date?: string;
  news_link?: string;
}
