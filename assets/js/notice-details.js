<div id="noticeContent"></div>
<span id="noticeTitleBreadcrumb"></span>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const noticeContent = document.getElementById("noticeContent")
    const breadcrumbTitle = document.getElementById("noticeTitleBreadcrumb")

    // Django থেকে inject করা notice object
    const notice = {
        title: "{{ notice.title|escapejs }}",
        category: "{{ notice.category|escapejs }}",
        date: "{{ notice.created_at|date:'Y-m-d' }}",
        priority: "{{ notice.priority|escapejs }}",
        content: `{{ notice.content|safe }}`,
        attachments: [
            {% for attachment in notice.attachments.all %}
            {
                name: "{{ attachment.name|escapejs }}",
                url: "{{ attachment.file.url }}",
                type: "{{ attachment.type|escapejs }}"
            }{% if not forloop.last %},{% endif %}
            {% endfor %}
        ]
    }

    // Update page title and breadcrumb
    document.title = `${notice.title} - Prottasha Model School`
    breadcrumbTitle.textContent = notice.title

    // Generate notice details HTML
    noticeContent.innerHTML = `
        <article class="notice-details">
            <header class="notice-details-header">
                <div class="notice-meta">
                    <span class="notice-category ${notice.category.toLowerCase()}">${notice.category}</span>
                    <time datetime="${notice.date}">${formatDate(notice.date)}</time>
                    <span class="notice-priority ${notice.priority.toLowerCase().replace(" ", "-")}">${notice.priority}</span>
                </div>
                <h1>${notice.title}</h1>
            </header>

            <div class="notice-body">
                ${notice.content}
            </div>

            ${
                notice.attachments && notice.attachments.length > 0
                ? `
                <div class="notice-attachments">
                    <h3>Attachments</h3>
                    <div class="attachments-list">
                        ${notice.attachments.map(att => `
                            <a href="${att.url}" class="attachment-link" target="_blank">
                                <span class="attachment-icon">${getFileIcon(att.type)}</span>
                                <span class="attachment-name">${att.name}</span>
                                <span class="attachment-type">${att.type}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>`
                : ''
            }

            <div class="notice-actions">
                <a href="{% url 'pweb:notice_list' %}" class="back-btn">← Back to Notices</a>
                <button onclick="window.print()" class="print-btn">🖨️ Print Notice</button>
                <button onclick="shareNotice()" class="share-btn">📤 Share</button>
            </div>
        </article>
    `
})

// Helper functions
function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
}

function getFileIcon(type) {
    switch (type.toLowerCase()) {
        case "pdf": return "📄"
        case "doc": case "docx": return "📝"
        case "xls": case "xlsx": return "📊"
        case "ppt": case "pptx": return "📋"
        default: return "📎"
    }
}

function shareNotice() {
    if (navigator.share) {
        navigator.share({ title: document.title, url: window.location.href })
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("Notice link copied to clipboard!")
        })
    }
}
</script>
