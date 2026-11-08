import { supabase } from "./supabaseClient";
import { MemberProfile, PaymentRecord, CommitteeMember, SiteSettings, NoticeItem } from "./types";

export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes("your-project") && !key.includes("your-anon-key"));
};

// ==========================================
// 1. Members Service
// ==========================================
export async function getSupabaseMembers(): Promise<MemberProfile[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase members fetch error:", error.message);
      return null;
    }
    return data as MemberProfile[];
  } catch (err) {
    console.error("Supabase connection error:", err);
    return null;
  }
}

export async function insertSupabaseMember(member: Partial<MemberProfile>): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from("members").insert([
      {
        member_no: member.member_no,
        full_name: member.full_name,
        father_name: member.father_name,
        mother_name: member.mother_name,
        date_of_birth: member.date_of_birth,
        permanent_district: member.permanent_district || "নীলফামারী",
        permanent_upazila: member.permanent_upazila || "কিশোরগঞ্জ",
        permanent_union: member.permanent_union,
        permanent_village: member.permanent_village,
        present_dhaka_address: member.present_dhaka_address,
        dhaka_area: member.dhaka_area,
        profession: member.profession,
        workplace_designation: member.workplace_designation,
        workplace_address: member.workplace_address,
        phone: member.phone,
        email: member.email,
        password_hash: member.password || "kusd1234",
        nid_no: member.nid_no,
        blood_group: member.blood_group,
        photo_url: member.photo_url,
        paper_form_url: member.paper_form_url,
        member_type: member.member_type,
        payment_method: member.payment_method,
        trx_id: member.trx_id,
        fee_amount: member.fee_amount || 500,
        status: member.status || "pending",
        is_offline_entry: member.is_offline_entry || false,
      },
    ]);
    if (error) {
      console.error("Supabase member insert error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Supabase error:", err);
    return false;
  }
}

export async function updateSupabaseMemberStatus(
  memberId: string,
  status: "approved" | "blocked" | "pending"
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase
      .from("members")
      .update({
        status,
        is_blocked: status === "blocked",
        approved_at: status === "approved" ? new Date().toISOString() : null,
      })
      .eq("id", memberId);

    return !error;
  } catch (err) {
    return false;
  }
}

// ==========================================
// 2. Payments Service
// ==========================================
export async function insertSupabasePayment(payment: any): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from("payments").insert([payment]);
    return !error;
  } catch (err) {
    return false;
  }
}

// ==========================================
// 3. Site Settings Service
// ==========================================
export async function getSupabaseSettings(): Promise<SiteSettings | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", "default")
      .single();

    if (error || !data) return null;
    return {
      siteTitle: data.site_title || "কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা",
      subTitle: data.sub_title || "কিশোরগঞ্জ উপজেলা, জেলা: নীলফামারী",
      slogan: data.slogan || "শেকড়ের টানে একতার বন্ধনে",
      announcementTicker: data.announcement_ticker || "",
      heroHeadline: data.hero_headline || "কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা",
      heroSubheadline: data.hero_subheadline || "",
      contactAddress: data.contact_address || "বাড়ি-১৬, রোড-৩/১, ব্লক-এ, সেক্টর-১৬, উত্তরা, ঢাকা-১২৩০",
      contactPhone: data.contact_phone || "০১৩৫৩-৭৪৩৫৪৭",
      contactEmail: data.contact_email || "kishoreganjupazilasamity@gmail.com",
      statMembers: "৩,৫০০+",
      statExecutive: "৫১ জন",
      statDonors: "২৮০+",
      statUnions: "৯টি ইউনিয়ন",
      bkashNumber: data.bkash_number || "০১৩৫৩-৭৪৩৫৪৭",
      smsBalance: data.sms_balance || 5000,
      generalSecretaryName: data.general_secretary_name || "মো. গোলাম মোস্তফা",
      generalSecretarySignatureUrl: data.general_secretary_signature_url || "",
      offlineCollectedAmount: Number(data.offline_collected_amount || 0),
    };
  } catch (err) {
    return null;
  }
}

export async function updateSupabaseSettings(settings: Partial<SiteSettings>): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase
      .from("site_settings")
      .update({
        site_title: settings.siteTitle,
        contact_address: settings.contactAddress,
        contact_phone: settings.contactPhone,
        contact_email: settings.contactEmail,
        bkash_number: settings.bkashNumber,
        sms_balance: settings.smsBalance,
        general_secretary_name: settings.generalSecretaryName,
        general_secretary_signature_url: settings.generalSecretarySignatureUrl,
        offline_collected_amount: settings.offlineCollectedAmount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", "default");

    return !error;
  } catch (err) {
    return false;
  }
}

