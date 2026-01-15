
import React, { useState } from 'react';
import { UserPreferences, AppState, FoodRecommendation } from './types.ts';
import { getFoodRecommendation } from './services/geminiService.ts';
import InputSection from './components/InputSection.tsx';
import ResultCard from './components/ResultCard.tsx';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [prefs, setPrefs] = useState<UserPreferences>({
    budget: 'Medium',
    time: 'Medium',
    preferences: [],
    mood: '😌 平静',
    dietPlan: ''
  });
  const [result, setResult] = useState<FoodRecommendation | null>(null);

  const handleUpdatePrefs = (updates: Partial<UserPreferences>) => {
    setPrefs(prev => ({ ...prev, ...updates }));
  };

  const handleDecide = async () => {
    setAppState(AppState.LOADING);
    try {
      // 调用决策服务（目前是模拟数据/Gemini API）
      const decision = await getFoodRecommendation(prefs);
      setResult(decision);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error("Decision failed:", error);
      alert("决策引擎遇到一点小问题，请稍后再试。");
      setAppState(AppState.IDLE);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-12">
      {appState === AppState.IDLE && (
        <InputSection 
          preferences={prefs} 
          onChange={handleUpdatePrefs} 
          onSubmit={handleDecide} 
        />
      )}

      {appState === AppState.LOADING && (
        <div className="flex flex-col items-center space-y-8 animate-pulse">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#ff4d00] to-[#ff8a00] flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍱</span>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-gray-900">LLM 正在品鉴...</h2>
            <p className="text-gray-500 font-medium">正在基于可行性因子寻找最优解</p>
          </div>
        </div>
      )}

      {appState === AppState.RESULT && result && (
        <ResultCard result={result} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;
