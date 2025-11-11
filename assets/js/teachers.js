// Teachers page functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("teacherSearch")
  const subjectFilter = document.getElementById("subjectFilter")
  const teachersGrid = document.getElementById("teachersGrid")
  const teacherCards = document.querySelectorAll(".teacher-card")

  // Search and filter functionality
  function filterTeachers() {
    const searchTerm = searchInput.value.toLowerCase()
    const selectedSubject = subjectFilter.value.toLowerCase()

    teacherCards.forEach((card) => {
      const teacherName = card.querySelector("h3").textContent.toLowerCase()
      const teacherSubject = card.dataset.subject.toLowerCase()
      const subjectText = card.querySelector(".subject").textContent.toLowerCase()

      const matchesSearch = teacherName.includes(searchTerm) || subjectText.includes(searchTerm)
      const matchesSubject = selectedSubject === "" || teacherSubject === selectedSubject

      if (matchesSearch && matchesSubject) {
        card.style.display = "block"
        card.style.animation = "fadeIn 0.3s ease"
      } else {
        card.style.display = "none"
      }
    })

    // Show no results message if no teachers match
    const visibleCards = Array.from(teacherCards).filter((card) => card.style.display !== "none")

    let noResultsMsg = document.querySelector(".no-results")
    if (visibleCards.length === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement("div")
        noResultsMsg.className = "no-results"
        noResultsMsg.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
            <h3>No teachers found</h3>
            <p>Try adjusting your search criteria or filter options.</p>
          </div>
        `
        teachersGrid.appendChild(noResultsMsg)
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove()
    }
  }

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener("input", filterTeachers)
  }

  if (subjectFilter) {
    subjectFilter.addEventListener("change", filterTeachers)
  }

  // Add fade-in animation for teacher cards
  const style = document.createElement("style")
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .teacher-card {
      animation: fadeIn 0.5s ease forwards;
    }
  `
  document.head.appendChild(style)
})
