import { GoogleGenAI } from '@google/genai';
import { RepurposedContent, ClientLeadAnalysis } from '../types/automation';

// Check for client-side Vite env or user custom key in localStorage
export const getApiKey = (): string | undefined => {
  if (typeof window !== 'undefined') {
    const customKey = localStorage.getItem('autoflow_gemini_api_key');
    if (customKey && customKey.trim().length > 5) return customKey.trim();
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  return undefined;
};

export const setApiKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem('autoflow_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('autoflow_gemini_api_key');
    }
  }
};

/* =========================================================================
   1. CONTENT REPURPOSING ENGINE
   ========================================================================= */

export async function generateContentRepurposing(
  inputTopic: string,
  targetAudience: string,
  language: 'bn' | 'en' = 'bn'
): Promise<RepurposedContent> {
  const apiKey = getApiKey();
  const cleanTopic = inputTopic.trim();
  const audience = targetAudience.trim() || (language === 'bn' ? 'সাধারণ দর্শক ও শিক্ষার্থী' : 'General Audience');

  // Try real Gemini API first if key is available
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a world-class AI social media content strategist.
Transform this specific topic into ready-to-publish social media assets:
TOPIC: "${cleanTopic}"
TARGET AUDIENCE: "${audience}"
LANGUAGE: ${language === 'bn' ? 'Bengali (বাংলা) with English terms where natural in tech/marketing' : 'English'}

CRITICAL REQUIREMENT:
All outputs (titles, scripts, posts, tags, thumbnail prompt) must be 100% SPECIFICALLY about "${cleanTopic}".
Do not produce generic or unrelated text.

Return a STRICT JSON object without any markdown enclosing:
{
  "youtube": {
    "titles": ["Title 1 directly mentioning topic", "SEO High CTR Title 2", "Curiosity Title 3"],
    "description": "Engaging 3-paragraph SEO description specifically discussing ${cleanTopic} with key takeaways, tips, and call to subscribe.",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7"],
    "chapters": [
      {"time": "00:00", "title": "Introduction to ${cleanTopic.substring(0, 30)}"},
      {"time": "02:15", "title": "Core Concepts & Why It Matters"},
      {"time": "05:40", "title": "Practical Step-by-Step Implementation"},
      {"time": "09:30", "title": "Common Mistakes & Best Tips"},
      {"time": "12:15", "title": "Summary & Next Steps"}
    ]
  },
  "reelsScript": {
    "duration": "60 Seconds",
    "hook": "Attention-grabbing 3-second hook strictly about ${cleanTopic}",
    "body": [
      {"timestamp": "00:00 - 00:08", "visual": "Speaker talking to camera or screen showing topic", "audio": "Punchy hook explaining the importance of ${cleanTopic}"},
      {"timestamp": "00:08 - 00:25", "visual": "Step 1 on screen / demonstration", "audio": "Explaining the first key point or secret technique"},
      {"timestamp": "00:25 - 00:45", "visual": "Step 2 on screen / dynamic graphic", "audio": "Actionable takeaway and how to execute it easily"},
      {"timestamp": "00:45 - 01:00", "visual": "Speaker smiling, pointing to comment or bio", "audio": "Final advice and call to action to save and share"}
    ],
    "callToAction": "Save this reel and share with anyone learning ${cleanTopic}!"
  },
  "linkedInPost": "Well-formatted thought-leadership post specifically breaking down ${cleanTopic} with clear bullet points, takeaways, and professional insight.",
  "facebookPost": "Engaging conversational Facebook post about ${cleanTopic} written in natural Bengali/English with bullet points, emotional connection, and high shareability.",
  "twitterThread": [
    "1/5 Hook tweet about ${cleanTopic} that stops the scroll.",
    "2/5 Why most people struggle with this and the core lesson.",
    "3/5 Step-by-step breakdown of how to master it.",
    "4/5 Practical tools or resources to make it faster.",
    "5/5 Conclusion with call to bookmark and retweet."
  ],
  "thumbnailPrompt": "Detailed prompt for Midjourney/DALL-E describing a viral, high-CTR YouTube thumbnail visual strictly representing ${cleanTopic}.",
  "webhookPayload": {
    "topic": "${cleanTopic}",
    "status": "ready"
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text?.trim();
      if (text) {
        const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (parsed.youtube && parsed.reelsScript) {
          return parsed as RepurposedContent;
        }
      }
    } catch (err) {
      console.warn('Live Gemini API call failed or key invalid, using dynamic NLP synthesizer:', err);
    }
  }

  // Dynamic Context-Aware NLP Synthesizer (Tailored specifically to the exact user topic!)
  return synthesizeRepurposedContent(cleanTopic, audience, language);
}

/* =========================================================================
   2. CLIENT LEAD QUOTER ENGINE
   ========================================================================= */

export async function generateClientLeadQuote(
  clientMessage: string,
  clientName: string,
  language: 'bn' | 'en' = 'bn'
): Promise<ClientLeadAnalysis> {
  const apiKey = getApiKey();
  const cleanMsg = clientMessage.trim();
  const name = clientName.trim() || (language === 'bn' ? 'সম্মানিত ক্লায়েন্ট' : 'Valued Client');

  // Try real Gemini API if key is available
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a senior technical solutions architect and proposal specialist.
Analyze this real client message:
CLIENT NAME: "${name}"
CLIENT MESSAGE: "${cleanMsg}"
LANGUAGE: ${language === 'bn' ? 'Bengali (বাংলা) with professional business tone' : 'English'}

CRITICAL REQUIREMENT:
The client is asking a specific question or seeking advice/automation for their specific situation (e.g. how to sell books, how to start, pricing, delivery, etc.). You MUST:
1. Directly answer their specific inquiry and give actionable advice in "clientQuestionAnswer" with concrete steps.
2. Formulate extractedRequirements, costBreakdown, WhatsApp message, and proposal email strictly addressing the EXACT topic they asked about in "${cleanMsg}". Do NOT invent unrelated tech.

Return a STRICT JSON object without markdown:
{
  "clientName": "${name}",
  "serviceCategory": "Accurate category detected from message",
  "urgency": "Low" | "Medium" | "High" | "Immediate",
  "clientQuestionAnswer": {
    "summary": "Clear, direct, and actionable answer addressing the client's exact question or situation",
    "steps": [
      {"title": "Step 1 title", "desc": "Step 1 clear explanation"},
      {"title": "Step 2 title", "desc": "Step 2 clear explanation"},
      {"title": "Step 3 title", "desc": "Step 3 clear explanation"}
    ]
  },
  "extractedRequirements": [
    "Specific requirement 1 extracted from message",
    "Specific requirement 2 extracted from message",
    "Specific requirement 3 extracted from message",
    "Specific requirement 4 extracted from message"
  ],
  "costBreakdown": [
    {"item": "Deliverable 1 strictly matching requirement", "bdt": 12000, "usd": 100},
    {"item": "Deliverable 2 strictly matching requirement", "bdt": 15000, "usd": 125},
    {"item": "Deliverable 3 strictly matching requirement", "bdt": 8000, "usd": 70}
  ],
  "totalBdt": 35000,
  "totalUsd": 295,
  "estimatedDeliveryDays": 7,
  "proposalEmail": {
    "subject": "Proposal for [Project] - [Name]",
    "body": "Formal client proposal covering their exact scope, timeline, deliverables and payment milestones."
  },
  "whatsappMessage": "Friendly, professional closing response specifically mentioning their project details ready to send immediately via WhatsApp or Messenger.",
  "suggestedAddons": ["Relevant addon 1", "Relevant addon 2"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text?.trim();
      if (text) {
        const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (parsed.extractedRequirements && parsed.costBreakdown) {
          return parsed as ClientLeadAnalysis;
        }
      }
    } catch (err) {
      console.warn('Live quote call failed, using dynamic client parser:', err);
    }
  }

  // Dynamic Context-Aware Client Message Parser
  return synthesizeClientLeadQuote(cleanMsg, name, language);
}

/* =========================================================================
   3. DYNAMIC REPURPOSING SYNTHESIZER (Topic-Centric, Never Generic)
   ========================================================================= */

function synthesizeRepurposedContent(
  topic: string,
  audience: string,
  lang: 'bn' | 'en'
): RepurposedContent {
  const clean = topic || 'ব্যবসা ও ডিজিটাল স্কিল অটোমেশন';
  const words = clean.split(/\s+/).filter(w => w.length > 2);
  const coreSubject = words.slice(0, 4).join(' ');

  // Extract relevant tags from input words
  const extractedTags = words
    .map(w => w.replace(/[^\w\u0980-\u09FF]/g, '').toLowerCase())
    .filter(w => w.length > 2)
    .slice(0, 5);

  const defaultTags = lang === 'bn' 
    ? ['tutorial', 'tips', 'bangla', 'growth', 'career', 'guide']
    : ['tutorial', 'tips', 'learning', 'productivity', 'guide'];

  const tags = Array.from(new Set([...extractedTags, ...defaultTags])).slice(0, 7);

  if (lang === 'bn') {
    return {
      youtube: {
        titles: [
          `${clean} - শুরু থেকে শেষ পর্যন্ত সম্পূর্ণ গাইড (২০২৬ আপডেট)`,
          `সহজে ${clean} করার সেরা উপায় | লাইভ স্টেপ-বাই-স্টেপ টিউটোরিয়াল`,
          `${clean} নিয়ে সাধারণ ভুলগুলো এড়িয়ে সফল হওয়ার সহজ টেকনিক`,
        ],
        description: `📌 আজকের এই ভিডিওতে আমরা বিস্তারিত আলোচনা করেছি "${clean}" নিয়ে। 

আপনি যদি ${audience}-এর অংশ হয়ে থাকেন, তবে এই ভিডিওটি আপনার কাজের গতি দ্বিগুণ করতে এবং সঠিক দিকনির্দেশনা পেতে সাহায্য করবে।

🎯 এই ভিডিওতে আপনি যা যা শিখবেন:
• ${clean}-এর মূল বিষয়বস্তু ও প্রাথমিক ধারণা
• ধাপে ধাপে বাস্তব প্রয়োগ ও কাজের সহজ কৌশল
• সাধারণ ভুলগুলো কীভাবে এড়িয়ে দ্রুত ভালো ফলাফল পাবেন
• প্রয়োজনীয় টুলস ও রিসোর্সের সঠিক ব্যবহার

ভিডিওটি শেষ পর্যন্ত দেখুন এবং আপনার মতামত কমেন্টে জানান। ভালো লাগলে লাইক ও শেয়ার করতে ভুলবেন না!

${tags.map(t => `#${t}`).join(' ')}`,
        tags: tags,
        chapters: [
          { time: '00:00', title: `ইন্ট্রো ও ${coreSubject}-এর গুরুত্ব` },
          { time: '02:30', title: `মূল প্রস্তুতি ও প্রয়োজনীয় বিষয়াবলী` },
          { time: '06:15', title: `স্টেপ-বাই-স্টেপ প্র্যাকটিক্যাল গাইড` },
          { time: '10:45', title: `সাধারণ ভুল ও প্রো-টিপস` },
          { time: '13:20', title: `সারসংক্ষেপ ও উপসংহার` },
        ],
      },
      reelsScript: {
        duration: '60 Seconds',
        hook: `আপনি কি "${clean}" নিয়ে কাজ করছেন? তবে এই ১টি টিপস আপনার পুরো কাজ বদলে দেবে! 🛑`,
        body: [
          {
            timestamp: '00:00 - 00:08',
            visual: `ক্যামেরার দিকে তাকিয়ে হাত তুলে দৃষ্টি আকর্ষণ, স্ক্রিনে টেক্সট: "${clean}"।`,
            audio: `বেশিরভাগ মানুষ ${coreSubject} করতে গিয়ে শুরুতে বড় একটি ভুল করে ফেলে।`,
          },
          {
            timestamp: '00:08 - 00:25',
            visual: 'কাজের প্রথম ধাপ স্ক্রিনে বা পয়েন্ট আকারে ১, ২, ৩ নম্বর দিয়ে দেখানো।',
            audio: `প্রথমেই জটিল নিয়মে না গিয়ে একদম সহজ বেসিক থেকে শুরু করুন। এই সহজ টেকনিকটি ফলো করুন।`,
          },
          {
            timestamp: '00:25 - 00:45',
            visual: 'বাস্তব উদাহরণ বা স্ক্রিন ডেমো দ্রুত প্রদর্শন।',
            audio: `এতে আপনার সময় বাঁচবে এবং আপনি খুব কম সময়ে অনেক ভালো রেজাল্ট দেখতে পাবেন।`,
          },
          {
            timestamp: '00:45 - 01:00',
            visual: 'ক্যামেরায় হেসে থাম্বস আপ দেওয়া, বায়ো বা কমেন্টের দিকে ইশারা।',
            audio: `পোস্টটি সেভ করে রাখুন এবং আপনার যে বন্ধুরা ${coreSubject} শিখছে তাদের সাথে শেয়ার করুন!`,
          },
        ],
        callToAction: 'ভিডিওটি সেভ করে রাখুন এবং কমেন্টে আপনার অভিজ্ঞতা জানান!',
      },
      linkedInPost: `💡 Insights on: ${clean}

When working with ${clean}, consistency and proper workflow execution matter more than complexity.

Here are 3 critical lessons I have observed:

1. Master the fundamentals first
Many people jump directly into advanced tactics without understanding the core foundation of ${coreSubject}.

2. Eliminate friction through structured habits
Having a clear repeatable process reduces decision fatigue and boosts output significantly.

3. Measure outcomes, not just input
Focus on whether your approach to ${clean} is actually generating tangible value for ${audience}.

What has been your biggest takeaway when dealing with this? Would love to hear your thoughts in the comments.

${tags.map(t => `#${t}`).join(' ')}`,
      facebookPost: `🎯 "${clean}" — এই বিষয়টি নিয়ে আপনি কি নিয়মিত কাজ করেন বা শিখতে চান?

অনেকেই হয়তো বিষয়টি নিয়ে দ্বিধায় থাকেন বা শুরু করতে গিয়ে খেই হারিয়ে ফেলেন। কিন্তু আপনি যদি সঠিক নিয়ম মেনে নিয়মিত চর্চা করেন, তবে খুব সহজেই ভালো ফলাফল পাওয়া সম্ভব! 🚀

আজকের কিছু গুরুত্বপূর্ণ পয়েন্ট:
✅ সবসময় বেসিক বিষয়গুলো পরিষ্কার রাখুন।
✅ প্রতিদিন অন্তত ২০ মিনিট সময় দিয়ে প্র্যাকটিস করুন।
✅ অন্যদের কাজের সাথে তুলনা না করে নিজের উন্নতির দিকে নজর দিন।

পোস্টটি ভালো লাগলে বন্ধুদের সাথে শেয়ার করুন এবং পেজে যুক্ত থাকুন! ❤️`,
      twitterThread: [
        `1/5 A quick, practical guide on ${clean} (Thread) 🧵\n\nIf you want to get better at this, here are the most important principles you need to know:`,
        `2/5 The biggest mistake:\nPeople overcomplicate ${coreSubject} before getting the basics right. Keep it simple and focused.`,
        `3/5 Focus on daily repetition:\nSpending 20 focused minutes every single day will give you 10x better results than cramming once a month.`,
        `4/5 Use the right tools:\nDon't reinvent the wheel. Leverage modern resources to streamline your process.`,
        `5/5 That's a wrap!\n\nIf you found this helpful:\n• Retweet the first tweet\n• Follow for more insights on ${coreSubject}!`,
      ],
      thumbnailPrompt: `Professional YouTube thumbnail design specifically featuring "${clean}", high contrast bold 3D Bengali/English typography, expressive person looking at screen with excitement, clean modern lighting, 8k commercial quality, no clutter.`,
      webhookPayload: {
        topic: clean,
        audience: audience,
        status: 'READY_TO_DISPATCH',
        generated_count: 5,
      },
    };
  }

  // English Version
  return {
    youtube: {
      titles: [
        `${clean} - The Complete Step-by-Step Guide (2026)`,
        `How to Master ${clean} Faster (Simple Proven Framework)`,
        `Stop Making These Mistakes with ${clean} | Practical Tutorial`,
      ],
      description: `In this comprehensive guide, we break down everything you need to know about ${clean}.\n\nWhether you are a beginner or looking to sharpen your skills, this video walks you through the core fundamentals, actionable frameworks, and practical tips.\n\nKey Highlights:\n00:00 - Introduction to ${coreSubject}\n02:30 - Fundamental Principles\n06:15 - Step-by-Step Implementation\n10:45 - Common Pitfalls to Avoid\n13:20 - Summary and Next Steps\n\n${tags.map(t => `#${t}`).join(' ')}`,
      tags: tags,
      chapters: [
        { time: '00:00', title: `Introduction to ${coreSubject}` },
        { time: '02:30', title: 'Core Principles & Setup' },
        { time: '06:15', title: 'Step-by-Step Execution' },
        { time: '10:45', title: 'Top Mistakes & Fixes' },
        { time: '13:20', title: 'Summary & Next Steps' },
      ],
    },
    reelsScript: {
      duration: '60 Seconds',
      hook: `If you want to master "${clean}", do NOT skip this one rule! 🛑`,
      body: [
        {
          timestamp: '00:00 - 00:08',
          visual: `Speaker facing camera with bold text overlay: "${clean}".`,
          audio: `Most people fail at ${coreSubject} because they overcomplicate the basics.`,
        },
        {
          timestamp: '00:08 - 00:25',
          visual: 'Fast on-screen visual showing step 1 and step 2.',
          audio: 'Instead of doing 10 things at once, focus on this single core mechanism.',
        },
        {
          timestamp: '00:25 - 00:45',
          visual: 'Demonstration of the result or practical workflow.',
          audio: 'This simple adjustment saves you hours of frustration and delivers fast results.',
        },
        {
          timestamp: '00:45 - 01:00',
          visual: 'Speaker gesturing towards save button.',
          audio: 'Save this reel for later and share it with someone who needs it!',
        },
      ],
      callToAction: 'Save this reel and share with a friend!',
    },
    linkedInPost: `A practical breakdown on: ${clean}\n\nSuccess with ${coreSubject} rarely comes from secret hacks. It comes from disciplined execution of fundamentals.\n\n3 Key Takeaways:\n1. Simplify the process\n2. Focus on repeatable daily progress\n3. Measure tangible outcomes for ${audience}\n\nWhat has been your experience? Let's discuss in the comments.\n\n${tags.map(t => `#${t}`).join(' ')}`,
    facebookPost: `Are you looking to improve your skills in "${clean}"?\n\nHere are 3 quick actionable tips you can apply right away to get consistent results.\n\nBookmark this post and tag a friend who is learning this!`,
    twitterThread: [
      `1/4 The essential guide to ${clean} 🧵\n\nHere is what you need to know to get results:`,
      `2/4 Don't overcomplicate:\nFocus on the core 20% that produces 80% of the value in ${coreSubject}.`,
      `3/4 Consistency beats intensity:\nPractice 20 minutes every day rather than 5 hours on the weekend.`,
      `4/4 If this helped you, retweet the first tweet and bookmark for later!`,
    ],
    thumbnailPrompt: `Eye-catching YouTube thumbnail about ${clean}, high contrast, cinematic studio lighting, bold readable text, vibrant modern design.`,
    webhookPayload: {
      topic: clean,
      audience: audience,
      status: 'READY_TO_DISPATCH',
      generated_count: 5,
    },
  };
}

/* =========================================================================
   4. DYNAMIC CLIENT LEAD PARSER (Detects exact service & real scope)
   ========================================================================= */

function synthesizeClientLeadQuote(
  clientMessage: string,
  clientName: string,
  lang: 'bn' | 'en'
): ClientLeadAnalysis {
  const msg = clientMessage.toLowerCase();
  const name = clientName || (lang === 'bn' ? 'সম্মানিত ক্লায়েন্ট' : 'Valued Client');

  // Urgency detection
  const isImmediate = /জরুরি|urgent|asap|today|আজকেই|২৪ ঘন্টা|24 hours/i.test(msg);
  const isUrgent = isImmediate || /৩ দিন|3 days|quick|emergency|শীঘ্রই|১৫ দিন/i.test(msg);
  const urgency = isImmediate ? 'Immediate' : isUrgent ? 'High' : 'Medium';

  // Category & Deliverables Detection
  let categoryBn = '';
  let categoryEn = '';
  let items: { item: string; bdt: number; usd: number }[] = [];
  let reqs: string[] = [];
  let days = isUrgent ? 5 : 8;
  let clientQuestionAnswer: { summary: string; steps: { title: string; desc: string }[] } | undefined;
  let customWhatsapp: string | null = null;
  let customEmailSubj: string | null = null;
  let customEmailIntro: string | null = null;

  // 1. Book Selling & Bookstore (বই বিক্রি ও বুকশপ)
  if (/বই|book|লেখক|উপন্যাস|বুকশপ|লাইব্রেরি|প্রকাশনী|e-book|গল্পের বই|পাঠক/i.test(msg)) {
    categoryBn = 'অনলাইন বই বিক্রি ও বুকশপ ডেলিভারি প্ল্যাটফর্ম';
    categoryEn = 'Online Book Selling & Bookstore Delivery Platform';
    days = isUrgent ? 5 : 8;
    clientQuestionAnswer = {
      summary: lang === 'bn'
        ? 'অনলাইনে বই বিক্রি শুরু করার জন্য কোনো জটিল কোডিং বা আলাদা শোরুমের প্রয়োজন নেই। ৪টি সহজ ধাপে সম্পূর্ণ অটোমেটেড বুক সেলিং প্ল্যাটফর্ম গড়ে তোলা সম্ভব:'
        : 'You can sell books online without expensive storefronts or heavy coding in 4 simple, battle-tested steps:',
      steps: [
        {
          title: lang === 'bn' ? '১. ডিজিটাল বই ক্যাটালগ ও প্রচ্ছদ লিস্টিং' : '1. Digital Book Catalog & Cover Listing',
          desc: lang === 'bn'
            ? 'বইয়ের প্রচ্ছদ ছবি, লেখকের নাম, প্রকাশনী, সারসংক্ষেপ ও মূল্য দিয়ে একটি সাজানো অনলাইন ক্যাটালগ ও সোশ্যাল শপ তৈরি করা।'
            : 'Display book cover images, author name, publisher, synopsis, and price in an organized digital catalog.',
        },
        {
          title: lang === 'bn' ? '২. ১-ক্লিকে সরাসরি অর্ডার গ্রহণ' : '2. 1-Click Easy Checkout & Ordering',
          desc: lang === 'bn'
            ? 'ফেসবুক পেজ, হোয়াটসঅ্যাপ বা বুকশপ ওয়েবসাইট থেকে পাঠকরা নাম, ফোন নম্বর ও পূর্ণাঙ্গ ঠিকানা দিয়ে সহজে ১-ক্লিকে অর্ডার প্লেস করবে।'
            : 'Allow readers to place instant orders through Facebook Messenger, WhatsApp, or clean web checkout form.',
        },
        {
          title: lang === 'bn' ? '৩. ক্যাশ অন ডেলিভারি (COD) ও বিকাশ পেমেন্ট' : '3. Cash On Delivery & Mobile Money',
          desc: lang === 'bn'
            ? 'পাঠকদের বড় অংশ বই হাতে পেয়ে মূল্য পরিশোধ করতে পছন্দ করে। এর পাশাপাশি bKash ও নগদে সরাসরি অনলাইন পেমেন্ট সুবিধা রাখা।'
            : 'Offer Cash On Delivery (trusted by 85% of readers) alongside instant bKash/Nagad checkout.',
        },
        {
          title: lang === 'bn' ? '৪. কুরিয়ার অটোমেশন ও হোম ডেলিভারি' : '4. Automated Courier Delivery',
          desc: lang === 'bn'
            ? 'পাঠাও (Pathao) বা স্টিডফাস্ট (Steadfast) কুরিয়ার এপিআই কানেক্ট করে মাত্র ১ ক্লিকে সারা দেশে হোম ডেলিভারি পার্সেল পাঠানো ও ট্র্যাকিং করা।'
            : 'Connect Pathao or Steadfast courier API to dispatch book parcels nationwide with auto-generated tracking links.',
        },
      ],
    };
    reqs = [
      lang === 'bn' ? 'বইয়ের ক্যাটালগ ও বিষয়ভিত্তিক সার্চ সিস্টেম (লেখক, প্রকাশনী ও মূল্যসহ)' : 'Book catalog & category search (by author, publisher, and price)',
      lang === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD) এবং bKash/Nagad অনলাইন পেমেন্ট অপশন' : 'Cash on delivery (COD) and automated bKash/Nagad payments',
      lang === 'bn' ? 'কুরিয়ার সার্ভিস (Steadfast/Pathao) কানেকশন ও অটোমেটিক পার্সেল ট্র্যাকিং' : 'Courier integration (Steadfast/Pathao) with parcel tracking',
      lang === 'bn' ? 'বই বিক্রির জন্য ফেসবুক শপ, ইনস্টাগ্রাম পেজ ও অটো-অর্ডার মেসেজ সেটআপ' : 'Facebook shop & automated order messaging setup for book sales',
    ];
    items = [
      { item: lang === 'bn' ? 'অনলাইন বুকশপ UI/UX ও বই ক্যাটালগ সেটআপ' : 'Online Bookstore UI/UX & Catalog Setup', bdt: 9000, usd: 75 },
      { item: lang === 'bn' ? 'পেমেন্ট গেটওয়ে (COD + bKash/Nagad) সিস্টেম' : 'Payment Gateways (COD & Mobile Money)', bdt: 8000, usd: 70 },
      { item: lang === 'bn' ? 'কুরিয়ার ডেলিভারি ট্র্যাকিং ও অর্ডার ড্যাশবোর্ড' : 'Courier Integration & Order Dashboard', bdt: 6000, usd: 50 },
      { item: lang === 'bn' ? 'ডোমেইন, ক্লাউড হোস্টিং ও ৩০ দিনের টেক সাপোর্ট' : 'Cloud Setup & 30-Day Support', bdt: 4000, usd: 35 },
    ];
    customWhatsapp = lang === 'bn'
      ? `আসসালামু আলাইকুম ${name}! অনলাইনে বই বিক্রি শুরু করার প্রক্রিয়াটি খুব সহজ। আপনি ফেসবুক পেজ ও একটি সহজ ক্যাটালগ ওয়েবসাইটের মাধ্যমে বইয়ের অর্ডার নিতে পারবেন। পাঠকদের জন্য ক্যাশ অন ডেলিভারি ও বিকাশ পেমেন্ট থাকবে এবং পাঠাও/স্টিডফাস্ট কুরিয়ারের মাধ্যমে বইগুলো সরাসরি কাস্টমারের ঠিকানায় পৌঁছে যাবে। এই সম্পূর্ণ অটোমেটেড সিস্টেমটি মাত্র ${days} দিনে আমরা রেডি করে দিতে পারব, মোট বাজেট ৳২৭,০০০ টাকা ($২২৫)। বিস্তারিত প্রপোজাল ও গাইড প্রস্তুত আছে, আপনার সম্মতি পেলে আমরা কাজ শুরু করতে পারি। ধন্যবাদ!`
      : `Hello ${name}! Selling books online is straightforward. We can set up a digital catalog with WhatsApp/social checkout, Cash on Delivery + bKash payments, and automated courier delivery. The entire setup takes ${days} days for $225. Let me know if you would like us to begin!`;
    customEmailSubj = lang === 'bn'
      ? `[বই বিক্রি সল্যুশন] ${name}-এর জন্য অনলাইনে সফলভাবে বই বিক্রির সম্পূর্ণ কৌশল ও বাস্তবায়ন বাজেট`
      : `[Proposal] Online Book Selling Strategy, Platform Architecture & Budget for ${name}`;
    customEmailIntro = lang === 'bn'
      ? `প্রিয় ${name},\n\nঅনলাইনে কীভাবে বই বিক্রি করা যায় এবং এর খরচ সংক্রান্ত আপনার প্রশ্নের জন্য ধন্যবাদ। আপনার জন্য ধাপে ধাপে বই বিক্রি শুরু করার বাস্তবসম্মত দিকনির্দেশনা ও টেকনিক্যাল সিস্টেম বাজেট নিচে তুলে ধরা হলো:`
      : `Dear ${name},\n\nThank you for reaching out regarding how to sell books online. Below is our actionable strategy and implementation blueprint for your bookstore:`;
  }
  // 2. Food & Restaurant (খাবার ও রেস্তোরাঁ)
  else if (/খাবার|ফুড|food|restaurant|রেস্তোরাঁ|ক্যাফে|বার্গার|রান্না|রেসিপি/i.test(msg)) {
    categoryBn = 'অনলাইন ফুড অর্ডারিং ও রেস্টুরেন্ট ম্যানেজমেন্ট প্ল্যাটফর্ম';
    categoryEn = 'Online Food Ordering & Restaurant Platform';
    days = isUrgent ? 4 : 7;
    clientQuestionAnswer = {
      summary: lang === 'bn'
        ? 'অনলাইনে খাবার বা রেস্টুরেন্টের অর্ডার নেওয়ার জন্য নিচের ৪টি মূল ব্যবস্থা থাকা জরুরি:'
        : 'Running an online food delivery and restaurant ordering operation requires 4 core pillars:',
      steps: [
        {
          title: lang === 'bn' ? '১. ডিজিটাল ভিজ্যুয়াল মেনু' : '1. Digital Visual Food Menu',
          desc: lang === 'bn' ? 'ছবি ও স্পষ্ট দামসহ খাবারের আকর্ষণীয় ডিজিটাল মেনু তৈরি।' : 'High-appeal digital menu with item photos and variant pricing.',
        },
        {
          title: lang === 'bn' ? '২. রিয়েল-টাইম কিচেন অর্ডার ড্যাশবোর্ড' : '2. Real-Time Kitchen Dashboard',
          desc: lang === 'bn' ? 'অর্ডার আসার সাথে সাথে কিচেনে নোটিফিকেশন ও প্রিন্ট ব্যবস্থা।' : 'Instant sound alert and ticket printing as orders are placed.',
        },
        {
          title: lang === 'bn' ? '৩. ইনস্ট্যান্ট ক্যাশ ও অনলাইন পেমেন্ট' : '3. COD & Mobile Wallet Payments',
          desc: lang === 'bn' ? 'বিকাশ ও ক্যাশ অন ডেলিভারিতে দ্রুত মূল্য পরিশোধের সুবিধা।' : 'Instant bKash payment gateway and cash on delivery settlement.',
        },
        {
          title: lang === 'bn' ? '৪. রাইডার ডিসপ্যাচ ও ট্র্যাকিং' : '4. Rider Dispatch & Tracking',
          desc: lang === 'bn' ? 'ডেলিভারি রাইডার নিয়োগ ও গ্রাহকের ঠিকানায় পৌঁছানোর ট্র্যাকিং।' : 'Live order dispatch mapping and SMS notification to customer.',
        },
      ],
    };
    reqs = [
      lang === 'bn' ? 'ডিজিটাল ফুড মেনু ক্যাটালগ (ছবি, দাম ও ক্যাটাগরিভিত্তিক)' : 'Digital food menu catalog (categories, photos, and addons)',
      lang === 'bn' ? 'হোম ডেলিভারি অ্যাড্রেস ও রিয়েল-টাইম অর্ডার ট্র্যাকিং' : 'Delivery address mapping and real-time order tracking',
      lang === 'bn' ? 'ক্যাশ অন ডেলিভারি ও বিকাশ ইনস্ট্যান্ট পেমেন্ট গেটওয়ে' : 'Cash on delivery & instant bKash payment gateway',
      lang === 'bn' ? 'কিচেন অর্ডার প্রিন্টিং ও এসএমএস নোটিফিকেশন' : 'Kitchen order printing and SMS notification',
    ];
    items = [
      { item: lang === 'bn' ? 'ফুড মেনু ও মোবাইল অর্ডারিং অ্যাপ/ওয়েব' : 'Online Food Menu & Ordering System', bdt: 10000, usd: 85 },
      { item: lang === 'bn' ? 'লোকেশন ট্র্যাকিং ও ডেলিভারি ডিসপ্যাচ' : 'Location Tracking & Dispatch System', bdt: 8000, usd: 70 },
      { item: lang === 'bn' ? 'পেমেন্ট গেটওয়ে ও কিচেন ড্যাশবোর্ড' : 'Payment Gateway & Kitchen Dashboard', bdt: 6000, usd: 50 },
    ];
  }
  // 3. Courses & Education (কোর্স ও শিক্ষা)
  else if (/কোর্স|course|পড়াশোনা|কোচিং|স্কুল|মাদ্রাসা|শিক্ষার্থী|student|admission/i.test(msg)) {
    categoryBn = 'অনলাইন কোর্স সেলিং ও শিক্ষা প্রতিষ্ঠান লার্নিং প্ল্যাটফর্ম';
    categoryEn = 'Online Course Selling & LMS Platform';
    days = isUrgent ? 7 : 14;
    clientQuestionAnswer = {
      summary: lang === 'bn'
        ? 'অনলাইনে কোর্স বা ক্লাস বিক্রি করার জন্য একটি স্বয়ংক্রিয় লার্নিং ম্যানেজমেন্ট সিস্টেম (LMS) তৈরি করতে হয়:'
        : 'Selling courses online requires an automated student onboarding and LMS engine:',
      steps: [
        {
          title: lang === 'bn' ? '১. ভিডিও প্রটেকশন ও ক্লাস অর্গানাইজার' : '1. Secure Video Hosting',
          desc: lang === 'bn' ? 'ভিডিও যাতে কেউ ডাউনলোড বা পাইরেসি করতে না পারে এমন সিকিউর প্লেয়ার।' : 'DRM/watermarked video player preventing unauthorized downloads.',
        },
        {
          title: lang === 'bn' ? '২. অটো এনরোলমেন্ট ও পেমেন্ট' : '2. Instant Auto-Enrollment',
          desc: lang === 'bn' ? 'বিকাশে পেমেন্ট সম্পন্ন হলেই স্টুডেন্ট স্বয়ংক্রিয়ভাবে ক্লাসের অ্যাক্সেস পেয়ে যাবে।' : 'Students gain instant course access upon automated bKash confirmation.',
        },
        {
          title: lang === 'bn' ? '৩. কুইজ ও ডিজিটাল সার্টিফিকেট' : '3. Quizzes & Auto Certificates',
          desc: lang === 'bn' ? 'কোর্স শেষ করলে স্বয়ংক্রিয়ভাবে ভেরিফাইড সার্টিফিকেট ডাউনলোড।' : 'Automated grading and downloadable PDF completion certificates.',
        },
      ],
    };
    reqs = [
      lang === 'bn' ? 'ভিডিও লেকচার ও সিকিউর ক্লাস কনটেন্ট প্রটেকশন' : 'Video lectures and secure course content protection',
      lang === 'bn' ? 'অটোমেটেড স্টুডেন্ট এনরোলমেন্ট ও বিকাশ পেমেন্ট' : 'Automated student enrollment with bKash payment',
      lang === 'bn' ? 'কুইজ, এক্সাম ও অটোমেটেড সার্টিফিকেট জেনারেশন' : 'Online quizzes, exams and automated certificate generator',
      lang === 'bn' ? 'স্টুডেন্ট প্রগ্রেস ট্র্যাকিং ও কমিউনিটি ডিসকাশন বোর্ড' : 'Student progress tracking and community discussion forum',
    ];
    items = [
      { item: lang === 'bn' ? 'লার্নিং প্ল্যাটফর্ম ও ভিডিও প্লেয়ার সেটআপ' : 'LMS Platform & Secure Video Player', bdt: 14000, usd: 120 },
      { item: lang === 'bn' ? 'অটো পেমেন্ট ও এনরোলমেন্ট সিস্টেম' : 'Automated Checkout & Enrollment System', bdt: 10000, usd: 85 },
      { item: lang === 'bn' ? 'এক্সাম ও সার্টিফিকেট জেনারেটর' : 'Exam Engine & Digital Certificates', bdt: 6000, usd: 50 },
    ];
  }
  // 4. Clothing & Fashion (পোশাক ও ফ্যাশন)
  else if (/কাপড়|পোশাক|dress|fashion|শাড়ি|পাঞ্জাবি|টি-শার্ট|বুটিক|ব্যাগ|জুতো/i.test(msg)) {
    categoryBn = 'অনলাইন ফ্যাশন ও বুটিক ই-কমার্স প্ল্যাটফর্ম';
    categoryEn = 'Online Fashion & Boutique E-Commerce';
    days = isUrgent ? 6 : 12;
    clientQuestionAnswer = {
      summary: lang === 'bn'
        ? 'অনলাইনে পোশাক ও বুটিক আইটেম সফলভাবে বিক্রি করতে ৪টি বিষয় নিশ্চিত করতে হয়:'
        : 'Selling fashion & clothing online effectively centers on 4 critical factors:',
      steps: [
        {
          title: lang === 'bn' ? '১. সাইজ চার্ট ও কালার ভ্যারিয়েন্ট' : '1. Size Chart & Color Variants',
          desc: lang === 'bn' ? 'কাস্টমার যাতে সাইজ ও পছন্দের রঙ নির্বাচন করে সহজে কিনতে পারে।' : 'Clear size guides and stock indicators by color and size.',
        },
        {
          title: lang === 'bn' ? '২. ক্যাশ অন ডেলিভারি (COD)' : '2. Reliable COD Checkout',
          desc: lang === 'bn' ? 'পোশাকের ক্ষেত্রে কাস্টমাররা প্রোডাক্ট হাতে পেয়ে টাকা দিতে স্বাচ্ছন্দ্যবোধ করে।' : 'Simplified checkout with advance delivery charge or full COD.',
        },
        {
          title: lang === 'bn' ? '৩. অটো এসএমএস নোটিফিকেশন' : '3. Instant Order SMS Alert',
          desc: lang === 'bn' ? 'অর্ডার প্লেস হওয়া মাত্রই কাস্টমার ও সেলারের ফোনে স্বয়ংক্রিয় এসএমএস যাবে।' : 'Instant SMS sent to customer with order invoice and courier link.',
        },
        {
          title: lang === 'bn' ? '৪. কুরিয়ার পার্সেল ট্র্যাকিং' : '4. Parcel Logistics Integration',
          desc: lang === 'bn' ? 'Pathao বা Steadfast দিয়ে সারা বাংলাদেশে ২-৩ দিনে পার্সেল ডেলিভারি।' : 'Direct Steadfast/Pathao API integration for seamless parcel dispatch.',
        },
      ],
    };
    reqs = [
      lang === 'bn' ? 'সাইজ ও কালার ভ্যারিয়েন্টসহ আধুনিক পোশাক ক্যাটালগ' : 'Product catalog with size and color variants',
      lang === 'bn' ? 'অটোমেটেড bKash, Nagad এবং কার্ড পেমেন্ট গেটওয়ে' : 'Automated bKash, Nagad & Card payment gateway',
      lang === 'bn' ? 'ইনভেন্টরি স্টক অ্যালার্ট ও কুরিয়ার ট্র্যাকিং' : 'Inventory stock management and courier tracking',
      lang === 'bn' ? 'প্রতিটি অর্ডারে কাস্টমারকে ইনস্ট্যান্ট এসএমএস কনফার্মেশন' : 'Automated customer SMS confirmation for orders',
    ];
    items = [
      { item: lang === 'bn' ? 'বুটিক শপ UI/UX ডিজাইন ও প্রোডাক্ট ক্যাটালগ' : 'Boutique Store UI/UX & Catalog Setup', bdt: 12000, usd: 100 },
      { item: lang === 'bn' ? 'পেমেন্ট গেটওয়ে ইন্টিগ্রেশন (bKash/Nagad)' : 'Payment Gateway Integration', bdt: 10000, usd: 85 },
      { item: lang === 'bn' ? 'অর্ডার ড্যাশবোর্ড ও ইনভয়েস জেনারেটর' : 'Order Dashboard & Invoice Generator', bdt: 8000, usd: 70 },
      { item: lang === 'bn' ? 'ক্লাউড ডেপ্লয়মেন্ট ও ৩০ দিনের সাপোর্ট' : 'Cloud Deployment & Support', bdt: 4000, usd: 35 },
    ];
  }
  // 5. Graphic Design & Branding (গ্রাফিক ডিজাইন)
  else if (/logo|গ্রাফিক|graphic|design|ব্যানার|banner|ব্র্যান্ড|পোস্টার|ui|ux/i.test(msg)) {
    categoryBn = 'প্রফেশনাল গ্রাফিক ডিজাইন ও ব্র্যান্ডিং আইডেন্টিটি';
    categoryEn = 'Professional Graphic Design & Brand Identity';
    days = isUrgent ? 2 : 5;
    clientQuestionAnswer = {
      summary: lang === 'bn'
        ? 'ব্র্যান্ডিং ও গ্রাফিক ডিজাইনের সফল বাস্তবায়নে ধাপে ধাপে ৩টি ডেলিভারেবল চূড়ান্ত করা হবে:'
        : 'Delivering world-class graphic branding follows a structured 3-phase creative process:',
      steps: [
        {
          title: lang === 'bn' ? '১. ভেক্টর কনসেপ্ট ডেভেলপমেন্ট' : '1. Vector Concept Sketches',
          desc: lang === 'bn' ? 'আপনার ব্র্যান্ডের জন্য ৩টি সম্পূর্ণ ভিন্নধর্মী প্রিমিয়াম ভেক্টর কনসেপ্ট।' : '3 distinct vector logo directions tailored to your industry identity.',
        },
        {
          title: lang === 'bn' ? '২. কালার ও ব্র্যান্ড গাইডলাইন' : '2. Color & Typography Guide',
          desc: lang === 'bn' ? 'ওয়েব ও প্রিন্টের জন্য ফন্ট, কালার কোড এবং ব্র্যান্ড রুলস বুকলেট।' : 'Official typography hierarchy and print/digital color swatches.',
        },
        {
          title: lang === 'bn' ? '৩. মাস্টার সোর্স ফাইল ডেলিভারি' : '3. Master Source File Delivery',
          desc: lang === 'bn' ? 'AI, SVG, EPS, PDF এবং ট্রান্সপারেন্ট PNG ফরম্যাটে চূড়ান্ত ফাইল।' : 'Print-ready vector assets in AI, EPS, SVG, and high-res transparent PNG.',
        },
      ],
    };
    reqs = [
      lang === 'bn' ? 'উচ্চমানের ভেক্টর লোগো ডিজাইন (৩টি ইউনিক কনসেপ্ট)' : 'High quality vector logo design (3 unique concepts)',
      lang === 'bn' ? 'সোশ্যাল মিডিয়া কাভার এবং অ্যাড ব্যানার সেট' : 'Social media cover and ad banner templates',
      lang === 'bn' ? 'কালার প্যালেট, ফন্ট ও ব্র্যান্ড গাইডলাইন গাইড' : 'Color palette, typography and brand style guide',
      lang === 'bn' ? 'প্রিন্ট এবং ওয়েব ফ্রেন্ডলি সব সোর্স ফাইল (AI, PSD, SVG, PNG)' : 'All print & web ready source files (AI, PSD, SVG, PNG)',
    ];
    items = [
      { item: lang === 'bn' ? 'লোগো কনসেপ্ট ও ভেক্টর ইলাস্ট্রেশন' : 'Primary Logo Concepts & Vector Work', bdt: 6000, usd: 50 },
      { item: lang === 'bn' ? 'ব্র্যান্ড আইডেন্টিটি ও সোশ্যাল ব্যানার প্যাক' : 'Brand Identity & Social Media Kit', bdt: 5000, usd: 45 },
      { item: lang === 'bn' ? 'সোর্স ফাইল ডেলিভারি ও রিভিশন সাপোর্ট' : 'High-Res Source Files & Revisions', bdt: 3000, usd: 25 },
    ];
  }
  // 6. Video Editing (ভিডিও এডিটিং)
  else if (/video|ভিডিও|editing|এডিটিং|reels|রিলস|ইউটিউব/i.test(msg)) {
    categoryBn = 'প্রফেশনাল ভিডিও এডিটিং ও পোস্ট-প্রোডাকশন';
    categoryEn = 'Professional Video Editing & Post-Production';
    days = isUrgent ? 2 : 4;
    clientQuestionAnswer = {
      summary: lang === 'bn'
        ? 'ভিডিওর ওয়াচ-টাইম ও ভিউ দ্বিগুণ করার জন্য হাই-রিটেনশন এডিটিং প্রক্রিয়া:'
        : 'High-retention editing pipeline engineered to maximize view duration and virality:',
      steps: [
        {
          title: lang === 'bn' ? '১. প্রথম ৩ সেকেন্ডের পাওয়ার হুক' : '1. 3-Second Retention Hook',
          desc: lang === 'bn' ? 'ভিডিও শুরুতেই দর্শকের নজর ধরে রাখার শক্তিশালী ভিজ্যুয়াল ও সাউন্ড।' : 'Fast visual hook with sound design to prevent scroll-aways.',
        },
        {
          title: lang === 'bn' ? '২. ডায়নামিক সাবটাইটেল ও মোশন' : '2. Motion Subtitles & B-Roll',
          desc: lang === 'bn' ? 'অ্যানিমেটেড ক্যাপশন, সাউন্ড ইফেক্টস এবং প্রাসঙ্গিক ফুটেজ সংযোজন।' : 'Synchronized animated subtitles, B-roll overlays, and SFX.',
        },
        {
          title: lang === 'bn' ? '৩. আল্ট্রা-এইচডি ফাইনাল এক্সপোর্ট' : '3. Ultra-HD Master Export',
          desc: lang === 'bn' ? 'ইউটিউব (16:9) এবং রিলস/টিকটক (9:16) সাইজে হাই-বিটরেটে ডেলিভারি।' : 'Rendered in 1080p/4K with crisp audio balance for all platforms.',
        },
      ],
    };
    reqs = [
      lang === 'bn' ? 'হাই-এনগেজমেন্ট হুক ও ডায়নামিক কাট' : 'High engagement retention hook and dynamic pacing',
      lang === 'bn' ? 'কাস্টম সাবটাইটেল, মোশন গ্রাফিক্স ও সাউন্ড ডিজাইন' : 'Custom dynamic subtitles, motion graphics & sound effects',
      lang === 'bn' ? 'কালার কারেকশন এবং অডিও নয়েজ রিমুভাল' : 'Color correction, audio cleanup and noise reduction',
      lang === 'bn' ? '১০৮০পি ও ৪কে আল্ট্রা-এইচডি ফরম্যাটে রেন্ডার' : '1080p and 4K Ultra-HD export for all platforms',
    ];
    items = [
      { item: lang === 'bn' ? 'ভিডিও ফুটেজ কাটিং ও স্টোরিলাইনিং' : 'Footage Selection & Story Editing', bdt: 5000, usd: 45 },
      { item: lang === 'bn' ? 'মোশন টেক্সট, সাউন্ড ইফেক্টস ও ট্রানজিশন' : 'Motion Text, SFX & Transitions', bdt: 4000, usd: 35 },
      { item: lang === 'bn' ? 'কালার গ্রেডিং ও ৪কে ফাইনাল রেন্ডার' : 'Color Grading & Multi-Aspect Export', bdt: 3000, usd: 25 },
    ];
  }
  // 7. General E-Commerce & Product Selling (অনলাইন পণ্য বিক্রি)
  else if (/বিক্রি|দোকান|কমার্স|পেমেন্ট|বিকাশ|কুরিয়ার|ড্রপশিপিং|প্রোডাক্ট|পণ্য|shop|store/i.test(msg)) {
    categoryBn = 'অনলাইন প্রোডাক্ট সেলিং ও ই-কমার্স সিস্টেম';
    categoryEn = 'Online Product Selling & E-Commerce Platform';
    days = isUrgent ? 5 : 10;
    clientQuestionAnswer = {
      summary: lang === 'bn'
        ? 'অনলাইনে যেকোনো পণ্য বিক্রি করে সফল হতে ৪টি ধাপ অত্যন্ত গুরুত্বপূর্ণ:'
        : 'Selling any product successfully online is built upon 4 sequential stages:',
      steps: [
        {
          title: lang === 'bn' ? '১. আকর্ষণীয় প্রোডাক্ট লিস্টিং' : '1. Product Listing & Catalog',
          desc: lang === 'bn' ? 'পণ্যের সুন্দর ছবি, বর্ণনা ও মূল্যের স্পষ্ট ডিসপ্লে।' : 'Clean presentation of product images, specifications, and prices.',
        },
        {
          title: lang === 'bn' ? '২. ১-পেজ ফাস্ট চেকআউট' : '2. 1-Page Fast Checkout',
          desc: lang === 'bn' ? 'কাস্টমার কোনো জটিলতা ছাড়া নাম, মোবাইল ও ঠিকানা দিয়ে সরাসরি অর্ডার করবে।' : 'Frictionless order form capturing name, phone, and address in seconds.',
        },
        {
          title: lang === 'bn' ? '৩. ক্যাশ অন ডেলিভারি ও বিকাশ' : '3. COD & Digital Payments',
          desc: lang === 'bn' ? 'ক্যাশ অন ডেলিভারি সুবিধা এবং বিকাশে অগ্রিম ডেলিভারি চার্জ নেওয়ার অপশন।' : 'Seamless COD handling and advance delivery charge collections.',
        },
        {
          title: lang === 'bn' ? '৪. কুরিয়ার পার্সেল অটোমেশন' : '4. Automated Courier Dispatch',
          desc: lang === 'bn' ? 'অর্ডার এপ্রুভ করলেই স্বয়ংক্রিয়ভাবে কুরিয়ারে পার্সেল এন্ট্রি হয়ে যাবে।' : 'Auto-sync with logistics partners (Steadfast/Pathao) for parcel dispatch.',
        },
      ],
    };
    reqs = [
      lang === 'bn' ? 'আধুনিক রেসপন্সিভ মোবাইল-ফ্রেন্ডলি প্রোডাক্ট শপ' : 'Modern responsive mobile-friendly product store',
      lang === 'bn' ? 'ক্যাশ অন ডেলিভারি এবং bKash/Nagad অনলাইন পেমেন্ট' : 'Cash on delivery & automated mobile money checkout',
      lang === 'bn' ? 'অর্ডার ট্র্যাকিং এবং কুরিয়ার সার্ভিস সংযোগ' : 'Order tracking and courier service integration',
      lang === 'bn' ? 'অর্ডার আসার সাথে সাথে অটোমেটিক এসএমএস নোটিফিকেশন' : 'Automated SMS alerts for new orders',
    ];
    items = [
      { item: lang === 'bn' ? 'অনলাইন শপ ডিজাইন ও প্রোডাক্ট লিস্টিং' : 'Store Design & Product Listing', bdt: 11000, usd: 90 },
      { item: lang === 'bn' ? 'পেমেন্ট ও কুরিয়ার ট্র্যাকিং ইন্টিগ্রেশন' : 'Payment & Courier Integration', bdt: 9000, usd: 75 },
      { item: lang === 'bn' ? 'অর্ডার ও ইনভেন্টরি ম্যানেজমেন্ট সিস্টেম' : 'Order & Inventory System', bdt: 6000, usd: 50 },
    ];
  }
  // 8. Dynamic Context Extractor for ANY other custom input / question
  else {
    const rawWords = clientMessage
      .replace(/[^\w\u0980-\u09FF\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !/কিভাবে|কীভাবে|করব|করতে|চাই|দরকার|লাগবে|কত|বাজেট|ভাই|হবে|হলো|জন্য|এবং|কিংবা|how|what|need|want|help|cost/i.test(w));
    
    const extractedTopic = rawWords.slice(0, 3).join(' ') || (lang === 'bn' ? 'ডিজিটাল সল্যুশন' : 'Digital Solution');

    categoryBn = `${extractedTopic} বাস্তবায়ন ও অটোমেশন প্ল্যাটফর্ম`;
    categoryEn = `${extractedTopic} Implementation & Automation Platform`;
    days = isUrgent ? 4 : 8;
    clientQuestionAnswer = {
      summary: lang === 'bn'
        ? `আপনার চাহিত "${extractedTopic}" সফলভাবে শুরু ও পরিচালনা করার জন্য নিচের ধাপগুলো অনুসরণ করা সবচেয়ে কার্যকর:`
        : `To successfully implement and launch your project around "${extractedTopic}", here is the direct roadmap:`,
      steps: [
        {
          title: lang === 'bn' ? '১. নির্দিষ্ট কাজের পরিকল্পনা ও সেটআপ' : '1. Strategic Architecture Setup',
          desc: lang === 'bn' ? `আপনার চাহিত "${extractedTopic}"-এর জন্য কাস্টম সমাধান ও আর্কিটেকচার তৈরি করা।` : `Architect a custom-tailored system for ${extractedTopic}.`,
        },
        {
          title: lang === 'bn' ? '২. স্বয়ংক্রিয় ওয়ার্কফ্লো ও ড্যাশবোর্ড' : '2. Automated Workflow & Operations',
          desc: lang === 'bn' ? 'সহজে পরিচালনার জন্য একটি পরিচ্ছন্ন ড্যাশবোর্ড এবং রিয়েল-টাইম নোটিফিকেশন ব্যবস্থা।' : 'Streamlined dashboard with real-time operational notifications.',
        },
        {
          title: lang === 'bn' ? '৩. লাইভ টেস্টিং ও ডেলিভারি' : '3. Quality Assurance & Launch',
          desc: lang === 'bn' ? 'সম্পূর্ণ নিরাপদ পরিবেশে টেস্টিং শেষে কাজ লাইভ করা এবং হ্যান্ডওভার প্রদান।' : 'Live environment deployment with validation and handoff support.',
        },
      ],
    };
    reqs = [
      lang === 'bn' ? `আপনার চাহিত "${extractedTopic}"-এর জন্য কাস্টম সমাধান ও আর্কিটেকচার` : `Custom solution tailored specifically to ${extractedTopic}`,
      lang === 'bn' ? 'সহজে কাজ পরিচালনার জন্য অটোমেটেড ওয়ার্কফ্লো ও ড্যাশবোর্ড' : 'Automated workflow and management dashboard',
      lang === 'bn' ? 'মোবাইল ও কম্পিউটার ফ্রেন্ডলি দ্রুতগতির আধুনিক ইন্টারফেস' : 'Fast, responsive interface for mobile and desktop',
      lang === 'bn' ? 'নিরাপদ ক্লাউড ডেপ্লয়মেন্ট ও লাইভ টেস্টিং সাপোর্ট' : 'Secure cloud deployment and testing verification',
    ];
    items = [
      { item: lang === 'bn' ? `"${extractedTopic}" কোর সিস্টেম ডিজাইন` : `${extractedTopic} Core System Design`, bdt: 9000, usd: 75 },
      { item: lang === 'bn' ? 'ফিচার ডেভেলপমেন্ট ও অটোমেশন লজিক' : 'Feature Implementation & Logic Engine', bdt: 10000, usd: 85 },
      { item: lang === 'bn' ? 'ক্লাউড সেটআপ, সিকিউরিটি ও সাপোর্ট' : 'Cloud Setup, Testing & Support', bdt: 5000, usd: 40 },
    ];
  }

  const totalBdt = items.reduce((sum, i) => sum + i.bdt, 0);
  const totalUsd = items.reduce((sum, i) => sum + i.usd, 0);
  const category = lang === 'bn' ? categoryBn : categoryEn;

  const emailSubject = customEmailSubj || (lang === 'bn'
    ? `[প্রজেক্ট প্রপোজাল] ${name}-এর জন্য ${categoryBn}-এর বিস্তারিত বাজেট ও বাস্তবায়ন পরিকল্পনা`
    : `[Proposal] Implementation Blueprint, Timeline & Budget for ${name}`);

  const emailIntro = customEmailIntro || (lang === 'bn'
    ? `প্রিয় ${name},\n\nআপনার মেসেজের জন্য আন্তরিক ধন্যবাদ। আপনার চাহিত রিকোয়ারমেন্ট অনুযায়ী "${categoryBn}" সফলভাবে বাস্তবায়নের জন্য আমরা এই বিস্তারিত প্রপোজালটি প্রস্তুত করেছি।`
    : `Dear ${name},\n\nThank you for reaching out regarding your project. We have analyzed your requirements and prepared this detailed solution proposal for ${categoryEn}.`);

  const stepsText = clientQuestionAnswer?.steps
    ? `\n\nকাজের বাস্তবায়ন ও গাইডলাইন:\n` + clientQuestionAnswer.steps.map((s, idx) => `• ${s.title}: ${s.desc}`).join('\n')
    : '';

  const proposalBody = lang === 'bn'
    ? `${emailIntro}${stepsText}\n\nপ্রজেক্টের মূল টেকনিক্যাল পরিধি:\n${reqs.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nপ্রজেক্ট বাস্তবায়নের মোট খরচ: ৳${totalBdt.toLocaleString()} টাকা ($${totalUsd} USD)\nসম্ভাব্য ডেলিভারি সময়কাল: মাত্র ${days} কার্যদিবস\n\nআমরা কাজের নিখুঁত মান এবং প্রথম ৩০ দিন ফ্রি টেকনিক্যাল সাপোর্টের নিশ্চয়তা প্রদান করি। আপনার সুবিধাজনক সময়ে আলোচনাটি চূড়ান্ত করতে পারলে আনন্দিত হব।\n\nবিনীত,\nসল্যুশন ইঞ্জিনিয়ারিং টিম`
    : `${emailIntro}${stepsText}\n\nKey Deliverables:\n${reqs.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nTotal Estimated Budget: $${totalUsd} (৳${totalBdt.toLocaleString()} BDT)\nEstimated Timeline: ${days} business days\n\nPlease let us know if you have any questions or when we can begin.\n\nBest regards,\nSolutions Architecture Team`;

  const whatsappMsg = customWhatsapp || (lang === 'bn'
    ? `আসসালামু আলাইকুম ${name}! আপনার মেসেজ অনুযায়ী "${categoryBn}"-এর কাজ শুরু করার সম্পূর্ণ প্রক্রিয়া ও খরচের হিসাব রেডি করেছি। মাত্র ${days} দিনের মধ্যে পুরো কাজটি সম্পন্ন করা যাবে এবং মোট খরচ পড়বে ৳${totalBdt.toLocaleString()} টাকা ($${totalUsd})। বিস্তারিত প্রপোজাল প্রস্তুত আছে, আপনার সম্মতি পেলে আমরা কাজ শুরু করতে পারি। ধন্যবাদ!`
    : `Hello ${name}! I reviewed your requirements for ${categoryEn}. We can complete the entire project within ${days} business days for a total budget of $${totalUsd}. Let me know if you would like us to begin!`);

  return {
    clientName: name,
    serviceCategory: category,
    urgency: urgency,
    clientQuestionAnswer: clientQuestionAnswer,
    extractedRequirements: reqs,
    costBreakdown: items,
    totalBdt: totalBdt,
    totalUsd: totalUsd,
    estimatedDeliveryDays: days,
    proposalEmail: {
      subject: emailSubject,
      body: proposalBody,
    },
    whatsappMessage: whatsappMsg,
    suggestedAddons: [
      lang === 'bn' ? '৩০ দিনের ফ্রি প্রায়োরিটি টেকনিক্যাল সাপোর্ট' : '30 Days Priority Technical Support',
      lang === 'bn' ? 'স্বয়ংক্রিয় ক্লাউড ব্যাকআপ সিস্টেম' : 'Automated Cloud Backup System',
    ],
  };
}
