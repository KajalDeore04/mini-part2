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
  
  
    export const GenerateCourseLayout = model.startChat({
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
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
 