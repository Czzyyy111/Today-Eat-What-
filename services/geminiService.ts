
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, FoodRecommendation } from "../types.ts";

// 模拟数据
const MOCK_RECOMMENDATIONS: FoodRecommendation[] = [
  {
    dishName: "地道北京杂酱面",
    description: "劲道的面条拌上浓郁的大酱，配上爽口的菜码。",
    reasoning: "根据你的预算和心情，这份经典的面食既能快速饱腹，又能提供踏实的幸福感。",
    behavioralAdvice: "一定要多加点陈醋和大蒜，这才是吃面的灵魂。",
    optimizationTips: "如果觉得腻，可以配上一瓶北冰洋汽水。",
    alternative: "山西刀削面",
    estimatedCost: "¥25-35",
    estimatedTime: "15分钟"
  },
  {
    dishName: "慢炖番茄牛腩饭",
    description: "牛腩软糯入味，汤汁酸甜浓郁，淋在白米饭上简直绝配。",
    reasoning: "你需要一点热气腾腾的能量。番茄的酸味能激发你的食欲，舒缓压力。",
    behavioralAdvice: "先喝一小口浓汤，让味蕾苏醒。",
    optimizationTips: "拌饭时可以加一点点辣椒油，提鲜效果极佳。",
    alternative: "咖喱鸡排饭",
    estimatedCost: "¥45-60",
    estimatedTime: "25分钟"
  }
];

export const getFoodRecommendation = async (prefs: UserPreferences): Promise<FoodRecommendation> => {
  // 安全访问 API Key
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : "";

  // 如果没有有效 API Key，进入模拟模式
  if (!apiKey || apiKey === "YOUR_API_KEY" || apiKey.length < 5) {
    console.warn("决策助手：检测到 API Key 未配置，已切换至内置模拟引擎。");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return MOCK_RECOMMENDATIONS[Math.floor(Math.random() * MOCK_RECOMMENDATIONS.length)];
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `你是一个美食专家。请根据以下因子做决策：
    1. 可行性：预算 ${prefs.budget}, 时间 ${prefs.time}
    2. 更优解：心情 ${prefs.mood}, 计划 ${prefs.dietPlan || "无"}
    
    请决定今天吃什么并返回 JSON。`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dishName: { type: Type.STRING },
            description: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            behavioralAdvice: { type: Type.STRING },
            optimizationTips: { type: Type.STRING },
            alternative: { type: Type.STRING },
            estimatedCost: { type: Type.STRING },
            estimatedTime: { type: Type.STRING },
          },
          required: ["dishName", "description", "reasoning", "behavioralAdvice", "optimizationTips", "alternative", "estimatedCost", "estimatedTime"]
        }
      },
    });

    return JSON.parse(response.text) as FoodRecommendation;
  } catch (error) {
    console.error("Gemini 决策失败，正在尝试降级到本地数据库:", error);
    return MOCK_RECOMMENDATIONS[0];
  }
};
