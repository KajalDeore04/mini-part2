const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", //model version
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json", //parsed in json
  };
  
  
    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [ //takes reference from this for next output
        {
          role: "user",
          parts: [
            {text: "Generate a Course tutorial on following detail with field as course name, description, along with the chapter name, about, duration: Category:'Programming',Topic:Python,Level:Basic, Duration:1 hour, NoOfChapters:5, in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseName\": \"Introduction to Python Programming\",\n  \"description\": \"A beginner-friendly course designed to introduce you to the fundamentals of Python programming. Learn about data types, control flow, functions, and basic problem-solving techniques. No prior programming experience required!\",\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"noOfChapters\": 5,\n  \"chapters\": [\n    {\n      \"chapterName\": \"Chapter 1: Getting Started with Python\",\n      \"about\": \"This chapter covers the basics of Python installation, setup, and running your first Python program. You'll learn about the Python interpreter and how to use a simple code editor.\",\n      \"duration\": \"10 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 2: Data Types and Variables\",\n      \"about\": \"Learn about fundamental data types in Python, including integers, floats, strings, and booleans.  Understand how to declare variables and assign values to them.  Also covers basic input/output using the `input()` and `print()` functions.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 3: Operators and Control Flow\",\n      \"about\": \"Explore different types of operators in Python (arithmetic, comparison, logical). Learn about conditional statements (`if`, `elif`, `else`) and looping structures (`for`, `while`) to control the flow of your program.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 4: Functions\",\n      \"about\": \"Understand the concept of functions in Python. Learn how to define and call functions with and without arguments.  Covers return values and basic function scope.\",\n      \"duration\": \"10 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 5: Basic Data Structures: Lists\",\n      \"about\": \"Introduction to Python lists, a fundamental data structure for storing collections of items.  Learn how to create lists, access elements, modify lists, and perform basic list operations.\",\n      \"duration\": \"10 minutes\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });


    export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in detail on Topic: Advanced SQL , Chapter: Joins, in JSON format with list of array with field as title , explanation on given chapter in detail, code example(code field in <precode> format if applicable"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"title\": \"Introduction to Advanced SQL Joins\",\n    \"explanation\": \"Advanced SQL joins extend the basic join operations (INNER, LEFT, RIGHT, FULL) to provide more sophisticated ways to combine data from multiple tables. They involve techniques like self joins, complex join conditions, and the use of subqueries within join clauses to achieve specific data retrieval goals.  These techniques are essential for handling complex relational database structures and addressing intricate querying requirements.\"\n  },\n  {\n    \"title\": \"Self Joins\",\n    \"explanation\": \"A self join is used to join a table to itself. This is useful when you need to compare rows within the same table.  A common use case is finding employees who report to the same manager or identifying pairs of customers who reside in the same city.\",\n    \"code_example\": {\n      \"description\": \"Example: Finding employees who report to the same manager.\",\n      \"code\": \"<pre>\\nSELECT\\n    e1.employee_id AS Employee1_ID,\\n    e1.employee_name AS Employee1_Name,\\n    e2.employee_id AS Employee2_ID,\\n    e2.employee_name AS Employee2_Name,\\n    e1.manager_id AS Manager_ID\\nFROM\\n    employees e1\\nJOIN\\n    employees e2 ON e1.manager_id = e2.manager_id AND e1.employee_id <> e2.employee_id;\\n</pre>\"\n    },\n    \"details\": [\n      \"Requires aliasing the table to distinguish between the two instances.\",\n      \"Often involves comparing fields within the same table.\"\n    ]\n  },\n  {\n    \"title\": \"Complex Join Conditions\",\n    \"explanation\": \"Beyond simple equality comparisons (`ON table1.col1 = table2.col2`), complex join conditions can involve multiple conditions, range comparisons, or even function calls. These are used when the relationship between tables isn't based on a direct matching column.\",\n    \"code_example\": {\n      \"description\": \"Example: Joining orders with customers based on order date within a specific timeframe of customer signup date.\",\n      \"code\": \"<pre>\\nSELECT\\n    o.order_id,\\n    c.customer_id,\\n    o.order_date,\\n    c.signup_date\\nFROM\\n    orders o\\nJOIN\\n    customers c ON o.customer_id = c.customer_id\\nWHERE\\n    o.order_date BETWEEN c.signup_date AND DATE_ADD(c.signup_date, INTERVAL 30 DAY);\\n</pre>\"\n    },\n    \"details\": [\n      \"Utilizes `WHERE` clause combined with `ON` clause to add further restrictions.\",\n      \"Can employ functions like `DATE_ADD`, `UPPER`, `LOWER` within the join condition.\"\n    ]\n  },\n  {\n    \"title\": \"Joins with Subqueries\",\n    \"explanation\": \"Subqueries can be used within the `FROM` or `ON` clauses of a join. This allows you to join against the result of another query, enabling you to combine aggregated data, filtered data, or data derived from complex logic with other tables.\",\n    \"code_example\": {\n      \"description\": \"Example: Joining customers with a subquery that returns their total order amount.\",\n      \"code\": \"<pre>\\nSELECT\\n    c.customer_id,\\n    c.customer_name,\\n    order_summary.total_order_amount\\nFROM\\n    customers c\\nJOIN\\n    (SELECT\\n        customer_id,\\n        SUM(order_amount) AS total_order_amount\\n    FROM\\n        orders\\n    GROUP BY\\n        customer_id) AS order_summary ON c.customer_id = order_summary.customer_id;\\n</pre>\"\n    },\n    \"details\": [\n      \"The subquery needs an alias (e.g., `order_summary`).\",\n      \"Subqueries in `FROM` clause are treated as temporary tables.\",\n      \"Can be used to filter or aggregate data before joining.\"\n    ]\n  },\n  {\n    \"title\": \"Lateral Joins (or APPLY operator in some databases)\",\n    \"explanation\": \"Lateral joins (available in some database systems like PostgreSQL, SQL Server via APPLY) allow you to refer to columns from the left-hand table within the subquery on the right-hand side. This enables you to create joins where the right-hand side depends on the values of the left-hand side for each row. This makes possible complex correlation between tables during the join process.  This isn't standard SQL; it is database-specific.\",\n    \"code_example\": {\n      \"description\": \"Example: Finding the latest 3 orders for each customer.\",\n      \"code\": \"<pre>\\n-- PostgreSQL example\\nSELECT\\n    c.customer_id,\\n    c.customer_name,\\n    o.order_id,\\n    o.order_date\\nFROM\\n    customers c\\nCROSS JOIN LATERAL (\\n    SELECT\\n        order_id,\\n        order_date\\n    FROM\\n        orders\\n    WHERE\\n        customer_id = c.customer_id\\n    ORDER BY\\n        order_date DESC\\n    LIMIT 3\\n) AS o;\\n</pre>\"\n    },\n    \"details\": [\n      \"Requires a database system that supports lateral joins (or APPLY).\",\n      \"The subquery on the right-hand side is evaluated *for each* row of the left-hand side.\",\n      \"Very powerful for row-by-row calculations and data manipulation within the join.\"\n    ]\n  },\n  {\n    \"title\": \"Common Table Expressions (CTEs) and Joins\",\n    \"explanation\": \"CTEs (Common Table Expressions) are named temporary result sets that exist only within the scope of a single query.  They greatly improve readability and maintainability, especially when dealing with complex joins and subqueries. You define a CTE using the `WITH` clause and can then reference it multiple times within your main query, including in join operations.\",\n    \"code_example\": {\n      \"description\": \"Example: Using CTEs to simplify a join involving aggregate data.\",\n      \"code\": \"<pre>\\nWITH CustomerOrderSummary AS (\\n    SELECT\\n        customer_id,\\n        COUNT(*) AS total_orders,\\n        SUM(order_amount) AS total_spent\\n    FROM\\n        orders\\n    GROUP BY\\n        customer_id\\n),\\nHighSpendingCustomers AS (\\n    SELECT\\n        customer_id\\n    FROM\\n        CustomerOrderSummary\\n    WHERE\\n        total_spent > 1000\\n)\\nSELECT\\n    c.customer_id,\\n    c.customer_name,\\n    cos.total_orders,\\n    cos.total_spent\\nFROM\\n    customers c\\nJOIN\\n    CustomerOrderSummary cos ON c.customer_id = cos.customer_id\\nJOIN\\n    HighSpendingCustomers hsc ON c.customer_id = hsc.customer_id;\\n</pre>\"\n    },\n    \"details\": [\n      \"Improves readability by breaking down complex logic into smaller, named blocks.\",\n      \"Can be chained together to create multiple levels of abstraction.\",\n      \"CTEs are not stored permanently; they only exist during query execution.\"\n    ]\n  },\n    {\n        \"title\": \"Optimization Considerations for Joins\",\n        \"explanation\": \"Efficient join operations are crucial for query performance.  Poorly optimized joins can lead to significantly slower query execution.  Key optimization strategies include: Using appropriate indexes on join columns, understanding the query execution plan, and avoiding unnecessary joins. For large tables, consider partitioning to reduce the amount of data that needs to be scanned during the join.\",\n        \"details\":[\n          \"Ensure join columns are indexed. Indexing drastically improves the speed of finding matching rows.\",\n          \"Use `EXPLAIN` or similar tools to analyze the query execution plan and identify potential bottlenecks.\",\n          \"Join the smallest tables first. This reduces the size of intermediate result sets.\"\n        ]\n    }\n]\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
 