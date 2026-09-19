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
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'group_functions' | 'joins' | 'subqueries' | 'set_dml_ddl';
}

export type ChapterFilter = 
  | 'All'
  | 'Lesson 5: Group Functions'
  | 'Lesson 6: Joins'
  | 'Lesson 10: Subqueries'
  | 'Set Operators, DML, DDL & Naming Conventions';

export type StatusFilter = 'all' | 'mastered' | 'unmastered' | 'bookmarked';

export type ActivePlatformTab = 'study_guide' | 'mcq_test';
