
import React, { useState } from 'react';
import { UserPreferences, BudgetLevel, TimeConstraint } from '../types.ts';
import { BUDGET_OPTIONS, TIME_OPTIONS, MOODS } from '../constants.tsx';

interface Props {
  preferences: UserPreferences;
  onChange: (updates: Partial<UserPreferences>) => void;
  onSubmit: () => void;
}

const InputSection: React.FC<Props> = ({ preferences, onChange, onSubmit }) => {
  const [locating, setLocating] = useState(false);

  const handleGetLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({ location: { latitude: pos.coords.latitude, longitude: pos.coords.longitude } });
        setLocating(false);
      },
      () => {
        alert("定位失败，请检查浏览器权限。");
        setLocating(false);
      }
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 animate-slide-up">
      <div className="text-center space-y-2">
        <div className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-black uppercase tracking-widest mb-2">
          Decide For Me / 吃什么
        </div>
        <h1 className="text-4xl font-black text-gray-900">交由 AI 决策</h1>
        <p className="text-gray-400">结合当下状态，寻找最合适的美味</p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 custom-shadow border border-orange-50 space-y-10">
        {/* 阶段一：可行性 (Hard Filters) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">1</span>
            <h3 className="font-black text-gray-800">可行性因子 (Feasibility)</h3>
          </div>
          
          <button 
            onClick={handleGetLocation}
            disabled={locating}
            className={`w-full p-4 rounded-2xl border-2 border-dashed font-bold transition-all flex items-center justify-center gap-2 ${
              preferences.location ? 'bg-green-50 border-green-200 text-green-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-orange-200 hover:text-orange-500'
            }`}
          >
            {preferences.location ? '✅ 已定位' : locating ? '定位中...' : '📍 开启地理位置参考'}
          </button>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400">预算范围</label>
              <select 
                value={preferences.budget}
                onChange={e => onChange({ budget: e.target.value as BudgetLevel })}
                className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-orange-500 outline-none font-bold"
              >
                {BUDGET_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400">时间限制</label>
              <select 
                value={preferences.time}
                onChange={e => onChange({ time: e.target.value as TimeConstraint })}
                className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-orange-500 outline-none font-bold"
              >
                {TIME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* 阶段二：更优解 (Optimization) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">2</span>
            <h3 className="font-black text-gray-800">更优解因子 (Optimization)</h3>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400">当下心情</label>
            <div className="flex flex-wrap gap-2">
              {MOODS.map(m => (
                <button
                  key={m}
                  onClick={() => onChange({ mood: m })}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    preferences.mood === m ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400">饮食计划/禁忌 (可选)</label>
            <input 
              type="text"
              placeholder="如：减脂期、素食、不吃辣..."
              value={preferences.dietPlan}
              onChange={e => onChange({ dietPlan: e.target.value })}
              className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
        </section>

        <button 
          onClick={onSubmit}
          className="w-full py-5 gradient-bg text-white font-black text-xl rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          立即智能决策
        </button>
      </div>
    </div>
  );
};

export default InputSection;
