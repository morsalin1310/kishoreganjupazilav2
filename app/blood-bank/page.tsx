"use client";

import { useState } from "react";
import { useSiteStore } from "@/lib/siteStore";
import { BloodDonor, BloodGroup, NILPHAMARI_KISHOREGANJ_UNIONS, KishoreganjUnion } from "@/lib/types";
import { Droplet, Phone, Search, Heart, UserPlus, CheckCircle, ShieldAlert, Sparkles, Compass } from "lucide-react";

export default function BloodBankPage() {
  const { donors, updateDonors } = useSiteStore();
  const [selectedBlood, setSelectedBlood] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [selectedUnion, setSelectedUnion] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);

  // New Donor Form state
  const [newDonor, setNewDonor] = useState({
    name: "",
    blood_group: "O+" as BloodGroup,
    dhaka_area: "উত্তরা",
    union: "কিশোরগঞ্জ সদর" as KishoreganjUnion,
    phone: "",
  });
  const [registered, setRegistered] = useState(false);

  const filteredDonors = donors.filter((d) => {
    const matchesBlood = selectedBlood === "all" || d.blood_group === selectedBlood;
    const matchesArea = selectedArea === "all" || d.dhaka_area.includes(selectedArea);
    const matchesUnion = selectedUnion === "all" || d.union === selectedUnion;
    return matchesBlood && matchesArea && matchesUnion;
  });

  const handleRegisterDonor = (e: React.FormEvent) => {
    e.preventDefault();
    const donorToAdd: BloodDonor = {
      id: `bd-${Date.now()}`,
      name: newDonor.name,
      blood_group: newDonor.blood_group,
      dhaka_area: newDonor.dhaka_area,
      union: newDonor.union,
      phone: newDonor.phone,
      is_available: true,
    };
    updateDonors([donorToAdd, ...donors]);
    setRegistered(true);
    setTimeout(() => {
      setShowModal(false);
      setRegistered(false);
      setNewDonor({ name: "", blood_group: "O+", dhaka_area: "উত্তরা", union: "কিশোরগঞ্জ সদর", phone: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-7xl mx-auto">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#EF4444] rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-sm">
              <Droplet className="w-3.5 h-3.5 fill-white" />
              কিশোরগঞ্জ ব্লাড ব্যাংক (ঢাকা) — নীলফামারী
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
              রক্ত দিন, জীবন বাঁচান
            </h1>
            <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
              ঢাকায় চিকিৎসাধীন রোগী বা স্বজনদের রক্তের প্রয়োজনে পাশে দাঁড়াতে কিশোরগঞ্জ উপজেলা সমিতি (নীলফামারী) চালু করেছে সার্বক্ষণিক স্বেচ্ছায় রক্তদান হেল্পলাইন।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white text-[#DC2626] hover:bg-rose-50 shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              রক্তদাতা হিসেবে যুক্ত হোন
            </button>
            <a
              href="tel:01353743547"
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border-2 border-white/60 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#FBBF24]" />
              জরুরি হেল্পলাইন
            </a>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                রক্তের গ্রুপ নির্বাচন করুন:
              </span>
              <div className="flex flex-wrap gap-2">
                {["all", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setSelectedBlood(bg)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedBlood === bg
                        ? "bg-[#DC2626] text-white shadow-md scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {bg === "all" ? "সকল গ্রুপ" : bg}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="w-full sm:w-48">
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  কিশোরগঞ্জের ইউনিয়ন:
                </span>
                <select
                  value={selectedUnion}
                  onChange={(e) => setSelectedUnion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#DC2626] outline-none bg-white font-medium"
                >
                  <option value="all">সকল ইউনিয়ন</option>
                  {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-48">
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  ঢাকার এলাকা:
                </span>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#DC2626] outline-none bg-white font-medium"
                >
                  <option value="all">ঢাকার সকল এলাকা</option>
                  <option value="উত্তরা">উত্তরা</option>
                  <option value="মিরপুর">মিরপুর</option>
                  <option value="ধানমন্ডি">ধানমন্ডি</option>
                  <option value="মোহাম্মদপুর">মোহাম্মদপুর</option>
                  <option value="গুলশান">গুলশান-বাড্ডা</option>
                  <option value="খিলগাঁও">খিলগাঁও-বাসাবো</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Donor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 font-extrabold text-xl flex items-center justify-center ring-2 ring-rose-200/60 shadow-xs shrink-0 group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                  {donor.blood_group}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-800 leading-snug">
                    {donor.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ইউনিয়ন: {donor.union} | এলাকা: {donor.dhaka_area}
                  </p>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    ● রক্তদানে প্রস্তুত
                  </span>
                </div>
              </div>

              <a
                href={`tel:${donor.phone}`}
                className="p-3 rounded-2xl bg-rose-100 text-[#DC2626] hover:bg-[#DC2626] hover:text-white transition-all shadow-xs"
                title="সরাসরি কল করুন"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>

        {/* Register Donor Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
              <h3 className="text-lg font-bold text-[#DC2626] mb-1">
                রক্তদাতা হিসেবে নিবন্ধন করুন
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                আপনার একটু রক্তে বেঁচে যেতে পারে নীলফামারীর কিশোরগঞ্জের এক অসহায় মানুষের অমূল্য প্রাণ।
              </p>

              {registered ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-800 text-sm">
                    নিবন্ধন সফল হয়েছে! ধন্যবাদ আপনাকে।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterDonor} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={newDonor.name}
                      onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
                      placeholder="উদা: আরিফুল ইসলাম"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#DC2626] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        রক্তের গ্রুপ *
                      </label>
                      <select
                        value={newDonor.blood_group}
                        onChange={(e) =>
                          setNewDonor({ ...newDonor, blood_group: e.target.value as BloodGroup })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#DC2626] outline-none bg-white"
                      >
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        কিশোরগঞ্জের ইউনিয়ন *
                      </label>
                      <select
                        value={newDonor.union}
                        onChange={(e) =>
                          setNewDonor({ ...newDonor, union: e.target.value as KishoreganjUnion })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#DC2626] outline-none bg-white"
                      >
                        {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      বর্তমান ঢাকার এলাকা *
                    </label>
                    <input
                      type="text"
                      required
                      value={newDonor.dhaka_area}
                      onChange={(e) =>
                        setNewDonor({ ...newDonor, dhaka_area: e.target.value })
                      }
                      placeholder="উদা: উত্তরা / মিরপুর"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#DC2626] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newDonor.phone}
                      onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
                      placeholder="০১৭১১-XXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#DC2626] outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 rounded-full text-xs text-slate-600 hover:bg-slate-100"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-full text-xs font-bold bg-[#DC2626] text-white hover:bg-rose-700 shadow-md"
                    >
                      নিবন্ধন জমা দিন
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
