'use client';

import React from 'react';
import {
  Layers,
  Sparkles,
  Printer,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  CheckSquare,
} from 'lucide-react';
import { ActivePlatformTab } from '../types/exam';

interface NavbarProps {
  activeTab: ActivePlatformTab;
  onSelectTab: (tab: ActivePlatformTab) => void;
  onOpenFlashcards: () => void;
  onOpenRandomQuiz: () => void;
  onOpenShortcuts: () => void;
  masteredCount: number;
  totalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenFlashcards,
  onOpenRandomQuiz,
  onOpenShortcuts,
  masteredCount,
  totalCount,
}) => {
  const percentage = Math.round((masteredCount / totalCount) * 100) || 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Portfolio Monogram Logo & Technical Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-slate-900 flex items-center justify-center text-xs font-bold text-slate-900 tracking-tight font-mono shadow-xs">
              SQL
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm tracking-widest text-slate-900 uppercase">
                Oracle SQL Review
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-700 font-semibold tracking-wider">
                [ SETEC // Y3 ]
              </span>
            </div>
          </div>

          {/* Center Platform Mode Navigation Tabs */}
          <nav className="hidden md:flex items-center p-1 rounded-full bg-slate-100/90 border border-slate-200/80 font-mono text-xs">
            <button
              onClick={() => onSelectTab('study_guide')}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'study_guide'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Study Guide</span>
            </button>
            <button
              onClick={() => onSelectTab('mcq_test')}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'mcq_test'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-[#FF5722]" strokeWidth={1.75} />
              <span>MCQ Test</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#FF5722]/15 text-[#FF5722] rounded-md">
                22 Qs
              </span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mastered Progress Mini Monospace Pill */}
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 font-mono text-xs text-slate-600"
              title={`${masteredCount} of ${totalCount} questions marked as mastered`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.75} />
              <span>
                <strong className="text-slate-900 font-semibold">{masteredCount}</strong>/{totalCount}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                {percentage}%
              </span>
            </div>

            {/* Flashcard Mode Button matching portfolio #FF5722 CTA */}
            <button
              onClick={onOpenFlashcards}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF5722] hover:bg-[#FF6B2C] text-white shadow-[0_10px_24px_rgba(255,87,34,0.25)] active:scale-95 transition-all cursor-pointer"
              title="Open Flashcard Study Mode (Key: F)"
            >
              <Layers className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span className="hidden sm:inline">Flashcards</span>
            </button>

            {/* Quick Random Test Question */}
            <button
              onClick={onOpenRandomQuiz}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Test a random question (Key: R)"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" strokeWidth={1.75} />
              <span className="hidden xl:inline">Random Q</span>
            </button>

            {/* Print Study Sheet */}
            <button
              onClick={() => window.print()}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors no-print cursor-pointer"
              title="Print Study Sheet / Export PDF"
              aria-label="Print study sheet"
            >
              <Printer className="w-4 h-4" strokeWidth={1.75} />
            </button>

            {/* Keyboard Shortcuts Helper */}
            <button
              onClick={onOpenShortcuts}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors no-print cursor-pointer"
              title="Keyboard Shortcuts (Key: ?)"
              aria-label="View keyboard shortcuts"
            >
              <HelpCircle className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Mobile View Switcher Tabs */}
        <div className="flex md:hidden items-center justify-center p-1 pb-2 text-xs border-t border-slate-100">
          <div className="flex w-full items-center p-0.5 rounded-full bg-slate-100 border border-slate-200/80 font-mono">
            <button
              onClick={() => onSelectTab('study_guide')}
              className={`flex-1 py-1.5 rounded-full text-center font-semibold uppercase tracking-wider text-[11px] transition-all ${
                activeTab === 'study_guide'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              Study Guide
            </button>
            <button
              onClick={() => onSelectTab('mcq_test')}
              className={`flex-1 py-1.5 rounded-full text-center font-semibold uppercase tracking-wider text-[11px] transition-all ${
                activeTab === 'mcq_test'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              MCQ Test [22]
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
