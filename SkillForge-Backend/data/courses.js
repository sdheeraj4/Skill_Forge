module.exports = [
  {
    "id": "html-css-fundamentals",
    "title": "HTML & CSS Fundamentals",
    "category": "Web Development",
    "level": "Beginner",
    "duration": "4h 0m",
    "description": "Learn how web pages are structured with HTML and styled with modern CSS.",
    "skills": [
      "HTML",
      "CSS",
      "Web Design"
    ],
    "interests": [
      "Web Development",
      "Frontend"
    ],
    "nextCourseIds": [
      "bootstrap-responsive-ui",
      "javascript-foundations"
    ],
    "modules": [
      {
        "id": "html-structure",
        "title": "HTML Structure",
        "duration": "45 min",
        "summary": "Build semantic pages with common HTML elements.",
        "notes": [
          "HTML gives a web page its structure using elements such as headings, paragraphs, links, images and forms.",
          "Semantic elements such as header, nav, main, section and footer improve readability and accessibility.",
          "Attributes provide extra information such as href for links, src for images and type for form controls."
        ],
        "video": {
          "title": "HTML Full Course for Beginners",
          "url": "https://www.youtube.com/results?search_query=freeCodeCamp+HTML+full+course+beginners"
        }
      },
      {
        "id": "css-styling",
        "title": "CSS Styling",
        "duration": "55 min",
        "summary": "Use selectors, the box model and reusable style rules.",
        "notes": [
          "CSS selectors choose which HTML elements a rule will style.",
          "The box model contains content, padding, border and margin.",
          "Classes are reusable and are usually preferred over styling many elements with unique IDs."
        ],
        "video": {
          "title": "CSS Full Course for Beginners",
          "url": "https://www.youtube.com/results?search_query=freeCodeCamp+CSS+full+course+beginners"
        }
      },
      {
        "id": "layout-responsive",
        "title": "Layouts & Responsive Design",
        "duration": "60 min",
        "summary": "Create flexible layouts using Flexbox, Grid and media queries.",
        "notes": [
          "Flexbox is useful for one-dimensional row or column layouts.",
          "CSS Grid is useful for two-dimensional page layouts.",
          "Media queries adapt layouts to different screen widths and are a core part of responsive design."
        ],
        "video": {
          "title": "Responsive Web Design Tutorial",
          "url": "https://www.youtube.com/results?search_query=responsive+web+design+flexbox+grid+media+queries+tutorial"
        }
      },
      {
        "id": "html-css-fundamentals-m4",
        "title": "Accessible Forms",
        "duration": "40 min",
        "summary": "Practice accessible forms through a worked example and a short verification exercise.",
        "notes": [
          "Labels connect visible instructions to form controls using matching for and id values.",
          "Choose input types such as email and number to provide appropriate keyboards and native validation.",
          "Group related choices with fieldset and legend; show errors beside the relevant field, not only through color."
        ],
        "video": {
          "title": "Accessible Forms tutorial",
          "url": "https://www.youtube.com/results?search_query=HTML%20%26%20CSS%20Fundamentals%20Accessible%20Forms%20tutorial"
        }
      },
      {
        "id": "html-css-fundamentals-m5",
        "title": "CSS Debugging and Reuse",
        "duration": "40 min",
        "summary": "Practice css debugging and reuse through a worked example and a short verification exercise.",
        "notes": [
          "Use browser developer tools to inspect the computed styles and identify the rule that wins the cascade.",
          "Create reusable classes for repeated components and custom properties for shared colors and spacing.",
          "Test long text, keyboard focus and narrow viewports before considering a layout finished."
        ],
        "video": {
          "title": "CSS Debugging and Reuse tutorial",
          "url": "https://www.youtube.com/results?search_query=HTML%20%26%20CSS%20Fundamentals%20CSS%20Debugging%20and%20Reuse%20tutorial"
        }
      }
    ],
    "quiz": [
      {
        "id": "html-q1",
        "moduleId": "html-structure",
        "difficulty": "easy",
        "topic": "HTML basics",
        "question": "Which language defines the structure of a web page?",
        "options": [
          "HTML",
          "CSS",
          "SQL",
          "Node.js"
        ],
        "correct": 0
      },
      {
        "id": "html-q2",
        "moduleId": "css-styling",
        "difficulty": "easy",
        "topic": "CSS basics",
        "question": "Which language is mainly used to style HTML elements?",
        "options": [
          "Java",
          "CSS",
          "MySQL",
          "Python"
        ],
        "correct": 1
      },
      {
        "id": "html-q3",
        "moduleId": "html-structure",
        "difficulty": "easy",
        "topic": "Semantic HTML",
        "question": "Which element is most appropriate for the main navigation links?",
        "options": [
          "<nav>",
          "<b>",
          "<img>",
          "<table>"
        ],
        "correct": 0
      },
      {
        "id": "html-q4",
        "moduleId": "css-styling",
        "difficulty": "medium",
        "topic": "Selectors",
        "question": "Which selector targets every element with class=\"card\"?",
        "options": [
          "#card",
          ".card",
          "card",
          "*card"
        ],
        "correct": 1
      },
      {
        "id": "html-q5",
        "moduleId": "css-styling",
        "difficulty": "medium",
        "topic": "Box model",
        "question": "Which box-model area creates space outside an element border?",
        "options": [
          "Padding",
          "Content",
          "Margin",
          "Width"
        ],
        "correct": 2
      },
      {
        "id": "html-q6",
        "moduleId": "layout-responsive",
        "difficulty": "medium",
        "topic": "Flexbox",
        "question": "Which declaration turns an element into a flex container?",
        "options": [
          "display: flex",
          "position: flex",
          "layout: flex",
          "float: flex"
        ],
        "correct": 0
      },
      {
        "id": "html-q7",
        "moduleId": "html-css-fundamentals-m4",
        "difficulty": "medium",
        "topic": "Accessible Forms",
        "question": "A form field has only placeholder text. What is the best accessibility improvement?",
        "options": [
          "Add a persistent associated label",
          "Remove keyboard focus",
          "Replace the input with a picture",
          "Make the placeholder lighter"
        ],
        "correct": 0,
        "explanation": "Labels connect visible instructions to form controls using matching for and id values. Choose input types such as email and number to provide appropriate keyboards and native validation. Group related choices with fieldset and legend; show errors beside the relevant field, not only through color."
      },
      {
        "id": "html-q8",
        "moduleId": "layout-responsive",
        "difficulty": "hard",
        "topic": "Grid layout",
        "question": "You need rows and columns that align across both dimensions. Which layout system is usually the best fit?",
        "options": [
          "CSS Grid",
          "Inline elements",
          "Absolute positioning only",
          "HTML tables for all page layout"
        ],
        "correct": 0
      },
      {
        "id": "html-q9",
        "moduleId": "html-structure",
        "difficulty": "hard",
        "topic": "Accessibility",
        "question": "Why is semantic HTML preferred over using generic div elements everywhere?",
        "options": [
          "It automatically adds JavaScript",
          "It improves meaning and accessibility",
          "It makes every page offline",
          "It removes the need for CSS"
        ],
        "correct": 1
      },
      {
        "id": "html-q10",
        "moduleId": "html-css-fundamentals-m5",
        "difficulty": "hard",
        "topic": "CSS Debugging and Reuse",
        "question": "Several cards have conflicting spacing rules. Which fix is most maintainable?",
        "options": [
          "Add important to every rule",
          "Inspect the cascade and consolidate a shared class",
          "Copy more inline styles",
          "Remove all padding without inspecting"
        ],
        "correct": 1,
        "explanation": "Use browser developer tools to inspect the computed styles and identify the rule that wins the cascade. Create reusable classes for repeated components and custom properties for shared colors and spacing. Test long text, keyboard focus and narrow viewports before considering a layout finished."
      }
    ]
  },
  {
    "id": "javascript-foundations",
    "title": "JavaScript Foundations",
    "category": "Programming",
    "level": "Beginner",
    "duration": "4h 20m",
    "description": "Learn JavaScript syntax, functions, arrays, objects and browser interaction.",
    "skills": [
      "JavaScript",
      "DOM",
      "Problem Solving"
    ],
    "interests": [
      "Programming",
      "Web Development",
      "Frontend"
    ],
    "nextCourseIds": [
      "nodejs-essentials"
    ],
    "modules": [
      {
        "id": "js-basics",
        "title": "Variables & Control Flow",
        "duration": "55 min",
        "summary": "Use variables, data types, operators and decisions.",
        "notes": [
          "let and const declare block-scoped variables; const prevents reassignment of the variable binding.",
          "JavaScript supports values such as strings, numbers, booleans, arrays, objects, null and undefined.",
          "if/else and switch select code paths, while loops repeat work."
        ],
        "video": {
          "title": "JavaScript Full Course for Beginners",
          "url": "https://www.youtube.com/results?search_query=freeCodeCamp+JavaScript+full+course+beginners"
        }
      },
      {
        "id": "js-functions",
        "title": "Functions, Arrays & Objects",
        "duration": "65 min",
        "summary": "Organize logic with functions and collections.",
        "notes": [
          "Functions package reusable behavior and can receive parameters and return values.",
          "Arrays store ordered values and provide methods such as map, filter and find.",
          "Objects group related data using key-value properties."
        ],
        "video": {
          "title": "JavaScript Functions Arrays Objects",
          "url": "https://www.youtube.com/results?search_query=JavaScript+functions+arrays+objects+tutorial+beginners"
        }
      },
      {
        "id": "js-dom",
        "title": "DOM & Events",
        "duration": "60 min",
        "summary": "Make pages interactive by reading and updating the DOM.",
        "notes": [
          "The DOM represents the HTML document as objects JavaScript can query and modify.",
          "addEventListener attaches behavior to events such as click, input and submit.",
          "User input should be validated before it is processed or sent to a backend."
        ],
        "video": {
          "title": "JavaScript DOM Tutorial",
          "url": "https://www.youtube.com/results?search_query=JavaScript+DOM+events+tutorial+beginners"
        }
      },
      {
        "id": "javascript-foundations-m4",
        "title": "Promises and Fetch",
        "duration": "40 min",
        "summary": "Practice promises and fetch through a worked example and a short verification exercise.",
        "notes": [
          "A promise represents a future result; await pauses the current async function while other work can continue.",
          "Fetch resolves for HTTP error responses too, so inspect response.ok before consuming successful data.",
          "Use try/catch/finally to display errors and restore loading controls after either success or failure."
        ],
        "video": {
          "title": "Promises and Fetch tutorial",
          "url": "https://www.youtube.com/results?search_query=JavaScript%20Foundations%20Promises%20and%20Fetch%20tutorial"
        }
      },
      {
        "id": "javascript-foundations-m5",
        "title": "Debugging and Small Tests",
        "duration": "40 min",
        "summary": "Practice debugging and small tests through a worked example and a short verification exercise.",
        "notes": [
          "Break a calculation into a pure function with explicit inputs and a return value.",
          "Use breakpoints to inspect actual values rather than guessing which line failed.",
          "Test normal values, boundaries and invalid inputs; strict comparisons help reveal unexpected types."
        ],
        "video": {
          "title": "Debugging and Small Tests tutorial",
          "url": "https://www.youtube.com/results?search_query=JavaScript%20Foundations%20Debugging%20and%20Small%20Tests%20tutorial"
        }
      }
    ],
    "quiz": [
      {
        "id": "js-q1",
        "moduleId": "js-basics",
        "difficulty": "easy",
        "topic": "Variables",
        "question": "Which keyword declares a block-scoped variable that can be reassigned?",
        "options": [
          "let",
          "const",
          "class",
          "import"
        ],
        "correct": 0
      },
      {
        "id": "js-q2",
        "moduleId": "js-basics",
        "difficulty": "easy",
        "topic": "Data types",
        "question": "Which value is a JavaScript boolean?",
        "options": [
          "\"true\"",
          "1",
          "true",
          "null"
        ],
        "correct": 2
      },
      {
        "id": "js-q3",
        "moduleId": "js-functions",
        "difficulty": "easy",
        "topic": "Functions",
        "question": "What keyword sends a value back from a function?",
        "options": [
          "break",
          "return",
          "yield only",
          "export"
        ],
        "correct": 1
      },
      {
        "id": "js-q4",
        "moduleId": "js-functions",
        "difficulty": "medium",
        "topic": "Arrays",
        "question": "Which method creates a new array by transforming every item?",
        "options": [
          "map()",
          "push() only",
          "join()",
          "indexOf()"
        ],
        "correct": 0
      },
      {
        "id": "js-q5",
        "moduleId": "js-functions",
        "difficulty": "medium",
        "topic": "Objects",
        "question": "How do you normally access the name property of object user?",
        "options": [
          "user.name",
          "user->name",
          "user::name",
          "name(user)"
        ],
        "correct": 0
      },
      {
        "id": "js-q6",
        "moduleId": "js-dom",
        "difficulty": "medium",
        "topic": "DOM selection",
        "question": "Which method can select an element using a CSS selector?",
        "options": [
          "document.querySelector()",
          "document.compile()",
          "window.sql()",
          "console.select()"
        ],
        "correct": 0
      },
      {
        "id": "js-q7",
        "moduleId": "javascript-foundations-m4",
        "difficulty": "medium",
        "topic": "Promises and Fetch",
        "question": "A fetch request resolves with status 404. What should your code inspect?",
        "options": [
          "Only whether fetch resolved",
          "response.ok or response.status",
          "The page background color",
          "The array length before parsing"
        ],
        "correct": 1,
        "explanation": "A promise represents a future result; await pauses the current async function while other work can continue. Fetch resolves for HTTP error responses too, so inspect response.ok before consuming successful data. Use try/catch/finally to display errors and restore loading controls after either success or failure."
      },
      {
        "id": "js-q8",
        "moduleId": "js-functions",
        "difficulty": "hard",
        "topic": "Array reasoning",
        "question": "You need only products costing more than 1000. Which array method most directly expresses this?",
        "options": [
          "filter()",
          "map()",
          "sort() only",
          "concat()"
        ],
        "correct": 0
      },
      {
        "id": "js-q9",
        "moduleId": "js-dom",
        "difficulty": "hard",
        "topic": "Form behavior",
        "question": "Why is event.preventDefault() often used in a JavaScript form submit handler?",
        "options": [
          "To stop the browser default submission while custom logic runs",
          "To delete the form",
          "To restart the server",
          "To create a database table"
        ],
        "correct": 0
      },
      {
        "id": "js-q10",
        "moduleId": "javascript-foundations-m5",
        "difficulty": "hard",
        "topic": "Debugging and Small Tests",
        "question": "A percentage function passes for 1 of 5 but crashes for an empty course. Which test exposes the missing case?",
        "options": [
          "Another 1-of-5 test",
          "A test of the button color",
          "A zero-total test",
          "A test that always returns true"
        ],
        "correct": 2,
        "explanation": "Break a calculation into a pure function with explicit inputs and a return value. Use breakpoints to inspect actual values rather than guessing which line failed. Test normal values, boundaries and invalid inputs; strict comparisons help reveal unexpected types."
      }
    ]
  },
  {
    "id": "java-fundamentals",
    "title": "Java Programming Fundamentals",
    "category": "Programming",
    "level": "Beginner",
    "duration": "4h 20m",
    "description": "Develop core Java programming skills using classes, methods, collections and exceptions.",
    "skills": [
      "Java",
      "OOP",
      "Problem Solving"
    ],
    "interests": [
      "Programming",
      "Software Development"
    ],
    "nextCourseIds": [
      "mysql-fundamentals"
    ],
    "modules": [
      {
        "id": "java-basics",
        "title": "Java Basics",
        "duration": "55 min",
        "summary": "Understand variables, operators, conditions and loops.",
        "notes": [
          "Java is statically typed, so variables have declared types such as int, double and String.",
          "Control statements include if/else, switch, for, while and do-while.",
          "The main method is the common starting point of a standalone Java program."
        ],
        "video": {
          "title": "Java Full Course for Beginners",
          "url": "https://www.youtube.com/results?search_query=Java+full+course+beginners+freeCodeCamp"
        }
      },
      {
        "id": "java-oop",
        "title": "Classes & OOP",
        "duration": "65 min",
        "summary": "Model data and behavior with objects and classes.",
        "notes": [
          "A class defines fields and methods, while an object is an instance of that class.",
          "Encapsulation hides internal data behind controlled methods.",
          "Inheritance and polymorphism support reusable and flexible object-oriented designs."
        ],
        "video": {
          "title": "Java OOP Tutorial",
          "url": "https://www.youtube.com/results?search_query=Java+OOP+classes+inheritance+polymorphism+tutorial"
        }
      },
      {
        "id": "java-collections",
        "title": "Collections & Exceptions",
        "duration": "60 min",
        "summary": "Work with collections and handle runtime problems safely.",
        "notes": [
          "ArrayList stores a resizable ordered collection of elements.",
          "HashMap stores key-value pairs for fast lookup by key.",
          "try/catch handles exceptions so a program can recover or provide a meaningful error."
        ],
        "video": {
          "title": "Java Collections and Exception Handling",
          "url": "https://www.youtube.com/results?search_query=Java+collections+exception+handling+tutorial"
        }
      },
      {
        "id": "java-fundamentals-m4",
        "title": "Files and Resource Handling",
        "duration": "40 min",
        "summary": "Practice files and resource handling through a worked example and a short verification exercise.",
        "notes": [
          "Path describes a filesystem location and Files provides convenient text reading and writing methods.",
          "Use try-with-resources for readers or streams so they close even when an exception occurs.",
          "Handle IOException with a meaningful recovery or message instead of ignoring failed writes."
        ],
        "video": {
          "title": "Files and Resource Handling tutorial",
          "url": "https://www.youtube.com/results?search_query=Java%20Programming%20Fundamentals%20Files%20and%20Resource%20Handling%20tutorial"
        }
      },
      {
        "id": "java-fundamentals-m5",
        "title": "Testing a Small Java Application",
        "duration": "40 min",
        "summary": "Practice testing a small java application through a worked example and a short verification exercise.",
        "notes": [
          "Separate input/output from calculation so the calculation can be tested without a console.",
          "Test boundaries such as the exact pass mark as well as values immediately below it.",
          "Validate input before changing an object so invalid values cannot corrupt its state."
        ],
        "video": {
          "title": "Testing a Small Java Application tutorial",
          "url": "https://www.youtube.com/results?search_query=Java%20Programming%20Fundamentals%20Testing%20a%20Small%20Java%20Application%20tutorial"
        }
      }
    ],
    "quiz": [
      {
        "id": "java-q1",
        "moduleId": "java-basics",
        "difficulty": "easy",
        "topic": "Types",
        "question": "Which is a valid Java integer type?",
        "options": [
          "int",
          "number",
          "integer()",
          "numeric"
        ],
        "correct": 0
      },
      {
        "id": "java-q2",
        "moduleId": "java-basics",
        "difficulty": "easy",
        "topic": "Entry point",
        "question": "Which method is normally the entry point of a Java application?",
        "options": [
          "main",
          "start",
          "runApp",
          "index"
        ],
        "correct": 0
      },
      {
        "id": "java-q3",
        "moduleId": "java-oop",
        "difficulty": "easy",
        "topic": "Objects",
        "question": "An object is best described as:",
        "options": [
          "An instance of a class",
          "A SQL query",
          "A CSS selector",
          "A package manager"
        ],
        "correct": 0
      },
      {
        "id": "java-q4",
        "moduleId": "java-oop",
        "difficulty": "medium",
        "topic": "Encapsulation",
        "question": "What is encapsulation mainly used for?",
        "options": [
          "Controlling access to object state",
          "Creating HTML",
          "Starting MySQL",
          "Styling forms"
        ],
        "correct": 0
      },
      {
        "id": "java-q5",
        "moduleId": "java-oop",
        "difficulty": "medium",
        "topic": "Inheritance",
        "question": "Which keyword allows one class to inherit from another class?",
        "options": [
          "extends",
          "inherits",
          "implementsOnly",
          "parent"
        ],
        "correct": 0
      },
      {
        "id": "java-q6",
        "moduleId": "java-collections",
        "difficulty": "medium",
        "topic": "Collections",
        "question": "Which collection is a resizable ordered list?",
        "options": [
          "ArrayList",
          "HashMap",
          "Thread",
          "Scanner only"
        ],
        "correct": 0
      },
      {
        "id": "java-q7",
        "moduleId": "java-fundamentals-m4",
        "difficulty": "medium",
        "topic": "Files and Resource Handling",
        "question": "Which Java construct closes an opened reader even if reading fails?",
        "options": [
          "An empty catch block",
          "A static field",
          "Try-with-resources",
          "An infinite loop"
        ],
        "correct": 2,
        "explanation": "Path describes a filesystem location and Files provides convenient text reading and writing methods. Use try-with-resources for readers or streams so they close even when an exception occurs. Handle IOException with a meaningful recovery or message instead of ignoring failed writes."
      },
      {
        "id": "java-q8",
        "moduleId": "java-oop",
        "difficulty": "hard",
        "topic": "Polymorphism",
        "question": "A parent reference points to a child object and an overridden method is called. Which implementation normally runs?",
        "options": [
          "The child implementation",
          "Always the parent implementation",
          "No implementation",
          "The compiler deletes the method"
        ],
        "correct": 0
      },
      {
        "id": "java-q9",
        "moduleId": "java-collections",
        "difficulty": "hard",
        "topic": "Data structures",
        "question": "You need to look up a student by unique roll number quickly. Which structure is generally suitable?",
        "options": [
          "HashMap",
          "ArrayList only by sequential search",
          "StringBuilder",
          "Exception"
        ],
        "correct": 0
      },
      {
        "id": "java-q10",
        "moduleId": "java-fundamentals-m5",
        "difficulty": "hard",
        "topic": "Testing a Small Java Application",
        "question": "A pass rule is score >= 60. Which pair best checks its boundary?",
        "options": [
          "10 and 20",
          "80 and 90",
          "0 and 1",
          "59 and 60"
        ],
        "correct": 3,
        "explanation": "Separate input/output from calculation so the calculation can be tested without a console. Test boundaries such as the exact pass mark as well as values immediately below it. Validate input before changing an object so invalid values cannot corrupt its state."
      }
    ]
  },
  {
    "id": "python-basics",
    "title": "Python Programming Basics",
    "category": "Programming",
    "level": "Beginner",
    "duration": "4h 5m",
    "description": "Build programming fundamentals with Python syntax, functions, collections and files.",
    "skills": [
      "Python",
      "Functions",
      "Data Structures"
    ],
    "interests": [
      "Programming",
      "Data",
      "Software Development"
    ],
    "nextCourseIds": [
      "mysql-fundamentals"
    ],
    "modules": [
      {
        "id": "py-basics",
        "title": "Python Syntax & Decisions",
        "duration": "50 min",
        "summary": "Use Python variables, conditions and loops.",
        "notes": [
          "Python uses indentation to define code blocks instead of braces.",
          "Variables are dynamically typed and can refer to different value types.",
          "if/elif/else handles decisions, while for and while handle repetition."
        ],
        "video": {
          "title": "Python Full Course for Beginners",
          "url": "https://www.youtube.com/results?search_query=freeCodeCamp+Python+full+course+beginners"
        }
      },
      {
        "id": "py-functions",
        "title": "Functions & Collections",
        "duration": "60 min",
        "summary": "Organize code and work with lists, dictionaries and sets.",
        "notes": [
          "def declares a function and return sends a result back to the caller.",
          "Lists are ordered and mutable; tuples are ordered and commonly used as immutable records.",
          "Dictionaries store values by key and are useful for structured lookup."
        ],
        "video": {
          "title": "Python Functions Lists Dictionaries",
          "url": "https://www.youtube.com/results?search_query=Python+functions+lists+dictionaries+beginners"
        }
      },
      {
        "id": "py-files",
        "title": "Files & Exceptions",
        "duration": "55 min",
        "summary": "Read files and handle errors with exceptions.",
        "notes": [
          "with open(...) automatically closes a file when the block finishes.",
          "Try/except handles expected failures such as invalid input or missing files.",
          "File modes include r for reading, w for writing and a for appending."
        ],
        "video": {
          "title": "Python File Handling and Exceptions",
          "url": "https://www.youtube.com/results?search_query=Python+file+handling+exceptions+tutorial"
        }
      },
      {
        "id": "python-basics-m4",
        "title": "Modules and Virtual Environments",
        "duration": "40 min",
        "summary": "Practice modules and virtual environments through a worked example and a short verification exercise.",
        "notes": [
          "Put reusable functions in a module and import them where needed instead of copying their definitions.",
          "A virtual environment isolates dependencies for one project from packages installed for other projects.",
          "Use a main guard to keep demonstration code from running when a module is imported."
        ],
        "video": {
          "title": "Modules and Virtual Environments tutorial",
          "url": "https://www.youtube.com/results?search_query=Python%20Programming%20Basics%20Modules%20and%20Virtual%20Environments%20tutorial"
        }
      },
      {
        "id": "python-basics-m5",
        "title": "Testing and Data Validation",
        "duration": "40 min",
        "summary": "Practice testing and data validation through a worked example and a short verification exercise.",
        "notes": [
          "Validate external data before using it in a calculation or saving it to a file.",
          "Keep a small calculation independent of input() so tests can call it directly.",
          "Use assertions or unittest to check expected results, invalid values and boundary cases."
        ],
        "video": {
          "title": "Testing and Data Validation tutorial",
          "url": "https://www.youtube.com/results?search_query=Python%20Programming%20Basics%20Testing%20and%20Data%20Validation%20tutorial"
        }
      }
    ],
    "quiz": [
      {
        "id": "py-q1",
        "moduleId": "py-basics",
        "difficulty": "easy",
        "topic": "Syntax",
        "question": "What defines a Python code block?",
        "options": [
          "Indentation",
          "Curly braces only",
          "Semicolons",
          "HTML tags"
        ],
        "correct": 0
      },
      {
        "id": "py-q2",
        "moduleId": "py-basics",
        "difficulty": "easy",
        "topic": "Loops",
        "question": "Which keyword iterates over items in a sequence?",
        "options": [
          "for",
          "repeat",
          "foreach only",
          "iterate"
        ],
        "correct": 0
      },
      {
        "id": "py-q3",
        "moduleId": "py-functions",
        "difficulty": "easy",
        "topic": "Functions",
        "question": "Which keyword defines a function?",
        "options": [
          "def",
          "function",
          "func",
          "method"
        ],
        "correct": 0
      },
      {
        "id": "py-q4",
        "moduleId": "py-functions",
        "difficulty": "medium",
        "topic": "Lists",
        "question": "Which method adds one item to the end of a list?",
        "options": [
          "append()",
          "addLastOnly()",
          "pushJava()",
          "insertSQL()"
        ],
        "correct": 0
      },
      {
        "id": "py-q5",
        "moduleId": "py-functions",
        "difficulty": "medium",
        "topic": "Dictionaries",
        "question": "A Python dictionary stores data as:",
        "options": [
          "Key-value pairs",
          "Only numbers",
          "Only files",
          "CSS rules"
        ],
        "correct": 0
      },
      {
        "id": "py-q6",
        "moduleId": "py-files",
        "difficulty": "medium",
        "topic": "Files",
        "question": "Why is with open(...) commonly preferred?",
        "options": [
          "It automatically manages closing the file",
          "It turns the file into HTML",
          "It creates a database",
          "It disables errors"
        ],
        "correct": 0
      },
      {
        "id": "py-q7",
        "moduleId": "python-basics-m4",
        "difficulty": "medium",
        "topic": "Modules and Virtual Environments",
        "question": "Why use a Python virtual environment for a lab project?",
        "options": [
          "To change indentation rules",
          "To make all code asynchronous",
          "To remove the need for imports",
          "To isolate project dependencies"
        ],
        "correct": 3,
        "explanation": "Put reusable functions in a module and import them where needed instead of copying their definitions. A virtual environment isolates dependencies for one project from packages installed for other projects. Use a main guard to keep demonstration code from running when a module is imported."
      },
      {
        "id": "py-q8",
        "moduleId": "py-functions",
        "difficulty": "hard",
        "topic": "Collection choice",
        "question": "You need unique values and do not care about duplicates. Which collection is most suitable?",
        "options": [
          "set",
          "list only",
          "string",
          "file"
        ],
        "correct": 0
      },
      {
        "id": "py-q9",
        "moduleId": "py-basics",
        "difficulty": "hard",
        "topic": "Reasoning",
        "question": "What is produced by list(range(1,4))?",
        "options": [
          "[1, 2, 3]",
          "[1, 2, 3, 4]",
          "[0, 1, 2, 3]",
          "[4]"
        ],
        "correct": 0
      },
      {
        "id": "py-q10",
        "moduleId": "python-basics-m5",
        "difficulty": "hard",
        "topic": "Testing and Data Validation",
        "question": "An average function rejects empty lists. What should a test of average([]) verify?",
        "options": [
          "That ValueError is raised",
          "That an arbitrary mark is returned",
          "That input is silently ignored",
          "That every valid list is rejected"
        ],
        "correct": 0,
        "explanation": "Validate external data before using it in a calculation or saving it to a file. Keep a small calculation independent of input() so tests can call it directly. Use assertions or unittest to check expected results, invalid values and boundary cases."
      }
    ]
  },
  {
    "id": "mysql-fundamentals",
    "title": "Database & MySQL Fundamentals",
    "category": "Database",
    "level": "Beginner",
    "duration": "4h 10m",
    "description": "Design relational data and use SQL to create, read, update and join records.",
    "skills": [
      "MySQL",
      "SQL",
      "Database Design"
    ],
    "interests": [
      "Database",
      "Backend",
      "Data"
    ],
    "nextCourseIds": [
      "fullstack-foundations"
    ],
    "modules": [
      {
        "id": "sql-relational",
        "title": "Relational Database Basics",
        "duration": "50 min",
        "summary": "Understand tables, keys and relationships.",
        "notes": [
          "A relational database stores structured data in tables made of rows and columns.",
          "A primary key uniquely identifies each row.",
          "Foreign keys connect related tables and help maintain referential integrity."
        ],
        "video": {
          "title": "MySQL Tutorial for Beginners",
          "url": "https://www.youtube.com/results?search_query=MySQL+database+tutorial+beginners+relational+keys"
        }
      },
      {
        "id": "sql-crud",
        "title": "SQL CRUD Operations",
        "duration": "60 min",
        "summary": "Create, read, update and delete data with SQL.",
        "notes": [
          "INSERT adds rows, SELECT reads rows, UPDATE changes rows and DELETE removes rows.",
          "WHERE filters rows and ORDER BY controls result ordering.",
          "Parameterized queries should be used in applications to reduce SQL injection risk."
        ],
        "video": {
          "title": "SQL CRUD Tutorial",
          "url": "https://www.youtube.com/results?search_query=SQL+CRUD+SELECT+INSERT+UPDATE+DELETE+tutorial"
        }
      },
      {
        "id": "sql-joins",
        "title": "Joins & Design",
        "duration": "60 min",
        "summary": "Combine related tables and apply normalization basics.",
        "notes": [
          "INNER JOIN returns matching rows from related tables.",
          "LEFT JOIN keeps every row from the left table even when no match exists.",
          "Normalization reduces unnecessary duplication and update anomalies."
        ],
        "video": {
          "title": "SQL Joins Explained",
          "url": "https://www.youtube.com/results?search_query=SQL+joins+normalization+tutorial+beginners"
        }
      },
      {
        "id": "mysql-fundamentals-m4",
        "title": "Grouping and Aggregate Queries",
        "duration": "40 min",
        "summary": "Practice grouping and aggregate queries through a worked example and a short verification exercise.",
        "notes": [
          "COUNT counts rows, SUM totals numeric values and AVG computes their average.",
          "GROUP BY calculates aggregates separately for each group, such as course_id.",
          "WHERE filters source rows before grouping, while HAVING filters the grouped results."
        ],
        "video": {
          "title": "Grouping and Aggregate Queries tutorial",
          "url": "https://www.youtube.com/results?search_query=Database%20%26%20MySQL%20Fundamentals%20Grouping%20and%20Aggregate%20Queries%20tutorial"
        }
      },
      {
        "id": "mysql-fundamentals-m5",
        "title": "Transactions and Indexes",
        "duration": "40 min",
        "summary": "Practice transactions and indexes through a worked example and a short verification exercise.",
        "notes": [
          "A transaction groups related writes so COMMIT keeps them together and ROLLBACK undoes them together.",
          "Indexes can speed up filtering and joins but consume space and add work to writes.",
          "Use EXPLAIN to inspect access paths and choose indexes for real query patterns."
        ],
        "video": {
          "title": "Transactions and Indexes tutorial",
          "url": "https://www.youtube.com/results?search_query=Database%20%26%20MySQL%20Fundamentals%20Transactions%20and%20Indexes%20tutorial"
        }
      }
    ],
    "quiz": [
      {
        "id": "sql-q1",
        "moduleId": "sql-relational",
        "difficulty": "easy",
        "topic": "Tables",
        "question": "A database table is made of:",
        "options": [
          "Rows and columns",
          "Only functions",
          "CSS selectors",
          "Routes only"
        ],
        "correct": 0
      },
      {
        "id": "sql-q2",
        "moduleId": "sql-relational",
        "difficulty": "easy",
        "topic": "Keys",
        "question": "What does a primary key do?",
        "options": [
          "Uniquely identifies a row",
          "Styles a table",
          "Starts Node.js",
          "Encrypts CSS"
        ],
        "correct": 0
      },
      {
        "id": "sql-q3",
        "moduleId": "sql-crud",
        "difficulty": "easy",
        "topic": "SELECT",
        "question": "Which command reads data from a table?",
        "options": [
          "SELECT",
          "INSERT",
          "DROP only",
          "COMMIT only"
        ],
        "correct": 0
      },
      {
        "id": "sql-q4",
        "moduleId": "sql-crud",
        "difficulty": "medium",
        "topic": "Filtering",
        "question": "Which clause filters rows in a SELECT statement?",
        "options": [
          "WHERE",
          "STYLE",
          "FILTERBY only",
          "CLASS"
        ],
        "correct": 0
      },
      {
        "id": "sql-q5",
        "moduleId": "sql-crud",
        "difficulty": "medium",
        "topic": "Updating",
        "question": "Which command changes existing rows?",
        "options": [
          "UPDATE",
          "SELECT",
          "CREATE DATABASE only",
          "SHOW"
        ],
        "correct": 0
      },
      {
        "id": "sql-q6",
        "moduleId": "sql-joins",
        "difficulty": "medium",
        "topic": "Joins",
        "question": "Which join returns only rows that match in both joined tables?",
        "options": [
          "INNER JOIN",
          "LEFT JOIN",
          "CROSS JOIN only",
          "NO JOIN"
        ],
        "correct": 0
      },
      {
        "id": "sql-q7",
        "moduleId": "mysql-fundamentals-m4",
        "difficulty": "medium",
        "topic": "Grouping and Aggregate Queries",
        "question": "Which clause filters groups to keep only courses with COUNT(*) >= 5?",
        "options": [
          "HAVING",
          "ORDER BY",
          "VALUES",
          "LIMIT alone"
        ],
        "correct": 0,
        "explanation": "COUNT counts rows, SUM totals numeric values and AVG computes their average. GROUP BY calculates aggregates separately for each group, such as course_id. WHERE filters source rows before grouping, while HAVING filters the grouped results."
      },
      {
        "id": "sql-q8",
        "moduleId": "sql-joins",
        "difficulty": "hard",
        "topic": "Join reasoning",
        "question": "You need every learner even if they have no enrollment. Which join should start from learners?",
        "options": [
          "LEFT JOIN",
          "INNER JOIN only",
          "DROP JOIN",
          "DELETE JOIN"
        ],
        "correct": 0
      },
      {
        "id": "sql-q9",
        "moduleId": "sql-crud",
        "difficulty": "hard",
        "topic": "Security",
        "question": "Why should backend code use parameterized SQL queries?",
        "options": [
          "To reduce SQL injection risk",
          "To make CSS responsive",
          "To create sessions",
          "To compress images"
        ],
        "correct": 0
      },
      {
        "id": "sql-q10",
        "moduleId": "mysql-fundamentals-m5",
        "difficulty": "hard",
        "topic": "Transactions and Indexes",
        "question": "A two-step transfer fails on the second write. What preserves consistency?",
        "options": [
          "Keep the first write permanently",
          "Roll back both writes in one transaction",
          "Ignore the second failure",
          "Disable all constraints"
        ],
        "correct": 1,
        "explanation": "A transaction groups related writes so COMMIT keeps them together and ROLLBACK undoes them together. Indexes can speed up filtering and joins but consume space and add work to writes. Use EXPLAIN to inspect access paths and choose indexes for real query patterns."
      }
    ]
  },
  {
    "id": "nodejs-essentials",
    "title": "Node.js Essentials",
    "category": "Backend",
    "level": "Intermediate",
    "duration": "4h 15m",
    "description": "Understand Node.js modules, asynchronous execution and HTTP server development.",
    "skills": [
      "Node.js",
      "JavaScript",
      "Backend"
    ],
    "interests": [
      "Backend",
      "Web Development",
      "Programming"
    ],
    "nextCourseIds": [
      "express-rest-api"
    ],
    "modules": [
      {
        "id": "node-runtime",
        "title": "Node.js Runtime & Modules",
        "duration": "55 min",
        "summary": "Understand Node.js, CommonJS/ES modules and npm.",
        "notes": [
          "Node.js runs JavaScript outside the browser using the V8 engine.",
          "Modules split applications into reusable files and npm manages project dependencies.",
          "package.json describes scripts, metadata and dependencies for a Node.js project."
        ],
        "video": {
          "title": "Node.js Full Course for Beginners",
          "url": "https://www.youtube.com/results?search_query=freeCodeCamp+Node.js+full+course+beginners"
        }
      },
      {
        "id": "node-async",
        "title": "Async JavaScript & Event Loop",
        "duration": "65 min",
        "summary": "Use promises, async/await and non-blocking I/O.",
        "notes": [
          "The event loop coordinates asynchronous callbacks so the main thread can remain responsive.",
          "Promises represent future success or failure and async/await provides readable promise syntax.",
          "Long CPU-heavy synchronous work can block other requests."
        ],
        "video": {
          "title": "Node.js Event Loop Explained",
          "url": "https://www.youtube.com/results?search_query=Node.js+event+loop+async+await+tutorial"
        }
      },
      {
        "id": "node-http",
        "title": "HTTP Servers",
        "duration": "55 min",
        "summary": "Handle requests and responses using Node.js HTTP concepts.",
        "notes": [
          "HTTP requests contain a method, URL, headers and sometimes a body.",
          "HTTP responses contain a status code, headers and optional response body.",
          "Frameworks such as Express reduce routing and middleware boilerplate."
        ],
        "video": {
          "title": "Node.js HTTP Server Tutorial",
          "url": "https://www.youtube.com/results?search_query=Node.js+http+server+tutorial+beginners"
        }
      },
      {
        "id": "nodejs-essentials-m4",
        "title": "Filesystem and Configuration",
        "duration": "40 min",
        "summary": "Practice filesystem and configuration through a worked example and a short verification exercise.",
        "notes": [
          "Use fs/promises for asynchronous file operations so disk waits do not block other work.",
          "Read configuration from process.env and validate required values at startup.",
          "Treat missing files and invalid configuration as expected errors with controlled messages."
        ],
        "video": {
          "title": "Filesystem and Configuration tutorial",
          "url": "https://www.youtube.com/results?search_query=Node.js%20Essentials%20Filesystem%20and%20Configuration%20tutorial"
        }
      },
      {
        "id": "nodejs-essentials-m5",
        "title": "Testing and Error Boundaries",
        "duration": "40 min",
        "summary": "Practice testing and error boundaries through a worked example and a short verification exercise.",
        "notes": [
          "The built-in node:test runner executes tests without requiring a separate testing framework.",
          "Inject external dependencies into small functions so tests can simulate failures without the network.",
          "Catch failures at the request boundary and return controlled errors; do not leak stack traces or secrets."
        ],
        "video": {
          "title": "Testing and Error Boundaries tutorial",
          "url": "https://www.youtube.com/results?search_query=Node.js%20Essentials%20Testing%20and%20Error%20Boundaries%20tutorial"
        }
      }
    ],
    "quiz": [
      {
        "id": "node-q1",
        "moduleId": "node-runtime",
        "difficulty": "easy",
        "topic": "Runtime",
        "question": "Node.js is primarily:",
        "options": [
          "A JavaScript runtime",
          "A database",
          "A CSS library",
          "An operating system"
        ],
        "correct": 0
      },
      {
        "id": "node-q2",
        "moduleId": "node-runtime",
        "difficulty": "easy",
        "topic": "npm",
        "question": "Which file commonly describes Node.js project dependencies?",
        "options": [
          "package.json",
          "style.css",
          "schema.xml",
          "Main.java"
        ],
        "correct": 0
      },
      {
        "id": "node-q3",
        "moduleId": "node-async",
        "difficulty": "easy",
        "topic": "Promises",
        "question": "await is commonly used with:",
        "options": [
          "Promises",
          "CSS rules",
          "SQL tables only",
          "HTML attributes"
        ],
        "correct": 0
      },
      {
        "id": "node-q4",
        "moduleId": "node-runtime",
        "difficulty": "medium",
        "topic": "Modules",
        "question": "What is the main benefit of modules?",
        "options": [
          "Separating reusable responsibilities",
          "Disabling functions",
          "Replacing databases",
          "Styling buttons"
        ],
        "correct": 0
      },
      {
        "id": "node-q5",
        "moduleId": "node-async",
        "difficulty": "medium",
        "topic": "Event loop",
        "question": "Why does non-blocking I/O matter in Node.js?",
        "options": [
          "It lets the process handle other work while I/O waits",
          "It automatically creates HTML",
          "It removes all callbacks",
          "It guarantees infinite CPU"
        ],
        "correct": 0
      },
      {
        "id": "node-q6",
        "moduleId": "node-http",
        "difficulty": "medium",
        "topic": "HTTP",
        "question": "Which status code normally indicates success?",
        "options": [
          "200",
          "404",
          "500",
          "301 only"
        ],
        "correct": 0
      },
      {
        "id": "node-q7",
        "moduleId": "nodejs-essentials-m4",
        "difficulty": "medium",
        "topic": "Filesystem and Configuration",
        "question": "Which API suits asynchronous text-file reading in a Node.js request flow?",
        "options": [
          "An endless while loop",
          "fs/promises.readFile",
          "document.querySelector",
          "A synchronous delay"
        ],
        "correct": 1,
        "explanation": "Use fs/promises for asynchronous file operations so disk waits do not block other work. Read configuration from process.env and validate required values at startup. Treat missing files and invalid configuration as expected errors with controlled messages."
      },
      {
        "id": "node-q8",
        "moduleId": "node-async",
        "difficulty": "hard",
        "topic": "Blocking behavior",
        "question": "A route performs a huge synchronous loop for several seconds. What is the likely effect?",
        "options": [
          "Other requests can be delayed because the event loop is blocked",
          "The database becomes CSS",
          "Every request becomes parallel automatically",
          "The browser fixes the server"
        ],
        "correct": 0
      },
      {
        "id": "node-q9",
        "moduleId": "node-runtime",
        "difficulty": "hard",
        "topic": "Dependency reasoning",
        "question": "A package is required only while developing and testing. Where should it normally be listed?",
        "options": [
          "devDependencies",
          "dependencies only in every case",
          "scripts",
          "keywords"
        ],
        "correct": 0
      },
      {
        "id": "node-q10",
        "moduleId": "nodejs-essentials-m5",
        "difficulty": "hard",
        "topic": "Testing and Error Boundaries",
        "question": "How should an offline test exercise an API-client failure?",
        "options": [
          "Consume real quota repeatedly",
          "Skip all failure tests",
          "Inject a fake client that rejects",
          "Log the API key first"
        ],
        "correct": 2,
        "explanation": "The built-in node:test runner executes tests without requiring a separate testing framework. Inject external dependencies into small functions so tests can simulate failures without the network. Catch failures at the request boundary and return controlled errors; do not leak stack traces or secrets."
      }
    ]
  },
  {
    "id": "express-rest-api",
    "title": "Express.js & REST APIs",
    "category": "Backend",
    "level": "Intermediate",
    "duration": "4h 10m",
    "description": "Build REST APIs with Express routes, middleware, validation and structured responses.",
    "skills": [
      "Express.js",
      "REST API",
      "Backend"
    ],
    "interests": [
      "Backend",
      "Web Development"
    ],
    "nextCourseIds": [
      "fullstack-foundations"
    ],
    "modules": [
      {
        "id": "express-routing",
        "title": "Express Routing",
        "duration": "55 min",
        "summary": "Create Express apps and REST-style routes.",
        "notes": [
          "Express maps HTTP methods and paths to route handlers.",
          "Routes should use clear resource names such as /courses and /users.",
          "JSON is commonly used as the data format for web APIs."
        ],
        "video": {
          "title": "Express.js Crash Course",
          "url": "https://www.youtube.com/results?search_query=Express.js+crash+course+routing+beginners"
        }
      },
      {
        "id": "express-middleware",
        "title": "Middleware & Validation",
        "duration": "60 min",
        "summary": "Use middleware to parse, validate and protect requests.",
        "notes": [
          "Middleware runs during the request-response cycle and can continue with next().",
          "express.json() parses JSON request bodies.",
          "Validation should reject missing or invalid input before database work is performed."
        ],
        "video": {
          "title": "Express Middleware Tutorial",
          "url": "https://www.youtube.com/results?search_query=Express+middleware+validation+tutorial"
        }
      },
      {
        "id": "rest-design",
        "title": "REST Design & Errors",
        "duration": "55 min",
        "summary": "Use status codes and consistent API responses.",
        "notes": [
          "GET reads resources, POST creates, PUT/PATCH updates and DELETE removes resources.",
          "Use 4xx codes for client-side request problems and 5xx for server failures.",
          "Consistent error responses make frontend handling simpler."
        ],
        "video": {
          "title": "REST API Design Tutorial",
          "url": "https://www.youtube.com/results?search_query=REST+API+design+Express+status+codes+tutorial"
        }
      },
      {
        "id": "express-rest-api-m4",
        "title": "Sessions and Resource Ownership",
        "duration": "40 min",
        "summary": "Practice sessions and resource ownership through a worked example and a short verification exercise.",
        "notes": [
          "Session middleware associates a server-side user identity with a browser cookie.",
          "Authentication identifies the learner; authorization checks whether that learner can access a particular record.",
          "Filter private record queries by both resource ID and session user ID, using SQL parameters."
        ],
        "video": {
          "title": "Sessions and Resource Ownership tutorial",
          "url": "https://www.youtube.com/results?search_query=Express.js%20%26%20REST%20APIs%20Sessions%20and%20Resource%20Ownership%20tutorial"
        }
      },
      {
        "id": "express-rest-api-m5",
        "title": "API Integration Tests",
        "duration": "40 min",
        "summary": "Practice api integration tests through a worked example and a short verification exercise.",
        "notes": [
          "Test an API through HTTP so middleware, routing and response status are exercised together.",
          "Cover unauthorized access, malformed input, missing records and valid requests.",
          "Replace external services in automated tests and use an isolated database for persistence checks."
        ],
        "video": {
          "title": "API Integration Tests tutorial",
          "url": "https://www.youtube.com/results?search_query=Express.js%20%26%20REST%20APIs%20API%20Integration%20Tests%20tutorial"
        }
      }
    ],
    "quiz": [
      {
        "id": "exp-q1",
        "moduleId": "express-routing",
        "difficulty": "easy",
        "topic": "Express",
        "question": "Express is:",
        "options": [
          "A Node.js web framework",
          "A database engine",
          "A CSS processor",
          "A Java compiler"
        ],
        "correct": 0
      },
      {
        "id": "exp-q2",
        "moduleId": "express-routing",
        "difficulty": "easy",
        "topic": "Routes",
        "question": "Which handles a GET request in Express?",
        "options": [
          "app.get()",
          "app.readSQL()",
          "app.css()",
          "app.file()"
        ],
        "correct": 0
      },
      {
        "id": "exp-q3",
        "moduleId": "express-middleware",
        "difficulty": "easy",
        "topic": "JSON bodies",
        "question": "Which built-in middleware parses JSON bodies?",
        "options": [
          "express.json()",
          "express.html()",
          "express.mysql()",
          "express.file()"
        ],
        "correct": 0
      },
      {
        "id": "exp-q4",
        "moduleId": "express-middleware",
        "difficulty": "medium",
        "topic": "Middleware",
        "question": "What does next() usually do inside middleware?",
        "options": [
          "Passes control to the next middleware/handler",
          "Stops Node.js permanently",
          "Creates a table",
          "Reloads CSS"
        ],
        "correct": 0
      },
      {
        "id": "exp-q5",
        "moduleId": "rest-design",
        "difficulty": "medium",
        "topic": "REST methods",
        "question": "Which method normally creates a new resource?",
        "options": [
          "POST",
          "GET",
          "HEAD",
          "OPTIONS only"
        ],
        "correct": 0
      },
      {
        "id": "exp-q6",
        "moduleId": "rest-design",
        "difficulty": "medium",
        "topic": "Status codes",
        "question": "Which status code is appropriate when a requested resource does not exist?",
        "options": [
          "404",
          "200",
          "201",
          "101"
        ],
        "correct": 0
      },
      {
        "id": "exp-q7",
        "moduleId": "express-rest-api-m4",
        "difficulty": "medium",
        "topic": "Sessions and Resource Ownership",
        "question": "Where should the owner ID for a private-course query come from?",
        "options": [
          "An editable request body field",
          "The course title",
          "The authenticated session",
          "An unverified URL parameter"
        ],
        "correct": 2,
        "explanation": "Session middleware associates a server-side user identity with a browser cookie. Authentication identifies the learner; authorization checks whether that learner can access a particular record. Filter private record queries by both resource ID and session user ID, using SQL parameters."
      },
      {
        "id": "exp-q8",
        "moduleId": "rest-design",
        "difficulty": "hard",
        "topic": "API semantics",
        "question": "A request successfully creates a new enrollment. Which status code is most descriptive?",
        "options": [
          "201 Created",
          "404 Not Found",
          "500 Internal Server Error",
          "301 Moved Permanently"
        ],
        "correct": 0
      },
      {
        "id": "exp-q9",
        "moduleId": "express-middleware",
        "difficulty": "hard",
        "topic": "Error handling",
        "question": "What is the main value of centralized Express error middleware?",
        "options": [
          "Consistent handling and responses for errors",
          "It makes SQL unnecessary",
          "It creates HTML pages automatically",
          "It encrypts every file"
        ],
        "correct": 0
      },
      {
        "id": "exp-q10",
        "moduleId": "express-rest-api-m5",
        "difficulty": "hard",
        "topic": "API Integration Tests",
        "question": "A route works for its owner. Which test best checks its authorization boundary?",
        "options": [
          "Change the text color",
          "Request it twice with the same owner",
          "Only inspect the title",
          "Request it using a different learner session"
        ],
        "correct": 3,
        "explanation": "Test an API through HTTP so middleware, routing and response status are exercised together. Cover unauthorized access, malformed input, missing records and valid requests. Replace external services in automated tests and use an isolated database for persistence checks."
      }
    ]
  },
  {
    "id": "bootstrap-responsive-ui",
    "title": "Bootstrap & Responsive UI",
    "category": "Frontend",
    "level": "Intermediate",
    "duration": "3h 45m",
    "description": "Build responsive interfaces quickly using Bootstrap layout, utilities and components.",
    "skills": [
      "Bootstrap",
      "Responsive Design",
      "UI"
    ],
    "interests": [
      "Frontend",
      "Web Development"
    ],
    "nextCourseIds": [
      "javascript-foundations",
      "fullstack-foundations"
    ],
    "modules": [
      {
        "id": "bs-grid",
        "title": "Bootstrap Grid",
        "duration": "45 min",
        "summary": "Use containers, rows and columns for responsive layout.",
        "notes": [
          "Bootstrap uses a 12-column responsive grid system.",
          "Containers provide page width and horizontal padding.",
          "Breakpoint prefixes such as md and lg apply layout changes at specific viewport widths."
        ],
        "video": {
          "title": "Bootstrap Grid Tutorial",
          "url": "https://www.youtube.com/results?search_query=Bootstrap+5+grid+system+tutorial+beginners"
        }
      },
      {
        "id": "bs-components",
        "title": "Components",
        "duration": "50 min",
        "summary": "Use reusable navigation, cards, forms and modal components.",
        "notes": [
          "Bootstrap components provide consistent markup and styles for common UI patterns.",
          "Cards group related information and actions.",
          "Forms can use Bootstrap classes for spacing, layout and validation feedback."
        ],
        "video": {
          "title": "Bootstrap Components Tutorial",
          "url": "https://www.youtube.com/results?search_query=Bootstrap+5+components+forms+cards+navbar+tutorial"
        }
      },
      {
        "id": "bs-utilities",
        "title": "Utilities & Customization",
        "duration": "50 min",
        "summary": "Use utility classes and combine them with custom CSS.",
        "notes": [
          "Utility classes handle common spacing, display, flex, sizing and typography needs.",
          "Responsive utility variants can change behavior at breakpoints.",
          "Custom CSS can extend Bootstrap when the design requires project-specific branding."
        ],
        "video": {
          "title": "Bootstrap Utilities Tutorial",
          "url": "https://www.youtube.com/results?search_query=Bootstrap+5+utility+classes+responsive+tutorial"
        }
      },
      {
        "id": "bootstrap-responsive-ui-m4",
        "title": "Accessible Interactive Components",
        "duration": "40 min",
        "summary": "Practice accessible interactive components through a worked example and a short verification exercise.",
        "notes": [
          "Use native buttons for actions so keyboard activation works without custom event handling.",
          "For dialogs, provide an accessible name and verify focus enters and returns correctly.",
          "Use visible labels and text feedback with forms; styling alone does not make a control accessible."
        ],
        "video": {
          "title": "Accessible Interactive Components tutorial",
          "url": "https://www.youtube.com/results?search_query=Bootstrap%20%26%20Responsive%20UI%20Accessible%20Interactive%20Components%20tutorial"
        }
      },
      {
        "id": "bootstrap-responsive-ui-m5",
        "title": "Responsive UI Verification",
        "duration": "40 min",
        "summary": "Practice responsive ui verification through a worked example and a short verification exercise.",
        "notes": [
          "Test around actual breakpoint boundaries rather than only one phone and one desktop size.",
          "Use realistic long titles and error messages to reveal wrapping and overflow problems.",
          "Check custom CSS after framework styles so intended overrides are predictable and narrowly scoped."
        ],
        "video": {
          "title": "Responsive UI Verification tutorial",
          "url": "https://www.youtube.com/results?search_query=Bootstrap%20%26%20Responsive%20UI%20Responsive%20UI%20Verification%20tutorial"
        }
      }
    ],
    "quiz": [
      {
        "id": "bs-q1",
        "moduleId": "bs-grid",
        "difficulty": "easy",
        "topic": "Grid",
        "question": "How many columns are in the standard Bootstrap grid?",
        "options": [
          "12",
          "10",
          "8",
          "16"
        ],
        "correct": 0
      },
      {
        "id": "bs-q2",
        "moduleId": "bs-grid",
        "difficulty": "easy",
        "topic": "Containers",
        "question": "Which class commonly provides a responsive fixed-width container?",
        "options": [
          "container",
          "grid-root",
          "page",
          "wrapper-only"
        ],
        "correct": 0
      },
      {
        "id": "bs-q3",
        "moduleId": "bs-components",
        "difficulty": "easy",
        "topic": "Components",
        "question": "Which Bootstrap component is commonly used to group content in a bordered panel?",
        "options": [
          "Card",
          "Compiler",
          "Database",
          "Thread"
        ],
        "correct": 0
      },
      {
        "id": "bs-q4",
        "moduleId": "bs-grid",
        "difficulty": "medium",
        "topic": "Breakpoints",
        "question": "What does col-md-6 generally mean?",
        "options": [
          "Half width from the md breakpoint upward",
          "Six pixels wide",
          "Hidden on medium screens",
          "Six rows"
        ],
        "correct": 0
      },
      {
        "id": "bs-q5",
        "moduleId": "bs-utilities",
        "difficulty": "medium",
        "topic": "Spacing",
        "question": "Which prefix is commonly used for margin utilities?",
        "options": [
          "m-",
          "x-",
          "sql-",
          "js-"
        ],
        "correct": 0
      },
      {
        "id": "bs-q6",
        "moduleId": "bs-components",
        "difficulty": "medium",
        "topic": "Navigation",
        "question": "Which Bootstrap component is designed for site navigation?",
        "options": [
          "Navbar",
          "HashMap",
          "Promise",
          "Schema"
        ],
        "correct": 0
      },
      {
        "id": "bs-q7",
        "moduleId": "bootstrap-responsive-ui-m4",
        "difficulty": "medium",
        "topic": "Accessible Interactive Components",
        "question": "After a dialog closes, where should keyboard focus normally return?",
        "options": [
          "To an arbitrary hidden element",
          "Outside the browser",
          "Nowhere",
          "To the control that opened it"
        ],
        "correct": 3,
        "explanation": "Use native buttons for actions so keyboard activation works without custom event handling. For dialogs, provide an accessible name and verify focus enters and returns correctly. Use visible labels and text feedback with forms; styling alone does not make a control accessible."
      },
      {
        "id": "bs-q8",
        "moduleId": "bs-grid",
        "difficulty": "hard",
        "topic": "Layout reasoning",
        "question": "You want one column on phones and three equal columns on large screens. Which pattern is appropriate?",
        "options": [
          "col-12 col-lg-4",
          "col-4 only",
          "row-3",
          "display-sql"
        ],
        "correct": 0
      },
      {
        "id": "bs-q9",
        "moduleId": "bs-utilities",
        "difficulty": "hard",
        "topic": "Utility reasoning",
        "question": "A flex container should center items vertically. Which utility is appropriate?",
        "options": [
          "align-items-center",
          "text-center only",
          "m-auto always",
          "position-static"
        ],
        "correct": 0
      },
      {
        "id": "bs-q10",
        "moduleId": "bootstrap-responsive-ui-m5",
        "difficulty": "hard",
        "topic": "Responsive UI Verification",
        "question": "Cards overflow only with long titles at narrow widths. What is the best first step?",
        "options": [
          "Inspect widths and wrapping using realistic content",
          "Hide all titles",
          "Disable browser zoom",
          "Force every viewport to desktop width"
        ],
        "correct": 0,
        "explanation": "Test around actual breakpoint boundaries rather than only one phone and one desktop size. Use realistic long titles and error messages to reveal wrapping and overflow problems. Check custom CSS after framework styles so intended overrides are predictable and narrowly scoped."
      }
    ]
  },
  {
    "id": "git-github-essentials",
    "title": "Git & GitHub Essentials",
    "category": "Developer Tools",
    "level": "Beginner",
    "duration": "3h 40m",
    "description": "Track code changes, work with branches and collaborate through GitHub repositories.",
    "skills": [
      "Git",
      "GitHub",
      "Version Control"
    ],
    "interests": [
      "Developer Tools",
      "Programming",
      "Software Development"
    ],
    "nextCourseIds": [
      "fullstack-foundations"
    ],
    "modules": [
      {
        "id": "git-basics",
        "title": "Repositories & Commits",
        "duration": "45 min",
        "summary": "Create repositories and record meaningful changes.",
        "notes": [
          "Git tracks versions of files inside a repository.",
          "git add stages changes and git commit records a snapshot with a message.",
          "git status shows the current working-tree and staging state."
        ],
        "video": {
          "title": "Git and GitHub for Beginners",
          "url": "https://www.youtube.com/results?search_query=freeCodeCamp+Git+GitHub+beginners+course"
        }
      },
      {
        "id": "git-branches",
        "title": "Branches & Merging",
        "duration": "50 min",
        "summary": "Develop safely using branches and merge changes.",
        "notes": [
          "Branches allow independent lines of development.",
          "Merging combines branch histories and may require conflict resolution.",
          "Small focused commits make history easier to understand and review."
        ],
        "video": {
          "title": "Git Branching and Merging",
          "url": "https://www.youtube.com/results?search_query=Git+branching+merging+tutorial+beginners"
        }
      },
      {
        "id": "github-collab",
        "title": "GitHub Collaboration",
        "duration": "45 min",
        "summary": "Use remotes, pull requests and shared repositories.",
        "notes": [
          "A remote links the local repository to another repository such as one hosted on GitHub.",
          "git push sends local commits to a remote and git pull obtains remote changes.",
          "Pull requests provide a reviewable way to propose changes before merging."
        ],
        "video": {
          "title": "GitHub Pull Requests Tutorial",
          "url": "https://www.youtube.com/results?search_query=GitHub+pull+request+collaboration+tutorial+beginners"
        }
      },
      {
        "id": "git-github-essentials-m4",
        "title": "Undoing Changes Safely",
        "duration": "40 min",
        "summary": "Practice undoing changes safely through a worked example and a short verification exercise.",
        "notes": [
          "Use git diff and git status to identify exactly what changed before undoing anything.",
          "git restore can discard uncommitted file edits; review them first because discarded work may be lost.",
          "git revert creates a new commit that reverses an earlier commit without rewriting shared history."
        ],
        "video": {
          "title": "Undoing Changes Safely tutorial",
          "url": "https://www.youtube.com/results?search_query=Git%20%26%20GitHub%20Essentials%20Undoing%20Changes%20Safely%20tutorial"
        }
      },
      {
        "id": "git-github-essentials-m5",
        "title": "Ignore Rules and Conflict Resolution",
        "duration": "40 min",
        "summary": "Practice ignore rules and conflict resolution through a worked example and a short verification exercise.",
        "notes": [
          "A .gitignore file prevents matching untracked files from being added accidentally.",
          "Resolve conflicts by understanding both changes, editing the intended result and removing conflict markers.",
          "Stage the resolved files, run checks and complete the merge only after reviewing the combined behavior."
        ],
        "video": {
          "title": "Ignore Rules and Conflict Resolution tutorial",
          "url": "https://www.youtube.com/results?search_query=Git%20%26%20GitHub%20Essentials%20Ignore%20Rules%20and%20Conflict%20Resolution%20tutorial"
        }
      }
    ],
    "quiz": [
      {
        "id": "git-q1",
        "moduleId": "git-basics",
        "difficulty": "easy",
        "topic": "Git basics",
        "question": "Which command shows repository status?",
        "options": [
          "git status",
          "git css",
          "git table",
          "git start-server"
        ],
        "correct": 0
      },
      {
        "id": "git-q2",
        "moduleId": "git-basics",
        "difficulty": "easy",
        "topic": "Commits",
        "question": "Which command records staged changes as a commit?",
        "options": [
          "git commit",
          "git copy",
          "git run",
          "git deploy"
        ],
        "correct": 0
      },
      {
        "id": "git-q3",
        "moduleId": "git-branches",
        "difficulty": "easy",
        "topic": "Branches",
        "question": "Why are branches useful?",
        "options": [
          "They isolate lines of development",
          "They replace databases",
          "They format HTML",
          "They install Node.js"
        ],
        "correct": 0
      },
      {
        "id": "git-q4",
        "moduleId": "git-basics",
        "difficulty": "medium",
        "topic": "Staging",
        "question": "What does git add do?",
        "options": [
          "Stages changes for a future commit",
          "Uploads directly to production",
          "Deletes history",
          "Creates a CSS file"
        ],
        "correct": 0
      },
      {
        "id": "git-q5",
        "moduleId": "git-branches",
        "difficulty": "medium",
        "topic": "Merging",
        "question": "What is a merge conflict?",
        "options": [
          "Git cannot automatically combine overlapping changes",
          "A failed SQL login",
          "A CSS breakpoint",
          "A Java exception only"
        ],
        "correct": 0
      },
      {
        "id": "git-q6",
        "moduleId": "github-collab",
        "difficulty": "medium",
        "topic": "Remotes",
        "question": "Which command normally uploads local commits to a remote?",
        "options": [
          "git push",
          "git status",
          "git diff",
          "git init only"
        ],
        "correct": 0
      },
      {
        "id": "git-q7",
        "moduleId": "git-github-essentials-m4",
        "difficulty": "medium",
        "topic": "Undoing Changes Safely",
        "question": "Which command reverses a shared commit while retaining history?",
        "options": [
          "git revert",
          "git init",
          "git status",
          "git fetch"
        ],
        "correct": 0,
        "explanation": "Use git diff and git status to identify exactly what changed before undoing anything. git restore can discard uncommitted file edits; review them first because discarded work may be lost. git revert creates a new commit that reverses an earlier commit without rewriting shared history."
      },
      {
        "id": "git-q8",
        "moduleId": "git-branches",
        "difficulty": "hard",
        "topic": "Workflow reasoning",
        "question": "You must develop a risky feature without disturbing main. What should you do first?",
        "options": [
          "Create a feature branch",
          "Delete main",
          "Commit directly to every branch",
          "Remove Git"
        ],
        "correct": 0
      },
      {
        "id": "git-q9",
        "moduleId": "github-collab",
        "difficulty": "hard",
        "topic": "Remote sync",
        "question": "A teammate pushed changes you do not have. What action normally updates your local branch from the remote?",
        "options": [
          "git pull",
          "git init",
          "git add",
          "git tag only"
        ],
        "correct": 0
      },
      {
        "id": "git-q10",
        "moduleId": "git-github-essentials-m5",
        "difficulty": "hard",
        "topic": "Ignore Rules and Conflict Resolution",
        "question": "A merge conflict contains two useful changes. What should you do before committing?",
        "options": [
          "Always delete both changes",
          "Combine the intended changes and test the result",
          "Keep the conflict markers",
          "Ignore the file and assume Git fixes it"
        ],
        "correct": 1,
        "explanation": "A .gitignore file prevents matching untracked files from being added accidentally. Resolve conflicts by understanding both changes, editing the intended result and removing conflict markers. Stage the resolved files, run checks and complete the merge only after reviewing the combined behavior."
      }
    ]
  },
  {
    "id": "fullstack-foundations",
    "title": "Full-Stack Web Development Foundations",
    "category": "Full Stack",
    "level": "Intermediate",
    "duration": "4h 30m",
    "description": "Connect frontend interfaces, Node.js APIs and MySQL into a complete web application.",
    "skills": [
      "Full Stack",
      "REST API",
      "MySQL",
      "Node.js"
    ],
    "interests": [
      "Full Stack",
      "Web Development",
      "Backend",
      "Frontend"
    ],
    "nextCourseIds": [],
    "modules": [
      {
        "id": "fs-architecture",
        "title": "Full-Stack Architecture",
        "duration": "60 min",
        "summary": "Understand how browser, API server and database work together.",
        "notes": [
          "The frontend handles presentation and user interaction, while the backend applies business rules.",
          "REST APIs provide a structured bridge between frontend code and server-side logic.",
          "The database persists data that must survive browser refreshes and application restarts."
        ],
        "video": {
          "title": "Full Stack Architecture Explained",
          "url": "https://www.youtube.com/results?search_query=full+stack+web+application+architecture+frontend+backend+database"
        }
      },
      {
        "id": "fs-integration",
        "title": "Frontend ↔ API Integration",
        "duration": "65 min",
        "summary": "Use fetch to send and receive JSON while handling errors.",
        "notes": [
          "fetch sends HTTP requests from browser JavaScript to backend endpoints.",
          "Applications should check response status and display useful loading, success and error states.",
          "Authentication requests may need credentials such as a session cookie."
        ],
        "video": {
          "title": "JavaScript Fetch API Tutorial",
          "url": "https://www.youtube.com/results?search_query=JavaScript+fetch+API+REST+backend+tutorial"
        }
      },
      {
        "id": "fs-persistence",
        "title": "Persistence & Deployment Basics",
        "duration": "65 min",
        "summary": "Connect APIs to MySQL and prepare a complete application flow.",
        "notes": [
          "Backend routes should validate user input before executing database queries.",
          "Parameterized SQL queries keep data separate from SQL syntax.",
          "A complete flow connects registration, login, data operations and user-specific output."
        ],
        "video": {
          "title": "Node Express MySQL Full Stack Tutorial",
          "url": "https://www.youtube.com/results?search_query=Node+Express+MySQL+full+stack+tutorial"
        }
      },
      {
        "id": "fullstack-foundations-m4",
        "title": "End-to-End Input Validation",
        "duration": "40 min",
        "summary": "Practice end-to-end input validation through a worked example and a short verification exercise.",
        "notes": [
          "Validate inputs in the browser for quick feedback and again on the server for enforcement.",
          "Use parameterized SQL and explicit allowed values so untrusted input cannot change query structure.",
          "Define a response contract with predictable success and failure fields that the frontend can handle."
        ],
        "video": {
          "title": "End-to-End Input Validation tutorial",
          "url": "https://www.youtube.com/results?search_query=Full-Stack%20Web%20Development%20Foundations%20End-to-End%20Input%20Validation%20tutorial"
        }
      },
      {
        "id": "fullstack-foundations-m5",
        "title": "Testing the Complete Learning Flow",
        "duration": "40 min",
        "summary": "Practice testing the complete learning flow through a worked example and a short verification exercise.",
        "notes": [
          "Use an isolated learner account to verify enrollment, module progress, assessment unlock and reporting together.",
          "Simulate network and database failures to check loading controls recover and partial writes are rolled back.",
          "Check report values against stored progress and server-calculated scores rather than trusting browser state."
        ],
        "video": {
          "title": "Testing the Complete Learning Flow tutorial",
          "url": "https://www.youtube.com/results?search_query=Full-Stack%20Web%20Development%20Foundations%20Testing%20the%20Complete%20Learning%20Flow%20tutorial"
        }
      }
    ],
    "quiz": [
      {
        "id": "fs-q1",
        "moduleId": "fs-architecture",
        "difficulty": "easy",
        "topic": "Architecture",
        "question": "Which layer normally stores persistent learner records?",
        "options": [
          "Database",
          "CSS",
          "Browser cache only",
          "HTML heading"
        ],
        "correct": 0
      },
      {
        "id": "fs-q2",
        "moduleId": "fs-architecture",
        "difficulty": "easy",
        "topic": "Backend role",
        "question": "Which layer usually applies server-side business rules?",
        "options": [
          "Backend",
          "CSS stylesheet",
          "Image file",
          "Browser extension only"
        ],
        "correct": 0
      },
      {
        "id": "fs-q3",
        "moduleId": "fs-integration",
        "difficulty": "easy",
        "topic": "Fetch",
        "question": "Which browser API is commonly used to call REST endpoints?",
        "options": [
          "fetch",
          "paint",
          "querySQL directly from browser",
          "compileJava"
        ],
        "correct": 0
      },
      {
        "id": "fs-q4",
        "moduleId": "fs-integration",
        "difficulty": "medium",
        "topic": "JSON",
        "question": "Why do APIs often exchange JSON?",
        "options": [
          "It is a simple structured text format supported by JavaScript",
          "It is a database engine",
          "It replaces HTTP",
          "It styles pages"
        ],
        "correct": 0
      },
      {
        "id": "fs-q5",
        "moduleId": "fs-persistence",
        "difficulty": "medium",
        "topic": "Validation",
        "question": "Where should important server-side validation happen?",
        "options": [
          "Backend, even if frontend validation exists",
          "Only in CSS",
          "Only in the database name",
          "Nowhere"
        ],
        "correct": 0
      },
      {
        "id": "fs-q6",
        "moduleId": "fs-persistence",
        "difficulty": "medium",
        "topic": "SQL safety",
        "question": "What should be used when inserting user values into SQL queries?",
        "options": [
          "Parameterized queries/placeholders",
          "String concatenation for all inputs",
          "CSS variables",
          "HTML comments"
        ],
        "correct": 0
      },
      {
        "id": "fs-q7",
        "moduleId": "fullstack-foundations-m4",
        "difficulty": "medium",
        "topic": "End-to-End Input Validation",
        "question": "A browser dropdown prevents invalid counts. Why must the server validate counts too?",
        "options": [
          "Dropdowns automatically protect SQL",
          "Clients can send modified HTTP requests",
          "Server validation changes CSS",
          "Sessions validate every field automatically"
        ],
        "correct": 1,
        "explanation": "Validate inputs in the browser for quick feedback and again on the server for enforcement. Use parameterized SQL and explicit allowed values so untrusted input cannot change query structure. Define a response contract with predictable success and failure fields that the frontend can handle."
      },
      {
        "id": "fs-q8",
        "moduleId": "fs-architecture",
        "difficulty": "hard",
        "topic": "Data flow",
        "question": "A learner clicks Enroll. Which sequence is most appropriate?",
        "options": [
          "Frontend request → backend validation → database insert → JSON response → UI update",
          "Frontend edits MySQL directly → CSS update",
          "Database calls browser DOM directly",
          "HTML creates session without server"
        ],
        "correct": 0
      },
      {
        "id": "fs-q9",
        "moduleId": "fs-integration",
        "difficulty": "hard",
        "topic": "Error handling",
        "question": "The API responds with HTTP 400. What should the frontend generally do?",
        "options": [
          "Read/display the validation error instead of treating it as success",
          "Ignore the status",
          "Delete local files",
          "Restart Git"
        ],
        "correct": 0
      },
      {
        "id": "fs-q10",
        "moduleId": "fullstack-foundations-m5",
        "difficulty": "hard",
        "topic": "Testing the Complete Learning Flow",
        "question": "A course save fails after modules are inserted. Which result should an integration test require?",
        "options": [
          "A half-saved course is visible",
          "The browser invents a successful ID",
          "No course, modules or enrollment remain after rollback",
          "Only the title is saved"
        ],
        "correct": 2,
        "explanation": "Use an isolated learner account to verify enrollment, module progress, assessment unlock and reporting together. Simulate network and database failures to check loading controls recover and partial writes are rolled back. Check report values against stored progress and server-calculated scores rather than trusting browser state."
      }
    ]
  }
];
