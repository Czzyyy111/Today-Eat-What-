
export type BudgetLevel = 'Low' | 'Medium' | 'High';
export type TimeConstraint = 'Quick' | 'Medium' | 'Leisurely';

export interface UserPreferences {
  // 可行性因子 (Feasibility)
  budget: BudgetLevel;
  time: TimeConstraint;
  location?: { latitude: number; longitude: number };
  
  // 更优解因子 (Optimization)
  mood: string;
  dietPlan: string;
  preferences: string[];
}

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

// Added FoodItem interface to resolve import error in services/foodService.ts
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  reasoning: string;
  behavioralAdvice: string;
  optimizationTips: string;
  alternative: string;
  budget: BudgetLevel;
  time: TimeConstraint;
  moods: string[];
  categories: string[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}
