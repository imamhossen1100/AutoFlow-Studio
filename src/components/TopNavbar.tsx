import React from 'react';
import { Sparkles, BookOpen, Globe, Play } from 'lucide-react';
import { Language } from '../types/automation';

interface TopNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onQuickStart: () => void;
  onOpenApiKeyModal: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onQuickStart,
  onOpenApiKeyModal,
}) => {
  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
            ⚡
          </div>
          <button 
            onClick={() => setActiveTab('landing')}
            className="text-left group cursor-pointer focus:outline-none"
            title={isBn ? 'ল্যান্ডিং পেজ দেখুন' : 'Go to Landing Page'}
          >
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap block group-hover:text-indigo-300 transition-colors">
              AutoFlow Studio
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('repurposer')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'repurposer'
                ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-indigo-500'
                : 'hover:text-white'
            }`}
          >
            {isBn ? 'সোশ্যাল মিডিয়া রিপারপাসার' : 'Content Repurposer'}
          </button>
          <button
            onClick={() => setActiveTab('lead-quoter')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'lead-quoter'
                ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-indigo-500'
                : 'hover:text-white'
            }`}
          >
            {isBn ? 'ক্লায়েন্ট কোটেশন জেনারেটর' : 'Client Lead Quoter'}
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'workflow'
                ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-indigo-500'
                : 'hover:text-white'
            }`}
          >
            {isBn ? 'ভিজুয়াল ওয়ার্কফ্লো ইঞ্জিন' : 'Workflow Engine'}
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'calculator'
                ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-indigo-500'
                : 'hover:text-white'
            }`}
          >
            {isBn ? 'খরচ সাশ্রয় ক্যালকুলেটর' : 'SaaS Savings Calculator'}
          </button>
          <button
            onClick={() => setActiveTab('learning-hub')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'learning-hub'
                ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-indigo-500'
                : 'hover:text-white'
            }`}
          >
            {isBn ? 'ব্যবহার নির্দেশিকা' : 'How It Works'}
          </button>
        </nav>

        {/* Zone 3: Actions & Language Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
            title="Google Gemini API Key Settings"
          >
            <span className="text-amber-400 font-bold">🔑</span>
            <span className="hidden sm:inline whitespace-nowrap">{isBn ? 'এআই কি' : 'AI Key'}</span>
          </button>

          {/* Language switcher */}
          <button
            onClick={() => setLanguage(isBn ? 'en' : 'bn')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
            title="Toggle Language / ভাষা পরিবর্তন"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="whitespace-nowrap">{isBn ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Quick Action */}
          <button
            onClick={onQuickStart}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? 'নতুন অটোমেশন' : 'New Automation'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

