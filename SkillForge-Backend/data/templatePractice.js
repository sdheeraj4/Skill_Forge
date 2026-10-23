// Application questions for the second learning unit of each template module.
// The first option is the correct answer; the generator rotates its position.
module.exports = {
    'java-fundamentals': [
        ['A loop must process indices 0 through 4 in an array of length 5. Which condition avoids an out-of-bounds access?', 'i < 5', 'i <= 5', 'i == 5', 'i > 5'],
        ['A bank account must reject a negative deposit while keeping its balance private. Which design fits?', 'A private balance with a validating deposit method', 'A public balance changed anywhere', 'A separate unrelated global balance', 'A setter that accepts every value'],
        ['Student records need fast lookup by unique roll number. Which collection best represents that relationship?', 'A Map from roll number to student', 'A List searched only by position', 'A Set of marks without roll numbers', 'A String containing display labels'],
        ['Reading a file throws midway through a try-with-resources block. What happens to the opened reader?', 'It is closed as the block exits', 'It always stays open', 'The file is automatically deleted', 'The read restarts forever'],
        ['A pass function should reject scores outside 0–100. Which test set checks both the decision boundary and invalid input?', '59, 60 and 101', '70, 80 and 90', '60, 60 and 60', '20, 30 and 40']
    ],
    'nodejs-essentials': [
        ['A helper file should expose one function to another CommonJS file. Which mechanism fits?', 'module.exports and require', 'document.querySelector', 'A CSS import', 'An HTML form submission'],
        ['Two independent file reads can run concurrently. Which approach waits for both without making them sequential?', 'Promise.all with both read promises', 'A blocking while loop', 'Await the first before starting the second', 'Ignore both returned promises'],
        ['A JSON API response is sent with status 200 but no body is ended. What is the likely client experience?', 'The client may keep waiting for completion', 'The client automatically receives valid JSON', 'The request method becomes POST', 'The database transaction commits itself'],
        ['A settings file contains invalid JSON. Where should the application handle the rejected read-and-parse operation?', 'At the awaiting caller with a controlled error', 'By printing all environment variables', 'By claiming settings loaded successfully', 'By blocking the event loop indefinitely'],
        ['A service function awaits an injected client. How can a test verify its error path without network access?', 'Inject a client that returns a rejected promise', 'Use a real API key and wait for quota failure', 'Remove the await and assume success', 'Test only the returned success message']
    ],
    'html-css-fundamentals': [
        ['A page contains primary navigation and a main article. Which choice gives assistive tools useful landmarks?', 'Use nav and main elements for those regions', 'Make every region a bold element', 'Replace headings with images without text', 'Use only line breaks to separate regions'],
        ['A 200px-wide box has 20px padding on each side. With border-box and no border, what is its outer width?', '200px', '240px', '160px', '280px'],
        ['A dashboard needs rows and columns to align across two dimensions. Which layout approach fits best?', 'CSS Grid with responsive track definitions', 'Only manual spaces between words', 'Fixed absolute positions for every viewport', 'A separate page for each screen width'],
        ['A required field fails validation. Which feedback supports both keyboard users and users who cannot distinguish colors?', 'Associate a clear text error with the field and keep focus visible', 'Use only a red border', 'Hide the field after failure', 'Remove the label and show a tooltip on hover only'],
        ['A shared card class is overridden by a later rule. Which action identifies the actual cause before changing CSS?', 'Inspect the winning declaration in computed styles', 'Add important to every selector', 'Duplicate all inline styles', 'Remove all styles from every card']
    ],
    'javascript-foundations': [
        ['A let variable is declared inside an if block and accessed outside it. What does block scope imply?', 'That declaration is unavailable outside the block', 'It automatically becomes a global', 'It becomes a property of every object', 'It is converted into a string'],
        ['A product list must retain only prices above 1000 without changing the original array. Which method expresses that operation?', 'filter with a price predicate', 'find with no predicate', 'push with a price predicate', 'join with a price separator'],
        ['A submit handler will send data with fetch. Why call preventDefault on the submit event?', 'To prevent the normal form navigation while handling submission', 'To validate every server input automatically', 'To make the request synchronous', 'To permanently disable the form'],
        ['A fetch promise resolves but response.ok is false. What should the interface do before reading a successful result?', 'Handle the HTTP failure and restore loading controls', 'Always announce success', 'Treat the promise as proof of a valid result', 'Keep the submit button disabled permanently'],
        ['A function computes done / total. Which extra case tests the denominator boundary?', 'total is zero', 'done is one and total is five again', 'The button is purple', 'The function name is shorter']
    ],
    'python-basics': [
        ['A loop uses range(1, 4). Which values are visited?', '1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', 'Only 4'],
        ['A program looks up marks by a unique student name. Which structure directly supports this lookup?', 'A dictionary mapping names to marks', 'A list of unrelated marks only', 'A tuple containing one mark', 'A set that discards the name-mark relationship'],
        ['Reading a file inside a with block raises an exception. What does the context manager still ensure?', 'The file is closed when leaving the block', 'The exception is always ignored', 'The file contents are erased', 'The program retries indefinitely'],
        ['Importing a helper module unexpectedly starts its console menu. Which change prevents that side effect?', 'Place menu startup under the __main__ guard', 'Rename every function to main', 'Remove the import statement from all callers', 'Install the module globally'],
        ['A mean function rejects an empty list instead of returning zero. Why is that useful?', 'Missing data remains distinct from a genuine mean of zero', 'Every empty list mathematically has mean zero', 'Exceptions make input validation unnecessary', 'The function no longer needs tests']
    ],
    'mysql-fundamentals': [
        ['An enrollment refers to a learner that does not exist. Which database feature can reject this relationship?', 'A foreign key to the learners table', 'An ORDER BY clause', 'A column alias', 'A LIMIT clause'],
        ['An update should affect only learner 7. Which part restricts the affected rows?', 'WHERE id = ? with 7 bound as a parameter', 'ORDER BY name alone', 'A comment mentioning learner 7', 'An unrestricted UPDATE'],
        ['A report must include learners with no enrollments. Which join should start from learners?', 'LEFT JOIN enrollments', 'INNER JOIN enrollments only', 'CROSS JOIN every enrollment', 'A join that filters out every null enrollment'],
        ['A report keeps active enrollments, groups by course and keeps groups of at least five. Which ordering of filters is correct?', 'WHERE active = 1 before grouping; HAVING COUNT(*) >= 5 after grouping', 'HAVING active = 1 with no grouping and no count filter', 'WHERE COUNT(*) >= 5 before grouping', 'ORDER BY active instead of either filter'],
        ['Two related writes must either both persist or neither persist. Which application behavior meets that requirement?', 'Run both on one transaction connection and roll back on either failure', 'Commit each write independently before checking the next', 'Ignore the second failure after saving the first', 'Send the writes on unrelated connections without a transaction']
    ]
};
