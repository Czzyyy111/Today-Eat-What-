
import React, { useState } from 'react';
import { UserPreferences, FoodRecommendation, AppState } from './types';
import { getFoodRecommendation } from './services/geminiService';
import InputSection from './components/InputSection';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INPUT);
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: 'Medium',
    time: 'Medium',
    preferences: '',
    mood: '😌 随性',
    dietPlan: ''
  });
  const [recommendation, setRecommendation] = useState<FoodRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdatePrefs = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    setState(AppState.LOADING);
    setError(null);
    try {
      const result = await getFoodRecommendation(preferences);
      setRecommendation(result);
      setState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("AI 厨师迷路了，请稍后再试！");
      setState(AppState.INPUT);
    }
  };

  const reset = () => {
    setState(AppState.INPUT);
    setRecommendation(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 md:py-20 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {state === AppState.INPUT && (
          <InputSection
            preferences={preferences}
            onChange={handleUpdatePrefs}
            onSubmit={handleSubmit}
          />
        )}

        {state === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center py-32 space-y-8">
            <div className="relative">
              <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center text-6xl animate-bounce">
                🍳
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold animate-pulse">
                ?
              </div>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">正在思考您的完美一餐...</h3>
              <p className="text-gray-500 font-medium text-lg">分析预算、时间、心情及地理位置中</p>
            </div>
          </div>
        )}

        {state === AppState.RESULT && recommendation && (
          <ResultCard result={recommendation} onReset={reset} />
        )}

        {error && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-500 text-white px-8 py-4 rounded-3xl font-bold shadow-2xl animate-bounce z-50">
            {error}
          </div>
        )}
      </div>
      
      {/* Footer Branding */}
      <footer className="mt-auto pt-20 pb-10 text-center space-y-6 w-full opacity-60">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gray-300" />
          <div className="font-black text-2xl tracking-tighter text-gray-400 uppercase italic">
            Foodie AI Decision
          </div>
          <div className="h-px w-12 bg-gray-300" />
        </div>
        <div className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
          治愈你的选择困难症
        </div>
      </footer>
    </div>
  );
};

export default App;
