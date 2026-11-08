-- ========================================================
-- ঢাকাস্থ কিশোরগঞ্জ উপজেলা সমিতি — পূর্ণাঙ্গ ডাটাবেজ স্কিমা (Supabase PostgreSQL)
-- ফাইল: supabase/migrations/001_initial_schema.sql
-- ========================================================

-- ১. এনাম (Enums) তৈরি
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'member', 'guest');
CREATE TYPE member_type AS ENUM ('general', 'lifetime', 'donor');
CREATE TYPE member_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE blood_group_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
CREATE TYPE fee_type AS ENUM ('registration', 'monthly_subscription', 'donation');
CREATE TYPE payment_gateway AS ENUM ('bkash', 'nagad', 'rocket', 'bank');
CREATE TYPE payment_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE committee_type AS ENUM ('advisory', 'executive');
CREATE TYPE welfare_category AS ENUM ('education', 'treatment', 'emergency');
CREATE TYPE welfare_status AS ENUM ('submitted', 'under_review', 'approved', 'disbursed');

-- ২. ইউজার প্রোফাইল টেবিল (Profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    role user_role DEFAULT 'member',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ৩. সদস্য টেবিল (Members)
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    member_no TEXT UNIQUE, -- e.g. KUSD-2026-0001
    full_name TEXT NOT NULL,
    father_name TEXT NOT NULL,
    mother_name TEXT NOT NULL,
    member_type member_type NOT NULL DEFAULT 'general',
    phone TEXT NOT NULL,
    email TEXT,
    blood_group blood_group_type NOT NULL,
    permanent_district TEXT DEFAULT 'নীলফামারী',
    permanent_upazila TEXT DEFAULT 'কিশোরগঞ্জ',
    permanent_union TEXT NOT NULL, -- e.g. কিশোরগঞ্জ সদর, পুটিমারী, চাঁদখানা, বাহাগিলি, রণচণ্ডী, বড়ভিটা, নিতাই, মাগুড়া, গাড়াগ্রাম
    permanent_village TEXT NOT NULL,
    present_dhaka_address TEXT NOT NULL,
    dhaka_area TEXT NOT NULL, -- e.g. উত্তরা, মিরপুর, ধানমন্ডি
    profession TEXT NOT NULL,
    workplace TEXT,
    education TEXT,
    nid_no TEXT,
    photo_url TEXT,
    status member_status DEFAULT 'pending',
    approved_at TIMESTAMPTZ,
    approved_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ৪. পেমেন্ট ও চাঁদা টেবিল (Payments)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    member_name TEXT NOT NULL,
    fee_type fee_type NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method payment_gateway NOT NULL,
    sender_number TEXT NOT NULL,
    trx_id TEXT UNIQUE NOT NULL,
    receipt_no TEXT UNIQUE, -- e.g. REC-2026-0001
    status payment_status DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ৫. নোটিশ ও সার্কুলার (Notices)
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'সাধারণ',
    attachment_url TEXT,
    is_pinned BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES public.profiles(id)
);

-- ৬. অনুষ্ঠান ও আয়োজন (Events)
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    venue TEXT NOT NULL,
    description TEXT NOT NULL,
    banner_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ৭. ফটো ও ভিডিও গ্যালারি (Gallery Items)
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    event_year INT DEFAULT 2026,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ৮. কিশোরগঞ্জ ব্লাড ব্যাংক (Blood Donors)
CREATE TABLE IF NOT EXISTS public.blood_donors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    blood_group blood_group_type NOT NULL,
    dhaka_area TEXT NOT NULL,
    phone TEXT NOT NULL,
    last_donation_date DATE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ৯. কল্যাণ তহবিল ও শিক্ষা সহায়তা (Welfare Applications)
CREATE TABLE IF NOT EXISTS public.welfare_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    applicant_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    category welfare_category NOT NULL,
    amount_requested NUMERIC(10, 2) NOT NULL,
    description TEXT NOT NULL,
    documents_url TEXT,
    status welfare_status DEFAULT 'submitted',
    reviewed_by UUID REFERENCES public.profiles(id),
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ১০. কমিটি তালিকা (Committee Members)
CREATE TABLE IF NOT EXISTS public.committee_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    committee_type committee_type NOT NULL,
    order_index INT NOT NULL DEFAULT 1,
    phone TEXT NOT NULL,
    email TEXT,
    village TEXT NOT NULL,
    photo_url TEXT,
    tenure_years TEXT DEFAULT '২০২৬-২০২৮',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- সিকোয়েন্স ও ট্রিগার (অটো মেম্বার আইডি ও রসিদ নম্বর)
-- ========================================================

CREATE SEQUENCE IF NOT EXISTS member_id_seq START WITH 1;
CREATE SEQUENCE IF NOT EXISTS receipt_id_seq START WITH 1;

-- ফাংশন: সদস্য অনুমোদনকালে মেম্বার আইডি জেনারেট
CREATE OR REPLACE FUNCTION generate_member_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') AND NEW.member_no IS NULL THEN
        NEW.member_no := 'KUSD-2026-' || LPAD(nextval('member_id_seq')::TEXT, 4, '0');
        NEW.approved_at := NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_member_number
BEFORE INSERT OR UPDATE ON public.members
FOR EACH ROW
EXECUTE FUNCTION generate_member_number();

-- ফাংশন: পেমেন্ট ভেরিফাইকালে রসিদ নম্বর জেনারেট
CREATE OR REPLACE FUNCTION generate_receipt_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'verified' AND (OLD.status IS NULL OR OLD.status != 'verified') AND NEW.receipt_no IS NULL THEN
        NEW.receipt_no := 'REC-2026-' || LPAD(nextval('receipt_id_seq')::TEXT, 4, '0');
        NEW.verified_at := NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_receipt_number
BEFORE INSERT OR UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION generate_receipt_number();

-- ========================================================
-- Row Level Security (RLS) পলিসি
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.welfare_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committee_members ENABLE ROW LEVEL SECURITY;

-- নোটিশ, কমিটি, ইভেন্ট ও গ্যালারি সবার জন্য উন্মুক্ত (পাবলিক রিড)
CREATE POLICY "Public read notices" ON public.notices FOR SELECT USING (true);
CREATE POLICY "Public read committee" ON public.committee_members FOR SELECT USING (true);
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read blood donors" ON public.blood_donors FOR SELECT USING (is_available = true);
CREATE POLICY "Public read approved members" ON public.members FOR SELECT USING (status = 'approved');

-- ব্যবহারকারী শুধুমাত্র নিজের প্রোফাইল ও আবেদন দেখতে পারবে
CREATE POLICY "User read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "User update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ========================================================
-- প্রাথমিক নমুনা ডেটা (Seed Data)
-- ========================================================

-- উপদেষ্টা পরিষদ (নমুনা সদস্য)
INSERT INTO public.committee_members (name, designation, committee_type, order_index, phone, village)
VALUES
('আলহাজ্ব ড. মো. রফিকুল ইসলাম', 'প্রধান উপদেষ্টা', 'advisory', 1, '০১৭১১-XXXXXX', 'বত্রিশ'),
('প্রকৌশলী এ. কে. এম. মোস্তফা', 'উপদেষ্টা', 'advisory', 2, '০১৮১৯-XXXXXX', 'হারুয়া'),
('অধ্যক্ষ মাহফুজুর রহমান', 'উপদেষ্টা', 'advisory', 3, '০১৯১২-XXXXXX', 'যশোদল');

-- কার্যনির্বাহী পরিষদ (সভাপতি, সাধারণ সম্পাদক ও নেতৃবৃন্দ)
INSERT INTO public.committee_members (name, designation, committee_type, order_index, phone, village)
VALUES
('মো. কামরুল হাসান বাবুল', 'সভাপতি', 'executive', 1, '০১৩৫৩-৭৪৩৫৪৭', 'শোলাকিয়া'),
('এডভোকেট মো. জহিরুল হক', 'সিনিয়র সহ-সভাপতি', 'executive', 2, '০১৭১২-XXXXXX', 'গাউছিয়া'),
('কাজী তানভীর আহমেদ', 'সাধারণ সম্পাদক', 'executive', 3, '০১৭২০-XXXXXX', 'কাটাবাড়িয়া'),
('মো. আশরাফুল আলম', 'সাংগঠনিক সম্পাদক', 'executive', 4, '০১৮১৮-XXXXXX', 'বিন্নগাঁও'),
('মাহবুবুর রহমান চঞ্চল', 'কোষাধ্যক্ষ', 'executive', 5, '০১৬১১-XXXXXX', 'পাগলা মোড়');

