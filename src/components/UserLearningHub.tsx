import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  DollarSign,
  FileText,
  Server,
  Code2,
} from 'lucide-react';
import { UserTutorialSection, Language } from '../types/automation';

const DEFAULT_GUIDES: UserTutorialSection[] = [
  {
    id: 'guide-repurposing',
    category: 'Content Automation',
    categoryBn: 'কনটেন্ট অটোমেশন',
    title: 'Multi-Platform Content Distribution',
    titleBn: 'এক ক্লিকে ৫টি সোশ্যাল মিডিয়ায় কনটেন্ট তৈরি',
    summary: 'Turn a single raw idea, video title, or product description into ready-to-post assets across YouTube, Shorts, LinkedIn, Facebook, and Twitter.',
    summaryBn: '১টি মাত্র বিষয় বা কনসেপ্ট ইনপুট দিয়ে ২ সেকেন্ডে ইউটিউব এসইও, টিকটক/রিলস স্ক্রিপ্ট, লিঙ্কডইন এবং ফেসবুক পোস্ট তৈরি করুন।',
    steps: [
      {
        stepNumber: 1,
        title: 'Input Your Topic',
        titleBn: 'আপনার বিষয়বস্তু বা আইডিয়া লিখুন',
        description: 'Type a brief topic or select one of the pre-made sample cards.',
        descriptionBn: 'ইনপুট বক্সে আপনার বিষয়বস্তু লিখুন অথবা উপরের রেডিমেড ডেমো কার্ডে ক্লিক করুন।',
      },
      {
        stepNumber: 2,
        title: 'Run AI Automation',
        titleBn: 'রান অটোমেশন বাটনে ক্লিক করুন',
        description: 'The engine formats high-CTR titles, timed Shorts storyboard, and social copy.',
        descriptionBn: 'এআই ইঞ্জিন সাথে সাথে এসইও মেটাডাটা এবং সময়ভিত্তিক ডায়ালগ তৈরি করবে।',
      },
      {
        stepNumber: 3,
        title: 'Copy or Download .MD',
        titleBn: 'কপি বা এক ফাইলে ডাউনলোড করুন',
        description: 'Click copy next to any platform or download the full bundle in Markdown format.',
        descriptionBn: 'প্রতিটি অংশের পাশে থাকা কপি বাটনে ক্লিক করে সরাসরি পোস্ট করুন বা পুরো ফাইল ডাউনলোড করুন।',
      },
    ],
    benefit: 'Saves 3 hours of manual content writing per video and replaces expensive monthly subscription tools ($150+/mo).',
    benefitBn: 'প্রতিটি ভিডিওর পেছনে ৩ ঘণ্টার অতিরিক্ত খাটুনি বাঁচায় এবং ব্যয়বহুল মাসিক পেইড সাবস্ক্রিপশন টুলকে রিপ্লেস করে।',
  },
  {
    id: 'guide-lead-quoter',
    category: 'Client Proposals',
    categoryBn: 'ক্লায়েন্ট প্রপোজাল',
    title: 'Instant Client Lead Qualification & Pricing',
    titleBn: '৫ সেকেন্ডে ক্লায়েন্টের নিখুঁত বাজেট ও প্রপোজাল',
    summary: 'Paste any unstructured client inquiry from WhatsApp, Upwork, or Facebook to generate itemized costs, delivery timeline, and closing messages.',
    summaryBn: 'ক্লায়েন্টের পাঠানো যে কোনো মেসেজ পেস্ট করলেই কাজের রিকোয়ারমেন্ট, আইটেমভিত্তিক বাজেট ও ফরমাল ইমেইল তৈরি হয়ে যায়।',
    steps: [
      {
        stepNumber: 1,
        title: 'Paste Client Message',
        titleBn: 'ক্লায়েন্টের মেসেজ পেস্ট করুন',
        description: 'Input raw client conversation or project requirement.',
        descriptionBn: 'ক্লায়েন্ট ইনবক্সে যা পাঠিয়েছে তা সরাসরি পেস্ট করুন।',
      },
      {
        stepNumber: 2,
        title: 'Calculate Scope & Price',
        titleBn: 'জেনারেট বাটনে চাপ দিন',
        description: 'The system computes BDT (৳) and USD ($) pricing breakdown with timeline.',
        descriptionBn: 'সিস্টেম স্বয়ংক্রিয়ভাবে কাজের প্রতিটি মডিউলের খরচ ও দিন হিসাব করবে।',
      },
      {
        stepNumber: 3,
        title: 'Send WhatsApp or Email',
        titleBn: 'হোয়াটসঅ্যাপে রিপ্লাই পাঠান',
        description: 'Copy the ready-to-send WhatsApp close message or official proposal email.',
        descriptionBn: 'রেডি করা প্রফেশনাল হোয়াটসঅ্যাপ মেসেজটি কপি করে ক্লায়েন্টকে সাথে সাথে পাঠিয়ে দিন।',
      },
    ],
    benefit: 'Increases proposal response rate and eliminates 30 minutes of manual quote drafting.',
    benefitBn: 'ক্লায়েন্ট হারানোর ঝুঁকি কমায় এবং আধা ঘণ্টার ম্যানুয়াল বাজেট তৈরির কাজ ৫ সেকেন্ডে শেষ করে।',
  },
  {
    id: 'guide-workflow',
    category: 'Visual Pipelines',
    categoryBn: 'ভিজুয়াল অটোমেশন',
    title: 'Visual Workflow Engine & Self-Hosting',
    titleBn: 'কোনো পেইড সাবস্ক্রিপশন ছাড়াই ফ্রি অটোমেশন পাইপলাইন',
    summary: 'Understand how triggers, AI processors, and action nodes connect to automate repetitive tasks without recurring fees.',
    summaryBn: 'নোড-ভিত্তিক আর্কিটেকচার দেখে বুঝুন কীভাবে ট্রিগার থেকে এআই হয়ে সব জায়গায় স্বয়ংক্রিয়ভাবে ডাটা পাঠানো যায়।',
    steps: [
      {
        stepNumber: 1,
        title: 'Inspect Nodes',
        titleBn: 'নোডগুলোর সংযোগ দেখুন',
        description: 'See the trigger, AI processor, validator, and action dispatcher.',
        descriptionBn: 'ট্রিগার থেকে শুরু করে ভ্যালিডেটর এবং ডিসপ্যাচ নোডগুলো পর্যবেক্ষণ করুন।',
      },
      {
        stepNumber: 2,
        title: 'Test Run Pipeline',
        titleBn: 'টেস্ট রান চালিয়ে দেখুন',
        description: 'Watch the live visual pulse move through each node with execution logs.',
        descriptionBn: '"টেস্ট রান পাইপলাইন" বাটনে চাপ দিয়ে রিয়েল-টাইম কনসোল লগ ও মিলি-সেকেন্ড স্পিড দেখুন।',
      },
      {
        stepNumber: 3,
        title: 'Export Standalone Script',
        titleBn: 'পাইথন বা নোড কোড এক্সপোর্ট করুন',
        description: 'Click Export Code to get the standalone Python or Node.js script for your PC.',
        descriptionBn: '"সোর্স কোড এক্সপোর্ট" বাটনে ক্লিক করে ফ্রি স্ক্রিপ্ট ডাউনলোড করে নিজের পিসিতে চালান।',
      },
    ],
    benefit: 'Replaces recurring monthly cloud automation platforms with 100% free self-hostable code.',
    benefitBn: 'ব্যয়বহুল পেইড অটোমেশন সাবস্ক্রিপশন বাদ দিয়ে নিজের কম্পিউটারে সম্পূর্ণ ফ্রিতে চালানো যায়।',
  },
];

interface UserLearningHubProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
}

export const UserLearningHub: React.FC<UserLearningHubProps> = ({
  language,
  onNavigateTab,
}) => {
  const isBn = language === 'bn';

  const [guides] = useState<UserTutorialSection[]>(DEFAULT_GUIDES);
  const [activeGuideId, setActiveGuideId] = useState<string>(guides[0].id);

  const activeGuide = guides.find((g) => g.id === activeGuideId) || guides[0];

  return (
    <div className="space-y-8">
      {/* Module Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
              <span>{isBn ? 'লার্নিং সেন্টার' : 'LEARNING HUB'}</span>
              <span aria-hidden="true">·</span>
              <span>{isBn ? 'সফটওয়্যার ব্যবহার নির্দেশিকা' : 'How It Works & Tutorials'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-semibold">{isBn ? '১০০% ফ্রি নলেজ' : '100% Free'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {isBn
                ? 'এই সফটওয়্যার দিয়ে আপনি কী কী করতে পারবেন এবং কীভাবে ব্যবহার করবেন?'
                : 'How to Master AutoFlow Studio: Features, Tutorials & Benefits'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isBn
                ? 'এখানে প্রতিটি মডিউলের বিস্তারিত কাজের নিয়ম এবং বাস্তব উদাহরণ দেওয়া হয়েছে। আপনি কীভাবে একটি কনসেপ্ট থেকে একাধিক সোশ্যাল পোস্ট বানাবেন, ক্লায়েন্টকে সাথে সাথে কোটেশন পাঠাবেন এবং সম্পূর্ণ ফ্রিতে নিজের পিসিতে অটোমেশন চালাবেন তা ধাপে ধাপে শিখুন।'
                : 'Learn step-by-step how AutoFlow Studio eliminates manual work and replaces expensive $200+/month software subscriptions with zero-cost automated workflows.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                {isBn ? 'সোশ্যাল মিডিয়া অটোমেশন' : 'Content Repurposing'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                {isBn ? 'ক্লায়েন্ট কোটেশন ও ইনভয়েস' : 'Instant Client Quoting'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                {isBn ? 'ভিজুয়াল নোড ওয়ার্কফ্লো' : 'Visual Node Builder'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-4 min-h-[176px] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  Zero Latency
                </span>
                <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-[10px] border border-indigo-500/30">
                  Self-Hosted
                </span>
              </div>
              <div className="text-center my-auto py-2">
                <h4 className="text-white font-bold text-sm tracking-wide">AutoFlow Studio</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  {isBn ? 'সম্পূর্ণ ফ্রি বিজনেস অটোমেশন' : '100% Free Automation'}
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-800/80 pt-2">
                <span>Python + Node.js</span>
                <span className="text-emerald-400 font-bold">100% Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Guide Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Topics Selector */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {isBn ? 'ব্যবহার নির্দেশিকা বিষয়সূচি' : 'Tutorial Modules'}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isBn ? 'যেকোনো বিষয়ে ক্লিক করে বিস্তারিত জানুন' : 'Select a topic to view step-by-step instructions'}
            </p>
          </div>

          <div className="space-y-2">
            {guides.map((g, idx) => {
              const isActive = g.id === activeGuideId;
              return (
                <div
                  key={g.id}
                  onClick={() => setActiveGuideId(g.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-indigo-500 bg-slate-950 text-white shadow-md'
                      : 'border-slate-800/80 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block font-semibold">
                    {isBn ? g.categoryBn : g.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200 mt-1">
                    {isBn ? g.titleBn : g.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Step-by-Step Deep Dive */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 block">
                {isBn ? activeGuide.categoryBn : activeGuide.category}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                {isBn ? activeGuide.titleBn : activeGuide.title}
              </h2>
            </div>

            <button
              onClick={() => {
                if (activeGuide.id === 'guide-repurposing') onNavigateTab('repurposer');
                if (activeGuide.id === 'guide-lead-quoter') onNavigateTab('lead-quoter');
                if (activeGuide.id === 'guide-workflow') onNavigateTab('workflow');
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md transition-colors"
            >
              <span>{isBn ? 'এই টুলে যান' : 'Launch This Tool'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Summary Quote */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {isBn ? activeGuide.summaryBn : activeGuide.summary}
          </div>

          {/* Steps Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isBn ? 'ধাপে ধাপে ব্যবহারের নিয়ম:' : 'Step-by-Step Instructions:'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeGuide.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2 relative"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center font-mono font-bold text-xs">
                    {st.stepNumber}
                  </div>
                  <h4 className="text-xs font-bold text-white">
                    {isBn ? st.titleBn : st.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isBn ? st.descriptionBn : st.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Concrete Measurable Benefit Callout */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                {isBn ? 'আপনার যে উপকার হবে (ROI & Benefit):' : 'Measurable Business Benefit:'}
              </span>
              <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                {isBn ? activeGuide.benefitBn : activeGuide.benefit}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Free Hosting & Deployment Guide Section for Users */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>{isBn ? 'ফ্রি ডেপ্লয়মেন্ট' : 'DEPLOYMENT GUIDE'}</span>
            <span aria-hidden="true">·</span>
            <span>{isBn ? 'নিজের জন্য ফ্রিতে লাইভ করুন' : 'Self-Host Completely Free'}</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {isBn ? 'যে কেউ কীভাবে এই সফটওয়্যারটি ফ্রিতে নিজের ডোমেইনে চালাবেন?' : 'How to Host This Tool Free on Vercel or Netlify'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? 'কোনো সার্ভার খরচ ছাড়াই Vercel বা Netlify-তে সম্পূর্ণ ফ্রিতে এই অ্যাপটি হোস্ট করে আজীবন ব্যবহার করতে পারবেন:'
              : 'Deploy this exact React + Vite application for free with custom domain and automatic SSL.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl border border-indigo-500/60 bg-slate-950 space-y-3">
            <span className="text-xs font-bold text-indigo-400 font-mono">STEP 1: GITHUB</span>
            <h3 className="text-sm font-bold text-white">কোড সংগ্রহ করুন</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn
                ? 'সোর্স কোডটি ডাউনলোড করে আপনার নিজের GitHub রিপোজিটরিতে আপলোড করুন।'
                : 'Clone or upload this repository to your own GitHub account.'}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
            <span className="text-xs font-bold text-teal-400 font-mono">STEP 2: VERCEL</span>
            <h3 className="text-sm font-bold text-white">ভার্সেলে কানেক্ট করুন</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn
                ? 'vercel.com-এ গিয়ে "Import Project" দিয়ে আপনার গিটহাব রিপোজিটরি সিলেক্ট করুন।'
                : 'Log in to vercel.com and import your GitHub repository in 1 click.'}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
            <span className="text-xs font-bold text-emerald-400 font-mono">STEP 3: 100% FREE</span>
            <h3 className="text-sm font-bold text-white">আজীবন ফ্রি চালান</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn
                ? 'Deploy চাপলেই আপনি একটি ফ্রি লাইভ লিঙ্ক পাবেন যা দিয়ে মোবাইল বা পিসি থেকে ব্যবহার করতে পারবেন।'
                : 'Click Deploy. In 30 seconds you get a live HTTPS URL with zero hosting charges.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
