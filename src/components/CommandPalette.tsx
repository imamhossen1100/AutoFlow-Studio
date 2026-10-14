import React, { useState, useEffect } from 'react';
import {
  Search,
  Zap,
  Briefcase,
  GitBranch,
  Calculator,
  BookOpen,
  Key,
  Terminal,
  Globe,
  ArrowRight,
  Activity,
  X,
} from 'lucide-react';
import { Language } from '../types/automation';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onOpenApiKeyModal: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenApiKeyModal,
  language,
  onToggleLanguage,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isBn = language === 'bn';

  const commands = [
    {
      id: 'repurposer',
      title: isBn ? 'সোশ্যাল মিডিয়া রিপারপাসার' : 'Content Repurposer',
      description: isBn ? 'ইউটিউব, রিলস, ফেসবুক ও লিংকডইন কনটেন্ট জেনারেট করুন' : 'Generate multi-channel social media assets',
      icon: Zap,
      category: isBn ? 'টুলস' : 'Tools',
      action: () => {
        onSelectTab('repurposer');
        onClose();
      },
    },
    {
      id: 'lead-quoter',
      title: isBn ? 'ক্লায়েন্ট কোটেশন ও লিড জেনারেটর' : 'Client Lead Quoter',
      description: isBn ? 'ক্লায়েন্ট মেসেজ থেকে ইনস্ট্যান্ট প্রপোজাল ও বাজেট হিসাব' : 'Instant proposal, budget & message generator',
      icon: Briefcase,
      category: isBn ? 'টুলস' : 'Tools',
      action: () => {
        onSelectTab('lead-quoter');
        onClose();
      },
    },
    {
      id: 'workflow',
      title: isBn ? 'ভিজ্যুয়াল ওয়ার্কফ্লো ইঞ্জিন' : 'Visual Workflow Canvas',
      description: isBn ? 'ট্রিগার থেকে ডিসপ্যাচ পাইপলাইন ও পাইথন/নোড কোড এক্সপোর্ট' : 'Design trigger pipelines & export standalone bot code',
      icon: GitBranch,
      category: isBn ? 'টুলস' : 'Tools',
      action: () => {
        onSelectTab('workflow');
        onClose();
      },
    },
    {
      id: 'calculator',
      title: isBn ? 'SaaS খরচ সাশ্রয় ক্যালকুলেটর' : 'SaaS Replacement ROI Calculator',
      description: isBn ? 'পেইড সাবস্ক্রিপশনের বদলে কত টাকা বাঁচল দেখুন' : 'Calculate annual savings vs paid subscription software',
      icon: Calculator,
      category: isBn ? 'ফাইন্যান্স' : 'Finance',
      action: () => {
        onSelectTab('calculator');
        onClose();
      },
    },
    {
      id: 'logs',
      title: isBn ? 'লাইভ এক্সিকিউশন ও ওয়েবহুক লগস' : 'Live Execution & Webhook Logs',
      description: isBn ? 'রিয়েল-টাইম অটোমেশন হিস্টোরি ও ওয়েবহুক স্ট্যাটাস মনিটর' : 'Real-time automation logs, payloads & webhook status',
      icon: Activity,
      category: isBn ? 'মনিটরিং' : 'Monitoring',
      action: () => {
        onSelectTab('logs');
        onClose();
      },
    },
    {
      id: 'learning-hub',
      title: isBn ? 'টিউটোরিয়াল ও ব্যবহার নির্দেশিকা' : 'Documentation & Knowledge Base',
      description: isBn ? 'কীভাবে ফ্রিতে সার্ভার বা লোকাল পিসিতে চালাবেন' : 'Full deployment guides, webhook recipes & bot setup',
      icon: BookOpen,
      category: isBn ? 'ডকুমেন্টেশন' : 'Docs',
      action: () => {
        onSelectTab('learning-hub');
        onClose();
      },
    },
    {
      id: 'landing',
      title: isBn ? '🌐 ল্যান্ডিং পেজ (পাবলিক ওয়েবসাইট)' : '🌐 Public Landing Page & Tour',
      description: isBn ? 'অটোফ্লো স্টুডিওর ফুল ফিচার ওভারভিউ ও প্রেজেন্টেশন পেজ' : 'View the public SaaS presentation landing page',
      icon: Globe,
      category: isBn ? 'ওয়েবসাইট' : 'Website',
      action: () => {
        onSelectTab('landing');
        onClose();
      },
    },
    {
      id: 'apikey',
      title: isBn ? 'Gemini AI কনফিগারেশন' : 'Gemini AI API Key Configuration',
      description: isBn ? 'লাইভ গুগল জেমিনি এআই কি যুক্ত করুন' : 'Connect your free Google Gemini API key',
      icon: Key,
      category: isBn ? 'সেটিংস' : 'Settings',
      action: () => {
        onOpenApiKeyModal();
        onClose();
      },
    },
    {
      id: 'language',
      title: isBn ? 'Switch to English' : 'বাংলা ভাষায় পরিবর্তন করুন',
      description: isBn ? 'Change software interface language to English' : 'সফটওয়্যারের ভাষা বাংলায় পরিবর্তন করুন',
      icon: Globe,
      category: isBn ? 'পছন্দ' : 'Preferences',
      action: () => {
        onToggleLanguage();
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isBn ? 'টুল বা অ্যাকশন খুঁজুন... (যেমন: repurposer, workflow, api)' : 'Type a command or search... (e.g. workflow, logs, bot)'}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/40">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              {isBn ? 'কোনো ফলাফল পাওয়া যায়নি।' : 'No commands found matching your query.'}
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected ? 'bg-indigo-600/20 text-white border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate flex items-center gap-2">
                        <span>{cmd.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-normal">
                          {cmd.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 truncate">{cmd.description}</div>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-opacity ${
                      isSelected ? 'opacity-100 text-indigo-400' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">↑↓</kbd> {isBn ? 'ন্যাভিগেট' : 'Navigate'}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">↵</kbd> {isBn ? 'নির্বাচন' : 'Select'}
            </span>
          </div>
          <span className="text-emerald-400">AutoFlow SaaS Core</span>
        </div>
      </div>
    </div>
  );
};
