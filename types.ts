import { LucideIcon } from 'lucide-react';

export interface LogEntry {
  id: string;
  timestamp: string;
  action: string;
  status: 'success' | 'warning' | 'error' | 'info';
  details: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  actionType: 'simulation' | 'ai-gen' | 'chart' | 'toggle';
}

export interface Section {
  id: string;
  title: string;
  icon: LucideIcon;
  tools: Tool[];
}

export enum TabId {
  SYSTEM_PROTECTION = 'sys_prot',
  DEEP_SCAN = 'deep_scan',
  NETWORK = 'network',
  OPTIMIZER = 'optimizer',
  MONITORING = 'monitoring',
  AUTOMATION = 'automation',
  PRIVACY = 'privacy',
  ZERO_DAY = 'zero_day',
  FIREWALL = 'firewall',
  REPORTS = 'reports',
}

// Global window type for AI Studio
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

export enum ImageSize {
  SIZE_1K = '1K',
  SIZE_2K = '2K',
  SIZE_4K = '4K'
}

export enum AspectRatio {
  RATIO_1_1 = '1:1',
  RATIO_2_3 = '2:3',
  RATIO_3_2 = '3:2',
  RATIO_3_4 = '3:4',
  RATIO_4_3 = '4:3',
  RATIO_9_16 = '9:16',
  RATIO_16_9 = '16:9',
  RATIO_21_9 = '21:9',
}