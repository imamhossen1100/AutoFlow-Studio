import React, { useState } from 'react';
import {
  Zap,
  Briefcase,
  GitBranch,
  Calculator,
  Activity,
  BookOpen,
  Key,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Server,
  Layers,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Clock,
  Terminal,
  ExternalLink,
  Code2,
  FileCode,
  Sliders,
  Cpu,
  Share2,
  Workflow,
  HelpCircle,
  TrendingUp,
  Lock,
  ArrowUpRight,
} from 'lucide-react';
import { Language } from '../types/automation';
import { SupportDonationBanner } from './SupportDonationBanner';

interface LandingPageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onNavigateTab: (tabId: string) => void;
  onOpenApiKeyModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  setLanguage,
  onNavigateTab,
  onOpenApiKeyModal,
}) => {
  const isBn = language === 'bn';

  // State for interactive code previewer on landing page
  const [activeCodeTab, setActiveCodeTab] = useState<'python' | 'node' | 'curl'>('python');
  const [copiedCode, setCopiedCode] = useState(false);

  // State for FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // State for interactive demo card simulation
  const [demoTopic, setDemoTopic] = useState('How to Automate 50 Hours of Work per Month with AI');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedComplete, setSimulatedComplete] = useState(true);

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulatedComplete(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedComplete(true);
    }, 700);
  };

  const samplePythonCode = `"""
AutoFlow Studio - 100% Free Edge Automation Bot
Runs locally or on free cloud tier (Vercel / GitHub Actions / VPS)
Zero Monthly Subscription Fees Forever.
"""
import requests, json, time

API_WEBHOOK_URL = "https://your-domain.vercel.app/api/webhook"

def run_automation_pipeline(topic: str):
    print(f"[+] Starting automation for topic: {topic}")
    start = time.time()
    
    # Step 1: AI Engine Processing via Free Google Gemini
    payload = {
        "event": "NEW_CONTENT_TOPIC",
        "topic": topic,
        "engine": "gemini-2.5-flash",
        "timestamp": int(time.time())
    }
    print("[1] AI Transformation: Generating SEO title, 60s script & social thread...")
    
    # Step 2: Multi-Platform Dispatch
    print("[2] Dispatcher: Broadcasting to connected webhooks (YouTube/LinkedIn/Twitter)...")
    
    duration = round((time.time() - start) * 1000, 2)
    print(f"[✓] Automation finished in {duration}ms. License cost: $0.00")

if __name__ == "__main__":
    run_automation_pipeline("${demoTopic}")`;

  const sampleNodeCode = `// AutoFlow Studio - Standalone Node.js Automation Bot
// Zero subscriptions. Run via: node autoflow-bot.js
import fetch from 'node-fetch';

async function executePipeline(topic) {
  console.log('🚀 Triggering pipeline for:', topic);
  const start = Date.now();

  const payload = {
    topic,
    engine: 'gemini-2.5-flash',
    timestamp: new Date().toISOString()
  };

  console.log('🧠 AI Engine processing YouTube SEO, Shorts Script & LinkedIn copy...');
  console.log('📡 Multi-destination webhooks dispatched in parallel.');

  const elapsed = Date.now() - start;
  console.log(\`✅ Pipeline completed in \${elapsed}ms. Saved: $100/mo\`);
}

executePipeline('${demoTopic}');`;

  const sampleCurlCode = `# Trigger your AutoFlow Studio Edge Webhook instantly
curl -X POST https://your-domain.vercel.app/api/webhook \\
  -H "Content-Type: application/json" \\
  -d '{
    "topic": "${demoTopic}",
    "channels": ["youtube", "shorts", "linkedin", "twitter"],
    "cost": 0.00
  }'`;

  const getCodeSnippet = () => {
    switch (activeCodeTab) {
      case 'python':
        return samplePythonCode;
      case 'node':
        return sampleNodeCode;
      case 'curl':
        return sampleCurlCode;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Feature cards data
  const features = [
    {
      id: 'repurposer',
      tabId: 'repurposer',
      icon: Zap,
      badge: isBn ? 'এআই কন্টেন্ট রিপারপাস' : '1-to-5 Content Engine',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      title: isBn ? 'সোশ্যাল মিডিয়া কন্টেন্ট রিপারপাসার' : 'Autonomous Content Repurposer',
      desc: isBn
        ? 'একটিমাত্র টপিক বা আইডিয়া লিখে দিন। জেমিনি এআই সাথে সাথে হাই-সিপিএম ইউটিউব টাইটেল ও এসইও ট্যাগস, ৬০ সেকেন্ডের ভাইরাল শর্টস স্ক্রিপ্ট (ভিজ্যুয়াল কিউ সহ), লিঙ্কডইন অথরিটি পোস্ট এবং টুইটার থ্রেড তৈরি করে দেবে।'
        : 'Feed in a single topic or prompt. AutoFlow generates optimized YouTube SEO, a 60-second viral Shorts script with visual camera directions, an engaging LinkedIn authority post, and a 5-part Twitter/X thread in seconds.',
      actionText: isBn ? 'রিপারপাসার ব্যবহার করুন' : 'Launch Repurposer',
      tags: ['Google Gemini', 'YouTube SEO', 'Shorts Script', 'LinkedIn Post', 'X Thread'],
    },
    {
      id: 'lead-quoter',
      tabId: 'lead-quoter',
      icon: Briefcase,
      badge: isBn ? 'এজেন্সি রেভিনিউ' : 'Agency Lead Generator',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      title: isBn ? 'ক্লায়েন্ট লিড ও কোটেশন জেনারেটর' : 'Client Lead Quoter & Margin Simulator',
      desc: isBn
        ? 'ক্লায়েন্টের রিকয়ারমেন্ট সিলেক্ট করে এক ক্লিকে প্রফেশনাল বাজেট কোটেশন, ডেলিভারি টাইমলাইন এবং হাই-কনভার্টিং পিচ প্রপোজাল তৈরি করুন। ফ্রিল্যান্সার ও এজেন্সিদের জন্য ইনস্ট্যান্ট রেভিনিউ টুল।'
        : 'Configure client project parameters, select automation scope, and instantly generate enterprise-grade quotes with net profit margins and high-converting client proposal copy ready to send.',
      actionText: isBn ? 'কোটেশন জেনারেটরে যান' : 'Create Proposals',
      tags: ['Tier Pricing', 'Instant Proposal', 'Margin Calculator', '1-Click Export'],
    },
    {
      id: 'workflow',
      tabId: 'workflow',
      icon: GitBranch,
      badge: isBn ? 'ভিজ্যুয়াল ক্যানভাস' : 'Node-Based Builder',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      title: isBn ? 'ভিজ্যুয়াল ওয়ার্কফ্লো নোড বিল্ডার' : 'Visual Workflow Canvas & Node Builder',
      desc: isBn
        ? 'আধুনিক ও সম্পূর্ণ ইন্টারঅ্যাক্টিভ ভিজ্যুয়াল নোড ক্যানভাসে ড্র্যাগ ও ড্রপ করে এআই ট্রিগার, ফিল্টার এবং মাল্টি-চ্যানেল অ্যাকশন কানেক্ট করুন। তৈরি করা ওয়ার্কফ্লো সরাসরি পাইথন বা নোড জেএস কোডে এক্সপোর্ট করুন।'
        : 'Connect webhooks, AI models, conditional logic, and dispatch targets on an interactive canvas. Zero vendor lock-in: export every pipeline directly to standalone runnable Python and Node.js bots.',
      actionText: isBn ? 'ওয়ার্কফ্লো ক্যানভাস খুলুন' : 'Explore Canvas',
      tags: ['Drag-and-Drop', 'Live Connections', 'Code Exporter', 'Zero Lock-in'],
    },
    {
      id: 'calculator',
      tabId: 'calculator',
      icon: Calculator,
      badge: isBn ? 'খরচ সাশ্রয়' : 'Cost Simulator',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      title: isBn ? 'SaaS খরচ সাশ্রয় ক্যালকুলেটর' : 'SaaS Replacement ROI Calculator',
      desc: isBn
        ? 'ব্যয়বহুল পেইড সাবস্ক্রিপশন ও থার্ড-পার্টি টুলের বিপরীতে AutoFlow Studio ব্যবহারে আপনার বা আপনার ক্লায়েন্টের প্রতি মাসে ও বছরে কত টাকা সেভ হচ্ছে তা রিয়েল-টাইমে হিসাব করুন।'
        : 'Calculate your exact net monthly and annual savings against recurring paid SaaS subscriptions ($100-300+/mo). See immediate ROI for agencies and solo creators.',
      actionText: isBn ? 'আপনার সেভিংস মাপুন' : 'Calculate ROI',
      tags: ['Cost Elimination', '100% Free Tool', '$4,800/yr Saved', 'Agency Economics'],
    },
    {
      id: 'logs',
      tabId: 'logs',
      icon: Activity,
      badge: isBn ? 'লাইভ টেলিমেট্রি' : 'Live Edge Telemetry',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      title: isBn ? 'লাইভ ওয়েবহুক ও এক্সিকিউশন লগস' : 'Live Webhooks & Event Telemetry',
      desc: isBn
        ? 'প্রত্যেকটি অটোমেশন রানের লাইভ স্ট্যাটাস, সাব-সেকেন্ড ল্যাটেন্সি (ms), এইচটিটিপি স্ট্যাটাস এবং ফুল পেলোড JSON বডি ইন্সপেক্ট করুন। সম্পূর্ণ ট্রান্সপারেন্ট এবং রিয়েল-টাইম অডিটিং।'
        : 'Inspect sub-second execution speeds, full request payloads, HTTP response statuses, and event streams. Complete visibility into your edge automation pipelines with zero telemetry tax.',
      actionText: isBn ? 'লাইভ লগস দেখুন' : 'View Telemetry',
      tags: ['Sub-second Logs', 'Payload Inspector', 'cURL Replay', 'Edge Health'],
    },
    {
      id: 'learning-hub',
      tabId: 'learning-hub',
      icon: BookOpen,
      badge: isBn ? 'ডকুমেন্টেশন' : 'Production Docs',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      title: isBn ? 'ব্যবহার নির্দেশিকা ও প্লেবুক' : 'Agency Playbook & Learning Hub',
      desc: isBn
        ? 'কীভাবে ক্লায়েন্টদের $500 - $2,000 এআই অটোমেশন সার্ভিস অফার করবেন, কীভাবে জেমিনি এআই কি কনফিগার করবেন এবং গিটহাব ও ভার্সেলে সহজে ডেপ্লয় করবেন—তার সম্পূর্ণ বাংলা গাইড।'
        : 'Step-by-step master guides, agency pricing frameworks, Google Gemini free tier configuration blueprints, and Vercel zero-config deployment tutorials.',
      actionText: isBn ? 'লার্নিং হাব পড়ুন' : 'Open Playbook',
      tags: ['Agency Playbook', 'Vercel Deployment', 'API Guides', '100% Free'],
    },
  ];

  // Comparison matrix data
  const comparisonItems = [
    {
      feature: isBn ? 'মাসিক সাবস্ক্রিপশন ফি' : 'Monthly Base Fee',
      autoflow: '$0 / mo (100% Free)',
      paidToolA: '$75 - $300+ / mo',
      paidToolB: '$49 - $199+ / mo',
      highlight: true,
    },
    {
      feature: isBn ? 'এআই টাস্ক ও এক্সিকিউশন লিমিট' : 'AI Runs & Task Limits',
      autoflow: isBn ? 'আনলিমিটেড (ফ্রি জেমিনি কোটা)' : 'Unlimited (Free Gemini Quota)',
      paidToolA: isBn ? 'টাস্ক প্রতি অতিরিক্ত চার্জ' : 'Strict monthly task cap',
      paidToolB: isBn ? 'টাস্ক প্রতি অতিরিক্ত চার্জ' : 'Tiered operation cap',
      highlight: true,
    },
    {
      feature: isBn ? 'সোর্স কোড ও সেলফ-হোস্টিং' : 'Source Code & Ownership',
      autoflow: isBn ? 'সম্পূর্ণ আপনার নিয়ন্ত্রণে (GitHub/Vercel)' : '100% Open Code (GitHub/Vercel)',
      paidToolA: isBn ? 'বন্ধ প্রোপাইটরি ক্লাউড' : 'Closed Proprietary Cloud',
      paidToolB: isBn ? 'বন্ধ প্রোপাইটরি ক্লাউড' : 'Closed Proprietary Cloud',
      highlight: false,
    },
    {
      feature: isBn ? 'স্ট্যান্ডঅ্যালোন পাইথন/জেএস বট' : 'Standalone Python & Node.js Bots',
      autoflow: isBn ? 'অন্তর্ভুক্ত (পিসিতেও চলে)' : 'Included (Runs on PC/VPS)',
      paidToolA: isBn ? 'নেই (পেইড কোড স্টেপ)' : 'Requires expensive plan',
      paidToolB: isBn ? 'নেই' : 'Not supported',
      highlight: false,
    },
    {
      feature: isBn ? 'ক্লায়েন্ট প্রপোজাল ও কোটেশন মেকার' : 'Client Lead Quoter & Margin Simulator',
      autoflow: isBn ? 'বিল্ট-ইন ফ্রিল্যান্সার স্যুট' : 'Built-in Agency Suite',
      paidToolA: isBn ? 'নেই (আলাদা পেইড টুল লাগবে)' : 'Not available',
      paidToolB: isBn ? 'নেই (আলাদা পেইড টুল লাগবে)' : 'Not available',
      highlight: true,
    },
    {
      feature: isBn ? 'ডেপ্লয়মেন্ট জটিলতা' : 'Deployment Setup Time',
      autoflow: isBn ? '১-ক্লিক ভার্সেল / গিটহাব' : '1-Click Vercel / GitHub',
      paidToolA: isBn ? 'লকড-ইন অ্যাকাউন্ট' : 'Account subscription required',
      paidToolB: isBn ? 'লকড-ইন অ্যাকাউন্ট' : 'Account subscription required',
      highlight: false,
    },
  ];

  // FAQ data
  const faqs = [
    {
      q: isBn
        ? 'অটোফ্লো স্টুডিও সত্যিই কি সম্পূর্ণ ফ্রি ($0/মাস)? কোনো লুকানো ফি আছে কি?'
        : 'Is AutoFlow Studio truly $0/month forever? Are there any hidden costs?',
      a: isBn
        ? 'হ্যাঁ, এটি ১০০% ফ্রি ও ওপেন সোর্স। এটি কোনো ক্লাউড সাবস্ক্রিপশন চার্জ করে না। Google Gemini AI-এর অফিসিয়াল ফ্রি টিয়ার ব্যবহার করে মাসে লাখ লাখ ফ্রি টোকেন পাওয়া যায়। এছাড়া এটি Vercel বা আপনার নিজের কম্পিউটারে জিরো ডলারে চালানো যায়।'
        : 'Yes, 100% free and open-source under MIT. There is zero subscription lock-in. It leverages Google Gemini AI’s official free tier (millions of free tokens monthly) and can be hosted for $0 on Vercel or run locally on your machine.',
    },
    {
      q: isBn
        ? 'আমি কীভাবে এটি গিটহাবে আপলোড করব এবং ভার্সেলে ডেপ্লয় করব?'
        : 'How do I push this to GitHub and deploy to Vercel?',
      a: isBn
        ? 'খুবই সহজ! গিটহাবে আপনার রিপোজিটরিতে কোড পুশ করুন (git add . -> git commit -m "update" -> git push)। এরপর Vercel.com-এ গিয়ে আপনার GitHub একাউন্ট কানেক্ট করে রিপোজিটরিটি সিলেক্ট করে "Deploy" চাপলেই ৩০ সেকেন্ডের মধ্যে লাইভ লিঙ্ক তৈরি হয়ে যাবে।'
        : 'Super straightforward! Push your code to your GitHub repo (git add . && git commit -m "update" && git push). Then log in to Vercel.com, click "Add New Project", import your repo, and hit "Deploy". Your production URL will be live in 30 seconds.',
    },
    {
      q: isBn
        ? 'গুগল জেমিনি এআই এপিআই কী কীভাবে যুক্ত করব?'
        : 'How do I configure my Google Gemini AI API Key?',
      a: isBn
        ? 'টপ হেডার বা সাইডবারের "জেমিনি এআই কি" বাটনে ক্লিক করুন। aistudio.google.com থেকে ১ মিনিটে আপনার ফ্রি API Key সংগ্রহ করে বক্সে পেস্ট করে সেভ করুন। যদি কি নাও দেন, তবুও বিল্ট-ইন ফলব্যাক বুদ্ধিমত্তা দিয়ে সফটওয়্যারের প্রতিটি ফিচার কাজ করবে।'
        : 'Click the "AI Engine" key button in the top header or sidebar. Get a free API key from aistudio.google.com in 60 seconds and paste it. If you choose not to provide a key, built-in intelligent fallback templates will keep every feature functional.',
    },
    {
      q: isBn
        ? 'এজেন্সি বা ফ্রিল্যান্সাররা কীভাবে এটি দিয়ে টাকা আয় করতে পারে?'
        : 'How can agencies and freelancers monetize AutoFlow Studio?',
      a: isBn
        ? 'আপনি ক্লায়েন্টদের জন্য সোশ্যাল মিডিয়া অটোমেশন, ইউটিউব টু শর্টস অটোমেশন অথবা কাস্টম ওয়ার্কফ্লো সেটআপ করে প্রতি ক্লায়েন্টের কাছ থেকে $300 থেকে $1,500 চার্জ করতে পারেন। "ক্লায়েন্ট লিড ও কোটেশন জেনারেটর" দিয়ে কয়েক সেকেন্ডে ক্লায়েন্টের জন্য প্রফেশনাল প্রপোজাল তৈরি করে পাঠাতে পারবেন।'
        : 'Agencies can package content repurposing and business automation services for clients at $500–$2,000/month retainer. Use the built-in Client Lead Quoter to generate branded proposals with custom profit margins and deliver high-value automations with zero overhead.',
    },
    {
      q: isBn
        ? 'ভিজ্যুয়াল ক্যানভাস থেকে তৈরি করা কোড কোথায় চালানো যায়?'
        : 'Where can the generated Python and Node.js automation bots run?',
      a: isBn
        ? 'তৈরি করা Python (`autoflow_bot.py`) বা JavaScript (`autoflow_bot.js`) ফাইল আপনার পার্সোনাল ল্যাপটপ, ফ্রি ওরাকল/গুগল ক্লাউড VPS, রাস্পবেরি পাই বা GitHub Actions-এ সম্পূর্ণ বিনামূল্যে অটো-শিডিউলে চালানো যায়।'
        : 'The exported Python and Node.js automation bots have zero cloud dependencies. You can run them locally on your PC, on a Raspberry Pi, on GitHub Actions, or on any free tier VPS via cron schedule.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 -left-48 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] -right-48 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none -z-10" />

      {/* Modern SaaS Landing Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-600/30">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white tracking-tight">
                  AutoFlow Studio
                </span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono font-semibold">
                  v2.5 SaaS
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:block">
                {isBn ? '১০০% ফ্রি ওপেন সোর্স এআই অটোমেশন' : 'Next-Gen Autonomous AI Workflow Engine'}
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">
              {isBn ? 'ফিচারসমূহ' : 'Features'}
            </a>
            <a href="#demo" className="hover:text-white transition-colors">
              {isBn ? 'লাইভ ডেমো' : 'Live Demo'}
            </a>
            <a href="#comparison" className="hover:text-white transition-colors">
              {isBn ? 'তুলনামূলক পার্থক্য' : 'Comparison'}
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">
              {isBn ? 'আর্কিটেকচার' : 'Architecture'}
            </a>
            <a href="#bots" className="hover:text-white transition-colors">
              {isBn ? 'ফ্রি বট কোড' : 'Code Bots'}
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              {isBn ? 'প্রশ্নোত্তর (FAQ)' : 'FAQ'}
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isBn ? 'en' : 'bn')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-mono text-xs font-semibold">{isBn ? 'EN' : 'বাং'}</span>
            </button>

            {/* Launch App Button */}
            <button
              onClick={() => onNavigateTab('repurposer')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? 'স্টুডিও ড্যাশবোর্ড খুলুন ⚡' : 'Launch Studio Dashboard ⚡'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 mb-8 shadow-inner">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">{isBn ? 'নতুন ভার্সন ২.৫' : 'New Release v2.5'}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            {isBn ? 'ব্যয়বহুল পেইড সাবস্ক্রিপশন ও অতিরিক্ত বিল চিরতরে বন্ধ করুন' : 'Zero Subscription · 100% Free Edge Automation'}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          {isBn ? (
            <>
              ব্যয়বহুল পেইড সাবস্ক্রিপশন ও অতিরিক্ত ফি বাদ দিন।{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                $০ খরচে এআই অটোমেশন চালান।
              </span>
            </>
          ) : (
            <>
              Stop Paying Heavy Monthly SaaS Bills.{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Run Autonomous AI Workflows for $0.
              </span>
            </>
          )}
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {isBn
            ? 'ফ্রিল্যান্সার, কন্টেন্ট ক্রিয়েটর ও এজেন্সিদের জন্য তৈরি সম্পূর্ণ ফ্রি এন্টারপ্রাইজ অটোমেশন প্ল্যাটফর্ম। ১-ক্লিকে ইউটিউব এসইও, শর্টস স্ক্রিপ্ট, সোশ্যাল কপি, ক্লায়েন্ট কোটেশন ও ভিজ্যুয়াল নোড পাইপলাইন তৈরি করুন।'
            : 'The modern self-hosted workflow platform replacing expensive monthly automation subscriptions. Multi-channel content repurposing, client lead pricing, visual canvas, and standalone Python/Node edge bots with zero cloud markups.'}
        </p>

        {/* Hero CTA Cluster */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigateTab('repurposer')}
            className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-xl shadow-indigo-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isBn ? 'ফ্রি স্টুডিও শুরু করুন (১০০% ফ্রি)' : 'Start Free in Studio (No CC Required)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigateTab('calculator')}
            className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 border border-slate-800 hover:border-slate-700 hover:text-white rounded-xl transition-all cursor-pointer shadow-md"
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>{isBn ? 'সেভিংস হিসাব করুন ($৪,৮০০/বছর)' : 'Calculate ROI ($4,800/yr Saved)'}</span>
          </button>

          <a
            href="#bots"
            className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>{isBn ? 'বট কোড ও আর্কিটেকচার' : 'View Code & Bots'}</span>
          </a>
        </div>

        {/* Trust & Deployment Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isBn ? 'কোনো ক্রেডিট কার্ড প্রয়োজন নেই' : 'No Credit Card Needed'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isBn ? 'ভার্সেল ও গিটহাবে ১-ক্লিকে ডেপ্লয়' : '1-Click Vercel & GitHub Deploy'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isBn ? 'গুগল জেমিনি ফ্রি এআই কোটা' : 'Google Gemini Free AI Tier'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isBn ? 'এমআইটি ওপেন সোর্স লাইসেন্স' : 'MIT Open Source License'}</span>
          </div>
        </div>

        {/* HERO INTERACTIVE WORKBENCH PREVIEW */}
        <div id="demo" className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-2 sm:p-3 border border-slate-800 shadow-2xl shadow-indigo-950/40 relative">
            {/* Window title bar mockup */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="font-mono text-slate-400 text-[11px] ml-2">
                  autoflow-studio.cloud/workspace-01
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400">Edge Pipeline Active</span>
              </div>
            </div>

            {/* Interactive Demo Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left p-2 sm:p-4 bg-slate-950/90 rounded-xl border border-slate-800/60">
              {/* Left Column: Topic input & controls */}
              <div className="lg:col-span-5 space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  {isBn ? '১টি টপিক ইনপুট দিন (Live Pipeline Trigger):' : 'Enter Topic (Simulate Live Automation):'}
                </label>
                <input
                  type="text"
                  value={demoTopic}
                  onChange={(e) => setDemoTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter content topic..."
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSimulate}
                    disabled={isSimulating}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Zap className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                    <span>{isSimulating ? (isBn ? 'প্রসেসিং হচ্ছে...' : 'Processing...') : (isBn ? 'পাইপলাইন রান করুন ⚡' : 'Trigger Automation ⚡')}</span>
                  </button>
                  <button
                    onClick={() => onNavigateTab('repurposer')}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                    title="Open in Full Repurposer App"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Pipeline Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center font-mono">
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{isBn ? 'স্পিড' : 'Speed'}</span>
                    <span className="text-xs font-bold text-amber-400">320ms</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{isBn ? 'খরচ' : 'Cost'}</span>
                    <span className="text-xs font-bold text-emerald-400">$0.00</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">{isBn ? 'চ্যানেল' : 'Outputs'}</span>
                    <span className="text-xs font-bold text-indigo-400">5x Multi</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Instant Live Output Preview */}
              <div className="lg:col-span-7 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    {isBn ? 'মাল্টি-চ্যানেল এআই আউটপুট প্রিভিউ' : 'Multi-Channel AI Output Stream'}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Gemini 2.5 Flash
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] text-indigo-400 font-mono font-medium mb-1">
                      <span>🎬 YouTube SEO & Title</span>
                      <span className="text-slate-500">CPM Score: 94/100</span>
                    </div>
                    <p className="text-white font-medium text-xs truncate">
                      {demoTopic}: Step-by-Step Autonomous Workflow Blueprint (2026)
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono font-medium mb-1">
                      <span>📱 60-Sec Shorts / Reels Script</span>
                      <span className="text-slate-500">Visual Cues Included</span>
                    </div>
                    <p className="text-slate-300 text-[11px] line-clamp-2">
                      [0:00-0:03 Fast Hook] "Still spending 10 hours a week on copy-pasting tasks? Here is how a $0 bot automates your entire workflow..."
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono font-medium mb-1">
                      <span>💼 LinkedIn & Twitter Copy</span>
                      <span className="text-slate-500">B2B Authority Post</span>
                    </div>
                    <p className="text-slate-300 text-[11px] line-clamp-1">
                      Most businesses don't need an expensive $500 monthly stack. Here's our complete open-source blueprint...
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{isBn ? 'স্টুডিওতে গিয়ে ফুল স্ক্রিপ্ট ও কোড কপি করুন' : 'Export and copy complete scripts in studio'}</span>
                  <button
                    onClick={() => onNavigateTab('repurposer')}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isBn ? 'স্টুডিও ওপেন করুন' : 'Open Full Tool'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION METRIC STRIP */}
      <section className="border-y border-slate-800/80 bg-slate-900/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">$0 / mo</div>
            <div className="text-xs sm:text-sm font-medium text-slate-300">
              {isBn ? '১০০% ফ্রি সফটওয়্যার লাইসেন্স' : 'Zero Subscription Fees'}
            </div>
            <p className="text-[11px] text-slate-500">
              {isBn ? 'কোনো হিডেন পেমেন্ট গেটওয়ে নেই' : 'No credit card trap or monthly bill'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">$4,800+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-300">
              {isBn ? 'বাৎসরিক গড় সাশ্রয়' : 'Annual Average Savings'}
            </div>
            <p className="text-[11px] text-slate-500">
              {isBn ? 'ব্যয়বহুল পেইড সাবস্ক্রিপশন রিপ্লেসমেন্ট' : 'Replaces 5+ expensive monthly tools'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">&lt; 350ms</div>
            <div className="text-xs sm:text-sm font-medium text-slate-300">
              {isBn ? 'এজ এক্সিকিউশন স্পিড' : 'Edge Webhook Latency'}
            </div>
            <p className="text-[11px] text-slate-500">
              {isBn ? 'সাব-সেকেন্ড রিয়েল-টাইম রেসপন্স' : 'Ultra-fast sub-second response times'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">100%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-300">
              {isBn ? 'সোর্স কোড ও ডাটা আপনার' : 'Code & Data Ownership'}
            </div>
            <p className="text-[11px] text-slate-500">
              {isBn ? 'আপনার নিজস্ব GitHub ও Vercel-এ' : 'Deploy freely anywhere with no lock-in'}
            </p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SHOWCASE GRID */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            {isBn ? 'সম্পূর্ণ ফিচার স্যুট' : 'Full Feature Suite'}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
            {isBn
              ? 'একটি প্ল্যাটফর্মেই সবকিছু—কোনো পেইড টুলের প্রয়োজন নেই'
              : 'Everything You Need to Run Autonomous Operations'}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {isBn
              ? 'কন্টেন্ট জেনারেশন থেকে শুরু করে ক্লায়েন্ট কোটেশন, ভিজ্যুয়াল ওয়ার্কফ্লো এবং লাইভ লগস—প্রতিটি ফিচার প্রফেশনাল স্ট্যান্ডার্ডে তৈরি।'
              : 'Enterprise-grade building blocks crafted for agency owners, growth hackers, and developers.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${feat.badgeColor}`}>
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {feat.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {feat.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab(feat.tabId)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer border border-slate-700/60 hover:border-transparent"
                >
                  <span>{feat.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ARCHITECTURE DIAGRAM SECTION */}
      <section id="architecture" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              {isBn ? 'সিস্টেম আর্কিটেকচার' : 'System Architecture'}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white">
              {isBn ? 'কীভাবে এটি ৩টি ধাপে কাজ করে?' : 'How the Autonomous Pipeline Works'}
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              {isBn
                ? 'কোনো জটিল কনফিগারেশন নেই। জিরো ক্লাউড কস্টে অতি দ্রুত এক্সিকিউশন নিশ্চিত করা হয়েছে।'
                : 'Zero-overhead edge routing powered by free Google Gemini AI intelligence and direct webhooks.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <div className="text-xs font-mono font-bold text-indigo-400 mb-2">STEP 01</div>
              <h3 className="text-base font-bold text-white mb-2">
                {isBn ? '১. ট্রিগার ও ইনজেস্ট' : '1. Ingest & Trigger'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {isBn
                  ? 'আপনার টপিক, ক্লায়েন্ট রিকয়ারমেন্ট বা কাস্টম ওয়েবহুক ইনপুট দিন। নোড অথবা পাইথন বট সরাসরি ডাটা গ্রহণ করে।'
                  : 'Receive incoming webhook triggers, form inputs, or manual topic prompts with normalized JSON validation.'}
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800/80">
                POST /api/webhook {'->'} Topic payload
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <div className="text-xs font-mono font-bold text-cyan-400 mb-2">STEP 02</div>
              <h3 className="text-base font-bold text-white mb-2">
                {isBn ? '২. এআই ইন্টেলিজেন্স ইঞ্জিন' : '2. Gemini AI Processing'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {isBn
                  ? 'গুগল জেমিনি এআই সাথে সাথে কন্টেন্ট স্ট্রাকচার, এসইও টাইটেল, শর্টস ডিরেকশন এবং সোশ্যাল থ্রেড জেনারেট করে।'
                  : 'Transform raw ideas into multi-format assets: viral video scripts, high-CPM SEO metadata, and agency quotes.'}
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-cyan-300 border border-slate-800/80">
                Google Gemini API {'->'} Free Tier Tokens
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <div className="text-xs font-mono font-bold text-emerald-400 mb-2">STEP 03</div>
              <h3 className="text-base font-bold text-white mb-2">
                {isBn ? '৩. মাল্টি-চ্যানেল ব্রডকাস্ট' : '3. Edge Webhook Dispatch'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {isBn
                  ? 'সাব-সেকেন্ড স্পিডে ইউটিউব, লিঙ্কডইন, টুইটার, ডিসকর্ড বা ক্লায়েন্ট ড্যাশবোর্ডে ডাটা পাঠিয়ে দেয়।'
                  : 'Broadcast to connected social endpoints, databases, and client dashboards concurrently in under 350ms.'}
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-emerald-400 border border-slate-800/80">
                Status 200 OK {'->'} Latency: &lt; 350ms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE SECTION */}
      <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-emerald-400 tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {isBn ? 'খরচের তুলনা' : 'Direct Comparison'}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white">
            {isBn ? 'AutoFlow Studio বনাম অন্যান্য পেইড প্ল্যাটফর্ম' : 'AutoFlow Studio vs. Paid Automation Platforms'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            {isBn
              ? 'কেন অটোফ্লো স্টুডিও ব্যবহার করলে কোনো মাসিক বিল দিতে হয় না?'
              : 'Why teams and agencies are moving away from restrictive cloud automation tolls.'}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 text-xs font-mono uppercase">
                <th className="py-4 px-4 sm:px-6">{isBn ? 'ফিচার / মানদণ্ড' : 'Feature / Dimension'}</th>
                <th className="py-4 px-4 sm:px-6 text-emerald-400 bg-emerald-500/10 font-bold">
                  AutoFlow Studio (This App)
                </th>
                <th className="py-4 px-4 sm:px-6">{isBn ? 'পেইড অটোমেশন টুল A' : 'Traditional Paid Platform A'}</th>
                <th className="py-4 px-4 sm:px-6">{isBn ? 'পেইড অটোমেশন টুল B' : 'Commercial Cloud Suite B'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisonItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-300">
                    {item.feature}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-400 bg-emerald-500/5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item.autoflow}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-400">
                    {item.paidToolA}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-400">
                    {item.paidToolB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CODE & STANDALONE BOTS SECTION */}
      <section id="bots" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              {isBn ? 'স্ট্যান্ডঅ্যালোন এজ কোড' : 'Standalone Edge Code'}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white">
              {isBn ? 'জিরো সাবস্ক্রিপশন অটোমেশন স্ক্রিপ্ট' : '100% Free Python & Node.js Edge Bots'}
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              {isBn
                ? 'ক্লাউড সাবস্ক্রিপশনের দরকার নেই। এই স্ক্রিপ্টগুলো আপনার কম্পিউটার বা যেকোনো ফ্রি সার্ভারে সরাসরি রান করুন।'
                : 'Self-contained code blueprints ready to run locally, on VPS, or via cron.'}
            </p>
          </div>

          {/* Interactive Code Viewer Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            {/* Code Tabs Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCodeTab('python')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    activeCodeTab === 'python'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>autoflow_bot.py</span>
                </button>
                <button
                  onClick={() => setActiveCodeTab('node')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    activeCodeTab === 'node'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>autoflow-bot.js</span>
                </button>
                <button
                  onClick={() => setActiveCodeTab('curl')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    activeCodeTab === 'curl'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>cURL Webhook</span>
                </button>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{isBn ? 'কপি হয়েছে!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isBn ? 'কোড কপি করুন' : 'Copy Code'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Pre Box */}
            <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed max-h-[380px] bg-slate-950">
              <pre>{getCodeSnippet()}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-semibold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            {isBn ? 'সাধারণ প্রশ্নোত্তর' : 'Frequently Asked Questions'}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white">
            {isBn ? 'সচরাচর জানতে চাওয়া প্রশ্নাবলী' : 'Everything You Need to Know'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SUPPORT & VOLUNTARY DONATION BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <SupportDonationBanner language={language} />
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-cyan-950/60 border border-slate-800 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {isBn
                ? 'আজই আপনার ওয়ার্কফ্লোকে স্বয়ংক্রিয় করুন'
                : 'Ready to Automate Your Business Operations?'}
            </h2>
            <p className="text-sm text-slate-300">
              {isBn
                ? 'কোনো ক্রেডিট কার্ড নেই, কোনো ট্রায়াল মেয়াদ শেষ হওয়ার ভয় নেই। এখনই স্টুডিও ড্যাশবোর্ড ওপেন করুন।'
                : 'Zero subscription commitments. Launch the studio dashboard directly in your browser.'}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigateTab('repurposer')}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isBn ? 'স্টুডিও ড্যাশবোর্ডে প্রবেশ করুন' : 'Launch Studio Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenApiKeyModal}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:text-white rounded-xl transition-all cursor-pointer"
              >
                <Key className="w-4 h-4 text-amber-400" />
                <span>{isBn ? 'ফ্রি জেমিনি এআই কি যুক্ত করুন' : 'Setup Free Gemini Key'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              ⚡
            </div>
            <div>
              <span className="font-bold text-white text-sm">AutoFlow Studio</span>
              <span className="text-[11px] text-slate-400 block">
                {isBn ? 'ওপেন সোর্স এআই অটোমেশন স্যুট' : 'Autonomous Workflow & Content Repurposing Suite'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-400">
            <button
              onClick={() => onNavigateTab('repurposer')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              {isBn ? 'কন্টেন্ট রিপারপাসার' : 'Repurposer'}
            </button>
            <button
              onClick={() => onNavigateTab('lead-quoter')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              {isBn ? 'ক্লায়েন্ট কোটেশন' : 'Lead Quoter'}
            </button>
            <button
              onClick={() => onNavigateTab('workflow')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              {isBn ? 'ওয়ার্কফ্লো ক্যানভাস' : 'Workflow Canvas'}
            </button>
            <button
              onClick={() => onNavigateTab('calculator')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              {isBn ? 'খরচ সাশ্রয়' : 'ROI Calculator'}
            </button>
            <button
              onClick={() => onNavigateTab('logs')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              {isBn ? 'লাইভ লগস' : 'Telemetry'}
            </button>
            <button
              onClick={() => onNavigateTab('learning-hub')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              {isBn ? 'গাইড ও সেটআপ' : 'Learning Hub'}
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-emerald-400 font-mono">100% Free · MIT License</span>
            <span>·</span>
            <span>Vercel & GitHub Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
