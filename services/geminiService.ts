
import { GoogleGenAI } from "@google/genai";

export const getNutritionAdvice = async (userGoal: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `身為「源蔬鮮食」的營養師，請根據顧客的目標「${userGoal}」，從以下菜單中推薦一份餐點並給予簡單建議：
    菜單：
    1. 舒肥嫩雞胸餐 (高蛋白) - $140
    2. 炙燒鹽麴鮭魚 (豐富 Omega-3, 低卡) - $180
    3. 田園時蔬溫沙拉 (高纖維) - $120
    4. 南瓜濃湯 (暖胃) - $55
    
    請以溫暖親切的語氣回覆，字數約 100 字內。`,
  });

  return response.text;
};
