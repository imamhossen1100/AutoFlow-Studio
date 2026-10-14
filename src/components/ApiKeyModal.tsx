import React, { useState, useEffect } from 'react';
import { Key, X, Check, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';
import { getApiKey, setApiKey } from '../services/geminiService';
import { Language } from '../types/automation';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, language }) => {
  const isBn = language === 'bn';
  const [keyInput, setKeyInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = getApiKey();
      if (current && current !== 'MY_GEMINI_API_KEY') {
        setKeyInput(current);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    setApiKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setApiKey('');
    setKeyInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {isBn ? 'Google Gemini AI কনফিগারেশন' : 'Gemini AI Configuration'}
            </h3>
            <span className="text-xs text-slate-400">
              {isBn ? 'ঐচ্ছিক: লাইভ AI দিয়ে নিখুঁত রেজাল্ট পেতে' : 'Optional: Enable Live Google Gemini API'}
            </span>
          </div>
        </div>

        {/* Current Engine Status */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
          <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            {keyInput.trim() ? (
              <span className="text-emerald-400 font-semibold">
                {isBn ? '✓ লাইভ গুগল জেমিনাই AI সংযুক্ত রয়েছে।' : '✓ Live Google Gemini AI connected.'}
              </span>
            ) : (
              <span>
                {isBn
                  ? 'বর্তমানে স্মার্ট ইন্টারনাল ইঞ্জিন সক্রিয়। আপনি নিচের বক্সে আপনার ফ্রি Gemini API Key বসালে সরাসরি গুগলের সার্ভার থেকে আসল লাইভ রেসপন্স আসবে।'
                  : 'Smart internal synthesizer active. Add your free Gemini API Key for 100% custom live neural generations.'}
              </span>
            )}
          </div>
        </div>

        {/* Key Input */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            {isBn ? 'Gemini API Key (সম্পূর্ণ ফ্রি)' : 'Gemini API Key'}
          </label>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 font-mono focus:outline-none focus:border-indigo-500"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>{isBn ? 'গুগল থেকে ফ্রি কি (Key) নিন' : 'Get free key from Google AI Studio'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {keyInput && (
              <button
                onClick={handleClear}
                className="text-red-400 hover:text-red-300 cursor-pointer"
              >
                {isBn ? 'কি মুছে ফেলুন' : 'Clear Key'}
              </button>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
          >
            {isBn ? 'বাতিল' : 'Cancel'}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{savedSuccess ? (isBn ? 'সংরক্ষিত!' : 'Saved!') : (isBn ? 'সেভ করুন' : 'Save Key')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
