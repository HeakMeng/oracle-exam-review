'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Filter,
  Check,
  Layers,
} from 'lucide-react';
import { MCQQuestion, ChapterFilter } from '../types/exam';
import { mcqQuestions } from '../data/mcqQuestions';
import { CHAPTER_LIST } from '../data/examQuestions';

interface MCQQuizViewProps {
  onSwitchToStudyGuide: () => void;
  onOpenFlashcards: () => void;
}

export const MCQQuizView: React.FC<MCQQuizViewProps> = ({
  onSwitchToStudyGuide,
  onOpenFlashcards,
}) => {
  // Quiz Configuration
  const [selectedChapter, setSelectedChapter] = useState<ChapterFilter>('All');
  const [isExamMode, setIsExamMode] = useState<boolean>(false); // false: Practice (Instant), true: Exam (Submit at end)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [filterIncorrectOnly, setFilterIncorrectOnly] = useState<boolean>(false);

  // Best score stored in localStorage
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedBest = localStorage.getItem('oracle_exam_mcq_best_score');
        if (savedBest) {
          setBestScore(parseInt(savedBest, 10));
        }
      } catch {
        // ignore
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Filter questions based on chapter
  const baseQuestions = useMemo(() => {
    if (selectedChapter === 'All') return mcqQuestions;
    return mcqQuestions.filter((q) => q.chapter === selectedChapter);
  }, [selectedChapter]);

  // Questions for active quiz (optionally filtered by incorrect only)
  const activeQuestions = useMemo(() => {
    if (filterIncorrectOnly) {
      return baseQuestions.filter(
        (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctIndex
      );
    }
    return baseQuestions;
  }, [baseQuestions, filterIncorrectOnly, userAnswers]);

  const currentQ: MCQQuestion | undefined = activeQuestions[currentIndex];

  // Calculate scores
  const scoreResults = useMemo(() => {
    let correct = 0;
    let attempted = 0;
    activeQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans !== undefined) {
        attempted++;
        if (ans === q.correctIndex) {
          correct++;
        }
      }
    });
    const percentage = activeQuestions.length > 0 ? Math.round((correct / activeQuestions.length) * 100) : 0;
    return { correct, attempted, total: activeQuestions.length, percentage };
  }, [activeQuestions, userAnswers]);

  // Handle option select
  const handleSelectOption = (optionIdx: number) => {
    if (!currentQ || (isSubmitted && isExamMode)) return;
    // In practice mode, lock option once selected to show review
    if (!isExamMode && userAnswers[currentQ.id] !== undefined) return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIdx,
    }));
  };

  // Submit full test in Exam Mode
  const handleSubmitExam = () => {
    setIsSubmitted(true);
    // Save best score
    try {
      const prevBest = parseInt(localStorage.getItem('oracle_exam_mcq_best_score') || '0', 10);
      if (scoreResults.percentage > prevBest) {
        localStorage.setItem('oracle_exam_mcq_best_score', scoreResults.percentage.toString());
        setBestScore(scoreResults.percentage);
      }
    } catch {
      // ignore
    }
  };

  // Restart or reset quiz
  const handleRestartQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setFilterIncorrectOnly(false);
  };

  // Retake only incorrect answers
  const handleReviewIncorrect = () => {
    setFilterIncorrectOnly(true);
    setCurrentIndex(0);
    setIsSubmitted(false);
  };

  const answeredCurrent = currentQ ? userAnswers[currentQ.id] !== undefined : false;
  const currentSelectedOption = currentQ ? userAnswers[currentQ.id] : undefined;
  const isPracticeRevealed = !isExamMode && answeredCurrent;
  const isExamRevealed = isExamMode && isSubmitted;
  const showExplanation = isPracticeRevealed || isExamRevealed;

  return (
    <div className="space-y-6">
      {/* Quiz Top Control Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6">
        <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#2563EB] uppercase mb-3">
          [ 02 // MCQ TESTING ENGINE ]
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Chapter Filter Pill Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono">
            {CHAPTER_LIST.map((ch) => {
              const isActive = selectedChapter === ch;
              return (
                <button
                  key={ch}
                  onClick={() => {
                    setSelectedChapter(ch);
                    setCurrentIndex(0);
                    setUserAnswers({});
                    setIsSubmitted(false);
                    setFilterIncorrectOnly(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  {ch}
                </button>
              );
            })}
          </div>

          {/* Mode Switcher & Best Score */}
          <div className="flex items-center gap-3 self-end lg:self-auto font-mono">
            {bestScore !== null && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <Award className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.75} />
                <span>BEST: {bestScore}%</span>
              </div>
            )}

            {/* Instant Practice vs Timed Exam toggle */}
            <div className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs">
              <button
                onClick={() => {
                  setIsExamMode(false);
                  setIsSubmitted(false);
                }}
                className={`px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  !isExamMode
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Practice (Instant)
              </button>
              <button
                onClick={() => {
                  setIsExamMode(true);
                  setIsSubmitted(false);
                }}
                className={`px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isExamMode
                    ? 'bg-[#FF5722] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Exam Mode
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-4 text-xs font-medium font-mono">
          <div className="flex items-center gap-2 text-slate-600">
            <span>
              QUESTION <strong className="text-slate-900">{currentIndex + 1}</strong> OF {activeQuestions.length}
            </span>
            <span>•</span>
            <span>
              {scoreResults.attempted} ANSWERED
            </span>
            {filterIncorrectOnly && (
              <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-semibold border border-rose-200">
                REVIEWING MISTAKES ONLY
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600 transition-colors py-1 px-2.5 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>RESET</span>
            </button>
          </div>
        </div>

        {/* Linear progress track */}
        <div className="mt-2.5 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF5722] transition-all duration-300 ease-out rounded-full"
            style={{
              width: `${
                activeQuestions.length > 0
                  ? ((currentIndex + 1) / activeQuestions.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* Main Question Surface or Scorecard Screen */}
      {isSubmitted && isExamMode ? (
        /* Exam Results Scorecard */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-md mx-auto space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF7ED] text-[#FF5722] flex items-center justify-center mx-auto shadow-xs">
              <Award className="w-8 h-8" strokeWidth={1.75} />
            </div>
            <div className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#2563EB] uppercase">
              [ EXAM SUMMARY // SCORECARD ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase">
              Test Completed
            </h2>
            <div className="text-5xl sm:text-6xl font-extrabold text-[#FF5722] font-mono">
              {scoreResults.percentage}%
            </div>
            <p className="text-sm text-slate-600">
              You answered <strong className="text-slate-900">{scoreResults.correct}</strong> out of{' '}
              {scoreResults.total} questions correctly.
            </p>
          </div>

          {/* Performance Assessment Box */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-center max-w-lg mx-auto">
            {scoreResults.percentage >= 80 ? (
              <p className="text-sm font-semibold text-emerald-800">
                Excellent! You have demonstrated strong mastery of Oracle SQL exam concepts.
              </p>
            ) : scoreResults.percentage >= 50 ? (
              <p className="text-sm font-semibold text-amber-800">
                Good effort! Review the missed questions below to solidify your understanding.
              </p>
            ) : (
              <p className="text-sm font-semibold text-rose-800">
                Needs practice. Go through the Study Guide and Flashcards before retaking the test.
              </p>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {scoreResults.correct < scoreResults.total && (
              <button
                onClick={handleReviewIncorrect}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Filter className="w-4 h-4" strokeWidth={1.75} />
                <span>Review Mistakes ({scoreResults.total - scoreResults.correct})</span>
              </button>
            )}

            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider shadow-[0_10px_24px_rgba(255,87,34,0.25)] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={1.75} />
              <span>Retake Full Test</span>
            </button>

            <button
              onClick={onOpenFlashcards}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4" strokeWidth={1.75} />
              <span>Review with Flashcards</span>
            </button>

            <button
              onClick={onSwitchToStudyGuide}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" strokeWidth={1.75} />
              <span>Back to Study Guide</span>
            </button>
          </div>
        </div>
      ) : currentQ ? (
        /* Active Question Card */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Question Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  Q#{currentQ.id < 10 ? `0${currentQ.id}` : currentQ.id}
                </span>
                <span className="font-mono text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                  [ {currentQ.chapter} ]
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 font-medium uppercase">
                [ Single Choice ]
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {/* Optional SQL Snippet */}
            {currentQ.codeSnippet && (
              <div className="p-3.5 rounded-2xl bg-slate-950 text-indigo-200 font-mono text-xs sm:text-[13px] overflow-x-auto border border-slate-800">
                <pre>
                  <code>{currentQ.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = currentSelectedOption === idx;
              const isCorrectOption = idx === currentQ.correctIndex;

              let optionStyle =
                'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-700';

              if (showExplanation) {
                if (isCorrectOption) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                } else if (isSelected && !isCorrectOption) {
                  optionStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-medium';
                } else {
                  optionStyle = 'border-slate-200 opacity-60 text-slate-500';
                }
              } else if (isSelected) {
                optionStyle = 'border-[#FF5722] bg-[#FFF7ED] text-slate-900 ring-1 ring-[#FF5722]/40 font-semibold';
              }

              const letters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-150 cursor-pointer ${optionStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      showExplanation && isCorrectOption
                        ? 'bg-emerald-600 text-white'
                        : showExplanation && isSelected && !isCorrectOption
                        ? 'bg-rose-600 text-white'
                        : isSelected
                        ? 'bg-[#FF5722] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {showExplanation && isCorrectOption ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={2} />
                    ) : showExplanation && isSelected && !isCorrectOption ? (
                      <XCircle className="w-3.5 h-3.5" strokeWidth={2} />
                    ) : (
                      letters[idx]
                    )}
                  </span>
                  <span className="flex-1 text-sm sm:text-[15px] leading-relaxed">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Revealed in Practice Mode or after Exam Submission) */}
          {showExplanation && (
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-2">
              <div className="flex items-center gap-2">
                {currentSelectedOption === currentQ.correctIndex ? (
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 uppercase">
                    <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                    <span>[ Correct Answer ]</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-700 uppercase">
                    <XCircle className="w-4 h-4" strokeWidth={2} />
                    <span>[ Incorrect Choice ]</span>
                  </div>
                )}
              </div>
              <p className="text-sm leading-relaxed text-slate-700">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
              <span>Previous</span>
            </button>

            {/* Submit button or Next Question */}
            {isExamMode && currentIndex === activeQuestions.length - 1 ? (
              <button
                onClick={handleSubmitExam}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF5722] hover:bg-[#FF6B2C] text-white shadow-[0_10px_24px_rgba(255,87,34,0.25)] transition-colors cursor-pointer"
              >
                <span>Submit Exam Test</span>
                <Check className="w-4 h-4" strokeWidth={2} />
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))
                }
                disabled={currentIndex === activeQuestions.length - 1}
                className="inline-flex items-center gap-1 px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-3">
          <p className="text-sm text-slate-600">
            No questions available for the selected filter.
          </p>
          <button
            onClick={handleRestartQuiz}
            className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider"
          >
            Reset Quiz Filters
          </button>
        </div>
      )}

      {/* Quick Jump Number Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 text-xs font-mono font-semibold text-slate-700">
          <span className="uppercase tracking-wider">[ QUESTION NAVIGATION GRID ]</span>
          <span className="text-slate-400 font-normal">Click any number to jump directly</span>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
          {activeQuestions.map((q, idx) => {
            const isCurrent = currentIndex === idx;
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCorrect = isAnswered && userAnswers[q.id] === q.correctIndex;

            let buttonClass = 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100';

            if (showExplanation) {
              if (isCorrect) {
                buttonClass = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold';
              } else if (isAnswered) {
                buttonClass = 'bg-rose-50 text-rose-800 border-rose-300 font-bold';
              }
            } else if (isAnswered) {
              buttonClass = 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA] font-bold';
            }

            if (isCurrent) {
              buttonClass += ' ring-2 ring-slate-900';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-9 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center justify-center ${buttonClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
