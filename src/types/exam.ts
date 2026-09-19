export interface ExamQuestion {
  id: number;
  chapter: string;
  question: string;
  answer: string;
  keywords?: string[];
  codeExample?: string;
  category: 'group_functions' | 'joins' | 'subqueries' | 'set_dml_ddl';
}

export interface MCQQuestion {
  id: number;
  chapter: string;
  question: string;
  codeSnippet?: string | null;
  options: string[];
  correctIndex: number;
  standardAnswer: string;
  explanation?: string;
  category?: 'group_functions' | 'joins' | 'subqueries' | 'set_dml_ddl';
}

export type ChapterFilter = 
  | 'All'
  | 'Lesson 5: Group Functions'
  | 'Lesson 6: Joins'
  | 'Lesson 10: Subqueries'
  | 'Set Operators, DML, DDL & Naming Conventions';

export type StatusFilter = 'all' | 'mastered' | 'unmastered' | 'bookmarked';

export type ActivePlatformTab = 'study_guide' | 'practice' | 'exam_mode';

export type SelfGradeStatus = 'match' | 'review' | 'unrated';

export interface WrittenExamState {
  answers: Record<number, string>;
  selfGrades: Record<number, SelfGradeStatus>;
  timeRemainingSeconds: number;
  isSubmitted: boolean;
  isStarted: boolean;
  timeTakenSeconds: number;
}
