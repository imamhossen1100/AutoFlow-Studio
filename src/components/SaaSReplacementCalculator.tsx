import React, { useState } from 'react';
import { Check, DollarSign, TrendingDown, ShieldCheck, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';
import { SaaSServiceItem, Language } from '../types/automation';
import { INITIAL_SAAS_LIST } from '../data/defaultTemplates';
// Self-contained visual with zero external asset dependencies
interface SaaSReplacementCalculatorProps {
  language: Language;
}

export const SaaSReplacementCalculator: React.FC<SaaSReplacementCalculatorProps> = ({ language }) => {
  const isBn = language === 'bn';

  const [services, setServices] = useState<SaaSServiceItem[]>(INITIAL_SAAS_LIST);

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const selectedServices = services.filter((s) => s.selected);
  const monthlyCostUsd = selectedServices.reduce((sum, s) => sum + s.monthlyCostUsd, 0);
  const monthlyCostBdt = selectedServices.reduce((sum, s) => sum + s.monthlyCostBdt, 0);
  const yearlyCostUsd = monthlyCostUsd * 12;
  const yearlyCostBdt = monthlyCostBdt * 12;

  return (
    <div className="space-y-8">
      {/* Module Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
              <span>{isBn ? 'মডিউল ০৪' : 'MODULE 04'}</span>
              <span aria-hidden="true">·</span>
              <span>{isBn ? 'টাকা বাঁচানোর ক্যালকুলেটর' : 'SaaS Cost Elimination'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-bold">{isBn ? '১০০% সাশ্রয়' : '100% Free'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {isBn ? 'মাসিক সাবস্ক্রিপশন ফি বনাম ফ্রি অটোমেশন তুলনা' : 'SaaS Subscription Fees vs Free AutoFlow Studio'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isBn
                ? 'অন্যান্য ব্যয়বহুল পেইড অটোমেশন ও মার্কেটিং সফটওয়্যার ব্যবহার করলে প্রতি বছর একজন ফ্রিল্যান্সার বা এজেন্সির ২ থেকে ৩ লাখ টাকা অপচয় হয়। এই ফ্রি অটোমেশন ইঞ্জিন ব্যবহার করে আপনার পুরো খরচটি শূন্য করে ফেলুন।'
                : 'Calculate your exact annual savings. Replace $2,000+ to $3,000+ in redundant software bills with self-hosted open automation.'}
            </p>
          </div>

          {/* 100% Reliable High-Tech Visual Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 p-4 min-h-[190px] flex flex-col justify-between">
              {/* Header Status */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
                <span className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  PAID SAAS STACK
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  VS FREE BOT
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  AUTOFLOW
                </span>
              </div>

              {/* Visual Comparison Stage */}
              <div className="grid grid-cols-11 gap-1 items-center my-3">
                {/* Paid Stack Box */}
                <div className="col-span-5 bg-rose-950/30 border border-rose-800/40 rounded-lg p-2.5 text-center">
                  <div className="flex justify-center gap-1 mb-1.5 text-[10px] font-mono text-rose-300">
                    <span className="px-1.5 py-0.5 rounded bg-rose-900/40">{isBn ? 'পেইড টুল ১' : 'Paid SaaS 1'}</span>
                    <span className="px-1.5 py-0.5 rounded bg-rose-900/40">{isBn ? 'পেইড টুল ২' : 'Paid SaaS 2'}</span>
                  </div>
                  <span className="text-xs text-rose-400 line-through font-mono block font-bold">
                    $2,100+ / Year
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Recurring Monthly Bill</span>
                </div>

                {/* Arrow & Badge */}
                <div className="col-span-1 flex justify-center">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </div>

                {/* Free Bot Box */}
                <div className="col-span-5 bg-emerald-950/40 border border-emerald-500/50 rounded-lg p-2.5 text-center shadow-lg shadow-emerald-950/50">
                  <div className="flex justify-center gap-1 mb-1.5 text-[10px] font-mono text-emerald-300">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-900/40 font-bold">Python</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-900/40 font-bold">Node.js</span>
                  </div>
                  <span className="text-sm text-emerald-400 font-mono font-black block">
                    $0.00 / LIFETIME
                  </span>
                  <span className="text-[9px] text-emerald-300 block mt-0.5 font-semibold">100% Free Automation</span>
                </div>
              </div>

              {/* Footer Summary */}
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono pt-2 border-t border-slate-800/80 bg-slate-900/50 -mx-4 -mb-4 px-4 py-2">
                <span className="text-slate-400">{isBn ? 'বাৎসরিক সাশ্রয়' : 'Total Cost'}:</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {isBn ? '১০০% ফ্রি ও আনলিমিটেড' : 'Zero Subscriptions Forever'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Comparative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Service Selector */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white">
              {isBn ? 'যে সফটওয়্যারগুলোর সাবস্ক্রিপশন এই টুলে রিপ্লেস হয়' : 'Replaced Monthly SaaS Subscriptions'}
            </h3>
            <span className="text-xs text-slate-400">
              {selectedServices.length} {isBn ? 'টি সফটওয়্যার নির্বাচিত' : 'Selected'}
            </span>
          </div>

          <div className="space-y-3">
            {services.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleService(item.id)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                  item.selected
                    ? 'border-indigo-500/60 bg-slate-950 text-white shadow-sm'
                    : 'border-slate-800/80 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                      item.selected
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-700 bg-slate-900'
                    }`}
                  >
                    {item.selected && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {isBn ? item.nameBn : item.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {isBn ? item.replacedFeatureBn : item.replacedFeature}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-slate-200 block tabular-nums">
                    ${item.monthlyCostUsd.toFixed(2)} / mo
                  </span>
                  <span className="text-[10px] text-slate-500 block tabular-nums">
                    ≈ ৳{item.monthlyCostBdt.toLocaleString()} / মাস
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Total Savings Billboard */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
              <TrendingDown className="w-4 h-4" />
              <span>{isBn ? 'টাকা বাঁচানোর লাইভ সামারি' : 'Live Cost Savings Summary'}</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {isBn ? 'এই সফটওয়্যার ব্যবহার করে আপনার বাৎসরিক সাশ্রয়:' : 'Your Estimated Annual Savings with AutoFlow:'}
            </h3>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div>
                <span className="text-xs text-slate-400 block">
                  {isBn ? 'মাসিক সাশ্রয় (প্রতি মাসে)' : 'Monthly Savings'}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                    ${monthlyCostUsd.toFixed(0)}
                  </span>
                  <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                    (৳{monthlyCostBdt.toLocaleString()})
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-xs text-slate-400 block">
                  {isBn ? 'বাৎসরিক মোট সাশ্রয় (১২ মাস)' : 'Total Yearly Savings'}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                    ${yearlyCostUsd.toFixed(0)} USD
                  </span>
                  <span className="text-sm font-semibold text-slate-300 font-mono tabular-nums">
                    ≈ ৳{yearlyCostBdt.toLocaleString()} টাকা
                  </span>
                </div>
              </div>
            </div>

            {/* Zero Cost Assurance */}
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {isBn
                  ? 'AutoFlow Studio ওপেন সোর্স। এটি নিজের লোকাল পিসিতে বা ফ্রি ক্লাউডে চালানো যায়। কোনো ক্রেডিট কার্ডের প্রয়োজন নেই।'
                  : 'AutoFlow Studio is free to run on your local machine with zero recurring software licensing costs.'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-900/20 border border-indigo-800/40 text-xs text-indigo-300 text-center font-medium">
            {isBn
              ? 'এই সম্পূর্ণ সাশ্রয়কৃত অর্থ আপনি প্রতি বছর নিজের পকেটে বা নতুন ব্যবসায় রি-ইনভেস্ট করতে পারবেন।'
              : 'Re-invest these thousands of saved dollars back into growing your agency and business.'}
          </div>
        </div>
      </div>
    </div>
  );
};
