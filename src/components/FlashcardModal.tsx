'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  CheckCircle2,
  Circle,
  Shuffle,
  BookOpen,
} from 'lucide-react';
import { ExamQuestion } from '../types/exam';

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: ExamQuestion[];
  masteredIds: Set<number>;
  onToggleMastered: (id: number) => void;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({
  isOpen,
  onClose,
  questions,
  masteredIds,
  onToggleMastered,
}) => {
  const [shuffledOrder, setShuffledOrder] = useState<ExamQuestion[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const deck = shuffledOrder && shuffledOrder.length === questions.length ? shuffledOrder : questions;
  const safeIndex = currentIndex < deck.length ? currentIndex : 0;
  const currentQuestion = deck[safeIndex];
  const isMastered = currentQuestion ? masteredIds.has(currentQuestion.id) : false;

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  }, [deck.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  }, [deck.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleShuffleDeck = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledOrder(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleClose = useCallback(() => {
    setIsFlipped(false);
    setShuffledOrder(null);
    setCurrentIndex(0);
    onClose();
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'm' && currentQuestion) {
        e.preventDefault();
        onToggleMastered(currentQuestion.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, handleFlip, handleNext, handlePrev, currentQuestion, onToggleMastered]);

  return (
    <AnimatePresence>
      {isOpen && currentQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col max-h-[92vh] overflow-hidden"
          >
            {/* Modal Top Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-slate-900 text-white">
                  <BookOpen className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight">
                    Flashcard Review Mode
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    CARD {safeIndex + 1} OF {deck.length} • PRESS SPACE TO FLIP
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShuffleDeck}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Shuffle Flashcards"
                >
                  <Shuffle className="w-4 h-4" strokeWidth={1.75} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close Flashcards (Esc)"
                >
                  <X className="w-5 h-5" strokeWidth={1.75} />
                </motion.button>
              </div>
            </div>

            {/* Card Body Area */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto flex flex-col items-center justify-center bg-[#F8FAFC]">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleFlip}
                className={`w-full min-h-[320px] sm:min-h-[360px] p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer shadow-sm flex flex-col justify-between select-none ${
                  isFlipped
                    ? 'bg-white border-[#F97316]/50 ring-1 ring-[#F97316]/20'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Top of Card: Chapter badge & Q# */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                    Q#{currentQuestion.id < 10 ? `0${currentQuestion.id}` : currentQuestion.id}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                    [ {currentQuestion.chapter} ]
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1 font-medium uppercase">
                    <RotateCw className="w-3.5 h-3.5 text-[#F97316]" strokeWidth={1.75} />
                    {isFlipped ? '[ Answer ]' : '[ Click to Flip ]'}
                  </span>
                </div>

                {/* Middle of Card: Question or Answer */}
                <div className="my-6">
                  {!isFlipped ? (
                    <div className="space-y-4">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F97316]">
                        [ Question Prompt ]
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                        {currentQuestion.question}
                      </h4>
                      {currentQuestion.keywords && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {currentQuestion.keywords.slice(0, 4).map((kw, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-700 font-medium"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                        [ Standard Answer ]
                      </span>
                      <div className="text-sm sm:text-base leading-relaxed text-slate-800 whitespace-pre-wrap">
                        {currentQuestion.answer}
                      </div>
                      {currentQuestion.codeExample && (
                        <div className="mt-3 p-3.5 rounded-2xl bg-slate-950 text-indigo-200 font-mono text-xs overflow-x-auto border border-slate-800">
                          <pre>
                            <code>{currentQuestion.codeExample}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Hint */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{isFlipped ? 'Click again to view question' : 'Try recalling before flipping'}</span>
                  <span className="hidden sm:inline">Space: Flip • ← / →: Navigate</span>
                </div>
              </motion.div>
            </div>

            {/* Modal Bottom Controls */}
            <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
              {/* Previous Card */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
                <span>Prev</span>
              </motion.button>

              {/* Center Actions: Mastered Toggle & Flip */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onToggleMastered(currentQuestion.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isMastered
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {isMastered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" strokeWidth={1.75} />
                      <span>Mastered</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                      <span>Master (M)</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFlip}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F97316] hover:bg-[#EA580C] text-white shadow-[0_10px_24px_rgba(249,115,22,0.25)] transition-colors cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" strokeWidth={1.75} />
                  <span>{isFlipped ? 'Show Question' : 'Flip Answer'}</span>
                </motion.button>
              </div>

              {/* Next Card */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
