import { ExamQuestion } from '../types/exam';

export const examQuestions: ExamQuestion[] = [
  {
    id: 1,
    chapter: "Lesson 5: Group Functions",
    category: "group_functions",
    question: "តើអ្វីទៅជា Group Function? ចូរប្រាប់ពីឈ្មោះនៃ Group Function និងប្រាប់ពីតួនាទីរបស់វា។",
    answer: "Group Function (ឬ Aggregate Function) គឺជា Function ដែលទទួលយកទិន្នន័យពីច្រើនជួរ (Multiple Rows) មកគណនា និងផ្ដល់លទ្ធផលត្រឡប់មកវិញត្រឹមតែតម្លៃមួយជួរគត់ (Single Result) សម្រាប់មួយក្រុមទិន្នន័យ。\n\n- COUNT(): រាប់ចំនួនជួរ (Rows) ឬចំនួនតម្លៃដែលមិនមែនជា NULL\n- SUM(): គណនាផលបូកសរុបនៃតម្លៃលេខ\n- AVG(): គណនាតម្លៃមធ្យមនៃជួរលេខ\n- MIN(): ស្វែងរកតម្លៃតូចបំផុត\n- MAX(): ស្វែងរកតម្លៃធំបំផុត",
    keywords: ["Group Function", "Aggregate Function", "COUNT", "SUM", "AVG", "MIN", "MAX", "Multiple Rows", "Single Result"],
    codeExample: "SELECT \n  COUNT(*) AS total_staff,\n  SUM(salary) AS total_payroll,\n  ROUND(AVG(salary), 2) AS avg_salary,\n  MIN(salary) AS lowest_salary,\n  MAX(salary) AS highest_salary\nFROM employees\nWHERE department_id = 50;"
  },
  {
    id: 2,
    chapter: "Lesson 5: Group Functions",
    category: "group_functions",
    question: "តើ GROUP BY Clause ប្រើសម្រាប់ធ្វើអ្វី?",
    answer: "GROUP BY clause ប្រើសម្រាប់បែងចែកជួរទិន្នន័យ (Rows) ទៅជាក្រុមតូចៗ (Groups) ដោយផ្អែកលើតម្លៃនៅក្នុង Column មួយ ឬច្រើន ដើម្បីឱ្យ Group Function អាចគណនាទៅលើក្រុមនីមួយៗដាច់ដោយឡែកពីគ្នា។",
    keywords: ["GROUP BY", "Clause", "Rows", "Groups", "Group Function", "Aggregation"],
    codeExample: "SELECT department_id, COUNT(*) AS staff_count, AVG(salary) AS avg_sal\nFROM employees\nGROUP BY department_id\nORDER BY department_id;"
  },
  {
    id: 3,
    chapter: "Lesson 5: Group Functions",
    category: "group_functions",
    question: "ចូរប្រាប់ពីតួនាទីរបស់ HAVING Clause?",
    answer: "HAVING clause ប្រើសម្រាប់កំណត់លក្ខខណ្ឌចម្រាញ់ (Filter) ទៅលើលទ្ធផលរបស់ក្រុម (Groups) បន្ទាប់ពីការបែងចែកដោយ GROUP BY រួច។ វាត្រូវបានបង្កើតឡើងជាពិសេសដើម្បីប្រើជាមួយ Group Functions (ឧទាហរណ៍៖ HAVING AVG(salary) > 5000)។",
    keywords: ["HAVING", "Filter", "Groups", "GROUP BY", "Group Functions", "Aggregated Results"],
    codeExample: "SELECT department_id, AVG(salary)\nFROM employees\nGROUP BY department_id\nHAVING AVG(salary) > 5000;"
  },
  {
    id: 4,
    chapter: "Lesson 5: Group Functions",
    category: "group_functions",
    question: "ចូរប្រៀបធៀបរវាង HAVING Clause និង WHERE Clause",
    answer: "• WHERE Clause: Filter ជួរទិន្នន័យនីមួយៗ (Individual Rows) មុនពេលទិន្នន័យត្រូវបែងចែកក្រុម (GROUP BY) និងមិនអាចប្រើជាមួយ Group Functions បានឡើយ។\n• HAVING Clause: Filter លើក្រុមទិន្នន័យ (Aggregated Groups) ក្រោយពេលទិន្នន័យត្រូវបែងចែកក្រុមរួច និងអាចប្រើជាមួយ Group Functions បាន។",
    keywords: ["WHERE Clause", "HAVING Clause", "Individual Rows", "Aggregated Groups", "Filter Timing"],
    codeExample: "-- 1. WHERE filters individual rows before grouping\n-- 2. GROUP BY aggregates the remaining rows\n-- 3. HAVING filters the grouped results\nSELECT department_id, AVG(salary)\nFROM employees\nWHERE salary > 2000\nGROUP BY department_id\nHAVING AVG(salary) > 5000;"
  },
  {
    id: 5,
    chapter: "Lesson 5: Group Functions",
    category: "group_functions",
    question: "តើ Nesting ជាអ្វី?",
    answer: "Nesting Group Functions គឺជាការយក Group Function មួយទៅដាក់បង្កប់ខាងក្នុង Group Function មួយទៀត (ឧទាហរណ៍៖ MAX(AVG(salary)))។ នៅក្នុង Oracle SQL អាច Nest បានអតិបរមា ២ កម្រិត (2 levels deep) ហើយចាំបាច់ត្រូវតែមានវត្តមានរបស់ GROUP BY clause។",
    keywords: ["Nesting", "Group Functions", "2 levels deep", "MAX(AVG())", "GROUP BY"],
    codeExample: "-- Finds the maximum of average salaries across departments\nSELECT MAX(AVG(salary))\nFROM employees\nGROUP BY department_id;"
  },
  {
    id: 6,
    chapter: "Lesson 6: Joins",
    category: "joins",
    question: "ចូរនិយាយអំពី Natural Join",
    answer: "NATURAL JOIN គឺជាការភ្ជាប់តារាងពីរចូលគ្នាដោយស្វ័យប្រវត្តិ ដោយផ្អែកលើ Column ណាដែលមានឈ្មោះដូចគ្នា និងមាន Data Type ត្រូវគ្នានៅក្នុងតារាងទាំងពីរ ដោយមិនបាច់សរសេរបញ្ជាក់លក្ខខណ្ឌ ON ឬ USING ឡើយ។",
    keywords: ["NATURAL JOIN", "Automatic Join", "Same Name", "Matching Data Type", "No ON", "No USING"],
    codeExample: "SELECT department_id, department_name, location_id, city\nFROM departments\nNATURAL JOIN locations;"
  },
  {
    id: 7,
    chapter: "Lesson 6: Joins",
    category: "joins",
    question: "តើអ្វីជា Self-Join?",
    answer: "Self-Join គឺជាការភ្ជាប់តារាងមួយទៅនឹងខ្លួនឯងផ្ទាល់ (Join a table to itself) ដើម្បីប្រៀបធៀប ឬស្វែងរកទំនាក់ទំនងរវាងទិន្នន័យក្នុងតារាងដដែល។ ជាទូទៅត្រូវប្រើ Table Aliases ផ្សេងគ្នា (ឧទាហរណ៍៖ employees e សម្រាប់បុគ្គលិក និង employees m សម្រាប់អ្នកគ្រប់គ្រង)។",
    keywords: ["Self-Join", "Table Aliases", "Join to itself", "employees e", "employees m", "Hierarchy"],
    codeExample: "SELECT \n  e.last_name || ' reports to ' || m.last_name AS \"Manager Relationship\"\nFROM employees e\nJOIN employees m ON (e.manager_id = m.employee_id);"
  },
  {
    id: 8,
    chapter: "Lesson 6: Joins",
    category: "joins",
    question: "តើអ្វីទៅជា Non-equijoin?",
    answer: "Non-equijoin គឺជាការ Join ដែលលក្ខខណ្ឌភ្ជាប់មិនប្រើប្រាស់សញ្ញាស្មើ (=) ឡើយ ប៉ុន្តែប្រើប្រាស់ Comparison Operators ផ្សេងទៀតដូចជា <, >, <=, >=, ឬ BETWEEN ... AND ... (ឧទាហរណ៍៖ ផ្គូផ្គងប្រាក់ខែទៅកាន់ Job Grade)។",
    keywords: ["Non-equijoin", "Comparison Operators", "BETWEEN ... AND ...", "Salary Grade", "No Equals Sign"],
    codeExample: "SELECT e.last_name, e.salary, j.grade_level\nFROM employees e\nJOIN job_grades j\n  ON (e.salary BETWEEN j.lowest_sal AND j.highest_sal);"
  },
  {
    id: 9,
    chapter: "Lesson 6: Joins",
    category: "joins",
    question: "ចូរនិយាយអំពី Outer Join",
    answer: "Outer Join ប្រើសម្រាប់ទាញយកទាំងជួរទិន្នន័យដែលផ្គូផ្គងត្រូវគ្នា (Matched rows) និងជួរដែលមិនត្រូវគ្នា (Unmatched rows) ដោយបំពេញតម្លៃដែលខ្វះដោយ NULL។ មាន ៣ ប្រភេទ៖\n- LEFT OUTER JOIN: បង្ហាញគ្រប់ជួរពីតារាងខាងឆ្វេង\n- RIGHT OUTER JOIN: បង្ហាញគ្រប់ជួរពីតារាងខាងស្ដាំ\n- FULL OUTER JOIN: បង្ហាញគ្រប់ជួរពីតារាងទាំងសងខាង",
    keywords: ["Outer Join", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "FULL OUTER JOIN", "Matched rows", "Unmatched rows", "NULL values"],
    codeExample: "SELECT e.last_name, d.department_name\nFROM employees e\nLEFT OUTER JOIN departments d\n  ON (e.department_id = d.department_id);"
  },
  {
    id: 10,
    chapter: "Lesson 6: Joins",
    category: "joins",
    question: "ចូរនិយាយអំពី Cross Join",
    answer: "CROSS JOIN គឺជាការផ្គូផ្គងរាល់គ្រប់ជួរនៃតារាងទីមួយ ទៅនឹងរាល់គ្រប់ជួរនៃតារាងទីពីរ ដែលផ្ដល់ផលជា Cartesian Product (ប្រសិនបើតារាងទីមួយមាន m ជួរ និងតារាងទីពីរមាន n ជួរ នោះលទ្ធផលសរុបនឹងមាន m * n ជួរ)។",
    keywords: ["CROSS JOIN", "Cartesian Product", "m * n", "Multiplication"],
    codeExample: "-- If employees has 20 rows and departments has 8 rows -> 160 rows\nSELECT last_name, department_name\nFROM employees\nCROSS JOIN departments;"
  },
  {
    id: 11,
    chapter: "Lesson 10: Subqueries",
    category: "subqueries",
    question: "តើអ្វីទៅជា Subquery? តើពេលណាត្រូវប្រើ Subquery?",
    answer: "• និយមន័យ៖ Subquery (ឬ Inner Query) គឺជា SELECT statement មួយដែលត្រូវបានសរសេរបង្កប់នៅខាងក្នុង SQL statement មួយទៀត។\n• ពេលណាត្រូវប្រើ៖ ប្រើនៅពេលដែល query ចម្បងត្រូវការតម្លៃទិន្នន័យដែលមិនទាន់ដឹងច្បាស់ជាមុន ដើម្បីយកតម្លៃនោះមកធ្វើជាលក្ខខណ្ឌក្នុងការស្វែងរក ឬកែប្រែទិន្នន័យបន្ត។",
    keywords: ["Subquery", "Inner Query", "Main Query", "SELECT statement", "Dynamic values"],
    codeExample: "SELECT last_name, salary\nFROM employees\nWHERE salary > (\n  SELECT salary\n  FROM employees\n  WHERE last_name = 'Abel'\n);"
  },
  {
    id: 12,
    chapter: "Lesson 10: Subqueries",
    category: "subqueries",
    question: "តើអ្វីទៅជា Single-row Subquery?",
    answer: "Single-row Subquery គឺជា subquery ដែលដំណើរការរួចផ្ដល់លទ្ធផលត្រឡប់មកវិញត្រឹមតែ ១ ជួរ (One Row) ប៉ុណ្ណោះ។",
    keywords: ["Single-row Subquery", "One Row", "Single Value", "Scalar result"],
    codeExample: "SELECT employee_id, last_name, job_id, salary\nFROM employees\nWHERE salary = (\n  SELECT MIN(salary)\n  FROM employees\n);"
  },
  {
    id: 13,
    chapter: "Lesson 10: Subqueries",
    category: "subqueries",
    question: "តើអ្វីទៅជា Multiple-row Subquery?",
    answer: "Multiple-row Subquery គឺជា subquery ដែលដំណើរការរួចផ្ដល់លទ្ធផលត្រឡប់មកវិញចំនួន ច្រើនជួរ (More than one row)។",
    keywords: ["Multiple-row Subquery", "More than one row", "List of values"],
    codeExample: "SELECT employee_id, last_name, salary, department_id\nFROM employees\nWHERE salary IN (\n  SELECT MIN(salary)\n  FROM employees\n  GROUP BY department_id\n);"
  },
  {
    id: 14,
    chapter: "Lesson 10: Subqueries",
    category: "subqueries",
    question: "ចូរប្រាប់អំពី Operators ជំនួយរបស់ Single-row Subqueries និង Multiple-row Subqueries",
    answer: "• Single-row Operators: =, >, >=, <, <=, <>\n• Multiple-row Operators:\n  - IN: ស្មើនឹងតម្លៃណាមួយនៅក្នុងបញ្ជីលទ្ធផល\n  - ANY: ប្រៀបធៀបជាមួយតម្លៃនីមួយៗ (ឧ. < ANY គឺតូចជាងតម្លៃអតិបរមា)\n  - ALL: ប្រៀបធៀបជាមួយគ្រប់តម្លៃទាំងអស់ (ឧ. > ALL គឺធំជាងតម្លៃអតិបរមាទាំងអស់)",
    keywords: ["Single-row Operators", "Multiple-row Operators", "IN", "ANY", "ALL", "=", ">", "<"],
    codeExample: "-- Multiple-row comparison with ANY\nSELECT last_name, salary\nFROM employees\nWHERE salary < ANY (\n  SELECT salary\n  FROM employees\n  WHERE job_id = 'IT_PROG'\n);"
  },
  {
    id: 15,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "តើអ្វីទៅជា Set Operator?",
    answer: "Set Operator គឺជាពាក្យបញ្ជាដែលប្រើសម្រាប់បញ្ចូល ឬច្របាច់លទ្ធផលដែលបានមកពី SELECT queries ពីរ ឬច្រើន ឱ្យក្លាយទៅជាសំណុំលទ្ធផលតែមួយ (Single Result Set)។",
    keywords: ["Set Operator", "Combine Results", "Single Result Set", "UNION", "INTERSECT", "MINUS"],
    codeExample: "SELECT employee_id, job_id FROM employees\nUNION\nSELECT employee_id, job_id FROM job_history;"
  },
  {
    id: 16,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "ចូរនិយាយអំពី Rule ឬ Guideline ក្នុងការប្រើ Set Operator",
    answer: "1. ចំនួន Columns ក្នុង queries នីមួយៗត្រូវតែមានចំនួនស្មើគ្នា\n2. ប្រភេទ Data Type នៃ Columns ត្រូវតែ Compatible តាមលំដាប់លំដោយ\n3. ឈ្មោះ Column នៃលទ្ធផលចុងក្រោយ គឺកំណត់យកតាមឈ្មោះ Column នៃ query ទីមួយ\n4. ORDER BY clause អាចប្រើប្រាស់បានតែនៅចុងបញ្ចប់នៃ query ចុងក្រោយបង្អស់ប៉ុណ្ណោះ",
    keywords: ["Rules", "Guidelines", "Same Columns Count", "Compatible Types", "Column Name from First Query", "ORDER BY at end"],
    codeExample: "SELECT employee_id, hire_date FROM employees\nUNION\nSELECT employee_id, start_date FROM job_history\nORDER BY hire_date;"
  },
  {
    id: 17,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "ចូរនិយាយអំពីតួនាទីនៃ Set Operators: Union, Intersect, Minus",
    answer: "• UNION: បញ្ចូលលទ្ធផលពី queries ទាំងពីរចូលគ្នា ដោយលុបទិន្នន័យស្ទួន (Duplicates) ចោល និង Sort ទិន្នន័យស្វ័យប្រវត្តិ (បើចង់រក្សាទុកស្ទួនត្រូវប្រើ UNION ALL)\n• INTERSECT: ចម្រាញ់យកតែជួរទិន្នន័យណាដែលមានវត្តមានដូចគ្នាក្នុង queries ទាំងសងខាង\n• MINUS: ជ្រើសរើសយកតែជួរទិន្នន័យដែលមាននៅក្នុង query ទីមួយ ប៉ុន្តែគ្មាននៅក្នុង query ទីពីរ",
    keywords: ["UNION", "UNION ALL", "INTERSECT", "MINUS", "Duplicates removal", "Common rows", "Difference"],
    codeExample: "-- UNION: Combines and removes duplicates\n-- UNION ALL: Combines without removing duplicates\n-- INTERSECT: Common rows to both queries\n-- MINUS: Rows in query 1 not in query 2"
  },
  {
    id: 18,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "ចូរនិយាយ DML Statement",
    answer: "DML (Data Manipulation Language) គឺជាបណ្តុំពាក្យបញ្ជាដែលប្រើសម្រាប់គ្រប់គ្រង និងកែប្រែទិន្នន័យដែលមានស្រាប់នៅក្នុងតារាង។ រួមមាន៖ INSERT, UPDATE, DELETE, និង MERGE។",
    keywords: ["DML", "Data Manipulation Language", "INSERT", "UPDATE", "DELETE", "MERGE"],
    codeExample: "INSERT INTO departments (department_id, department_name) VALUES (280, 'DevOps');\nUPDATE employees SET salary = salary * 1.15 WHERE department_id = 280;\nDELETE FROM employees WHERE employee_id = 999;"
  },
  {
    id: 19,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "ចូរប្រៀបធៀបអំពី TRUNCATE Statement និង DELETE Statement",
    answer: "• DELETE Statement: ជាភាសា DML, អាច ROLLBACK យកទិន្នន័យមកវិញបាន, ដំណើរការយឺតជាងដោយសារកត់ត្រា Log តាម Row-by-row, អាចប្រើ WHERE clause បាន។\n• TRUNCATE Statement: ជាភាសា DDL, មិនអាច ROLLBACK បានទេ (Auto-commit), ដំណើរការលឿនខ្លាំងដោយសារកាត់ផ្តាច់ Storage Pages តែម្ដង, មិនអាចប្រើ WHERE clause បានទេ (លុបគ្រប់ជួរទាំងអស់)។",
    keywords: ["TRUNCATE", "DELETE", "DML vs DDL", "ROLLBACK", "Auto-commit", "WHERE clause", "Storage Pages"],
    codeExample: "-- DML (Safe, logged, supports ROLLBACK)\nDELETE FROM employees WHERE department_id = 90;\nROLLBACK;\n\n-- DDL (Permanent, auto-commit, faster)\nTRUNCATE TABLE staging_logs;"
  },
  {
    id: 20,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "ចូរនិយាយអំពី DCL Statement",
    answer: "DCL (Data Control Language) គឺជាបណ្តុំពាក្យបញ្ជាសម្រាប់គ្រប់គ្រងសិទ្ធិ (Privileges) និងសុវត្ថិភាពក្នុងការចូលប្រើប្រាស់ Database Objects រួមមាន៖\n- GRANT: ផ្ដល់សិទ្ធិឱ្យទៅ User ឬ Role\n- REVOKE: ដកសិទ្ធិត្រឡប់មកវិញពី User ឬ Role",
    keywords: ["DCL", "Data Control Language", "GRANT", "REVOKE", "Privileges", "User permissions", "Roles"],
    codeExample: "GRANT SELECT, INSERT ON employees TO student_role;\nREVOKE INSERT ON employees FROM student_role;"
  },
  {
    id: 21,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "ចូរនិយាយអំពី Oracle Naming Conventions",
    answer: "តាមគោលការណ៍ស្ដង់ដាររបស់ Oracle SQL ឈ្មោះ Object (Tables, Columns, Views) ត្រូវតែ៖\n1. ចាប់ផ្ដើមដំបូងដោយតួអក្សរ (A-Z)\n2. មានប្រវែងពី ១ ដល់ ៣០ តួអក្សរ\n3. អាចប្រើប្រាស់បានតែតួអក្សរ A-Z, a-z, លេខ 0-9, និងសញ្ញាពិសេស _, $, #\n4. មិនត្រូវស្ទួនឈ្មោះជាមួយ Object ផ្សេងទៀតក្នុង Schema ដដែលឡើយ\n5. មិនត្រូវយក Oracle Reserved Words (ដូចជា SELECT, CREATE) មកដាក់ឈ្មោះឡើយ",
    keywords: ["Naming Conventions", "Oracle Standards", "1 to 30 characters", "Reserved Words", "Schema", "Special characters"],
    codeExample: "-- Valid:\n--   dept_summary_v1, tbl_emp$bonus, #cache_01\n-- Invalid:\n--   1st_department (starts with number)\n--   SELECT (reserved word)\n--   name_that_is_exceeding_the_thirty_char_limit"
  },
  {
    id: 22,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "ចូរនិយាយអំពី DDL Statement",
    answer: "DDL (Data Definition Language) គឺជាបណ្តុំពាក្យបញ្ជាដែលប្រើសម្រាប់បង្កើត កែប្រែ ឬលុបរចនាសម្ព័ន្ធ (Structure/Schema) របស់ Database Objects។ រាល់ពាក្យបញ្ជា DDL មានលក្ខណៈ Auto-commit (Implicit Commit) ដោយស្វ័យប្រវត្តិ។ រួមមាន៖ CREATE, ALTER, DROP, TRUNCATE, និង RENAME។",
    keywords: ["DDL", "Data Definition Language", "CREATE", "ALTER", "DROP", "TRUNCATE", "RENAME", "Auto-commit", "Structure/Schema"],
    codeExample: "CREATE TABLE course_review (\n  review_id NUMBER(6) PRIMARY KEY,\n  subject VARCHAR2(50) NOT NULL\n);\nALTER TABLE course_review ADD (score NUMBER(3));\nDROP TABLE course_review;"
  }
];

export const CHAPTER_LIST = [
  'All',
  'Lesson 5: Group Functions',
  'Lesson 6: Joins',
  'Lesson 10: Subqueries',
  'Set Operators, DML, DDL & Naming Conventions'
] as const;

export const CHAPTER_COLORS: Record<string, { badge: string; text: string; bgLight: string; border: string; accent: string }> = {
  'Lesson 5: Group Functions': {
    badge: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    text: 'text-indigo-700',
    bgLight: 'bg-indigo-50/50',
    border: 'border-indigo-400',
    accent: '#4338CA'
  },
  'Lesson 6: Joins': {
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    text: 'text-emerald-700',
    bgLight: 'bg-emerald-50/50',
    border: 'border-emerald-400',
    accent: '#059669'
  },
  'Lesson 10: Subqueries': {
    badge: 'bg-violet-50 text-violet-800 border-violet-200/80',
    text: 'text-violet-700',
    bgLight: 'bg-violet-50/50',
    border: 'border-violet-400',
    accent: '#7C3AED'
  },
  'Set Operators, DML, DDL & Naming Conventions': {
    badge: 'bg-orange-50 text-[#C2410C] border-orange-200/80',
    text: 'text-[#C2410C]',
    bgLight: 'bg-orange-50/50',
    border: 'border-orange-400',
    accent: '#EA580C'
  }
};
