import React, { useState } from 'react';
import { Copy, Check, Heart } from 'lucide-react';
import { Language } from '../types/automation';

interface SupportDonationBannerProps {
  language?: Language;
}

export const SupportDonationBanner: React.FC<SupportDonationBannerProps> = ({
  language = 'bn',
}) => {
  const isBn = language === 'bn';
  const [copiedBkash, setCopiedBkash] = useState(false);
  const [copiedNagad, setCopiedNagad] = useState(false);

  const bkashNumber = '01703661856';
  const nagadNumber = '01703661856';

  const handleCopyBkash = () => {
    navigator.clipboard.writeText(bkashNumber);
    setCopiedBkash(true);
    setTimeout(() => setCopiedBkash(false), 2000);
  };

  const handleCopyNagad = () => {
    navigator.clipboard.writeText(nagadNumber);
    setCopiedNagad(true);
    setTimeout(() => setCopiedNagad(false), 2000);
  };

  return (
    <div className="w-full my-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-slate-900 border border-amber-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Subtle background ambient highlight */}
      <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-pink-500/5 via-orange-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left message & title */}
        <div className="max-w-2xl space-y-1.5">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500/30 shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {isBn
                ? 'অ্যাপটি কি আপনার কোনো উপকারে এসেছে?'
                : 'Has this application helped your workflow?'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isBn
              ? 'অন্যান্য সাইট যেখানে হাজার টাকা চার্জ করে, আমরা এটি সম্পূর্ণ ফ্রি রেখেছি। সাইটের সার্ভার খরচ চালাতে এবং নতুন ফিচার আনতে স্বেচ্ছায় যেকোনো পরিমাণ টাকা দিয়ে সহায়তা করতে পারেন।'
              : 'While other platforms charge thousands every month, we keep AutoFlow 100% free. You can voluntarily donate any amount to help cover server expenses and support continuous development.'}
          </p>
        </div>

        {/* Right payment method cards */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
          {/* bKash Card */}
          <div className="flex-1 sm:flex-initial flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-pink-500/30 shadow-sm hover:border-pink-500/60 transition-all">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded-md bg-[#e2136e]/15 text-[#e2136e] font-extrabold text-xs tracking-wide border border-[#e2136e]/30">
                বিকাশ
              </span>
              <div>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  {isBn ? 'পার্সোনাল' : 'Personal'}
                </span>
                <span className="text-xs font-mono font-bold text-white tracking-wide">
                  {bkashNumber}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyBkash}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-pink-950/60 text-slate-400 hover:text-pink-400 border border-slate-800 hover:border-pink-500/40 transition-colors cursor-pointer"
              title={isBn ? 'বিকাশ নম্বর কপি করুন' : 'Copy bKash Number'}
            >
              {copiedBkash ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Nagad Card */}
          <div className="flex-1 sm:flex-initial flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-orange-500/30 shadow-sm hover:border-orange-500/60 transition-all">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded-md bg-[#f7941d]/15 text-[#f7941d] font-extrabold text-xs tracking-wide border border-[#f7941d]/30">
                নগদ
              </span>
              <div>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  {isBn ? 'পার্সোনাল' : 'Personal'}
                </span>
                <span className="text-xs font-mono font-bold text-white tracking-wide">
                  {nagadNumber}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyNagad}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-orange-950/60 text-slate-400 hover:text-orange-400 border border-slate-800 hover:border-orange-500/40 transition-colors cursor-pointer"
              title={isBn ? 'নগদ নম্বর কপি করুন' : 'Copy Nagad Number'}
            >
              {copiedNagad ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
