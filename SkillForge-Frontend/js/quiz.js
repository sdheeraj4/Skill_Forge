document.addEventListener("DOMContentLoaded", async () => {
    const user = await sfRequireAuth();
    if (!user) {
        return;
    }

    const courseId = new URLSearchParams(location.search).get("course");
    const form = document.getElementById("quizForm");
    const resultBox = document.getElementById("quizResult");

    if (!courseId) {
        location.replace("my-learning.html");
        return;
    }

    try {
        const assessment = await SkillForgeAPI.getQuiz(courseId);
        document.getElementById("quizTitle").textContent = `${assessment.courseTitle} Assessment`;

        form.innerHTML = assessment.questions.map((question, index) => `
            <section class="question-card card" style="margin-bottom:14px">
                <div class="question-count">
                    Question ${index + 1} of ${assessment.totalQuestions}
                    · <span class="difficulty difficulty-${escapeHtml(question.difficulty)}">${escapeHtml(question.difficulty)}</span>
                </div>
                <h2>${escapeHtml(question.question)}</h2>
                <div class="answers">
                    ${question.options.map((option, optionIndex) => `
                        <div class="answer">
                            <input type="radio" id="q${index}a${optionIndex}" name="q${index}" value="${optionIndex}">
                            <label for="q${index}a${optionIndex}">
                                <span class="answer-letter">${String.fromCharCode(65 + optionIndex)}</span>
                                <span>${escapeHtml(option)}</span>
                            </label>
                        </div>
                    `).join("")}
                </div>
            </section>
        `).join("") + `
            <div class="quiz-nav">
                <a class="btn btn-secondary" href="learn.html?course=${encodeURIComponent(courseId)}">← Back to course</a>
                <button class="btn btn-primary" type="submit">Submit assessment</button>
            </div>
        `;

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const answers = [];

            for (let index = 0; index < assessment.questions.length; index += 1) {
                const selected = form.querySelector(`input[name="q${index}"]:checked`);
                if (!selected) {
                    sfToast("Answer all 10 questions before submitting.", "error");
                    return;
                }
                answers.push(Number(selected.value));
            }

            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = "Evaluating...";

            try {
                const result = await SkillForgeAPI.submitQuiz(courseId, answers);
                form.classList.add("hidden");
                resultBox.classList.remove("hidden");

                const nextCourses = result.nextCourses.length
                    ? `<div class="review-list" style="margin-top:16px">
                        ${result.nextCourses.map((course) => `
                            <div class="review-item correct">
                                <strong>Recommended next: ${escapeHtml(course.title)}</strong>
                                <div class="muted" style="margin-top:4px">Your performance indicates you are ready for this learning path.</div>
                            </div>
                        `).join("")}
                    </div>`
                    : "";

                const weakAreas = result.weakModules.length
                    ? `<div class="review-list" style="margin-top:16px">
                        ${result.weakModules.slice(0, 3).map((item) => `
                            <div class="review-item wrong">
                                <strong>Review: ${escapeHtml(item.title)}</strong>
                                <div class="muted" style="margin-top:4px">${item.wrongAnswers} incorrect answer${item.wrongAnswers === 1 ? "" : "s"} came from this module.</div>
                            </div>
                        `).join("")}
                    </div>`
                    : "";

                resultBox.innerHTML = `
                    <div class="result-card card">
                        <div class="result-ring" style="--score:${result.score}%"><strong>${result.score}%</strong></div>
                        <span class="eyebrow">Assessment complete</span>
                        <h2>${escapeHtml(result.performance)}</h2>
                        <p class="muted">${escapeHtml(result.message)}</p>
                        <p><strong>${result.correctAnswers}/${result.totalQuestions}</strong> answers correct</p>
                        ${weakAreas}
                        ${nextCourses}
                        <div style="display:flex;gap:9px;justify-content:center;margin-top:22px;flex-wrap:wrap">
                            <button class="btn btn-secondary" onclick="location.reload()">Retake assessment</button>
                            <a class="btn btn-secondary" href="learn.html?course=${encodeURIComponent(courseId)}">Review modules</a>
                            <a class="btn btn-primary" href="progress.html#reportCardSection">View report card</a>
                        </div>
                    </div>
                `;
                sfToast("Assessment result saved to MySQL.", "success");
            } catch (error) {
                sfToast(error.message, "error");
                submitButton.disabled = false;
                submitButton.textContent = "Submit assessment";
            }
        });
    } catch (error) {
        form.innerHTML = `
            <div class="empty-state">
                ${escapeHtml(error.message)}
                <br><a class="btn btn-secondary btn-sm" style="margin-top:12px" href="learn.html?course=${encodeURIComponent(courseId)}">Back to course</a>
            </div>
        `;
    }
});
