import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const supabaseUrl = "https://cuioocrkirpdcdeqbdeb.supabase.co";
const anonKey = "sb_publishable__NvvI2XGvX7-YyKOrFJGww_t_MMyqsh";
const serviceRoleKey = "sb_secret_De2QuagzW_D98o1CVq2QnQ_bpxbl0R4";

// Use service role key to bypass RLS during seeding
const supabase = createClient(supabaseUrl, serviceRoleKey || anonKey, {
  auth: { persistSession: false },
});

async function seed() {
  console.log("Seeding Supabase database with initial project data...");

  // 1. Initial Members
  const sampleMembers = [
    {
      member_no: "KSD-101",
      full_name: "মো. রবিউল ইসলাম",
      father_name: "মো. ফজলুর রহমান",
      mother_name: "মোছা. রবেয়া বেগম",
      date_of_birth: "1988-03-12",
      permanent_district: "নীলফামারী",
      permanent_upazila: "কিশোরগঞ্জ",
      permanent_union: "রণচণ্ডী",
      permanent_village: "রণচণ্ডী স্কুলপাড়া",
      present_dhaka_address: "বাড়ি-১২, রোড-০৫, সেক্টর-১০, উত্তরা, ঢাকা",
      dhaka_area: "উত্তরা",
      profession: "অফিসার, ব্যাংক কর্মকর্তা",
      workplace_designation: "সিনিয়র প্রিন্সিপাল অফিসার",
      workplace_address: "সোনালী ব্যাংক পিএলসি, দিলকুশা, ঢাকা",
      phone: "০১৭৮২-৩৪৫৬৭৮",
      email: "rabiul.kusd@gmail.com",
      password_hash: "kusd1234",
      nid_no: "১৯৮৮৭৩১৮৯১২৩৪৫৬৭৮",
      blood_group: "B+",
      photo_url: "/spots/tista.jpg",
      member_type: "general",
      payment_method: "bkash",
      trx_id: "BKSH9821892",
      fee_amount: 500,
      status: "approved",
      is_offline_entry: false,
    },
    {
      member_no: "KSD-102",
      full_name: "ইঞ্জি. মো. আসাদুজ্জামান",
      father_name: "মরহুম আলহাজ্ব আব্দুল কাদের",
      mother_name: "জাহানারা বেগম",
      date_of_birth: "1984-07-25",
      permanent_district: "নীলফামারী",
      permanent_upazila: "কিশোরগঞ্জ",
      permanent_union: "কিশোরগঞ্জ সদর",
      permanent_village: "দক্ষিণ রাজীব",
      present_dhaka_address: "ফ্ল্যাট-৪বি, প্লট-৮, মিরপুর ডিওএইচএস, ঢাকা",
      dhaka_area: "মিরপুর",
      profession: "প্রকৌশলী ও ব্যবসায়ী",
      workplace_designation: "ব্যবস্থাপনা পরিচালক",
      workplace_address: "টেকনো ইঞ্জিনিয়ারিং, মহাখালী ডিওএইচএস, ঢাকা",
      phone: "০১৯১৮-৮৭৬৫৪৩",
      email: "asad.engineer@yahoo.com",
      password_hash: "kusd1234",
      nid_no: "১৯৮৪৫৬৭৮৯১২৩৪৫৬৭৮",
      blood_group: "O+",
      photo_url: "/spots/chimbal.jpg",
      member_type: "lifetime",
      payment_method: "bank",
      trx_id: "BANK-TRX-8921",
      fee_amount: 10000,
      status: "approved",
      is_offline_entry: false,
    },
    {
      member_no: "KSD-103",
      full_name: "ড. মো. দেলোয়ার হোসেন",
      father_name: "মকবুল হোসেন সরকার",
      mother_name: "মাজেদা খাতুন",
      date_of_birth: "1978-11-15",
      permanent_district: "নীলফামারী",
      permanent_upazila: "কিশোরগঞ্জ",
      permanent_union: "বাহাগিলি",
      permanent_village: "দক্ষিণ বাহাগিলি",
      present_dhaka_address: "বাড়ি-৪৫, রোড-৭, ধানমন্ডি, ঢাকা",
      dhaka_area: "ধানমন্ডি",
      profession: "অধ্যাপক ও গবেষক",
      workplace_designation: "অধ্যাপক, ফার্মেসি অনুষদ",
      workplace_address: "ঢাকা বিশ্ববিদ্যালয়, ঢাকা",
      phone: "০১৬১১-২২৩৩৪৪",
      email: "delowar.du@gmail.com",
      password_hash: "kusd1234",
      nid_no: "১৯৭৮১২৩৪৫৬৭৮৯০১১২",
      blood_group: "A+",
      member_type: "donor",
      payment_method: "cash",
      trx_id: "CASH-OFFLINE-003",
      fee_amount: 50000,
      status: "approved",
      is_offline_entry: true,
    },
  ];

  const { error: mErr } = await supabase.from("members").upsert(sampleMembers, { onConflict: "phone" });
  if (mErr) console.log("Members seed error:", mErr.message);
  else console.log("✓ Members seeded successfully!");

  // 2. Initial Notices
  const sampleNotices = [
    {
      title: "কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা-এর সদস্য নিবন্ধন ও নবায়ন বিজ্ঞপ্তি ২০২৬",
      slug: "membership-registration-renewal-2026",
      content: "ঢাকাস্থ সকল কিশোরগঞ্জ উপজেলাবাসীর অবগতির জন্য জানানো যাচ্ছে যে, ২০২৬-২০২৮ মেয়াদের নতুন সদস্য নিবন্ধন ও নবায়ন কার্যক্রম আনুষ্ঠানিকভাবে শুরু হয়েছে। সকল ভাই-বোনদের যথাসময়ে নিবন্ধন সম্পন্ন করার জন্য অনুরোধ করা হলো।",
      published_date: "2026-01-10",
      is_pinned: true,
      category: "general",
      status: "active",
    },
    {
      title: "আগামী ১৫ ফেব্রুয়ারি ২০২৬: বাৎসরিক পারিবারিক মিলনমেলা ও সাংস্কৃতিক সন্ধ্যা",
      slug: "annual-family-picnic-cultural-evening-2026",
      content: "আমাদের ঐতিহ্যবাহী বার্ষিক মিলনমেলা ও পিঠা উৎসব আগামী ১৫ ফেব্রুয়ারি উত্তরা অফিসার্স ক্লাবে অনুষ্ঠিত হবে। এতে স্বপরিবারে আপনাদের সদয় উপস্থিতি কামনা করছি।",
      published_date: "2026-01-20",
      is_pinned: true,
      category: "event",
      status: "active",
    },
  ];

  const { error: nErr } = await supabase.from("notices").upsert(sampleNotices, { onConflict: "slug" });
  if (nErr) console.log("Notices seed error:", nErr.message);
  else console.log("✓ Notices seeded successfully!");

  // 3. Initial Events
  const sampleEvents = [
    {
      title: "বার্ষিক পারিবারিক মিলনমেলা ও পিঠা উৎসব ২০২৬",
      date: "১৫ ফেব্রুয়ারি, ২০২৬",
      time: "সকাল ৯:০০ - রাত ৮:০০",
      venue: "উত্তরা অফিসার্স ক্লাব, উত্তরা, ঢাকা",
      description: "ঢাকাস্থ কিশোরগঞ্জ উপজেলাবাসীর আনন্দঘন পারিবারিক মিলনমেলা ও মনোজ্ঞ ভাওয়াইয়া সংগীত সন্ধ্যা।",
      status: "upcoming",
      year: "২০২৬",
    },
    {
      title: "বিনামূল্যে মেডিকেল ক্যাম্প ও ব্লাড ডোনেশন ২০২৬",
      date: "২৬ মার্চ, ২০২৬",
      time: "সকাল ১০:০০ - বিকাল ৪:০০",
      venue: "সমিতি মিলনায়তন, উত্তরা",
      description: "মহান স্বাধীনতা দিবস উপলক্ষে অভিজ্ঞ চিকিৎসকদের দ্বারা বিনামূল্যে স্বাস্থ্য পরীক্ষা ও রক্তদান।",
      status: "upcoming",
      year: "২০২৬",
    },
  ];

  const { error: eErr } = await supabase.from("events").insert(sampleEvents);
  if (eErr) console.log("Events seed error:", eErr.message);
  else console.log("✓ Events seeded successfully!");

  console.log("Database initial seeding complete!");
}

seed();

