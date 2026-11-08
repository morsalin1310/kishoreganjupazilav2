"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import DigitalIdCard from "@/components/dashboard/DigitalIdCard";
import MemberDetailsModal from "@/components/admin/MemberDetailsModal";
import {
  MemberProfile,
  NoticeItem,
  CommitteeMember,
  NILPHAMARI_KISHOREGANJ_UNIONS,
  KishoreganjUnion,
  ConstitutionClause,
  BloodRequest,
  EventItem,
  GalleryItem,
  HeritageItem,
  UnionProfile,
} from "@/lib/types";
import {
  Users,
  CreditCard,
  Bell,
  Droplet,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Download,
  PlusCircle,
  FileText,
  Search,
  Check,
  X,
  ExternalLink,
  Settings,
  Edit3,
  Trash2,
  Pin,
  RefreshCw,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Save,
  Send,
  MessageSquare,
  Lock,
  Unlock,
  Printer,
  Calendar,
  Layers,
  Landmark,
  Images,
  Video,
  Camera,
  FileDown,
  Upload,
  AlertTriangle,
  UserCheck,
  Award,
  ArrowLeft,
  Briefcase,
  Home,
  Compass,
  ChevronRight,
  UserPlus,
  PenTool,
  Clock,
  Eye,
  DollarSign,
  HeartHandshake,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    settings,
    updateSettings,
    notices,
    updateNotices,
    deleteNotice,
    toggleNoticeStatus,
    committee,
    updateCommittee,
    deleteCommitteeMember,
    members,
    updateMembers,
    pendingMembers,
    addOfflineMember,
    approveMember,
    rejectMember,
    blockMember,
    unblockMember,
    deleteMember,
    donors,
    updateDonors,
    bloodRequests,
    updateBloodRequests,
    welfareApplications,
    updateWelfareApplications,
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
    deleteEvent,
    gallery,
    updateGallery,
    addGalleryItem,
    deleteGalleryItem,
    smsLogs,
    sendSms,
  } = useSiteStore();

  // Navigation: "hub" is the Interactive Buttons Main Menu
  const [activeTab, setActiveTab] = useState<
    | "hub"
    | "home"
    | "about"
    | "constitution"
    | "committee"
    | "members"
    | "unions"
    | "events"
    | "gallery"
    | "notices"
    | "blood"
    | "welfare"
    | "payments"
    | "sms"
    | "signature"
  >("hub");

  const [searchQuery, setSearchQuery] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showBulkCardModal, setShowBulkCardModal] = useState(false);
  const [selectedCardMember, setSelectedCardMember] = useState<MemberProfile | null>(null);
  const [selectedDetailsMember, setSelectedDetailsMember] = useState<MemberProfile | null>(null);

  // 1. Settings state
  const [formSettings, setFormSettings] = useState(settings);

  // 2. Add Offline Member Modal state
  const [showAddOfflineModal, setShowAddOfflineModal] = useState(false);
  const [offlineForm, setOfflineForm] = useState({
    full_name: "",
    father_name: "",
    mother_name: "",
    date_of_birth: "1995-01-01",
    member_type: "general" as "general" | "lifetime" | "donor",
    permanent_union: "কিশোরগঞ্জ সদর" as KishoreganjUnion,
    permanent_village: "",
    present_dhaka_address: "",
    profession: "",
    workplace_designation: "",
    workplace_address: "",
    nid_number: "",
    blood_group: "B+" as any,
    phone: "",
    email: "",
    password: "kusd1234",
    fee_amount: 500,
    payment_method: "cash" as "cash" | "bkash" | "nagad" | "bank",
    receipt_no: "",
    photo_url: "",
    paper_form_url: "",
  });

  // 3. Constitution Clause state
  const [editingClauseId, setEditingClauseId] = useState<string | null>(null);
  const [clauseTitle, setClauseTitle] = useState("");
  const [clauseNumber, setClauseNumber] = useState("");
  const [clauseContent, setClauseContent] = useState("");
  const [constitutionPdf, setConstitutionPdf] = useState(
    settings.constitutionPdfUrl || "/docs/kusd_constitution_2026.pdf"
  );

  // 4. Committee CMS state
  const [committeeSubTab, setCommitteeSubTab] = useState<"executive" | "advisory">("executive");
  const [editingCommId, setEditingCommId] = useState<string | null>(null);
  const [newCommName, setNewCommName] = useState("");
  const [newCommDesignation, setNewCommDesignation] = useState("");
  const [newCommType, setNewCommType] = useState<"advisory" | "executive">("executive");
  const [newCommPhone, setNewCommPhone] = useState("");
  const [newCommUnion, setNewCommUnion] = useState<KishoreganjUnion>("কিশোরগঞ্জ সদর");
  const [newCommVillage, setNewCommVillage] = useState("");
  const [newCommTerm, setNewCommTerm] = useState("২০২৬-২০২৮");
  const [newCommBio, setNewCommBio] = useState("");
  const [newCommPhoto, setNewCommPhoto] = useState("/logo.png");

  // Member Quick Message Modal state
  const [messageTargetMember, setMessageTargetMember] = useState<MemberProfile | null>(null);
  const [individualMessageText, setIndividualMessageText] = useState("");

  // Union Parishad CMS State
  const [selectedUnionId, setSelectedUnionId] = useState<string>("u-1");
  const [newSpotName, setNewSpotName] = useState("");
  const [newSpotDesc, setNewSpotDesc] = useState("");
  const [newSpotImg, setNewSpotImg] = useState("");
  const [newSpotVideo, setNewSpotVideo] = useState("");
  const [editingWardNo, setEditingWardNo] = useState<number | null>(null);
  const [editingWardMemberName, setEditingWardMemberName] = useState("");
  const [editingWardMemberPhone, setEditingWardMemberPhone] = useState("");

  // 5. SMS Marketing state
  const [smsRecipientType, setSmsRecipientType] = useState<"all" | "union" | "individual">("all");
  const [smsTargetUnion, setSmsTargetUnion] = useState<KishoreganjUnion>("কিশোরগঞ্জ সদর");
  const [smsCustomPhone, setSmsCustomPhone] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [smsSentSuccess, setSmsSentSuccess] = useState(false);

  // 6. Notice CMS state
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [newNoticeTitle, setNewNoticeTitle] = useState("");
  const [newNoticeContent, setNewNoticeContent] = useState("");
  const [newNoticeCategory, setNewNoticeCategory] = useState<any>("general");
  const [newNoticePinned, setNewNoticePinned] = useState(false);

  // 7. Event CMS state
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventVenue, setNewEventVenue] = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");
  const [newEventStatus, setNewEventStatus] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const [newEventVideoUrl, setNewEventVideoUrl] = useState("");
  const [newEventNewsLink, setNewEventNewsLink] = useState("");
  const [newEventCaption, setNewEventCaption] = useState("");

  // 8. Gallery CMS state
  const [newGalleryTitle, setNewGalleryTitle] = useState("");
  const [newGalleryYear, setNewGalleryYear] = useState("২০২৬");
  const [newGalleryCategory, setNewGalleryCategory] = useState<any>("মিলনমেলা");
  const [newGalleryImgUrl, setNewGalleryImgUrl] = useState("");
  const [newGalleryVideoUrl, setNewGalleryVideoUrl] = useState("");
  const [newGalleryCaption, setNewGalleryCaption] = useState("");
  const [newGalleryNewsLink, setNewGalleryNewsLink] = useState("");

  // Welfare CMS filter state
  const [welfareCategoryFilter, setWelfareCategoryFilter] = useState<string>("all");

  // 9. Heritage CMS state
  const [newHeritageName, setNewHeritageName] = useState("");
  const [newHeritageLocation, setNewHeritageLocation] = useState("");
  const [newHeritageDesc, setNewHeritageDesc] = useState("");
  const [newHeritageImg, setNewHeritageImg] = useState("");
  const [newHeritageVideo, setNewHeritageVideo] = useState("");

  // ==========================================
  // FINANCIAL CALCULATIONS
  // ==========================================
  const onlineCollectedAmount = members
    .filter((m) => !m.is_offline_entry)
    .reduce((sum, m) => sum + (m.fee_amount || (m.member_type === "lifetime" ? 10000 : m.member_type === "donor" ? 50000 : 500)), 0);

  const offlineCollectedAmount = settings.offlineCollectedAmount || 45000;
  const totalCombinedFunds = onlineCollectedAmount + offlineCollectedAmount;

  // ==========================================
  // HANDLERS
  // ==========================================

  // Save Settings & General Secretary Signature
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...formSettings,
      constitutionPdfUrl: constitutionPdf,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Add Offline Member Handler
  const handleAddOfflineMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offlineForm.full_name || !offlineForm.phone) return;

    addOfflineMember({
      full_name: offlineForm.full_name,
      father_name: offlineForm.father_name,
      mother_name: offlineForm.mother_name,
      date_of_birth: offlineForm.date_of_birth,
      member_type: offlineForm.member_type,
      permanent_district: "নীলফামারী",
      permanent_upazila: "কিশোরগঞ্জ",
      permanent_union: offlineForm.permanent_union,
      permanent_village: offlineForm.permanent_village,
      present_dhaka_address: offlineForm.present_dhaka_address,
      profession: offlineForm.profession,
      workplace_designation: offlineForm.workplace_designation,
      workplace_address: offlineForm.workplace_address,
      nid_no: offlineForm.nid_number,
      blood_group: offlineForm.blood_group,
      phone: offlineForm.phone,
      email: offlineForm.email,
      password: offlineForm.password || "kusd1234",
      photo_url: offlineForm.photo_url || "/logo.png",
      paper_form_url: offlineForm.paper_form_url || undefined,
      payment_method: offlineForm.payment_method,
      fee_amount: Number(offlineForm.fee_amount),
      trx_id: offlineForm.receipt_no || `CASH-REC-${Date.now().toString().slice(-4)}`,
    });

    setShowAddOfflineModal(false);
    setOfflineForm({
      full_name: "",
      father_name: "",
      mother_name: "",
      date_of_birth: "1995-01-01",
      member_type: "general",
      permanent_union: "কিশোরগঞ্জ সদর",
      permanent_village: "",
      present_dhaka_address: "",
      profession: "",
      workplace_designation: "",
      workplace_address: "",
      nid_number: "",
      blood_group: "B+",
      phone: "",
      email: "",
      password: "kusd1234",
      fee_amount: 500,
      payment_method: "cash",
      receipt_no: "",
      photo_url: "",
      paper_form_url: "",
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Approve Member & Trigger Automatic Payment/Approval SMS
  const handleApprove = (id: string) => {
    approveMember(id);
  };

  // Reject Member
  const handleReject = (id: string) => {
    rejectMember(id);
  };

  // Constitution Clause Save
  const handleSaveClause = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clauseTitle || !clauseContent || !clauseNumber) return;

    if (editingClauseId) {
      const updated = clauses.map((c) =>
        c.id === editingClauseId
          ? { ...c, clause: clauseNumber, title: clauseTitle, content: clauseContent }
          : c
      );
      updateClauses(updated);
      setEditingClauseId(null);
    } else {
      const created: ConstitutionClause = {
        id: `cl-${Date.now()}`,
        clause: clauseNumber,
        title: clauseTitle,
        content: clauseContent,
        order_index: clauses.length + 1,
      };
      addClause(created);
    }

    setClauseNumber("");
    setClauseTitle("");
    setClauseContent("");
  };

  // Committee Member Save
  const handleSaveCommitteeMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommName || !newCommDesignation) return;

    if (editingCommId) {
      const updated = committee.map((m) =>
        m.id === editingCommId
          ? {
              ...m,
              name: newCommName,
              designation: newCommDesignation,
              committee_type: newCommType,
              phone: newCommPhone,
              union: newCommUnion,
              village: newCommVillage,
              term: newCommTerm,
              bio: newCommBio,
              photo_url: newCommPhoto,
            }
          : m
      );
      updateCommittee(updated);
      setEditingCommId(null);
    } else {
      const created: CommitteeMember = {
        id: `comm-${Date.now()}`,
        name: newCommName,
        designation: newCommDesignation,
        committee_type: newCommType,
        order_index: committee.length + 1,
        photo_url: newCommPhoto,
        phone: newCommPhone,
        union: newCommUnion,
        village: newCommVillage,
        term: newCommTerm,
        bio: newCommBio,
      };
      updateCommittee([created, ...committee]);
    }

    setNewCommName("");
    setNewCommDesignation("");
    setNewCommPhone("");
    setNewCommVillage("");
    setNewCommBio("");
  };

  // SMS Send Handler
  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsMessage) return;

    let targetCount = 0;
    let samplePhone = "";
    let targetLabel = "";

    if (smsRecipientType === "all") {
      targetCount = members.length;
      samplePhone = members[0]?.phone || "সকল নিবন্ধিত সদস্য";
      targetLabel = "সকল নিবন্ধিত সদস্য";
    } else if (smsRecipientType === "union") {
      const uMembers = members.filter((m) => m.permanent_union === smsTargetUnion);
      targetCount = uMembers.length || 1;
      samplePhone = uMembers[0]?.phone || "ইউনিয়ন সদস্যবৃন্দ";
      targetLabel = `${smsTargetUnion} ইউনিয়ন সদস্যবৃন্দ`;
    } else {
      targetCount = 1;
      samplePhone = smsCustomPhone || "নির্দিষ্ট মোবাইল";
      targetLabel = `একক সদস্য (${samplePhone})`;
    }

    sendSms({
      recipient_type: smsRecipientType,
      recipient_target: targetLabel,
      phone_count: targetCount,
      sample_phone: samplePhone,
      message: smsMessage,
    });

    setSmsSentSuccess(true);
    setSmsMessage("");
    setTimeout(() => setSmsSentSuccess(false), 3000);
  };

  // Notice Save
  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;

    if (editingNoticeId) {
      const updated = notices.map((n) =>
        n.id === editingNoticeId
          ? {
              ...n,
              title: newNoticeTitle,
              content: newNoticeContent,
              category: newNoticeCategory,
              is_pinned: newNoticePinned,
            }
          : n
      );
      updateNotices(updated);
      setEditingNoticeId(null);
    } else {
      const created: NoticeItem = {
        id: `not-${Date.now()}`,
        title: newNoticeTitle,
        slug: newNoticeTitle.toLowerCase().replace(/\s+/g, "-"),
        content: newNoticeContent,
        category: newNoticeCategory,
        is_pinned: newNoticePinned,
        published_date: new Date().toISOString().slice(0, 10),
        status: "active",
      };
      updateNotices([created, ...notices]);
    }

    setNewNoticeTitle("");
    setNewNoticeContent("");
    setNewNoticePinned(false);
  };

  // Event Save
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate) return;

    const created: EventItem = {
      id: `ev-${Date.now()}`,
      title: newEventTitle,
      date: newEventDate,
      time: "সকাল ১০:০০",
      venue: newEventVenue || "ঢাকা",
      description: newEventDesc,
      status: newEventStatus,
      year: newEventDate.includes("২০২৫") ? "২০২৫" : "২০২৬",
      video_url: newEventVideoUrl || undefined,
      news_link: newEventNewsLink || undefined,
      caption: newEventCaption || undefined,
    };
    updateEvents([created, ...events]);
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventVenue("");
    setNewEventDesc("");
    setNewEventVideoUrl("");
    setNewEventNewsLink("");
    setNewEventCaption("");
  };

  // Heritage Save
  const handleSaveHeritage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeritageName) return;

    const created: HeritageItem = {
      id: `her-${Date.now()}`,
      title: newHeritageName,
      union: "সার্বিক",
      description: newHeritageDesc || "ঐতিহাসিক নিদর্শন ও লোকসংস্কৃতি",
      image_url: newHeritageImg || "/logo.png",
      video_url: newHeritageVideo || undefined,
      category: "ঐতিহাসিক নিদর্শন",
    };
    updateHeritageItems([created, ...heritageItems]);
    setNewHeritageName("");
    setNewHeritageLocation("");
    setNewHeritageDesc("");
    setNewHeritageImg("");
    setNewHeritageVideo("");
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Gallery Item Save
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryImgUrl) return;

    const created: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newGalleryTitle,
      event_year: newGalleryYear || "২০২৬",
      category: newGalleryCategory,
      image_url: newGalleryImgUrl,
      video_url: newGalleryVideoUrl || undefined,
      caption: newGalleryCaption || undefined,
      news_link: newGalleryNewsLink || undefined,
      date: new Date().toISOString().slice(0, 10),
    };
    addGalleryItem(created);
    setNewGalleryTitle("");
    setNewGalleryImgUrl("");
    setNewGalleryVideoUrl("");
    setNewGalleryCaption("");
    setNewGalleryNewsLink("");
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Union Parishad Management Handlers
  const handleUpdateUnionInfo = (unionId: string, updatedFields: Partial<UnionProfile>) => {
    const updated = unionProfiles.map((u) => {
      if (u.id === unionId || u.name === unionId) {
        return { ...u, ...updatedFields };
      }
      return u;
    });
    updateUnionProfiles(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleUpdateWardMember = (unionId: string, wardNo: number, name: string, phone: string) => {
    const updated = unionProfiles.map((u) => {
      if (u.id === unionId || u.name === unionId) {
        const membersList = [...(u.ward_members || [])];
        const existingIdx = membersList.findIndex((m) => m.ward_no === wardNo);
        if (existingIdx >= 0) {
          membersList[existingIdx] = { ward_no: wardNo, name, phone };
        } else {
          membersList.push({ ward_no: wardNo, name, phone });
          membersList.sort((a, b) => a.ward_no - b.ward_no);
        }
        return { ...u, ward_members: membersList };
      }
      return u;
    });
    updateUnionProfiles(updated);
    setEditingWardNo(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddTouristSpot = (unionId: string) => {
    if (!newSpotName.trim()) return;
    const updated = unionProfiles.map((u) => {
      if (u.id === unionId || u.name === unionId) {
        const spots = u.tourist_spots ? [...u.tourist_spots] : [];
        spots.push({
          name: newSpotName.trim(),
          description: newSpotDesc.trim() || "ঐতিহাসিক দর্শনীয় স্থান",
          image_url: newSpotImg || "/logo.png",
          video_url: newSpotVideo || undefined,
        });
        return { ...u, tourist_spots: spots };
      }
      return u;
    });
    updateUnionProfiles(updated);
    setNewSpotName("");
    setNewSpotDesc("");
    setNewSpotImg("");
    setNewSpotVideo("");
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteTouristSpot = (unionId: string, spotIndex: number) => {
    const updated = unionProfiles.map((u) => {
      if (u.id === unionId || u.name === unionId) {
        const spots = u.tourist_spots ? u.tourist_spots.filter((_, idx) => idx !== spotIndex) : [];
        return { ...u, tourist_spots: spots };
      }
      return u;
    });
    updateUnionProfiles(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAF9] font-bangla text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. Top Admin Header Bar */}
        <div className="bg-[#07261B] text-white rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 border border-emerald-900/40">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden ring-4 ring-[#FBBF24] p-1 bg-white shadow-md shrink-0">
              <Image src="/logo.png" alt="সমিতি লোগো" fill className="object-contain" priority />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#FBBF24] uppercase tracking-wider block">
                অফিসিয়াল প্রশাসনিক হাব ও এন্টারপ্রাইজ ম্যানেজমেন্ট
              </span>
              <h1 className="text-xl sm:text-2xl font-black">
                {settings.heroHeadline}
              </h1>
              <p className="text-emerald-200/80 text-xs">
                কিশোরগঞ্জ উপজেলা (নীলফামারী) সমিতি, ঢাকা
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold border border-white/20 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>এসএমএস ব্যালেন্স: <strong>{settings.smsBalance || 4850}</strong> টি</span>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-xs font-bold bg-[#FBBF24] text-[#07261B] hover:bg-[#F59E0B] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>মূল সাইট দেখুন</span>
            </Link>
          </div>
        </div>

        {/* 2. Top Metric Counters (Visible in All Views) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07261B] flex items-center justify-center mb-2.5">
              <Users className="w-5 h-5 text-emerald-700" />
            </div>
            <span className="text-[11px] text-slate-500 block">মোট অনুমোদিত সদস্য</span>
            <span className="text-xl sm:text-2xl font-black text-[#07261B]">{members.length} জন</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] text-slate-500 block">অপেক্ষমাণ পেমেন্ট যাচাই</span>
            <span className="text-xl sm:text-2xl font-black text-amber-600">{pendingMembers.length} টি</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-green-50 text-emerald-700 flex items-center justify-center mb-2.5">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[11px] text-slate-500 block">মোট সংগৃহীত তহবিল</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-800">
              ৳ {totalCombinedFunds.toLocaleString("bn-BD")}/-
            </span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#DC2626] flex items-center justify-center mb-2.5">
              <Droplet className="w-5 h-5 fill-rose-600" />
            </div>
            <span className="text-[11px] text-slate-500 block">রক্তের আবেদন ও ডোনার</span>
            <span className="text-xl sm:text-2xl font-black text-[#DC2626]">
              {bloodRequests.length} / {donors.length}
            </span>
          </div>
        </div>

        {/* ============================================================
            MAIN VIEW: INTERACTIVE BUTTON HUB (Hub-and-Spoke Grid)
            ============================================================ */}
        {activeTab === "hub" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 border-b pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1 border border-emerald-200">
                    <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
                    প্রধান নিয়ন্ত্রণ প্যানেল (Hub Menu)
                  </div>
                  <h2 className="text-2xl font-black text-[#07261B]">
                    অ্যাডমিন ম্যানেজমেন্ট মডিউলসমূহ
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    যেকোনো নির্দিষ্ট মডিউলে প্রবেশ করতে নিচের সংশ্লিষ্ট বাটনে ক্লিক করুন।
                  </p>
                </div>

                <button
                  onClick={() => setShowAddOfflineModal(true)}
                  className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#FBBF24] text-[#07261B] hover:bg-[#F59E0B] shadow-md transition-all flex items-center gap-2 active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>+ অফলাইন সদস্য এন্ট্রি</span>
                </button>
              </div>

              {/* 14 Interactive Navigation Cards Matching Website Navigation Exactly */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <h3 className="text-sm font-bold text-[#07261B] uppercase tracking-wide">
                      ওয়েবসাইট নেভিগেশন মেনু সিএমএস (Website Menu CMS — যা ওয়েবসাইটে প্রদর্শিত হয়)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        id: "home",
                        title: "হোম পেজ ও ব্যানার সিএমএস",
                        desc: "সাইট টাইটেল, স্লোগান, সাব-হেডলাইন, পরিসংখ্যান (সদস্য, ইউনিয়ন, কার্যনির্বাহী, ডোনার) ও টপ রানিং টিকার।",
                        badge: "মূল হোমপেজ",
                        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
                        icon: Home,
                        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
                      },
                      {
                        id: "about",
                        title: "আমাদের সম্পর্কে সিএমএস",
                        desc: "সমিতির পটভূমি, মূল শিরোনাম, লক্ষ্য পরিচিতি এবং নীলফামারীর ঐতিহাসিক নিদর্শন ও কাহিনীর সম্পূর্ণ CRUD।",
                        badge: `${heritageItems.length} নিদর্শন`,
                        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
                        icon: Compass,
                        color: "bg-amber-50 text-amber-700 border-amber-200",
                      },
                      {
                        id: "constitution",
                        title: "গঠনতন্ত্র সিএমএস ও PDF",
                        desc: "সরাসরি গঠনতন্ত্রের PDF ফাইল লিংক/আপলোড এবং ধারা ১ থেকে ৩৫+ পূর্ণাঙ্গ CRUD পরিচালনা।",
                        badge: `${clauses.length} ধারা`,
                        badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-300",
                        icon: FileText,
                        color: "bg-indigo-50 text-indigo-700 border-indigo-200",
                      },
                      {
                        id: "committee",
                        title: "কমিটি ও উপদেষ্টা পরিষদ",
                        desc: "কার্যনির্বাহী পরিষদ (৫১ জন) ও উপদেষ্টা পরিষদ (১৫ জন) আলাদা ম্যানেজমেন্ট, ছবি আপলোড, পদবি, ফোন, বায়ো।",
                        badge: `${committee.length} নেতা`,
                        badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
                        icon: ShieldCheck,
                        color: "bg-blue-50 text-blue-700 border-blue-200",
                      },
                      {
                        id: "members",
                        title: "সদস্য ডিরেক্টরি ও কন্ট্রোল",
                        desc: "সদস্যদের পূর্ণাঙ্গ তথ্য ভিউ ও প্রিন্ট/ডাউনলোড, একক সদস্যকে সরাসরি SMS প্রেরণ, ডিজিটাল আইডি কার্ড, অফলাইন এন্ট্রি।",
                        badge: `${members.length} সদস্য`,
                        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
                        icon: Users,
                        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
                      },
                      {
                        id: "unions",
                        title: "ইউনিয়ন পরিষদ ও প্রতিনিধি",
                        desc: "কিশোরগঞ্জের ৯টি ইউনিয়নের চেয়ারম্যান ও ১-৯ ওয়ার্ডের সকল মেম্বারদের নাম-ফোন, বায়ো এবং দর্শনীয় স্থানের ছবি-ভিডিও।",
                        badge: "৯টি ইউনিয়ন",
                        badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
                        icon: Landmark,
                        color: "bg-teal-50 text-teal-700 border-teal-200",
                      },
                      {
                        id: "events",
                        title: "অনুষ্ঠান ও বার্ষিক ক্যালেন্ডার",
                        desc: "সমিতির বার্ষিক রুটিন তৈরি, আসন্ন ও সম্পন্ন ইভেন্ট, তারিখ, সময়, ভেন্যু এবং ভিডিও ও নিউজ লিংক সংযুক্তি।",
                        badge: `${events.length} ইভেন্ট`,
                        badgeColor: "bg-rose-100 text-rose-900 border-rose-300",
                        icon: Calendar,
                        color: "bg-rose-50 text-rose-700 border-rose-200",
                      },
                      {
                        id: "gallery",
                        title: "ফটো ও ভিডিও গ্যালারি সিএমএস",
                        desc: "মিলনমেলা, শিক্ষা, বনভোজন, ব্লাড ব্যাংক, সভা ও ঐতিহ্যের স্মরণীয় ছবি ও ভিডিও আপলোড এবং আর্কাইভ কন্ট্রোল।",
                        badge: `${gallery.length} মিডিয়া`,
                        badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
                        icon: Images,
                        color: "bg-purple-50 text-purple-700 border-purple-200",
                      },
                      {
                        id: "notices",
                        title: "বিজ্ঞপ্তি ও নোটিশ সিএমএস",
                        desc: "অফিসিয়াল নোটিশ প্রকাশ, ক্যাটাগরি, হোমপেজ টপ পিন টু টপ এবং সক্রিয়/আর্কাইভ স্ট্যাটাস পরিবর্তন।",
                        badge: `${notices.length} নোটিশ`,
                        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
                        icon: Bell,
                        color: "bg-amber-50 text-amber-700 border-amber-200",
                      },
                      {
                        id: "blood",
                        title: "ব্লাড ব্যাংক ও ডোনার সিএমএস",
                        desc: "জরুরি রক্তদাতা ডাটাবেজ পরিচালনা, রক্তের গ্রুপ ও এলাকা অনুযায়ী ফিল্টার, এবং জরুরি ব্লাড রিকুয়েস্ট স্ট্যাটাস।",
                        badge: `${donors.length} ডোনার`,
                        badgeColor: "bg-rose-100 text-rose-900 border-rose-300",
                        icon: Droplet,
                        color: "bg-rose-50 text-rose-700 border-rose-200",
                      },
                      {
                        id: "welfare",
                        title: "কল্যাণ ও চিকিৎসা সহায়তা",
                        desc: "মেধা বৃত্তি, জরুরি চিকিৎসা অনুদান ও আপৎকালীন ত্রাণের আবেদনসমূহ পর্যালোচনা, অনুমোদন ও বিতরণ স্ট্যাটাস।",
                        badge: `${welfareApplications.length} আবেদন`,
                        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
                        icon: HeartHandshake,
                        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setActiveTab(item.id as any)}
                          className="group bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${item.color}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                                {item.badge}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-[#07261B] group-hover:text-emerald-700 transition-colors mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                              {item.desc}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-[#FBBF24]">
                            <span>সিএমএস খুলুন</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <h3 className="text-sm font-bold text-[#07261B] uppercase tracking-wide">
                      প্রশাসন, অর্থ ও অথরিটি টুলস (Admin & Authority Operations)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        id: "payments",
                        title: "পেমেন্ট ভেরিফিকেশন ও চাঁদা হিসাব",
                        desc: "অনলাইন TrxID যাচাই ও অনুমোদন, মানি রসিদ ভাউচার তৈরি ও PDF ডাউনলোড, অফলাইন/অনলাইন মোট তহবিলের লাইভ হিসাব।",
                        badge: `${pendingMembers.length} অপেক্ষমাণ`,
                        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
                        icon: CreditCard,
                        color: "bg-amber-50 text-amber-700 border-amber-200",
                      },
                      {
                        id: "sms",
                        title: "এসএমএস মার্কেটিং ও নোটিফিকেশন",
                        desc: "সকল সদস্য, নির্দিষ্ট ইউনিয়নভিত্তিক অথবা একক নাম্বারে লাইভ SMS API গেটওয়ে দিয়ে সরাসরি বাল্ক ও ব্যক্তিগত বার্তা প্রেরণ।",
                        badge: `${settings.smsBalance || 4850} ব্যালেন্স`,
                        badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
                        icon: MessageSquare,
                        color: "bg-teal-50 text-teal-700 border-teal-200",
                      },
                      {
                        id: "signature",
                        title: "সাধারণ সম্পাদকের স্বাক্ষর ও সাইট সেটিংস",
                        desc: "আইডি কার্ড ও মানি রসিদে ব্যবহারের জন্য ডিভাইস থেকে সাধারণ সম্পাদকের অফিশিয়াল স্বাক্ষর আপলোড এবং কার্যালয় ঠিকানা।",
                        badge: "স্বাক্ষর ও ঠিকানা",
                        badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
                        icon: PenTool,
                        color: "bg-purple-50 text-purple-700 border-purple-200",
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setActiveTab(item.id as any)}
                          className="group bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${item.color}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                                {item.badge}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-[#07261B] group-hover:text-emerald-700 transition-colors mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                              {item.desc}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-[#FBBF24]">
                            <span>পরিচালনা করুন</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL TOP BAR (Visible when activeTab !== "hub")
            Contains the required "← প্রধান মেনু (Home Menu)" Button
            ============================================================ */}
        {activeTab !== "hub" && (
          <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("hub")}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-sm transition-all flex items-center gap-2 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#FBBF24]" />
                <span>← প্রধান মেনু (Home Menu)</span>
              </button>

              <div className="text-xs text-slate-500 hidden md:block">
                <span>প্রধান মেনু / </span>
                <strong className="text-[#07261B]">
                  {activeTab === "home"
                    ? "হোম পেজ ও ব্যানার সিএমএস"
                    : activeTab === "about"
                    ? "আমাদের সম্পর্কে ও ঐতিহ্য সিএমএস"
                    : activeTab === "constitution"
                    ? "গঠনতন্ত্র সিএমএস"
                    : activeTab === "committee"
                    ? "কমিটি ও উপদেষ্টা পরিষদ"
                    : activeTab === "members"
                    ? "সদস্য ডিরেক্টরি ও কন্ট্রোল"
                    : activeTab === "unions"
                    ? "ইউনিয়ন পরিষদ ও প্রতিনিধি"
                    : activeTab === "events"
                    ? "অনুষ্ঠান ও বাৎসরিক ক্যালেন্ডার সিএমএস"
                    : activeTab === "gallery"
                    ? "ফটো ও ভিডিও গ্যালারি সিএমএস"
                    : activeTab === "notices"
                    ? "বিজ্ঞপ্তি ও নোটিশ সিএমএস"
                    : activeTab === "blood"
                    ? "ব্লাড ব্যাংক ও ডোনার সিএমএস"
                    : activeTab === "welfare"
                    ? "কল্যাণ ও চিকিৎসা সহায়তা তহবিল"
                    : activeTab === "payments"
                    ? "পেমেন্ট ভেরিফিকেশন ও চাঁদা হিসাব"
                    : activeTab === "sms"
                    ? "এসএমএস মার্কেটিং ও নোটিফিকেশন"
                    : "সাধারণ সম্পাদকের স্বাক্ষর ও সাইট সেটিংস"}
                </strong>
              </div>
            </div>

            {/* Quick Actions in Top Bar */}
            <div className="flex items-center gap-2">
              {activeTab === "members" && (
                <button
                  onClick={() => setShowAddOfflineModal(true)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#FBBF24] text-[#07261B] hover:bg-[#F59E0B] shadow-sm flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ অফলাইন সদস্য</span>
                </button>
              )}
              {activeTab === "payments" && (
                <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  মোট তহবিল: ৳ {totalCombinedFunds.toLocaleString("bn-BD")}/-
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 1: সদস্য ডিরেক্টরি ও কন্ট্রোল
            ============================================================ */}
        {activeTab === "members" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#07261B]">
                    নিবন্ধিত সদস্য ব্যবস্থাপনা ও ডিরেক্টরি কন্ট্রোল
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    সদস্যদের প্রোফাইল দেখা, ব্লক/আনব্লক, স্থায়ী রিমুভ এবং ডিজিটাল স্মার্ট আইডি কার্ড প্রিন্ট/ডাউনলোড।
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setShowAddOfflineModal(true)}
                    className="px-4 py-2 rounded-2xl text-xs font-bold bg-[#FBBF24] text-[#07261B] hover:bg-[#F59E0B] shadow-sm transition-all flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ অফলাইন সদস্য এন্ট্রি</span>
                  </button>
                  <button
                    onClick={() => setShowBulkCardModal(true)}
                    className="px-4 py-2 rounded-2xl text-xs font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-sm transition-all flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4 text-[#FBBF24]" />
                    <span>সকল কার্ড বাল্ক ডাউনলোড</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="নাম, সদস্য নম্বর, ফোন বা ইউনিয়ন দিয়ে সদস্য খুঁজুন..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:border-[#07261B] outline-none"
                />
              </div>

              {/* Members Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                      <th className="py-3 px-4 rounded-l-xl">আইডি নং</th>
                      <th className="py-3 px-4">নাম ও রক্তের গ্রুপ</th>
                      <th className="py-3 px-4">ইউনিয়ন ও পেশা</th>
                      <th className="py-3 px-4">মোবাইল</th>
                      <th className="py-3 px-4">ক্যাটাগরি ও মোড</th>
                      <th className="py-3 px-4">স্ট্যাটাস</th>
                      <th className="py-3 px-4 text-right rounded-r-xl">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {members
                      .filter(
                        (m) =>
                          m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.member_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.permanent_union.includes(searchQuery) ||
                          m.phone.includes(searchQuery)
                      )
                      .map((member) => (
                        <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#07261B]">
                            {member.member_no}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => setSelectedDetailsMember(member)}
                              className="font-bold text-slate-800 hover:text-emerald-700 hover:underline text-left block transition-colors"
                              title="সদস্যের সকল বিস্তারিত তথ্য ও ভর্তি ফর্ম দেখুন"
                            >
                              {member.full_name}
                            </button>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200 inline-block mt-0.5">
                              রক্ত: {member.blood_group}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-slate-700">{member.permanent_union}</div>
                            <div className="text-[11px] text-slate-400">{member.profession}</div>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700">{member.phone}</td>
                          <td className="py-3 px-4">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 block w-fit">
                              {member.member_type === "lifetime"
                                ? "আজীবন সদস্য"
                                : member.member_type === "donor"
                                ? "দাতা সদস্য"
                                : "সাধারণ সদস্য"}
                            </span>
                            {member.is_offline_entry && (
                              <span className="text-[10px] text-amber-700 font-bold mt-0.5 block">
                                • অফলাইন এন্ট্রি
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {member.is_blocked ? (
                              <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                                স্থগিত (Blocked)
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                                সক্রিয় (Active)
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedDetailsMember(member)}
                                className="p-1.5 rounded-lg bg-emerald-100/70 text-emerald-900 hover:bg-emerald-200 transition-colors"
                                title="সদস্যের পূর্ণাঙ্গ প্রোফাইল তথ্য দেখুন ও ডাউনলোড করুন"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => setSelectedCardMember(member)}
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                                title="ডিজিটাল স্মার্ট আইডি কার্ড দেখুন"
                              >
                                <Printer className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => {
                                  setMessageTargetMember(member);
                                  setIndividualMessageText(
                                    `স্বাগত ${member.full_name}! কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা-তে আপনাকে স্বাগতম। আপনার সদস্য আইডি নং: ${member.member_no || "KSD-XXX"}। লগইন করুন: kusd.org.bd/login`
                                  );
                                }}
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                title="মেসেজ / এসএমএস পাঠান"
                              >
                                <Send className="w-4 h-4" />
                              </button>

                              {member.is_blocked ? (
                                <button
                                  onClick={() => unblockMember(member.id)}
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                                  title="আনব্লক করুন"
                                >
                                  <Unlock className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => blockMember(member.id)}
                                  className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                                  title="ব্লক করুন (লগইন স্থগিত)"
                                >
                                  <Lock className="w-4 h-4" />
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  if (confirm(`আপনি কি নিশ্চিতভাবে ${member.full_name}-কে ডিলিট করতে চান?`)) {
                                    deleteMember(member.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                                title="স্থায়ীভাবে ডিলিট করুন"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 2: পেমেন্ট ভেরিফিকেশন ও আর্থিক হিসাব
            ============================================================ */}
        {activeTab === "payments" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Live Financial Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  অনলাইন সদস্য ফি আদায়
                </span>
                <div className="text-2xl font-black text-emerald-800">
                  ৳ {onlineCollectedAmount.toLocaleString("bn-BD")}/-
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  বিকাশ/নগদ/রকেট ভেরিফাইড
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  অফলাইন ক্যাশ ফি আদায় (অফিস)
                </span>
                <div className="text-2xl font-black text-amber-700">
                  ৳ {offlineCollectedAmount.toLocaleString("bn-BD")}/-
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  ম্যানুয়াল রসিদ ও ফর্ম
                </span>
              </div>

              <div className="bg-gradient-to-br from-[#07261B] to-[#0c402e] text-white p-6 rounded-3xl shadow-md border border-emerald-900/40">
                <span className="text-xs font-semibold text-emerald-200 block mb-1">
                  সর্বমোট সংগৃহীত সদস্য তহবিল
                </span>
                <div className="text-3xl font-black text-[#FBBF24]">
                  ৳ {totalCombinedFunds.toLocaleString("bn-BD")}/-
                </div>
                <span className="text-[11px] text-emerald-200/70 mt-1 block">
                  অনলাইন + অফলাইন তহবিলের লাইভ যোগফল
                </span>
              </div>
            </div>

            {/* Pending Verifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-[#07261B]">
                  ১. অপেক্ষমাণ আবেদন ও পেমেন্ট যাচাই ({pendingMembers.length} টি)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  নিবন্ধনের সময় প্রদেয় ফি (বিকাশ, নগদ ট্রানজেকশন আইডি / TrxID) যাচাই করুন। ভেরিফাই করলেই সদস্যের মোবাইলে স্বয়ংক্রিয় কনফার্মেশন ও মেম্বার আইডি এসএমএস যাবে।
                </p>
              </div>

              {pendingMembers.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-slate-700">কোনো অপেক্ষমাণ পেমেন্ট বা আবেদন নেই</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    সকল আবেদন সফলভাবে যাচাই ও অনুমোদন করা হয়েছে।
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {pendingMembers.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="border border-slate-200 rounded-3xl p-5 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            যাচাইয়ের অপেক্ষায়
                          </span>
                          <h4 className="text-base font-bold text-slate-800 mt-1">
                            {applicant.full_name}
                          </h4>
                          <p className="text-xs text-slate-500">
                            পিতা: {applicant.father_name} | স্থায়ী: {applicant.permanent_union}
                          </p>
                        </div>

                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                          {applicant.member_type === "lifetime" ? "আজীবন (১০,০০০৳)" : "সাধারণ (৫০০৳)"}
                        </span>
                      </div>

                      {/* Payment Box */}
                      <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-slate-600">মেথড:</span>
                          <span className="uppercase font-bold text-[#07261B]">
                            {applicant.payment_method || "bKash"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">TrxID:</span>
                          <span className="font-mono font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                            {applicant.trx_id || "BKSH12345678"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">ফি:</span>
                          <span className="font-bold text-slate-800">
                            ৳ {applicant.fee_amount || 500}/-
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600">
                        <strong>মোবাইল:</strong> <span className="font-mono">{applicant.phone}</span> | <strong>পেশা:</strong> {applicant.profession}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleApprove(applicant.id)}
                          className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5 text-[#FBBF24]" />
                          <span>Approve করুন (SMS যাবে)</span>
                        </button>
                        <button
                          onClick={() => handleReject(applicant.id)}
                          className="px-3 py-2 rounded-xl text-xs font-semibold border border-rose-300 text-rose-600 hover:bg-rose-50"
                        >
                          বাতিল
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dedicated Approved Members Payment Audit Table */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-lg font-bold text-[#07261B] mb-1">
                  ২. অনুমোদিত সদস্য পেমেন্ট অডিট তালিকা ({members.length} জন)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  যাদের পেমেন্ট যাচাই করে মেম্বারশিপ দেওয়া হয়েছে তাদের বিবরণ ও টাকার হিসাব
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-600 font-semibold bg-slate-50">
                        <th className="py-2.5 px-3">আইডি</th>
                        <th className="py-2.5 px-3">সদস্যের নাম</th>
                        <th className="py-2.5 px-3">ক্যাটাগরি</th>
                        <th className="py-2.5 px-3">পদ্ধতি ও TrxID</th>
                        <th className="py-2.5 px-3">জমা ফি (৳)</th>
                        <th className="py-2.5 px-3">মোবাইল</th>
                        <th className="py-2.5 px-3">অনুমোদনের তারিখ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {members.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono font-bold text-[#07261B]">{m.member_no}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-800">{m.full_name}</td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                              {m.member_type === "lifetime" ? "আজীবন" : m.member_type === "donor" ? "দাতা" : "সাধারণ"}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600 text-[11px]">
                            {m.payment_method || (m.is_offline_entry ? "ক্যাশ" : "bKash")} - {m.trx_id || "TRX-DONE"}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-emerald-800">
                            ৳ {m.fee_amount || (m.member_type === "lifetime" ? 10000 : 500)}/-
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">{m.phone}</td>
                          <td className="py-2.5 px-3 text-slate-500 text-[11px]">{m.approved_at || "২০২৬-০১-১৫"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 3: সাধারণ সম্পাদকের স্বাক্ষর ও আইডি কার্ড সেটিংস
            ============================================================ */}
        {activeTab === "signature" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold text-[#07261B]">
                ডিজিটাল আইডি কার্ড ও সাধারণ সম্পাদকের অফিশিয়াল স্বাক্ষর সেটিংস
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                প্রত্যেক সদস্যের ডিজিটাল আইডি কার্ডে স্বয়ংক্রিয়ভাবে কিউআর কোড এবং সাধারণ সম্পাদকের স্বাক্ষর প্রদর্শিত হয়। এখান থেকে সম্পাদকের নাম ও স্বাক্ষর ইমেজ কনফিগার করুন।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Form */}
              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    বর্তমান সাধারণ সম্পাদকের নাম:
                  </label>
                  <input
                    type="text"
                    value={formSettings.generalSecretaryName || ""}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, generalSecretaryName: e.target.value })
                    }
                    placeholder="যেমন: মো. গোলাম মোস্তফা"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-[#07261B]"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    অফিশিয়াল স্বাক্ষর ছবি আপলোড (ল্যাপটপ বা মোবাইল থেকে):
                  </label>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold transition-all shadow-xs">
                      <Upload className="w-4 h-4 text-emerald-700" />
                      <span>📸 কম্পিউটার / মোবাইল থেকে স্বাক্ষর আপলোড করুন</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormSettings({
                              ...formSettings,
                              generalSecretarySignatureUrl: reader.result as string,
                            });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>

                    {formSettings.generalSecretarySignatureUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormSettings({ ...formSettings, generalSecretarySignatureUrl: "" })
                        }
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                      >
                        ✕ স্বাক্ষর মুছে ফেলুন
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={formSettings.generalSecretarySignatureUrl || ""}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, generalSecretarySignatureUrl: e.target.value })
                    }
                    placeholder="অথবা সরাসরি ইমেজ লিংক বা পাথ লিখুন (/signatures/gs.png)"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    (মোবাইল বা ল্যাপটপ থেকে ছবি তুলুন বা গ্যালারি থেকে সিলেক্ট করুন। ফাঁকা রাখলে স্বয়ংক্রিয় ক্যালিগ্রাফিক স্বাক্ষর প্রদর্শিত হবে)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                  <strong>💡 কীভাবে কাজ করে?</strong>
                  <p className="mt-0.5">
                    এই স্বাক্ষরটি সকল সদস্যের ডাউনলোডযোগ্য ডিজিটাল আইডি কার্ডের নিচের ডান কোণে “সাধারণ সম্পাদক” পদের ওপরে প্রিন্ট হবে।
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center gap-2 active:scale-95"
                >
                  <Save className="w-4 h-4 text-[#FBBF24]" />
                  <span>স্বাক্ষর সেটিংস সংরক্ষণ করুন</span>
                </button>
              </form>

              {/* Live Preview Box */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-slate-500 mb-4 block uppercase tracking-wider">
                  কার্ডে স্বাক্ষরের লাইভ প্রিভিউ:
                </span>

                <div className="w-64 bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex flex-col items-center">
                  <div className="h-14 flex items-center justify-center">
                    {formSettings.generalSecretarySignatureUrl ? (
                      <div className="flex items-center justify-center h-12">
                        <img
                          src={formSettings.generalSecretarySignatureUrl}
                          alt="স্বাক্ষর"
                          className="max-h-12 max-w-[150px] object-contain border-b border-slate-400"
                        />
                      </div>
                    ) : (
                      <span className="font-serif italic font-black text-xl text-[#07261B] tracking-wider border-b-2 border-slate-700 pb-0.5">
                        {formSettings.generalSecretaryName || "G. Mostafa"}
                      </span>
                    )}
                  </div>
                  <div className="w-32 border-t border-slate-700 my-1"></div>
                  <span className="text-xs font-bold text-[#07261B]">
                    {formSettings.generalSecretaryName || "মো. গোলাম মোস্তফা"}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    সাধারণ সম্পাদক
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 4: গঠনতন্ত্র সিএমএস ও PDF
            ============================================================ */}
        {activeTab === "constitution" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* PDF Upload / Link Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#07261B]">
                    ১. সম্পূর্ণ গঠনতন্ত্রের PDF ফাইল ম্যানেজমেন্ট
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    অফিশিয়াল গঠনতন্ত্রের সম্পূর্ণ PDF ফাইল কম্পিউটারের ড্রাইভ থেকে নির্বাচন করুন বা ডাউনলোড লিঙ্ক আপডেট করুন।
                  </p>
                </div>

                <a
                  href={constitutionPdf}
                  download="kusd_constitution_2026.pdf"
                  className="px-4 py-2 rounded-2xl text-xs font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-sm flex items-center gap-2"
                >
                  <FileDown className="w-4 h-4 text-[#FBBF24]" />
                  <span>বর্তমান PDF ডাউনলোড</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    কম্পিউটার থেকে PDF ফাইল আপলোড:
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setConstitutionPdf(`/docs/${e.target.files[0].name}`);
                        setSaveSuccess(true);
                        setTimeout(() => setSaveSuccess(false), 2500);
                      }
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#07261B] file:text-[#FBBF24]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    অথবা সরাসরি PDF ফাইলের URL / পাথ:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={constitutionPdf}
                      onChange={(e) => setConstitutionPdf(e.target.value)}
                      className="flex-1 p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                    />
                    <button
                      onClick={handleSaveSettings}
                      className="px-4 py-2 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl"
                    >
                      সেভ
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles 1 to 35 CRUD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add / Edit Clause Form */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-[#07261B] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#FBBF24]" />
                  <span>{editingClauseId ? "ধারা সম্পাদনা করুন" : "নতুন ধারা যোগ করুন"}</span>
                </h4>

                <form onSubmit={handleSaveClause} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ধারার ক্রম / নং:</label>
                    <input
                      type="text"
                      value={clauseNumber}
                      onChange={(e) => setClauseNumber(e.target.value)}
                      placeholder="যেমন: ধারা ১ অথবা ধারা ৩৫"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ধারার শিরোনাম:</label>
                    <input
                      type="text"
                      value={clauseTitle}
                      onChange={(e) => setClauseTitle(e.target.value)}
                      placeholder="যেমন: সংগঠনের নাম ও কার্যক্ষেত্র"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ধারার পূর্ণাঙ্গ বিবরণ:</label>
                    <textarea
                      rows={6}
                      value={clauseContent}
                      onChange={(e) => setClauseContent(e.target.value)}
                      placeholder="ধারার বিস্তারিত নিয়মাবলি..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 leading-relaxed"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl shadow-sm hover:bg-[#0c402e]"
                    >
                      {editingClauseId ? "আপডেট করুন" : "ধারা যোগ করুন"}
                    </button>
                    {editingClauseId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingClauseId(null);
                          setClauseNumber("");
                          setClauseTitle("");
                          setClauseContent("");
                        }}
                        className="px-3 py-2.5 border border-slate-200 rounded-xl"
                      >
                        বাতিল
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Clause List (Articles 1 to 35) */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h4 className="font-bold text-base text-[#07261B]">
                    গঠনতন্ত্রের ধারা তালিকা ({clauses.length} টি ধারা)
                  </h4>
                  <span className="text-xs text-slate-500 font-semibold">ধারা ১ থেকে ৩৫+</span>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {clauses.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500/50 bg-slate-50/50 hover:bg-white transition-all space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                            {c.clause}
                          </span>
                          <h5 className="font-bold text-sm text-slate-800 mt-1">{c.title}</h5>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingClauseId(c.id);
                              setClauseNumber(c.clause);
                              setClauseTitle(c.title);
                              setClauseContent(c.content);
                            }}
                            className="p-1.5 text-slate-500 hover:text-emerald-700"
                            title="সম্পাদনা"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteClause(c.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                            title="মুছুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {c.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 5: কমিটি ও উপদেষ্টা পরিষদ ম্যানেজমেন্ট
            ============================================================ */}
        {activeTab === "committee" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top Sub-Tab Switcher for Committee vs Advisory */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setCommitteeSubTab("executive");
                    setNewCommType("executive");
                    setEditingCommId(null);
                  }}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    committeeSubTab === "executive"
                      ? "bg-[#07261B] text-[#FBBF24] shadow-md ring-2 ring-emerald-500/30"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#FBBF24]" />
                  <span>১. কার্যনির্বাহী কমিটি (৫১ সদস্য)</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-white text-[10px]">
                    {committee.filter((m) => m.committee_type === "executive").length} জন
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCommitteeSubTab("advisory");
                    setNewCommType("advisory");
                    setEditingCommId(null);
                  }}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    committeeSubTab === "advisory"
                      ? "bg-[#07261B] text-[#FBBF24] shadow-md ring-2 ring-emerald-500/30"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Award className="w-4 h-4 text-[#FBBF24]" />
                  <span>২. উপদেষ্টা পরিষদ (১৫ সদস্য)</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-white text-[10px]">
                    {committee.filter((m) => m.committee_type === "advisory").length} জন
                  </span>
                </button>
              </div>

              <div className="text-xs text-slate-500 font-semibold bg-emerald-50 text-emerald-900 px-3.5 py-1.5 rounded-xl border border-emerald-200">
                কার্যকাল মেয়াদের সাল: ২০২৬-২০২৮
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="border-b pb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {committeeSubTab === "executive" ? "কার্যনির্বাহী কমিটি" : "উপদেষ্টা পরিষদ"}
                  </span>
                  <h4 className="font-bold text-base text-[#07261B] flex items-center gap-2 mt-1">
                    <ShieldCheck className="w-5 h-5 text-[#FBBF24]" />
                    <span>
                      {editingCommId
                        ? "নেতৃত্ব তথ্য সম্পাদনা"
                        : committeeSubTab === "executive"
                        ? "নতুন কার্যনির্বাহী কমিটির সদস্য যুক্ত করুন"
                        : "নতুন উপদেষ্টা যুক্ত করুন"}
                    </span>
                  </h4>
                </div>

                <form onSubmit={handleSaveCommitteeMember} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">সদস্যের নাম *:</label>
                    <input
                      type="text"
                      value={newCommName}
                      onChange={(e) => setNewCommName(e.target.value)}
                      placeholder="যেমন: আলহাজ্ব মো. কামরুল হাসান"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">কমিটি বিভাগ:</label>
                      <select
                        value={newCommType}
                        onChange={(e) => setNewCommType(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                      >
                        <option value="executive">কার্যনির্বাহী কমিটি (৫১ সদস্য)</option>
                        <option value="advisory">উপদেষ্টা পরিষদ (১৫ সদস্য)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">মেয়াদ:</label>
                      <input
                        type="text"
                        value={newCommTerm}
                        onChange={(e) => setNewCommTerm(e.target.value)}
                        placeholder="২০২৬-২০২৮"
                        className="w-full p-2.5 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">পদবি (Designation) *:</label>
                      <input
                        type="text"
                        value={newCommDesignation}
                        onChange={(e) => setNewCommDesignation(e.target.value)}
                        placeholder={committeeSubTab === "executive" ? "সভাপতি / সাধারণ সম্পাদক / সদস্য" : "উপদেষ্টা"}
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">মোবাইল নম্বর:</label>
                      <input
                        type="text"
                        value={newCommPhone}
                        onChange={(e) => setNewCommPhone(e.target.value)}
                        placeholder="০১৩৫৩-৭৪৩৫৪৭"
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">স্থায়ী ইউনিয়ন:</label>
                      <select
                        value={newCommUnion}
                        onChange={(e) => setNewCommUnion(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                      >
                        {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">গ্রাম:</label>
                      <input
                        type="text"
                        value={newCommVillage}
                        onChange={(e) => setNewCommVillage(e.target.value)}
                        placeholder="গ্রামের নাম"
                        className="w-full p-2.5 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      ছবি নির্বাচন (ল্যাপটপ / মোবাইল গ্যালারি থেকে):
                    </label>
                    <div className="flex items-center gap-2">
                      {newCommPhoto && (
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shrink-0">
                          <img src={newCommPhoto} alt="প্রিভিউ" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold transition-all shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>গ্যালারি থেকে ছবি</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onloadend = () => setNewCommPhoto(reader.result as string);
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      <input
                        type="text"
                        value={newCommPhoto}
                        onChange={(e) => setNewCommPhoto(e.target.value)}
                        placeholder="/logo.png অথবা ফটো URL"
                        className="flex-1 p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ব্যক্তির সংক্ষিপ্ত Bio:</label>
                    <textarea
                      rows={3}
                      value={newCommBio}
                      onChange={(e) => setNewCommBio(e.target.value)}
                      placeholder="কয়েক লাইনে কর্মজীবন বা অবদান..."
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl shadow-sm hover:bg-[#0c402e] active:scale-95 transition-all"
                    >
                      {editingCommId ? "আপডেট করুন" : "যুক্ত করুন"}
                    </button>
                    {editingCommId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCommId(null);
                          setNewCommName("");
                          setNewCommDesignation("");
                          setNewCommPhone("");
                          setNewCommBio("");
                          setNewCommPhoto("/logo.png");
                        }}
                        className="px-4 py-2.5 border border-slate-200 rounded-xl font-semibold"
                      >
                        বাতিল
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List filtered by subTab */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h4 className="font-bold text-base text-[#07261B]">
                      {committeeSubTab === "executive" ? "কার্যনির্বাহী কমিটি সদস্য তালিকা" : "উপদেষ্টা পরিষদ সদস্য তালিকা"}
                    </h4>
                    <span className="text-xs text-slate-500 font-semibold">
                      মোট: {committee.filter((m) => m.committee_type === committeeSubTab).length} জন
                    </span>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    মেয়াদ: ২০২৬-২০২৮
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
                  {committee
                    .filter((m) => m.committee_type === committeeSubTab)
                    .map((m) => (
                      <div
                        key={m.id}
                        className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500/50 bg-slate-50/50 hover:bg-white transition-all flex items-start gap-3"
                      >
                        <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-white shrink-0 border">
                          <img src={m.photo_url || "/logo.png"} alt={m.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {m.committee_type === "advisory" ? "উপদেষ্টা" : "কার্যনির্বাহী"}
                          </span>
                          <h5 className="font-bold text-sm text-slate-800 mt-1 truncate">{m.name}</h5>
                          <p className="text-xs text-[#07261B] font-bold">{m.designation}</p>
                          <p className="text-[11px] text-slate-500">
                            {m.union} | {m.phone || "ফোন নেই"}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => {
                              setEditingCommId(m.id);
                              setNewCommName(m.name);
                              setNewCommDesignation(m.designation);
                              setNewCommType(m.committee_type);
                              setNewCommPhone(m.phone || "");
                              setNewCommUnion(m.union || "কিশোরগঞ্জ সদর");
                              setNewCommVillage(m.village || "");
                              setNewCommTerm(m.term || "২০২৬-২০২৮");
                              setNewCommBio(m.bio || "");
                              setNewCommPhoto(m.photo_url || "/logo.png");
                              window.scrollTo({ top: 400, behavior: "smooth" });
                            }}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            title="সম্পাদনা"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`আপনি কি নিশ্চিতভাবে ${m.name}-কে মুছে ফেলতে চান?`)) {
                                deleteCommitteeMember(m.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                            title="মুছুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 6: এসএমএস মার্কেটিং ও নোটিফিকেশন গেটওয়ে
            ============================================================ */}
        {activeTab === "sms" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-150">
            {/* Sender Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-base text-[#07261B] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#FBBF24]" />
                <span>বাল্ক / কাস্টম এসএমএস পাঠান</span>
              </h4>

              <form onSubmit={handleSendSms} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">প্রাপক নির্বাচন:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "all", label: "সকল সদস্য" },
                      { id: "union", label: "নির্দিষ্ট ইউনিয়ন" },
                      { id: "individual", label: "একক নম্বর" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSmsRecipientType(opt.id as any)}
                        className={`p-2 rounded-xl font-bold text-center border transition-all ${
                          smsRecipientType === opt.id
                            ? "bg-[#07261B] text-[#FBBF24] border-[#07261B]"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {smsRecipientType === "union" && (
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ইউনিয়ন নির্বাচন:</label>
                    <select
                      value={smsTargetUnion}
                      onChange={(e) => setSmsTargetUnion(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {smsRecipientType === "individual" && (
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">মোবাইল নম্বর:</label>
                    <input
                      type="tel"
                      value={smsCustomPhone}
                      onChange={(e) => setSmsCustomPhone(e.target.value)}
                      placeholder="০১৭১১-XXXXXX"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700">এসএমএস বার্তা (বাংলা/ইংরেজি):</label>
                    <span className="text-[10px] text-slate-400">
                      {smsMessage.length} অক্ষর ({Math.ceil(smsMessage.length / 70) || 1} এসএমএস)
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                    placeholder="বিজ্ঞপ্তি বা বার্তার বিষয়বস্তু লিখুন..."
                    className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
                    required
                  />
                </div>

                {smsSentSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>এসএমএস সফলভাবে প্রেরিত হয়েছে! ব্যালেন্স আপডেট হয়েছে।</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl shadow-md hover:bg-[#0c402e] flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4 text-[#FBBF24]" />
                  <span>এসএমএস ক্যাম্পেইন সেন্ড করুন</span>
                </button>
              </form>
            </div>

            {/* Logs Table */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="font-bold text-base text-[#07261B]">
                  প্রেরিত এসএমএস হিস্ট্রি ও অডিট লগ ({smsLogs.length} টি)
                </h4>
                <span className="text-xs text-slate-500 font-mono">
                  অবশিষ্ট ব্যালেন্স: {settings.smsBalance || 4850} টি
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                      <th className="py-2.5 px-3">তারিখ ও সময়</th>
                      <th className="py-2.5 px-3">প্রাপক টার্গেট</th>
                      <th className="py-2.5 px-3">সংখ্যা</th>
                      <th className="py-2.5 px-3">মেসেজ প্রিভিউ</th>
                      <th className="py-2.5 px-3">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {smsLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono text-slate-600">{log.sent_at}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-800">{log.recipient_target}</td>
                        <td className="py-2.5 px-3 font-bold text-[#07261B]">{log.phone_count} টি</td>
                        <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">{log.message}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            ডেলিভার্ড
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 7: ইউনিয়ন পরিষদ ও প্রতিনিধি CMS
            ============================================================ */}
        {activeTab === "unions" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div className="border-b pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-[#07261B] flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-[#FBBF24]" />
                  <span>কিশোরগঞ্জ উপজেলার ৯টি ইউনিয়ন পরিষদ ও প্রতিনিধি ব্যবস্থাপনা</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  চেয়ারম্যান, ১-৯ নং ওয়ার্ডের সদস্যবৃন্দ, ইউনিয়নের ইতিহাস এবং ছবি ও ভিডিও ফাইল সরাসরি কন্ট্রোল করুন।
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full shrink-0">
                লাইভ ওয়েবসাইট সিঙ্ক সক্রিয়
              </span>
            </div>

            {/* 9 Unions Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-200">
              {unionProfiles.map((up) => {
                const uId = up.id || up.name;
                const isSelected = selectedUnionId === uId || (selectedUnionId === "u-1" && up.name === "কিশোরগঞ্জ সদর");
                return (
                  <button
                    key={uId}
                    type="button"
                    onClick={() => {
                      setSelectedUnionId(uId);
                      setEditingWardNo(null);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                      isSelected
                        ? "bg-[#07261B] text-[#FBBF24] shadow-md ring-2 ring-emerald-500/30"
                        : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    <Landmark className="w-3.5 h-3.5" />
                    <span>{up.name} ইউনিয়ন</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Union Editor */}
            {(() => {
              const currentUnion =
                unionProfiles.find((u) => (u.id || u.name) === selectedUnionId) ||
                unionProfiles.find((u) => u.name === "কিশোরগঞ্জ সদর") ||
                unionProfiles[0];
              if (!currentUnion) return null;
              const unionKey = currentUnion.id || currentUnion.name;

              return (
                <div className="space-y-6 pt-2">
                  {/* Union Title Header */}
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        নির্বাচিত ইউনিয়ন
                      </span>
                      <h4 className="text-xl font-black text-[#07261B] mt-1">
                        {currentUnion.name} ইউনিয়ন পরিষদ
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        নীলফামারী জেলা • কিশোরগঞ্জ উপজেলা
                      </p>
                    </div>
                    <div className="text-right text-xs">
                      <span className="font-bold text-[#07261B] block">
                        বর্তমান চেয়ারম্যান: {currentUnion.chairman_name}
                      </span>
                      <span className="font-mono text-slate-600">{currentUnion.chairman_phone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Section 1: Chairman & Union Bio */}
                    <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h5 className="font-bold text-sm text-[#07261B] flex items-center gap-2 border-b pb-2">
                        <Users className="w-4 h-4 text-[#FBBF24]" />
                        <span>১. চেয়ারম্যানের তথ্য ও ইউনিয়নের বিবরণ (Bio)</span>
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">চেয়ারম্যানের নাম:</label>
                          <input
                            type="text"
                            defaultValue={currentUnion.chairman_name}
                            id={`chairman-name-${unionKey}`}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">মোবাইল নম্বর:</label>
                          <input
                            type="text"
                            defaultValue={currentUnion.chairman_phone}
                            id={`chairman-phone-${unionKey}`}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="font-semibold text-slate-700 block mb-1">
                          ইউনিয়নের পরিচিতি ও সংক্ষিপ্ত বিবরণ (Bio):
                        </label>
                        <textarea
                          rows={4}
                          defaultValue={currentUnion.description}
                          id={`union-desc-${unionKey}`}
                          className="w-full p-3 rounded-xl border border-slate-200 bg-white leading-relaxed text-xs"
                          placeholder="ইউনিয়নের ভৌগোলিক অবস্থান, ইতিহাস ও পরিচিতি..."
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const nameInput = (document.getElementById(`chairman-name-${unionKey}`) as HTMLInputElement)?.value;
                          const phoneInput = (document.getElementById(`chairman-phone-${unionKey}`) as HTMLInputElement)?.value;
                          const descInput = (document.getElementById(`union-desc-${unionKey}`) as HTMLTextAreaElement)?.value;
                          handleUpdateUnionInfo(unionKey, {
                            chairman_name: nameInput || currentUnion.chairman_name,
                            chairman_phone: phoneInput || currentUnion.chairman_phone,
                            description: descInput || currentUnion.description,
                          });
                        }}
                        className="w-full py-2.5 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl text-xs hover:bg-[#0c402e] shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                      >
                        <Save className="w-4 h-4 text-[#FBBF24]" />
                        <span>চেয়ারম্যান ও পরিচিতি তথ্য সংরক্ষণ করুন</span>
                      </button>
                    </div>

                    {/* Section 2: Add Tourist Spot & Picture/Video Upload */}
                    <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h5 className="font-bold text-sm text-[#07261B] flex items-center gap-2 border-b pb-2">
                        <Camera className="w-4 h-4 text-[#FBBF24]" />
                        <span>২. নতুন দর্শনীয় স্থান, ছবি ও ভিডিও ফাইল যুক্ত করুন</span>
                      </h5>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">স্থান বা নিদর্শনের নাম *:</label>
                          <input
                            type="text"
                            value={newSpotName}
                            onChange={(e) => setNewSpotName(e.target.value)}
                            placeholder="যেমন: চাড়ালকাটা নদী ঘাট / ঐতিহাসিক জামে মসজিদ"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">স্থানের সংক্ষিপ্ত বিবরণ:</label>
                          <textarea
                            rows={2}
                            value={newSpotDesc}
                            onChange={(e) => setNewSpotDesc(e.target.value)}
                            placeholder="স্থানটির পরিচিতি বা ঐতিহাসিক গুরুত্ব..."
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                          />
                        </div>

                        {/* Photo upload from laptop/mobile */}
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            ছবি আপলোড (কম্পিউটার বা মোবাইল গ্যালারি থেকে):
                          </label>
                          <div className="flex items-center gap-2">
                            {newSpotImg && (
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shrink-0">
                                <img src={newSpotImg} alt="প্রিভিউ" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold transition-all shrink-0">
                              <Upload className="w-3.5 h-3.5" />
                              <span>ছবি নির্বাচন</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const reader = new FileReader();
                                  reader.onloadend = () => setNewSpotImg(reader.result as string);
                                  reader.readAsDataURL(file);
                                }}
                              />
                            </label>
                            <input
                              type="text"
                              value={newSpotImg}
                              onChange={(e) => setNewSpotImg(e.target.value)}
                              placeholder="অথবা সরাসরি ইমেজ লিংক"
                              className="flex-1 p-2 rounded-xl border border-slate-200 bg-white text-[11px]"
                            />
                          </div>
                        </div>

                        {/* Video upload from laptop/mobile */}
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            ভিডিও ফাইল আপলোড বা YouTube লিংক (ঐচ্ছিক):
                          </label>
                          <div className="flex items-center gap-2">
                            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs font-bold transition-all shrink-0">
                              <Video className="w-3.5 h-3.5" />
                              <span>ভিডিও ফাইল</span>
                              <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const reader = new FileReader();
                                  reader.onloadend = () => setNewSpotVideo(reader.result as string);
                                  reader.readAsDataURL(file);
                                }}
                              />
                            </label>
                            <input
                              type="text"
                              value={newSpotVideo}
                              onChange={(e) => setNewSpotVideo(e.target.value)}
                              placeholder="YouTube লিংক অথবা ডিভাইস থেকে ভিডিও ফাইল"
                              className="flex-1 p-2 rounded-xl border border-slate-200 bg-white text-[11px]"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddTouristSpot(unionKey)}
                          className="w-full py-2.5 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl text-xs hover:bg-[#0c402e] shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all mt-2"
                        >
                          <PlusCircle className="w-4 h-4 text-[#FBBF24]" />
                          <span>নতুন দর্শনীয় স্থান ও মিডিয়া যুক্ত করুন</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: 1 to 9 Ward Members Manager */}
                  <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3">
                      <div>
                        <h5 className="font-bold text-sm text-[#07261B] flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#FBBF24]" />
                          <span>৩. {currentUnion.name} ইউনিয়নের ১ থেকে ৯ নং ওয়ার্ডের ইউপি সদস্যবৃন্দ</span>
                        </h5>
                        <p className="text-xs text-slate-500">
                          যেকোনো ওয়ার্ডের মেম্বারের নাম ও মোবাইল নম্বর সরাসরি সম্পাদনা ও আপডেট করুন।
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(currentUnion.ward_members || []).map((m) => {
                        const isEditingThis = editingWardNo === m.ward_no;
                        return (
                          <div
                            key={m.ward_no}
                            className={`p-3.5 rounded-xl border transition-all ${
                              isEditingThis
                                ? "bg-amber-50/80 border-[#FBBF24] ring-2 ring-[#FBBF24]/30"
                                : "bg-white border-slate-200 hover:border-emerald-300"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="w-7 h-7 rounded-full bg-[#07261B] text-[#FBBF24] font-black text-xs flex items-center justify-center">
                                {m.ward_no}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold">
                                {m.ward_no} নং ওয়ার্ড মেম্বার
                              </span>
                            </div>

                            {isEditingThis ? (
                              <div className="space-y-2 text-xs">
                                <div>
                                  <label className="text-[10px] text-slate-500 font-semibold block">নাম:</label>
                                  <input
                                    type="text"
                                    value={editingWardMemberName}
                                    onChange={(e) => setEditingWardMemberName(e.target.value)}
                                    className="w-full p-1.5 rounded-lg border border-slate-300 bg-white font-bold"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] text-slate-500 font-semibold block">মোবাইল:</label>
                                  <input
                                    type="text"
                                    value={editingWardMemberPhone}
                                    onChange={(e) => setEditingWardMemberPhone(e.target.value)}
                                    className="w-full p-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                                  />
                                </div>
                                <div className="flex gap-2 pt-1">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleUpdateWardMember(
                                        unionKey,
                                        m.ward_no,
                                        editingWardMemberName,
                                        editingWardMemberPhone
                                      )
                                    }
                                    className="flex-1 py-1.5 bg-[#07261B] text-[#FBBF24] font-bold rounded-lg text-xs hover:bg-[#0c402e]"
                                  >
                                    সংরক্ষণ
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingWardNo(null)}
                                    className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-600 text-xs"
                                  >
                                    বাতিল
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between text-xs">
                                <div>
                                  <strong className="text-slate-800 text-sm block">{m.name}</strong>
                                  <span className="font-mono text-slate-500 text-[11px]">{m.phone || "ফোন নেই"}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingWardNo(m.ward_no);
                                    setEditingWardMemberName(m.name);
                                    setEditingWardMemberPhone(m.phone || "");
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 transition-colors"
                                  title="মেম্বার তথ্য পরিবর্তন করুন"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 4: Current Tourist Spots List */}
                  {currentUnion.tourist_spots && currentUnion.tourist_spots.length > 0 && (
                    <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h5 className="font-bold text-sm text-[#07261B] flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#FBBF24]" />
                          <span>{currentUnion.name} ইউনিয়নের দর্শনীয় ও ঐতিহ্যবাহী স্থান ({currentUnion.tourist_spots.length} টি)</span>
                        </h5>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {currentUnion.tourist_spots.map((spot, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                          >
                            <div>
                              {spot.image_url && spot.image_url !== "/logo.png" ? (
                                <div className="h-28 w-full bg-slate-100 overflow-hidden relative">
                                  <img src={spot.image_url} alt={spot.name} className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="h-16 w-full bg-emerald-50 flex items-center justify-center text-emerald-800">
                                  <MapPin className="w-6 h-6 text-[#07261B]" />
                                </div>
                              )}
                              <div className="p-3 text-xs space-y-1">
                                <h6 className="font-bold text-slate-800 text-sm">{spot.name}</h6>
                                <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                                  {spot.description}
                                </p>
                                {spot.video_url && (
                                  <span className="text-[10px] text-blue-600 font-semibold block flex items-center gap-1 pt-1">
                                    <Video className="w-3 h-3" /> ভিডিও সংযুক্ত
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="p-2.5 pt-0 border-t flex justify-end">
                              <button
                                type="button"
                                onClick={() => handleDeleteTouristSpot(unionKey, sIdx)}
                                className="text-[11px] text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 hover:underline"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>মুছে ফেলুন</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 8: অনুষ্ঠান, বার্ষিক রুটিন ও নোটিশ CMS
            ============================================================ */}
        {activeTab === "events" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Event Routine & Scheduler */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-[#07261B] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#FBBF24]" />
                  <span>নতুন অনুষ্ঠান / বার্ষিক রুটিন যোগ করুন</span>
                </h4>

                <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">অনুষ্ঠানের নাম:</label>
                    <input
                      type="text"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      placeholder="যেমন: বার্ষিক মিলনমেলা ও মেজবান ২০২৬"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">তারিখ:</label>
                      <input
                        type="text"
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        placeholder="১৫ ফেব্রুয়ারি, ২০২৬"
                        className="w-full p-2.5 rounded-xl border border-slate-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">স্ট্যাটাস:</label>
                      <select
                        value={newEventStatus}
                        onChange={(e) => setNewEventStatus(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="upcoming">আসন্ন (Upcoming)</option>
                        <option value="completed">সম্পন্ন (Completed)</option>
                        <option value="cancelled">স্থগিত (Cancelled)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">স্থান (Venue):</label>
                    <input
                      type="text"
                      value={newEventVenue}
                      onChange={(e) => setNewEventVenue(e.target.value)}
                      placeholder="যেমন: ইঞ্জিনিয়ার্স ইনস্টিটিউশন, রমনা, ঢাকা"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ভিডিও আপলোড বা লিংক (ঐচ্ছিক):</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs font-bold transition-all shrink-0">
                        <Video className="w-3.5 h-3.5" />
                        <span>ভিডিও ফাইল</span>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onloadend = () => setNewEventVideoUrl(reader.result as string);
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      <input
                        type="text"
                        value={newEventVideoUrl}
                        onChange={(e) => setNewEventVideoUrl(e.target.value)}
                        placeholder="YouTube / Video link অথবা ডিভাইস থেকে ফাইল"
                        className="flex-1 p-2.5 rounded-xl border border-slate-200 font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">নিউজ লিংক (ঐচ্ছিক):</label>
                    <input
                      type="text"
                      value={newEventNewsLink}
                      onChange={(e) => setNewEventNewsLink(e.target.value)}
                      placeholder="পত্রিকা বা অনলাইন নিউজ পোর্টাল লিংক"
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">বিবরণ / ক্যাপশন:</label>
                    <textarea
                      rows={3}
                      value={newEventDesc}
                      onChange={(e) => setNewEventDesc(e.target.value)}
                      placeholder="অনুষ্ঠানের লক্ষ্য ও সংক্ষিপ্ত বিবরণ..."
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl shadow-sm hover:bg-[#0c402e]"
                  >
                    ইভেন্ট রুটিন সেভ করুন
                  </button>
                </form>
              </div>

              {/* Event List */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h4 className="font-bold text-base text-[#07261B]">
                    বার্ষিক অনুষ্ঠান ও আয়োজন তালিকা ({events.length} টি)
                  </h4>
                  <span className="text-xs text-slate-500 font-semibold">বছর: ২০২৬</span>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              ev.status === "completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : ev.status === "cancelled"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {ev.status === "completed" ? "সম্পন্ন" : ev.status === "cancelled" ? "স্থগিত" : "আসন্ন"}
                          </span>
                          <h5 className="font-bold text-sm text-slate-800 mt-1">{ev.title}</h5>
                          <p className="text-xs text-[#07261B] font-semibold">
                            তারিখ: {ev.date} | স্থান: {ev.venue}
                          </p>
                        </div>
                        <div className="text-right">
                          <button
                            onClick={() => {
                              const updated = events.map((item) =>
                                item.id === ev.id
                                  ? {
                                      ...item,
                                      status:
                                        item.status === "cancelled"
                                          ? "upcoming"
                                          : ("cancelled" as any),
                                    }
                                  : item
                              );
                              updateEvents(updated);
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-bold ${
                              ev.status === "cancelled"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {ev.status === "cancelled" ? "পুনরায় চালু" : "ক্যানসেল করুন"}
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">{ev.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 8: বিজ্ঞপ্তি ও নোটিশ সিএমএস (Notices CMS)
            ============================================================ */}
        {activeTab === "notices" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-[#07261B] flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#FBBF24]" />
                  <span>নতুন অফিসিয়াল নোটিশ প্রকাশ করুন</span>
                </h4>

                <form onSubmit={handleSaveNotice} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">নোটিশের শিরোনাম:</label>
                    <input
                      type="text"
                      value={newNoticeTitle}
                      onChange={(e) => setNewNoticeTitle(e.target.value)}
                      placeholder="জরুরি নোটিশের শিরোনাম..."
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ক্যাটাগরি:</label>
                    <select
                      value={newNoticeCategory}
                      onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
                    >
                      <option value="general">সাধারণ নোটিশ (General)</option>
                      <option value="event">অনুষ্ঠান ও সভা (Event/Meeting)</option>
                      <option value="emergency">জরুরি বিজ্ঞপ্তি (Emergency)</option>
                      <option value="election">নির্বাচন ও কমিটি (Executive)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">পূর্ণাঙ্গ বিষয়বস্তু:</label>
                    <textarea
                      rows={5}
                      value={newNoticeContent}
                      onChange={(e) => setNewNoticeContent(e.target.value)}
                      placeholder="নোটিশের বিস্তারিত বক্তব্য..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 leading-relaxed"
                      required
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={newNoticePinned}
                      onChange={(e) => setNewNoticePinned(e.target.checked)}
                      className="rounded text-[#07261B]"
                    />
                    <span>হোমপেজে পিন করে রাখুন (টপ নোটিশ)</span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl shadow-sm hover:bg-[#0c402e]"
                  >
                    নোটিশ প্রকাশ করুন
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h4 className="font-bold text-base text-[#07261B]">
                    প্রকাশিত সকল নোটিশ ({notices.length} টি)
                  </h4>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {notices.map((n) => (
                    <div
                      key={n.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-1.5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                              {n.category}
                            </span>
                            {n.is_pinned && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 flex items-center gap-1">
                                <Pin className="w-3 h-3" />
                                পিন করা
                              </span>
                            )}
                          </div>
                          <h5 className="font-bold text-sm text-slate-800 mt-1">{n.title}</h5>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleNoticeStatus(n.id, n.status === "active" ? "archived" : "active")}
                            className={`px-3 py-1 rounded-xl text-xs font-bold ${
                              n.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {n.status === "active" ? "সক্রিয়" : "আর্কাইভ"}
                          </button>
                          <button
                            onClick={() => deleteNotice(n.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">{n.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 9: ফটো ও ভিডিও গ্যালারি সিএমএস (Gallery CMS)
            ============================================================ */}
        {activeTab === "gallery" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upload & Add Gallery Item */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-[#07261B] flex items-center gap-2">
                  <Images className="w-5 h-5 text-[#FBBF24]" />
                  <span>নতুন ফটো বা ভিডিও যুক্ত করুন</span>
                </h4>

                <form onSubmit={handleSaveGallery} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">শিরোনাম / অ্যালবামের নাম:</label>
                    <input
                      type="text"
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                      placeholder="যেমন: বার্ষিক মিলনমেলা ও সম্মাননা ২০২৬"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">ক্যাটাগরি:</label>
                      <select
                        value={newGalleryCategory}
                        onChange={(e) => setNewGalleryCategory(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
                      >
                        <option value="মিলনমেলা">মিলনমেলা</option>
                        <option value="শিক্ষা">শিক্ষা ও বৃত্তি</option>
                        <option value="বনভোজন">বনভোজন</option>
                        <option value="ব্লাড ব্যাংক">ব্লাড ব্যাংক</option>
                        <option value="সভা">সাংগঠনিক সভা</option>
                        <option value="ঐতিহ্য">ঐতিহ্য ও প্রকৃতি</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">অনুষ্ঠানের বছর:</label>
                      <input
                        type="text"
                        value={newGalleryYear}
                        onChange={(e) => setNewGalleryYear(e.target.value)}
                        placeholder="২০২৬"
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ছবি আপলোড (কম্পিউটার/মোবাইল গ্যালারি বা URL):</label>
                    <div className="flex items-center gap-2">
                      {newGalleryImgUrl && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shrink-0">
                          <img src={newGalleryImgUrl} alt="প্রিভিউ" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold transition-all shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>ছবি সিলেক্ট</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onloadend = () => setNewGalleryImgUrl(reader.result as string);
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      <input
                        type="text"
                        value={newGalleryImgUrl}
                        onChange={(e) => setNewGalleryImgUrl(e.target.value)}
                        placeholder="ছবি আপলোড অথবা ওয়েব ইমেজ লিংক"
                        className="flex-1 p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ভিডিও লিংক (YouTube / MP4 ঐচ্ছিক):</label>
                    <input
                      type="text"
                      value={newGalleryVideoUrl}
                      onChange={(e) => setNewGalleryVideoUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">সংক্ষিপ্ত ক্যাপশন:</label>
                    <textarea
                      rows={2}
                      value={newGalleryCaption}
                      onChange={(e) => setNewGalleryCaption(e.target.value)}
                      placeholder="ছবি বা ভিডিও সম্পর্কিত তথ্য..."
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl shadow-sm hover:bg-[#0c402e]"
                  >
                    গ্যালারিতে যুক্ত করুন
                  </button>
                </form>
              </div>

              {/* Gallery Items Grid */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h4 className="font-bold text-base text-[#07261B]">
                    গ্যালারি অ্যালবাম ও মিডিয়া ফাইল ({gallery.length} টি)
                  </h4>
                  <span className="text-xs text-slate-500 font-semibold">সকল ক্যাটাগরি</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto pr-2">
                  {gallery.map((g) => (
                    <div
                      key={g.id}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-200 border">
                          <img src={g.image_url} alt={g.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-[#07261B]/80 text-[#FBBF24] text-[10px] font-bold backdrop-blur-xs">
                            {g.category} • {g.event_year}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-slate-800 mt-2">{g.title}</h5>
                        {g.caption && <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{g.caption}</p>}
                      </div>

                      <div className="pt-2 border-t flex items-center justify-between">
                        {g.video_url ? (
                          <span className="text-[11px] text-blue-600 font-bold flex items-center gap-1">
                            <Video className="w-3.5 h-3.5" /> ভিডিও সংযুক্ত
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">স্থিরচিত্র</span>
                        )}
                        <button
                          onClick={() => deleteGalleryItem(g.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>মুছুন</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 10: কল্যাণ ও চিকিৎসা সহায়তা তহবিল সিএমএস (Welfare CMS)
            ============================================================ */}
        {activeTab === "welfare" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* 4 Summary Metric Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block">মোট আবেদনপত্র</span>
                <span className="text-2xl font-black text-[#07261B]">{welfareApplications.length}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block">পর্যালোচনাধীন (Under Review)</span>
                <span className="text-2xl font-black text-amber-600">
                  {welfareApplications.filter((w) => w.status === "under_review" || w.status === "submitted").length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block">অনুমোদিত (Approved)</span>
                <span className="text-2xl font-black text-emerald-600">
                  {welfareApplications.filter((w) => w.status === "approved").length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block">বিতরণ সম্পন্ন (Disbursed)</span>
                <span className="text-2xl font-black text-blue-600">
                  {welfareApplications.filter((w) => w.status === "disbursed").length}
                </span>
              </div>
            </div>

            {/* Applications List & Status Changer */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-4">
                <div>
                  <h4 className="font-bold text-lg text-[#07261B] flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-emerald-700" />
                    <span>শিক্ষা ও চিকিৎসা সহায়তা আবেদন ব্যবস্থাপনা</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    আবেদনকারীদের বিবরণ যাচাই করে অনুমোদন বা বিতরণ স্ট্যাটাস পরিবর্তন করুন।
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {["all", "education", "treatment", "emergency"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setWelfareCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        welfareCategoryFilter === cat
                          ? "bg-[#07261B] text-[#FBBF24]"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat === "all" ? "সকল" : cat === "education" ? "শিক্ষা" : cat === "treatment" ? "চিকিৎসা" : "জরুরি"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {welfareApplications
                  .filter((w) => welfareCategoryFilter === "all" || w.category === welfareCategoryFilter)
                  .map((w) => (
                    <div
                      key={w.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-400">{w.id}</span>
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              {w.category === "education" ? "শিক্ষা সহায়তা" : w.category === "treatment" ? "চিকিৎসা অনুদান" : "আপৎকালীন সাহায্য"}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                w.status === "disbursed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : w.status === "approved"
                                  ? "bg-blue-100 text-blue-800"
                                  : w.status === "under_review"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              {w.status === "disbursed"
                                ? "বিতরণ সম্পন্ন"
                                : w.status === "approved"
                                ? "অনুমোদিত"
                                : w.status === "under_review"
                                ? "পর্যালোচনাধীন"
                                : "আবেদন জমা"}
                            </span>
                          </div>
                          <h5 className="font-bold text-base text-slate-800 mt-1">{w.applicant_name}</h5>
                          <p className="text-xs text-slate-600">
                            ইউনিয়ন: <strong className="text-[#07261B]">{w.union}</strong> | গ্রাম: {w.village} | ফোন: <strong className="font-mono">{w.phone}</strong>
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-slate-500 block">আবেদিত অনুদান</span>
                          <span className="text-lg font-black text-emerald-700">৳ {w.amount_requested.toLocaleString("bn-BD")}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed">
                        <strong>আবেদনের কারণ / বিবরণ:</strong> {w.description}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-semibold">স্ট্যাটাস পরিবর্তন:</span>
                          <select
                            value={w.status}
                            onChange={(e) => updateWelfareStatus(w.id, e.target.value as any)}
                            className="p-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white text-[#07261B]"
                          >
                            <option value="submitted">আবেদন জমা (Submitted)</option>
                            <option value="under_review">পর্যালোচনাধীন (Under Review)</option>
                            <option value="approved">অনুমোদিত (Approved)</option>
                            <option value="disbursed">বিতরণ সম্পন্ন (Disbursed)</option>
                          </select>
                        </div>

                        <button
                          onClick={() => deleteWelfareApplication(w.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>আবেদন মুছুন</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 11: আমাদের সম্পর্কে ও ঐতিহ্যবাহী নিদর্শন সিএমএস
            ============================================================ */}
        {(activeTab === "about" || (activeTab as any) === "heritage") && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* About Page Texts Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="border-b pb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg text-[#07261B] flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#FBBF24]" />
                    <span>'আমাদের সম্পর্কে' পেজের টেক্সট ও শিরোনাম সম্পাদনা</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    এই টেক্সটগুলো সরাসরি 'আমাদের সম্পর্কে' (/about) পেজে লাইভ প্রদর্শিত হবে।
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">মূল শিরোনাম (About Heading):</label>
                  <input
                    type="text"
                    value={formSettings.aboutHeading || "শেকড়ের টানে একতার বন্ধনে"}
                    onChange={(e) => setFormSettings({ ...formSettings, aboutHeading: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-[#07261B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">পটভূমি ও লক্ষ্য অনুচ্ছেদ ১:</label>
                    <textarea
                      rows={4}
                      value={formSettings.aboutText1 || ""}
                      onChange={(e) => setFormSettings({ ...formSettings, aboutText1: e.target.value })}
                      placeholder="সমিতির সূচনা ও প্রাথমিক ইতিহাস..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">বিস্তারিত বিবরণ অনুচ্ছেদ ২:</label>
                    <textarea
                      rows={4}
                      value={formSettings.aboutText2 || ""}
                      onChange={(e) => setFormSettings({ ...formSettings, aboutText2: e.target.value })}
                      placeholder="সমিতির মূল অঙ্গীকার ও ভবিষ্যৎ লক্ষ্য..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 leading-relaxed"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-[#FBBF24]" />
                    <span>আমাদের সম্পর্কে টেক্সট সেভ করুন</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Heritage Spots CRUD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-[#07261B] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FBBF24]" />
                  <span>নতুন ঐতিহাসিক নিদর্শন যোগ করুন</span>
                </h4>

                <form onSubmit={handleSaveHeritage} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">নিদর্শনের নাম:</label>
                    <input
                      type="text"
                      value={newHeritageName}
                      onChange={(e) => setNewHeritageName(e.target.value)}
                      placeholder="যেমন: ঐতিহাসিক চাঁদখানা শাহী মসজিদ"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">অবস্থান / ইউনিয়ন:</label>
                    <input
                      type="text"
                      value={newHeritageLocation}
                      onChange={(e) => setNewHeritageLocation(e.target.value)}
                      placeholder="যেমন: চাঁদখানা ইউনিয়ন, কিশোরগঞ্জ"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ছবি আপলোড (কম্পিউটার/মোবাইল বা URL):</label>
                    <div className="flex items-center gap-2">
                      {newHeritageImg && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shrink-0">
                          <img src={newHeritageImg} alt="প্রিভিউ" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold transition-all shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>ছবি আপলোড</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onloadend = () => setNewHeritageImg(reader.result as string);
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      <input
                        type="text"
                        value={newHeritageImg}
                        onChange={(e) => setNewHeritageImg(e.target.value)}
                        placeholder="/logo.png বা ইমেজ লিংক"
                        className="flex-1 p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ভিডিও লিংক (ঐচ্ছিক):</label>
                    <input
                      type="text"
                      value={newHeritageVideo}
                      onChange={(e) => setNewHeritageVideo(e.target.value)}
                      placeholder="YouTube ডকুমেন্টারি লিংক"
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ইতিহাস ও বিস্তারিত বিবরণ:</label>
                    <textarea
                      rows={3}
                      value={newHeritageDesc}
                      onChange={(e) => setNewHeritageDesc(e.target.value)}
                      placeholder="ঐতিহাসিক স্মৃতিচিহ্ন বা লোকগাথার বিবরণ..."
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl shadow-sm hover:bg-[#0c402e]"
                  >
                    নিদর্শন সংরক্ষণ করুন
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h4 className="font-bold text-base text-[#07261B]">
                    কিশোরগঞ্জের ঐতিহাসিক নিদর্শন ও লোকসংস্কৃতি ({heritageItems.length} টি)
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {heritageItems.map((h) => (
                    <div key={h.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 flex flex-col justify-between">
                      <div>
                        {h.image_url && (
                          <div className="relative w-full h-32 rounded-xl overflow-hidden bg-white border mb-2">
                            <img src={h.image_url} alt={h.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <h5 className="font-bold text-sm text-[#07261B]">{h.title}</h5>
                        <p className="text-[11px] font-semibold text-amber-700">{h.union}</p>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{h.description}</p>
                      </div>

                      <div className="pt-2 border-t flex justify-end">
                        <button
                          onClick={() => {
                            const updated = heritageItems.filter((item) => item.id !== h.id);
                            updateHeritageItems(updated);
                          }}
                          className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>মুছুন</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 12: রক্তদান কর্নার সিএমএস
            ============================================================ */}
        {activeTab === "blood" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-150">
            {/* Blood Requests */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="font-bold text-base text-[#DC2626] flex items-center gap-2">
                  <Droplet className="w-5 h-5 fill-rose-600" />
                  <span>জরুরি রক্তের আবেদনসমূহ ({bloodRequests.length} টি)</span>
                </h4>
              </div>

              <div className="space-y-3">
                {bloodRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-sm text-slate-800">{req.patient_name}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-mono">
                        {req.blood_group}
                      </span>
                    </div>
                    <div>হাসপাতাল: {req.hospital}</div>
                    <div>প্রয়োজন: {req.units_needed} ব্যাগ | তারিখ: {req.date_needed}</div>
                    <div>যোগাযোগ: <strong className="font-mono text-rose-700">{req.contact_phone}</strong></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donor Registry */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="font-bold text-base text-[#07261B]">
                  নিবন্ধিত রক্তদাতা ডাটাবেজ ({donors.length} জন)
                </h4>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 text-xs">
                {donors.map((d) => (
                  <div key={d.id} className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">{d.name}</div>
                      <div className="text-slate-500">{d.union} | ফোন: {d.phone}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold font-mono">
                      {d.blood_group}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-PANEL 13: হোম পেজ ও সাইট সেটিংস সিএমএস (Home & Site Settings)
            ============================================================ */}
        {(activeTab === "home" || (activeTab as any) === "settings") && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold text-[#07261B]">
                হোম পেজ ব্যানার, পরিসংখ্যান ও সাইট সেটিংস
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                হোম পেজের টাইটেল, স্লোগান, সাব-হেডলাইন, লাইভ পরিসংখ্যান ও জরুরি যোগাযোগ নম্বর নিয়ন্ত্রণ করুন।
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">সাইটের পূর্ণ নাম (Site Title):</label>
                  <input
                    type="text"
                    value={formSettings.siteTitle || formSettings.heroHeadline}
                    onChange={(e) => setFormSettings({ ...formSettings, siteTitle: e.target.value, heroHeadline: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-[#07261B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">অফিশিয়াল স্লোগান (Slogan):</label>
                  <input
                    type="text"
                    value={formSettings.slogan}
                    onChange={(e) => setFormSettings({ ...formSettings, slogan: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">হোম পেজ সাব-হেডলাইন (Hero Subtitle):</label>
                <input
                  type="text"
                  value={formSettings.heroSubheadline}
                  onChange={(e) => setFormSettings({ ...formSettings, heroSubheadline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  টপ স্ক্রোলিং নোটিশ টিকার (Announcement Ticker):
                </label>
                <input
                  type="text"
                  value={formSettings.announcementTicker}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, announcementTicker: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              {/* 4 Impact Statistics Counters */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-[#07261B] text-sm">
                  হোম পেজ পরিসংখ্যান কাউন্টার (Impact Stats)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">১. ঢাকাস্থ কিশোরগঞ্জবাসী:</label>
                    <input
                      type="text"
                      value={formSettings.statMembers || "৩,৫০০+"}
                      onChange={(e) => setFormSettings({ ...formSettings, statMembers: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-300 font-bold text-center text-[#07261B]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">২. উপজেলার ইউনিয়ন:</label>
                    <input
                      type="text"
                      value={formSettings.statUnions || "৯টি ইউনিয়ন"}
                      onChange={(e) => setFormSettings({ ...formSettings, statUnions: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-300 font-bold text-center text-[#00A3E0]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">৩. কার্যনির্বাহী পরিষদ:</label>
                    <input
                      type="text"
                      value={formSettings.statExecutive || "৫১ জন"}
                      onChange={(e) => setFormSettings({ ...formSettings, statExecutive: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-300 font-bold text-center text-amber-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">৪. নিবন্ধিত রক্তদাতা:</label>
                    <input
                      type="text"
                      value={formSettings.statDonors || "২৮০+"}
                      onChange={(e) => setFormSettings({ ...formSettings, statDonors: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-300 font-bold text-center text-rose-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">জরুরি ফোন / হটলাইন:</label>
                  <input
                    type="text"
                    value={formSettings.contactPhone}
                    onChange={(e) => setFormSettings({ ...formSettings, contactPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">অফিশিয়াল ইমেইল:</label>
                  <input
                    type="email"
                    value={formSettings.contactEmail}
                    onChange={(e) => setFormSettings({ ...formSettings, contactEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">বিকাশ পেমেন্ট মার্চেন্ট নং:</label>
                  <input
                    type="text"
                    value={formSettings.bkashNumber || "০১৩৫৩-৭৪৩৫৪৭"}
                    onChange={(e) => setFormSettings({ ...formSettings, bkashNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>সেটিংস সফলভাবে সংরক্ষিত হয়েছে!</span>
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <Save className="w-4 h-4 text-[#FBBF24]" />
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </button>
            </form>
          </div>
        )}

      </div>

      {/* ============================================================
          MODAL: ADD OFFLINE MEMBER (অফলাইন সদস্য ম্যানুয়াল এন্ট্রি)
          ============================================================ */}
      {showAddOfflineModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-3 sm:p-6 flex justify-center items-center">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-auto space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-3 shrink-0">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  অফিসিয়াল ম্যানুয়াল আবেদন
                </span>
                <h3 className="text-xl font-bold text-[#07261B] mt-1">
                  অফলাইন সদস্য এন্ট্রি ফর্ম (Add Offline Member)
                </h3>
              </div>
              <button
                onClick={() => setShowAddOfflineModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddOfflineMember} className="space-y-5 text-xs overflow-y-auto pr-2 flex-1">
              {/* ১. সদস্যের ধরন ও ফি */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-[#07261B] text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#FBBF24]" />
                  <span>১. সদস্যের ধরন ও আদায়কৃত ফি</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">সদস্যের ধরন:</label>
                    <select
                      value={offlineForm.member_type}
                      onChange={(e) => {
                        const mType = e.target.value as any;
                        const fee = mType === "lifetime" ? 10000 : mType === "donor" ? 50000 : 500;
                        setOfflineForm({ ...offlineForm, member_type: mType, fee_amount: fee });
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-[#07261B]"
                    >
                      <option value="general">সাধারণ সদস্য (৫০০৳)</option>
                      <option value="lifetime">আজীবন সদস্য (১০,০০০৳)</option>
                      <option value="donor">দাতা সদস্য (৫০,০০০৳)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">আদায়কৃত ফি (৳):</label>
                    <input
                      type="number"
                      value={offlineForm.fee_amount}
                      onChange={(e) =>
                        setOfflineForm({ ...offlineForm, fee_amount: Number(e.target.value) })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-[#07261B]"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">পেমেন্ট মেথড:</label>
                    <select
                      value={offlineForm.payment_method}
                      onChange={(e) =>
                        setOfflineForm({ ...offlineForm, payment_method: e.target.value as any })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-emerald-800"
                    >
                      <option value="cash">নগদ গ্রহণ (Cash in Hand)</option>
                      <option value="bkash">বিকাশ (bKash)</option>
                      <option value="nagad">নগদ (Nagad)</option>
                      <option value="bank">ব্যাংক একাউন্ট</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">মানি রসিদ নং / ক্যাশ ভাউচার নং:</label>
                    <input
                      type="text"
                      value={offlineForm.receipt_no}
                      onChange={(e) => setOfflineForm({ ...offlineForm, receipt_no: e.target.value })}
                      placeholder="REC-OFFLINE-001"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">জন্ম তারিখ:</label>
                    <input
                      type="date"
                      value={offlineForm.date_of_birth}
                      onChange={(e) => setOfflineForm({ ...offlineForm, date_of_birth: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* ২. ব্যক্তিগত ও পরিচিতি তথ্য */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-[#07261B] text-sm flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#FBBF24]" />
                  <span>২. ব্যক্তিগত ও পরিচিতি তথ্য (অফলাইন ফরম অনুযায়ী)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">পূর্ণ নাম (বাংলা) *:</label>
                    <input
                      type="text"
                      value={offlineForm.full_name}
                      onChange={(e) => setOfflineForm({ ...offlineForm, full_name: e.target.value })}
                      placeholder="আবেদনকারীর নাম"
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">পিতার নাম *:</label>
                    <input
                      type="text"
                      value={offlineForm.father_name}
                      onChange={(e) => setOfflineForm({ ...offlineForm, father_name: e.target.value })}
                      placeholder="পিতার নাম"
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">মাতার নাম *:</label>
                    <input
                      type="text"
                      value={offlineForm.mother_name}
                      onChange={(e) => setOfflineForm({ ...offlineForm, mother_name: e.target.value })}
                      placeholder="মাতার নাম"
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">জাতীয় পরিচয়পত্র (NID):</label>
                    <input
                      type="text"
                      value={offlineForm.nid_number}
                      onChange={(e) => setOfflineForm({ ...offlineForm, nid_number: e.target.value })}
                      placeholder="১০ বা ১৭ ডিজিট NID"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">রক্তের গ্রুপ:</label>
                    <select
                      value={offlineForm.blood_group}
                      onChange={(e) =>
                        setOfflineForm({ ...offlineForm, blood_group: e.target.value as any })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-rose-700"
                    >
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* ৩. ঠিকানা ও কর্মস্থল */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-[#07261B] text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FBBF24]" />
                  <span>৩. ঠিকানা ও পেশাগত তথ্য</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">স্থায়ী ইউনিয়ন (কিশোরগঞ্জ) *:</label>
                    <select
                      value={offlineForm.permanent_union}
                      onChange={(e) =>
                        setOfflineForm({ ...offlineForm, permanent_union: e.target.value as any })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-[#07261B]"
                    >
                      {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">গ্রামের নাম *:</label>
                    <input
                      type="text"
                      value={offlineForm.permanent_village}
                      onChange={(e) =>
                        setOfflineForm({ ...offlineForm, permanent_village: e.target.value })
                      }
                      placeholder="যেমন: কেশবা / ডাঙ্গাপাড়া"
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">বর্তমান ঢাকা ঠিকানা *:</label>
                    <input
                      type="text"
                      value={offlineForm.present_dhaka_address}
                      onChange={(e) =>
                        setOfflineForm({ ...offlineForm, present_dhaka_address: e.target.value })
                      }
                      placeholder="বাসা, রোড, এলাকা, ঢাকা"
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">পেশা *:</label>
                    <input
                      type="text"
                      value={offlineForm.profession}
                      onChange={(e) => setOfflineForm({ ...offlineForm, profession: e.target.value })}
                      placeholder="যেমন: ব্যবসা / চাকরি / শিক্ষকতা"
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">কর্মস্থলের পদবী:</label>
                    <input
                      type="text"
                      value={offlineForm.workplace_designation}
                      onChange={(e) => setOfflineForm({ ...offlineForm, workplace_designation: e.target.value })}
                      placeholder="যেমন: সিনিয়র অফিসার"
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">কর্মস্থলের ঠিকানা:</label>
                    <input
                      type="text"
                      value={offlineForm.workplace_address}
                      onChange={(e) => setOfflineForm({ ...offlineForm, workplace_address: e.target.value })}
                      placeholder="কোম্পানি বা প্রতিষ্ঠানের ঠিকানা"
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* ৪. ছবি ও পূরণকৃত অফলাইন ফরম আপলোড */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-[#07261B] text-sm flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#FBBF24]" />
                  <span>৪. সদস্যের ছবি ও পূরণকৃত অফলাইন আবেদন ফরম আপলোড</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Photo Upload */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <label className="font-bold text-slate-700 block">
                      সদস্যের পাসপোর্ট ছবি (কম্পিউটার/মোবাইল থেকে):
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 flex items-center justify-center shrink-0">
                        {offlineForm.photo_url ? (
                          <img src={offlineForm.photo_url} alt="ছবি" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] text-slate-400 text-center">ছবি নেই</span>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>ছবি নির্বাচন করুন</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setOfflineForm((prev) => ({ ...prev, photo_url: reader.result as string }));
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                        {offlineForm.photo_url && (
                          <button
                            type="button"
                            onClick={() => setOfflineForm((prev) => ({ ...prev, photo_url: "" }))}
                            className="block text-[11px] text-rose-600 font-semibold hover:underline"
                          >
                            ✕ ছবি মুছুন
                          </button>
                        )}
                        <p className="text-[10px] text-slate-400">JPG, PNG বা WEBP (সর্বোচ্চ ৫ MB)</p>
                      </div>
                    </div>
                  </div>

                  {/* Scanned Paper Form Upload */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <label className="font-bold text-slate-700 block">
                      পূরণকৃত অফলাইন ফরমের স্ক্যান/ছবি:
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 flex items-center justify-center shrink-0">
                        {offlineForm.paper_form_url ? (
                          <img src={offlineForm.paper_form_url} alt="ফরম" className="w-full h-full object-cover" />
                        ) : (
                          <FileText className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs font-bold transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>ফরম আপলোড</span>
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setOfflineForm((prev) => ({ ...prev, paper_form_url: reader.result as string }));
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                        {offlineForm.paper_form_url && (
                          <button
                            type="button"
                            onClick={() => setOfflineForm((prev) => ({ ...prev, paper_form_url: "" }))}
                            className="block text-[11px] text-rose-600 font-semibold hover:underline"
                          >
                            ✕ ফরম মুছুন
                          </button>
                        )}
                        <p className="text-[10px] text-slate-400">আবেদনকারীর হাতে পূরণকৃত ফরমের ছবি</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ৫. লগইন সিকিউরিটি ও ফোন */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-[#07261B] text-sm flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#FBBF24]" />
                  <span>৫. লগইন সিকিউরিটি ও যোগাযোগ</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      মোবাইল (লগইন আইডি হিসেবে ব্যবহৃত) *:
                    </label>
                    <input
                      type="tel"
                      value={offlineForm.phone}
                      onChange={(e) => setOfflineForm({ ...offlineForm, phone: e.target.value })}
                      placeholder="০১৭১১-XXXXXX"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ই-মেইল (ঐচ্ছিক):</label>
                    <input
                      type="email"
                      value={offlineForm.email}
                      onChange={(e) => setOfflineForm({ ...offlineForm, email: e.target.value })}
                      placeholder="example@mail.com"
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">ডিফল্ট পাসওয়ার্ড:</label>
                    <input
                      type="text"
                      value={offlineForm.password}
                      onChange={(e) => setOfflineForm({ ...offlineForm, password: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-900 text-[11px] leading-relaxed border border-emerald-200">
                ✓ সাবমিট করার সাথে সাথে মেম্বার তালিকায় অনুমোদিত হিসেবে যুক্ত হবে, ডিজিটাল আইডি কার্ড ও QR কোড তৈরি হবে, নগদ ফি মোট তহবিলে যোগ হবে এবং স্বয়ংক্রিয় এসএমএস পাঠানো হবে।
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl shadow-md hover:bg-[#0c402e] flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <UserPlus className="w-4 h-4 text-[#FBBF24]" />
                  <span>সদস্য অনুমোদন ও সংরক্ষণ করুন (Save Member)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddOfflineModal(false)}
                  className="px-5 py-3 border border-slate-300 rounded-xl text-slate-600 font-semibold hover:bg-slate-50"
                >
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: MEMBER FULL DETAILS & ADMISSION FORM (সদস্য পূর্ণাঙ্গ প্রোফাইল)
          ============================================================ */}
      {selectedDetailsMember && (
        <MemberDetailsModal
          member={selectedDetailsMember}
          onClose={() => setSelectedDetailsMember(null)}
          onViewIdCard={(m) => {
            setSelectedDetailsMember(null);
            setSelectedCardMember(m);
          }}
          onSendMessage={(m) => {
            setSelectedDetailsMember(null);
            setMessageTargetMember(m);
            setIndividualMessageText(
              `স্বাগত ${m.full_name}! কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা-তে আপনাকে স্বাগতম। আপনার সদস্য আইডি নং: ${m.member_no || "KSD-XXX"}। লগইন করুন: https://kishoreganjupazila.com/login`
            );
          }}
        />
      )}

      {/* ============================================================
          MODAL: DIGITAL ID CARD PREVIEW (Single Member)
          ============================================================ */}
      {selectedCardMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in zoom-in-95 duration-200 flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-[#07261B]">
                ডিজিটাল আইডি কার্ড প্রিভিউ ও প্রিন্ট
              </h3>
              <button
                onClick={() => setSelectedCardMember(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <DigitalIdCard member={selectedCardMember} />
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: SEND INDIVIDUAL MEMBER MESSAGE (সদস্য অনুযায়ী সরাসরি মেসেজ)
          ============================================================ */}
      {messageTargetMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                  সদস্য ডিরেক্টরি এসএমএস
                </span>
                <h3 className="text-lg font-bold text-[#07261B] mt-1">
                  {messageTargetMember.full_name}-কে সরাসরি মেসেজ পাঠান
                </h3>
              </div>
              <button
                onClick={() => setMessageTargetMember(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">প্রাপক সদস্য:</span>
                <strong className="text-[#07261B]">{messageTargetMember.full_name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">মোবাইল নম্বর:</span>
                <strong className="font-mono text-slate-800">{messageTargetMember.phone}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">সদস্য আইডি নং:</span>
                <strong className="font-mono text-emerald-700 font-bold">{messageTargetMember.member_no || "KSD-XXX"}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">স্থায়ী ইউনিয়ন:</span>
                <span>{messageTargetMember.permanent_union}</span>
              </div>
            </div>

            {/* Quick Templates */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1.5">
                কুইক টেমপ্লেট নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <button
                  type="button"
                  onClick={() =>
                    setIndividualMessageText(
                      `স্বাগত ${messageTargetMember.full_name}! কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা-তে আপনাকে স্বাগতম। আপনার সদস্য আইডি নং: ${messageTargetMember.member_no || "KSD-XXX"}। লগইন করুন: kusd.org.bd/login`
                    )
                  }
                  className="p-2 rounded-xl border border-slate-200 hover:border-[#07261B] bg-slate-50 text-left font-medium"
                >
                  🎉 স্বাগত বার্তা ও আইডি
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setIndividualMessageText(
                      `প্রিয় ${messageTargetMember.full_name}, আপনার ডিজিটাল স্মার্ট সদস্য কার্ড প্রস্তুত করা হয়েছে। পোর্টালে লগইন করে ডাউনলোড করুন: kusd.org.bd/login`
                    )
                  }
                  className="p-2 rounded-xl border border-slate-200 hover:border-[#07261B] bg-slate-50 text-left font-medium"
                >
                  💳 আইডি কার্ড নোটিশ
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setIndividualMessageText(
                      `জরুরি নোটিশ: ঢাকাস্থ কিশোরগঞ্জ উপজেলা সমিতির আগামী সাধারণ সভা/অনুষ্ঠানে আপনার উপস্থিতি একান্তভাবে কামনা করছি। বিস্তারিত: kusd.org.bd`
                    )
                  }
                  className="p-2 rounded-xl border border-slate-200 hover:border-[#07261B] bg-slate-50 text-left font-medium"
                >
                  📢 জরুরি সভা নোটিশ
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setIndividualMessageText(
                      `জরুরি রক্তের সন্ধান: কিশোরগঞ্জ উপজেলা সমিতি ব্লাড ব্যাংকে রক্তের জরুরি প্রয়োজন। বিস্তারিত জানতে পোর্টাল দেখুন অথবা হেল্পলাইনে যোগাযোগ করুন।`
                    )
                  }
                  className="p-2 rounded-xl border border-slate-200 hover:border-[#07261B] bg-slate-50 text-left font-medium"
                >
                  🩸 রক্তদান বার্তা
                </button>
              </div>
            </div>

            {/* Message input */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1 text-xs">
                মেসেজের বিষয়বস্তু:
              </label>
              <textarea
                rows={4}
                value={individualMessageText}
                onChange={(e) => setIndividualMessageText(e.target.value)}
                placeholder="সদস্যের জন্য কাস্টম বার্তা লিখুন..."
                className="w-full p-3 rounded-2xl border border-slate-200 text-xs focus:border-[#07261B] outline-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (!individualMessageText.trim()) return;
                  sendSms({
                    recipient_type: "individual",
                    recipient_target: `${messageTargetMember.full_name} (${messageTargetMember.phone})`,
                    phone_count: 1,
                    sample_phone: messageTargetMember.phone,
                    message: individualMessageText.trim(),
                  });
                  setMessageTargetMember(null);
                  setSaveSuccess(true);
                  setTimeout(() => setSaveSuccess(false), 3000);
                }}
                className="flex-1 py-3 bg-[#07261B] text-[#FBBF24] font-bold rounded-xl shadow-md hover:bg-[#0c402e] flex items-center justify-center gap-2 text-xs active:scale-95 transition-all"
              >
                <Send className="w-4 h-4 text-[#FBBF24]" />
                <span>মেসেজ পাঠান (Send SMS)</span>
              </button>
              <button
                type="button"
                onClick={() => setMessageTargetMember(null)}
                className="px-5 py-3 border border-slate-300 rounded-xl text-slate-600 font-semibold text-xs"
              >
                বাতিল
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: BULK CARD DOWNLOAD
          ============================================================ */}
      {showBulkCardModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-xl font-bold text-[#07261B]">
                  সকল অনুমোদিত সদস্যের ডিজিটাল স্মার্ট আইডি কার্ড ({members.length} টি)
                </h3>
                <p className="text-xs text-slate-500">
                  এক ক্লিকে সকল সদস্যের কার্ড প্রিন্ট বা সংরক্ষণ করুন
                </p>
              </div>
              <button
                onClick={() => setShowBulkCardModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-6 flex flex-col items-center">
              {members.map((m) => (
                <div key={m.id} className="border-b border-dashed pb-6 w-full flex justify-center">
                  <DigitalIdCard member={m} />
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#07261B] text-[#FBBF24] hover:bg-[#0c402e] flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4 text-[#FBBF24]" />
                <span>সবগুলো প্রিন্ট করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
