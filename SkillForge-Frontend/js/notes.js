function notesUrl(courseId, moduleId) {
    return `notes.html?course=${encodeURIComponent(courseId)}&module=${encodeURIComponent(moduleId)}`;
}

function renderList(items, className = "notes-list") {
    if (!items?.length) {
        return "";
    }

    return `
        <ul class="${className}">
            ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
    `;
}

function renderCodeExample(example) {
    if (!example) {
        return "";
    }

    return `
        <div class="notes-code-card">
            <div class="notes-code-head">
                <strong>${escapeHtml(example.title || "Code example")}</strong>
                <span>${escapeHtml(example.language || "code")}</span>
            </div>
            <pre class="code-block"><code>${escapeHtml(example.code || "")}</code></pre>
            ${example.output ? `
                <div class="notes-output">
                    <span>Expected output</span>
                    <pre>${escapeHtml(example.output)}</pre>
                </div>
            ` : ""}
            ${example.explanation?.length ? `
                <div class="notes-explanation">
                    <h4>How the example works</h4>
                    ${renderList(example.explanation)}
                </div>
            ` : ""}
        </div>
    `;
}

function renderDiagram(diagram) {
    if (!diagram?.nodes?.length) {
        return "";
    }

    return `
        <section class="notes-section">
            <div class="notes-section-label">Visual explanation</div>
            <h2>${escapeHtml(diagram.title || "Concept diagram")}</h2>
            <div class="notes-diagram" role="img" aria-label="${escapeHtml(diagram.title || "Concept diagram")}">
                ${diagram.nodes.map((node, index) => `
                    <div class="notes-diagram-step">
                        <div class="notes-diagram-node">${escapeHtml(node)}</div>
                        ${index < diagram.nodes.length - 1 ? '<div class="notes-diagram-arrow" aria-hidden="true">→</div>' : ""}
                    </div>
                `).join("")}
            </div>
            ${diagram.caption ? `<p class="notes-diagram-caption">${escapeHtml(diagram.caption)}</p>` : ""}
        </section>
    `;
}

document.addEventListener("DOMContentLoaded", async () => {
    const user = await sfRequireAuth();
    if (!user) {
        return;
    }

    const params = new URLSearchParams(location.search);
    const courseId = params.get("course");
    const moduleId = params.get("module");
    const reader = document.getElementById("notesReader");

    if (!courseId || !moduleId) {
        reader.innerHTML = `
            <div class="card empty-state">
                A course and module are required to open notes.
                <br>
                <a class="btn btn-secondary btn-sm" style="margin-top:12px" href="my-learning.html">Back to My Learning</a>
            </div>
        `;
        return;
    }

    try {
        const [{ course }, learningData] = await Promise.all([
            SkillForgeAPI.getCourse(courseId),
            SkillForgeAPI.getMyLearning()
        ]);

        const state = learningData.courses.find((item) => item.courseId === courseId);
        if (!state) {
            location.replace(`course.html?id=${encodeURIComponent(courseId)}`);
            return;
        }

        const module = course.modules.find((item) => item.id === moduleId);
        if (!module) {
            throw new Error("Module notes could not be found.");
        }

        const guide = module.guide || window.SF_NOTES?.[module.id] || {};
        const moduleIndex = course.modules.findIndex((item) => item.id === module.id);
        const previousModule = course.modules[moduleIndex - 1] || null;
        const nextModule = course.modules[moduleIndex + 1] || null;
        const completedIds = state.completedModuleIds || [];
        const isCompleted = completedIds.includes(module.id);

        document.title = `${module.title} | ${course.title} | SkillForge`;
        document.body.dataset.title = module.title;

        const keyConcepts = (module.notes || []).map((note, index) => `
            <div class="notes-key-card">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <p>${escapeHtml(note)}</p>
            </div>
        `).join("");

        const deepDive = (guide.concepts || []).map((concept, index) => `
            <section class="notes-section">
                <div class="notes-section-label">Concept ${index + 1}</div>
                <h2>${escapeHtml(concept.title)}</h2>
                <p>${escapeHtml(concept.text)}</p>
            </section>
        `).join("");

        reader.innerHTML = `
            <article class="card notes-article">
                <nav class="notes-breadcrumb" aria-label="Breadcrumb">
                    <a href="my-learning.html">My Learning</a>
                    <span>›</span>
                    <a href="learn.html?course=${encodeURIComponent(course.id)}">${escapeHtml(course.title)}</a>
                    <span>›</span>
                    <span>${escapeHtml(module.title)}</span>
                </nav>

                <header class="notes-hero">
                    <div>
                        <span class="eyebrow">Module ${moduleIndex + 1} of ${course.modules.length} · ${escapeHtml(module.duration || "")}</span>
                        <h1>${escapeHtml(module.title)}</h1>
                        <p>${escapeHtml(module.summary || "")}</p>
                    </div>
                    <div class="notes-status ${isCompleted ? "done" : ""}">
                        <span>${isCompleted ? "✓" : String(moduleIndex + 1)}</span>
                        <div>
                            <b>${isCompleted ? "Completed" : "In progress"}</b>
                            <small>${state.progressPercent}% course progress</small>
                        </div>
                    </div>
                </header>

                <section class="notes-intro">
                    <div class="notes-section-label">Module overview</div>
                    <h2>What you will learn</h2>
                    <p>
                        This detailed reader expands the module into its important concepts, practical examples,
                        visual explanations and common mistakes. Work through the sections in order, try the
                        examples yourself, and use the recommended lecture at the end for reinforcement.
                    </p>
                    ${keyConcepts ? `<div class="notes-key-grid">${keyConcepts}</div>` : ""}
                </section>

                ${deepDive}

                ${renderCodeExample(guide.codeExample)}
                ${renderDiagram(guide.diagram)}

                ${guide.applications?.length ? `
                    <section class="notes-section notes-callout">
                        <div class="notes-section-label">Practical connection</div>
                        <h2>Where this is used</h2>
                        ${renderList(guide.applications)}
                    </section>
                ` : ""}

                <div class="notes-two-column">
                    <section class="notes-section notes-warning">
                        <div class="notes-section-label">Watch out</div>
                        <h2>Common mistakes</h2>
                        ${renderList(guide.commonMistakes || [])}
                    </section>

                    <section class="notes-section notes-success">
                        <div class="notes-section-label">Good habits</div>
                        <h2>Best practices</h2>
                        ${renderList(guide.bestPractices || [])}
                    </section>
                </div>

                <section class="notes-section">
                    <div class="notes-section-label">Quick recap</div>
                    <h2>Before you finish</h2>
                    ${renderList([
                        ...(guide.recap || module.notes || []),
                        `The key goal of this module is to understand ${module.title.toLowerCase()} well enough to apply it in a practical program or project.`
                    ], "notes-recap-list")}
                </section>

                <section class="notes-video-card" id="recommendedLecture">
                    <div class="notes-video-copy">
                        <span class="eyebrow">Recommended lecture</span>
                        <h2>${escapeHtml(module.video?.title || "Recommended YouTube lecture")}</h2>
                        <p>
                            Use this lecture after reading the notes to reinforce the same module concepts
                            with a guided video explanation.
                        </p>
                        <a class="btn btn-primary" href="${escapeHtml(module.video?.url || "#")}" target="_blank" rel="noopener noreferrer">
                            Open on YouTube ↗
                        </a>
                    </div>
                    <div class="notes-video-visual" aria-hidden="true">
                        <span>▶</span>
                    </div>
                </section>

                <footer class="notes-footer-actions">
                    <div>
                        ${previousModule ? `
                            <a class="btn btn-secondary" href="${notesUrl(course.id, previousModule.id)}">
                                ← ${escapeHtml(previousModule.title)}
                            </a>
                        ` : `
                            <a class="btn btn-secondary" href="learn.html?course=${encodeURIComponent(course.id)}">
                                ← Learning workspace
                            </a>
                        `}
                    </div>

                    <button class="btn btn-primary" id="completeAndContinue">
                        ${isCompleted
                            ? (nextModule ? "Continue to next module →" : "Go to assessment →")
                            : (nextModule ? "Complete & continue →" : "Complete & start assessment →")}
                    </button>
                </footer>
            </article>
        `;

        document.getElementById("completeAndContinue")?.addEventListener("click", async () => {
            const button = document.getElementById("completeAndContinue");
            button.disabled = true;

            try {
                if (!isCompleted) {
                    await SkillForgeAPI.updateProgress(course.id, module.id, true);
                    sfToast("Module completed.", "success");
                }

                if (nextModule) {
                    location.href = notesUrl(course.id, nextModule.id);
                    return;
                }

                location.href = `quiz.html?course=${encodeURIComponent(course.id)}`;
            } catch (error) {
                sfToast(error.message, "error");
                button.disabled = false;
            }
        });
    } catch (error) {
        reader.innerHTML = `
            <div class="card empty-state">
                ${escapeHtml(error.message)}
                <br>
                <a class="btn btn-secondary btn-sm" style="margin-top:12px" href="my-learning.html">Back to My Learning</a>
            </div>
        `;
    }
});
