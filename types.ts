
export type TabId = 'rules' | 'menu' | 'order' | 'faq' | 'about' | 'ai';

export interface MenuItem {
  name: string;
  price: number;
  tags: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TabConfig {
  id: TabId;
  label: string;
}
