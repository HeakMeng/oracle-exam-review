import { MCQQuestion } from '../types/exam';

export const mcqQuestions: MCQQuestion[] = [
  {
    id: 1,
    chapter: "Lesson 5: Group Functions",
    category: "group_functions",
    question: "តើអ្វីទៅជានិយមន័យត្រឹមត្រូវរបស់ Group Function (ឬ Aggregate Function)?",
    options: [
      "Function ដែលទទួលយកទិន្នន័យពីច្រើនជួរ (Multiple Rows) មកគណនា និងផ្ដល់លទ្ធផលត្រឡប់មកវិញត្រឹមតែតម្លៃមួយជួរគត់ (Single Result)",
      "Function ដែលដំណើរការលើមួយជួរម្ដងៗ និងផ្ដល់លទ្ធផលមួយជួរសម្រាប់គ្រប់ Row ទាំងអស់",
      "Function សម្រាប់ផ្លាស់ប្ដូរប្រភេទ Data Type ពី VARCHAR2 ទៅជា NUMBER",
      "Function សម្រាប់តម្រៀបទិន្នន័យ (Sorting) តាមលំដាប់លំដោយពីតូចទៅធំ"
    ],
    correctIndex: 0,
    explanation: "Group Function (Aggregate Function) ទទួល Multiple Rows មកធ្វើការបូកសរុប ឬគណនា (ដូចជា COUNT, SUM, AVG, MIN, MAX) ហើយផ្ដល់តម្លៃត្រឡប់មកវិញត្រឹមតែតម្លៃ Single Result ប៉ុណ្ណោះសម្រាប់ក្រុមទិន្នន័យនីមួយៗ។",
    codeSnippet: "SELECT COUNT(*), AVG(salary), MAX(salary) FROM employees;"
  },
  {
    id: 2,
    chapter: "Lesson 5: Group Functions",
    category: "group_functions",
    question: "តើ GROUP BY Clause ត្រូវបានប្រើប្រាស់សម្រាប់គោលបំណងអ្វីនៅក្នុង SQL?",
    options: [
      "សម្រាប់លុបជួរទិន្នន័យស្ទួន (Duplicates) ចេញពីលទ្ធផល query",
      "សម្រាប់បែងចែកជួរទិន្នន័យ (Rows) ទៅជាក្រុមតូចៗ (Groups) ផ្អែកលើតម្លៃ Column ដើម្បីឱ្យ Group Function គណនាតាមក្រុមនីមួយៗ",
      "សម្រាប់កំណត់លក្ខខណ្ឌ Filter លើទិន្នន័យមុនពេលគណនាផលបូក",
      "សម្រាប់តម្រៀបទិន្នន័យតាមអក្ខរក្រមពី A ដល់ Z តែប៉ុណ្ណោះ"
    ],
    correctIndex: 1,
    explanation: "GROUP BY clause ប្រើសម្រាប់ចែកទិន្នន័យជាក្រុមៗតាម Column ជាក់លាក់ ដើម្បីឱ្យ Aggregate Functions (ដូចជា AVG, SUM, COUNT) អាចគណនាតម្លៃដាច់ដោយឡែកពីគ្នាសម្រាប់ក្រុមនីមួយៗ។",
    codeSnippet: "SELECT department_id, AVG(salary) FROM employees GROUP BY department_id;"
  },
  {
    id: 3,
    chapter: "Lesson 5: Group Functions",
    category: "group_functions",
    question: "តើ HAVING Clause មានតួនាទីខុសពី WHERE Clause ដូចម្ដេច?",
    options: [
      "HAVING ប្រើសម្រាប់ Filter ជួរទិន្នន័យនីមួយៗ (Individual rows) មុនពេល GROUP BY",
      "HAVING ប្រើសម្រាប់ Filter លើក្រុមទិន្នន័យ (Aggregated Groups) ក្រោយពេល GROUP BY និងអាចប្រើជាមួយ Group Functions បាន",
      "HAVING អាចប្រើប្រាស់បានតែជាមួយ Single-row Subqueries ប៉ុណ្ណោះ",
      "HAVING មិនអនុញ្ញាតឱ្យប្រើប្រាស់ Group Functions ដូចជា SUM() ឬ AVG() ឡើយ"
    ],
    correctIndex: 1,
    explanation: "HAVING clause ត្រូវបានបង្កើតឡើងជាពិសេសដើម្បី Filter លើលទ្ធផល Aggregate Groups (ក្រោយពេល GROUP BY រួច) ហើយអាចប្រើជាមួយ Group Functions ដូចជា HAVING AVG(salary) > 5000 បាន ខណៈ WHERE មិនអាចប្រើជាមួយ Group Functions បានឡើយ។",
    codeSnippet: "SELECT department_id, AVG(salary)\nFROM employees\nGROUP BY department_id\nHAVING AVG(salary) > 5000;"
  },
  {
    id: 4,
    chapter: "Lesson 5: Group Functions",
    category: "group_functions",
    question: "នៅក្នុង SQL Statement មួយដែលមានទាំង WHERE និង HAVING clause តើ clause មួយណាដំណើរការមុន?",
    options: [
      "HAVING ដំណើរការមុន រួចទើប WHERE ដំណើរការជាក្រោយ",
      "WHERE ដំណើរការមុនដើម្បី Filter individual rows មុនពេលទិន្នន័យត្រូវចែកក្រុមដោយ GROUP BY",
      "ទាំងពីរដំណើរការដំណាលគ្នាក្នុងពេលតែមួយ",
      "លំដាប់លំដោយគឺអាស្រ័យលើ clause ណាដែលសរសេរនៅខាងមុខគេ"
    ],
    correctIndex: 1,
    explanation: "លំដាប់ដំណើរការ៖ WHERE clause នឹង Filter ជួរទិន្នន័យនីមួយៗមុនគេ បន្ទាប់មកទើប GROUP BY បែងចែកជាក្រុម ហើយចុងក្រោយ HAVING ទើប Filter លើក្រុម Aggregate ទាំងនោះ។"
  },
  {
    id: 5,
    chapter: "Lesson 5: Group Functions",
    category: "group_functions",
    question: "នៅក្នុង Oracle SQL តើ Nesting Group Functions អាចដាក់បង្កប់បានអតិបរមាចំនួនប៉ុន្មានកម្រិត (Levels)?",
    options: [
      "១ កម្រិតប៉ុណ្ណោះ",
      "២ កម្រិត (2 levels deep) និងត្រូវតែមានវត្តមានរបស់ GROUP BY clause",
      "៣ កម្រិត (3 levels deep)",
      "គ្មានដែនកំណត់កម្រិតឡើយ"
    ],
    correctIndex: 1,
    explanation: "Oracle SQL អនុញ្ញាតឱ្យ Nest Group Functions (ឧ. MAX(AVG(salary))) បានអតិបរមាត្រឹមតែ ២ កម្រិត (2 levels deep) ប៉ុណ្ណោះ ហើយចាំបាច់ត្រូវតែមាន GROUP BY clause អមជាមួយ។",
    codeSnippet: "SELECT MAX(AVG(salary)) FROM employees GROUP BY department_id;"
  },
  {
    id: 6,
    chapter: "Lesson 6: Joins",
    category: "joins",
    question: "តើ NATURAL JOIN ដំណើរការផ្គូផ្គងតារាងដោយផ្អែកលើលក្ខខណ្ឌអ្វី?",
    options: [
      "ផ្អែកលើ Column ណាដែលមានឈ្មោះដូចគ្នា និងមាន Data Type ត្រូវគ្នាក្នុងតារាងទាំងពីរដោយស្វ័យប្រវត្តិ",
      "ផ្អែកលើ Primary Key និង Foreign Key តែមួយគត់",
      "ផ្អែកលើលក្ខខណ្ឌដែលកំណត់ក្នុង ON clause ជានិច្ច",
      "ផ្អែកលើ Column ទីមួយនៃតារាងទាំងសងខាងដោយមិនខ្វល់ពីឈ្មោះ"
    ],
    correctIndex: 0,
    explanation: "NATURAL JOIN ផ្គូផ្គង Columns ដែលមានឈ្មោះដូចគ្នា (Same Name) និង Data Type Compatible នៅក្នុងតារាងទាំងពីរដោយស្វ័យប្រវត្តិ ដោយអ្នកសរសេរមិនបាច់បញ្ជាក់ ON ឬ USING ឡើយ។",
    codeSnippet: "SELECT department_name, city FROM departments NATURAL JOIN locations;"
  },
  {
    id: 7,
    chapter: "Lesson 6: Joins",
    category: "joins",
    question: "តើអ្វីជាលក្ខណៈសម្គាល់ចម្បងនៃ Self-Join?",
    options: [
      "ជាការភ្ជាប់តារាងពីរផ្សេងគ្នាដែលមាន Structure ដូចគ្នាទាំងស្រុង",
      "ជាការភ្ជាប់តារាងមួយទៅកាន់ខ្លួនឯងផ្ទាល់ (Join a table to itself) ដោយប្រើ Table Aliases ផ្សេងគ្នា",
      "ជាការ Join ដោយមិនប្រើប្រាស់ Comparison Operators",
      "ជាការផ្គូផ្គងរាល់ជួរទាំងអស់ដើម្បីបង្កើត Cartesian Product"
    ],
    correctIndex: 1,
    explanation: "Self-Join គឺជាការភ្ជាប់តារាងមួយទៅកាន់ខ្លួនឯងផ្ទាល់ (ឧទាហរណ៍៖ employees e ភ្ជាប់ជាមួយ employees m) ដើម្បីស្វែងរកទំនាក់ទំនងរវាងបុគ្គលិក និងអ្នកគ្រប់គ្រង (Manager) ក្នុងតារាងតែមួយ។",
    codeSnippet: "SELECT e.last_name, m.last_name FROM employees e JOIN employees m ON (e.manager_id = m.employee_id);"
  },
  {
    id: 8,
    chapter: "Lesson 6: Joins",
    category: "joins",
    question: "តើអ្វីទៅជា Non-equijoin នៅក្នុង Oracle SQL?",
    options: [
      "ការ Join ដែលលក្ខខណ្ឌភ្ជាប់ប្រើប្រាស់សញ្ញាស្មើ (=)",
      "ការ Join ដែលលក្ខខណ្ឌភ្ជាប់មិនប្រើប្រាស់សញ្ញាស្មើ (=) ឡើយ ប៉ុន្តែប្រើ Comparison Operators ដូចជា <, >, <=, >=, ឬ BETWEEN",
      "ការ Join ដែលតារាងទាំងពីរគ្មាន Column ឈ្មោះដូចគ្នា",
      "ការ Join ដែលផ្ដល់ផលត្រឡប់មកវិញត្រឹមតែ NULL values"
    ],
    correctIndex: 1,
    explanation: "Non-equijoin គឺជាការ Join ដែលលក្ខខណ្ឌមិនប្រើប្រាស់សញ្ញា (=) ប៉ុន្តែប្រើ comparison operators ផ្សេងទៀត ដូចជាការផ្គូផ្គងប្រាក់ខែ salary BETWEEN lowest_sal AND highest_sal នៃតារាង job_grades។"
  },
  {
    id: 9,
    chapter: "Lesson 6: Joins",
    category: "joins",
    question: "ប្រសិនបើយើងចង់បង្ហាញរាល់បុគ្គលិកទាំងអស់ ទោះបីជាបុគ្គលិកនោះមិនទាន់មាន Department ក៏ដោយ តើយើងគួរប្រើ Join ប្រភេទណា?",
    options: [
      "INNER JOIN",
      "LEFT OUTER JOIN (ដោយយក Employees ជាតារាងខាងឆ្វេង)",
      "CROSS JOIN",
      "NATURAL JOIN"
    ],
    correctIndex: 1,
    explanation: "LEFT OUTER JOIN នឹងទាញយកគ្រប់ជួរទាំងអស់ពីតារាងខាងឆ្វេង (Employees) ទោះបីជាគ្មានជួរផ្គូផ្គងត្រូវគ្នាក្នុងតារាងខាងស្ដាំ (Departments) ក៏ដោយ ដោយបំពេញតម្លៃដែលខ្វះដោយ NULL។"
  },
  {
    id: 10,
    chapter: "Lesson 6: Joins",
    category: "joins",
    question: "ប្រសិនបើតារាង A មាន ២០ ជួរ ហើយតារាង B មាន ៥ ជួរ តើលទ្ធផលនៃ CROSS JOIN រវាងតារាងទាំងពីរមានចំនួនប៉ុន្មានជួរ?",
    options: [
      "២៥ ជួរ",
      "១០០ ជួរ (Cartesian Product: 20 * 5)",
      "២០ ជួរ",
      "៤ ជួរ"
    ],
    correctIndex: 1,
    explanation: "CROSS JOIN បង្កើត Cartesian Product ដែលរាល់គ្រប់ជួរនៃតារាងទីមួយផ្គូផ្គងនឹងរាល់គ្រប់ជួរនៃតារាងទីពីរ ដូច្នេះផលសរុបគឺ m * n = 20 * 5 = 100 ជួរ។"
  },
  {
    id: 11,
    chapter: "Lesson 10: Subqueries",
    category: "subqueries",
    question: "តើអ្វីទៅជា Subquery (ឬ Inner Query)?",
    options: [
      "ជា SELECT statement មួយដែលត្រូវបានសរសេរបង្កប់នៅខាងក្នុង SQL statement មួយទៀត",
      "ជា Query ដែលដំណើរការតែនៅពេលមានកំហុស Error កើតឡើងប៉ុណ្ណោះ",
      "ជា Procedure សម្រាប់លុបទិន្នន័យចេញពី Database",
      "ជា View ពិសេសដែលមិនអាចកែប្រែទិន្នន័យបាន"
    ],
    correctIndex: 0,
    explanation: "Subquery គឺជា query ដែលសរសេរបង្កប់ខាងក្នុង statement មួយទៀត ដើម្បីទាញយកតម្លៃដែលមិនទាន់ដឹងជាមុន មកធ្វើជាលក្ខខណ្ឌសម្រាប់ Outer Query បន្ត។"
  },
  {
    id: 12,
    chapter: "Lesson 10: Subqueries",
    category: "subqueries",
    question: "តើ Single-row Subquery ផ្ដល់លទ្ធផលត្រឡប់មកវិញយ៉ាងដូចម្ដេច?",
    options: [
      "ផ្ដល់លទ្ធផលត្រឹមតែ ១ ជួរ (One Row / Single Value) ប៉ុណ្ណោះ",
      "ផ្ដល់លទ្ធផលច្រើនជួរ (Multiple Rows)",
      "ផ្ដល់លទ្ធផលជា Table ទាំងមូលជានិច្ច",
      "មិនផ្ដល់លទ្ធផលអ្វីទាំងអស់"
    ],
    correctIndex: 0,
    explanation: "Single-row subquery គឺជា subquery ដែល execute រួចផ្ដល់លទ្ធផលត្រឡប់មកវិញត្រឹមតែ ១ ជួរ (One Row) គត់ ហើយប្រើប្រាស់ single-row operators ដូចជា =, >, <, >=, <=, <>។"
  },
  {
    id: 13,
    chapter: "Lesson 10: Subqueries",
    category: "subqueries",
    question: "តើ Multiple-row Subqueries ត្រូវប្រើប្រាស់ Operators ជំនួយណាខ្លះ?",
    options: [
      "IN, ANY, ALL",
      "=, >, <, <=",
      "LIKE, BETWEEN, IS NULL",
      "AND, OR, NOT"
    ],
    correctIndex: 0,
    explanation: "Multiple-row subqueries ផ្ដល់លទ្ធផលច្រើនជួរ ដូច្នេះត្រូវប្រើ Multiple-row comparison operators ដូចជា IN (ស្មើនឹងតម្លៃណាមួយក្នុងបញ្ជី), ANY (ប្រៀបធៀបជាមួយតម្លៃនីមួយៗ), ឬ ALL (ប្រៀបធៀបជាមួយគ្រប់តម្លៃទាំងអស់)។"
  },
  {
    id: 14,
    chapter: "Lesson 10: Subqueries",
    category: "subqueries",
    question: "នៅក្នុងលក្ខខណ្ឌ `WHERE salary < ANY (SELECT salary FROM employees WHERE department_id = 60)` តើ `< ANY` មានន័យស្មើនឹងអ្វី?",
    options: [
      "តូចជាងតម្លៃអតិបរមា (Less than the maximum value)",
      "តូចជាងតម្លៃអប្បបរមា (Less than the minimum value)",
      "ធំជាងតម្លៃមធ្យម",
      "ស្មើនឹងគ្រប់តម្លៃទាំងអស់"
    ],
    correctIndex: 0,
    explanation: "`< ANY` មានន័យថាតូចជាងតម្លៃណាមួយក្នុងចំណោមលទ្ធផល ដែលមានន័យជាក់ស្ដែងគឺ 'តូចជាងតម្លៃអតិបរមា (Less than the maximum)' នៃបញ្ជីនោះ។"
  },
  {
    id: 15,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "តើ Set Operator មួយណាដែលច្របាច់បញ្ចូលលទ្ធផល queries ពីរ ដោយលុបទិន្នន័យស្ទួន (Duplicates) ចេញ និង Sort ទិន្នន័យស្វ័យប្រវត្តិ?",
    options: [
      "UNION",
      "UNION ALL",
      "INTERSECT",
      "MINUS"
    ],
    correctIndex: 0,
    explanation: "UNION បញ្ចូលលទ្ធផល queries ពីរចូលគ្នា ដោយលុបទិន្នន័យស្ទួនចោល និង Sort ទិន្នន័យស្វ័យប្រវត្តិ។ ប្រសិនបើចង់រក្សាទុកស្ទួន និងមិន Sort ត្រូវប្រើ UNION ALL។"
  },
  {
    id: 16,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "តើមួយណាជា Rule ឬ Guideline ត្រឹមត្រូវក្នុងការប្រើប្រាស់ Set Operators?",
    options: [
      "ORDER BY clause អាចប្រើប្រាស់បានតែនៅចុងបញ្ចប់នៃ query ចុងក្រោយបង្អស់ប៉ុណ្ណោះ",
      "ចំនួន Columns ក្នុង queries នីមួយៗមិនចាំបាច់ស្មើគ្នាទេ",
      "ឈ្មោះ Column នៃលទ្ធផលចុងក្រោយកំណត់យកតាម query ចុងក្រោយគេ",
      "Data Type នៃ Columns អាចខុសគ្នាទាំងស្រុងបាន"
    ],
    correctIndex: 0,
    explanation: "វិធាន Set Operators៖ ចំនួន Columns ត្រូវស្មើគ្នា, Data Types ត្រូវ Compatible, ឈ្មោះ Column យកតាម query ទីមួយ ហើយ ORDER BY អាចដាក់បានតែនៅចុងបញ្ចប់នៃ query ចុងក្រោយបង្អស់ប៉ុណ្ណោះ។"
  },
  {
    id: 17,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "តើ MINUS operator ផ្ដល់លទ្ធផលយ៉ាងដូចម្ដេច?",
    options: [
      "ជ្រើសរើសយកតែជួរទិន្នន័យដែលមាននៅក្នុង query ទីមួយ ប៉ុន្តែគ្មាននៅក្នុង query ទីពីរ",
      "ជ្រើសរើសយកជួរទិន្នន័យដែលមានវត្តមានដូចគ្នាក្នុង queries ទាំងសងខាង",
      "ច្របាច់បញ្ចូលគ្រប់ជួរទាំងអស់ដោយមិនលុបទិន្នន័យស្ទួន",
      "គណនាផលដកនៃតម្លៃលេខក្នុង Columns"
    ],
    correctIndex: 0,
    explanation: "MINUS operator ត្រឡប់មកវិញនូវជួរទិន្នន័យណាដែលមានវត្តមាននៅក្នុង Query ទីមួយ ប៉ុន្តែមិនមាននៅក្នុង Query ទីពីរឡើយ (Query 1 MINUS Query 2)។"
  },
  {
    id: 18,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "តើពាក្យបញ្ជាខាងក្រោមនេះ មួយណាស្ថិតក្នុងក្រុម DML (Data Manipulation Language)?",
    options: [
      "INSERT, UPDATE, DELETE, MERGE",
      "CREATE, ALTER, DROP, TRUNCATE",
      "GRANT, REVOKE",
      "COMMIT, ROLLBACK, SAVEPOINT"
    ],
    correctIndex: 0,
    explanation: "DML (Data Manipulation Language) ប្រើសម្រាប់គ្រប់គ្រង និងកែប្រែទិន្នន័យក្នុងតារាង រួមមាន INSERT, UPDATE, DELETE, និង MERGE។"
  },
  {
    id: 19,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "តើ TRUNCATE និង DELETE ខុសគ្នាជាចម្បងយ៉ាងដូចម្ដេច?",
    options: [
      "DELETE ជា DML អាច ROLLBACK បាន និងអាចប្រើ WHERE បាន; រីឯ TRUNCATE ជា DDL មិនអាច ROLLBACK បានទេ (Auto-commit) និងលុបគ្រប់ជួរទាំងអស់ដោយគ្មាន WHERE",
      "TRUNCATE អាច ROLLBACK បាន ចំណែក DELETE មិនអាច ROLLBACK បានទេ",
      "DELETE ដំណើរការលឿនជាង TRUNCATE ព្រោះមិនកត់ Log",
      "TRUNCATE អាចប្រើប្រាស់ជាមួយ WHERE clause បាន"
    ],
    correctIndex: 0,
    explanation: "DELETE គឺជាភាសា DML (Row-by-row, អាច ROLLBACK, ប្រើ WHERE បាន)។ ចំណែក TRUNCATE គឺជាភាសា DDL (Auto-commit, កាត់ផ្តាច់ Storage Pages ភ្លាមៗ មិនអាច ROLLBACK, គ្មាន WHERE)។"
  },
  {
    id: 20,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "តើ DCL (Data Control Language) រួមមានពាក្យបញ្ជាអ្វីខ្លះ?",
    options: [
      "GRANT (ផ្ដល់សិទ្ធិ) និង REVOKE (ដកសិទ្ធិ)",
      "COMMIT និង ROLLBACK",
      "CREATE និង DROP",
      "SELECT និង INSERT"
    ],
    correctIndex: 0,
    explanation: "DCL (Data Control Language) ប្រើសម្រាប់គ្រប់គ្រងសិទ្ធិ (Privileges) និងសុវត្ថិភាពចូលប្រើ Database Objects រួមមាន GRANT និង REVOKE។"
  },
  {
    id: 21,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "យោងតាមស្ដង់ដារ Oracle Naming Conventions តើឈ្មោះ Object មួយណាដែលចាត់ទុកថាត្រឹមត្រូវ (Valid)?",
    options: [
      "emp_dept_30",
      "1st_department (ផ្ដើមដោយលេខ)",
      "SELECT (យក Reserved Word មកដាក់)",
      "department_salary_summary_report_for_all_employees (លើសពី 30 តួអក្សរ)"
    ],
    correctIndex: 0,
    explanation: "តាមស្តង់ដារ Oracle SQL ឈ្មោះ Object ត្រូវចាប់ផ្ដើមដោយតួអក្សរ (A-Z), មានប្រវែងពី ១ ដល់ ៣០ តួអក្សរ, មិនស្ទួនជាមួយ Reserved Words, និងអាចប្រើលេខ 0-9 ព្រមទាំងសញ្ញា _, $, # បាន។ ដូច្នេះ `emp_dept_30` គឺត្រឹមត្រូវ។"
  },
  {
    id: 22,
    chapter: "Set Operators, DML, DDL & Naming Conventions",
    category: "set_dml_ddl",
    question: "តើពាក្យបញ្ជា DDL (Data Definition Language) មានលក្ខណៈពិសេសចម្បងអ្វីខ្លះ?",
    options: [
      "ប្រើសម្រាប់បង្កើត កែប្រែ ឬលុបរចនាសម្ព័ន្ធ (Structure/Schema) និងមានលក្ខណៈ Auto-commit (Implicit Commit) ដោយស្វ័យប្រវត្តិ",
      "ប្រើសម្រាប់ទាញយកទិន្នន័យមកបង្ហាញតែប៉ុណ្ណោះ",
      "រាល់ពេល execute រួច តម្រូវឱ្យសរសេរ COMMIT ដោយផ្ទាល់ទើបទិន្នន័យរក្សាទុក",
      "អាចធ្វើការ ROLLBACK ត្រឡប់ក្រោយវិញបានយ៉ាងងាយស្រួល"
    ],
    correctIndex: 0,
    explanation: "DDL statements (CREATE, ALTER, DROP, TRUNCATE, RENAME) ប្រើសម្រាប់គ្រប់គ្រងរចនាសម្ព័ន្ធ Table/Schema ហើយមានលក្ខណៈ Implicit Commit (Auto-commit) ដោយស្វ័យប្រវត្តិ មិនអាច ROLLBACK បានឡើយ។"
  }
];
