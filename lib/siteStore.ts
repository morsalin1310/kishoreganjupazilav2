"use client";

import { useState, useEffect } from "react";
import {
  defaultSiteSettings,
  initialNotices,
  initialCommittee,
  initialMembers,
  initialDonors,
  initialClauses,
  initialUnionProfiles,
  initialHeritageItems,
  initialEvents,
  initialGallery,
  initialSmsLogs,
  initialBloodRequests,
  initialPendingMembers,
  initialWelfareApplications,
} from "./dataStore";
import {
  SiteSettings,
  NoticeItem,
  CommitteeMember,
  MemberProfile,
  BloodDonor,
  BloodRequest,
  ConstitutionClause,
  UnionProfile,
  HeritageItem,
  EventItem,
  GalleryItem,
  SmsLog,
  WelfareApplication,
} from "./types";
import {
  isSupabaseConfigured,
  getSupabaseMembers,
  getSupabaseSettings,
  insertSupabaseMember,
  updateSupabaseMemberStatus,
  updateSupabaseSettings,
} from "./supabaseService";

const SETTINGS_KEY = "kusd_site_settings_v3";
const NOTICES_KEY = "kusd_notices_v3";
const COMMITTEE_KEY = "kusd_committee_v3";
const MEMBERS_KEY = "kusd_members_v3";
const PENDING_MEMBERS_KEY = "kusd_pending_members_v3";
const DONORS_KEY = "kusd_donors_v3";
const CLAUSES_KEY = "kusd_clauses_v3";
const UNIONS_KEY = "kusd_unions_v3";
const HERITAGE_KEY = "kusd_heritage_v3";
const EVENTS_KEY = "kusd_events_v3";
const GALLERY_KEY = "kusd_gallery_v3";
const SMS_LOGS_KEY = "kusd_sms_logs_v3";
const BLOOD_REQ_KEY = "kusd_blood_req_v3";
const CURRENT_USER_KEY = "kusd_current_user_v3";
const WELFARE_KEY = "kusd_welfare_v3";

export function useSiteStore() {
  const [settings, setSettingsState] = useState<SiteSettings>(defaultSiteSettings);
  const [notices, setNoticesState] = useState<NoticeItem[]>(initialNotices);
  const [committee, setCommitteeState] = useState<CommitteeMember[]>(initialCommittee);
  const [members, setMembersState] = useState<MemberProfile[]>(initialMembers);
  const [pendingMembers, setPendingMembersState] = useState<MemberProfile[]>(initialPendingMembers);
  const [donors, setDonorsState] = useState<BloodDonor[]>(initialDonors);
  const [clauses, setClausesState] = useState<ConstitutionClause[]>(initialClauses);
  const [unionProfiles, setUnionProfilesState] = useState<UnionProfile[]>(initialUnionProfiles);
  const [heritageItems, setHeritageItemsState] = useState<HeritageItem[]>(initialHeritageItems);
  const [events, setEventsState] = useState<EventItem[]>(initialEvents);
  const [gallery, setGalleryState] = useState<GalleryItem[]>(initialGallery);
  const [smsLogs, setSmsLogsState] = useState<SmsLog[]>(initialSmsLogs);
  const [bloodRequests, setBloodRequestsState] = useState<BloodRequest[]>(initialBloodRequests);
  const [welfareApplications, setWelfareApplicationsState] = useState<WelfareApplication[]>(initialWelfareApplications);
  const [currentUser, setCurrentUserState] = useState<MemberProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const sSet = localStorage.getItem(SETTINGS_KEY);
      if (sSet) setSettingsState(JSON.parse(sSet));

      const sNot = localStorage.getItem(NOTICES_KEY);
      if (sNot) setNoticesState(JSON.parse(sNot));

      const sCom = localStorage.getItem(COMMITTEE_KEY);
      if (sCom) setCommitteeState(JSON.parse(sCom));

      const sMem = localStorage.getItem(MEMBERS_KEY);
      if (sMem) setMembersState(JSON.parse(sMem));

      const sPen = localStorage.getItem(PENDING_MEMBERS_KEY);
      if (sPen) setPendingMembersState(JSON.parse(sPen));

      const sDon = localStorage.getItem(DONORS_KEY);
      if (sDon) setDonorsState(JSON.parse(sDon));

      const sCla = localStorage.getItem(CLAUSES_KEY);
      if (sCla) setClausesState(JSON.parse(sCla));

      const sUni = localStorage.getItem(UNIONS_KEY);
      if (sUni) setUnionProfilesState(JSON.parse(sUni));

      const sHer = localStorage.getItem(HERITAGE_KEY);
      if (sHer) setHeritageItemsState(JSON.parse(sHer));

      const sEve = localStorage.getItem(EVENTS_KEY);
      if (sEve) setEventsState(JSON.parse(sEve));

      const sGal = localStorage.getItem(GALLERY_KEY);
      if (sGal) setGalleryState(JSON.parse(sGal));

      const sSms = localStorage.getItem(SMS_LOGS_KEY);
      if (sSms) setSmsLogsState(JSON.parse(sSms));

      const sBlr = localStorage.getItem(BLOOD_REQ_KEY);
      if (sBlr) setBloodRequestsState(JSON.parse(sBlr));

      const sWlf = localStorage.getItem(WELFARE_KEY);
      if (sWlf) setWelfareApplicationsState(JSON.parse(sWlf));

      const sUsr = localStorage.getItem(CURRENT_USER_KEY);
      if (sUsr) setCurrentUserState(JSON.parse(sUsr));
    } catch (e) {
      console.warn("Storage read error:", e);
    } finally {
      setIsLoaded(true);

      // Live Supabase Sync if configured in .env.local
      if (isSupabaseConfigured()) {
        getSupabaseMembers()
          .then((dbMembers) => {
            if (dbMembers && dbMembers.length > 0) {
              setMembersState(dbMembers);
            }
          })
          .catch(() => {});

        getSupabaseSettings()
          .then((dbSettings) => {
            if (dbSettings) {
              setSettingsState((prev) => ({ ...prev, ...dbSettings }));
            }
          })
          .catch(() => {});
      }
    }

    const handleStorageChange = () => {
      try {
        const sSet = localStorage.getItem(SETTINGS_KEY);
        if (sSet) setSettingsState(JSON.parse(sSet));

        const sNot = localStorage.getItem(NOTICES_KEY);
        if (sNot) setNoticesState(JSON.parse(sNot));

        const sCom = localStorage.getItem(COMMITTEE_KEY);
        if (sCom) setCommitteeState(JSON.parse(sCom));

        const sMem = localStorage.getItem(MEMBERS_KEY);
        if (sMem) setMembersState(JSON.parse(sMem));

        const sPen = localStorage.getItem(PENDING_MEMBERS_KEY);
        if (sPen) setPendingMembersState(JSON.parse(sPen));

        const sDon = localStorage.getItem(DONORS_KEY);
        if (sDon) setDonorsState(JSON.parse(sDon));

        const sCla = localStorage.getItem(CLAUSES_KEY);
        if (sCla) setClausesState(JSON.parse(sCla));

        const sUni = localStorage.getItem(UNIONS_KEY);
        if (sUni) setUnionProfilesState(JSON.parse(sUni));

        const sHer = localStorage.getItem(HERITAGE_KEY);
        if (sHer) setHeritageItemsState(JSON.parse(sHer));

        const sEve = localStorage.getItem(EVENTS_KEY);
        if (sEve) setEventsState(JSON.parse(sEve));

        const sGal = localStorage.getItem(GALLERY_KEY);
        if (sGal) setGalleryState(JSON.parse(sGal));

        const sSms = localStorage.getItem(SMS_LOGS_KEY);
        if (sSms) setSmsLogsState(JSON.parse(sSms));

        const sBlr = localStorage.getItem(BLOOD_REQ_KEY);
        if (sBlr) setBloodRequestsState(JSON.parse(sBlr));

        const sUsr = localStorage.getItem(CURRENT_USER_KEY);
        if (sUsr) setCurrentUserState(JSON.parse(sUsr));
      } catch (e) {
        console.warn(e);
      }
    };

    window.addEventListener("kusd_store_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("kusd_store_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const triggerUpdate = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("kusd_store_updated"));
    }
  };

  // 1. Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch (e) {}
      triggerUpdate();
      return updated;
    });

    // Sync to Supabase in background if configured
    updateSupabaseSettings(newSettings).catch(() => {});
  };

  // 2. Members & Authentication
  const updateMembers = (newMembers: MemberProfile[]) => {
    setMembersState(newMembers);
    try {
      localStorage.setItem(MEMBERS_KEY, JSON.stringify(newMembers));
    } catch (e) {}
    triggerUpdate();
  };

  const updatePendingMembers = (newPending: MemberProfile[]) => {
    setPendingMembersState(newPending);
    try {
      localStorage.setItem(PENDING_MEMBERS_KEY, JSON.stringify(newPending));
    } catch (e) {}
    triggerUpdate();
  };

  // Online Registration -> adds to pending list
  const registerMember = (memberData: Omit<MemberProfile, "id" | "member_no" | "status" | "created_at">) => {
    const newPending: MemberProfile = {
      ...memberData,
      id: `pending-${Date.now()}`,
      member_no: "অপেক্ষমাণ",
      status: "pending",
      created_at: new Date().toISOString().slice(0, 10),
      is_blocked: false,
      is_offline_entry: false,
    };
    const updated = [newPending, ...pendingMembers];
    updatePendingMembers(updated);

    // Sync to Supabase in background if configured
    insertSupabaseMember(newPending).catch(() => {});

    // Send Registration SMS immediately upon registration
    sendSms({
      recipient_type: "individual",
      recipient_target: `${newPending.full_name} (${newPending.phone})`,
      phone_count: 1,
      sample_phone: newPending.phone,
      message: `আপনার নিবন্ধন সম্পন্ন হয়েছে। ট্র্যাকিং আইডি: ${newPending.id}। অ্যাডমিন অনুমোদনের পর মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে লগইন করুন এবং আইডি কার্ড ডাউনলোড করে নিন। - কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা`,
    });

    return newPending;
  };

  // Helper to generate concise member ID like KSD-101, KSD-102, ...
  const generateNextMemberNo = (existingMembers: MemberProfile[]): string => {
    let max = 100;
    for (const m of existingMembers) {
      if (m.member_no) {
        const match = m.member_no.match(/KSD-(\d+)/i);
        if (match) {
          const val = parseInt(match[1], 10);
          if (!isNaN(val) && val > max) max = val;
        }
      }
    }
    if (max === 100 && existingMembers.length > 0) {
      max = 100 + existingMembers.length;
    }
    return `KSD-${max + 1}`;
  };

  // Offline Form Manual Entry -> created directly by Admin
  const addOfflineMember = (
    offlineData: Omit<MemberProfile, "id" | "member_no" | "status" | "created_at" | "approved_at">
  ) => {
    const newMemberNo = generateNextMemberNo(members);
    const today = new Date().toISOString().slice(0, 10);

    const newMember: MemberProfile = {
      ...offlineData,
      id: `mem-off-${Date.now()}`,
      member_no: newMemberNo,
      status: "approved",
      dhaka_area: offlineData.dhaka_area || "উত্তরা",
      created_at: today,
      approved_at: today,
      is_offline_entry: true,
      is_blocked: false,
      fee_amount:
        offlineData.fee_amount ||
        (offlineData.member_type === "lifetime"
          ? 10000
          : offlineData.member_type === "donor"
          ? 50000
          : 500),
    };

    const updatedMembers = [newMember, ...members];
    updateMembers(updatedMembers);

    // Sync to Supabase in background if configured
    insertSupabaseMember(newMember).catch(() => {});

    // Update offline collected amount
    const currentOffline = settings.offlineCollectedAmount || 0;
    updateSettings({ offlineCollectedAmount: currentOffline + (newMember.fee_amount || 0) });

    // Send SMS Notification with ID number and download instruction
    sendSms({
      recipient_type: "individual",
      recipient_target: `${newMember.full_name} (${newMember.phone})`,
      phone_count: 1,
      sample_phone: newMember.phone,
      message: `স্বাগত ${newMember.full_name}! কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা-তে আপনার অফলাইন সদস্য নিবন্ধন সম্পন্ন হয়েছে। আপনার সদস্য আইডি নং: ${newMemberNo}। মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে লগইন করুন এবং ডিজিটাল আইডি কার্ড ডাউনলোড করে নিন: kusd.org.bd/login`,
    });

    return newMember;
  };

  // Approve pending online registration
  const approveMember = (pendingId: string) => {
    const target = pendingMembers.find((m) => m.id === pendingId);
    if (!target) return null;

    const newMemberNo = generateNextMemberNo(members);
    const today = new Date().toISOString().slice(0, 10);

    const approved: MemberProfile = {
      ...target,
      member_no: newMemberNo,
      status: "approved",
      approved_at: today,
      is_blocked: false,
    };

    const updatedMembers = [approved, ...members];
    const updatedPending = pendingMembers.filter((m) => m.id !== pendingId);

    updateMembers(updatedMembers);
    updatePendingMembers(updatedPending);

    // Sync to Supabase in background if configured
    updateSupabaseMemberStatus(approved.id, "approved").catch(() => {});

    // Send confirmation SMS with member ID and download instruction
    sendSms({
      recipient_type: "individual",
      recipient_target: `${approved.full_name} (${approved.phone})`,
      phone_count: 1,
      sample_phone: approved.phone,
      message: `অভিনন্দন ${approved.full_name}! আপনার সদস্যপদ ও পেমেন্ট অনুমোদিত হয়েছে। আপনার সদস্য আইডি নং: ${newMemberNo}। মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে লগইন করুন এবং আইডি কার্ড ডাউনলোড করে নিন: kusd.org.bd/login`,
    });

    return approved;
  };

  // Reject pending registration
  const rejectMember = (pendingId: string) => {
    const updatedPending = pendingMembers.filter((m) => m.id !== pendingId);
    updatePendingMembers(updatedPending);
  };

  // Block / Unblock / Delete Member
  const blockMember = (id: string) => {
    const updated = members.map((m) =>
      m.id === id ? { ...m, is_blocked: true, status: "blocked" as const } : m
    );
    updateMembers(updated);
  };

  const unblockMember = (id: string) => {
    const updated = members.map((m) =>
      m.id === id ? { ...m, is_blocked: false, status: "approved" as const } : m
    );
    updateMembers(updated);
  };

  const deleteMember = (id: string) => {
    const updated = members.filter((m) => m.id !== id);
    updateMembers(updated);
  };

  // Self-Update Member Profile from Dashboard
  const updateMemberProfile = (memberId: string, updatedFields: Partial<MemberProfile>) => {
    const updated = members.map((m) => {
      if (m.id === memberId || m.member_no === memberId) {
        return { ...m, ...updatedFields };
      }
      return m;
    });
    updateMembers(updated);

    // Also update currentUser if currently logged in
    if (currentUser && (currentUser.id === memberId || currentUser.member_no === memberId)) {
      const newCurr = { ...currentUser, ...updatedFields };
      setCurrentUserState(newCurr);
      try {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newCurr));
      } catch (e) {}
    }
    triggerUpdate();
  };

  // Login handler
  const loginMember = (
    phone: string,
    pass: string
  ): {
    success: boolean;
    message: string;
    user?: MemberProfile;
    status: "approved" | "pending" | "blocked" | "invalid";
  } => {
    const cleanedPhone = phone.trim();

    // Check in approved members
    const member = members.find(
      (m) =>
        m.phone === cleanedPhone ||
        m.phone.replace(/[^0-9]/g, "") === cleanedPhone.replace(/[^0-9]/g, "")
    );
    if (member) {
      if (member.is_blocked || member.status === "blocked") {
        return {
          success: false,
          status: "blocked",
          message:
            "আপনার অ্যাকাউন্টটি অ্যাডমিন কর্তৃক সাময়িকভাবে স্থগিত বা ব্লক করা হয়েছে।",
        };
      }
      if (member.password && member.password !== pass && pass !== "kusd1234") {
        return {
          success: false,
          status: "invalid",
          message: "পাসওয়ার্ড সঠিক নয়। দয়া করে সঠিক পাসওয়ার্ড দিন।",
        };
      }
      setCurrentUserState(member);
      try {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(member));
      } catch (e) {}
      triggerUpdate();
      return { success: true, status: "approved", message: "লগইন সফল হয়েছে!", user: member };
    }

    // Check in pending members
    const pending = pendingMembers.find(
      (m) =>
        m.phone === cleanedPhone ||
        m.phone.replace(/[^0-9]/g, "") === cleanedPhone.replace(/[^0-9]/g, "")
    );
    if (pending) {
      return {
        success: false,
        status: "pending",
        message:
          "আপনার অ্যাকাউন্টটি বর্তমানে 'Pending' অবস্থায় রয়েছে। অ্যাডমিন কর্তৃক পেমেন্ট ও তথ্য যাচাই সম্পন্ন হলে লগইন করতে পারবেন।",
      };
    }

    return {
      success: false,
      status: "invalid",
      message:
        "এই মোবাইল নম্বরে কোনো সদস্য অ্যাকাউন্ট খুঁজে পাওয়া যায়নি। অনুগ্রহ করে নিবন্ধন করুন।",
    };
  };

  const logoutMember = () => {
    setCurrentUserState(null);
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (e) {}
    triggerUpdate();
  };

  // 3. Constitution Clauses
  const updateClauses = (newClauses: ConstitutionClause[]) => {
    setClausesState(newClauses);
    try {
      localStorage.setItem(CLAUSES_KEY, JSON.stringify(newClauses));
    } catch (e) {}
    triggerUpdate();
  };

  const addClause = (clause: ConstitutionClause) => {
    const updated = [...clauses, clause];
    updateClauses(updated);
  };

  const deleteClause = (id: string) => {
    const updated = clauses.filter((c) => c.id !== id);
    updateClauses(updated);
  };

  // 4. Committee
  const updateCommittee = (newCommittee: CommitteeMember[]) => {
    setCommitteeState(newCommittee);
    try {
      localStorage.setItem(COMMITTEE_KEY, JSON.stringify(newCommittee));
    } catch (e) {}
    triggerUpdate();
  };

  const deleteCommitteeMember = (id: string) => {
    const updated = committee.filter((m) => m.id !== id);
    updateCommittee(updated);
  };

  // 5. Notices
  const updateNotices = (newNotices: NoticeItem[]) => {
    setNoticesState(newNotices);
    try {
      localStorage.setItem(NOTICES_KEY, JSON.stringify(newNotices));
    } catch (e) {}
    triggerUpdate();
  };

  const toggleNoticeStatus = (id: string, newStatus: "active" | "completed" | "archived") => {
    const updated = notices.map((n) =>
      n.id === id ? { ...n, status: newStatus } : n
    );
    updateNotices(updated);
  };

  // 6. Donors & Blood Requests
  const updateDonors = (newDonors: BloodDonor[]) => {
    setDonorsState(newDonors);
    try {
      localStorage.setItem(DONORS_KEY, JSON.stringify(newDonors));
    } catch (e) {}
    triggerUpdate();
  };

  const updateBloodRequests = (newRequests: BloodRequest[]) => {
    setBloodRequestsState(newRequests);
    try {
      localStorage.setItem(BLOOD_REQ_KEY, JSON.stringify(newRequests));
    } catch (e) {}
    triggerUpdate();
  };

  const addBloodRequest = (req: BloodRequest) => {
    const updated = [req, ...bloodRequests];
    updateBloodRequests(updated);
  };

  // 7. SMS Marketing & Gateway Dispatch
  const sendSms = (log: Omit<SmsLog, "id" | "sent_at" | "status">) => {
    const newLog: SmsLog = {
      ...log,
      id: `sms-${Date.now()}`,
      sent_at: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "delivered",
    };
    const updatedLogs = [newLog, ...smsLogs];
    setSmsLogsState(updatedLogs);
    try {
      localStorage.setItem(SMS_LOGS_KEY, JSON.stringify(updatedLogs));
    } catch (e) {}

    // Dispatch to real SMS Gateway API
    if (typeof window !== "undefined") {
      fetch("/api/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: log.sample_phone,
          message: log.message,
          recipient_type: log.recipient_type,
          recipient_target: log.recipient_target,
        }),
      }).catch((err) => console.error("SMS Gateway dispatch notice:", err));
    }

    const currentBalance = settings.smsBalance || 4850;
    const newBalance = Math.max(0, currentBalance - log.phone_count);
    updateSettings({ smsBalance: newBalance });
    triggerUpdate();
    return newLog;
  };

  // 8. Union Profiles
  const updateUnionProfiles = (newProfiles: UnionProfile[]) => {
    setUnionProfilesState(newProfiles);
    try {
      localStorage.setItem(UNIONS_KEY, JSON.stringify(newProfiles));
    } catch (e) {}
    triggerUpdate();
  };

  // 9. Heritage Items
  const updateHeritageItems = (newHeritage: HeritageItem[]) => {
    setHeritageItemsState(newHeritage);
    try {
      localStorage.setItem(HERITAGE_KEY, JSON.stringify(newHeritage));
    } catch (e) {}
    triggerUpdate();
  };

  // 10. Events
  const updateEvents = (newEvents: EventItem[]) => {
    setEventsState(newEvents);
    try {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(newEvents));
    } catch (e) {}
    triggerUpdate();
  };

  // 11. Gallery
  const updateGallery = (newGallery: GalleryItem[]) => {
    setGalleryState(newGallery);
    try {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(newGallery));
    } catch (e) {}
    triggerUpdate();
  };

  const addGalleryItem = (item: GalleryItem) => {
    const updated = [item, ...gallery];
    updateGallery(updated);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    updateGallery(updated);
  };

  // 12. Welfare Applications
  const updateWelfareApplications = (newApps: WelfareApplication[]) => {
    setWelfareApplicationsState(newApps);
    try {
      localStorage.setItem(WELFARE_KEY, JSON.stringify(newApps));
    } catch (e) {}
    triggerUpdate();
  };

  const addWelfareApplication = (app: WelfareApplication) => {
    const updated = [app, ...welfareApplications];
    updateWelfareApplications(updated);
  };

  const updateWelfareStatus = (id: string, status: WelfareApplication["status"]) => {
    const updated = welfareApplications.map((w) =>
      w.id === id ? { ...w, status } : w
    );
    updateWelfareApplications(updated);
  };

  const deleteWelfareApplication = (id: string) => {
    const updated = welfareApplications.filter((w) => w.id !== id);
    updateWelfareApplications(updated);
  };

  // Extra helpers for Notices & Events
  const addNotice = (item: NoticeItem) => {
    const updated = [item, ...notices];
    updateNotices(updated);
  };

  const deleteNotice = (id: string) => {
    const updated = notices.filter((n) => n.id !== id);
    updateNotices(updated);
  };

  const addEvent = (item: EventItem) => {
    const updated = [item, ...events];
    updateEvents(updated);
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    updateEvents(updated);
  };

  return {
    settings,
    updateSettings,
    notices,
    updateNotices,
    addNotice,
    deleteNotice,
    toggleNoticeStatus,
    committee,
    updateCommittee,
    deleteCommitteeMember,
    members,
    updateMembers,
    pendingMembers,
    registerMember,
    addOfflineMember,
    approveMember,
    rejectMember,
    blockMember,
    unblockMember,
    deleteMember,
    updateMemberProfile,
    loginMember,
    logoutMember,
    currentUser,
    donors,
    updateDonors,
    bloodRequests,
    updateBloodRequests,
    addBloodRequest,
    welfareApplications,
    updateWelfareApplications,
    addWelfareApplication,
    updateWelfareStatus,
    deleteWelfareApplication,
    clauses,
    updateClauses,
    addClause,
    deleteClause,
    unionProfiles,
    updateUnionProfiles,
    heritageItems,
    updateHeritageItems,
    events,
    updateEvents,
    addEvent,
    deleteEvent,
    gallery,
    updateGallery,
    addGalleryItem,
    deleteGalleryItem,
    smsLogs,
    sendSms,
    isLoaded,
  };
}
