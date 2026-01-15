
export type BudgetLevel = 'Low' | 'Medium' | 'High';
export type TimeConstraint = 'Quick' | 'Medium' | 'Leisurely';

export interface UserLocation {
  latitude: number;
  longitude: number;
  address?: string;
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
  dishName: string;
  description: string;
  reasoning: string;
  alternative: string;
  estimatedCost: string;
  estimatedTime: string;
  behavioralAdvice: string;
  optimizationTips: string;
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}
