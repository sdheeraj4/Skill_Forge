window.SF_NOTES = {
    "html-structure": {
        "concepts": [
            {
                "title": "Document structure",
                "text": "A modern HTML document begins with a doctype, then uses the html element as the root. The head stores metadata such as the character set, viewport information and page title, while the body contains the visible interface. Correct nesting matters because the browser converts this markup into a document tree that CSS and JavaScript later use."
            },
            {
                "title": "Elements and attributes",
                "text": "HTML elements describe content such as headings, paragraphs, links, images, lists and forms. Attributes configure those elements: href identifies a link destination, src identifies a resource, alt describes meaningful images, and type changes the behaviour of an input. Good markup chooses the element that best describes the content rather than using generic containers for everything."
            },
            {
                "title": "Semantic HTML",
                "text": "Semantic elements such as header, nav, main, section, article, aside and footer communicate the role of each region. They improve maintainability and provide landmarks that assistive technologies can use. Semantic HTML does not mean replacing every div; use a generic container when no element has a more accurate meaning."
            },
            {
                "title": "Forms and accessibility",
                "text": "Forms should pair every control with a meaningful label and use input types that match the data being collected. Native buttons, links, labels and headings already contain useful keyboard and accessibility behaviour. Starting with correct HTML usually produces a more robust interface than rebuilding basic controls with generic div elements."
            }
        ],
        "codeExample": {
            "title": "Semantic page example",
            "language": "html",
            "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>SkillForge</title>\n</head>\n<body>\n    <header>\n        <h1>SkillForge</h1>\n        <nav>\n            <a href=\"dashboard.html\">Dashboard</a>\n            <a href=\"courses.html\">Courses</a>\n        </nav>\n    </header>\n\n    <main>\n        <section>\n            <h2>Continue learning</h2>\n            <article>\n                <h3>JavaScript Foundations</h3>\n                <p>Resume your current course.</p>\n            </article>\n        </section>\n    </main>\n\n    <footer>© SkillForge</footer>\n</body>\n</html>",
            "explanation": [
                "The document declares its language and viewport before visible content begins.",
                "Semantic regions describe the purpose of each major area.",
                "Headings follow a logical hierarchy and links are used for navigation."
            ]
        },
        "diagram": {
            "title": "Semantic page hierarchy",
            "nodes": [
                "HTML document",
                "Header + navigation",
                "Main content",
                "Section / article",
                "Footer"
            ],
            "caption": "A browser reads the document as a hierarchy. Semantic regions make that hierarchy understandable to developers and assistive tools."
        },
        "applications": [
            "Landing pages, course pages, forms, dashboards and articles all begin with sound document structure."
        ],
        "commonMistakes": [
            "Using div for every region even when a semantic element fits better.",
            "Skipping heading levels for visual styling reasons.",
            "Using placeholder text instead of a persistent form label.",
            "Omitting alt text from meaningful images."
        ],
        "bestPractices": [
            "Write the HTML structure before styling it.",
            "Use one clear main content area.",
            "Keep heading order logical.",
            "Use native controls whenever possible."
        ],
        "extra": []
    },
    "css-styling": {
        "concepts": [
            {
                "title": "Selectors and the cascade",
                "text": "CSS rules target elements with selectors and assign visual properties. Several rules may match the same element, so the cascade considers origin, importance, specificity and source order. Reusable class selectors are usually easier to maintain than deeply nested or highly specific selectors."
            },
            {
                "title": "The box model",
                "text": "Every rendered element behaves like a rectangular box containing content, padding, border and margin. Padding creates space inside the border, while margin creates space outside it. Using box-sizing: border-box makes declared width and height include padding and border, which usually makes sizing more predictable."
            },
            {
                "title": "Typography and design tokens",
                "text": "Readable interfaces depend on font size, line height, contrast and spacing. CSS custom properties can hold repeated values such as brand colors, surface colors, border radii and spacing. This creates a small design system and makes dark/light theme changes easier."
            },
            {
                "title": "Interaction states",
                "text": "Interactive components should communicate hover, focus, active and disabled states. Pointer hover is helpful, but keyboard users rely on visible focus styles, so focus outlines should not be removed without an accessible replacement. Short transitions can make state changes feel smoother without distracting from the content."
            }
        ],
        "codeExample": {
            "title": "Reusable card styling",
            "language": "css",
            "code": ":root {\n    --primary: #6157f5;\n    --surface: #ffffff;\n    --border: #dedee8;\n    --radius: 16px;\n}\n\n* {\n    box-sizing: border-box;\n}\n\n.course-card {\n    padding: 20px;\n    background: var(--surface);\n    border: 1px solid var(--border);\n    border-radius: var(--radius);\n}\n\n.course-card:hover {\n    transform: translateY(-2px);\n}",
            "explanation": [
                "Custom properties centralize the important visual values.",
                "border-box keeps component dimensions easier to calculate.",
                "The hover change is small enough to signal interactivity without moving the layout dramatically."
            ]
        },
        "diagram": {
            "title": "CSS box model",
            "nodes": [
                "Margin",
                "Border",
                "Padding",
                "Content"
            ],
            "caption": "The four layers wrap from outside to inside. Understanding which layer creates space makes layout debugging much faster."
        },
        "applications": [
            "Cards, forms, navigation, dashboards and responsive components all depend on predictable CSS rules."
        ],
        "commonMistakes": [
            "Using fixed widths plus padding without understanding box sizing.",
            "Overusing !important.",
            "Removing keyboard focus indicators.",
            "Using low-contrast text colors."
        ],
        "bestPractices": [
            "Prefer reusable classes.",
            "Define common colors and spacing once.",
            "Test keyboard focus as well as hover.",
            "Keep selectors as simple as the component allows."
        ],
        "extra": []
    },
    "layout-responsive": {
        "concepts": [
            {
                "title": "Fluid foundations",
                "text": "Responsive design starts with flexible widths, max-width constraints, relative units and content that can wrap. A layout should naturally adapt before a media query is added. Functions such as min(), max() and clamp() help values scale within sensible limits."
            },
            {
                "title": "Flexbox",
                "text": "Flexbox arranges items along one main axis and is useful for navigation rows, button groups and aligned card content. justify-content controls distribution on the main axis, align-items controls the cross axis, and flex-wrap lets items move to additional lines when space becomes limited."
            },
            {
                "title": "CSS Grid",
                "text": "Grid manages rows and columns together, which makes it well suited to dashboards and card galleries. repeat(), minmax() and auto-fit can create responsive layouts that automatically add or remove columns as available width changes."
            },
            {
                "title": "Media queries",
                "text": "Media queries should solve actual layout failures rather than target a long list of device models. A mobile-first approach starts with the simplest narrow layout and adds enhancements when more space becomes available. Responsive design also considers touch targets, text zoom and user preferences such as reduced motion."
            }
        ],
        "codeExample": {
            "title": "Responsive card grid",
            "language": "css",
            "code": ".courses-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n    gap: 20px;\n}\n\n.page {\n    width: min(1120px, calc(100% - 32px));\n    margin-inline: auto;\n}\n\n@media (max-width: 820px) {\n    .page {\n        width: min(100% - 24px, 680px);\n    }\n}",
            "explanation": [
                "The grid chooses the number of columns automatically.",
                "Cards never become narrower than 240px.",
                "The page remains centered and leaves safe side spacing on smaller screens."
            ]
        },
        "diagram": {
            "title": "Responsive workflow",
            "nodes": [
                "Flexible base styles",
                "Flexbox / Grid",
                "Content reaches limit",
                "Add breakpoint",
                "Retest at many widths"
            ],
            "caption": "Responsive design is iterative: start fluid, observe where content fails, then add the smallest required adjustment."
        },
        "applications": [
            "Course catalogs, dashboards, authentication pages and learning workspaces need to remain usable on many viewport sizes."
        ],
        "commonMistakes": [
            "Creating device-specific layouts for every common phone size.",
            "Using absolute positioning for major page structure.",
            "Giving cards fixed widths that force horizontal scrolling.",
            "Testing only one mobile and one desktop width."
        ],
        "bestPractices": [
            "Design mobile-first.",
            "Use Grid/Flexbox before reaching for position hacks.",
            "Choose breakpoints based on content.",
            "Test long labels and zoomed text."
        ],
        "extra": []
    },
    "js-basics": {
        "concepts": [
            {
                "title": "Variables and values",
                "text": "JavaScript stores values in variables declared with const or let. const prevents reassignment of the binding, while let is appropriate when the value must change. JavaScript is dynamically typed, so the type belongs to the current value rather than being permanently attached to the variable."
            },
            {
                "title": "Data types and operators",
                "text": "Primitive values include strings, numbers, booleans, undefined, null, bigint and symbol. Objects, arrays and functions are reference values. Arithmetic, comparison and logical operators combine these values into expressions; strict equality (===) is normally preferred because it does not perform implicit type coercion."
            },
            {
                "title": "Conditional logic",
                "text": "if, else if and else select one branch based on boolean conditions. switch is useful when one expression is compared with several exact values. Clear conditions are easier to maintain when complex tests are stored in descriptively named variables instead of being repeated inline."
            },
            {
                "title": "Loops",
                "text": "for, while, do...while and for...of repeat work. for...of is especially readable for arrays when the index is not needed. Every loop must make progress toward termination; otherwise it can block the page or server with an infinite loop."
            }
        ],
        "codeExample": {
            "title": "Score classification",
            "language": "javascript",
            "code": "const score = 76;\nlet performance;\n\nif (score >= 90) {\n    performance = \"Excellent\";\n} else if (score >= 75) {\n    performance = \"Very Good\";\n} else if (score >= 60) {\n    performance = \"Good\";\n} else {\n    performance = \"Needs Improvement\";\n}\n\nconsole.log(performance);",
            "explanation": [
                "The conditions are evaluated from top to bottom.",
                "Only the first matching branch runs.",
                "The same pattern can drive SkillForge's performance labels."
            ],
            "output": "Very Good"
        },
        "diagram": {
            "title": "Decision flow",
            "nodes": [
                "Input value",
                "Evaluate condition",
                "Choose matching branch",
                "Produce result",
                "Continue program"
            ],
            "caption": "Control flow determines which statements execute and which are skipped."
        },
        "applications": [
            "Form validation, quiz scoring, progress calculations and UI state all use variables and control flow."
        ],
        "commonMistakes": [
            "Using == when strict equality is intended.",
            "Reassigning a const variable.",
            "Forgetting that form input values often start as strings.",
            "Creating a loop whose condition never changes."
        ],
        "bestPractices": [
            "Prefer const by default.",
            "Use meaningful condition names.",
            "Convert external input explicitly.",
            "Keep loops simple and bounded."
        ],
        "extra": []
    },
    "js-functions": {
        "concepts": [
            {
                "title": "Functions",
                "text": "Functions package reusable behaviour. Parameters describe incoming data, arguments are the actual values passed by a caller, and return sends a result back. Small functions with clear inputs and outputs are easier to test and reuse than large procedures that read and mutate many global values."
            },
            {
                "title": "Arrays",
                "text": "Arrays store ordered values and provide methods for common transformations. map creates a new array by transforming every item, filter keeps items matching a condition, find returns the first match, and reduce combines the collection into one accumulated result."
            },
            {
                "title": "Objects",
                "text": "Objects group related data under named properties, making them useful for entities such as learners, courses and quiz attempts. Dot notation is concise for known property names; bracket notation is useful when a key is computed dynamically."
            },
            {
                "title": "Destructuring and spread",
                "text": "Destructuring extracts selected properties or array items into variables. Spread syntax can create a shallow copy with modified fields, which is useful when UI code should avoid mutating shared state directly."
            }
        ],
        "codeExample": {
            "title": "Transform course data",
            "language": "javascript",
            "code": "const courses = [\n    { title: \"HTML\", completed: true },\n    { title: \"JavaScript\", completed: false },\n    { title: \"Node.js\", completed: true }\n];\n\nconst completedTitles = courses\n    .filter(course => course.completed)\n    .map(course => course.title);\n\nconsole.log(completedTitles);",
            "explanation": [
                "filter removes incomplete courses.",
                "map then extracts only the title from each remaining object.",
                "The original array is left unchanged."
            ],
            "output": "[\"HTML\", \"Node.js\"]"
        },
        "diagram": {
            "title": "Data transformation pipeline",
            "nodes": [
                "Array of objects",
                "filter()",
                "map()",
                "reduce() / final result"
            ],
            "caption": "Array methods can be chained into a readable sequence of selecting, transforming and summarizing data."
        },
        "applications": [
            "Dashboards commonly filter enrolled courses, map API records into cards and reduce quiz results into averages."
        ],
        "commonMistakes": [
            "Forgetting return in a block-bodied arrow callback.",
            "Mutating shared objects unexpectedly.",
            "Using map when filter or forEach better matches the intent.",
            "Writing one large function that fetches, calculates and renders everything."
        ],
        "bestPractices": [
            "Give functions one responsibility.",
            "Choose array methods by purpose.",
            "Use objects for named structured data.",
            "Prefer clear transformations over hidden mutation."
        ],
        "extra": []
    },
    "js-dom": {
        "concepts": [
            {
                "title": "The DOM tree",
                "text": "The browser parses HTML into the Document Object Model, a tree of nodes exposed through the document object. JavaScript can query that tree and change the visible page without reloading the whole document."
            },
            {
                "title": "Selecting and updating elements",
                "text": "querySelector returns the first element matching a CSS selector and querySelectorAll returns a collection of matches. textContent is the safest default for plain external text, while classList is useful for adding or removing state classes."
            },
            {
                "title": "Events",
                "text": "Events represent user or browser actions such as click, input, submit and keydown. addEventListener attaches handlers without overwriting existing behaviour. The event object exposes the target and lets a handler prevent default browser behaviour when the application intentionally replaces it."
            },
            {
                "title": "Event delegation",
                "text": "Most events bubble through ancestor elements. A parent can therefore listen for interactions from many child elements, which is especially useful for lists created dynamically after an API response. closest() helps determine whether the original target was inside an actionable control."
            }
        ],
        "codeExample": {
            "title": "Delegated course action",
            "language": "javascript",
            "code": "document.querySelector(\"#courseList\")?.addEventListener(\"click\", (event) => {\n    const button = event.target.closest(\"[data-course-id]\");\n    if (!button) return;\n\n    const courseId = button.dataset.courseId;\n    console.log(\"Open course:\", courseId);\n});",
            "explanation": [
                "Only one listener is attached to the list.",
                "closest() handles clicks on text or icons inside the button.",
                "The pattern continues to work for cards inserted later."
            ]
        },
        "diagram": {
            "title": "DOM interaction flow",
            "nodes": [
                "User action",
                "Browser event",
                "Event listener",
                "Application logic",
                "DOM update"
            ],
            "caption": "The DOM is where JavaScript turns data and user actions into visible interface changes."
        },
        "applications": [
            "Course-card buttons, forms, theme toggles, progress controls and quiz options all rely on DOM events."
        ],
        "commonMistakes": [
            "Using innerHTML with untrusted text.",
            "Attaching duplicate listeners on every re-render.",
            "Assuming querySelector always finds an element.",
            "Listening only for button click when form submit is the real interaction."
        ],
        "bestPractices": [
            "Use semantic controls.",
            "Prefer textContent for plain text.",
            "Use event delegation for dynamic collections.",
            "Keep event handlers small."
        ],
        "extra": []
    },
    "java-basics": {
        "concepts": [
            {
                "title": "Program structure",
                "text": "A Java application is built from classes. A standalone program normally begins in public static void main(String[] args). Source files are compiled by javac into JVM bytecode, then the java launcher executes that bytecode through the Java Virtual Machine."
            },
            {
                "title": "Types and variables",
                "text": "Java is statically typed. Primitive types include int, double, boolean and char; reference types include String, arrays and user-defined classes. The compiler checks assignments and method calls against these declared types before the program runs."
            },
            {
                "title": "Operators and decisions",
                "text": "Arithmetic and comparison operators build expressions, while &&, || and ! combine boolean conditions. if/else handles general decisions and switch is useful for exact alternatives. Strings should be compared by content with equals(), not with ==."
            },
            {
                "title": "Loops",
                "text": "for loops are useful when the iteration pattern is known, while and do-while repeat based on a condition, and enhanced for loops traverse arrays or collections directly. Casting may be required when an arithmetic expression would otherwise use integer division."
            }
        ],
        "codeExample": {
            "title": "Simple Java program",
            "language": "java",
            "code": "public class Main {\n    public static void main(String[] args) {\n        int[] scores = {80, 90, 70, 100};\n        int total = 0;\n\n        for (int score : scores) {\n            total += score;\n        }\n\n        double average = (double) total / scores.length;\n        System.out.println(\"Average = \" + average);\n    }\n}",
            "explanation": [
                "The enhanced for loop reads every array value.",
                "Casting total to double prevents integer division.",
                "The compiler checks the declared types before execution."
            ],
            "output": "Average = 85.0"
        },
        "diagram": {
            "title": "Java execution path",
            "nodes": [
                "Main.java",
                "javac compiler",
                ".class bytecode",
                "JVM",
                "Program output"
            ],
            "caption": "Java separates source compilation from bytecode execution, which is why the same bytecode can run on different systems with a compatible JVM."
        },
        "applications": [
            "Console utilities, backend services and object-oriented applications all begin with the same type and control-flow fundamentals."
        ],
        "commonMistakes": [
            "Comparing String values with ==.",
            "Performing integer division accidentally.",
            "Using an uninitialized local variable.",
            "Creating non-terminating loops."
        ],
        "bestPractices": [
            "Use meaningful types and names.",
            "Keep braces consistent.",
            "Use equals() for String content.",
            "Let compiler errors guide corrections early."
        ],
        "extra": []
    },
    "java-oop": {
        "concepts": [
            {
                "title": "Classes and objects",
                "text": "A class is a blueprint containing fields and methods; an object is a particular instance created from that blueprint. Constructors initialize a new instance and should establish a valid starting state."
            },
            {
                "title": "Encapsulation",
                "text": "Encapsulation keeps fields private and exposes controlled behaviour through methods. Instead of letting any code assign arbitrary values, the class can validate changes and protect its own invariants."
            },
            {
                "title": "Inheritance and composition",
                "text": "Inheritance models a true 'is-a' specialization, while composition models 'has-a' collaboration. Composition is often more flexible because one object can delegate work to another without creating a deep type hierarchy."
            },
            {
                "title": "Polymorphism and abstraction",
                "text": "Interfaces and parent types let different concrete objects be used through one contract. When an overridden method is invoked, Java dispatches to the implementation belonging to the actual runtime object."
            }
        ],
        "codeExample": {
            "title": "Encapsulated learner",
            "language": "java",
            "code": "class Learner {\n    private String name;\n    private int completedCourses;\n\n    Learner(String name) {\n        this.name = name;\n    }\n\n    void completeCourse() {\n        completedCourses++;\n    }\n\n    int getCompletedCourses() {\n        return completedCourses;\n    }\n}",
            "explanation": [
                "The fields are private.",
                "Callers can change state only through meaningful methods.",
                "The constructor guarantees every learner starts with a name."
            ]
        },
        "diagram": {
            "title": "OOP model",
            "nodes": [
                "Class blueprint",
                "Object instance",
                "Private state",
                "Public behaviour",
                "Interface / polymorphism"
            ],
            "caption": "Objects combine state and behaviour, while abstraction controls how other parts of the program interact with them."
        },
        "applications": [
            "Learners, courses, reports and notification strategies can all be modeled as objects with clear responsibilities."
        ],
        "commonMistakes": [
            "Making all fields public.",
            "Using inheritance only for code reuse.",
            "Creating deep class hierarchies.",
            "Forgetting @Override on intended overrides."
        ],
        "bestPractices": [
            "Protect state behind methods.",
            "Prefer composition unless inheritance expresses a real relationship.",
            "Use small interfaces.",
            "Keep classes focused."
        ],
        "extra": []
    },
    "java-collections": {
        "concepts": [
            {
                "title": "List, Set and Map",
                "text": "List preserves order and allows duplicates, Set represents unique values, and Map associates keys with values. Common implementations include ArrayList, HashSet and HashMap. Code often declares variables using the interface type so the implementation can change later."
            },
            {
                "title": "Generics and iteration",
                "text": "Generic type parameters such as List<String> provide compile-time type safety. Collections can be traversed with enhanced for loops, iterators or streams. When removing during iteration, use safe mechanisms such as Iterator.remove or removeIf."
            },
            {
                "title": "Exceptions",
                "text": "Exceptions represent abnormal conditions. try contains work that may fail, catch handles a matching exception, and finally is used for cleanup logic that must run regardless of success or failure. Catch the most specific exception you can actually handle."
            },
            {
                "title": "Resource safety",
                "text": "Files, streams and JDBC objects should be closed. try-with-resources automatically closes AutoCloseable resources even when an exception occurs, which is safer than relying on manual cleanup."
            }
        ],
        "codeExample": {
            "title": "Collections and validation",
            "language": "java",
            "code": "List<Integer> scores = new ArrayList<>(List.of(40, 82, 55, 91));\nscores.removeIf(score -> score < 60);\n\nMap<String, Integer> courseScores = new HashMap<>();\ncourseScores.put(\"Java\", 92);\n\nSystem.out.println(scores);\nSystem.out.println(courseScores.get(\"Java\"));",
            "explanation": [
                "removeIf safely filters the mutable list.",
                "The map provides key-based lookup.",
                "Generics ensure only the expected value types are stored."
            ],
            "output": "[82, 91]\n92"
        },
        "diagram": {
            "title": "Exception path",
            "nodes": [
                "Normal operation",
                "Exception thrown",
                "Matching catch",
                "Cleanup",
                "Continue / report"
            ],
            "caption": "Exception handling keeps recovery logic separate from the normal path and guarantees that necessary cleanup can still happen."
        },
        "applications": [
            "Collections store learners, skills and scores; exception handling protects file, input and database operations."
        ],
        "commonMistakes": [
            "Using raw collections without generic types.",
            "Catching Exception and ignoring it.",
            "Modifying a collection unsafely while iterating.",
            "Forgetting to close resources."
        ],
        "bestPractices": [
            "Choose collections by required behaviour.",
            "Catch specific exceptions.",
            "Use try-with-resources.",
            "Preserve useful error context."
        ],
        "extra": []
    },
    "py-basics": {
        "concepts": [
            {
                "title": "Readable syntax",
                "text": "Python uses indentation rather than braces to define blocks. Consistent four-space indentation is therefore part of program correctness, not only formatting."
            },
            {
                "title": "Values and dynamic typing",
                "text": "Variables are created by assignment and can refer to values of different types over time. Common types include int, float, str, bool and None, while type() and isinstance() can inspect values when needed."
            },
            {
                "title": "Decisions",
                "text": "if, elif and else choose branches. Python supports chained comparisons such as 0 <= score <= 100 and uses and, or and not for boolean logic. Use == for value comparison and reserve is mainly for identity checks such as value is None."
            },
            {
                "title": "Loops",
                "text": "for iterates directly over iterables such as lists, ranges and strings; while repeats while a condition remains true. enumerate() provides indexes alongside values and often replaces manual counter logic."
            }
        ],
        "codeExample": {
            "title": "Python score classification",
            "language": "python",
            "code": "score = 76\n\nif score >= 90:\n    performance = \"Excellent\"\nelif score >= 75:\n    performance = \"Very Good\"\nelif score >= 60:\n    performance = \"Good\"\nelse:\n    performance = \"Needs Improvement\"\n\nprint(performance)",
            "explanation": [
                "Indentation defines each branch.",
                "Only the first true condition executes.",
                "The syntax stays compact without braces."
            ],
            "output": "Very Good"
        },
        "diagram": {
            "title": "Python decision flow",
            "nodes": [
                "Evaluate expression",
                "if",
                "elif alternatives",
                "else fallback",
                "Continue"
            ],
            "caption": "Only one branch of an if/elif/else chain runs, after which execution continues below the block."
        },
        "applications": [
            "Automation scripts, data processing and backend code all depend on these basic types and control structures."
        ],
        "commonMistakes": [
            "Mixing tabs and spaces.",
            "Using is for ordinary value equality.",
            "Shadowing built-ins such as list or str.",
            "Writing manual index loops where direct iteration is clearer."
        ],
        "bestPractices": [
            "Use snake_case names.",
            "Prefer direct iteration.",
            "Keep conditions readable.",
            "Use None explicitly for missing values."
        ],
        "extra": []
    },
    "py-functions": {
        "concepts": [
            {
                "title": "Functions and return values",
                "text": "Functions are defined with def and group reusable logic behind a name. Parameters describe the inputs and return sends a result back to the caller. A function with no explicit return produces None."
            },
            {
                "title": "Lists and tuples",
                "text": "Lists are mutable ordered collections and support operations such as append, remove, slicing and iteration. Tuples are ordered but immutable, which makes them useful for fixed groups of values."
            },
            {
                "title": "Sets and dictionaries",
                "text": "Sets store unique hashable values and are ideal for membership tests. Dictionaries map keys to values and work well for structured records such as course scores or user settings."
            },
            {
                "title": "Comprehensions and built-ins",
                "text": "List, set and dictionary comprehensions offer concise transformations when the expression stays readable. Built-ins such as sum, min, max, sorted, any and all reduce manual looping and often communicate intent more clearly."
            }
        ],
        "codeExample": {
            "title": "Process learner scores",
            "language": "python",
            "code": "attempts = [\n    {\"course\": \"HTML\", \"score\": 95},\n    {\"course\": \"JavaScript\", \"score\": 85},\n    {\"course\": \"Git\", \"score\": 90},\n]\n\naverage = sum(item[\"score\"] for item in attempts) / len(attempts)\npassed = [item[\"course\"] for item in attempts if item[\"score\"] >= 60]\n\nprint(round(average, 1))\nprint(passed)",
            "explanation": [
                "A generator expression supplies values directly to sum.",
                "A list comprehension filters and transforms in one readable step.",
                "The calculation is separate from presentation."
            ],
            "output": "90.0\n['HTML', 'JavaScript', 'Git']"
        },
        "diagram": {
            "title": "Collection choice",
            "nodes": [
                "Ordered + mutable → list",
                "Ordered + fixed → tuple",
                "Unique values → set",
                "Key/value lookup → dict"
            ],
            "caption": "Choose a collection according to the operations and meaning required by the data."
        },
        "applications": [
            "Lists of courses, dictionaries for profile data and sets of unique skills are common application patterns."
        ],
        "commonMistakes": [
            "Using a mutable list/dict as a default argument.",
            "Choosing a list when uniqueness is the real requirement.",
            "Writing deeply nested comprehensions.",
            "Assuming a dictionary key always exists."
        ],
        "bestPractices": [
            "Keep functions focused.",
            "Use collections by semantics.",
            "Use dict.get() for optional keys.",
            "Prefer simple comprehensions and normal loops for complex logic."
        ],
        "extra": []
    },
    "py-files": {
        "concepts": [
            {
                "title": "Opening files safely",
                "text": "open() creates a file object and accepts modes such as r, w and a. A with statement uses a context manager so the file is closed automatically even if an exception occurs."
            },
            {
                "title": "Reading and writing text",
                "text": "Text files should normally specify an encoding such as UTF-8. read() can load small files at once, while line-by-line iteration scales better for large files. Writing with mode w replaces existing content, so it should be used carefully."
            },
            {
                "title": "Exception handling",
                "text": "try contains work that may fail, except handles specific failures, else runs when no exception occurred, and finally runs regardless of the result. Catch only exceptions you can handle meaningfully."
            },
            {
                "title": "Raising errors",
                "text": "raise allows a function to enforce its contract. For example, invalid score ranges can produce ValueError. Clear error messages make failures easier for callers to diagnose and recover from."
            }
        ],
        "codeExample": {
            "title": "Read a saved score",
            "language": "python",
            "code": "try:\n    with open(\"score.txt\", \"r\", encoding=\"utf-8\") as file:\n        score = int(file.read().strip())\nexcept FileNotFoundError:\n    score = 0\nexcept ValueError:\n    print(\"Saved score is invalid.\")\n    score = 0\nelse:\n    print(\"Score loaded successfully.\")\n\nprint(score)",
            "explanation": [
                "The context manager closes the file automatically.",
                "A missing file and invalid content receive separate handling.",
                "The program recovers with a safe default."
            ]
        },
        "diagram": {
            "title": "Safe file flow",
            "nodes": [
                "Build path",
                "Open with context manager",
                "Read / write",
                "Handle specific exception",
                "Resource closes automatically"
            ],
            "caption": "Context managers provide deterministic cleanup, while exception handlers deal with recoverable failures."
        },
        "applications": [
            "Exporting a report, reading configuration and processing text files all use these patterns."
        ],
        "commonMistakes": [
            "Opening with w and unintentionally erasing content.",
            "Forgetting to close a file.",
            "Using a bare except.",
            "Building paths directly from untrusted input."
        ],
        "bestPractices": [
            "Use with for files.",
            "Specify UTF-8 for text.",
            "Catch narrow exception types.",
            "Validate data before using or saving it."
        ],
        "extra": []
    },
    "sql-relational": {
        "concepts": [
            {
                "title": "Tables, rows and columns",
                "text": "Relational databases store facts in tables. Columns define named attributes and data types, while rows represent individual records. A clear table should represent one entity or relationship and avoid storing several unrelated facts in one field."
            },
            {
                "title": "Primary keys",
                "text": "A primary key uniquely identifies each row and cannot be null. Auto-increment integer IDs are common surrogate keys, while stable natural identifiers can also work when they are truly unique and unlikely to change."
            },
            {
                "title": "Foreign keys",
                "text": "A foreign key stores the identifier of a related row and can enforce referential integrity. One-to-many relationships place the foreign key on the many side; many-to-many relationships use a junction table that references both entities."
            },
            {
                "title": "Constraints and normalization",
                "text": "NOT NULL, UNIQUE, CHECK and foreign-key constraints protect data quality inside the database. Normalization reduces duplication by storing each fact in one logical place, which prevents update anomalies and inconsistent copies."
            }
        ],
        "codeExample": {
            "title": "Learners and enrollments",
            "language": "sql",
            "code": "CREATE TABLE learners (\n    learner_id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(254) NOT NULL UNIQUE\n);\n\nCREATE TABLE enrollments (\n    learner_id INT NOT NULL,\n    course_id VARCHAR(80) NOT NULL,\n    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n    PRIMARY KEY (learner_id, course_id),\n    FOREIGN KEY (learner_id) REFERENCES learners(learner_id)\n);",
            "explanation": [
                "The learner table stores one row per learner.",
                "The enrollment table represents a relationship rather than duplicating learner details.",
                "The composite key prevents duplicate enrollment in the same course."
            ]
        },
        "diagram": {
            "title": "Relational relationship",
            "nodes": [
                "Learner",
                "Enrollment",
                "Course identity",
                "Progress",
                "Quiz result"
            ],
            "caption": "Keys connect independent tables so learner-specific state can be queried without duplicating the same facts repeatedly."
        },
        "applications": [
            "User accounts, enrollments, progress and quiz results are natural relational records in SkillForge."
        ],
        "commonMistakes": [
            "Using names as primary keys.",
            "Storing comma-separated IDs in one column.",
            "Duplicating user details in every enrollment row.",
            "Using mismatched data types for related keys."
        ],
        "bestPractices": [
            "Choose stable IDs.",
            "Use database constraints.",
            "Represent many-to-many relationships explicitly.",
            "Normalize enough to avoid duplicated facts."
        ],
        "extra": []
    },
    "sql-crud": {
        "concepts": [
            {
                "title": "Create with INSERT",
                "text": "INSERT adds rows. Listing the target columns makes a statement explicit and prevents accidental dependence on physical column order. Auto-generated IDs are usually omitted so the database can assign them."
            },
            {
                "title": "Read with SELECT",
                "text": "SELECT retrieves data. WHERE filters rows, ORDER BY controls sorting, LIMIT constrains result count and aggregate functions such as COUNT and AVG summarize groups of records."
            },
            {
                "title": "Update safely",
                "text": "UPDATE changes existing rows. A missing WHERE clause can modify an entire table, so the target condition should be tested carefully. Applications should also verify that a learner is authorized to change the selected record."
            },
            {
                "title": "Delete and parameterization",
                "text": "DELETE removes rows and carries the same WHERE-clause risk as UPDATE. In application code, external values should be passed as query parameters rather than concatenated into SQL strings; this keeps data separate from SQL syntax and prevents injection."
            }
        ],
        "codeExample": {
            "title": "CRUD examples",
            "language": "sql",
            "code": "INSERT INTO learners (name, email)\nVALUES ('Asha Rao', 'asha@example.com');\n\nSELECT id, name, email\nFROM learners\nWHERE email = 'asha@example.com';\n\nUPDATE learners\nSET name = 'Asha R.'\nWHERE id = 7;\n\nDELETE FROM learners\nWHERE id = 7;",
            "explanation": [
                "Each statement maps to one CRUD operation.",
                "The UPDATE and DELETE statements deliberately target one row.",
                "Application code should parameterize all external values rather than embedding them directly."
            ]
        },
        "diagram": {
            "title": "CRUD lifecycle",
            "nodes": [
                "Create → INSERT",
                "Read → SELECT",
                "Update → UPDATE ... WHERE",
                "Delete → DELETE ... WHERE"
            ],
            "caption": "CRUD is the foundation of most database-backed web application workflows."
        },
        "applications": [
            "Registration creates users, dashboards read state, profile screens update records and account-cleanup workflows may delete data."
        ],
        "commonMistakes": [
            "Running UPDATE/DELETE without WHERE.",
            "Concatenating form input into SQL.",
            "Using = NULL instead of IS NULL.",
            "Selecting unnecessary columns everywhere."
        ],
        "bestPractices": [
            "List columns explicitly.",
            "Parameterize values.",
            "Verify destructive conditions first.",
            "Use transactions for related writes."
        ],
        "extra": []
    },
    "sql-joins": {
        "concepts": [
            {
                "title": "INNER JOIN",
                "text": "INNER JOIN returns rows where the join condition matches on both tables. It is the right choice when a result only makes sense if both related records exist."
            },
            {
                "title": "LEFT JOIN",
                "text": "LEFT JOIN preserves every row from the left table and fills right-side columns with NULL when no match exists. This is useful for reports such as 'all users, including those with no quiz attempts'."
            },
            {
                "title": "Joining several relationships",
                "text": "Queries can join several tables, but developers must understand cardinality because one-to-many joins multiply rows. Aggregation with GROUP BY can then collapse those rows into one result per learner or course."
            },
            {
                "title": "Schema design and normalization",
                "text": "Good joins depend on sound relationships. Stable IDs, foreign keys and normalized tables make queries predictable. Denormalization can be useful in specialized performance cases, but it should be a measured trade-off rather than the default."
            }
        ],
        "codeExample": {
            "title": "Attempt count per learner",
            "language": "sql",
            "code": "SELECT u.id,\n       u.name,\n       COUNT(q.id) AS attempts\nFROM users AS u\nLEFT JOIN quiz_results AS q\n    ON q.user_id = u.id\nGROUP BY u.id, u.name\nORDER BY attempts DESC;",
            "explanation": [
                "LEFT JOIN keeps learners with zero attempts.",
                "COUNT(q.id) counts only matching quiz rows.",
                "GROUP BY returns one summary row per learner."
            ]
        },
        "diagram": {
            "title": "Join path",
            "nodes": [
                "users.id",
                "enrollments.user_id",
                "progress.user_id",
                "quiz_results.user_id",
                "Grouped report"
            ],
            "caption": "Joins follow shared keys; understanding those relationships is more reliable than joining by display text such as names."
        },
        "applications": [
            "Report cards and admin summaries frequently combine learner identity with enrollments, progress and results."
        ],
        "commonMistakes": [
            "Joining on names instead of IDs.",
            "Putting right-table filters in WHERE after a LEFT JOIN and removing unmatched rows.",
            "Ignoring row multiplication.",
            "Duplicating entity data into relationship tables."
        ],
        "bestPractices": [
            "Draw relationships before complex queries.",
            "Use aliases.",
            "Inspect raw rows before GROUP BY.",
            "Index frequently joined/filter columns when needed."
        ],
        "extra": []
    },
    "node-runtime": {
        "concepts": [
            {
                "title": "What Node.js provides",
                "text": "Node.js uses the V8 JavaScript engine and adds runtime APIs for files, networking, processes and the operating system. That allows JavaScript to build servers and command-line tools outside the browser."
            },
            {
                "title": "The process object",
                "text": "process exposes environment variables, command-line arguments, the current working directory and exit information. Server configuration such as ports and database credentials should come from the environment rather than being hard-coded into source files."
            },
            {
                "title": "Modules",
                "text": "CommonJS uses require() and module.exports, while ES modules use import/export when the project is configured for them. Modules split a program into focused files with explicit public interfaces."
            },
            {
                "title": "npm and dependencies",
                "text": "package.json records scripts, metadata and dependencies. package-lock.json pins the exact dependency tree for repeatable installs. Packages should be added deliberately because every dependency increases maintenance and security surface."
            }
        ],
        "codeExample": {
            "title": "CommonJS module",
            "language": "javascript",
            "code": "// learningEngine.js\nfunction performanceLabel(score) {\n    return score >= 90 ? \"Excellent\" : \"Keep learning\";\n}\n\nmodule.exports = { performanceLabel };\n\n// app.js\nconst { performanceLabel } = require(\"./learningEngine\");\nconsole.log(performanceLabel(95));",
            "explanation": [
                "One file exports a small public API.",
                "Another file imports only the function it needs.",
                "Node caches loaded CommonJS modules after resolution."
            ],
            "output": "Excellent"
        },
        "diagram": {
            "title": "Node runtime",
            "nodes": [
                "JavaScript source",
                "V8 engine",
                "Node runtime APIs",
                "Filesystem / network / OS",
                "Application output"
            ],
            "caption": "Node combines V8 with server-side APIs that are not normally available to browser JavaScript."
        },
        "applications": [
            "Express servers, command-line utilities, automation scripts and build tools all run on Node.js."
        ],
        "commonMistakes": [
            "Hard-coding secrets.",
            "Mixing module systems without understanding configuration.",
            "Installing packages for trivial built-in functionality.",
            "Ignoring lockfiles."
        ],
        "bestPractices": [
            "Use environment variables.",
            "Keep modules focused.",
            "Prefer built-ins when appropriate.",
            "Commit the lockfile for applications."
        ],
        "extra": []
    },
    "node-async": {
        "concepts": [
            {
                "title": "Non-blocking I/O",
                "text": "Node.js can start many I/O operations without waiting synchronously for each one to finish. While the operating system or runtime waits on network/file operations, the JavaScript thread can continue handling other ready work."
            },
            {
                "title": "Promises",
                "text": "A Promise represents a future result and can be pending, fulfilled or rejected. then/catch can consume that result; Promise.all is useful when independent operations can safely run concurrently."
            },
            {
                "title": "async/await",
                "text": "async functions return Promises, and await pauses only the current async function until a Promise settles. It does not block the whole Node process. try/catch provides natural error handling around awaited operations."
            },
            {
                "title": "The event loop",
                "text": "The event loop schedules ready JavaScript callbacks and promise continuations. Asynchronous I/O improves concurrency, but CPU-heavy synchronous work still blocks the event loop because JavaScript callbacks need the main thread."
            }
        ],
        "codeExample": {
            "title": "Concurrent async operations",
            "language": "javascript",
            "code": "async function loadPage() {\n    const [course, profile] = await Promise.all([\n        loadCourse(),\n        loadProfile()\n    ]);\n\n    return { course, profile };\n}\n\nloadPage()\n    .then(console.log)\n    .catch(console.error);",
            "explanation": [
                "Both independent operations start before either result is awaited.",
                "Promise.all fails if one member rejects.",
                "The caller still receives one Promise from the async function."
            ]
        },
        "diagram": {
            "title": "Simplified event loop",
            "nodes": [
                "JavaScript starts I/O",
                "Node/OS performs I/O",
                "Result becomes ready",
                "Event loop schedules callback",
                "JavaScript handles result"
            ],
            "caption": "Asynchronous I/O frees the JavaScript thread while waiting, but the continuation still runs only when the event loop can schedule it."
        },
        "applications": [
            "Database queries, file operations and HTTP requests should use asynchronous APIs in a web server."
        ],
        "commonMistakes": [
            "Assuming async/await creates a thread per request.",
            "Forgetting rejected Promise handling.",
            "Awaiting independent operations serially.",
            "Running CPU-heavy loops in request handlers."
        ],
        "bestPractices": [
            "Use async/await for readable flows.",
            "Run independent tasks concurrently where safe.",
            "Handle errors at clear boundaries.",
            "Keep synchronous tasks short."
        ],
        "extra": []
    },
    "node-http": {
        "concepts": [
            {
                "title": "HTTP request/response",
                "text": "A client sends a method, URL, headers and optionally a body. The server returns a status code, headers and optionally a response body. Node's http module exposes these protocol details directly."
            },
            {
                "title": "Methods and status codes",
                "text": "GET retrieves, POST commonly creates or triggers processing, PUT/PATCH update and DELETE removes. Status codes such as 200, 201, 400, 401, 404 and 500 communicate the outcome independently of response text."
            },
            {
                "title": "Bodies and JSON",
                "text": "Incoming request bodies arrive as chunks at the low level. A server collects them and parses JSON after the stream ends. Frameworks such as Express automate this repetitive parsing through middleware."
            },
            {
                "title": "Headers and CORS",
                "text": "Content-Type describes the representation. Cookies carry session identifiers. When frontend and backend origins differ, browser CORS rules determine whether JavaScript can access the response; credentialed requests require explicit allowed origins."
            }
        ],
        "codeExample": {
            "title": "Minimal Node HTTP server",
            "language": "javascript",
            "code": "const http = require(\"node:http\");\n\nconst server = http.createServer((req, res) => {\n    if (req.method === \"GET\" && req.url === \"/api/health\") {\n        res.writeHead(200, {\n            \"Content-Type\": \"application/json; charset=utf-8\"\n        });\n        return res.end(JSON.stringify({ api: \"ok\" }));\n    }\n\n    res.writeHead(404, {\n        \"Content-Type\": \"application/json; charset=utf-8\"\n    });\n    res.end(JSON.stringify({ message: \"Not found\" }));\n});\n\nserver.listen(5000);",
            "explanation": [
                "The method and path form a very small route.",
                "Every response includes an appropriate status and content type.",
                "Unmatched requests receive a 404."
            ]
        },
        "diagram": {
            "title": "HTTP lifecycle",
            "nodes": [
                "Client request",
                "Method + URL",
                "Route/business logic",
                "Status + headers",
                "Response body"
            ],
            "caption": "Every REST API call follows this request/response lifecycle even when a framework hides the low-level details."
        },
        "applications": [
            "Health checks and REST APIs are built on the same HTTP primitives."
        ],
        "commonMistakes": [
            "Sending a response twice.",
            "Using 200 for errors.",
            "Trusting JSON without validation.",
            "Using unsafe credentialed CORS settings."
        ],
        "bestPractices": [
            "Return clear status codes.",
            "Validate input.",
            "Set accurate Content-Type headers.",
            "Understand HTTP before relying on framework helpers."
        ],
        "extra": []
    },
    "express-routing": {
        "concepts": [
            {
                "title": "Express application",
                "text": "express() creates an application that receives requests through an ordered middleware stack. Route methods such as app.get and router.post combine an HTTP method, path and handler."
            },
            {
                "title": "Path and query parameters",
                "text": "Path parameters identify a resource, for example /courses/:courseId. Query strings provide optional controls such as search or filters. Incoming values should be validated and converted before business logic uses them."
            },
            {
                "title": "Router modules",
                "text": "express.Router() groups related endpoints so server.js can remain focused on global configuration. A course router, auth router and learning router can each expose a focused API surface."
            },
            {
                "title": "Route order and fallbacks",
                "text": "Express checks registrations in order. Specific application routes must appear before a final 404 handler. Error-handling middleware is also registered after normal routes so unexpected failures can be centralized."
            }
        ],
        "codeExample": {
            "title": "Course route",
            "language": "javascript",
            "code": "router.get(\"/courses/:courseId\", (req, res) => {\n    const course = courses.find(\n        item => item.id === req.params.courseId\n    );\n\n    if (!course) {\n        return res.status(404).json({\n            message: \"Course not found.\"\n        });\n    }\n\n    res.json({ course });\n});",
            "explanation": [
                "The route parameter identifies one course.",
                "A missing resource returns 404 immediately.",
                "The success response uses a stable JSON wrapper."
            ]
        },
        "diagram": {
            "title": "Express routing flow",
            "nodes": [
                "HTTP request",
                "Global middleware",
                "Router",
                "Matching handler",
                "JSON response"
            ],
            "caption": "Express walks the middleware stack in registration order until a handler completes the request or passes an error onward."
        },
        "applications": [
            "SkillForge separates authentication, course and learning endpoints into route modules."
        ],
        "commonMistakes": [
            "Placing a catch-all before real routes.",
            "Sending two responses.",
            "Putting every route in server.js.",
            "Using query parameters for primary resource identity."
        ],
        "bestPractices": [
            "Use Router modules.",
            "Validate parameters.",
            "Return after early responses.",
            "Keep fallbacks last."
        ],
        "extra": []
    },
    "express-middleware": {
        "concepts": [
            {
                "title": "Middleware mechanics",
                "text": "A middleware function receives req, res and next. It can read or change the request, send a response, or call next() so processing continues. If it does neither, the request hangs."
            },
            {
                "title": "Authentication",
                "text": "Session middleware can identify the current learner before protected routes run. Authentication asks 'who is this user?', while authorization asks 'may this authenticated user perform this action?'."
            },
            {
                "title": "Validation",
                "text": "JSON parsing does not guarantee that a request is valid for the application. Server-side validation must check required fields, types, ranges and supported values even if the frontend already validates for user experience."
            },
            {
                "title": "Error handling",
                "text": "Express recognizes error middleware by its four parameters. A central handler can log detailed diagnostics on the server while returning a safe, consistent error message to the client."
            }
        ],
        "codeExample": {
            "title": "Authentication middleware",
            "language": "javascript",
            "code": "function requireAuth(req, res, next) {\n    if (!req.session?.userId) {\n        return res.status(401).json({\n            message: \"Login required.\"\n        });\n    }\n\n    next();\n}\n\nrouter.get(\"/my-learning\", requireAuth, getMyLearning);",
            "explanation": [
                "The guard ends unauthenticated requests with 401.",
                "Authenticated requests continue to the route handler.",
                "The route does not trust a user ID from the browser."
            ]
        },
        "diagram": {
            "title": "Middleware pipeline",
            "nodes": [
                "Request",
                "CORS / JSON parser",
                "Authentication",
                "Validation",
                "Route handler",
                "Response / error handler"
            ],
            "caption": "Middleware composes reusable request-processing stages before and after application logic."
        },
        "applications": [
            "Session authentication, CORS, input validation and error handling are natural middleware responsibilities."
        ],
        "commonMistakes": [
            "Forgetting next().",
            "Trusting client-side validation only.",
            "Using body userId instead of the session user.",
            "Returning raw stack traces."
        ],
        "bestPractices": [
            "Keep middleware focused.",
            "Validate server-side.",
            "Separate authentication and authorization.",
            "Centralize unexpected errors."
        ],
        "extra": []
    },
    "rest-design": {
        "concepts": [
            {
                "title": "Resource-oriented URLs",
                "text": "REST-style APIs usually model nouns such as courses, users and quiz results rather than action-heavy URLs. GET /courses and GET /courses/:courseId are easier to predict than separate endpoints such as /getCourses and /getOneCourse."
            },
            {
                "title": "HTTP methods and status codes",
                "text": "Method semantics are part of the API contract. GET retrieves, POST creates or triggers processing, PUT/PATCH update and DELETE removes. Status codes tell the client whether the operation succeeded, failed validation, lacked authentication, could not find a resource or encountered an unexpected server error."
            },
            {
                "title": "Consistent response shapes",
                "text": "Frontend code becomes simpler when successful and error responses follow stable structures. A course response can use { course: ... }, while errors can consistently use { message: ... } and optional structured validation details."
            },
            {
                "title": "Safe API evolution",
                "text": "A small lab project may not need formal API versioning, but predictable naming and documentation still matter. Breaking changes should be deliberate and synchronized with every frontend consumer rather than introduced accidentally."
            }
        ],
        "codeExample": {
            "title": "Clear REST responses",
            "language": "javascript",
            "code": "router.get(\"/courses/:courseId\", (req, res) => {\n    const course = findCourse(req.params.courseId);\n\n    if (!course) {\n        return res.status(404).json({\n            message: \"Course not found.\"\n        });\n    }\n\n    res.status(200).json({ course });\n});",
            "explanation": [
                "The URL identifies a course resource.",
                "The HTTP status communicates the outcome.",
                "The JSON body supplies either the resource or an explanatory message."
            ]
        },
        "diagram": {
            "title": "REST contract",
            "nodes": [
                "Resource URL",
                "HTTP method",
                "Validated input",
                "Business operation",
                "Status + JSON"
            ],
            "caption": "A predictable REST API aligns URL structure, method semantics and response status."
        },
        "applications": [
            "Course catalogs, enrollment, progress and report cards are all easier to integrate when endpoints follow one consistent pattern."
        ],
        "commonMistakes": [
            "Using action names everywhere in URLs.",
            "Returning 200 for every error.",
            "Leaking internal exceptions.",
            "Changing response field names without updating clients."
        ],
        "bestPractices": [
            "Use nouns for resources.",
            "Use accurate status codes.",
            "Keep JSON shapes stable.",
            "Document authentication and request/response expectations."
        ],
        "extra": []
    },
    "bs-grid": {
        "concepts": [
            {
                "title": "Containers and rows",
                "text": "Bootstrap's grid begins with a container that constrains page width and applies responsive side padding. Rows create flex containers for columns and manage gutters."
            },
            {
                "title": "The 12-column system",
                "text": "Column classes express how much of a 12-column row an item occupies. col-12 fills the row, col-6 takes half and col-4 takes one third. Auto-layout .col classes share the remaining width equally."
            },
            {
                "title": "Responsive breakpoints",
                "text": "Breakpoint prefixes such as md and lg apply a column size only from that breakpoint upward. A card can therefore be full width on a phone, half width on a tablet and one-third width on a desktop."
            },
            {
                "title": "Alignment and nesting",
                "text": "Grid columns inherit flexbox alignment tools, while nested rows can create sub-layouts when genuinely needed. Visual ordering should not make the semantic source order confusing for keyboard and screen-reader users."
            }
        ],
        "codeExample": {
            "title": "Responsive course grid",
            "language": "html",
            "code": "<div class=\"container py-4\">\n    <div class=\"row g-4\">\n        <div class=\"col-12 col-md-6 col-lg-4\">\n            <article class=\"card h-100\">Course 1</article>\n        </div>\n        <div class=\"col-12 col-md-6 col-lg-4\">\n            <article class=\"card h-100\">Course 2</article>\n        </div>\n        <div class=\"col-12 col-md-6 col-lg-4\">\n            <article class=\"card h-100\">Course 3</article>\n        </div>\n    </div>\n</div>",
            "explanation": [
                "Cards stack on small screens.",
                "From md they form two columns.",
                "From lg they form three columns."
            ]
        },
        "diagram": {
            "title": "Bootstrap grid",
            "nodes": [
                "Container",
                "Row",
                "12 logical columns",
                "Breakpoint sizing",
                "Responsive reflow"
            ],
            "caption": "Bootstrap layers breakpoint-aware column sizes on top of a flexbox-based row system."
        },
        "applications": [
            "Course catalogs, dashboards, forms and marketing sections can be laid out quickly with the grid."
        ],
        "commonMistakes": [
            "Putting columns outside rows.",
            "Designing only the desktop width.",
            "Changing visual order in a way that harms source order.",
            "Over-nesting grids."
        ],
        "bestPractices": [
            "Start mobile-first.",
            "Use gutter classes consistently.",
            "Keep semantic markup inside layout wrappers.",
            "Use custom CSS when the grid does not fit the component."
        ],
        "extra": []
    },
    "bs-components": {
        "concepts": [
            {
                "title": "Cards and content components",
                "text": "Bootstrap cards group related content and actions in a reusable container. Components provide presentation conventions, but the semantic HTML inside them still determines meaning and accessibility."
            },
            {
                "title": "Navigation",
                "text": "Navbars and nav links provide common responsive navigation patterns. Active state should be visible and, where appropriate, include aria-current so assistive technologies also understand which page is current."
            },
            {
                "title": "Forms",
                "text": "Classes such as form-label, form-control and form-select style native controls without replacing their semantics. Labels, input types, required rules and validation messages remain essential."
            },
            {
                "title": "JavaScript-powered components",
                "text": "Modals, dropdowns, collapse, offcanvas and tooltips depend on Bootstrap's JavaScript. Their documented structure and accessibility attributes should be kept intact rather than copied only for appearance."
            }
        ],
        "codeExample": {
            "title": "Course card component",
            "language": "html",
            "code": "<article class=\"card h-100\">\n    <div class=\"card-body\">\n        <span class=\"badge text-bg-primary\">Beginner</span>\n        <h3 class=\"h5 mt-3\">JavaScript Foundations</h3>\n        <p class=\"card-text\">\n            Learn syntax, functions and browser interaction.\n        </p>\n        <a class=\"btn btn-primary\" href=\"course.html\">\n            View course\n        </a>\n    </div>\n</article>",
            "explanation": [
                "The article element describes independent content.",
                "Bootstrap classes provide layout and appearance.",
                "The action remains a real navigation link."
            ]
        },
        "diagram": {
            "title": "Component anatomy",
            "nodes": [
                "Semantic element",
                "Bootstrap classes",
                "Optional data attributes",
                "Bootstrap JS when needed",
                "Accessible result"
            ],
            "caption": "Bootstrap components work best when framework classes enhance correct HTML rather than replacing it."
        },
        "applications": [
            "Cards, navbars, alerts, forms and modals can accelerate a consistent interface."
        ],
        "commonMistakes": [
            "Using components without required labels.",
            "Forgetting Bootstrap JS for interactive components.",
            "Showing invalid colors without feedback text.",
            "Using components only because they look impressive."
        ],
        "bestPractices": [
            "Start with semantic HTML.",
            "Use only the component pieces you need.",
            "Follow documented accessibility guidance.",
            "Keep labels and actions explicit."
        ],
        "extra": []
    },
    "bs-utilities": {
        "concepts": [
            {
                "title": "Spacing utilities",
                "text": "Classes such as mt-3, px-4 and gap-2 apply values from Bootstrap's spacing scale. Consistent scale values keep interfaces more coherent than arbitrary one-off margins."
            },
            {
                "title": "Display and flex utilities",
                "text": "d-flex, align-items-center, justify-content-between and flex-wrap expose common flexbox behaviour directly in markup. Responsive variants can change display or alignment at specific breakpoints."
            },
            {
                "title": "Color and theme variables",
                "text": "Bootstrap uses CSS custom properties extensively, which makes theme and brand adjustments possible without rewriting every component rule. Contrast still needs to be checked in every theme."
            },
            {
                "title": "When to write custom CSS",
                "text": "Utilities are best for small local composition. If the same long group of utilities is repeated many times, a semantic component class may communicate the design more clearly and reduce duplication."
            }
        ],
        "codeExample": {
            "title": "Utility-composed header",
            "language": "html",
            "code": "<div class=\"d-flex flex-column flex-md-row\n            gap-3 align-items-md-center\n            justify-content-between p-4\">\n    <div>\n        <h1 class=\"h3 mb-1\">My Learning</h1>\n        <p class=\"text-body-secondary mb-0\">\n            Continue where you left off.\n        </p>\n    </div>\n    <a class=\"btn btn-primary\" href=\"courses.html\">\n        Explore courses\n    </a>\n</div>",
            "explanation": [
                "The layout stacks on small screens.",
                "It becomes a horizontal flex row from md upward.",
                "Spacing and typography use the framework's shared scale."
            ]
        },
        "diagram": {
            "title": "Styling decision",
            "nodes": [
                "One small adjustment → utility",
                "Responsive variation → responsive utility",
                "Repeated pattern → component class",
                "Brand change → theme variables"
            ],
            "caption": "Utilities and custom CSS are complementary rather than competing approaches."
        },
        "applications": [
            "Spacing, alignment, responsive display and color adjustments are common places for utilities."
        ],
        "commonMistakes": [
            "Creating unreadably long class lists.",
            "Hiding important controls on mobile.",
            "Hard-coding theme colors repeatedly.",
            "Fighting Bootstrap with highly specific overrides."
        ],
        "bestPractices": [
            "Use utilities for simple composition.",
            "Extract repeated patterns.",
            "Centralize theme values.",
            "Test both responsive and dark/light states."
        ],
        "extra": []
    },
    "git-basics": {
        "concepts": [
            {
                "title": "Repository and working tree",
                "text": "A Git repository stores version history for a project. The working tree contains the files you are currently editing, while git status compares that state with Git's tracked snapshots."
            },
            {
                "title": "Staging area",
                "text": "git add copies selected changes into the staging area, which is the proposed content for the next commit. This allows one working session to contain several changes while each commit remains focused."
            },
            {
                "title": "Commits",
                "text": "git commit records the staged snapshot with author information and a message. A useful message explains the purpose of the change so future developers can understand history without opening every diff."
            },
            {
                "title": "Undoing safely",
                "text": "git restore can discard or unstage local changes, while git revert creates a new commit that reverses an earlier commit. Revert is generally safer for shared history because it does not rewrite commits already used by others."
            }
        ],
        "codeExample": {
            "title": "Basic Git workflow",
            "language": "bash",
            "code": "git status\ngit add SkillForge-Frontend/js/learn.js\ngit diff --staged\ngit commit -m \"Open module notes in dedicated reader\"\ngit log --oneline -5",
            "explanation": [
                "status shows current repository state.",
                "diff --staged verifies the exact next commit.",
                "The commit message describes a meaningful project change."
            ]
        },
        "diagram": {
            "title": "Git local workflow",
            "nodes": [
                "Working tree",
                "git add",
                "Staging area",
                "git commit",
                "Repository history"
            ],
            "caption": "A file change moves through distinct states before it becomes part of permanent project history."
        },
        "applications": [
            "Feature development, bug fixes and project experiments all become safer when changes are recorded in small commits."
        ],
        "commonMistakes": [
            "Running git add . without review.",
            "Committing .env secrets.",
            "Writing vague messages.",
            "Using destructive restore/reset without understanding the loss."
        ],
        "bestPractices": [
            "Check status frequently.",
            "Review diffs before commit.",
            "Keep commits focused.",
            "Ignore secrets and generated files."
        ],
        "extra": []
    },
    "git-branches": {
        "concepts": [
            {
                "title": "Branches",
                "text": "A branch is a movable name pointing to a commit. Creating a feature branch lets new commits advance independently while main stays at its previous stable point."
            },
            {
                "title": "Merging",
                "text": "Merging integrates histories. A fast-forward simply moves the target branch forward when no divergence occurred; otherwise Git may create a merge commit with both histories as parents."
            },
            {
                "title": "Conflicts",
                "text": "A merge conflict appears when Git cannot safely choose between overlapping changes. The developer must inspect both versions, decide the correct final code, remove conflict markers, stage the result and validate the project."
            },
            {
                "title": "Practical workflow",
                "text": "Small teams benefit from short-lived feature branches and frequent integration. Rebase can create a linear history but rewrites commit identities, so it should be used carefully on branches already shared with others."
            }
        ],
        "codeExample": {
            "title": "Feature branch workflow",
            "language": "bash",
            "code": "git switch main\ngit pull\ngit switch -c feature/notes-reader\n\n# make changes\ngit add .\ngit commit -m \"Add notes reader\"\n\ngit switch main\ngit merge feature/notes-reader",
            "explanation": [
                "The feature starts from an updated main branch.",
                "Work is isolated until it is committed.",
                "The final merge integrates it back into main."
            ]
        },
        "diagram": {
            "title": "Branch lifecycle",
            "nodes": [
                "main",
                "Create feature branch",
                "Feature commits",
                "Merge / resolve conflicts",
                "Updated main"
            ],
            "caption": "Branches isolate lines of work and allow integration only after the change is ready."
        },
        "applications": [
            "A notes-reader feature can be developed without destabilizing the current working main branch."
        ],
        "commonMistakes": [
            "Starting from an outdated base.",
            "Keeping one side of a conflict without understanding it.",
            "Rewriting shared history.",
            "Letting branches diverge for too long."
        ],
        "bestPractices": [
            "Use purpose-based branch names.",
            "Integrate often.",
            "Run tests after merges.",
            "Treat conflicts as code-review decisions."
        ],
        "extra": []
    },
    "github-collab": {
        "concepts": [
            {
                "title": "Remotes",
                "text": "A remote is a named URL for another Git repository. origin usually refers to the repository from which the project was cloned. fetch downloads remote references, push uploads local commits and pull fetches then integrates according to configuration."
            },
            {
                "title": "Pull requests",
                "text": "A pull request proposes integrating one branch into another and provides a place for review, discussion and automated checks. It is a GitHub collaboration feature built around ordinary Git commits."
            },
            {
                "title": "Code review",
                "text": "Review examines correctness, readability, security and maintainability. Authors should respond to feedback with focused changes and re-run relevant tests before the pull request is merged."
            },
            {
                "title": "Repository hygiene",
                "text": "A useful repository includes a README, .gitignore, installation instructions and a history free of credentials. Issues can track work, while branch protection and automated checks can enforce team rules when needed."
            }
        ],
        "codeExample": {
            "title": "Publish a feature branch",
            "language": "bash",
            "code": "git switch -c feature/notes-reader\n# edit and commit files\ngit push -u origin feature/notes-reader\n\n# Open a pull request on GitHub:\n# feature/notes-reader -> main",
            "explanation": [
                "The branch is first created and committed locally.",
                "push publishes the branch to the hosted repository.",
                "GitHub can then compare it with main in a pull request."
            ]
        },
        "diagram": {
            "title": "GitHub collaboration",
            "nodes": [
                "Issue / task",
                "Feature branch",
                "Push",
                "Pull request + review",
                "Merge"
            ],
            "caption": "GitHub adds team coordination and review around Git's normal branch and commit model."
        },
        "applications": [
            "Team projects, open-source contributions and assessed projects benefit from visible reviewable history."
        ],
        "commonMistakes": [
            "Assuming unpushed commits are backed up by GitHub.",
            "Committing tokens/passwords.",
            "Opening huge mixed-purpose pull requests.",
            "Ignoring failed checks."
        ],
        "bestPractices": [
            "Push important work.",
            "Keep PRs focused.",
            "Document setup clearly.",
            "Protect credentials from the first commit."
        ],
        "extra": []
    },
    "fs-architecture": {
        "concepts": [
            {
                "title": "Frontend layer",
                "text": "The frontend presents information, collects input and calls backend APIs. It is responsible for interaction and rendering but is not a trusted security boundary because users control their browser."
            },
            {
                "title": "Backend layer",
                "text": "The backend authenticates users, validates requests, applies business rules and returns HTTP responses. It decides what the current learner is allowed to do and coordinates access to persistent data."
            },
            {
                "title": "Database layer",
                "text": "The database stores state that must survive server restarts, such as users, enrollments, progress and quiz results. Constraints and parameterized queries protect data integrity and security."
            },
            {
                "title": "Layer boundaries",
                "text": "A clean request flows from browser interaction to an API endpoint, through business logic and database access, then back as JSON for rendering. Keeping these boundaries clear makes debugging easier because each failure can be isolated to one layer."
            }
        ],
        "codeExample": {
            "title": "SkillForge API boundary",
            "language": "javascript",
            "code": "// Frontend\nconst { course } = await SkillForgeAPI.getCourse(courseId);\n\n// Backend\nrouter.get(\"/courses/:courseId\", (req, res) => {\n    const course = findCourse(req.params.courseId);\n    if (!course) {\n        return res.status(404).json({ message: \"Course not found.\" });\n    }\n    res.json({ course });\n});",
            "explanation": [
                "The browser asks for data through a stable API.",
                "The backend owns validation and response rules.",
                "The frontend renders the returned result rather than reading the database directly."
            ]
        },
        "diagram": {
            "title": "Full-stack architecture",
            "nodes": [
                "Browser UI",
                "Express REST API",
                "Authentication / business logic",
                "MySQL",
                "JSON back to browser"
            ],
            "caption": "Each layer has a focused responsibility and communicates through explicit boundaries."
        },
        "applications": [
            "SkillForge itself demonstrates the browser → Express → MySQL architecture."
        ],
        "commonMistakes": [
            "Putting database credentials in frontend code.",
            "Trusting frontend validation as security.",
            "Mixing SQL into every UI concern.",
            "Duplicating business rules differently on multiple pages."
        ],
        "bestPractices": [
            "Give each layer one clear responsibility.",
            "Validate and authorize server-side.",
            "Keep API contracts consistent.",
            "Persist only data that truly belongs in the database."
        ],
        "extra": []
    },
    "fs-integration": {
        "concepts": [
            {
                "title": "Fetch and JSON",
                "text": "fetch returns a Promise for an HTTP Response. HTTP errors such as 404 do not automatically reject the promise, so client code should check response.ok and then parse the response body."
            },
            {
                "title": "Sending request data",
                "text": "POST and update requests commonly send JSON with Content-Type: application/json. JSON.stringify converts the JavaScript object into request text; the backend parses and validates the values."
            },
            {
                "title": "Sessions and credentials",
                "text": "When authentication uses session cookies and frontend/backend run on different origins, fetch must include credentials and the server must allow the exact frontend origin with credentials enabled."
            },
            {
                "title": "Rendering success and failure",
                "text": "A robust page handles loading, success, empty data, authentication expiry and server/network errors. External text should be escaped before being inserted into HTML, or assigned using textContent."
            }
        ],
        "codeExample": {
            "title": "Reusable API request helper",
            "language": "javascript",
            "code": "async function apiRequest(endpoint, options = {}) {\n    const response = await fetch(\n        `http://127.0.0.1:5000/api${endpoint}`,\n        {\n            credentials: \"include\",\n            headers: {\n                Accept: \"application/json\",\n                ...(options.headers || {})\n            },\n            ...options\n        }\n    );\n\n    const data = await response.json().catch(() => ({}));\n\n    if (!response.ok) {\n        throw new Error(data.message || \"Request failed\");\n    }\n\n    return data;\n}",
            "explanation": [
                "Session credentials are sent consistently.",
                "JSON error bodies are converted into JavaScript errors.",
                "Pages can focus on rendering rather than repeating fetch boilerplate."
            ]
        },
        "diagram": {
            "title": "Frontend/API round trip",
            "nodes": [
                "User action",
                "fetch + session cookie",
                "Express route",
                "Database/course data",
                "JSON response",
                "DOM update"
            ],
            "caption": "Integration is a complete round trip, not only the successful fetch call."
        },
        "applications": [
            "Login, course loading, enrollment and progress all use this same pattern."
        ],
        "commonMistakes": [
            "Assuming fetch rejects on HTTP 4xx/5xx.",
            "Forgetting credentials for cross-origin sessions.",
            "Building URLs from unencoded values.",
            "Injecting API data into innerHTML unsafely."
        ],
        "bestPractices": [
            "Centralize HTTP behaviour.",
            "Handle loading/error states.",
            "Encode URL values.",
            "Treat the server as the trusted validation boundary."
        ],
        "extra": []
    },
    "fs-persistence": {
        "concepts": [
            {
                "title": "Persistent state",
                "text": "Persistent data survives browser refreshes and server restarts. SkillForge needs users, enrollments, progress and quiz results to be available when a learner returns later."
            },
            {
                "title": "Database connections",
                "text": "Web servers typically use a MySQL connection pool so connections can be reused across concurrent requests. Queries should be parameterized and scoped to the authenticated learner."
            },
            {
                "title": "Environment configuration",
                "text": "Development and production use different database hosts, origins and secrets. Environment variables let the same source code run in both places while keeping passwords and session secrets outside the repository."
            },
            {
                "title": "Deployment basics",
                "text": "A repeatable deployment installs dependencies, configures environment variables, creates or migrates the database schema, starts the backend, serves the frontend and verifies health, authentication and persistence. Backups and logs are part of operational reliability."
            }
        ],
        "codeExample": {
            "title": "Environment-driven MySQL pool",
            "language": "javascript",
            "code": "const mysql = require(\"mysql2/promise\");\n\nconst pool = mysql.createPool({\n    host: process.env.DB_HOST,\n    port: Number(process.env.DB_PORT || 3306),\n    user: process.env.DB_USER,\n    password: process.env.DB_PASSWORD,\n    database: process.env.DB_NAME,\n    waitForConnections: true,\n    connectionLimit: 10\n});",
            "explanation": [
                "No real credentials appear in source code.",
                "The same code can connect to local or hosted MySQL.",
                "A pool supports repeated web requests efficiently."
            ]
        },
        "diagram": {
            "title": "Deployment path",
            "nodes": [
                "Browser",
                "Hosted frontend",
                "Express backend",
                "MySQL database",
                "Logs / backups / health"
            ],
            "caption": "Production keeps the same architecture as local development but replaces localhost settings with hosted services and secure configuration."
        },
        "applications": [
            "Learner progress persistence is the clearest demonstration that SkillForge is more than a static frontend."
        ],
        "commonMistakes": [
            "Committing .env secrets.",
            "Using localStorage as the only server-side persistence.",
            "Deploying schema changes with no backup.",
            "Using development cookie/CORS settings unchanged in production."
        ],
        "bestPractices": [
            "Separate configuration from code.",
            "Use database backups.",
            "Document setup/migration steps.",
            "Verify a real login and progress flow after deployment."
        ],
        "extra": []
    },
    "html-css-fundamentals-m4": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Labels connect visible instructions to form controls using matching for and id values."
            },
            {
                "title": "Putting it into practice",
                "text": "Choose input types such as email and number to provide appropriate keyboards and native validation."
            },
            {
                "title": "Checking the result",
                "text": "Group related choices with fieldset and legend; show errors beside the relevant field, not only through color."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "A registration form has a persistent Email label, an email input and a text error explaining how to fix an invalid address. Tab through the form and submit it empty to check both paths.",
            "explanation": [
                "Labels connect visible instructions to form controls using matching for and id values.",
                "Group related choices with fieldset and legend; show errors beside the relevant field, not only through color."
            ]
        },
        "applications": [
            "Apply accessible forms when building and checking a small HTML & CSS Fundamentals lab exercise."
        ],
        "commonMistakes": [
            "Using placeholder text as the only label makes instructions disappear while typing."
        ],
        "bestPractices": [
            "Group related choices with fieldset and legend; show errors beside the relevant field, not only through color.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Labels connect visible instructions to form controls using matching for and id values.",
            "Choose input types such as email and number to provide appropriate keyboards and native validation.",
            "Group related choices with fieldset and legend; show errors beside the relevant field, not only through color."
        ],
        "extra": []
    },
    "html-css-fundamentals-m5": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Use browser developer tools to inspect the computed styles and identify the rule that wins the cascade."
            },
            {
                "title": "Putting it into practice",
                "text": "Create reusable classes for repeated components and custom properties for shared colors and spacing."
            },
            {
                "title": "Checking the result",
                "text": "Test long text, keyboard focus and narrow viewports before considering a layout finished."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "Two card rules assign different padding. Inspect the card, find the winning rule and remove the unnecessary override. Then apply one shared card class to both cards and retest at 320 pixels.",
            "explanation": [
                "Use browser developer tools to inspect the computed styles and identify the rule that wins the cascade.",
                "Test long text, keyboard focus and narrow viewports before considering a layout finished."
            ]
        },
        "applications": [
            "Apply css debugging and reuse when building and checking a small HTML & CSS Fundamentals lab exercise."
        ],
        "commonMistakes": [
            "Adding important to every declaration hides the source of cascade problems."
        ],
        "bestPractices": [
            "Test long text, keyboard focus and narrow viewports before considering a layout finished.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Use browser developer tools to inspect the computed styles and identify the rule that wins the cascade.",
            "Create reusable classes for repeated components and custom properties for shared colors and spacing.",
            "Test long text, keyboard focus and narrow viewports before considering a layout finished."
        ],
        "extra": []
    },
    "javascript-foundations-m4": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "A promise represents a future result; await pauses the current async function while other work can continue."
            },
            {
                "title": "Putting it into practice",
                "text": "Fetch resolves for HTTP error responses too, so inspect response.ok before consuming successful data."
            },
            {
                "title": "Checking the result",
                "text": "Use try/catch/finally to display errors and restore loading controls after either success or failure."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "async function load() { try { const r = await fetch(\"/api/courses\"); if (!r.ok) throw new Error(\"Request failed\"); return await r.json(); } catch { return []; } }",
            "explanation": [
                "A promise represents a future result; await pauses the current async function while other work can continue.",
                "Use try/catch/finally to display errors and restore loading controls after either success or failure."
            ]
        },
        "applications": [
            "Apply promises and fetch when building and checking a small JavaScript Foundations lab exercise."
        ],
        "commonMistakes": [
            "Assuming every resolved fetch request was an HTTP success."
        ],
        "bestPractices": [
            "Use try/catch/finally to display errors and restore loading controls after either success or failure.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "A promise represents a future result; await pauses the current async function while other work can continue.",
            "Fetch resolves for HTTP error responses too, so inspect response.ok before consuming successful data.",
            "Use try/catch/finally to display errors and restore loading controls after either success or failure."
        ],
        "extra": []
    },
    "javascript-foundations-m5": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Break a calculation into a pure function with explicit inputs and a return value."
            },
            {
                "title": "Putting it into practice",
                "text": "Use breakpoints to inspect actual values rather than guessing which line failed."
            },
            {
                "title": "Checking the result",
                "text": "Test normal values, boundaries and invalid inputs; strict comparisons help reveal unexpected types."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "function percent(done, total) { if (total <= 0) return 0; return Math.round(done / total * 100); }\nconsole.assert(percent(1, 5) === 20);\nconsole.assert(percent(0, 0) === 0);",
            "explanation": [
                "Break a calculation into a pure function with explicit inputs and a return value.",
                "Test normal values, boundaries and invalid inputs; strict comparisons help reveal unexpected types."
            ]
        },
        "applications": [
            "Apply debugging and small tests when building and checking a small JavaScript Foundations lab exercise."
        ],
        "commonMistakes": [
            "Testing only the happy path leaves empty inputs and boundary errors undetected."
        ],
        "bestPractices": [
            "Test normal values, boundaries and invalid inputs; strict comparisons help reveal unexpected types.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Break a calculation into a pure function with explicit inputs and a return value.",
            "Use breakpoints to inspect actual values rather than guessing which line failed.",
            "Test normal values, boundaries and invalid inputs; strict comparisons help reveal unexpected types."
        ],
        "extra": []
    },
    "java-fundamentals-m4": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Path describes a filesystem location and Files provides convenient text reading and writing methods."
            },
            {
                "title": "Putting it into practice",
                "text": "Use try-with-resources for readers or streams so they close even when an exception occurs."
            },
            {
                "title": "Checking the result",
                "text": "Handle IOException with a meaningful recovery or message instead of ignoring failed writes."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "Path path = Path.of(\"scores.txt\");\nFiles.writeString(path, \"85\");\nString score = Files.readString(path);\nSystem.out.println(score);\n// Enclose in a method that handles IOException; expected output: 85.",
            "explanation": [
                "Path describes a filesystem location and Files provides convenient text reading and writing methods.",
                "Handle IOException with a meaningful recovery or message instead of ignoring failed writes."
            ]
        },
        "applications": [
            "Apply files and resource handling when building and checking a small Java Programming Fundamentals lab exercise."
        ],
        "commonMistakes": [
            "Leaving a reader open can hold resources and prevent other file operations."
        ],
        "bestPractices": [
            "Handle IOException with a meaningful recovery or message instead of ignoring failed writes.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Path describes a filesystem location and Files provides convenient text reading and writing methods.",
            "Use try-with-resources for readers or streams so they close even when an exception occurs.",
            "Handle IOException with a meaningful recovery or message instead of ignoring failed writes."
        ],
        "extra": []
    },
    "java-fundamentals-m5": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Separate input/output from calculation so the calculation can be tested without a console."
            },
            {
                "title": "Putting it into practice",
                "text": "Test boundaries such as the exact pass mark as well as values immediately below it."
            },
            {
                "title": "Checking the result",
                "text": "Validate input before changing an object so invalid values cannot corrupt its state."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "static boolean passed(int score) {\n    if (score < 0 || score > 100) throw new IllegalArgumentException(\"score\");\n    return score >= 60;\n}\n// Check passed(59) is false, passed(60) is true, and passed(101) throws.",
            "explanation": [
                "Separate input/output from calculation so the calculation can be tested without a console.",
                "Validate input before changing an object so invalid values cannot corrupt its state."
            ]
        },
        "applications": [
            "Apply testing a small java application when building and checking a small Java Programming Fundamentals lab exercise."
        ],
        "commonMistakes": [
            "Catching every exception and returning success conceals invalid data."
        ],
        "bestPractices": [
            "Validate input before changing an object so invalid values cannot corrupt its state.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Separate input/output from calculation so the calculation can be tested without a console.",
            "Test boundaries such as the exact pass mark as well as values immediately below it.",
            "Validate input before changing an object so invalid values cannot corrupt its state."
        ],
        "extra": []
    },
    "python-basics-m4": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Put reusable functions in a module and import them where needed instead of copying their definitions."
            },
            {
                "title": "Putting it into practice",
                "text": "A virtual environment isolates dependencies for one project from packages installed for other projects."
            },
            {
                "title": "Checking the result",
                "text": "Use a main guard to keep demonstration code from running when a module is imported."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "def square(value):\n    return value * value\n\nif __name__ == \"__main__\":\n    print(square(4))\n# Running the file prints 16; importing it only defines the function.",
            "explanation": [
                "Put reusable functions in a module and import them where needed instead of copying their definitions.",
                "Use a main guard to keep demonstration code from running when a module is imported."
            ]
        },
        "applications": [
            "Apply modules and virtual environments when building and checking a small Python Programming Basics lab exercise."
        ],
        "commonMistakes": [
            "Naming a local file json.py can accidentally shadow the standard json module."
        ],
        "bestPractices": [
            "Use a main guard to keep demonstration code from running when a module is imported.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Put reusable functions in a module and import them where needed instead of copying their definitions.",
            "A virtual environment isolates dependencies for one project from packages installed for other projects.",
            "Use a main guard to keep demonstration code from running when a module is imported."
        ],
        "extra": []
    },
    "python-basics-m5": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Validate external data before using it in a calculation or saving it to a file."
            },
            {
                "title": "Putting it into practice",
                "text": "Keep a small calculation independent of input() so tests can call it directly."
            },
            {
                "title": "Checking the result",
                "text": "Use assertions or unittest to check expected results, invalid values and boundary cases."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "def average(values):\n    if not values:\n        raise ValueError(\"At least one value is required\")\n    return sum(values) / len(values)\n\nassert average([60, 80]) == 70\n# An empty list must raise ValueError.",
            "explanation": [
                "Validate external data before using it in a calculation or saving it to a file.",
                "Use assertions or unittest to check expected results, invalid values and boundary cases."
            ]
        },
        "applications": [
            "Apply testing and data validation when building and checking a small Python Programming Basics lab exercise."
        ],
        "commonMistakes": [
            "Silently returning zero for missing marks can be confused with a real zero score."
        ],
        "bestPractices": [
            "Use assertions or unittest to check expected results, invalid values and boundary cases.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Validate external data before using it in a calculation or saving it to a file.",
            "Keep a small calculation independent of input() so tests can call it directly.",
            "Use assertions or unittest to check expected results, invalid values and boundary cases."
        ],
        "extra": []
    },
    "mysql-fundamentals-m4": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "COUNT counts rows, SUM totals numeric values and AVG computes their average."
            },
            {
                "title": "Putting it into practice",
                "text": "GROUP BY calculates aggregates separately for each group, such as course_id."
            },
            {
                "title": "Checking the result",
                "text": "WHERE filters source rows before grouping, while HAVING filters the grouped results."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "SELECT course_id, COUNT(*) AS learners\nFROM enrollments\nGROUP BY course_id\nHAVING COUNT(*) >= 5;\n-- Shows only courses with five or more enrollments.",
            "explanation": [
                "COUNT counts rows, SUM totals numeric values and AVG computes their average.",
                "WHERE filters source rows before grouping, while HAVING filters the grouped results."
            ]
        },
        "applications": [
            "Apply grouping and aggregate queries when building and checking a small Database & MySQL Fundamentals lab exercise."
        ],
        "commonMistakes": [
            "Using WHERE to filter an aggregate such as COUNT(*) fails because grouping has not happened yet."
        ],
        "bestPractices": [
            "WHERE filters source rows before grouping, while HAVING filters the grouped results.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "COUNT counts rows, SUM totals numeric values and AVG computes their average.",
            "GROUP BY calculates aggregates separately for each group, such as course_id.",
            "WHERE filters source rows before grouping, while HAVING filters the grouped results."
        ],
        "extra": []
    },
    "mysql-fundamentals-m5": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "A transaction groups related writes so COMMIT keeps them together and ROLLBACK undoes them together."
            },
            {
                "title": "Putting it into practice",
                "text": "Indexes can speed up filtering and joins but consume space and add work to writes."
            },
            {
                "title": "Checking the result",
                "text": "Use EXPLAIN to inspect access paths and choose indexes for real query patterns."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n-- In application code, check both operations and ROLLBACK on failure.",
            "explanation": [
                "A transaction groups related writes so COMMIT keeps them together and ROLLBACK undoes them together.",
                "Use EXPLAIN to inspect access paths and choose indexes for real query patterns."
            ]
        },
        "applications": [
            "Apply transactions and indexes when building and checking a small Database & MySQL Fundamentals lab exercise."
        ],
        "commonMistakes": [
            "Committing the first half of a transfer before the second half can leave inconsistent balances."
        ],
        "bestPractices": [
            "Use EXPLAIN to inspect access paths and choose indexes for real query patterns.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "A transaction groups related writes so COMMIT keeps them together and ROLLBACK undoes them together.",
            "Indexes can speed up filtering and joins but consume space and add work to writes.",
            "Use EXPLAIN to inspect access paths and choose indexes for real query patterns."
        ],
        "extra": []
    },
    "nodejs-essentials-m4": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Use fs/promises for asynchronous file operations so disk waits do not block other work."
            },
            {
                "title": "Putting it into practice",
                "text": "Read configuration from process.env and validate required values at startup."
            },
            {
                "title": "Checking the result",
                "text": "Treat missing files and invalid configuration as expected errors with controlled messages."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "const fs = require(\"node:fs/promises\");\nasync function readSettings() {\n    const text = await fs.readFile(\"settings.json\", \"utf8\");\n    return JSON.parse(text);\n}\n// The caller catches missing-file and invalid-JSON errors.",
            "explanation": [
                "Use fs/promises for asynchronous file operations so disk waits do not block other work.",
                "Treat missing files and invalid configuration as expected errors with controlled messages."
            ]
        },
        "applications": [
            "Apply filesystem and configuration when building and checking a small Node.js Essentials lab exercise."
        ],
        "commonMistakes": [
            "Logging the whole environment can expose passwords and API keys."
        ],
        "bestPractices": [
            "Treat missing files and invalid configuration as expected errors with controlled messages.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Use fs/promises for asynchronous file operations so disk waits do not block other work.",
            "Read configuration from process.env and validate required values at startup.",
            "Treat missing files and invalid configuration as expected errors with controlled messages."
        ],
        "extra": []
    },
    "nodejs-essentials-m5": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "The built-in node:test runner executes tests without requiring a separate testing framework."
            },
            {
                "title": "Putting it into practice",
                "text": "Inject external dependencies into small functions so tests can simulate failures without the network."
            },
            {
                "title": "Checking the result",
                "text": "Catch failures at the request boundary and return controlled errors; do not leak stack traces or secrets."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "const test = require(\"node:test\");\nconst assert = require(\"node:assert/strict\");\ntest(\"sum\", () => { assert.equal(2 + 3, 5); });\n// Run with node --test.",
            "explanation": [
                "The built-in node:test runner executes tests without requiring a separate testing framework.",
                "Catch failures at the request boundary and return controlled errors; do not leak stack traces or secrets."
            ]
        },
        "applications": [
            "Apply testing and error boundaries when building and checking a small Node.js Essentials lab exercise."
        ],
        "commonMistakes": [
            "A test that calls a real paid API can fail due to quota rather than a bug in your code."
        ],
        "bestPractices": [
            "Catch failures at the request boundary and return controlled errors; do not leak stack traces or secrets.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "The built-in node:test runner executes tests without requiring a separate testing framework.",
            "Inject external dependencies into small functions so tests can simulate failures without the network.",
            "Catch failures at the request boundary and return controlled errors; do not leak stack traces or secrets."
        ],
        "extra": []
    },
    "express-rest-api-m4": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Session middleware associates a server-side user identity with a browser cookie."
            },
            {
                "title": "Putting it into practice",
                "text": "Authentication identifies the learner; authorization checks whether that learner can access a particular record."
            },
            {
                "title": "Checking the result",
                "text": "Filter private record queries by both resource ID and session user ID, using SQL parameters."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "const [rows] = await db.execute(\n    \"SELECT * FROM generated_courses WHERE id = ? AND user_id = ?\",\n    [req.params.id, req.session.userId]\n);\n// Return not found when no owned record matches.",
            "explanation": [
                "Session middleware associates a server-side user identity with a browser cookie.",
                "Filter private record queries by both resource ID and session user ID, using SQL parameters."
            ]
        },
        "applications": [
            "Apply sessions and resource ownership when building and checking a small Express.js & REST APIs lab exercise."
        ],
        "commonMistakes": [
            "Accepting a user ID from the request body lets callers impersonate another owner."
        ],
        "bestPractices": [
            "Filter private record queries by both resource ID and session user ID, using SQL parameters.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Session middleware associates a server-side user identity with a browser cookie.",
            "Authentication identifies the learner; authorization checks whether that learner can access a particular record.",
            "Filter private record queries by both resource ID and session user ID, using SQL parameters."
        ],
        "extra": []
    },
    "express-rest-api-m5": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Test an API through HTTP so middleware, routing and response status are exercised together."
            },
            {
                "title": "Putting it into practice",
                "text": "Cover unauthorized access, malformed input, missing records and valid requests."
            },
            {
                "title": "Checking the result",
                "text": "Replace external services in automated tests and use an isolated database for persistence checks."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "For a private course endpoint: send no session and expect 401; send another learner session and expect 404; send the owner session and expect 200 with the course title.",
            "explanation": [
                "Test an API through HTTP so middleware, routing and response status are exercised together.",
                "Replace external services in automated tests and use an isolated database for persistence checks."
            ]
        },
        "applications": [
            "Apply api integration tests when building and checking a small Express.js & REST APIs lab exercise."
        ],
        "commonMistakes": [
            "Testing only a handler function can miss authentication middleware mounted in the wrong order."
        ],
        "bestPractices": [
            "Replace external services in automated tests and use an isolated database for persistence checks.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Test an API through HTTP so middleware, routing and response status are exercised together.",
            "Cover unauthorized access, malformed input, missing records and valid requests.",
            "Replace external services in automated tests and use an isolated database for persistence checks."
        ],
        "extra": []
    },
    "bootstrap-responsive-ui-m4": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Use native buttons for actions so keyboard activation works without custom event handling."
            },
            {
                "title": "Putting it into practice",
                "text": "For dialogs, provide an accessible name and verify focus enters and returns correctly."
            },
            {
                "title": "Checking the result",
                "text": "Use visible labels and text feedback with forms; styling alone does not make a control accessible."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "Open a dialog using only Tab and Enter. Check its title is announced, Escape closes it and focus returns to the opening button. Repeat with the dialog containing a validation error.",
            "explanation": [
                "Use native buttons for actions so keyboard activation works without custom event handling.",
                "Use visible labels and text feedback with forms; styling alone does not make a control accessible."
            ]
        },
        "applications": [
            "Apply accessible interactive components when building and checking a small Bootstrap & Responsive UI lab exercise."
        ],
        "commonMistakes": [
            "Assuming framework styles automatically solve every keyboard and screen-reader requirement."
        ],
        "bestPractices": [
            "Use visible labels and text feedback with forms; styling alone does not make a control accessible.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Use native buttons for actions so keyboard activation works without custom event handling.",
            "For dialogs, provide an accessible name and verify focus enters and returns correctly.",
            "Use visible labels and text feedback with forms; styling alone does not make a control accessible."
        ],
        "extra": []
    },
    "bootstrap-responsive-ui-m5": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Test around actual breakpoint boundaries rather than only one phone and one desktop size."
            },
            {
                "title": "Putting it into practice",
                "text": "Use realistic long titles and error messages to reveal wrapping and overflow problems."
            },
            {
                "title": "Checking the result",
                "text": "Check custom CSS after framework styles so intended overrides are predictable and narrowly scoped."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "Review a three-column card grid just below and above its large breakpoint. Insert a long course title, zoom to 200 percent and verify buttons remain reachable without horizontal page scrolling.",
            "explanation": [
                "Test around actual breakpoint boundaries rather than only one phone and one desktop size.",
                "Check custom CSS after framework styles so intended overrides are predictable and narrowly scoped."
            ]
        },
        "applications": [
            "Apply responsive ui verification when building and checking a small Bootstrap & Responsive UI lab exercise."
        ],
        "commonMistakes": [
            "Using fixed pixel widths on cards can defeat responsive grid columns."
        ],
        "bestPractices": [
            "Check custom CSS after framework styles so intended overrides are predictable and narrowly scoped.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Test around actual breakpoint boundaries rather than only one phone and one desktop size.",
            "Use realistic long titles and error messages to reveal wrapping and overflow problems.",
            "Check custom CSS after framework styles so intended overrides are predictable and narrowly scoped."
        ],
        "extra": []
    },
    "git-github-essentials-m4": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Use git diff and git status to identify exactly what changed before undoing anything."
            },
            {
                "title": "Putting it into practice",
                "text": "git restore can discard uncommitted file edits; review them first because discarded work may be lost."
            },
            {
                "title": "Checking the result",
                "text": "git revert creates a new commit that reverses an earlier commit without rewriting shared history."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "git log --oneline\ngit show abc123\ngit revert abc123\n# Review the inverse change, run the tests, then share the new commit.",
            "explanation": [
                "Use git diff and git status to identify exactly what changed before undoing anything.",
                "git revert creates a new commit that reverses an earlier commit without rewriting shared history."
            ]
        },
        "applications": [
            "Apply undoing changes safely when building and checking a small Git & GitHub Essentials lab exercise."
        ],
        "commonMistakes": [
            "Resetting and force-pushing a shared branch can discard other learners work."
        ],
        "bestPractices": [
            "git revert creates a new commit that reverses an earlier commit without rewriting shared history.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Use git diff and git status to identify exactly what changed before undoing anything.",
            "git restore can discard uncommitted file edits; review them first because discarded work may be lost.",
            "git revert creates a new commit that reverses an earlier commit without rewriting shared history."
        ],
        "extra": []
    },
    "git-github-essentials-m5": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "A .gitignore file prevents matching untracked files from being added accidentally."
            },
            {
                "title": "Putting it into practice",
                "text": "Resolve conflicts by understanding both changes, editing the intended result and removing conflict markers."
            },
            {
                "title": "Checking the result",
                "text": "Stage the resolved files, run checks and complete the merge only after reviewing the combined behavior."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "A branch changes a button label while another adds an accessibility label on the same line. Keep both intended changes, remove the conflict markers, run the UI check and stage the resolved file.",
            "explanation": [
                "A .gitignore file prevents matching untracked files from being added accidentally.",
                "Stage the resolved files, run checks and complete the merge only after reviewing the combined behavior."
            ]
        },
        "applications": [
            "Apply ignore rules and conflict resolution when building and checking a small Git & GitHub Essentials lab exercise."
        ],
        "commonMistakes": [
            "Adding a tracked secret to .gitignore does not erase it from existing Git history."
        ],
        "bestPractices": [
            "Stage the resolved files, run checks and complete the merge only after reviewing the combined behavior.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "A .gitignore file prevents matching untracked files from being added accidentally.",
            "Resolve conflicts by understanding both changes, editing the intended result and removing conflict markers.",
            "Stage the resolved files, run checks and complete the merge only after reviewing the combined behavior."
        ],
        "extra": []
    },
    "fullstack-foundations-m4": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Validate inputs in the browser for quick feedback and again on the server for enforcement."
            },
            {
                "title": "Putting it into practice",
                "text": "Use parameterized SQL and explicit allowed values so untrusted input cannot change query structure."
            },
            {
                "title": "Checking the result",
                "text": "Define a response contract with predictable success and failure fields that the frontend can handle."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "A module-count selector offers 5 through 10. Send 100 manually using an HTTP client: the backend must return 400 and perform no database writes even though the normal UI prevents that value.",
            "explanation": [
                "Validate inputs in the browser for quick feedback and again on the server for enforcement.",
                "Define a response contract with predictable success and failure fields that the frontend can handle."
            ]
        },
        "applications": [
            "Apply end-to-end input validation when building and checking a small Full-Stack Web Development Foundations lab exercise."
        ],
        "commonMistakes": [
            "Relying on a dropdown alone does not stop a caller from modifying an HTTP request."
        ],
        "bestPractices": [
            "Define a response contract with predictable success and failure fields that the frontend can handle.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Validate inputs in the browser for quick feedback and again on the server for enforcement.",
            "Use parameterized SQL and explicit allowed values so untrusted input cannot change query structure.",
            "Define a response contract with predictable success and failure fields that the frontend can handle."
        ],
        "extra": []
    },
    "fullstack-foundations-m5": {
        "concepts": [
            {
                "title": "Core idea",
                "text": "Use an isolated learner account to verify enrollment, module progress, assessment unlock and reporting together."
            },
            {
                "title": "Putting it into practice",
                "text": "Simulate network and database failures to check loading controls recover and partial writes are rolled back."
            },
            {
                "title": "Checking the result",
                "text": "Check report values against stored progress and server-calculated scores rather than trusting browser state."
            }
        ],
        "codeExample": {
            "title": "Worked example",
            "language": "text",
            "code": "Enroll in a five-module course, complete four modules and verify assessment is blocked. Complete the fifth, submit ten answers and confirm the saved score appears in the dashboard and report.",
            "explanation": [
                "Use an isolated learner account to verify enrollment, module progress, assessment unlock and reporting together.",
                "Check report values against stored progress and server-calculated scores rather than trusting browser state."
            ]
        },
        "applications": [
            "Apply testing the complete learning flow when building and checking a small Full-Stack Web Development Foundations lab exercise."
        ],
        "commonMistakes": [
            "A successful frontend animation is not evidence that data was committed to the database."
        ],
        "bestPractices": [
            "Check report values against stored progress and server-calculated scores rather than trusting browser state.",
            "Try the worked example, change one input, and explain the resulting behavior."
        ],
        "recap": [
            "Use an isolated learner account to verify enrollment, module progress, assessment unlock and reporting together.",
            "Simulate network and database failures to check loading controls recover and partial writes are rolled back.",
            "Check report values against stored progress and server-calculated scores rather than trusting browser state."
        ],
        "extra": []
    }
};
