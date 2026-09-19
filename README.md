# Oracle Database SQL Exam Review & Interactive MCQ Testing Platform | SETEC Institute Year III

A production-ready, fully responsive EdTech platform tailored to the exact visual style of [pmengheak.vercel.app](https://pmengheak.vercel.app/): crisp high-contrast light mode, Space Grotesk typography, technical architectural tagging, rounded cards with subtle borders, vibrant international orange accents, and zero emoji clutter. Built with **Next.js (App Router)**, **Tailwind CSS**, and **Space Grotesk** (with Khmer Unicode typography fallbacks: **Kantumruy Pro** & **Battambang**, and **JetBrains Mono** for code and metadata).

---

## 🎨 Exact Visual Identity & Light Theme Specifications

- **Theme Mode**: Strict Light Mode only (Zero dark mode classes, no dark overlays).
- **Background Canvas**: Soft off-white canvas (`bg-[#F8FAFC]` or `bg-white`).
- **Selection Style**: `::selection { background-color: #FF5722; color: #FFFFFF; }`.
- **Primary Brand Color**: International Orange (`#FF5722` / hover `#FF6B2C`) for primary CTAs, active radio selections, score indicators, and progress bars.
- **Tech Accent Blue**: Architectural Tech Blue (`#2563EB`) for system index badges, tracking labels, and links.
- **Surface Panels & Cards**: Pure crisp white (`#FFFFFF`) with subtle borders (`border-slate-200/90`), rounded corners (`rounded-3xl`), and soft elevation shadows (`shadow-sm hover:shadow-md`).
- **Technical Architectural Tagging**: Monospace metadata headers e.g. `[ 01 // ORACLE DATABASE ARCHITECTURE ]`, `[ 02 // MCQ TESTING ENGINE ]`, and tags `px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-700 font-medium`.
- **Typography & Font Stack**: Space Grotesk + Kantumruy Pro + Battambang + JetBrains Mono.
- **Icons**: Clean SVG icons from `lucide-react` with thin, elegant strokes (zero AI emojis).

---

## 🚀 Core Platform Features

### 1. Dual-Mode Learning Platform
- **Study Guide & Q&A View**:
  - Full 22 standard exam questions with comprehensive model answers.
  - Interactive reveal toggle for self-quizzing.
  - Master **"Expand All / Collapse All"** and **"Shuffle"** controls.
  - Real-time search with instant query keyword highlighting.
  - One-click copy for SQL practice queries and markdown study notes.
  - Mastered checklist tracked in browser `localStorage`.
- **Interactive MCQ Testing Engine**:
  - 22 multiple-choice questions aligned directly with the curriculum.
  - **Practice Mode (Instant Feedback)**: immediate correct/incorrect indication with in-depth explanations in Khmer.
  - **Exam Simulation Mode**: timed/structured test with final scorecard submission.
  - **Performance Scorecard**: percentage score, grade assessment, and option to review mistakes.
  - **Question Jump Grid**: fast navigation across all 22 questions.
  - Best score persistent tracking in `localStorage`.

### 2. 3D Flip Flashcard Deck
- Dedicated fullscreen flip mode with Spacebar flip and arrow-key navigation.
- Mark cards as mastered directly from the flashcard deck.

### 3. Curriculum Coverage (4 Core Modules)
1. `Lesson 5: Group Functions` (5 questions)
2. `Lesson 6: Joins` (5 questions)
3. `Lesson 10: Subqueries` (4 questions)
4. `Set Operators, DML, DDL & Naming Conventions` (8 questions)

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `/` or `Ctrl + K` | Focus Search Input |
| `Esc` | Clear Search / Close Modal |
| `F` | Open Flashcard Mode |
| `R` | Launch Random Practice Quiz |
| `Space` / `Enter` | Flip Flashcard (in Flashcard mode) |
| `←` / `→` | Previous / Next Question |
| `M` | Mark Flashcard as Mastered |
| `?` | View Keyboard Shortcuts cheatsheet |

---

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```
