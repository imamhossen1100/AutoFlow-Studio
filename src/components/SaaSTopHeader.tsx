import React from 'react';
import {
  Menu,
  Search,
  Command,
  Sparkles,
  Key,
  Globe,
  Bell,
  Activity,
  Zap,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '../types/automation';

interface SaaSTopHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenApiKeyModal: () => void;
  onOpenCommandPalette: () => void;
  onOpenMobileSidebar: () => void;
}

export const SaaSTopHeader: React.FC<SaaSTopHeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onOpenApiKeyModal,
  onOpenCommandPalette,
  onOpenMobileSidebar,
}) => {
  const isBn = language === 'bn';

  const tabTitles: Record<string, { en: string; bn: string }> = {
    repurposer: {
      en: 'Content Repurposer',
      bn: 'সোশ্যাল মিডিয়া রিপারপাসার',
    },
    'lead-quoter': {
      en: 'Client Lead Quoter & Proposals',
      bn: 'ক্লায়েন্ট লিড ও কোটেশন জেনারেটর',
    },
    workflow: {
      en: 'Visual Workflow Canvas & Bots',
      bn: 'ভিজ্যুয়াল ওয়ার্কফ্লো ইঞ্জিন',
    },
    calculator: {
      en: 'SaaS Replacement ROI Calculator',
      bn: 'SaaS খরচ সাশ্রয় ক্যালকুলেটর',
    },
    logs: {
      en: 'Live Execution & Webhook Telemetry',
      bn: 'লাইভ এক্সিকিউশন ও ওয়েবহুক মনিটর',
    },
    'learning-hub': {
      en: 'Documentation & Playbook',
      bn: 'ব্যবহার নির্দেশিকা ও প্লেবুক',
    },
    landing: {
      en: 'Public Landing Page',
      bn: 'ল্যান্ডিং পেজ ও প্রোডাক্ট ট্যুর',
    },
  };

  const currentTitle = tabTitles[activeTab] || { en: 'Studio Workspace', bn: 'স্টুডিও ওয়ার্কস্পেস' };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between gap-4">
      {/* Left: Mobile hamburger + SaaS Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* SaaS Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 min-w-0 font-medium">
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-bold text-slate-200"
            title={isBn ? 'ল্যান্ডিং পেজ দেখুন' : 'Go to Landing Page'}
          >
            <span className="text-indigo-400">⚡</span>
            <span>AutoFlow</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline shrink-0" />
          <span className="hidden md:inline px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono shrink-0">
            production-edge
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden md:inline shrink-0" />
          <span className="text-white font-semibold truncate">
            {isBn ? currentTitle.bn : currentTitle.en}
          </span>
        </nav>
      </div>

      {/* Middle: Command Palette Quick Trigger */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer group shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span className="text-slate-400">
              {isBn ? 'টুল বা কমান্ড খুঁজুন... (⌘K)' : 'Search tools, commands, webhooks...'}
            </span>
          </div>
          <kbd className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-300 flex items-center gap-0.5">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right Action Cluster */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Environment Status Pill */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Vercel Edge · Online</span>
        </div>

        {/* Gemini AI Key Status */}
        <button
          onClick={onOpenApiKeyModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
          title="Google Gemini AI Engine"
        >
          <span className="text-amber-400">🔑</span>
          <span className="hidden sm:inline">{isBn ? 'জেমিনি এআই কি' : 'AI Engine'}</span>
        </button>

        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(isBn ? 'en' : 'bn')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
          title="Toggle Language"
        >
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-mono text-xs font-semibold">{isBn ? 'EN' : 'বাং'}</span>
        </button>

        {/* Quick New Pipeline Action */}
        <button
          onClick={() => setActiveTab('repurposer')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all rounded-xl shadow-md shadow-indigo-600/30 cursor-pointer whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isBn ? 'নতুন রান' : 'Run Pipeline'}</span>
          <span className="sm:hidden">{isBn ? 'রান' : 'Run'}</span>
        </button>
      </div>
    </header>
  );
};
