
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, FoodRecommendation } from "../types.ts";

const MOCK_DATA: FoodRecommendation[] = [
  {
    dishName: "热腾腾的番茄肥牛面",
    description: "酸甜浓郁的汤底配上滑嫩的肥牛。",
    reasoning: "既然你感到疲惫且时间较紧，一碗暖胃的面条能最快修复你的多巴胺。",
    behavioralAdvice: "第一口先喝汤，让胃部迅速暖起来。",
    optimizationTips: "可以加一个煎蛋，丰富蛋白质摄入。",
    alternative: "日式拉面",
    estimatedCost: "¥30-40",
    estimatedTime: "10分钟"
  }
];

export const getFoodRecommendation = async (prefs: UserPreferences): Promise<FoodRecommendation> => {
  // Always use a new instance with the direct process.env.API_KEY reference
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemPrompt = `你是一个资深美食评论家和营养师。
  你的任务是根据用户的“可行性因子”（预算、时间）和“更优解因子”（心情、计划、偏好）给出一个最终决策。
  决策必须具体且有说服力。`;

  const userPrompt = `
  用户情况：
  - 预算: ${prefs.budget}
  - 时间: ${prefs.time}
  - 当前心情: ${prefs.mood}
  - 饮食计划: ${prefs.dietPlan || "无特定计划"}
  - 位置: ${prefs.location ? `经纬度(${prefs.location.latitude}, ${prefs.location.longitude})` : "未知"}
  
  请给出一个完美的餐饮决策。`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
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

    // Extracting text output directly from property as per guidelines
    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    return JSON.parse(text.trim()) as FoodRecommendation;
  } catch (error) {
    console.error("Gemini 决策异常:", error);
    // Return mock data for graceful fallback if API fails
    return MOCK_DATA[0];
  }
};
