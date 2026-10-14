import React, { useState } from 'react';
import {
  Activity,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Copy,
  Check,
  Zap,
  Globe,
  Radio,
  FileCode,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '../types/automation';

interface LogItem {
  id: string;
  timestamp: string;
  event: string;
  source: string;
  status: '200_OK' | '201_CREATED' | 'DISPATCHED';
  durationMs: number;
  payload: Record<string, unknown>;
}

const INITIAL_LOGS: LogItem[] = [
  {
    id: 'log-01',
    timestamp: 'Just now',
    event: 'WEBHOOK_SOCIAL_DISPATCH',
    source: 'AutoFlow Core Engine',
    status: '200_OK',
    durationMs: 142,
    payload: {
      action: 'social_syndication',
      channels: ['YouTube Shorts', 'Facebook Page', 'LinkedIn Pulse', 'X Thread'],
      ai_tokens_used: 840,
      cost_usd: 0.0,
      host: 'Vercel Edge / Localhost:3000',
    },
  },
  {
    id: 'log-02',
    timestamp: '2 mins ago',
    event: 'YOUTUBE_METADATA_COMPILED',
    source: 'Gemini 2.5 Flash Processor',
    status: '200_OK',
    durationMs: 380,
    payload: {
      topic: 'How to Automate Workflows for Free',
      titles_generated: 4,
      hashtags_count: 8,
      chapters_detected: 4,
    },
  },
  {
    id: 'log-03',
    timestamp: '14 mins ago',
    event: 'CLIENT_LEAD_ANALYSIS',
    source: 'Quotation Engine',
    status: '201_CREATED',
    durationMs: 290,
    payload: {
      client: 'Sarah Jenkins (E-Commerce Store)',
      total_quote_usd: 1250,
      total_quote_bdt: 145000,
      turnaround_days: 7,
      email_drafted: true,
      whatsapp_ready: true,
    },
  },
  {
    id: 'log-04',
    timestamp: '45 mins ago',
    event: 'STANDALONE_PYTHON_BOT_PING',
    source: 'autoflow-bot.py (Local VPS)',
    status: 'DISPATCHED',
    durationMs: 68,
    payload: {
      runtime: 'Python 3.11 / Requests',
      zapier_savings_this_run: '$1.25',
      endpoint: '/api/webhook',
      status: 'Pipeline complete',
    },
  },
];

interface LiveExecutionLogsProps {
  language: Language;
}

export const LiveExecutionLogs: React.FC<LiveExecutionLogsProps> = ({ language }) => {
  const isBn = language === 'bn';
  const [logs, setLogs] = useState<LogItem[]>(INITIAL_LOGS);
  const [selectedLog, setSelectedLog] = useState<LogItem>(INITIAL_LOGS[0]);
  const [filter, setFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleCopyPayload = (payload: Record<string, unknown>, id: string) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleTriggerTestWebhook = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const newEntry: LogItem = {
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        event: 'TEST_WEBHOOK_EXECUTION',
        source: 'Manual Dashboard Trigger',
        status: '200_OK',
        durationMs: Math.floor(Math.random() * 150) + 75,
        payload: {
          test_event: 'MANUAL_DISPATCH_PING',
          triggered_by: 'Studio Operator',
          environment: 'Production Edge',
          latency: `${Math.floor(Math.random() * 100) + 40}ms`,
          status: 'SUCCESS',
          message: 'Webhook received & verified with zero cloud fees',
        },
      };
      setLogs((prev) => [newEntry, ...prev]);
      setSelectedLog(newEntry);
      setIsSimulating(false);
    }, 500);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === 'all') return true;
    if (filter === 'dispatched') return log.status === 'DISPATCHED';
    if (filter === 'success') return log.status === '200_OK' || log.status === '201_CREATED';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* SaaS Header Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600/30 via-indigo-600/20 to-cyan-500/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {isBn ? 'রিয়েল-টাইম এক্সিকিউশন ও ওয়েবহুক মনিটর' : 'Live Execution & Webhook Telemetry'}
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live 99.9%
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? 'আপনার সব অটোমেশন রান, ওয়েবহুক রিকোয়েস্ট এবং রেসপন্স টাইম লাইভ মনিটর করুন ($0 খরচে)'
                  : 'Real-time trace logs, latency benchmarks & webhook event payloads for all standalone triggers'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleClearLogs}
              className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isBn ? 'ক্লিয়ার' : 'Clear'}</span>
            </button>

            <button
              onClick={handleTriggerTestWebhook}
              disabled={isSimulating}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Zap className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? (isBn ? 'ডিসপ্যাচিং...' : 'Dispatching...') : (isBn ? 'টেস্ট ওয়েবহুক ফায়ার করুন' : 'Test Webhook Ping')}</span>
            </button>
          </div>
        </div>

        {/* Live metric counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80">
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] font-medium text-slate-400 block">{isBn ? 'মোট এক্সিকিউশন' : 'Total Executions'}</span>
            <div className="text-lg font-bold text-white font-mono mt-0.5">{logs.length} Runs</div>
          </div>
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] font-medium text-slate-400 block">{isBn ? 'গড় রেসপন্স টাইম' : 'Average Latency'}</span>
            <div className="text-lg font-bold text-indigo-400 font-mono mt-0.5">188 ms</div>
          </div>
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] font-medium text-slate-400 block">{isBn ? 'সফলতার হার' : 'Success Rate'}</span>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">100% (Zero Failures)</div>
          </div>
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[11px] font-medium text-slate-400 block">{isBn ? 'সাস সাবস্ক্রিপশন বিল' : 'Live Platform Cost'}</span>
            <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">$0.00 / Mo</div>
          </div>
        </div>
      </div>

      {/* Main SaaS Two-Pane Console: Stream on Left, Payload on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stream List */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col h-[520px]">
          {/* Header filter */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>{isBn ? 'লাইভ ইভেন্ট স্ট্রিম' : 'Live Event Stream'}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-slate-800/50'
                }`}
              >
                {isBn ? 'সব' : 'All'}
              </button>
              <button
                onClick={() => setFilter('success')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  filter === 'success' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-slate-800/50'
                }`}
              >
                200 OK
              </button>
              <button
                onClick={() => setFilter('dispatched')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  filter === 'dispatched' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-slate-800/50'
                }`}
              >
                Dispatched
              </button>
            </div>
          </div>

          {/* Log Stream */}
          <div className="overflow-y-auto flex-1 mt-3 space-y-2 pr-1">
            {filteredLogs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center p-8 text-sm text-slate-500">
                {isBn ? 'কোনো লগ ডাটা নেই। টেস্ট ওয়েবহুক ফায়ার করুন।' : 'No logs found. Fire a test webhook to see live data.'}
              </div>
            ) : (
              filteredLogs.map((log) => {
                const isSelected = selectedLog?.id === log.id;
                return (
                  <button
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/30'
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="font-mono font-bold text-white text-[11px] truncate">
                          {log.event}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {log.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="truncate">{log.source}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 text-[10px] font-semibold">
                          {log.status}
                        </span>
                        <span className="text-slate-500 text-[10px]">{log.durationMs}ms</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Payload Inspector */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isBn ? 'ইভেন্ট পে-লোড ও মেটাডাটা' : 'Event Payload Inspector'}</span>
            </div>

            {selectedLog && (
              <button
                onClick={() => handleCopyPayload(selectedLog.payload, selectedLog.id)}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium cursor-pointer"
              >
                {copiedId === selectedLog.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isBn ? 'JSON কপি' : 'Copy JSON'}</span>
                  </>
                )}
              </button>
            )}
          </div>

          {selectedLog ? (
            <div className="flex-1 overflow-y-auto mt-3 flex flex-col gap-3 font-mono">
              {/* Event Summary Pill Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">EVENT IDENTIFIER</span>
                  <span className="text-white font-semibold truncate block mt-0.5">{selectedLog.event}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">EXECUTION TIME</span>
                  <span className="text-indigo-400 font-semibold block mt-0.5">{selectedLog.durationMs} milliseconds</span>
                </div>
              </div>

              {/* Payload Raw Box */}
              <div className="flex-1 bg-slate-950 rounded-xl p-3.5 border border-slate-800 text-xs overflow-auto">
                <span className="text-[10px] text-slate-500 font-mono block mb-2">// Webhook Dispatch Body (HTTP POST)</span>
                <pre className="text-emerald-300 text-[11px] leading-relaxed whitespace-pre-wrap">
                  {JSON.stringify(selectedLog.payload, null, 2)}
                </pre>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800/80">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isBn ? 'জিরো ক্লাউড কস্ট সাবস্ক্রিপশন' : 'Zero Cloud Cost Overhead'}</span>
                </span>
                <span>UUID: {selectedLog.id}</span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-slate-500">
              {isBn ? 'একটি লগ নির্বাচন করুন' : 'Select a log from the left stream to inspect'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
