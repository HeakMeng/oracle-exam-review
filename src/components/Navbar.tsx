'use client';

import React from 'react';
import {
  BookOpen,
  CheckSquare,
  Clock,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { ActivePlatformTab } from '../types/exam';

interface NavbarProps {
  activeTab: ActivePlatformTab;
  onSelectTab: (tab: ActivePlatformTab) => void;
  onOpenFlashcards: () => void;
  onOpenRandomQuiz?: () => void;
  onOpenShortcuts?: () => void;
  masteredCount: number;
  totalCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenFlashcards,
  masteredCount,
}) => {
  const mode =
    activeTab === 'study_guide'
      ? 'study'
      : activeTab === 'practice'
      ? 'practice'
      : 'exam';

  const setMode = (newMode: 'study' | 'practice' | 'exam') => {
    if (newMode === 'study') {
      onSelectTab('study_guide');
    } else if (newMode === 'practice') {
      onSelectTab('practice');
    } else if (newMode === 'exam') {
      onSelectTab('exam_mode');
    }
  };

  const handleStartQuiz = () => {
    onOpenFlashcards();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top Header Row */}
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
        
        {/* Left: Brand Logo & School Tag */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs font-bold text-slate-800">
            SQL
          </div>
          <div className="flex flex-col shrink-0">
            <span className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-900 sm:text-base whitespace-nowrap">
              ORACLE SQL REVIEW
            </span>
          </div>
          <span className="hidden whitespace-nowrap rounded-md border border-blue-200/60 bg-blue-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider text-blue-600 sm:inline-block shrink-0">
            [ SETEC // Y3 ]
          </span>
        </div>

        {/* Center: Main Mode Switcher (Study vs Practice vs Exam) - Desktop ONLY (lg and up) */}
        <nav className="hidden lg:flex items-center rounded-xl border border-slate-200/90 bg-slate-100/70 p-1 shrink-0">
          <button
            onClick={() => setMode("study")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              mode === "study"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>STUDY GUIDE</span>
          </button>

          <button
            onClick={() => setMode("practice")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              mode === "practice"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" />
            <span>PRACTICE (MCQ)</span>
            <span
              className={`rounded px-1.5 py-0.2 font-mono text-[10px] font-bold ${
                mode === "practice" ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"
              }`}
            >
              22 QS
            </span>
          </button>

          <button
            onClick={() => setMode("exam")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              mode === "exam"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>EXAM MODE</span>
            <span
              className={`rounded px-1.5 py-0.2 font-mono text-[10px] font-bold ${
                mode === "exam" ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"
              }`}
            >
              90M
            </span>
          </button>
        </nav>

        {/* Right: Progress Metric & Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Progress pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/70 px-2.5 sm:px-3 py-1 font-mono text-xs font-bold text-emerald-700 whitespace-nowrap shrink-0">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{masteredCount}/22</span>
            <span className="text-emerald-500/80">
              {Math.round((masteredCount / 22) * 100)}%
            </span>
          </div>

          {/* Start Quiz Primary CTA */}
          <button
            onClick={handleStartQuiz}
            className="hidden md:flex items-center gap-2 rounded-xl bg-orange-500 px-3.5 sm:px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-orange-600 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>START QUIZ</span>
          </button>
        </div>

      </div>

      {/* Mobile & Tablet Mode Switcher Sub-Bar (< lg) */}
      <div className="lg:hidden border-t border-slate-100 bg-white/95 px-3 sm:px-6 py-1.5 sm:py-2">
        <nav className="mx-auto flex w-full max-w-lg items-center justify-between rounded-xl border border-slate-200/90 bg-slate-100/70 p-1">
          <button
            onClick={() => setMode("study")}
            className={`flex flex-1 items-center justify-center gap-1 sm:gap-1.5 rounded-lg py-1.5 px-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              mode === "study"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 shrink-0" />
            <span>STUDY<span className="hidden sm:inline"> GUIDE</span></span>
          </button>

          <button
            onClick={() => setMode("practice")}
            className={`flex flex-1 items-center justify-center gap-1 sm:gap-1.5 rounded-lg py-1.5 px-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              mode === "practice"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5 shrink-0" />
            <span>PRACTICE<span className="hidden sm:inline"> (MCQ)</span></span>
            <span
              className={`rounded px-1.5 py-0.2 font-mono text-[10px] font-bold ${
                mode === "practice" ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"
              }`}
            >
              22<span className="hidden sm:inline"> QS</span>
            </span>
          </button>

          <button
            onClick={() => setMode("exam")}
            className={`flex flex-1 items-center justify-center gap-1 sm:gap-1.5 rounded-lg py-1.5 px-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              mode === "exam"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span>EXAM<span className="hidden sm:inline"> MODE</span></span>
            <span
              className={`rounded px-1.5 py-0.2 font-mono text-[10px] font-bold ${
                mode === "exam" ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"
              }`}
            >
              90M
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
