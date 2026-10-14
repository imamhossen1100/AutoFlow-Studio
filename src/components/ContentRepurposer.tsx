import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Share2,
  Youtube,
  Film,
  Linkedin,
  Facebook,
  Twitter,
  Image as ImageIcon,
  Send,
  RefreshCw,
  Clock,
  Layers,
} from 'lucide-react';
import { RepurposedContent, Language } from '../types/automation';
import { REPURPOSING_PRESETS } from '../data/defaultTemplates';
import { generateContentRepurposing } from '../services/geminiService';

interface ContentRepurposerProps {
  language: Language;
}

export const ContentRepurposer: React.FC<ContentRepurposerProps> = ({ language }) => {
  const isBn = language === 'bn';

  const [inputTopic, setInputTopic] = useState(REPURPOSING_PRESETS[0].rawInput);
  const [targetAudience, setTargetAudience] = useState(REPURPOSING_PRESETS[0].targetAudience);
  const [loading, setLoading] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState<'youtube' | 'reels' | 'linkedin' | 'facebook' | 'twitter' | 'thumbnail' | 'webhook'>('youtube');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [content, setContent] = useState<RepurposedContent | null>(null);
  const [dispatchedWebhook, setDispatchedWebhook] = useState(false);

  const handleGenerate = async () => {
    if (!inputTopic.trim()) return;
    setLoading(true);
    setDispatchedWebhook(false);
    try {
      const result = await generateContentRepurposing(inputTopic, targetAudience, language);
      setContent(result);
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

  const handleDownloadMarkdown = () => {
    if (!content) return;
    const md = `# AutoFlow Studio - Content Repurposing Output
Topic: ${inputTopic}
Generated At: ${new Date().toLocaleString()}

## 1. YouTube Video SEO
### Titles
${content.youtube.titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}

### Description
${content.youtube.description}

### Tags
${content.youtube.tags.join(', ')}

### Timestamps
${content.youtube.chapters.map((c) => `${c.time} - ${c.title}`).join('\n')}

---

## 2. 60-Second Viral Shorts / Reels Script
**Duration**: ${content.reelsScript.duration}
**Hook**: ${content.reelsScript.hook}

${content.reelsScript.body.map((b) => `### [${b.timestamp}]
Visual: ${b.visual}
Voiceover: ${b.audio}
`).join('\n')}

**Call To Action**: ${content.reelsScript.callToAction}

---

## 3. LinkedIn Authority Post
${content.linkedInPost}

---

## 4. Facebook Post
${content.facebookPost}

---

## 5. Twitter / X Thread
${content.twitterThread.map((t) => `${t}\n`).join('\n---\n')}

---

## 6. AI Thumbnail Prompt
${content.thumbnailPrompt}
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autoflow-content-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSimulateWebhook = () => {
    setDispatchedWebhook(true);
    setTimeout(() => setDispatchedWebhook(false), 3500);
  };

  // Run on first load if empty
  React.useEffect(() => {
    if (!content) {
      handleGenerate();
    }
  }, [language]);

  return (
    <div className="space-y-8">
      {/* Visual Header / Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
              <span>{isBn ? 'মডিউল ০১' : 'MODULE 01'}</span>
              <span aria-hidden="true">·</span>
              <span>{isBn ? 'ব্যয়বহুল পেইড টুলের সম্পূর্ণ বিকল্প' : 'All-in-One Multi-Tool Alternative'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-semibold">{isBn ? '১০০% ফ্রি' : '100% Free'}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {isBn ? 'সোশ্যাল মিডিয়া মাল্টি-প্লাটফর্ম কনটেন্ট রিপারপাসার' : 'Multi-Platform Content Repurposing Engine'}
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isBn
                ? 'মাত্র ১টি সাধারণ আইডিয়া বা টপিক দিয়ে ২ সেকেন্ডের মধ্যে ইউটিউব এসইও, টিকটক/রিলস স্ক্রিপ্ট, লিঙ্কডইন এবং ফেসবুক পোস্ট স্বয়ংক্রিয়ভাবে তৈরি করে সোশ্যাল মিডিয়ায় প্রকাশ করুন।'
                : 'Input a single YouTube idea or transcript. Instantly generate optimized SEO metadata, 60s viral Shorts storyboard, LinkedIn thought leadership, Facebook copy, and X threads.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube SEO</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Film className="w-4 h-4 text-pink-400" />
                <span>Shorts/Reels Script</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Facebook className="w-4 h-4 text-sky-400" />
                <span>Facebook</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-5 min-h-[190px] flex flex-col justify-between">
              {/* Top Engine Telemetry */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  AUTONOMOUS ENGINE
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  100% OPERATIONAL
                </span>
              </div>

              {/* 4 Connected Social Dispatch Nodes */}
              <div className="grid grid-cols-4 gap-2 my-auto py-3">
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/90 text-center hover:border-red-500/50 transition-colors">
                  <Youtube className="w-5 h-5 text-red-400 mx-auto mb-1" />
                  <span className="text-[10px] block font-mono text-slate-300 font-semibold">YouTube</span>
                  <span className="text-[8px] text-emerald-400 font-mono block">Ready</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/90 text-center hover:border-pink-500/50 transition-colors">
                  <Film className="w-5 h-5 text-pink-400 mx-auto mb-1" />
                  <span className="text-[10px] block font-mono text-slate-300 font-semibold">Reels</span>
                  <span className="text-[8px] text-emerald-400 font-mono block">Ready</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/90 text-center hover:border-blue-500/50 transition-colors">
                  <Linkedin className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <span className="text-[10px] block font-mono text-slate-300 font-semibold">LinkedIn</span>
                  <span className="text-[8px] text-emerald-400 font-mono block">Ready</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/90 text-center hover:border-sky-500/50 transition-colors">
                  <Facebook className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                  <span className="text-[10px] block font-mono text-slate-300 font-semibold">Facebook</span>
                  <span className="text-[8px] text-emerald-400 font-mono block">Ready</span>
                </div>
              </div>

              {/* Bottom Specs Line */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-slate-800/80 pt-2">
                <span>Latency: &lt;350ms</span>
                <span className="text-indigo-400 font-semibold">
                  {isBn ? 'স্বয়ংক্রিয় মাল্টি-চ্যানেল সিঙ্ক' : 'Multi-Channel Sync'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">
              {isBn ? 'ইনপুট টপিক ও আইডিয়া লিখুন' : 'Input Topic or Raw Video Idea'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn ? 'নিচের ডেমো প্রিসেট থেকে ক্লিক করতে পারেন বা নিজের মতো লিখুন' : 'Select a ready-to-demo preset or write your own'}
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {REPURPOSING_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setInputTopic(preset.rawInput);
                  setTargetAudience(preset.targetAudience);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                  inputTopic === preset.rawInput
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {isBn ? preset.titleBn : preset.titleEn}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              {isBn ? 'মূল বিষয়বস্তু / আইডিয়া / ট্রান্সক্রিপ্ট' : 'Core Concept / Topic / Transcript'}
            </label>
            <textarea
              rows={3}
              value={inputTopic}
              onChange={(e) => setInputTopic(e.target.value)}
              placeholder={isBn ? 'এখানে আপনার ভিডিওর মূল আইডিয়াটি লিখুন...' : 'Write your core video concept or topic...'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
            />
          </div>

          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {isBn ? 'টার্গেট অডিয়েন্স' : 'Target Audience'}
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder={isBn ? 'যেমন: ইউটিউব দর্শক, ফ্রিল্যান্সার' : 'e.g. YouTube Creators, Freelancers'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="pt-3 flex gap-2">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 text-white font-medium text-sm rounded-xl transition-colors shadow-md cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isBn ? 'অটোমেশন রান হচ্ছে...' : 'Running Automation...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{isBn ? 'রান অটোমেশন (১-ক্লিক)' : 'Run Automation (1-Click)'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Output Studio Showcase */}
      {content && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Subheader / Tabs Bar */}
          <div className="border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/60">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setActiveOutputTab('youtube')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeOutputTab === 'youtube'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Youtube className="w-3.5 h-3.5 text-red-400" />
                <span>YouTube SEO</span>
              </button>

              <button
                onClick={() => setActiveOutputTab('reels')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeOutputTab === 'reels'
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-pink-400" />
                <span>Shorts / Reels Script</span>
              </button>

              <button
                onClick={() => setActiveOutputTab('linkedin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeOutputTab === 'linkedin'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </button>

              <button
                onClick={() => setActiveOutputTab('facebook')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeOutputTab === 'facebook'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Facebook className="w-3.5 h-3.5 text-sky-400" />
                <span>Facebook</span>
              </button>

              <button
                onClick={() => setActiveOutputTab('twitter')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeOutputTab === 'twitter'
                    ? 'bg-slate-700 text-white border border-slate-600'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Twitter className="w-3.5 h-3.5 text-slate-300" />
                <span>X / Twitter</span>
              </button>

              <button
                onClick={() => setActiveOutputTab('thumbnail')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeOutputTab === 'thumbnail'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                <span>Thumbnail Prompt</span>
              </button>

              <button
                onClick={() => setActiveOutputTab('webhook')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeOutputTab === 'webhook'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>Webhook Payload</span>
              </button>
            </div>

            {/* Export Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadMarkdown}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                title="Download full output in Markdown"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isBn ? 'ফুল ফাইল ডাউনলোড' : 'Download .MD'}</span>
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-6">
            {/* 1. YouTube SEO Tab */}
            {activeOutputTab === 'youtube' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      {isBn ? 'হাই-সিটিআর ৩টি ইউটিউব টাইটেল অপশন' : 'High-CTR YouTube Title Variations'}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {content.youtube.titles.map((title, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-medium text-slate-100 hover:border-slate-700 transition-colors"
                      >
                        <span className="pr-4">{title}</span>
                        <button
                          onClick={() => handleCopy(title, `yt-title-${idx}`)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer shrink-0"
                          title="Copy Title"
                        >
                          {copiedKey === `yt-title-${idx}` ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-7 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">
                        {isBn ? 'ভিডিও ডেসক্রিপশন (SEO অপ্টিমাইজড)' : 'Video Description (SEO Optimized)'}
                      </label>
                      <button
                        onClick={() => handleCopy(content.youtube.description, 'yt-desc')}
                        className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
                      >
                        {copiedKey === 'yt-desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'yt-desc' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি ডেসক্রিপশন' : 'Copy')}</span>
                      </button>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line max-h-60 overflow-y-auto">
                      {content.youtube.description}
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-slate-300">
                          {isBn ? 'এসইও র‍্যাংকিং ট্যাগসমূহ' : 'Ranking Tags'}
                        </label>
                        <button
                          onClick={() => handleCopy(content.youtube.tags.join(', '), 'yt-tags')}
                          className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
                        >
                          {copiedKey === 'yt-tags' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isBn ? 'সব ট্যাগ কপি' : 'Copy All'}</span>
                        </button>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap gap-1.5">
                        {content.youtube.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs text-slate-300 font-mono"
                          >
                            #{tag}{i < content.youtube.tags.length - 1 ? ' ·' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        {isBn ? 'টাইমস্ট্যাম্প ও চ্যাপ্টার' : 'Timestamps & Chapters'}
                      </label>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-xs">
                        {content.youtube.chapters.map((ch, idx) => (
                          <div key={idx} className="flex items-center justify-between text-slate-300">
                            <span className="text-indigo-400 font-semibold">{ch.time}</span>
                            <span className="truncate pl-3">{ch.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Reels / Shorts Script Tab */}
            {activeOutputTab === 'reels' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-pink-950/30 border border-pink-900/40 p-4 rounded-xl">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-pink-400 block">
                      {isBn ? 'ভাইরাল হুক (প্রথম ৩ সেকেন্ড)' : '3-Second Retention Hook'}
                    </span>
                    <p className="text-sm font-semibold text-pink-100 mt-1">
                      "{content.reelsScript.hook}"
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(content.reelsScript.hook, 'reels-hook')}
                    className="p-2 bg-pink-900/40 hover:bg-pink-900/60 rounded-lg text-pink-200 cursor-pointer"
                    title="Copy Hook"
                  >
                    {copiedKey === 'reels-hook' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {isBn ? '৬০-সেকেন্ডের টাইম-কোডেড স্টোরিবোর্ড ও স্ক্রিপ্ট' : '60-Second Timed Storyboard & Voiceover Script'}
                    </h3>
                    <button
                      onClick={() => {
                        const fullScript = content.reelsScript.body
                          .map((b) => `[${b.timestamp}]\nVisual: ${b.visual}\nAudio: ${b.audio}`)
                          .join('\n\n');
                        handleCopy(fullScript, 'full-reels');
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'full-reels' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isBn ? 'পুরো স্ক্রিপ্ট কপি' : 'Copy Full Script'}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {content.reelsScript.body.map((scene, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4"
                      >
                        <div className="md:col-span-3 flex md:flex-col justify-between items-start">
                          <span className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {scene.timestamp}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            Scene {i + 1}
                          </span>
                        </div>

                        <div className="md:col-span-4 border-l md:border-l border-slate-800/80 md:pl-4">
                          <span className="text-[11px] uppercase font-semibold text-slate-400 block mb-1">
                            {isBn ? 'ভিজ্যুয়াল / ক্যামেরা অ্যাকশন' : 'Visual & Camera Cue'}
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {scene.visual}
                          </p>
                        </div>

                        <div className="md:col-span-5 border-l md:border-l border-slate-800/80 md:pl-4">
                          <span className="text-[11px] uppercase font-semibold text-emerald-400 block mb-1">
                            {isBn ? 'ভয়েসওভার ডায়ালগ' : 'Voiceover Dialogue'}
                          </span>
                          <p className="text-xs text-slate-100 font-medium leading-relaxed">
                            "{scene.audio}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span><strong>Call to Action:</strong> {content.reelsScript.callToAction}</span>
                  <button
                    onClick={() => handleCopy(content.reelsScript.callToAction, 'reels-cta')}
                    className="text-indigo-400 hover:text-white cursor-pointer"
                  >
                    {copiedKey === 'reels-cta' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )}

            {/* 3. LinkedIn Post Tab */}
            {activeOutputTab === 'linkedin' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {isBn ? 'প্রফেশনাল বিটুইন-দ্যা-লাইনস পোস্ট (রেডি ফর শেয়ার)' : 'Formatted LinkedIn Post (Ready for Share)'}
                  </span>
                  <button
                    onClick={() => handleCopy(content.linkedInPost, 'linkedin-post')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {copiedKey === 'linkedin-post' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'linkedin-post' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি পোস্ট' : 'Copy Post')}</span>
                  </button>
                </div>
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                  {content.linkedInPost}
                </div>
              </div>
            )}

            {/* 4. Facebook Post Tab */}
            {activeOutputTab === 'facebook' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {isBn ? 'ভাইরাল এনগেজিং ফেসবুক পোস্ট' : 'Engaging Facebook Post with High Shareability'}
                  </span>
                  <button
                    onClick={() => handleCopy(content.facebookPost, 'fb-post')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {copiedKey === 'fb-post' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'fb-post' ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি পোস্ট' : 'Copy Post')}</span>
                  </button>
                </div>
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                  {content.facebookPost}
                </div>
              </div>
            )}

            {/* 5. Twitter / X Thread Tab */}
            {activeOutputTab === 'twitter' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {isBn ? '৫-টুইটের সম্পূর্ণ থ্রেড' : '5-Tweet Complete Thread'}
                  </span>
                  <button
                    onClick={() => handleCopy(content.twitterThread.join('\n\n---\n\n'), 'twitter-all')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {copiedKey === 'twitter-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isBn ? 'সম্পূর্ণ থ্রেড কপি' : 'Copy Entire Thread'}</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {content.twitterThread.map((tweet, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                        {tweet}
                      </div>
                      <button
                        onClick={() => handleCopy(tweet, `tweet-${idx}`)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer shrink-0"
                      >
                        {copiedKey === `tweet-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Thumbnail Prompt Tab */}
            {activeOutputTab === 'thumbnail' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {isBn ? 'Midjourney / DALL-E / Imagen প্রম্পট (হাই সিটিআর)' : 'High CTR Thumbnail AI Generation Prompt'}
                  </span>
                  <button
                    onClick={() => handleCopy(content.thumbnailPrompt, 'thumb-prompt')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {copiedKey === 'thumb-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isBn ? 'প্রম্পট কপি' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-200 leading-relaxed">
                  {content.thumbnailPrompt}
                </div>
                <p className="text-xs text-slate-400">
                  {isBn
                    ? 'টিপস: এই প্রম্পটটি কপি করে যেকোনো ফ্রি বা পেইড AI ইমেজ জেনারেটরে পেস্ট করলে ইউটিউবের জন্য নজরকাড়া থাম্বনেইল তৈরি হবে।'
                    : 'Tip: Paste this prompt directly into Midjourney, ChatGPT, or Imagen to generate thumbnail graphics.'}
                </p>
              </div>
            )}

            {/* 7. Webhook Payload Tab */}
            {activeOutputTab === 'webhook' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    POST https://api.autoflow.internal/v1/publish
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSimulateWebhook}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{dispatchedWebhook ? (isBn ? 'ডিসপ্যাচ সম্পন্ন (200 OK)' : 'Dispatched! (200 OK)') : (isBn ? 'টেস্ট ডিসপ্যাচ পাঠান' : 'Send Test Dispatch')}</span>
                    </button>
                  </div>
                </div>

                {dispatchedWebhook && (
                  <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 font-mono">
                    ✓ HTTP 200 OK: Webhook received. 5 platform bundles queued for delivery in 185ms.
                  </div>
                )}

                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                  {JSON.stringify(
                    {
                      ...content.webhookPayload,
                      titles: content.youtube.titles,
                      shorts_duration: content.reelsScript.duration,
                      threads_count: content.twitterThread.length,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
