
import React, { useState } from 'react';
import { UserPreferences, BudgetLevel, TimeConstraint } from '../types.ts';
import { BUDGET_OPTIONS, TIME_OPTIONS, MOODS, PREFERENCE_CHIPS } from '../constants.tsx';

interface Props {
  preferences: UserPreferences;
  onChange: (updates: Partial<UserPreferences>) => void;
  onSubmit: () => void;
}

const InputSection: React.FC<Props> = ({ preferences, onChange, onSubmit }) => {
  const [locating, setLocating] = useState(false);

  const getLoc = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({ location: { latitude: pos.coords.latitude, longitude: pos.coords.longitude } });
        setLocating(false);
      },
      () => {
        alert("定位失败，请确保已开启权限。");
        setLocating(false);
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <header className="text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-2">今天吃什么？</h1>
        <p className="text-gray-500 font-medium italic">基于 LLM 的智能饮食决策系统</p>
      </header>

      <div className="bg-white rounded-[2.5rem] p-10 custom-shadow border border-gray-100 space-y-10">
        <section className="space-y-4">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">第一阶段：可行性因子</label>
          <button 
            onClick={getLoc}
            disabled={locating}
            className={`w-full p-5 rounded-2xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${
              preferences.location ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-600'
            }`}
          >
            {preferences.location ? '📍 位置已同步' : locating ? '正在定位...' : '点击获取当前定位'}
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-sm font-bold text-gray-700">预算</span>
              <select 
                value={preferences.budget} 
                onChange={e => onChange({ budget: e.target.value as BudgetLevel })}
                className="w-full p-4 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                {BUDGET_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-bold text-gray-700">时间</span>
              <select 
                value={preferences.time} 
                onChange={e => onChange({ time: e.target.value as TimeConstraint })}
                className="w-full p-4 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                {TIME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">第二阶段：更优解因子</label>
          <div className="space-y-2">
            <span className="text-sm font-bold text-gray-700">心情</span>
            <div className="flex flex-wrap gap-2">
              {MOODS.map(m => (
                <button 
                  key={m} 
                  onClick={() => onChange({ mood: m })}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${preferences.mood === m ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-500'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-sm font-bold text-gray-700">饮食计划 / 禁忌</span>
            <input 
              type="text" 
              placeholder="例如：生酮、减脂、过敏..."
              value={preferences.dietPlan}
              onChange={e => onChange({ dietPlan: e.target.value })}
              className="w-full p-4 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
        </section>

        <button 
          onClick={onSubmit}
          className="w-full py-6 gradient-bg text-white font-black text-2xl rounded-3xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          帮我决定！
        </button>
      </div>
    </div>
  );
};

export default InputSection;
