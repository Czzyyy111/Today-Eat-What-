
import React, { useState } from 'react';
import { UserPreferences, BudgetLevel, TimeConstraint } from '../types';
import { BUDGET_OPTIONS, TIME_OPTIONS, MOODS, PREFERENCE_CHIPS } from '../constants';

interface InputSectionProps {
  preferences: UserPreferences;
  onChange: (updates: Partial<UserPreferences>) => void;
  onSubmit: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ preferences, onChange, onSubmit }) => {
  const [locating, setLocating] = useState(false);

  const togglePreference = (pref: string) => {
    const current = preferences.preferences.split(',').map(s => s.trim()).filter(Boolean);
    if (current.includes(pref)) {
      onChange({ preferences: current.filter(p => p !== pref).join(', ') });
    } else {
      onChange({ preferences: [...current, pref].join(', ') });
    }
  };

  const handleGetLocation = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onChange({
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
          setLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("无法获取位置，请检查浏览器权限设置。");
          setLocating(false);
        },
        { timeout: 10000 }
      );
    } else {
      alert("您的浏览器不支持地理定位。");
      setLocating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-slide-in">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">今天吃什么？</h2>
        <p className="text-gray-500 text-lg">基于位置与心情的智能决策引擎</p>
      </div>

      <div className="bg-white rounded-3xl p-8 custom-shadow space-y-8 border border-gray-100">
        {/* 地理定位 */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">第一步：确认位置</label>
          <button
            onClick={handleGetLocation}
            disabled={locating}
            className={`w-full py-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 font-bold ${
              preferences.location 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-orange-300'
            }`}
          >
            <svg className={`w-5 h-5 ${locating ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {locating ? '正在获取位置...' : preferences.location ? '位置已锁定' : '获取当前位置以搜索周边'}
          </button>
        </div>

        {/* 可行性因子 */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">第二步：可行性分析</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="block font-semibold text-gray-700">预算</span>
              <div className="flex bg-gray-100 rounded-xl p-1">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onChange({ budget: opt.value as BudgetLevel })}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                      preferences.budget === opt.value
                        ? 'bg-white shadow-sm text-orange-600 scale-105'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <span className="block font-semibold text-gray-700">时间</span>
              <div className="flex bg-gray-100 rounded-xl p-1">
                {TIME_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onChange({ time: opt.value as TimeConstraint })}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                      preferences.time === opt.value
                        ? 'bg-white shadow-sm text-orange-600 scale-105'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 偏好因子 */}
        <div className="space-y-6">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">第三步：个性化偏好</label>
          <div className="space-y-3">
            <span className="block font-semibold text-gray-700">现在的心情</span>
            <div className="flex flex-wrap gap-2">
              {MOODS.map(m => (
                <button
                  key={m}
                  onClick={() => onChange({ mood: m })}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    preferences.mood === m
                      ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <span className="block font-semibold text-gray-700">口味偏好与计划</span>
            <div className="flex flex-wrap gap-2 mb-4">
              {PREFERENCE_CHIPS.map(p => (
                <button
                  key={p}
                  onClick={() => togglePreference(p)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    preferences.preferences.includes(p)
                      ? 'bg-indigo-500 border-indigo-500 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="自定义计划（如：减脂期、生酮饮食、对花生过敏...）"
              value={preferences.dietPlan}
              onChange={(e) => onChange({ dietPlan: e.target.value })}
              className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="w-full gradient-bg text-white font-black text-xl py-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all transform active:scale-95 flex items-center justify-center gap-3"
        >
          <span>帮我决定！</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputSection;
