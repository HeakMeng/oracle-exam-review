'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const shortcuts = [
    { keys: ['/'], description: 'Focus Search Input' },
    { keys: ['Esc'], description: 'Close Modals / Clear Search' },
    { keys: ['F'], description: 'Open Flashcard Study Mode' },
    { keys: ['R'], description: 'Launch Random Practice Quiz' },
    { keys: ['Space'], description: 'Flip Flashcard (Flashcard Mode)' },
    { keys: ['←', '→'], description: 'Previous / Next Flashcard' },
    { keys: ['M'], description: 'Mark Flashcard as Mastered' },
    { keys: ['?'], description: 'Show Keyboard Shortcuts' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-slate-900 text-white">
                  <Keyboard className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">
                    Keyboard Shortcuts
                  </h3>
                  <p className="text-xs font-mono text-slate-500">QUICK ACCESS HOTKEYS</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.75} />
              </motion.button>
            </div>

            {/* Shortcuts List */}
            <div className="space-y-2.5 divide-y divide-slate-100">
              {shortcuts.map((sc, i) => (
                <div key={i} className="flex items-center justify-between pt-2 text-sm">
                  <span className="text-slate-700 font-medium text-xs sm:text-sm">{sc.description}</span>
                  <div className="flex items-center gap-1 font-mono">
                    {sc.keys.map((k, j) => (
                      <kbd
                        key={j}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono text-xs font-bold border border-slate-200 shadow-xs"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-center">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer font-mono"
              >
                Dismiss
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
