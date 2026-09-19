'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Code2,
  Sparkles,
} from 'lucide-react';
import { MCQQuestion, ChapterFilter } from '../types/exam';
import { mcqQuestions } from '../data/mcqQuestions';
import { CHAPTER_LIST } from '../data/examQuestions';

// Fisher-Yates shuffle algorithm for question options
function shuffleOptionsWithFisherYates(
  options: string[],
  correctIndex: number
): { options: string[]; correctIndex: number } {
  const items = options.map((text, idx) => ({ text, isCorrect: idx === correctIndex }));
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  const newCorrectIndex = items.findIndex((item) => item.isCorrect);
  return {
    options: items.map((item) => item.text),
    correctIndex: newCorrectIndex,
  };
}

interface PracticeModeViewProps {
  onSwitchToStudyGuide: () => void;
  onOpenFlashcards: () => void;
  onSwitchToExamMode: () => void;
}

export const PracticeModeView: React.FC<PracticeModeViewProps> = ({
  onSwitchToStudyGuide,
  onOpenFlashcards,
  onSwitchToExamMode,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<ChapterFilter>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [filterIncorrectOnly, setFilterIncorrectOnly] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // Dynamic Fisher-Yates shuffled options per question session run
  const [shuffledStore, setShuffledStore] = useState<
    Record<number, { options: string[]; correctIndex: number }>
  >({});

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedBest = localStorage.getItem('oracle_practice_mcq_best_score');
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

  // Questions for active practice session (optionally filtered by incorrect only)
  const activeQuestions = useMemo(() => {
    if (filterIncorrectOnly) {
      return baseQuestions.filter((q) => {
        const userChoice = userAnswers[q.id];
        const questionData = shuffledStore[q.id] || { correctIndex: q.correctIndex };
        return userChoice !== undefined && userChoice !== questionData.correctIndex;
      });
    }
    return baseQuestions;
  }, [baseQuestions, filterIncorrectOnly, userAnswers, shuffledStore]);

  const currentQ: MCQQuestion | undefined = activeQuestions[currentIndex];

  // Retrieve or compute Fisher-Yates shuffled options for current question
  const currentShuffledData = useMemo(() => {
    if (!currentQ) return null;
    if (shuffledStore[currentQ.id]) {
      return shuffledStore[currentQ.id];
    }
    const shuffled = shuffleOptionsWithFisherYates(currentQ.options, currentQ.correctIndex);
    return shuffled;
  }, [currentQ, shuffledStore]);

  // Ensure shuffled options are recorded in state for consistency
  useEffect(() => {
    if (currentQ && currentShuffledData && !shuffledStore[currentQ.id]) {
      const timer = setTimeout(() => {
        setShuffledStore((prev) => ({
          ...prev,
          [currentQ.id]: currentShuffledData,
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [currentQ, currentShuffledData, shuffledStore]);

  const activeOptions = currentShuffledData ? currentShuffledData.options : currentQ?.options || [];
  const activeCorrectIndex = currentShuffledData ? currentShuffledData.correctIndex : currentQ?.correctIndex ?? 0;

  // Calculate scores
  const scoreResults = useMemo(() => {
    let correct = 0;
    let attempted = 0;
    let mistakes = 0;
    baseQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      const qData = shuffledStore[q.id] || { correctIndex: q.correctIndex };
      if (ans !== undefined) {
        attempted++;
        if (ans === qData.correctIndex) {
          correct++;
        } else {
          mistakes++;
        }
      }
    });
    const percentage = baseQuestions.length > 0 ? Math.round((correct / baseQuestions.length) * 100) : 0;
    return { correct, attempted, mistakes, total: baseQuestions.length, percentage };
  }, [baseQuestions, userAnswers, shuffledStore]);

  // Handle option select with instant feedback
  const handleSelectOption = (optionIdx: number) => {
    if (!currentQ) return;
    // Lock once selected to preserve instant feedback review
    if (userAnswers[currentQ.id] !== undefined) return;

    setUserAnswers((prev) => {
      const next = {
        ...prev,
        [currentQ.id]: optionIdx,
      };

      const isCorrect = optionIdx === activeCorrectIndex;
      if (isCorrect) {
        try {
          const totalCorrect = Object.entries(next).filter(([idStr, ans]) => {
            const qId = Number(idStr);
            const qData = shuffledStore[qId] || mcqQuestions.find((q) => q.id === qId);
            return qData?.correctIndex === ans;
          }).length;
          const currentPct = Math.round((totalCorrect / mcqQuestions.length) * 100);
          const prevBest = parseInt(localStorage.getItem('oracle_practice_mcq_best_score') || '0', 10);
          if (currentPct > prevBest) {
            localStorage.setItem('oracle_practice_mcq_best_score', currentPct.toString());
            setBestScore(currentPct);
          }
        } catch {
          // ignore
        }
      }

      return next;
    });
  };

  // Restart or reset quiz with new Fisher-Yates shuffles
  const handleRestartQuiz = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setFilterIncorrectOnly(false);
    setShuffledStore({});
  };

  // Retake only incorrect answers
  const handleReviewIncorrect = () => {
    setFilterIncorrectOnly(true);
    setCurrentIndex(0);
  };

  const answeredCurrent = currentQ ? userAnswers[currentQ.id] !== undefined : false;
  const currentSelectedOption = currentQ ? userAnswers[currentQ.id] : undefined;
  const showExplanation = answeredCurrent;

  return (
    <div className="space-y-6">
      {/* Practice Top Control Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#2563EB] uppercase">
            [ 02 // PRACTICE MODE: MULTIPLE CHOICE & INSTANT FEEDBACK ]
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onSwitchToStudyGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Study Guide</span>
            </motion.button>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenFlashcards}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#F97316]" strokeWidth={1.75} />
              <span>Flashcard Deck</span>
            </motion.button>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onSwitchToExamMode}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-orange-50 hover:bg-orange-100 text-[#F97316] border border-orange-200/80 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Exam Mode (90M)</span>
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Chapter Filter Pill Tabs with Framer Motion layoutId */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono relative">
            {CHAPTER_LIST.map((ch) => {
              const isActive = selectedChapter === ch;
              return (
                <button
                  key={ch}
                  onClick={() => {
                    setSelectedChapter(ch);
                    setCurrentIndex(0);
                    setUserAnswers({});
                    setFilterIncorrectOnly(false);
                  }}
                  className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePracticeChapterPill"
                      className="absolute inset-0 rounded-full bg-slate-900 shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {ch}
                </button>
              );
            })}
          </div>

          {/* Stats and Actions */}
          <div className="flex items-center gap-2.5 self-end lg:self-auto font-mono text-xs">
            {bestScore !== null && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                <Award className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.75} />
                <span>BEST: {bestScore}%</span>
              </div>
            )}

            {scoreResults.mistakes > 0 && !filterIncorrectOnly && (
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReviewIncorrect}
                className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors py-1 px-2.5 rounded-full cursor-pointer font-bold"
              >
                <Filter className="w-3 h-3" strokeWidth={2} />
                <span>Review Mistakes ({scoreResults.mistakes})</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600 transition-colors py-1 px-2.5 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>RESET</span>
            </motion.button>
          </div>
        </div>

        {/* Progress bar info */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-4 text-xs font-medium font-mono">
          <div className="flex items-center gap-2 text-slate-600">
            <span>
              QUESTION <strong className="text-slate-900">{currentIndex + 1}</strong> OF {activeQuestions.length}
            </span>
            <span>•</span>
            <span>
              {scoreResults.attempted} ANSWERED
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">
              {scoreResults.correct} CORRECT
            </span>
            {filterIncorrectOnly && (
              <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-semibold border border-rose-200">
                MISTAKES ONLY
              </span>
            )}
          </div>
        </div>

        {/* Progress track */}
        <div className="mt-2.5 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#F97316] rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${
                activeQuestions.length > 0
                  ? ((currentIndex + 1) / activeQuestions.length) * 100
                  : 0
              }%`,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Active Question Card with Entry Animation */}
      {currentQ ? (
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6"
        >
          {/* Question Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  Q#{currentQ.id < 10 ? `0${currentQ.id}` : currentQ.id}
                </span>
                <span className="font-mono text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                  [ {currentQ.chapter} ]
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 font-medium uppercase">
                [ 4 Randomized Options // Fisher-Yates ]
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {/* Optional SQL Snippet */}
            {currentQ.codeSnippet && (
              <div className="p-3.5 rounded-2xl bg-slate-950 text-indigo-200 font-mono text-xs sm:text-[13px] overflow-x-auto border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" strokeWidth={1.75} />
                  <span>Oracle SQL Query Snippet</span>
                </div>
                <pre>
                  <code>{currentQ.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>

          {/* 4 Multiple Choice Options with Tactile Press & Hover Animation */}
          <div className="space-y-3">
            {activeOptions.map((option, idx) => {
              const isSelected = currentSelectedOption === idx;
              const isCorrectOption = idx === activeCorrectIndex;

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
              }

              const letters = ['A', 'B', 'C', 'D'];

              return (
                <motion.button
                  key={idx}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-150 cursor-pointer ${optionStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      showExplanation && isCorrectOption
                        ? 'bg-emerald-600 text-white'
                        : showExplanation && isSelected && !isCorrectOption
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-700'
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
                </motion.button>
              );
            })}
          </div>

          {/* Instant Feedback Explanation Box with Smooth Framer Motion Accordion */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2">
                    {currentSelectedOption === activeCorrectIndex ? (
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
                  <div className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                    {currentQ.standardAnswer}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 font-mono">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
              <span>Previous</span>
            </motion.button>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))
              }
              disabled={currentIndex === activeQuestions.length - 1}
              className="inline-flex items-center gap-1 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
            </motion.button>
          </div>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-3">
          <p className="text-sm text-slate-600">
            No questions available for the selected filter.
          </p>
          <button
            onClick={handleRestartQuiz}
            className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider font-mono"
          >
            Reset Practice Filters
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
            const qData = shuffledStore[q.id] || { correctIndex: q.correctIndex };
            const isCorrect = isAnswered && userAnswers[q.id] === qData.correctIndex;

            let buttonClass = 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100';

            if (isAnswered) {
              if (isCorrect) {
                buttonClass = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold';
              } else {
                buttonClass = 'bg-rose-50 text-rose-800 border-rose-300 font-bold';
              }
            }

            if (isCurrent) {
              buttonClass += ' ring-2 ring-slate-900';
            }

            return (
              <motion.button
                key={q.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentIndex(idx)}
                className={`h-9 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center justify-center ${buttonClass}`}
              >
                {idx + 1}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
