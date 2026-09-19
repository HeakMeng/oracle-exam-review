'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Code2,
  FileCheck,
} from 'lucide-react';
import { ExamQuestion } from '../types/exam';

interface QuestionCardProps {
  question: ExamQuestion;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
  isMastered: boolean;
  onToggleMastered: (id: number) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onCopySuccess: (message: string) => void;
  searchQuery?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isExpanded,
  onToggleExpand,
  isMastered,
  onToggleMastered,
  isBookmarked,
  onToggleBookmark,
  onCopySuccess,
  searchQuery = '',
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!question.codeExample) return;
    navigator.clipboard.writeText(question.codeExample);
    setCopiedCode(true);
    onCopySuccess(`SQL example for Question #${question.id} copied`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `[Oracle SQL Review - SETEC]\nChapter: ${question.chapter}\nQuestion #${question.id}: ${question.question}\n\nStandard Answer:\n${question.answer}${question.codeExample ? `\n\nSQL Practice Example:\n${question.codeExample}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAll(true);
    onCopySuccess(`Question #${question.id} and answer copied`);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Helper to highlight search query in text
  const highlightMatch = (text: string) => {
    if (!searchQuery.trim()) return text;
    const query = searchQuery.trim();
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-[#FFF7ED] text-[#C2410C] font-semibold rounded px-1 py-0.2 border-b-2 border-[#FF5722]"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Helper to format answers into paragraphs and clean bullet lines
  const renderFormattedAnswer = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }

      const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•');
      const isNumbered = /^[0-9]+\./.test(trimmed);
      const content = isBullet ? trimmed.substring(1).trim() : trimmed;

      return (
        <div
          key={idx}
          className={`text-sm sm:text-[15px] leading-relaxed text-slate-700 ${
            isBullet || isNumbered
              ? 'flex items-start gap-2.5 my-1.5 pl-2 border-l-2 border-slate-200'
              : 'my-1.5'
          }`}
        >
          {isBullet && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] shrink-0 mt-2" />
          )}
          <span className="flex-1 whitespace-pre-wrap">{highlightMatch(content)}</span>
        </div>
      );
    });
  };

  return (
    <article
      className={`group relative rounded-3xl bg-white border transition-all duration-200 shadow-sm hover:shadow-md print-page-break ${
        isMastered
          ? 'border-emerald-200 ring-1 ring-emerald-500/20'
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
    >
      {/* Top Header Row */}
      <div className="p-5 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Chapter Badge & ID */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
              Q#{question.id < 10 ? `0${question.id}` : question.id}
            </span>
            <span className="font-mono text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              [ {question.chapter} ]
            </span>
          </div>

          {/* Action Buttons: Bookmark & Mastered Checkbox */}
          <div className="flex items-center gap-2 no-print">
            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(question.id)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-amber-600 bg-amber-50 border border-amber-200'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Add to Favorites'}
              aria-label="Bookmark question"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} strokeWidth={1.75} />
            </button>

            {/* Copy Note Button */}
            <button
              onClick={handleCopyAll}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Copy Q&A Note"
              aria-label="Copy question and answer"
            >
              {copiedAll ? (
                <Check className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
              ) : (
                <Copy className="w-4 h-4" strokeWidth={1.75} />
              )}
            </button>

            {/* Mark as Mastered Pill Button */}
            <button
              onClick={() => onToggleMastered(question.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isMastered
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
              title={isMastered ? 'Mark as Needs Review' : 'Mark as Mastered'}
            >
              {isMastered ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" strokeWidth={1.75} />
                  <span>Mastered</span>
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
                  <span>Review</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Question Text */}
        <h3 className="mt-3 text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight">
          {highlightMatch(question.question)}
        </h3>

        {/* Technical Keywords Tags */}
        {question.keywords && question.keywords.length > 0 && (
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {question.keywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-700 font-medium"
              >
                {highlightMatch(kw)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Answer Toggle Bar (Self-Quiz Mode) */}
      <div className="px-5 sm:px-6 py-2.5 bg-slate-50/70 flex items-center justify-between border-b border-slate-100 no-print">
        <button
          onClick={() => onToggleExpand(question.id)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#FF5722] transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" strokeWidth={1.75} />
              <span>Hide Standard Answer</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
              <span>Show Standard Answer</span>
            </>
          )}
        </button>

        <span className="text-[11px] font-mono text-slate-400 font-medium">
          {isExpanded ? '[ Click to hide ]' : '[ Recall answer first ]'}
        </span>
      </div>

      {/* Answer Content Body */}
      <div
        className={`px-5 sm:px-6 py-4 transition-all duration-200 ${
          isExpanded ? 'block' : 'hidden print:block'
        }`}
      >
        <div className="space-y-3">
          {/* Answer Text Box */}
          <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-slate-200/90">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#2563EB] uppercase tracking-wider mb-2.5">
              <FileCheck className="w-4 h-4 text-[#FF5722]" strokeWidth={1.75} />
              <span>[ Standard Answer // Exam Guideline ]</span>
            </div>
            <div className="space-y-1">
              {renderFormattedAnswer(question.answer)}
            </div>
          </div>

          {/* SQL Syntax & Code Example Block */}
          {question.codeExample && (
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 text-xs sm:text-sm">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" strokeWidth={1.75} />
                  <span>Oracle SQL Practice Query</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy SQL Example"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" strokeWidth={1.75} />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" strokeWidth={1.75} />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-indigo-200">
                <code>{question.codeExample}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
