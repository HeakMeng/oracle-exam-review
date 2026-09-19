'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-slate-900 flex items-center justify-center text-xs font-bold text-slate-900 font-mono shrink-0 shadow-xs">
              SQL
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">
                Oracle SQL Review • Year III
              </p>
              <p className="text-xs text-slate-500 font-mono">
                SETEC INSTITUTE • DATABASE MANAGEMENT SYSTEMS (DBMS)
              </p>
            </div>
          </div>

          {/* Right Jump To Top */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline uppercase">
              [ Group Functions • Joins • Subqueries • Set Ops • DDL/DML ]
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" strokeWidth={1.75} />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <p>
            PORTFOLIO EDITION • HIGH CONTRAST EDTECH PLATFORM
          </p>
          <p>
            SETEC INSTITUTE • ACADEMIC YEAR 2025–2026
          </p>
        </div>
      </div>
    </footer>
  );
};
