import React from 'react';
import {
  Zap,
  Briefcase,
  GitBranch,
  Calculator,
  Activity,
  BookOpen,
  Key,
  Globe,
  Search,
  ChevronDown,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Settings,
  Server,
  Command,
} from 'lucide-react';
import { Language } from '../types/automation';

interface SaaSSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenApiKeyModal: () => void;
  onOpenCommandPalette: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const SaaSSidebar: React.FC<SaaSSidebarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onOpenApiKeyModal,
  onOpenCommandPalette,
  isOpenMobile,
  onCloseMobile,
}) => {
  const isBn = language === 'bn';

  const navItems = [
    {
      group: isBn ? 'কোর অটোমেশন পাইপলাইন' : 'Core Automation Pipelines',
      items: [
        {
          id: 'repurposer',
          label: isBn ? 'সোশ্যাল মিডিয়া রিপারপাসার' : 'Content Repurposer',
          icon: Zap,
          badge: isBn ? 'ইউটিউব/রিলস' : 'Multi-Channel',
          badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        },
        {
          id: 'lead-quoter',
          label: isBn ? 'ক্লায়েন্ট লিড ও কোটেশন' : 'Client Lead Quoter',
          icon: Briefcase,
          badge: isBn ? 'প্রপোজাল' : 'Smart Pitch',
          badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        },
        {
          id: 'workflow',
          label: isBn ? 'ভিজ্যুয়াল ওয়ার্কফ্লো ইঞ্জিন' : 'Workflow Canvas & Bots',
          icon: GitBranch,
          badge: isBn ? 'পাইথন/JS' : 'Code Export',
          badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        },
      ],
    },
    {
      group: isBn ? 'মনিটরিং ও ফাইন্যান্স' : 'Telemetry & Economics',
      items: [
        {
          id: 'logs',
          label: isBn ? 'লাইভ ওয়েবহুক ও লগস' : 'Live Webhooks & Logs',
          icon: Activity,
          badge: 'Live',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        },
        {
          id: 'calculator',
          label: isBn ? 'SaaS খরচ সাশ্রয় ক্যালকুলেটর' : 'SaaS Replacement ROI',
          icon: Calculator,
          badge: '$4.8k/yr',
          badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        },
      ],
    },
    {
      group: isBn ? 'রিসোর্স ও সিস্টেম' : 'Documentation & Engine',
      items: [
        {
          id: 'learning-hub',
          label: isBn ? 'ব্যবহার নির্দেশিকা ও প্লেবুক' : 'Learning Hub & Setup',
          icon: BookOpen,
          badge: isBn ? 'গাইড' : 'Docs',
          badgeColor: 'bg-slate-700/50 text-slate-300 border-slate-600/30',
        },
        {
          id: 'landing',
          label: isBn ? '🌐 ল্যান্ডিং পেজ (প্রোডাক্ট ট্যুর)' : '🌐 Landing Page & Tour',
          icon: Sparkles,
          badge: isBn ? 'পাবলিক' : 'Public',
          badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        },
      ],
    },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Workspace Brand Selector */}
        <div className="p-4 border-b border-slate-800/80">
          <button
            onClick={() => {
              setActiveTab('landing');
              onCloseMobile();
            }}
            className="w-full text-left flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer group"
            title={isBn ? 'ল্যান্ডিং পেজ দেখুন' : 'View Public Landing Page'}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-600/30 shrink-0 group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white tracking-tight block truncate group-hover:text-indigo-300 transition-colors">
                  AutoFlow Studio
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PRO Workspace · $0/mo
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-mono font-medium">
                v2.5
              </span>
              <span className="text-[9px] text-slate-500 group-hover:text-indigo-400 transition-colors">
                {isBn ? 'ওয়েবসাইট ↗' : 'Landing ↗'}
              </span>
            </div>
          </button>

          {/* Quick Search / Command Palette shortcut */}
          <button
            onClick={() => {
              onCloseMobile();
              onOpenCommandPalette();
            }}
            className="w-full mt-3 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span>{isBn ? 'কমান্ড খুঁজুন...' : 'Search commands...'}</span>
            </div>
            <kbd className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-300 flex items-center gap-0.5">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                {group.group}
              </div>
              <div className="space-y-0.5 pt-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-500 group-hover:text-indigo-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${
                          isActive
                            ? 'bg-white/20 text-white border-white/20'
                            : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Settings Section */}
          <div className="space-y-1 pt-2">
            <div className="px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
              {isBn ? 'কনফিগারেশন' : 'Settings & Engine'}
            </div>

            <button
              onClick={() => {
                onCloseMobile();
                onOpenApiKeyModal();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900/70 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Key className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isBn ? 'Gemini AI API Key' : 'Gemini AI Engine'}</span>
              </div>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono">
                {isBn ? 'কানেক্টেড' : 'Active'}
              </span>
            </button>

            <button
              onClick={() => setLanguage(isBn ? 'en' : 'bn')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900/70 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{isBn ? 'ভাষা: বাংলা (EN এ বদলান)' : 'Language: English (Switch to বাংলা)'}</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded font-mono">
                {isBn ? 'বাংলা' : 'EN'}
              </span>
            </button>
          </div>
        </div>

        {/* SaaS Workspace Footer Card */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/70">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">{isBn ? 'প্ল্যাটফর্ম স্ট্যাটাস' : 'Engine Health'}</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                99.99%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[100%]" />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>{isBn ? 'টাস্ক লিমিট: আনলিমিটেড' : 'Tasks: Unlimited Free'}</span>
              <span className="text-indigo-400 font-mono">$0.00/mo</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 mt-3 pt-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs">
              AF
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-white block truncate">
                Studio Admin
              </span>
              <span className="text-[10px] text-slate-500 block truncate">
                Local VPS / Vercel Edge
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
