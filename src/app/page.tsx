'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { StatsBanner } from '../components/StatsBanner';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { QuestionCard } from '../components/QuestionCard';
import { FlashcardModal } from '../components/FlashcardModal';
import { QuickQuizModal } from '../components/QuickQuizModal';
import { KeyboardShortcutsModal } from '../components/KeyboardShortcutsModal';
import { Footer } from '../components/Footer';
import { ToastContainer, ToastMessage } from '../components/Toast';
import { MCQQuizView } from '../components/MCQQuizView';
import { examQuestions, CHAPTER_LIST } from '../data/examQuestions';
import { ChapterFilter, StatusFilter, ExamQuestion, ActivePlatformTab } from '../types/exam';
import { Filter, Trophy, Layers } from 'lucide-react';

export default function ExamReviewHome() {
  // --- Active Tab ---
  const [activeTab, setActiveTab] = useState<ActivePlatformTab>('study_guide');

  // --- Persistent Storage State ---
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  // --- UI Controls State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChapter, setActiveChapter] = useState<ChapterFilter>('All');
  const [activeStatusFilter, setActiveStatusFilter] = useState<StatusFilter>('all');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [questionsList, setQuestionsList] = useState<ExamQuestion[]>(examQuestions);

  // --- Modals & Toasts ---
  const [isFlashcardOpen, setIsFlashcardOpen] = useState(false);
  const [isQuickQuizOpen, setIsQuickQuizOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Load saved state from localStorage safely after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedMastered = localStorage.getItem('oracle_exam_mastered');
        if (savedMastered) {
          setMasteredIds(new Set(JSON.parse(savedMastered)));
        }

        const savedBookmarked = localStorage.getItem('oracle_exam_bookmarked');
        if (savedBookmarked) {
          setBookmarkedIds(new Set(JSON.parse(savedBookmarked)));
        }
      } catch (err) {
        console.error('Failed to load storage preferences', err);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Toast helper
  const showToast = useCallback((title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Mastered state
  const handleToggleMastered = useCallback((id: number) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Question #${id} moved back to Needs Review`, undefined, 'info');
      } else {
        next.add(id);
        showToast(`Question #${id} marked as Mastered`, undefined, 'success');
      }
      try {
        localStorage.setItem('oracle_exam_mastered', JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  }, [showToast]);

  // Reset Progress
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your mastered checklist?')) {
      setMasteredIds(new Set());
      try {
        localStorage.removeItem('oracle_exam_mastered');
      } catch {
        // ignore
      }
      showToast('Mastered progress reset', undefined, 'info');
    }
  };

  // Toggle Bookmark state
  const handleToggleBookmark = useCallback((id: number) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Question #${id} removed from Favorites`, undefined, 'info');
      } else {
        next.add(id);
        showToast(`Question #${id} added to Favorites`, undefined, 'success');
      }
      try {
        localStorage.setItem('oracle_exam_bookmarked', JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  }, [showToast]);

  // Expand / Collapse
  const handleToggleExpand = useCallback((id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Shuffle Questions Order
  const handleShuffle = () => {
    const shuffled = [...questionsList].sort(() => Math.random() - 0.5);
    setQuestionsList(shuffled);
    showToast('Question order randomized', undefined, 'info');
  };

  // Chapter question counts for tabs
  const chapterCounts = useMemo(() => {
    const counts: Record<string, number> = { All: examQuestions.length };
    CHAPTER_LIST.forEach((ch) => {
      if (ch !== 'All') {
        counts[ch] = examQuestions.filter((q) => q.chapter === ch).length;
      }
    });
    return counts;
  }, []);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return questionsList.filter((q) => {
      if (activeChapter !== 'All' && q.chapter !== activeChapter) {
        return false;
      }

      if (activeStatusFilter === 'mastered' && !masteredIds.has(q.id)) {
        return false;
      }
      if (activeStatusFilter === 'unmastered' && masteredIds.has(q.id)) {
        return false;
      }
      if (activeStatusFilter === 'bookmarked' && !bookmarkedIds.has(q.id)) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchQ = q.question.toLowerCase().includes(query);
        const matchA = q.answer.toLowerCase().includes(query);
        const matchCh = q.chapter.toLowerCase().includes(query);
        const matchKw = q.keywords?.some((k) => k.toLowerCase().includes(query));
        const matchCode = q.codeExample?.toLowerCase().includes(query);

        return matchQ || matchA || matchCh || matchKw || matchCode;
      }

      return true;
    });
  }, [questionsList, activeChapter, activeStatusFilter, masteredIds, bookmarkedIds, searchQuery]);

  const allExpanded = useMemo(() => {
    if (filteredQuestions.length === 0) return false;
    return filteredQuestions.every((q) => expandedIds.has(q.id));
  }, [filteredQuestions, expandedIds]);

  const handleExpandAll = () => {
    const allIds = new Set(filteredQuestions.map((q) => q.id));
    setExpandedIds(allIds);
  };

  const handleCollapseAll = () => {
    setExpandedIds(new Set());
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        if (e.key === 'Escape') {
          (document.activeElement as HTMLElement).blur();
          setSearchQuery('');
        }
        return;
      }

      if (e.key === '/' || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        setActiveTab('study_guide');
        setTimeout(() => searchInputRef.current?.focus(), 50);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsFlashcardOpen(true);
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        setIsQuickQuizOpen(true);
      } else if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenFlashcards={() => setIsFlashcardOpen(true)}
        onOpenRandomQuiz={() => setIsQuickQuizOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        masteredCount={masteredIds.size}
        totalCount={examQuestions.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Conditional View: Study Guide vs Interactive MCQ Quiz */}
        {activeTab === 'mcq_test' ? (
          <MCQQuizView
            onSwitchToStudyGuide={() => setActiveTab('study_guide')}
            onOpenFlashcards={() => setIsFlashcardOpen(true)}
          />
        ) : (
          <>
            {/* Architectural Minimal Top Header */}
            <div className="mb-2 pt-2">
              <div className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#2563EB] uppercase mb-2">
                [ 01 // ORACLE DATABASE ARCHITECTURE ]
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 uppercase tracking-tight">
                    Oracle SQL Exam Review
                  </h1>
                  <p className="text-slate-600 text-sm sm:text-base mt-1.5 font-normal max-w-3xl">
                    Comprehensive study bank for SETEC Year III DBMS. Master standard theory, joins, subqueries, group functions, set operators, and DDL/DML commands.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => setActiveTab('mcq_test')} 
                    className="px-5 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#FF6B2C] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_10px_24px_rgba(255,87,34,0.25)] active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <Trophy className="w-4 h-4" strokeWidth={1.75} />
                    <span>Start MCQ Quiz</span>
                  </button>
                  <button 
                    onClick={() => setIsFlashcardOpen(true)} 
                    className="px-4 py-2.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Layers className="w-4 h-4" strokeWidth={1.75} />
                    <span>Flashcards</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mastered Progress Bar & Status Pill Filters */}
            <StatsBanner
              total={examQuestions.length}
              masteredCount={masteredIds.size}
              bookmarkedCount={bookmarkedIds.size}
              activeStatusFilter={activeStatusFilter}
              onSelectStatusFilter={setActiveStatusFilter}
              onResetProgress={handleResetProgress}
            />

            {/* Search, Chapters, and Controls */}
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeChapter={activeChapter}
              onSelectChapter={setActiveChapter}
              chapterCounts={chapterCounts}
              onExpandAll={handleExpandAll}
              onCollapseAll={handleCollapseAll}
              allExpanded={allExpanded}
              onShuffle={handleShuffle}
              searchInputRef={searchInputRef}
            />

            {/* Active Results Summary */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1 font-mono">
              <div>
                SHOWING <strong className="text-slate-900 font-semibold">{filteredQuestions.length}</strong> OF {examQuestions.length} QUESTIONS
                {activeChapter !== 'All' && (
                  <span> IN <strong className="text-[#2563EB]">{activeChapter}</strong></span>
                )}
                {activeStatusFilter !== 'all' && (
                  <span> (FILTER: <span className="font-semibold text-[#FF5722] uppercase">[{activeStatusFilter}]</span>)</span>
                )}
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#2563EB] hover:text-[#FF5722] hover:underline font-medium cursor-pointer uppercase text-xs"
                >
                  [ Clear Search ]
                </button>
              )}
            </div>

            {/* Questions Grid / List */}
            {filteredQuestions.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-5">
                {filteredQuestions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    isExpanded={expandedIds.has(q.id)}
                    onToggleExpand={handleToggleExpand}
                    isMastered={masteredIds.has(q.id)}
                    onToggleMastered={handleToggleMastered}
                    isBookmarked={bookmarkedIds.has(q.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onCopySuccess={(msg) => showToast(msg, undefined, 'success')}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Filter className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="text-base font-bold text-slate-900">
                    រកមិនឃើញសំណួរត្រូវនឹងលក្ខខណ្ឌស្វែងរកឡើយ
                  </h3>
                  <p className="text-xs text-slate-500">
                    សូមសាកល្បងផ្លាស់ប្តូរពាក្យគន្លឹះ ឬជ្រើសរើសជំពូក (Chapter) ផ្សេងទៀត។
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveChapter('All');
                    setActiveStatusFilter('all');
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <FlashcardModal
        isOpen={isFlashcardOpen}
        onClose={() => setIsFlashcardOpen(false)}
        questions={filteredQuestions.length > 0 ? filteredQuestions : examQuestions}
        masteredIds={masteredIds}
        onToggleMastered={handleToggleMastered}
      />

      <QuickQuizModal
        isOpen={isQuickQuizOpen}
        onClose={() => setIsQuickQuizOpen(false)}
        questions={filteredQuestions.length > 0 ? filteredQuestions : examQuestions}
        masteredIds={masteredIds}
        onToggleMastered={handleToggleMastered}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
