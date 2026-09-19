'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  AlertCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Send,
  Printer,
  Code2,
  FileCheck,
  PenTool,
  BookOpen,
  Sparkles,
  Check,
  X,
} from 'lucide-react';
import { mcqQuestions } from '../data/mcqQuestions';
import { MCQQuestion, SelfGradeStatus } from '../types/exam';

const TOTAL_TIME_SECONDS = 90 * 60; // 1 hour 30 minutes = 5400s

interface WrittenExamModeViewProps {
  onSwitchToPractice: () => void;
  onSwitchToStudyGuide: () => void;
}

export const WrittenExamModeView: React.FC<WrittenExamModeViewProps> = ({
  onSwitchToPractice,
  onSwitchToStudyGuide,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [writtenAnswers, setWrittenAnswers] = useState<Record<number, string>>({});
  const [selfGrades, setSelfGrades] = useState<Record<number, SelfGradeStatus>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_TIME_SECONDS);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'match' | 'review' | 'unrated'>('all');
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Restore saved answers in session asynchronously
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = sessionStorage.getItem('oracle_written_answers');
        if (saved) {
          setWrittenAnswers(JSON.parse(saved));
        }
        const savedGrades = sessionStorage.getItem('oracle_written_grades');
        if (savedGrades) {
          setSelfGrades(JSON.parse(savedGrades));
        }
      } catch {
        // ignore
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isSubmitted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSubmitted]);

  // Handle answer change
  const handleAnswerChange = (questionId: number, text: string) => {
    setWrittenAnswers((prev) => {
      const next = { ...prev, [questionId]: text };
      try {
        sessionStorage.setItem('oracle_written_answers', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Submit Exam
  const handleFinishExam = useCallback(() => {
    setIsSubmitted(true);
    setConfirmSubmitOpen(false);
    if (timerRef.current) clearInterval(timerRef.current);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Retake / Reset
  const handleRetakeExam = () => {
    if (window.confirm('Restart the 90-minute exam simulation? Your written answers will be reset.')) {
      setWrittenAnswers({});
      setSelfGrades({});
      setTimeRemaining(TOTAL_TIME_SECONDS);
      setIsSubmitted(false);
      setCurrentIndex(0);
      try {
        sessionStorage.removeItem('oracle_written_answers');
        sessionStorage.removeItem('oracle_written_grades');
      } catch {
        // ignore
      }
    }
  };

  // Toggle Self-grading
  const handleToggleGrade = (questionId: number, status: 'match' | 'review') => {
    setSelfGrades((prev) => {
      const next: Record<number, SelfGradeStatus> = {
        ...prev,
        [questionId]: prev[questionId] === status ? ('unrated' as SelfGradeStatus) : status,
      };
      try {
        sessionStorage.setItem('oracle_written_grades', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Format timer string (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const answeredCount = useMemo(() => {
    return mcqQuestions.filter((q) => writtenAnswers[q.id]?.trim()?.length > 0).length;
  }, [writtenAnswers]);

  const currentQ: MCQQuestion = mcqQuestions[currentIndex];

  const matchedCount = useMemo(() => {
    return Object.values(selfGrades).filter((s) => s === 'match').length;
  }, [selfGrades]);

  const needsReviewCount = useMemo(() => {
    return Object.values(selfGrades).filter((s) => s === 'review').length;
  }, [selfGrades]);

  const timeElapsed = TOTAL_TIME_SECONDS - timeRemaining;
  const elapsedFormatted = formatTime(timeElapsed);
  const timeProgressPercent = Math.max(0, Math.min(100, (timeElapsed / TOTAL_TIME_SECONDS) * 100));
  const isFiveMinutesWarning = timeRemaining <= 300 && timeRemaining > 0 && !isSubmitted;

  return (
    <div className="space-y-6">
      {/* Sticky Countdown Timer Bar with Gentle Opacity Pulse when < 5 mins */}
      <div className="sticky top-[104px] lg:top-20 z-30 w-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-5 transition-all no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.div
              animate={isFiveMinutesWarning ? { opacity: [1, 0.45, 1], scale: [1, 1.05, 1] } : { opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono ${
                isFiveMinutesWarning
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-900 text-white'
              }`}
            >
              <Clock className="w-5 h-5" strokeWidth={1.75} />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#2563EB] uppercase">
                  [ 90-MIN SIMULATION ]
                </span>
                {isFiveMinutesWarning && (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-mono font-bold"
                  >
                    FINAL 5 MINUTES
                  </motion.span>
                )}
                {isSubmitted && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                    EXAM SUBMITTED
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 font-mono">
                <motion.span
                  animate={isFiveMinutesWarning ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`text-base sm:text-lg font-extrabold ${isFiveMinutesWarning ? 'text-rose-600' : 'text-slate-900'}`}
                >
                  [ ⏱️ {isSubmitted ? 'TIME STOPPED' : `${formatTime(timeRemaining)} REMAINING`} ]
                </motion.span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Quick Answered Tally */}
            <div className="font-mono text-xs text-slate-600 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              ANSWERED: <strong className="text-slate-900 font-bold">{answeredCount}</strong> / {mcqQuestions.length}
            </div>

            {!isSubmitted ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (answeredCount < mcqQuestions.length) {
                    setConfirmSubmitOpen(true);
                  } else {
                    handleFinishExam();
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F97316] hover:bg-[#EA580C] text-white shadow-[0_10px_24px_rgba(249,115,22,0.25)] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Finish & Verify Exam</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleRetakeExam}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Retake Exam</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Progress bar representing time */}
        <div className="mt-3.5 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              isFiveMinutesWarning ? 'bg-rose-500' : 'bg-[#F97316]'
            }`}
            initial={{ width: '100%' }}
            animate={{ width: `${100 - timeProgressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Confirmation Modal with Framer Motion AnimatePresence & Scale Transition */}
      <AnimatePresence>
        {confirmSubmitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmSubmitOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Unanswered Questions Remaining
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You have answered <strong className="text-slate-900">{answeredCount}</strong> of{' '}
                {mcqQuestions.length} questions. You still have{' '}
                <strong className="text-[#F97316]">{mcqQuestions.length - answeredCount} unanswered</strong> questions. Are you sure you want to finish now and compare with the official rubric?
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setConfirmSubmitOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer font-mono"
                >
                  Continue Writing
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleFinishExam}
                  className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F97316] hover:bg-[#EA580C] text-white shadow-xs transition-colors cursor-pointer font-mono"
                >
                  Yes, Finish & Verify
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW BRANCH: Written Exam Session vs Side-by-Side Verification Screen */}
      {!isSubmitted ? (
        /* ======================== ACTIVE WRITTEN EXAM INTERFACE ======================== */
        <div className="space-y-6">
          {/* Active Question Card with Entry Animation */}
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6"
          >
            {/* Question Top Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  Q#{currentQ.id < 10 ? `0${currentQ.id}` : currentQ.id}
                </span>
                <span className="font-mono text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                  [ {currentQ.chapter} ]
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <PenTool className="w-3.5 h-3.5 text-[#F97316]" strokeWidth={1.75} />
                <span>[ WRITTEN ESSAY / SQL DEFINITION ]</span>
              </div>
            </div>

            {/* Question Prompt */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
                {currentQ.question}
              </h3>

              {/* Optional Reference SQL Query */}
              {currentQ.codeSnippet && (
                <div className="p-4 rounded-2xl bg-slate-950 text-indigo-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" strokeWidth={1.75} />
                    <span>Oracle SQL Practice Reference</span>
                  </div>
                  <pre>
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Monospaced Written Answer Input Editor */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-semibold uppercase text-slate-500 tracking-wider">
                  [ YOUR WRITTEN ANSWER & SQL EXPLANATION ]
                </label>
                <span className="text-xs font-mono text-slate-400">
                  {writtenAnswers[currentQ.id]?.trim()
                    ? `${writtenAnswers[currentQ.id].trim().length} characters`
                    : '[ Empty / Not yet answered ]'}
                </span>
              </div>

              <textarea
                rows={7}
                value={writtenAnswers[currentQ.id] || ''}
                onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                placeholder="Type your explanation, rules, or SQL query here..."
                className="w-full rounded-2xl border border-slate-200 p-4 sm:p-5 font-mono text-sm sm:text-base text-slate-900 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 bg-white shadow-inner resize-y transition-all placeholder:text-slate-400 leading-relaxed"
              />

              <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
                <span>Provide definitions, keywords, or examples in Khmer or English.</span>
                <span>Auto-saved in browser</span>
              </div>
            </div>

            {/* Question Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
                <span>Previous Q</span>
              </motion.button>

              <div className="font-mono text-xs font-bold text-slate-600">
                {currentIndex + 1} / {mcqQuestions.length}
              </div>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentIndex((prev) => Math.min(mcqQuestions.length - 1, prev + 1))}
                disabled={currentIndex === mcqQuestions.length - 1}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <span>Next Q</span>
                <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
              </motion.button>
            </div>
          </motion.div>

          {/* Question Navigation Grid with Answered Dot Indicators */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 text-xs font-mono font-semibold text-slate-700">
              <span className="uppercase tracking-wider">[ QUESTION NAVIGATION GRID (1 - 22) ]</span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Answered
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-slate-200" />
                  Pending
                </span>
              </div>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
              {mcqQuestions.map((q, idx) => {
                const isCurrent = currentIndex === idx;
                const isAnswered = writtenAnswers[q.id]?.trim()?.length > 0;

                return (
                  <motion.button
                    key={q.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-10 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? 'bg-slate-900 text-white ring-2 ring-offset-2 ring-slate-900'
                        : isAnswered
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {/* Status Dot */}
                    <span
                      className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                        isAnswered ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ======================== SIDE-BY-SIDE VERIFICATION SCREEN ======================== */
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Results & Score Summary Banner */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <div className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#2563EB] uppercase mb-1">
                  [ EXAM VERIFICATION & RUBRIC CHECK ]
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase">
                  Written Exam Assessment
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
                  Completed in {elapsedFormatted} • Review your written answers against SETEC official standards.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onSwitchToPractice}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-orange-50 hover:bg-orange-100 text-[#F97316] border border-orange-200/80 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Practice Mode</span>
                </motion.button>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onSwitchToStudyGuide}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Study Guide</span>
                </motion.button>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Export</span>
                </motion.button>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleRetakeExam}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F97316] hover:bg-[#EA580C] text-white shadow-xs transition-colors cursor-pointer font-mono"
                >
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Retake</span>
                </motion.button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Answered Questions
                </span>
                <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
                  {answeredCount} / {mcqQuestions.length}
                </span>
                <span className="text-xs text-slate-400">
                  {Math.round((answeredCount / mcqQuestions.length) * 100)}% Completion
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                  Self-Graded Matches
                </span>
                <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">
                  {matchedCount} / {mcqQuestions.length}
                </span>
                <span className="text-xs text-emerald-600">
                  {Math.round((matchedCount / mcqQuestions.length) * 100)}% Match Rate
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <span className="text-[10px] uppercase font-bold text-rose-800 block">
                  Needs Review
                </span>
                <span className="text-2xl font-extrabold text-rose-700 mt-1 block">
                  {needsReviewCount}
                </span>
                <span className="text-xs text-rose-600">Discrepancies found</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-800 block">
                  Unrated Rubrics
                </span>
                <span className="text-2xl font-extrabold text-amber-700 mt-1 block">
                  {mcqQuestions.length - matchedCount - needsReviewCount}
                </span>
                <span className="text-xs text-amber-600">Pending your rating</span>
              </div>
            </div>

            {/* Filter Tabs for Verification with Framer Motion layoutId */}
            <div className="flex items-center gap-2 pt-2 overflow-x-auto scrollbar-none font-mono text-xs relative">
              {(
                [
                  { id: 'all', label: `All (${mcqQuestions.length})`, activeBg: 'bg-slate-900 text-white' },
                  { id: 'match', label: `Matched (${matchedCount})`, activeBg: 'bg-emerald-600 text-white' },
                  { id: 'review', label: `Needs Review (${needsReviewCount})`, activeBg: 'bg-rose-600 text-white' },
                  { id: 'unrated', label: `Unrated (${mcqQuestions.length - matchedCount - needsReviewCount})`, activeBg: 'bg-amber-600 text-white' },
                ] as const
              ).map((tab) => {
                const isActive = verificationFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setVerificationFilter(tab.id)}
                    className={`relative z-10 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isActive ? 'text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeVerificationFilter"
                        className={`absolute inset-0 rounded-full shadow-xs -z-10 ${
                          tab.id === 'match'
                            ? 'bg-emerald-600'
                            : tab.id === 'review'
                            ? 'bg-rose-600'
                            : tab.id === 'unrated'
                            ? 'bg-amber-600'
                            : 'bg-slate-900'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Side-by-Side Comparison Cards List */}
          <div className="space-y-6">
            {mcqQuestions
              .filter((q) => {
                if (verificationFilter === 'all') return true;
                const status = selfGrades[q.id] || 'unrated';
                return status === verificationFilter;
              })
              .map((q) => {
                const studentText = writtenAnswers[q.id]?.trim();
                const grade = selfGrades[q.id] || 'unrated';

                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`bg-white rounded-3xl border transition-all duration-200 shadow-sm p-6 sm:p-8 space-y-5 ${
                      grade === 'match'
                        ? 'border-emerald-300 ring-1 ring-emerald-500/20'
                        : grade === 'review'
                        ? 'border-rose-300 ring-1 ring-rose-500/20'
                        : 'border-slate-200/90'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                          Q#{q.id < 10 ? `0${q.id}` : q.id}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                          [ {q.chapter} ]
                        </span>
                      </div>

                      {/* Self-grading Toggle Action */}
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-xs text-slate-400 hidden sm:inline">GRADE YOUR ANSWER:</span>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleToggleGrade(q.id, 'match')}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            grade === 'match'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                          <span>Match / Correct</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleToggleGrade(q.id, 'review')}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            grade === 'review'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700'
                          }`}
                        >
                          <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                          <span>Needs Review</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <h4 className="text-lg font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h4>

                    {/* Side-by-Side Comparison Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                      {/* Left Column: Student Submission */}
                      <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                            <span>[ Your Submission ]</span>
                            {studentText ? (
                              <span className="text-emerald-700 font-semibold">Submitted</span>
                            ) : (
                              <span className="text-slate-400">Blank</span>
                            )}
                          </div>
                          <div className="text-sm font-mono leading-relaxed text-slate-800 whitespace-pre-wrap">
                            {studentText || (
                              <span className="text-slate-400 italic font-sans text-xs">
                                [ No answer was typed for this question ]
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Official SETEC Standard Answer */}
                      <div className="rounded-2xl border border-blue-200 bg-blue-50/30 p-5 space-y-2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] mb-2">
                            <FileCheck className="w-4 h-4 text-[#F97316]" strokeWidth={1.75} />
                            <span>[ Official SETEC Standard Answer ]</span>
                          </div>
                          <div className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                            {q.standardAnswer}
                          </div>
                          {q.codeSnippet && (
                            <div className="mt-3 p-3 rounded-xl bg-slate-950 text-indigo-200 font-mono text-xs overflow-x-auto border border-slate-800">
                              <pre>
                                <code>{q.codeSnippet}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>
      )}
    </div>
  );
};
