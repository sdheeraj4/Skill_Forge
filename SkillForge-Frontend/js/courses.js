document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("coursesGrid");
    const search = document.getElementById("courseSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const levelFilter = document.getElementById("levelFilter");

    let courses = [];
    let enrolledIds = new Set();
    let user = null;

    function courseCard(course) {
        const visual = sfCourseVisual(course.id);
        const enrolled = enrolledIds.has(course.id);

        return `
            <article class="course-card">
                <div class="course-cover" style="--coverA:${visual.colors[0]};--coverB:${visual.colors[1]}">
                    <div class="course-symbol">${escapeHtml(visual.symbol)}</div>
                    <span class="pill" style="background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.15);color:#fff">
                        ${escapeHtml(course.category)}
                    </span>
                </div>
                <div class="course-body">
                    <h3>${escapeHtml(course.title)}</h3>
                    <p>${escapeHtml(course.description)}</p>
                    <div class="course-meta">
                        <span>${escapeHtml(course.level)}</span>
                        <span>·</span>
                        <span>${course.moduleCount} modules</span>
                        <span>·</span>
                        <span>${escapeHtml(course.duration)}</span>
                    </div>
                </div>
                <div class="course-card-footer">
                    <a class="btn btn-secondary btn-sm" href="course.html?id=${encodeURIComponent(course.id)}">Details</a>
                    ${enrolled
                        ? `<a class="btn btn-primary btn-sm" href="learn.html?course=${encodeURIComponent(course.id)}">Continue</a>`
                        : `<button class="btn btn-primary btn-sm" data-enroll="${escapeHtml(course.id)}">Enroll</button>`}
                </div>
            </article>
        `;
    }

    function render() {
        const query = search.value.trim().toLowerCase();
        const filtered = courses.filter((course) => {
            const searchable = [course.title, course.description, course.category, ...course.skills].join(" ").toLowerCase();
            return (!query || searchable.includes(query))
                && (!categoryFilter.value || course.category === categoryFilter.value)
                && (!levelFilter.value || course.level === levelFilter.value);
        });

        grid.innerHTML = filtered.length
            ? filtered.map(courseCard).join("")
            : '<div class="empty-state" style="grid-column:1/-1">No courses match these filters.</div>';

        grid.querySelectorAll("[data-enroll]").forEach((button) => {
            button.addEventListener("click", async () => {
                if (!user) {
                    location.href = "login.html?next=" + encodeURIComponent("courses.html");
                    return;
                }

                button.disabled = true;
                button.textContent = "Enrolling...";
                try {
                    await SkillForgeAPI.enroll(button.dataset.enroll);
                    enrolledIds.add(button.dataset.enroll);
                    sfToast("Course added to My Learning.", "success");
                    render();
                } catch (error) {
                    sfToast(error.message, "error");
                    button.disabled = false;
                    button.textContent = "Enroll";
                }
            });
        });
    }

    try {
        const [courseData, sessionUser] = await Promise.all([
            SkillForgeAPI.getCourses(),
            sfGetSessionUser()
        ]);
        courses = courseData.courses;
        user = sessionUser;

        if (user) {
            const learning = await SkillForgeAPI.getMyLearning();
            enrolledIds = new Set(learning.courses.map((course) => course.courseId));
        }

        [...new Set(courses.map((course) => course.category))].sort().forEach((category) => {
            categoryFilter.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`);
        });
        [...new Set(courses.map((course) => course.level))].forEach((level) => {
            levelFilter.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(level)}">${escapeHtml(level)}</option>`);
        });

        search.addEventListener("input", render);
        categoryFilter.addEventListener("change", render);
        levelFilter.addEventListener("change", render);
        render();
    } catch (error) {
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">${escapeHtml(error.message)}</div>`;
    }
});
