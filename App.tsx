
import React, { useState } from 'react';
import { UserPreferences, AppState, FoodRecommendation } from './types.ts';
import { getFoodRecommendation } from './services/geminiService.ts';
import InputSection from './components/InputSection.tsx';
import ResultCard from './components/ResultCard.tsx';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [prefs, setPrefs] = useState<UserPreferences>({
    budget: 'Medium',
    time: 'Medium',
    mood: '😌 平静',
    dietPlan: '',
    preferences: []
  });
  const [result, setResult] = useState<FoodRecommendation | null>(null);

  const handleUpdate = (updates: Partial<UserPreferences>) => {
    setPrefs(prev => ({ ...prev, ...updates }));
  };

  const handleDecide = async () => {
    setState(AppState.LOADING);
    try {
      const decision = await getFoodRecommendation(prefs);
      setResult(decision);
      setState(AppState.RESULT);
    } catch (e) {
      alert("决策失败，请检查网络后重试。");
      setState(AppState.IDLE);
    }
  };

  return (
    <div className="min-h-screen px-4 flex flex-col items-center justify-center">
      {state === AppState.IDLE && (
        <InputSection 
          preferences={prefs} 
          onChange={handleUpdate} 
          onSubmit={handleDecide} 
        />
      )}

      {state === AppState.LOADING && (
        <div className="text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-8 border-orange-100 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🍳</div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-gray-900">LLM 正在品味...</h2>
            <p className="text-gray-400 font-medium">综合考量地理位置与当下心情</p>
          </div>
        </div>
      )}

      {state === AppState.RESULT && result && (
        <ResultCard 
          result={result} 
          onReset={() => {
            setState(AppState.IDLE);
            setResult(null);
          }} 
        />
      )}

      <footer className="mt-12 text-gray-300 text-[10px] font-bold uppercase tracking-widest">
        Powered by Gemini 3.0 • Smart Food Decision
      </footer>
    </div>
  );
};

export default App;
