import React, { useState, useEffect } from 'react';
import { SaaSSidebar } from './components/SaaSSidebar';
import { SaaSTopHeader } from './components/SaaSTopHeader';
import { ContentRepurposer } from './components/ContentRepurposer';
import { ClientLeadQuoter } from './components/ClientLeadQuoter';
import { VisualWorkflowBuilder } from './components/VisualWorkflowBuilder';
import { SaaSReplacementCalculator } from './components/SaaSReplacementCalculator';
import { LiveExecutionLogs } from './components/LiveExecutionLogs';
import { UserLearningHub } from './components/UserLearningHub';
import { ApiKeyModal } from './components/ApiKeyModal';
import { CommandPalette } from './components/CommandPalette';
import { LandingPage } from './components/LandingPage';
import { SupportDonationBanner } from './components/SupportDonationBanner';
import { Language } from './types/automation';
import {
  Sparkles,
  DollarSign,
  Layers,
  ShieldCheck,
  CheckCircle,
  Activity,
  Zap,
  Clock,
  TrendingUp,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('repurposer');
  const [language, setLanguage] = useState<Language>('bn');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isBn = language === 'bn';

  // Global Keyboard listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {activeTab === 'landing' ? (
        <LandingPage
          language={language}
          setLanguage={setLanguage}
          onNavigateTab={setActiveTab}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        />
      ) : (
        <>
          {/* SaaS Left Sidebar (Fixed on Desktop, Drawer on Mobile) */}
          <SaaSSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            language={language}
            setLanguage={setLanguage}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />

          {/* Main SaaS Workspace Shell (offset by 18rem on lg screens) */}
          <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
            {/* Modern SaaS Header Bar */}
            <SaaSTopHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              language={language}
              setLanguage={setLanguage}
              onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            />

        {/* Workspace Canvas Area */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Support & Voluntary Donation Banner */}
          <SupportDonationBanner language={language} />

          {/* SaaS Telemetry & Economics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 p-4 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-slate-800 shadow-lg backdrop-blur-sm">
            <div className="p-2 sm:p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? 'সফটওয়্যার লাইসেন্স খরচ' : 'Monthly License Fee'}</span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl font-bold text-emerald-400 font-mono tabular-nums">$0 / mo</span>
                <span className="text-[10px] text-emerald-500/80 font-mono bg-emerald-500/10 px-1 rounded border border-emerald-500/20">
                  {isBn ? '১০০% ফ্রি' : 'Free Tier'}
                </span>
              </div>
            </div>

            <div className="p-2 sm:p-3 border-l border-slate-800/80">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isBn ? 'রিপ্লেসকৃত পেইড টুল' : 'Replaced SaaS Stack'}</span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl font-bold text-white font-mono tabular-nums">5+ Apps</span>
                <span className="text-[10px] text-slate-400 truncate">{isBn ? 'পেইড সাবস্ক্রিপশন টুলস' : 'Monthly Subscriptions'}</span>
              </div>
            </div>

            <div className="p-2 sm:p-3 border-l border-slate-800/80">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{isBn ? 'অটোমেশন স্পিড' : 'Average Latency'}</span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl font-bold text-amber-400 font-mono tabular-nums">&lt; 380ms</span>
                <span className="text-[10px] text-slate-500 font-mono">Edge Dispatch</span>
              </div>
            </div>

            <div className="p-2 sm:p-3 border-l border-slate-800/80">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isBn ? 'প্রজেক্ট ডেপ্লয়মেন্ট' : 'Deployment Status'}</span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl font-bold text-cyan-400 font-mono tabular-nums">Vercel Ready</span>
                <span className="text-[10px] text-slate-400">GitHub Sync</span>
              </div>
            </div>
          </div>

          {/* SaaS Tab Route Views */}
          {activeTab === 'repurposer' && <ContentRepurposer language={language} />}
          {activeTab === 'lead-quoter' && <ClientLeadQuoter language={language} />}
          {activeTab === 'workflow' && <VisualWorkflowBuilder language={language} />}
          {activeTab === 'calculator' && <SaaSReplacementCalculator language={language} />}
          {activeTab === 'logs' && <LiveExecutionLogs language={language} />}
          {activeTab === 'learning-hub' && (
            <UserLearningHub
              language={language}
              onNavigateTab={setActiveTab}
            />
          )}
        </main>

        {/* Sleek SaaS Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 px-4 sm:px-6 lg:px-8 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-slate-200">AutoFlow SaaS Engine</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{isBn ? 'স্বতন্ত্র এআই অটোমেশন প্ল্যাটফর্ম ($০/মাস)' : 'Autonomous Enterprise Automation ($0/mo)'}</span>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('logs')}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isBn ? 'লাইভ লগস' : 'Live Logs'}</span>
              </button>
              <button
                onClick={() => setActiveTab('workflow')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isBn ? 'পাইথন বট কোড' : 'Export Python Bot'}
              </button>
              <button
                onClick={() => setActiveTab('learning-hub')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isBn ? 'ডকুমেন্টেশন' : 'Docs'}
              </button>
              <button
                onClick={() => setLanguage(isBn ? 'en' : 'bn')}
                className="hover:text-white transition-colors cursor-pointer text-indigo-400 font-mono"
              >
                {isBn ? 'English Mode' : 'বাংলা সংস্করণ'}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  )}

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={setActiveTab}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        language={language}
        onToggleLanguage={() => setLanguage(isBn ? 'en' : 'bn')}
      />

      {/* Optional Gemini API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        language={language}
      />
    </div>
  );
}
