'use client';

import React from 'react';
import { Target, CheckCircle2, RotateCcw, Clock, Bookmark, Layers } from 'lucide-react';
import { StatusFilter } from '../types/exam';

interface StatsBannerProps {
  total: number;
  masteredCount: number;
  bookmarkedCount: number;
  activeStatusFilter: StatusFilter;
  onSelectStatusFilter: (status: StatusFilter) => void;
  onResetProgress: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  total,
  masteredCount,
  bookmarkedCount,
  activeStatusFilter,
  onSelectStatusFilter,
  onResetProgress,
}) => {
  const percentage = Math.round((masteredCount / total) * 100) || 0;
  const unmasteredCount = total - masteredCount;
  const isAllMastered = masteredCount === total && total > 0;

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 transition-all no-print">
      {/* Top Row: Technical Header & Progress Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#2563EB] uppercase mb-1">
            [ SYSTEM METRICS // READINESS TRACKER ]
          </div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FF5722]/10 text-[#FF5722]">
              <Target className="w-4 h-4" strokeWidth={1.75} />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Exam Readiness Progress
            </h2>
            {isAllMastered && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" strokeWidth={1.75} />
                Fully Mastered
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time mastery metric tracking 22 critical exam questions across all chapters.
          </p>
        </div>

        {/* Action: Reset */}
        {masteredCount > 0 && (
          <button
            onClick={onResetProgress}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-rose-600 transition-colors py-1.5 px-3 rounded-full hover:bg-rose-50 border border-slate-200 cursor-pointer"
            title="Clear all mastered marks"
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>RESET PROGRESS</span>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 space-y-1.5">
        <div className="flex justify-between text-xs font-medium font-mono">
          <span className="text-slate-600">
            <strong className="text-slate-900 font-semibold">{masteredCount}</strong> of {total} Questions Mastered
          </span>
          <span className="text-[#FF5722] font-bold">
            {percentage}%
          </span>
        </div>
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="h-full rounded-full bg-[#FF5722] transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Quick Filter Buttons with Portfolio Architectural Style */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-100">
        {/* All Questions */}
        <button
          onClick={() => onSelectStatusFilter('all')}
          className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            activeStatusFilter === 'all'
              ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
              : 'border-slate-200/90 hover:bg-slate-50/70 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className={`w-4 h-4 ${activeStatusFilter === 'all' ? 'text-slate-300' : 'text-slate-400'}`} strokeWidth={1.75} />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">All</span>
          </div>
          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
            activeStatusFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {total}
          </span>
        </button>

        {/* Mastered */}
        <button
          onClick={() => onSelectStatusFilter('mastered')}
          className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            activeStatusFilter === 'mastered'
              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500/30'
              : 'border-slate-200/90 hover:bg-slate-50/70 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Mastered</span>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
            {masteredCount}
          </span>
        </button>

        {/* Needs Review */}
        <button
          onClick={() => onSelectStatusFilter('unmastered')}
          className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            activeStatusFilter === 'unmastered'
              ? 'bg-[#FFF7ED] border-[#FF5722] text-[#C2410C] ring-1 ring-[#FF5722]/30'
              : 'border-slate-200/90 hover:bg-slate-50/70 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF5722]" strokeWidth={1.75} />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Review</span>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-orange-100 text-[#C2410C]">
            {unmasteredCount}
          </span>
        </button>

        {/* Bookmarked */}
        <button
          onClick={() => onSelectStatusFilter('bookmarked')}
          className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            activeStatusFilter === 'bookmarked'
              ? 'bg-amber-50 border-amber-500 text-amber-900 ring-1 ring-amber-500/30'
              : 'border-slate-200/90 hover:bg-slate-50/70 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-500" strokeWidth={1.75} />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Saved</span>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
            {bookmarkedCount}
          </span>
        </button>
      </div>
    </div>
  );
};
