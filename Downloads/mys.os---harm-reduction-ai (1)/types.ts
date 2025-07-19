export enum PageType {
  HOME = 'HOME',
  CONTENT = 'CONTENT',
  AI = 'AI',
}

export interface Risk {
  threat: string;
  trigger: string;
  countermeasure: string;
}

export interface Content {
  id: string;
  title: string;
  codename?: string;
  class?: string;
  description?: string;
  profile?: string[];
  riskMatrix?: Risk[];
  fieldIdentification?: { title: string; points: string[] };
  enhancementVector?: { title: string; points: string[] };
  fieldStrategies?: { title: string; points: string[] };
  reintegrationProtocol?: { title: string; points: string[] };
  contentBlocks?: { title: string; points: string[] }[];
}

export interface NavItem {
  label: string;
  pageId: string;
  type: PageType;
}

export interface NavCategory {
  label:string;
  items: NavItem[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}