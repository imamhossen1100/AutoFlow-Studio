export type Language = 'bn' | 'en';

export interface RepurposedContent {
  youtube: {
    titles: string[];
    description: string;
    tags: string[];
    chapters: { time: string; title: string }[];
  };
  reelsScript: {
    duration: string;
    hook: string;
    body: { timestamp: string; visual: string; audio: string }[];
    callToAction: string;
  };
  linkedInPost: string;
  facebookPost: string;
  twitterThread: string[];
  thumbnailPrompt: string;
  webhookPayload: Record<string, unknown>;
}

export interface ClientLeadAnalysis {
  clientName: string;
  serviceCategory: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Immediate';
  clientQuestionAnswer?: {
    summary: string;
    steps: { title: string; desc: string }[];
  };
  extractedRequirements: string[];
  costBreakdown: {
    item: string;
    bdt: number;
    usd: number;
  }[];
  totalBdt: number;
  totalUsd: number;
  estimatedDeliveryDays: number;
  proposalEmail: {
    subject: string;
    body: string;
  };
  whatsappMessage: string;
  suggestedAddons: string[];
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'ai_process' | 'action';
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  iconName: string;
  status: 'idle' | 'running' | 'success' | 'error';
  config: Record<string, string | number | boolean>;
  outputPreview?: string;
}

export interface ExecutionLog {
  timestamp: string;
  nodeId: string;
  nodeTitle: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
  durationMs: number;
}

export interface SaaSServiceItem {
  id: string;
  name: string;
  nameBn: string;
  category: string;
  monthlyCostUsd: number;
  monthlyCostBdt: number;
  replacedFeature: string;
  replacedFeatureBn: string;
  selected: boolean;
}

export interface UserTutorialSection {
  id: string;
  category: string;
  categoryBn: string;
  title: string;
  titleBn: string;
  summary: string;
  summaryBn: string;
  steps: {
    stepNumber: number;
    title: string;
    titleBn: string;
    description: string;
    descriptionBn: string;
  }[];
  benefit: string;
  benefitBn: string;
}
