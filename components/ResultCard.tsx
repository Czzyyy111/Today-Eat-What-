
import React from 'react';
import { FoodRecommendation } from '../types.ts';

interface Props {
  result: FoodRecommendation;
  onReset: () => void;
}

const ResultCard: React.FC<Props> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-slide-up">
      <div className="bg-white rounded-[3rem] overflow-hidden custom-shadow border border-orange-50">
        <div className="gradient-bg p-8 text-white text-center">
          <span className="text-xs font-black uppercase tracking-[0.3em] opacity-70">Decision Result</span>
          <h2 className="text-4xl font-black mt-2">{result.dishName}</h2>
          <div className="flex justify-center gap-3 mt-4">
            <span className="bg-black/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold">{result.estimatedCost}</span>
            <span className="bg-black/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold">{result.estimatedTime}</span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-2">
            <h4 className="text-xs font-black text-orange-500 uppercase tracking-widest italic">Why this? / 推荐理由</h4>
            <p className="text-gray-700 leading-relaxed font-medium">{result.reasoning}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50/50 p-6 rounded-[2rem] space-y-2">
              <h4 className="text-[10px] font-black text-orange-400 uppercase">Advice / 行为建议</h4>
              <p className="text-sm text-gray-600 leading-snug">{result.behavioralAdvice}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-[2rem] space-y-2">
              <h4 className="text-[10px] font-black text-gray-400 uppercase">Tips / 优化提示</h4>
              <p className="text-sm text-gray-600 leading-snug">{result.optimizationTips}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Alternative / 备选</p>
              <p className="text-sm font-black text-gray-800">{result.alternative}</p>
            </div>
            <button 
              onClick={onReset}
              className="px-6 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-colors text-sm"
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
