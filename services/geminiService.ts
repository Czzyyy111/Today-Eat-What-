
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, FoodRecommendation } from "../types";

export const getFoodRecommendation = async (prefs: UserPreferences): Promise<FoodRecommendation> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const locationContext = prefs.location 
    ? `用户当前位置坐标：纬度 ${prefs.location.latitude}, 经度 ${prefs.location.longitude}。请优先考虑该坐标附近的餐厅或菜系风味。`
    : "用户未提供精确位置，请根据通用常识推荐。";

  const prompt = `
    请根据以下用户信息，生成一个详尽的饮食决策。
    
    可行性因子：
    - 预算级别：${prefs.budget}
    - 可用时间：${prefs.time}
    - 地理位置：${locationContext}
    
    偏好因子：
    - 饮食偏好：${prefs.preferences}
    - 当前心情：${prefs.mood}
    - 饮食计划/禁忌：${prefs.dietPlan}
    
    输出要求（必须为中文）：
    1. 决定部分：包含一个具体的“推荐方案”及深入的“推荐理由”。
    2. 建议部分：包含实用的“行为建议”（如：怎么去、怎么点、搭配什么）和“可选优化提示”（如何让这顿饭更完美）。
    3. 推荐要富有创意，考虑季节和天气（假设当前为当地适宜季节）。
    4. 返回格式必须严格遵循JSON Schema。
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dishName: { type: Type.STRING, description: "推荐方案名称" },
          description: { type: Type.STRING, description: "推荐方案的简短描述" },
          reasoning: { type: Type.STRING, description: "推荐理由" },
          alternative: { type: Type.STRING, description: "备选方案" },
          estimatedCost: { type: Type.STRING, description: "预估花费" },
          estimatedTime: { type: Type.STRING, description: "预估时长" },
          behavioralAdvice: { type: Type.STRING, description: "具体的行为建议" },
          optimizationTips: { type: Type.STRING, description: "可选的优化提示" },
        },
        required: ["dishName", "description", "reasoning", "alternative", "estimatedCost", "estimatedTime", "behavioralAdvice", "optimizationTips"]
      }
    }
  });

  const result = JSON.parse(response.text || '{}');
  return result as FoodRecommendation;
};
