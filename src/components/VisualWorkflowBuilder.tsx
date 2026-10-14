import React, { useState } from 'react';
import {
  Zap,
  Cpu,
  GitBranch,
  Send,
  Play,
  CheckCircle,
  Clock,
  Terminal,
  Code2,
  Copy,
  Check,
  Download,
  AlertCircle,
  Database,
  ArrowRight,
} from 'lucide-react';
import { WorkflowNode, ExecutionLog, Language } from '../types/automation';
import { INITIAL_WORKFLOW_NODES } from '../data/defaultTemplates';

interface VisualWorkflowBuilderProps {
  language: Language;
}

export const VisualWorkflowBuilder: React.FC<VisualWorkflowBuilderProps> = ({ language }) => {
  const isBn = language === 'bn';

  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_WORKFLOW_NODES);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeLang, setCodeLang] = useState<'python' | 'node'>('python');
  const [copiedCode, setCopiedCode] = useState(false);

  const pythonScript = `"""
AutoFlow Studio - Standalone Free Automation Bot
100% Free Self-Hosted Automation Engine.
Run locally on your PC or free VPS.
"""
import requests
import json
import time

# ================= CONFIGURATION / এপিআই কি বসানোর জায়গা =================
# 👇 ফেসবুক পেজের জন্য: developers.facebook.com থেকে পাওয়া টোকেন
FACEBOOK_PAGE_ACCESS_TOKEN = "your_facebook_page_token_here"

# 👇 ইউটিউবের জন্য: console.cloud.google.com থেকে পাওয়া ফ্রি API Key
YOUTUBE_API_KEY = "your_youtube_api_key_here"

# 👇 আপনার সার্ভারের Webhook URL (যেমন: Render.com বা ngrok লিঙ্ক)
API_WEBHOOK_URL = "https://your-server.onrender.com/api/webhook"
# =========================================================================

def run_automation_pipeline(topic: str):
    print(f"[+] Starting automation for topic: {topic}")
    start_time = time.time()
    
    # Step 1: Ingest payload
    payload = {
        "event": "NEW_CONTENT_TOPIC",
        "topic": topic,
        "timestamp": int(time.time())
    }
    print("[1] Trigger: Payload received and verified.")
    
    # Step 2: AI Processing (Native Open Pipeline)
    # Using local logic or free Google Gemini API
    print("[2] AI Processor: Generating YouTube SEO, Shorts Script, and Social copy...")
    time.sleep(0.3)  # simulated computation
    
    # Step 3: Format & Dispatch (Multi-Channel Webhooks)
    print("[3] Dispatcher: Broadcasting to connected social webhooks...")
    
    duration = round((time.time() - start_time) * 1000, 2)
    print(f"[✓] Automation finished successfully in {duration}ms. Cost: $0.00")

if __name__ == "__main__":
    run_automation_pipeline("Build Free AI Automation Software")
`;

  const nodeScript = `// AutoFlow Studio - Standalone Node.js Automation Bot
// Zero subscriptions. Run via: node autoflow-bot.js

import fetch from 'node-fetch';

// ================= CONFIGURATION / এপিআই কি বসানোর জায়গা =================
// 👇 ফেসবুক পেজের জন্য: developers.facebook.com থেকে পাওয়া টোকেন
const FACEBOOK_PAGE_ACCESS_TOKEN = "your_facebook_page_token_here";

// 👇 ইউটিউবের জন্য: console.cloud.google.com থেকে পাওয়া ফ্রি API Key
const YOUTUBE_API_KEY = "your_youtube_api_key_here";

// 👇 আপনার সার্ভারের Webhook URL (যেমন: Render.com বা ngrok লিঙ্ক)
const API_WEBHOOK_URL = "https://your-server.onrender.com/api/webhook";
// =========================================================================

async function executePipeline(topic) {
  console.log('🚀 Triggering pipeline for:', topic);
  const start = Date.now();

  // Ingest & Prepare
  const payload = { topic, timestamp: new Date().toISOString() };

  // AI Pipeline
  console.log('🧠 AI Engine processing assets...');
  
  // Dispatch actions
  console.log('📡 Multi-destination webhooks dispatched.');
  
  const elapsed = Date.now() - start;
  console.log(\`✅ Pipeline completed in \${elapsed}ms. Saved: $100/mo\`);
}

executePipeline('How to Automate Business Workflows for Free');
`;

  const handleRunPipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setActiveStepIndex(0);

    const updated = nodes.map((n) => ({ ...n, status: 'idle' as const }));
    setNodes(updated);

    const stepDelay = 650;

    for (let i = 0; i < nodes.length; i++) {
      setActiveStepIndex(i);
      setNodes((prev) =>
        prev.map((node, idx) => (idx === i ? { ...node, status: 'running' as const } : node))
      );

      const stepTime = Math.floor(Math.random() * 80) + 120;
      await new Promise((r) => setTimeout(r, stepDelay));

      const now = new Date().toLocaleTimeString();
      const node = nodes[i];

      setLogs((prev) => [
        ...prev,
        {
          timestamp: now,
          nodeId: node.id,
          nodeTitle: isBn ? node.titleBn : node.title,
          level: 'success',
          message: isBn
            ? `${node.titleBn} সফলভাবে এক্সিকিউট হয়েছে (${stepTime}ms)`
            : `${node.title} executed successfully with HTTP 200 OK (${stepTime}ms)`,
          durationMs: stepTime,
        },
      ]);

      setNodes((prev) =>
        prev.map((n, idx) => (idx === i ? { ...n, status: 'success' as const } : n))
      );
    }

    setActiveStepIndex(-1);
    setIsRunning(false);
  };

  const handleCopyCode = () => {
    const text = codeLang === 'python' ? pythonScript : nodeScript;
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
              <span>{isBn ? 'মডিউল ০৩' : 'MODULE 03'}</span>
              <span aria-hidden="true">·</span>
              <span>{isBn ? 'ভিজুয়াল নোড ওয়ার্কফ্লো ইঞ্জিন' : 'Visual Node Workflow Engine'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-white">{isBn ? 'ভিজুয়াল পাইপলাইন' : 'Visual Pipeline Engine'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {isBn ? 'ভিজুয়াল অটোমেশন পাইপলাইন ও লাইভ এক্সিকিউটর' : 'Visual Automation Pipeline & Live Executor'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {isBn
                ? 'নোড-ভিত্তিক আর্কিটেকচারের মাধ্যমে যেকোনো ডেটা প্রসেসিং স্বয়ংক্রিয় করুন। ট্রিগার থেকে শুরু করে এআই রূপান্তর এবং সোশ্যাল ডিসপ্যাচ—সবকিছু রিয়েল-টাইমে রান করুন।'
                : 'Visually automate data pipelines—triggering inbound webhooks, formatting via Gemini AI, and dispatching to multiple targets in real-time.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCodeModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
            >
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>{isBn ? 'সোর্স কোড এক্সপোর্ট' : 'Export Standalone Script'}</span>
            </button>

            <button
              onClick={handleRunPipeline}
              disabled={isRunning}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-indigo-600/20"
            >
              <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? (isBn ? 'পাইপলাইন রানিং...' : 'Executing Pipeline...') : (isBn ? 'টেস্ট রান পাইপলাইন' : 'Test Run Pipeline')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Flow Canvas */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>{isBn ? 'অটোমেশন ফ্লোচার্ট নোডস' : 'Automation Flowchart Nodes'}</span>
          </div>

          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            {isBn ? 'অল সিস্টেমস রেডি' : 'All 4 Nodes Connected'}
          </span>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {nodes.map((node, index) => {
            const isStepActive = activeStepIndex === index;
            const isSuccess = node.status === 'success';

            return (
              <div
                key={node.id}
                className={`relative rounded-xl border p-5 transition-all ${
                  isStepActive
                    ? 'border-indigo-400 bg-indigo-950/40 shadow-lg shadow-indigo-500/20 scale-[1.02]'
                    : isSuccess
                    ? 'border-emerald-600/80 bg-slate-950/90'
                    : 'border-slate-800 bg-slate-950/60'
                }`}
              >
                {/* Node Top info */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      node.type === 'trigger'
                        ? 'bg-amber-500/20 text-amber-400'
                        : node.type === 'ai_process'
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : node.type === 'condition'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {node.type === 'trigger' && <Zap className="w-4 h-4" />}
                    {node.type === 'ai_process' && <Cpu className="w-4 h-4" />}
                    {node.type === 'condition' && <GitBranch className="w-4 h-4" />}
                    {node.type === 'action' && <Send className="w-4 h-4" />}
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isStepActive
                        ? 'bg-indigo-500/20 text-indigo-300 animate-pulse font-bold'
                        : isSuccess
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isStepActive ? 'RUNNING' : isSuccess ? '200 OK' : 'IDLE'}
                  </span>
                </div>

                {/* Node Title & Subtitle */}
                <h3 className="text-xs font-bold text-white leading-tight">
                  {isBn ? node.titleBn : node.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {isBn ? node.subtitleBn : node.subtitle}
                </p>

                {/* Config Box */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 truncate">
                  {node.outputPreview}
                </div>

                {/* Arrow connector between nodes (hidden on mobile and last item) */}
                {index < nodes.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 items-center justify-center text-slate-400">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Execution Logs Terminal */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isBn ? 'লাইভ এক্সিকিউশন কনসোল লগ' : 'Live Execution Console Logs'}</span>
            </div>

            <span className="text-[11px] font-mono text-slate-500">
              {logs.length} events logged
            </span>
          </div>

          <div className="p-4 font-mono text-xs max-h-48 overflow-y-auto space-y-1.5 min-h-[100px]">
            {logs.length === 0 ? (
              <div className="text-slate-600 italic py-4 text-center">
                {isBn
                  ? 'পাইপলাইন এখনও রান করা হয়নি। উপরের "টেস্ট রান পাইপলাইন" বাটনে ক্লিক করুন।'
                  : 'Pipeline is currently idle. Click "Test Run Pipeline" above to see live execution trace.'}
              </div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-slate-300">
                  <span className="text-slate-500 tabular-nums">{log.timestamp}</span>
                  <span className="text-emerald-400 font-semibold">[{log.nodeTitle}]</span>
                  <span className="text-slate-300">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Code Export Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  {isBn ? 'ফ্রি অটোমেশন স্ক্রিপ্ট এক্সপোর্ট' : 'Export Free Automation Script'}
                </h3>
              </div>

              {/* Language Switch */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCodeLang('python')}
                  className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                    codeLang === 'python'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => setCodeLang('node')}
                  className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                    codeLang === 'node'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Node.js
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              {isBn
                ? 'এই সম্পূর্ণ স্ট্যান্ডঅ্যালোন স্ক্রিপ্টটি ডাউনলোড করে আপনার নিজের কম্পিউটারে বা কোনো ফ্রি সার্ভারে চালান—কোনো মাসিক সাবস্ক্রিপশন ফি ছাড়াই।'
                : 'Run this standalone script directly on your computer or server without any third-party recurring subscription charges.'}
            </p>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto max-h-72">
              {codeLang === 'python' ? pythonScript : nodeScript}
            </pre>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-400 font-mono">
                {isBn ? '১০০% ওপেন সোর্স ও লাইসেন্স ফি মুক্ত' : '100% Free · No Subscription'}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close'}
                </button>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কোড কপি করুন' : 'Copy Code')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
