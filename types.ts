
export type BudgetLevel = 'Low' | 'Medium' | 'High';
export type TimeConstraint = 'Quick' | 'Medium' | 'Leisurely';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface UserPreferences {
  budget: BudgetLevel;
  time: TimeConstraint;
  preferences: string;
  mood: string;
  dietPlan: string;
  location?: UserLocation;
}

export interface FoodRecommendation {
  dishName: string;      // 推荐方案
  reasoning: string;     // 推荐理由
  behavioralAdvice: string; // 行为建议
  optimizationTips: string; // 可选优化提示
  description: string;
  alternative: string;
  estimatedCost: string;
  estimatedTime: string;
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}
