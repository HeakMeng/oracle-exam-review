'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, Eye, EyeOff, Shuffle } from 'lucide-react';
import { ChapterFilter } from '../types/exam';
import { CHAPTER_LIST } from '../data/examQuestions';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeChapter: ChapterFilter;
  onSelectChapter: (chapter: ChapterFilter) => void;
  chapterCounts: Record<string, number>;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  allExpanded: boolean;
  onShuffle: () => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeChapter,
  onSelectChapter,
  chapterCounts,
  onExpandAll,
  onCollapseAll,
  allExpanded,
  onShuffle,
  searchInputRef,
}) => {
  return (
    <div className="space-y-4 no-print">
      {/* Search Bar & Master Action Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search keywords, syntax, answers (e.g. GROUP BY, JOIN, SUBQUERY)..."
            className="w-full pl-11 pr-20 py-3 rounded-full bg-white border border-slate-200/90 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] shadow-xs transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center gap-1.5">
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Clear search"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-md">
              /
            </kbd>
          </div>
        </div>

        {/* Master Expand/Collapse & Shuffle Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={allExpanded ? onCollapseAll : onExpandAll}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-colors cursor-pointer"
            title={allExpanded ? 'Collapse All Answers' : 'Expand All Answers'}
          >
            {allExpanded ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.75} />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-slate-900" strokeWidth={1.75} />
                <span>Expand All</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onShuffle}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-colors cursor-pointer"
            title="Randomize Question Order"
          >
            <Shuffle className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.75} />
            <span className="hidden sm:inline">Shuffle</span>
          </motion.button>
        </div>
      </div>

      {/* Chapter Filter Pill Tabs with Framer Motion layoutId */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none relative">
        {CHAPTER_LIST.map((chapter) => {
          const isActive = activeChapter === chapter;
          const count = chapterCounts[chapter] || 0;

          return (
            <button
              key={chapter}
              onClick={() => onSelectChapter(chapter)}
              className={`relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeChapterPill"
                  className="absolute inset-0 rounded-full bg-slate-900 shadow-xs -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span>{chapter}</span>
              <span
                className={`text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
