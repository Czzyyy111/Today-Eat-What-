
export type BudgetLevel = 'Low' | 'Medium' | 'High';
export type TimeConstraint = 'Quick' | 'Medium' | 'Leisurely';

export interface UserPreferences {
  // 可行性因子
  budget: BudgetLevel;
  time: TimeConstraint;
  // 定位信息 (Added to fix errors in InputSection.tsx)
  location?: { latitude: number; longitude: number };
  // 更优解因子
  preferences: string[];
  mood: string;
  dietPlan: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  reasoning: string;
  behavioralAdvice: string;
  optimizationTips: string;
  alternative: string;
  // 匹配因子
  budget: BudgetLevel;
  time: TimeConstraint;
  moods: string[];
  categories: string[];
}

// Added to fix "Module has no exported member 'FoodRecommendation'" in geminiService.ts and ResultCard.tsx
export interface FoodRecommendation {
  dishName: string;
  description: string;
  reasoning: string;
  behavioralAdvice: string;
  optimizationTips: string;
  alternative: string;
  estimatedCost: string;
  estimatedTime: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}
