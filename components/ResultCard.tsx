
import React from 'react';
import { FoodRecommendation } from '../types.ts';

interface Props {
  result: FoodRecommendation;
  onReset: () => void;
}

const ResultCard: React.FC<Props> = ({ result, onReset }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-white rounded-[3rem] overflow-hidden custom-shadow border border-gray-100">
        {/* Header */}
        <div className="gradient-bg px-10 py-8 text-white">
          <span className="text-xs font-black uppercase tracking-[0.3em] opacity-80">决策结果</span>
          <h2 className="text-4xl font-black mt-2">{result.dishName}</h2>
          <div className="flex gap-4 mt-4">
            <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold">💰 {result.estimatedCost}</span>
            <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold">⏱️ {result.estimatedTime}</span>
          </div>
        </div>

        <div className="p-10 space-y-10">
          {/* 决定模块 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100"></div>
              <span className="text-lg font-black text-orange-600">决定 Decision</span>
              <div className="h-px flex-1 bg-gray-100"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h5 className="text-xs font-black text-gray-400 uppercase">推荐方案</h5>
                <p className="text-xl font-bold text-gray-900">{result.dishName}</p>
              </div>
              <div className="space-y-2">
                <h5 className="text-xs font-black text-gray-400 uppercase">推荐理由</h5>
                <p className="text-gray-600 leading-relaxed text-sm">{result.reasoning}</p>
              </div>
            </div>
          </div>

          {/* 建议模块 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100"></div>
              <span className="text-lg font-black text-indigo-600">建议 Suggestion</span>
              <div className="h-px flex-1 bg-gray-100"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h5 className="text-xs font-black text-gray-400 uppercase">行为建议</h5>
                <p className="text-gray-700 bg-indigo-50 p-4 rounded-2xl text-sm italic">{result.behavioralAdvice}</p>
              </div>
              <div className="space-y-2">
                <h5 className="text-xs font-black text-gray-400 uppercase">可选优化提示</h5>
                <p className="text-gray-700 bg-emerald-50 p-4 rounded-2xl text-sm">{result.optimizationTips}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">不喜欢？试下备选：<span className="font-bold text-gray-900">{result.alternative}</span></p>
            <button 
              onClick={onReset}
              className="px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-colors"
            >
              重新决策
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
