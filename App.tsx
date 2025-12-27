
import React, { useState, useRef, useEffect } from 'react';
import { TabId } from './types';
import { TABS, MENU_ITEMS, FAQ_ITEMS } from './constants';
import { getNutritionAdvice } from './services/geminiService';

// --- Sub-components (Internal) ---

const RulesSection: React.FC = () => (
  <div className="animate-fadeIn">
    <h2 className="text-xl font-bold mb-4 flex items-center"><span className="mr-2">🥑</span> 門市消費叮嚀</h2>
    <div className="space-y-4 leading-relaxed text-sm text-[#2d4a3e]">
      <div className="bg-green-50 p-4 rounded-2xl border-l-4 border-green-300">
        <p className="font-medium text-green-700 mb-1">🌿 點餐與支付</p>
        <p>採櫃檯先行結帳，支持現金、LINE Pay 及各種行動支付，讓您的用餐體驗更輕鬆便利。</p>
      </div>
      <div className="bg-orange-50 p-4 rounded-2xl border-l-4 border-orange-200">
        <p className="font-medium text-orange-700 mb-1">🥘 現點現做</p>
        <p>為了確保原型食物的口感，所有餐點均為現點現做。高峰時期需耐心等候約 10-15 分鐘唷！</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-2xl border-l-4 border-blue-200">
        <p className="font-medium text-blue-700 mb-1">♻️ 環保愛地球</p>
        <p>歡迎自備環保餐盒外帶，每次可折抵 $5 元。讓我們一起為地球盡一份心力吧！</p>
      </div>
    </div>
  </div>
);

const MenuSection: React.FC = () => (
  <div className="animate-fadeIn">
    <h2 className="text-xl font-bold mb-4 flex items-center"><span className="mr-2">🍱</span> 營養師推薦菜單</h2>
    <div className="space-y-2">
      {MENU_ITEMS.map((item, idx) => (
        <div key={idx} className="bg-[#f9fbf9] border border-[#eef2ee] rounded-2xl p-4 flex justify-between items-center">
          <div>
            {item.tags.map(tag => (
              <span key={tag} className="bg-[#e8f5e9] text-[#2e7d32] px-2 py-0.5 rounded-lg text-[0.7rem] mr-2">
                {tag}
              </span>
            ))}
            <span className="font-medium text-[#2d4a3e]">{item.name}</span>
          </div>
          <span className="font-bold text-green-600">${item.price}</span>
        </div>
      ))}
      <p className="text-[10px] text-gray-400 mt-4 text-center">菜單內容依季節時蔬調整，每日限量供應</p>
    </div>
  </div>
);

const OrderSection: React.FC = () => (
  <div className="animate-fadeIn text-[#2d4a3e]">
    <h2 className="text-xl font-bold mb-4 flex items-center"><span className="mr-2">☎️</span> 線上快速預約</h2>
    <p className="text-sm mb-6 leading-loose">
      不想排隊嗎？建議您提早於線上系統點餐，或是撥打門市專線，我們會為您精準計算取餐時間唷！
    </p>
    <div className="space-y-3">
      <a href="#" className="block w-full text-center bg-[#a8d5ba] py-3 rounded-2xl font-bold text-[#2d4a3e] shadow-sm hover:opacity-90 transition">
        點我前往 線上點餐 ➔
      </a>
      <a href="tel:021234567" className="block w-full text-center border-2 border-[#a8d5ba] py-3 rounded-2xl font-bold text-[#2d4a3e] hover:bg-[#a8d5ba]/10 transition">
        撥打門市電話
      </a>
    </div>
    <p className="text-xs text-gray-400 mt-6 text-center">* 團體便當(10個以上)請於前一日預訂 *</p>
  </div>
);

const FAQSection: React.FC = () => (
  <div className="animate-fadeIn">
    <h2 className="text-xl font-bold mb-4 flex items-center"><span className="mr-2">💡</span> 吃飯常見問題</h2>
    <div className="space-y-4">
      {FAQ_ITEMS.map((item, idx) => (
        <details key={idx} className="bg-gray-50 rounded-xl p-3 border border-gray-100 group">
          <summary className="font-medium cursor-pointer text-sm text-[#2d4a3e] list-none flex justify-between items-center">
            {item.question}
            <span className="text-xs opacity-50 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p className="text-xs mt-2 text-gray-600 leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  </div>
);

const AboutSection: React.FC = () => (
  <div className="animate-fadeIn text-center text-[#2d4a3e]">
    <div className="mb-4 text-4xl">🏡</div>
    <h2 className="text-xl font-bold mb-2">門市資訊</h2>
    <p className="text-xs text-gray-500 mb-4">台北市信義區蔬蔬路 520 號</p>
    <div className="text-left text-sm space-y-2 bg-yellow-50 p-4 rounded-2xl">
      <p>🕒 <b>營業時間</b></p>
      <p>週一至週五 11:00 - 14:00 / 17:00 - 20:00</p>
      <p>週六及國定假日 11:00 - 15:00 (週日公休)</p>
    </div>
  </div>
);

const AISection: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    setAdvice('');
    try {
      const result = await getNutritionAdvice(goal);
      setAdvice(result || '暫時無法取得建議，請稍後再試。');
    } catch (error) {
      setAdvice('發生錯誤，請檢查網路連線。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-bold mb-4 flex items-center"><span className="mr-2">✨</span> AI 營養諮詢</h2>
      <p className="text-sm text-gray-600 mb-4">告訴我您的用餐目標（如：增肌、減脂、或是今天想喝熱的），讓我為您推薦！</p>
      <div className="flex flex-col gap-3">
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="例如：我想找低卡路里的午餐..."
          className="w-full p-3 text-sm border-2 border-[#a8d5ba] rounded-2xl focus:outline-none focus:ring-2 ring-[#a8d5ba]/30 h-24 resize-none"
        />
        <button
          onClick={handleGetAdvice}
          disabled={loading || !goal.trim()}
          className="bg-[#a8d5ba] text-[#2d4a3e] font-bold py-2 rounded-xl hover:opacity-90 disabled:opacity-50 transition"
        >
          {loading ? '思考中...' : '獲取 AI 建議'}
        </button>
      </div>
      {advice && (
        <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-200 animate-fadeIn">
          <p className="text-sm text-[#2d4a3e] whitespace-pre-line">{advice}</p>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('rules');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'rules': return <RulesSection />;
      case 'menu': return <MenuSection />;
      case 'order': return <OrderSection />;
      case 'faq': return <FAQSection />;
      case 'about': return <AboutSection />;
      case 'ai': return <AISection />;
      default: return null;
    }
  };

  useEffect(() => {
    // Scroll active tab into view
    const activeElement = document.getElementById(`tab-${activeTab}`);
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  return (
    <div className="flex justify-center min-h-screen items-start sm:py-8">
      <div className="w-full max-w-[450px] bg-white rounded-[40px] border-[6px] border-[#a8d5ba] shadow-[0_20px_40px_rgba(168,213,186,0.3)] overflow-hidden relative">
        
        {/* Decorative Floating Icon */}
        <div className="veggie-decor absolute top-[25px] right-[25px] text-3xl pointer-events-none select-none">
          🥗
        </div>

        {/* Header Section */}
        <div className="bg-[#a8d5ba] p-10 text-center">
          <h1 className="text-2xl font-bold text-[#2d4a3e] mb-1">源蔬鮮食 x HOW好吃飯</h1>
          <p className="text-sm text-[#4a7c66] tracking-widest font-medium">原型食物的純粹美味 🥬</p>
        </div>

        {/* Navigation Tabs */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto p-4 gap-2 bg-[#fdfdfd] border-b border-[#e8f2eb] scrollbar-hide"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm border border-[#a8d5ba] whitespace-nowrap transition-all duration-300 transform ${
                activeTab === tab.id 
                  ? 'bg-[#a8d5ba] text-[#2d4a3e] font-bold scale-105' 
                  : 'bg-white text-[#4a7c66] hover:bg-[#a8d5ba]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="p-8 min-h-[350px]">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="bg-[#f9fbf9] py-4 text-center text-[10px] text-gray-400 tracking-widest uppercase border-t border-gray-100">
          Source Veggie x HOW Delicious Table &copy; 2025
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
