-- ====================================================================
-- ঢাকাস্থ কিশোরগঞ্জ উপজেলা সমিতি (নীলফামারী)
-- পূর্ণাঙ্গ সিকিউর প্রোডাকশন ডেটাবেজ স্কিমা (Supabase PostgreSQL + RLS)
-- ====================================================================

-- ১. প্রয়োজনীয় এক্সটেনশন সচল করা
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- ২. সাইট সেটিংস টেবিল (Site Settings & Home Content)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    site_title TEXT NOT NULL DEFAULT 'কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা',
    sub_title TEXT DEFAULT 'কিশোরগঞ্জ উপজেলা, জেলা: নীলফামারী',
    slogan TEXT DEFAULT 'শেকড়ের টানে একতার বন্ধনে',
    announcement_ticker TEXT,
    hero_headline TEXT,
    hero_subheadline TEXT,
    hero_subtitle TEXT DEFAULT 'ঢাকায় বসবাসরত কিশোরগঞ্জবাসীর ঐক্য ও সেবামূলক প্ল্যাটফর্ম',
    about_heading TEXT DEFAULT 'সমিতির পটভূমি ও লক্ষ্য',
    about_text_1 TEXT DEFAULT 'শিক্ষা, চাকরি ও জীবন-জীবিকার প্রয়োজনে নীলফামারী জেলার কিশোরগঞ্জ উপজেলা থেকে রাজধানী ঢাকায় আগত ভাই-বোনদের নিয়ে এই অরাজনৈতিক ও কল্যাণমূলক সংগঠনের পথচলা শুরু।',
    about_text_2 TEXT DEFAULT 'ঢাকার বুকে নীলফামারীর কিশোরগঞ্জের মানুষের পারস্পরিক ভ্রাতৃত্ব বজায় রাখা, জরুরি রক্তদান, শিক্ষা সহায়তা, বিপদে পাশে দাঁড়ানো এবং নিজেদের ঐতিহ্য টিকিয়ে রাখাই আমাদের মূল অঙ্গীকার।',
    contact_address TEXT DEFAULT 'বাড়ি-১৬, রোড-৩/১, ব্লক-এ, সেক্টর-১৬, উত্তরা, ঢাকা-১২৩০',
    contact_phone TEXT DEFAULT '০১৩৫৩-৭৪৩৫৪৭',
    contact_email TEXT DEFAULT 'kishoreganjupazilasamity@gmail.com',
    bkash_number TEXT DEFAULT '০১৩৫৩-৭৪৩৫৪৭',
    stat_members TEXT DEFAULT '৩,৫০০+',
    stat_executive TEXT DEFAULT '৫১ জন',
    stat_donors TEXT DEFAULT '২৮০+',
    stat_unions TEXT DEFAULT '৯টি ইউনিয়ন',
    sms_balance INTEGER DEFAULT 5000,
    general_secretary_name TEXT DEFAULT 'মো. গোলাম মোস্তফা',
    general_secretary_signature_url TEXT DEFAULT '',
    constitution_pdf_url TEXT DEFAULT '/docs/kusd_constitution_2026.pdf',
    offline_collected_amount NUMERIC(12, 2) DEFAULT 45000.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ৩. সদস্য টেবিল (Members Profile & Authentication)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_no TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    father_name TEXT,
    mother_name TEXT,
    date_of_birth DATE,
    permanent_district TEXT NOT NULL DEFAULT 'নীলফামারী',
    permanent_upazila TEXT NOT NULL DEFAULT 'কিশোরগঞ্জ',
    permanent_union TEXT NOT NULL,
    permanent_village TEXT,
    present_dhaka_address TEXT,
    dhaka_area TEXT,
    profession TEXT,
    workplace_designation TEXT,
    workplace_address TEXT,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    password_hash TEXT NOT NULL,
    nid_no TEXT,
    blood_group TEXT NOT NULL,
    photo_url TEXT,
    paper_form_url TEXT,
    member_type TEXT NOT NULL CHECK (member_type IN ('general', 'lifetime', 'donor')),
    payment_method TEXT NOT NULL DEFAULT 'bkash',
    trx_id TEXT,
    fee_amount NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'blocked', 'rejected')),
    is_offline_entry BOOLEAN DEFAULT FALSE,
    is_blocked BOOLEAN DEFAULT FALSE,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_members_phone ON public.members (phone);
CREATE INDEX IF NOT EXISTS idx_members_member_no ON public.members (member_no);
CREATE INDEX IF NOT EXISTS idx_members_status ON public.members (status);
CREATE INDEX IF NOT EXISTS idx_members_union ON public.members (permanent_union);

-- ====================================================================
-- ৪. পেমেন্ট ও চাঁদা হিসাব টেবিল (Payments & Dues)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_no TEXT UNIQUE NOT NULL,
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    member_name TEXT NOT NULL,
    member_no TEXT,
    fee_type TEXT NOT NULL CHECK (fee_type IN ('registration', 'monthly_dues', 'welfare_donation', 'other')),
    months_count INTEGER DEFAULT 1,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'bkash',
    trx_id TEXT NOT NULL,
    sender_number TEXT,
    status TEXT NOT NULL DEFAULT 'verified' CHECK (status IN ('pending', 'verified', 'rejected')),
    is_offline BOOLEAN DEFAULT FALSE,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_payments_receipt_no ON public.payments (receipt_no);
CREATE INDEX IF NOT EXISTS idx_payments_member_id ON public.payments (member_id);
CREATE INDEX IF NOT EXISTS idx_payments_trx_id ON public.payments (trx_id);

-- ====================================================================
-- ৫. উপদেষ্টা ও কার্যনির্বাহী কমিটি টেবিল (Committee Members)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.committee_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    committee_type TEXT NOT NULL CHECK (committee_type IN ('executive', 'advisory')),
    order_index INTEGER NOT NULL DEFAULT 1,
    phone TEXT,
    email TEXT,
    union_name TEXT NOT NULL,
    village TEXT,
    term TEXT NOT NULL DEFAULT '২০২৬-২০২৮',
    bio TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_committee_type ON public.committee_members (committee_type);
CREATE INDEX IF NOT EXISTS idx_committee_order ON public.committee_members (order_index);

-- ====================================================================
-- ৬. নোটিশ ও বিজ্ঞপ্তি টেবিল (Notices)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_pinned BOOLEAN DEFAULT FALSE,
    category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'meeting', 'emergency', 'event')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
    attachment_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ৭. ইভেন্ট ও বাৎসরিক কার্যক্রম টেবিল (Events & Activities)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT,
    venue TEXT NOT NULL,
    description TEXT,
    banner_url TEXT,
    video_url TEXT,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
    year TEXT NOT NULL DEFAULT '২০২৬',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ৮. ইউনিয়ন পরিষদ ও জনপ্রতিনিধি প্রোফাইল টেবিল (Union Profiles)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.union_profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    bengali_name TEXT NOT NULL,
    total_area TEXT,
    total_population TEXT,
    chairman_name TEXT,
    chairman_phone TEXT,
    chairman_photo TEXT,
    bio TEXT,
    secretary_name TEXT,
    secretary_phone TEXT,
    members_json JSONB DEFAULT '[]'::jsonb,
    tourist_spots JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ৯. ব্লাড ব্যাংক ও ডোনার তালিকা (Blood Donors & Requests)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.blood_donors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    blood_group TEXT NOT NULL,
    phone TEXT NOT NULL,
    permanent_union TEXT NOT NULL,
    current_area TEXT,
    last_donation_date DATE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.blood_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_name TEXT NOT NULL,
    blood_group TEXT NOT NULL,
    required_units INTEGER DEFAULT 1,
    hospital_name TEXT NOT NULL,
    hospital_address TEXT,
    contact_phone TEXT NOT NULL,
    urgency TEXT DEFAULT 'আজই প্রয়োজন',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'fulfilled', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ১০. গঠনতন্ত্রের ধারা টেবিল (Constitution Clauses)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.constitution_clauses (
    id TEXT PRIMARY KEY,
    clause TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ১১. ফটো ও ভিডিও গ্যালারি টেবিল (Gallery Items)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    event_year TEXT NOT NULL DEFAULT '২০২৬',
    category TEXT NOT NULL DEFAULT 'মিলনমেলা',
    image_url TEXT NOT NULL,
    video_url TEXT,
    caption TEXT,
    date TEXT,
    news_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ১২. মানবকল্যাণ ও শিক্ষা/চিকিৎসা সহায়তা টেবিল (Welfare Applications)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.welfare_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_id TEXT UNIQUE NOT NULL,
    applicant_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    union_name TEXT NOT NULL,
    village TEXT,
    category TEXT NOT NULL CHECK (category IN ('education', 'treatment', 'emergency')),
    amount_requested NUMERIC(10, 2) NOT NULL,
    description TEXT NOT NULL,
    documents_url TEXT,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'disbursed', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ১৩. ঐতিহাসিক নিদর্শন ও ঐতিহ্য টেবিল (Heritage Items)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.heritage_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    union_name TEXT NOT NULL DEFAULT 'সার্বিক',
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    video_url TEXT,
    category TEXT NOT NULL DEFAULT 'ঐতিহাসিক নিদর্শন',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ১৪. এসএমএস লগ হিস্ট্রি টেবিল (SMS Delivery Logs)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.sms_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_type TEXT NOT NULL,
    recipient_target TEXT NOT NULL,
    phone_count INTEGER DEFAULT 1,
    sample_phone TEXT,
    message TEXT NOT NULL,
    provider TEXT DEFAULT 'bulksmsbd',
    status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'simulated')),
    gateway_response JSONB,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ১৫. ROW LEVEL SECURITY (RLS) ও পূর্ণাঙ্গ ডাটাবেজ সিকিউরিটি পলিসি
-- ====================================================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.union_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constitution_clauses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.welfare_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heritage_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_logs ENABLE ROW LEVEL SECURITY;

-- পাবলিক রিড অ্যাক্সেস পলিসি
CREATE POLICY "Public view settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public view committee" ON public.committee_members FOR SELECT USING (true);
CREATE POLICY "Public view notices" ON public.notices FOR SELECT USING (true);
CREATE POLICY "Public view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public view unions" ON public.union_profiles FOR SELECT USING (true);
CREATE POLICY "Public view donors" ON public.blood_donors FOR SELECT USING (true);
CREATE POLICY "Public view blood requests" ON public.blood_requests FOR SELECT USING (true);
CREATE POLICY "Public view constitution" ON public.constitution_clauses FOR SELECT USING (true);
CREATE POLICY "Public view gallery" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Public view heritage" ON public.heritage_items FOR SELECT USING (true);
CREATE POLICY "Public view approved members" ON public.members FOR SELECT USING (status = 'approved');

-- পাবলিক ইনসার্ট পলিসি (রেজিস্ট্রেশন, কল্যাণ আবেদন ও ব্লাড রিকোয়েস্ট)
CREATE POLICY "Public register member" ON public.members FOR INSERT WITH CHECK (true);
CREATE POLICY "Public create payments" ON public.payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public create blood requests" ON public.blood_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public submit welfare" ON public.welfare_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public view welfare status" ON public.welfare_applications FOR SELECT USING (true);

-- সার্ভিস রোল সম্পূর্ণ অ্যাক্সেস (Full CRUD for Admin)
CREATE POLICY "Admin full settings" ON public.site_settings USING (auth.role() = 'service_role');
CREATE POLICY "Admin full members" ON public.members USING (auth.role() = 'service_role');
CREATE POLICY "Admin full payments" ON public.payments USING (auth.role() = 'service_role');
CREATE POLICY "Admin full committee" ON public.committee_members USING (auth.role() = 'service_role');
CREATE POLICY "Admin full notices" ON public.notices USING (auth.role() = 'service_role');
CREATE POLICY "Admin full events" ON public.events USING (auth.role() = 'service_role');
CREATE POLICY "Admin full unions" ON public.union_profiles USING (auth.role() = 'service_role');
CREATE POLICY "Admin full donors" ON public.blood_donors USING (auth.role() = 'service_role');
CREATE POLICY "Admin full blood req" ON public.blood_requests USING (auth.role() = 'service_role');
CREATE POLICY "Admin full clauses" ON public.constitution_clauses USING (auth.role() = 'service_role');
CREATE POLICY "Admin full gallery" ON public.gallery_items USING (auth.role() = 'service_role');
CREATE POLICY "Admin full welfare" ON public.welfare_applications USING (auth.role() = 'service_role');
CREATE POLICY "Admin full heritage" ON public.heritage_items USING (auth.role() = 'service_role');
CREATE POLICY "Admin full sms" ON public.sms_logs USING (auth.role() = 'service_role');

-- ====================================================================
-- ১৬. ডিফল্ট ইনিশিয়াল ডেটা সিডিং
-- ====================================================================
INSERT INTO public.site_settings (id, site_title, slogan, contact_address, contact_phone, contact_email, bkash_number)
VALUES ('default', 'কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা', 'শেকড়ের টানে একতার বন্ধনে', 'বাড়ি-১৬, রোড-৩/১, ব্লক-এ, সেক্টর-১৬, উত্তরা, ঢাকা-১২৩০', '০১৩৫৩-৭৪৩৫৪৭', 'kishoreganjupazilasamity@gmail.com', '০১৩৫৩-৭৪৩৫৪৭')
ON CONFLICT (id) DO NOTHING;
