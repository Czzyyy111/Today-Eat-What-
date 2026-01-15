
import React from 'react';
import { FoodRecommendation } from '../types';

interface ResultCardProps {
  result: FoodRecommendation;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-slide-in">
      {/* 决定区块 (Decision Section) */}
      <div className="bg-white rounded-[2.5rem] overflow-hidden custom-shadow border border-orange-100">
        <div className="bg-orange-600 px-8 py-5 flex items-center justify-between">
          <span className="text-white font-black text-xl tracking-widest uppercase">决定 · Decision</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-70"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">推荐方案</span>
                <h4 className="text-4xl font-black text-gray-900 leading-tight">{result.dishName}</h4>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-orange-100 pl-4">
                "{result.description}"
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
               <div className="px-4 py-2 bg-orange-50 rounded-xl border border-orange-100 text-orange-700 font-bold text-sm text-center">
                 💰 {result.estimatedCost}
               </div>
               <div className="px-4 py-2 bg-blue-50 rounded-xl border border-blue-100 text-blue-700 font-bold text-sm text-center">
                 ⏱️ {result.estimatedTime}
               </div>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
               <span className="text-sm font-black text-gray-400 uppercase tracking-widest">推荐理由</span>
            </div>
            <p className="text-gray-700 leading-relaxed text-base">
              {result.reasoning}
            </p>
          </div>
        </div>
      </div>

      {/* 建议区块 (Suggestion Section) */}
      <div className="bg-white rounded-[2.5rem] overflow-hidden custom-shadow border border-indigo-100">
        <div className="bg-indigo-600 px-8 py-5 flex items-center justify-between">
          <span className="text-white font-black text-xl tracking-widest uppercase">建议 · Suggestion</span>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">行为建议</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
                {result.behavioralAdvice}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">可选优化提示</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm bg-teal-50/50 p-4 rounded-2xl border border-teal-100/50">
                {result.optimizationTips}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">不想尝试以上方案？</span>
              <div className="text-gray-500 text-sm font-medium">
                备选：<span className="text-indigo-600 font-bold">{result.alternative}</span>
              </div>
            </div>
            <button
              onClick={onReset}
              className="py-3 px-8 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 font-bold hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all text-sm"
            >
              换个主意
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-center text-gray-400 text-xs font-medium uppercase tracking-[0.2em] pb-12">
        由 Gemini 提供强力算法支持
      </p>
    </div>
  );
};

export default ResultCard;
