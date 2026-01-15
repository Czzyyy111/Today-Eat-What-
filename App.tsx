
import React, { useState } from 'react';
import { UserPreferences, FoodRecommendation, AppState } from './types.ts';
import { getFoodRecommendation } from './services/geminiService.ts';
import InputSection from './components/InputSection.tsx';
import ResultCard from './components/ResultCard.tsx';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INPUT);
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: 'Medium',
    time: 'Medium',
    preferences: '',
    mood: '😌 平静',
    dietPlan: ''
  });
  const [recommendation, setRecommendation] = useState<FoodRecommendation | null>(null);

  const handleSubmit = async () => {
    setState(AppState.LOADING);
    try {
      const res = await getFoodRecommendation(preferences);
      setRecommendation(res);
      setState(AppState.RESULT);
    } catch (e) {
      alert("AI 引擎暂时无法做出决定，请稍后再试。");
      setState(AppState.INPUT);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      {state === AppState.INPUT && (
        <InputSection 
          preferences={preferences} 
          onChange={p => setPreferences(prev => ({ ...prev, ...p }))}
          onSubmit={handleSubmit}
        />
      )}

      {state === AppState.LOADING && (
        <div className="flex flex-col items-center justify-center py-40 space-y-6">
          <div className="w-20 h-20 border-8 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
          <h3 className="text-2xl font-black text-gray-900">正在分析因子...</h3>
        </div>
      )}

      {state === AppState.RESULT && recommendation && (
        <ResultCard result={recommendation} onReset={() => setState(AppState.INPUT)} />
      )}
    </div>
  );
};

export default App;
