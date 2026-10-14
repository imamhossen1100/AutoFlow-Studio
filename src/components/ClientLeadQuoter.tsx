import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  Copy,
  Check,
  Send,
  MessageSquare,
  Clock,
  Briefcase,
  Sparkles,
  RefreshCw,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { ClientLeadAnalysis, Language } from '../types/automation';
import { LEAD_QUOTE_PRESETS } from '../data/defaultTemplates';
import { generateClientLeadQuote } from '../services/geminiService';

interface ClientLeadQuoterProps {
  language: Language;
}

export const ClientLeadQuoter: React.FC<ClientLeadQuoterProps> = ({ language }) => {
  const isBn = language === 'bn';

  const [clientText, setClientText] = useState(LEAD_QUOTE_PRESETS[0].clientText);
  const [clientName, setClientName] = useState(LEAD_QUOTE_PRESETS[0].clientName);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ClientLeadAnalysis | null>(null);

  const handleGenerateQuote = async () => {
    if (!clientText.trim()) return;
    setLoading(true);
    try {
      const res = await generateClientLeadQuote(clientText, clientName, language);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = async (p: (typeof LEAD_QUOTE_PRESETS)[0]) => {
    setClientText(p.clientText);
    setClientName(p.clientName);
    setLoading(true);
    try {
      const res = await generateClientLeadQuote(p.clientText, p.clientName, language);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  React.useEffect(() => {
    if (!analysis) {
      handleGenerateQuote();
    }
  }, [language]);

  return (
    <div className="space-y-8">
      {/* Module Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>{isBn ? 'মডিউল ০২' : 'MODULE 02'}</span>
            <span aria-hidden="true">·</span>
            <span>{isBn ? 'ইনস্ট্যান্ট লিড ও প্রপোজাল অটোমেশন' : 'Instant Inbound Lead & Proposal Automation'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-white">{isBn ? 'ইনস্ট্যান্ট ক্লায়েন্ট কোটেশন' : 'Instant Client Quoter'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {isBn ? 'ক্লায়েন্ট লিড কোটেশন ও প্রপোজাল অটোমেশন' : 'Client Inbound Lead & Instant Quote Automation'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {isBn
              ? 'ক্লায়েন্ট হোয়াটসঅ্যাপ বা ইনবক্সে যেকোনো প্রশ্ন করলে বা বাজেট জানতে চাইলে আর সময় নষ্ট হবে না। ক্লায়েন্টের প্রশ্নের সরাসরি বাস্তবমুখী উত্তর, কাজের তালিকা, খরচ এবং রেডিমেড রিপ্লাই নিমেষেই তৈরি করে পাঠিয়ে দিন।'
              : 'Turn chaotic WhatsApp or Upwork inquiries into direct answers, structured technical proposals, pricing estimates, and closing messages in under 5 seconds.'}
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">
              {isBn ? 'ক্লায়েন্টের ইনবক্স মেসেজ বা প্রশ্ন পেস্ট করুন' : 'Paste Client Inquiry or Question'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn ? 'ক্লিক করে যেকোনো ডেমো সিলেক্ট করুন অথবা নিচে নিজের মেসেজ লিখুন' : 'Click a quick sample lead below or type your own'}
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {LEAD_QUOTE_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                  clientText === p.clientText
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {p.titleBn}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              {isBn ? 'ক্লায়েন্টের মূল মেসেজ বা চ্যাট হিস্ট্রি' : 'Client Message / Inquiry Text'}
            </label>
            <textarea
              rows={3}
              value={clientText}
              onChange={(e) => setClientText(e.target.value)}
              placeholder={isBn ? 'ক্লায়েন্টের পাঠানো মেসেজ এখানে পেস্ট করুন...' : 'Paste client requirements or WhatsApp message...'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
            />
          </div>

          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {isBn ? 'ক্লায়েন্টের নাম বা কোম্পানি' : 'Client / Company Name'}
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={isBn ? 'যেমন: রাফসান তানভীর' : 'e.g. John Doe / Client'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="pt-3">
              <button
                onClick={handleGenerateQuote}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900 text-white font-medium text-sm rounded-xl transition-colors shadow-md cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isBn ? 'এনালাইজ ও কোটেশন তৈরি হচ্ছে...' : 'Analyzing & Calculating...'}</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4" />
                    <span>{isBn ? 'জেনারেট ইনস্ট্যান্ট কোটেশন' : 'Generate Instant Quote'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Output Display */}
      {analysis && (
        <div className="space-y-6">
          {/* Direct Strategic Answer to Client Inquiry */}
          {analysis.clientQuestionAnswer && (
            <div className="bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>{isBn ? '💡 ক্লায়েন্টের প্রশ্নের সরাসরি উত্তর ও বাস্তবায়ন পরামর্শ' : '💡 Direct Strategic Answer to Client Inquiry'}</span>
                    </h3>
                    <p className="text-xs text-emerald-300/80 mt-0.5">
                      {isBn
                        ? 'ক্লায়েন্ট যে বিষয়ে জানতে চেয়েছেন (যেমন: কীভাবে বই বা পণ্য বিক্রি শুরু করবেন), তার নিখুঁত সমাধান'
                        : 'Actionable consultation answering the exact client questions'}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold">
                  {isBn ? 'বাস্তবমুখী গাইডলাইন' : 'Actionable Roadmap'}
                </span>
              </div>

              <div className="p-3.5 bg-slate-950/70 border border-emerald-500/20 rounded-xl text-sm text-slate-100 font-medium leading-relaxed">
                {analysis.clientQuestionAnswer.summary}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {analysis.clientQuestionAnswer.steps.map((st, sIdx) => (
                  <div key={sIdx} className="bg-slate-950/90 border border-slate-800 hover:border-emerald-500/30 rounded-xl p-4 space-y-1.5 transition-colors">
                    <div className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                      <span>{st.title}</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed font-sans">{st.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Formal Quotation & Invoice Card */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block">
                  {isBn ? 'অফিসিয়াল প্রজেক্ট বাজেট ও কোটেশন' : 'Official Project Quotation'}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {analysis.serviceCategory}
                </h3>
                <span className="text-xs text-slate-400 mt-0.5 block">
                  Client: <strong className="text-slate-200">{analysis.clientName}</strong> · Urgency: <span className="text-amber-400">{analysis.urgency}</span>
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 block">Estimated Timeline</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  {analysis.estimatedDeliveryDays} {isBn ? 'দিন' : 'Days'}
                </span>
              </div>
            </div>

            {/* Requirements Extracted */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                {isBn ? 'চিহ্নিত রিকোয়ারমেন্টসমূহ (Scope of Work)' : 'Extracted Scope of Work'}
              </h4>
              <div className="space-y-1.5">
                {analysis.extractedRequirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itemized Cost Breakdown Table */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                {isBn ? 'আইটেমভিত্তিক খরচের হিসাব' : 'Itemized Cost Breakdown'}
              </h4>
              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-semibold">
                    <tr>
                      <th className="py-2.5 px-4">{isBn ? 'সেবা ও মডিউল' : 'Deliverable Item'}</th>
                      <th className="py-2.5 px-4 text-right">BDT (৳)</th>
                      <th className="py-2.5 px-4 text-right">USD ($)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {analysis.costBreakdown.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 text-slate-200">
                        <td className="py-2.5 px-4 font-sans">{row.item}</td>
                        <td className="py-2.5 px-4 text-right tabular-nums text-slate-300">
                          ৳{row.bdt.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-4 text-right tabular-nums text-slate-300">
                          ${row.usd.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="bg-slate-900/90 text-white font-bold font-mono">
                      <td className="py-3 px-4 font-sans text-emerald-400">
                        {isBn ? 'সর্বমোট প্রজেক্ট বাজেট' : 'Total Project Estimate'}
                      </td>
                      <td className="py-3 px-4 text-right text-emerald-400 text-sm tabular-nums">
                        ৳{analysis.totalBdt.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-emerald-400 text-sm tabular-nums">
                        ${analysis.totalUsd.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Addons */}
            {analysis.suggestedAddons.length > 0 && (
              <div className="pt-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1.5">
                  {isBn ? 'প্রস্তাবিত অ্যাড-অন সার্ভিস' : 'Optional Value Add-ons'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {analysis.suggestedAddons.map((addon, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-indigo-300 font-medium"
                    >
                      + {addon}{idx < analysis.suggestedAddons.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Ready-to-Send Messaging */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Ready Message */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-semibold text-white">
                    {isBn ? 'হোয়াটসঅ্যাপ / মেসেঞ্জার রিপ্লাই' : 'WhatsApp / Messenger Quick Reply'}
                  </h4>
                </div>
                <button
                  onClick={() => handleCopy(analysis.whatsappMessage, 'wa-msg')}
                  className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 cursor-pointer"
                >
                  {copiedKey === 'wa-msg' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'wa-msg' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি মেসেজ' : 'Copy')}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                {analysis.whatsappMessage}
              </div>

              <p className="text-[11px] text-slate-400">
                {isBn
                  ? 'এই মেসেজটি সরাসরি ক্লায়েন্টকে পাঠিয়ে দিলে ক্লায়েন্ট কোনো দ্বিধা ছাড়া পরবর্তী পদক্ষেপে সম্মতি দেয়।'
                  : 'Send this immediately to close clients before they shop around.'}
              </p>
            </div>

            {/* Formal Proposal Email */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-sm font-semibold text-white">
                    {isBn ? 'প্রফেশনাল প্রপোজাল ইমেইল' : 'Formal Proposal Email'}
                  </h4>
                </div>
                <button
                  onClick={() => {
                    const full = `Subject: ${analysis.proposalEmail.subject}\n\n${analysis.proposalEmail.body}`;
                    handleCopy(full, 'email-all');
                  }}
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
                >
                  {copiedKey === 'email-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'email-all' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি ইমেইল' : 'Copy Email')}</span>
                </button>
              </div>

              <div className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 truncate">
                <strong>Subject:</strong> {analysis.proposalEmail.subject}
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line max-h-56 overflow-y-auto">
                {analysis.proposalEmail.body}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
