'use client';

import React, { useState } from 'react';
import {
  X,
  RotateCw,
  CheckCircle2,
  Shuffle,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { ExamQuestion } from '../types/exam';

interface QuickQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: ExamQuestion[];
  masteredIds: Set<number>;
  onToggleMastered: (id: number) => void;
}

export const QuickQuizModal: React.FC<QuickQuizModalProps> = ({
  isOpen,
  onClose,
  questions,
  masteredIds,
  onToggleMastered,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (!isOpen || questions.length === 0) return null;

  const currentQuestion = questions[selectedIndex % questions.length];

  const pickRandom = () => {
    if (questions.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * questions.length);
    if (nextIdx === selectedIndex) {
      nextIdx = (nextIdx + 1) % questions.length;
    }
    setSelectedIndex(nextIdx);
    setRevealed(false);
  };

  const handleClose = () => {
    setRevealed(false);
    onClose();
  };

  const isMastered = masteredIds.has(currentQuestion.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-slate-900 text-white">
              <HelpCircle className="w-4 h-4" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">
                Random Practice Quiz
              </h3>
              <p className="text-xs font-mono text-slate-500">
                REALISTIC EXAM SIMULATION
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Question Area */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
              Q#{currentQuestion.id < 10 ? `0${currentQuestion.id}` : currentQuestion.id}
            </span>
            <span className="font-mono text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              [ {currentQuestion.chapter} ]
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h4>
          </div>
        </div>

        {/* Answer Revealed or Hidden */}
        {!revealed ? (
          <div className="text-center py-6 space-y-3">
            <button
              onClick={() => setRevealed(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#FF6B2C] text-white font-bold text-xs uppercase tracking-wider shadow-[0_10px_24px_rgba(255,87,34,0.25)] active:scale-98 transition-all cursor-pointer"
            >
              <RotateCw className="w-4 h-4" strokeWidth={1.75} />
              <span>Reveal Standard Answer</span>
            </button>
            <p className="text-xs font-mono text-slate-400">
              [ Formulate your answer mentally before clicking reveal ]
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90">
              <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider block mb-2">
                [ Standard Answer ]
              </span>
              <p className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                {currentQuestion.answer}
              </p>
            </div>

            {currentQuestion.codeExample && (
              <div className="p-3.5 rounded-2xl bg-slate-950 text-indigo-200 font-mono text-xs overflow-x-auto border border-slate-800">
                <pre>
                  <code>{currentQuestion.codeExample}</code>
                </pre>
              </div>
            )}

            {/* Self-Rating Options */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 font-mono">
              <button
                onClick={() => {
                  if (!isMastered) onToggleMastered(currentQuestion.id);
                  pickRandom();
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
                <span>Mark Mastered</span>
              </button>

              <button
                onClick={pickRandom}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        )}

        {/* Modal Bottom action */}
        {!revealed && (
          <div className="flex justify-end pt-2 border-t border-slate-100">
            <button
              onClick={pickRandom}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-slate-900 py-1.5 px-3 rounded-full hover:bg-slate-100 transition-colors cursor-pointer uppercase"
            >
              <Shuffle className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Next Random Question</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
