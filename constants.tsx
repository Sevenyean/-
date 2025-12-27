
import { MenuItem, FAQItem, TabConfig } from './types';

export const TABS: TabConfig[] = [
  { id: 'rules', label: '消費須知' },
  { id: 'menu', label: '精選菜單' },
  { id: 'order', label: '訂餐預約' },
  { id: 'faq', label: '常見問題' },
  { id: 'about', label: '關於我們' },
  { id: 'ai', label: 'AI 建議' },
];

export const MENU_ITEMS: MenuItem[] = [
  { name: '舒肥嫩雞胸餐', price: 140, tags: ['高蛋白'] },
  { name: '炙燒鹽麴鮭魚', price: 180, tags: ['低卡'] },
  { name: '田園時蔬溫沙拉', price: 120, tags: ['纖維'] },
  { name: '南瓜濃湯(碗)', price: 55, tags: ['暖心'] },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: '米飯可以換成全蔬菜嗎？',
    answer: '沒問題！我們提供「減醣模式」，可以將紫米飯換成加量溫時蔬唷。'
  },
  {
    question: '餐點是冷食還是熱食？',
    answer: '我們提倡「溫沙拉」與「溫便當」概念，主食與配菜皆會保持適當熱度。'
  },
  {
    question: '有提供全素食的餐點嗎？',
    answer: '有的！「鮮蔬五色百匯」為全素選項，部分療癒小點也為素食可食。'
  }
];
