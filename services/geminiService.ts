
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, FoodRecommendation } from "../types.ts";

export const getFoodRecommendation = async (prefs: UserPreferences): Promise<FoodRecommendation> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const locationCtx = prefs.location 
    ? `坐标: ${prefs.location.latitude}, ${prefs.location.longitude}。请结合此坐标周边的餐厅可能性。`
    : "未知位置。";

  const prompt = `
    作为一位美食决策专家，请为用户做出决定。
    
    已知因子：
    - 预算: ${prefs.budget}
    - 时间: ${prefs.time}
    - 位置: ${locationCtx}
    - 偏好: ${prefs.preferences}
    - 心情: ${prefs.mood}
    - 计划: ${prefs.dietPlan}
    
    请严格按照以下结构返回 JSON (中文):
    1. 决定 (Decision): 推荐方案、推荐理由。
    2. 建议 (Suggestion): 行为建议、可选优化提示。
    
    其他必要字段: description, alternative, estimatedCost, estimatedTime。
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dishName: { type: Type.STRING, description: "推荐方案" },
          reasoning: { type: Type.STRING, description: "推荐理由" },
          behavioralAdvice: { type: Type.STRING, description: "行为建议" },
          optimizationTips: { type: Type.STRING, description: "可选优化提示" },
          description: { type: Type.STRING },
          alternative: { type: Type.STRING },
          estimatedCost: { type: Type.STRING },
          estimatedTime: { type: Type.STRING },
        },
        required: ["dishName", "reasoning", "behavioralAdvice", "optimizationTips", "description", "alternative", "estimatedCost", "estimatedTime"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as FoodRecommendation;
};
