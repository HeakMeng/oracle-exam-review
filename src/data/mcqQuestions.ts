import { MCQQuestion } from '../types/exam';

export const mcqQuestions: MCQQuestion[] = [
  {
    id: 1,
    chapter: "Lesson 5: Group Functions",
    question: "តើអ្វីទៅជា Group Function? ចូរប្រាប់ពីឈ្មោះនៃ Group Function និងប្រាប់ពីតួនាទីរបស់វា។",
    codeSnippet: "SELECT COUNT(*), AVG(salary), MAX(salary) FROM employees;",
    options: [
      "អនុគមន៍ដែលទទួលយកទិន្នន័យច្រើនជួរ (Multiple Rows) មកគណនា និងផ្ដល់លទ្ធផលត្រឡប់មកវិញជាតម្លៃមួយជួរគត់",
      "អនុគមន៍ដែលដំណើរការលើជួរមួយៗ និងផ្ដល់លទ្ធផលមួយសម្រាប់គ្រប់ Row ទាំងអស់",
      "អនុគមន៍សម្រាប់ប្ដូរប្រភេទ Data Type ពី VARCHAR2 ទៅជា NUMBER",
      "អនុគមន៍សម្រាប់តម្រៀបទិន្នន័យ (Sorting) តាមលំដាប់លំដោយពីតូចទៅធំ"
    ],
    correctIndex: 0,
    standardAnswer: "Group Function (Aggregate Function) គឺជាអនុគមន៍ដែលទទួលយកទិន្នន័យពីច្រើនជួរ (Multiple Rows) មកគណនា និងផ្ដល់លទ្ធផលត្រឡប់មកវិញជាតម្លៃមួយជួរគត់។\n• COUNT(): រាប់ចំនួន Rows ឬតម្លៃដែលមិនមែនជា NULL\n• SUM(): គណនាផលបូកសរុប\n• AVG(): គណនាតម្លៃមធ្យម\n• MIN(): តម្លៃតូចបំផុត\n• MAX(): តម្លៃធំបំផុត"
  },
  {
    id: 2,
    chapter: "Lesson 5: Group Functions",
    question: "តើ GROUP BY Clause ប្រើសម្រាប់ធ្វើអ្វី?",
    codeSnippet: "SELECT department_id, AVG(salary) FROM employees GROUP BY department_id;",
    options: [
      "ប្រើសម្រាប់ Filter ជួរទិន្នន័យនីមួយៗមុនពេល Select",
      "ប្រើសម្រាប់បែងចែក Rows ជាក្រុមៗ ដើម្បីអនុវត្ត Group Function លើក្រុមនីមួយៗ",
      "ប្រើសម្រាប់តម្រៀបជួរទិន្នន័យពីធំទៅតូច",
      "ប្រើសម្រាប់ Join តារាងពីរដែលមាន Column ដូចគ្នា"
    ],
    correctIndex: 1,
    standardAnswer: "GROUP BY Clause ប្រើសម្រាប់បែងចែក Rows ជាក្រុមៗ (Groups) ដោយផ្អែកលើតម្លៃក្នុង Column មួយ ឬច្រើន ដើម្បីអនុវត្ត Group Function លើក្រុមនីមួយៗ。"
  },
  {
    id: 3,
    chapter: "Lesson 5: Group Functions",
    question: "ចូរប្រាប់ពីតួនាទីរបស់ HAVING Clause?",
    codeSnippet: "SELECT department_id, AVG(salary) FROM employees GROUP BY department_id HAVING AVG(salary) > 5000;",
    options: [
      "Filter ទិន្នន័យលើជួរនីមួយៗមុនពេលបង្កើតក្រុម",
      "ជំនួសឱ្យពាក្យបញ្ជា WHERE ក្នុងគ្រប់កាលៈទេសៈ",
      "Filter លើ Groups បន្ទាប់ពីការបែងចែកតាម GROUP BY ហើយអាចប្រើជាមួយ Group Function បាន",
      "ប្រើសម្រាប់បង្កើត Table ថ្មីនៅក្នុង Schema"
    ],
    correctIndex: 2,
    standardAnswer: "HAVING Clause ប្រើសម្រាប់ Filter លើ Groups បន្ទាប់ពីការបែងចែកតាម GROUP BY រួច ហើយត្រូវបានបង្កើតឡើងដើម្បីប្រើជាមួយ Group Functions (ឧ. HAVING AVG(salary) > 5000)。"
  },
  {
    id: 4,
    chapter: "Lesson 5: Group Functions",
    question: "ចូរប្រៀបធៀបរវាង HAVING Clause និង WHERE Clause",
    codeSnippet: null,
    options: [
      "WHERE ប្រើលើ Groups ចំណែក HAVING ប្រើលើ Individual Rows",
      "WHERE Filter លើ Individual Rows មុនពេល GROUP BY, រីឯ HAVING Filter លើ Groups ក្រោយ GROUP BY និងអាចប្រើជាមួយ Group Functions បាន",
      "WHERE មិនអាចប្រើក្នុង SELECT Statement បានទេ",
      "HAVING ដំណើរការលឿនជាង WHERE ជានិច្ចព្រោះមិនបាច់ឆែកលក្ខខណ្ឌ"
    ],
    correctIndex: 1,
    standardAnswer: "• WHERE Clause: Filter លើ Individual Rows មុនពេល GROUP BY និងមិនអាចប្រើជាមួយ Group Functions ដូចជា SUM(), AVG() បានឡើយ。\n• HAVING Clause: Filter លើ Groups ក្រោយពេល GROUP BY និងអាចប្រើជាមួយ Group Functions បាន。"
  },
  {
    id: 5,
    chapter: "Lesson 5: Group Functions",
    question: "នៅក្នុង Oracle SQL តើ Group Functions អាចធ្វើ Nesting បានប៉ុន្មានកម្រិត (Levels)?",
    codeSnippet: "SELECT MAX(AVG(salary)) FROM employees GROUP BY department_id;",
    options: [
      "បានតែ ១ កម្រិតប៉ុណ្ណោះ",
      "បានអតិបរមា ២ កម្រិត (2 levels deep) ហើយត្រូវមាន GROUP BY Clause",
      "បានរហូតដល់ ៥ កម្រិតដោយសេរី",
      "មិនអាចធ្វើ Nesting បានដាច់ខាត"
    ],
    correctIndex: 1,
    standardAnswer: "នៅក្នុង Oracle SQL អាចធ្វើ Nesting Group Functions (ឧទាហរណ៍៖ MAX(AVG(salary))) បានអតិបរមាត្រឹមតែ 2 Levels ប៉ុណ្ណោះ ហើយចាំបាច់ត្រូវតែមាន GROUP BY Clause。"
  },
  {
    id: 6,
    chapter: "Lesson 6: Joins",
    question: "តើ Natural Join ដំណើរការដោយរបៀបណា?",
    codeSnippet: "SELECT * FROM employees NATURAL JOIN departments;",
    options: [
      "Join តារាងទាំងពីរដោយស្វ័យប្រវត្តិតាមរយៈ Columns ដែលមានឈ្មោះដូចគ្នា និង Data Type ត្រូវគ្នា ដោយមិនបាច់សរសេរ ON ឬ USING",
      "តម្រូវឱ្យសរសេរបញ្ជាក់ Primary Key និង Foreign Key ជានិច្ចតាមរយៈ ON clause",
      "បង្កើត Cartesian Product ដោយផ្គូផ្គងគ្រប់ Rows ទាំងអស់",
      "Join តែតារាងណាដែលមានចំនួន Column ស្មើគ្នាទាំងស្រុង"
    ],
    correctIndex: 0,
    standardAnswer: "NATURAL JOIN គឺជាការ Join តារាងពីរដោយស្វ័យប្រវត្តិ ដោយ Oracle ជ្រើសរើស Columns ដែលមានឈ្មោះដូចគ្នា និង Data Type ត្រូវគ្នាពីតារាងទាំងពីរ ដោយមិនបាច់សរសេរ ON ឬ USING ឡើយ。"
  },
  {
    id: 7,
    chapter: "Lesson 6: Joins",
    question: "តើអ្វីជា Self-Join?",
    codeSnippet: "SELECT e.last_name, m.last_name FROM employees e JOIN employees m ON (e.manager_id = m.employee_id);",
    options: [
      "ការ Join តារាងមួយទៅកាន់ User Profile របស់ Database",
      "ការភ្ជាប់តារាងមួយទៅនឹងខ្លួនឯងផ្ទាល់ (Join a table to itself) ដោយប្រើ Table Aliases ខុសគ្នា",
      "ការច្របាច់ទិន្នន័យពី Database ពីរផ្សេងគ្នា",
      "ការលុបជួរស្ទួនចេញពីតារាងដោយស្វ័យប្រវត្តិ"
    ],
    correctIndex: 1,
    standardAnswer: "Self-Join គឺជាការ Join តារាងមួយទៅនឹងខ្លួនឯងផ្ទាល់ ដើម្បីប្រៀបធៀប ឬភ្ជាប់ទិន្នន័យក្នុងតារាងដដែល ដោយប្រើ Table Aliases ផ្សេងគ្នា (ឧទាហរណ៍៖ employees e សម្រាប់បុគ្គលិក និង employees m សម្រាប់ Manager)。"
  },
  {
    id: 8,
    chapter: "Lesson 6: Joins",
    question: "តើអ្វីជាលក្ខណៈពិសេសរបស់ Non-equijoin?",
    codeSnippet: "SELECT e.last_name, e.salary, j.grade_level FROM employees e JOIN job_grades j ON e.salary BETWEEN j.lowest_sal AND j.highest_sal;",
    options: [
      "ប្រើតែសញ្ញាស្មើ (=) ប៉ុណ្ណោះក្នុងការភ្ជាប់",
      "លក្ខខណ្ឌ Join មិនប្រើសញ្ញាស្មើ (=) ទេ ប៉ុន្តែប្រើសញ្ញាដូចជា <, >, <=, >=, ឬ BETWEEN ... AND ...",
      "Join បានតែលើ Table ដែលគ្មាន Index",
      "ជាការ Join ដោយមិនប្រើប្រាស់ Column ណាមួយទាំងអស់"
    ],
    correctIndex: 1,
    standardAnswer: "Non-equijoin គឺជា Join condition ដែលមិនប្រើសញ្ញាស្មើ (=) ក្នុងការភ្ជាប់តារាង ប៉ុន្តែប្រើ Comparison Operators ផ្សេងទៀតដូចជា <, >, <=, >=, ឬ BETWEEN ... AND ... (ឧ. ផ្គូផ្គងប្រាក់ខែទៅ Job Grade)。"
  },
  {
    id: 9,
    chapter: "Lesson 6: Joins",
    question: "តើ Outer Join ប្រភេទណាដែលបង្ហាញគ្រប់ Rows ទាំងអស់ពីតារាងខាងឆ្វេង ទោះបីជាគ្មានទិន្នន័យត្រូវគ្នានៅតារាងខាងស្ដាំក៏ដោយ?",
    codeSnippet: "SELECT e.last_name, d.department_name FROM employees e LEFT OUTER JOIN departments d ON (e.department_id = d.department_id);",
    options: [
      "RIGHT OUTER JOIN",
      "LEFT OUTER JOIN",
      "FULL OUTER JOIN",
      "CROSS JOIN"
    ],
    correctIndex: 1,
    standardAnswer: "LEFT OUTER JOIN ប្រើសម្រាប់បង្ហាញគ្រប់ Rows ទាំងអស់ពីតារាងខាងឆ្វេង បើទោះជាគ្មានទិន្នន័យត្រូវគ្នានៅតារាងខាងស្ដាំក៏ដោយ ដោយបំពេញតម្លៃដែលខ្វះដោយ NULL。"
  },
  {
    id: 10,
    chapter: "Lesson 6: Joins",
    question: "ប្រសិនបើតារាង A មាន 5 rows ហើយតារាង B មាន 10 rows តើ Cross Join នឹងផ្ដល់លទ្ធផលប៉ុន្មាន rows?",
    codeSnippet: "SELECT * FROM table_a CROSS JOIN table_b;",
    options: [
      "15 rows",
      "5 rows",
      "50 rows (Cartesian Product: 5 × 10)",
      "10 rows"
    ],
    correctIndex: 2,
    standardAnswer: "CROSS JOIN បង្កើត Cartesian Product ដោយផ្គូផ្គងគ្រប់ Row ពីតារាងទីមួយ ជាមួយគ្រប់ Row ពីតារាងទីពីរ ដែលផ្ដល់ផលជា m × n = 5 × 10 = 50 Rows。"
  },
  {
    id: 11,
    chapter: "Lesson 10: Subqueries",
    question: "តើអ្វីទៅជា Subquery? តើពេលណាត្រូវប្រើ Subquery?",
    codeSnippet: "SELECT last_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
    options: [
      "ជា Query ដែលមានល្បឿនលឿនជាងគេក្នុង Database",
      "ជា SELECT Statement មួយដែលត្រូវបានសរសេរបង្កប់នៅខាងក្នុង SQL Statement មួយផ្សេងទៀត",
      "ជា Database Trigger សម្រាប់ចាប់កំហុស",
      "ជាពាក្យបញ្ជាសម្រាប់បម្រុងទុកទិន្នន័យ (Backup)"
    ],
    correctIndex: 1,
    standardAnswer: "Subquery (Inner Query) គឺជា SELECT Statement ដែលបង្កប់ក្នុង SQL Statement មួយទៀត។ ប្រើនៅពេលដែល Query ចម្បងត្រូវការតម្លៃលទ្ធផលដែលមិនទាន់ស្គាល់ជាមុន ដើម្បីយកមកធ្វើជាលក្ខខណ្ឌចម្រាញ់ទិន្នន័យ。"
  },
  {
    id: 12,
    chapter: "Lesson 10: Subqueries",
    question: "តើអ្វីទៅជា Single-row Subquery?",
    codeSnippet: null,
    options: [
      "ត្រឹមតែ 1 Row ប៉ុណ្ណោះ",
      "យ៉ាងហោចណាស់ 2 Rows",
      "ចំនួន Rows គ្មានដែនកំណត់",
      "មិនផ្ដល់ទិន្នន័យត្រឡប់មកវិញឡើយ"
    ],
    correctIndex: 0,
    standardAnswer: "Single-row Subquery គឺជា Subquery ដែលដំណើរការរួចផ្ដល់លទ្ធផលត្រឡប់មកវិញត្រឹមតែ 1 Row ប៉ុណ្ណោះ ហើយប្រើជាមួយ single-row operators (=, >, <, <=, >=, <>)。"
  },
  {
    id: 13,
    chapter: "Lesson 10: Subqueries",
    question: "តើ Operator ណាខ្លះត្រូវបានប្រើសម្រាប់ Multiple-row Subqueries?",
    codeSnippet: "SELECT last_name FROM employees WHERE department_id IN (SELECT department_id FROM departments WHERE location_id = 1700);",
    options: [
      "=, >, <, <=",
      "IN, ANY, ALL",
      "LIKE, BETWEEN, IS NULL",
      "AND, OR, NOT"
    ],
    correctIndex: 1,
    standardAnswer: "Operators សម្រាប់ Multiple-row Subqueries រួមមាន៖ IN (ស្មើនឹងតម្លៃណាមួយក្នុង list), ANY (ប្រៀបធៀបជាមួយធាតុនីមួយៗ), និង ALL (ប្រៀបធៀបជាមួយគ្រប់ធាតុទាំងអស់)。"
  },
  {
    id: 14,
    chapter: "Lesson 10: Subqueries",
    question: "នៅក្នុង Multiple-row Subquery តើ '< ANY' មានន័យដូចម្ដេច?",
    codeSnippet: null,
    options: [
      "ធំជាងតម្លៃតូចបំផុត",
      "តូចជាងតម្លៃអតិបរមា (Less than the maximum)",
      "ស្មើនឹងតម្លៃទាំងអស់",
      "តូចជាងតម្លៃអប្បបរមា"
    ],
    correctIndex: 1,
    standardAnswer: "< ANY មានន័យថាតូចជាងតម្លៃអតិបរមា (Less than the maximum) នៃសំណុំតម្លៃដែល Subquery ផ្ដល់ឱ្យ。"
  },
  {
    id: 15,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    question: "តើអ្វីទៅជា Set Operator ក្នុង Oracle SQL?",
    codeSnippet: null,
    options: [
      "ពាក្យបញ្ជាបង្កើត Schema Object",
      "Operator សម្រាប់រួមបញ្ចូលលទ្ធផលពី SELECT Queries ពីរ ឬច្រើន ឱ្យទៅជា Single Result Set តែមួយ",
      "Function សម្រាប់គណនាផលបូកជួរដេក",
      "Clause សម្រាប់ប្ដូរឈ្មោះ Column"
    ],
    correctIndex: 1,
    standardAnswer: "Set Operator គឺជាពាក្យបញ្ជាដែលប្រើសម្រាប់រួមបញ្ចូល ឬច្របាច់លទ្ធផលពី SELECT Queries ពីរ ឬច្រើនឱ្យទៅជាលទ្ធផលតែមួយ (Single Result Set)。"
  },
  {
    id: 16,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    question: "ចូរនិយាយអំពី Rule ឬ Guideline ក្នុងការប្រើ Set Operator",
    codeSnippet: null,
    options: [
      "Queries ត្រូវតែទាញចេញពី Table តែមួយប៉ុណ្ណោះ",
      "Queries ត្រូវមានចំនួន Columns ស្មើគ្នា និងមាន Data Types ត្រូវគ្នា (compatible) តាមលំដាប់លំដោយ",
      "តម្រូវឱ្យមាន Clause WHERE ដូចគ្នាទាំងស្រុង",
      "អាចប្រើ ORDER BY នៅគ្រប់ query ទាំងអស់"
    ],
    correctIndex: 1,
    standardAnswer: "1. Queries ត្រូវមានចំនួន Columns ស្មើគ្នា\n2. Data Types របស់ Columns ត្រូវតែ Compatible តាមលំដាប់ពីឆ្វេងទៅស្ដាំ\n3. ឈ្មោះ Column ចុងក្រោយកំណត់យកតាម Query ទីមួយ\n4. ORDER BY Clause អាចដាក់បានតែនៅចុងបញ្ចប់នៃ Query ចុងក្រោយប៉ុណ្ណោះ"
  },
  {
    id: 17,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    question: "ចូរនិយាយអំពីតួនាទីរបស់ Set Operators: UNION, INTERSECT, MINUS",
    codeSnippet: null,
    options: [
      "UNION ALL",
      "UNION: បញ្ចូលលទ្ធផលលុប duplicates, INTERSECT: យកជួរដែលមានទាំងសងខាង, MINUS: យកជួរដែលមានក្នុង query ទីមួយតែគ្មានក្នុង query ទីពីរ",
      "MINUS",
      "CROSS JOIN"
    ],
    correctIndex: 1,
    standardAnswer: "• UNION: បញ្ចូលលទ្ធផលពី queries ទាំងពីរចូលគ្នា ដោយលុប Duplicate Rows ចោល និង sort ស្វ័យប្រវត្តិ (រក្សា duplicate ប្រើ UNION ALL)\n• INTERSECT: យកតែជួរណាដែលមានវត្តមានទាំងសងខាង\n• MINUS: យកតែជួរណាដែលមានក្នុង query ទីមួយ ប៉ុន្តែគ្មានក្នុង query ទីពីរ"
  },
  {
    id: 18,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    question: "តើពាក្យបញ្ជាណាខ្លះជា DML (Data Manipulation Language)?",
    codeSnippet: null,
    options: [
      "CREATE, ALTER, DROP",
      "INSERT, UPDATE, DELETE, MERGE",
      "GRANT, REVOKE",
      "COMMIT, ROLLBACK"
    ],
    correctIndex: 1,
    standardAnswer: "DML (Data Manipulation Language) គឺជាពាក្យបញ្ជាសម្រាប់គ្រប់គ្រង និងកែប្រែទិន្នន័យក្នុង Table រួមមាន៖ INSERT, UPDATE, DELETE, និង MERGE。"
  },
  {
    id: 19,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    question: "ចូរប្រៀបធៀប TRUNCATE Statement និង DELETE Statement",
    codeSnippet: null,
    options: [
      "DELETE មិនអាច ROLLBACK បានទេ រីឯ TRUNCATE អាច ROLLBACK បាន",
      "TRUNCATE ជា DDL មិនអាច ROLLBACK បាន និងលុបទិន្នន័យទាំងអស់យ៉ាងលឿន ចំណែក DELETE ជា DML អាច ROLLBACK បាន និងអាចប្រើ WHERE clause",
      "DELETE ដំណើរការលឿនជាង TRUNCATE ព្រោះមិនកត់ចូល Log",
      "TRUNCATE អាចប្រើ WHERE clause ដើម្បីជ្រើសរើសជួរលុបបាន"
    ],
    correctIndex: 1,
    standardAnswer: "• DELETE Statement: ជា DML, អាច ROLLBACK បាន, ល្បឿនយឺតជាង (កត់ត្រា Log តាមជួរ), អាចប្រើ WHERE clause បាន。\n• TRUNCATE Statement: ជា DDL, មិនអាច ROLLBACK បាន (Auto-commit), ល្បឿនលឿនខ្លាំង, មិនអាចប្រើ WHERE clause បានទេ (លុបទិន្នន័យទាំងអស់ក្នុង table)。"
  },
  {
    id: 20,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    question: "តើពាក្យបញ្ជា DCL (Data Control Language) ប្រើសម្រាប់អ្វី?",
    codeSnippet: null,
    options: [
      "សម្រាប់គ្រប់គ្រង Privileges និងសិទ្ធិចូលប្រើប្រាស់ Database Objects (GRANT និង REVOKE)",
      "សម្រាប់បង្កើត និងលុប Database Tables",
      "សម្រាប់កែប្រែទិន្នន័យលេខក្នុង Column",
      "សម្រាប់ Commit និង Rollback Transactions"
    ],
    correctIndex: 0,
    standardAnswer: "DCL ប្រើសម្រាប់គ្រប់គ្រងសិទ្ធិ (Privileges) និងសុវត្ថិភាពលើ Database Objects រួមមាន៖ GRANT (ផ្ដល់សិទ្ធិ) និង REVOKE (ដកសិទ្ធិត្រឡប់មកវិញ)。"
  },
  {
    id: 21,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    question: "តាម Oracle Naming Conventions តើប្រវែងអតិបរមាស្ដង់ដារនៃឈ្មោះ Object ក្នុងមេរៀនមានប៉ុន្មានតួអក្សរ?",
    codeSnippet: null,
    options: [
      "១ ដល់ ៨ តួអក្សរ",
      "១ ដល់ ៣០ តួអក្សរ (Characters)",
      "រហូតដល់ ២៥៥ តួអក្សរ",
      "គ្មានកំណត់ប្រវែងឡើយ"
    ],
    correctIndex: 1,
    standardAnswer: "តាមគោលការណ៍ Naming Convention របស់ Oracle SQL៖ ត្រូវចាប់ផ្ដើមដោយតួអក្សរ (A-Z), ប្រវែងពី ១ ដល់ ៣០ តួអក្សរ, អាចប្រើតែ A-Z, a-z, 0-9, _, $, #, មិនត្រូវស្ទួនឈ្មោះ object ផ្សេងទៀត, និងមិនត្រូវប្រើ Oracle Reserved Words。"
  },
  {
    id: 22,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    question: "តើអ្វីជាលក្ខណៈពិសេសចម្បងនៃ DDL Statements (ដូចជា CREATE, ALTER, DROP)?",
    codeSnippet: null,
    options: [
      "អាចប្រើ ROLLBACK ដើម្បីត្រឡប់ថយក្រោយបានគ្រប់ពេល",
      "មាន Implicit Commit (Auto-commit) ដោយស្វ័យប្រវត្តិ មិនអាច Rollback បានទេ",
      "ដំណើរការតែនៅពេលមានការអនុញ្ញាតពី User ផ្សេងទៀតប៉ុណ្ណោះ",
      "មិនអាចផ្លាស់ប្តូរ Structure របស់ Table បានទេ"
    ],
    correctIndex: 1,
    standardAnswer: "រាល់ DDL Statements (CREATE, ALTER, DROP, TRUNCATE, RENAME) ទាំងអស់សុទ្ធតែមានលក្ខណៈ Implicit Commit (Auto-commit) ដោយស្វ័យប្រវត្តិ មិនអាចប្រើ ROLLBACK បានឡើយ。"
  }
];
