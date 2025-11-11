// Results page functionality
document.addEventListener("DOMContentLoaded", () => {
  const yearFilter = document.getElementById("yearFilter")
  const examFilter = document.getElementById("examFilter")
  const classFilter = document.getElementById("classFilter")
  const resultsGrid = document.getElementById("resultsGrid")
  const resultCards = document.querySelectorAll(".result-card")

  // Filter functionality
  function filterResults() {
    const selectedYear = yearFilter.value
    const selectedExam = examFilter.value
    const selectedClass = classFilter.value

    let visibleCount = 0

    resultCards.forEach((card) => {
      const cardYear = card.dataset.year
      const cardExam = card.dataset.exam
      const cardClass = card.dataset.class

      const matchesYear = selectedYear === "" || cardYear === selectedYear
      const matchesExam = selectedExam === "" || cardExam === selectedExam
      const matchesClass = selectedClass === "" || cardClass === selectedClass

      if (matchesYear && matchesExam && matchesClass) {
        card.style.display = "block"
        card.style.animation = "fadeIn 0.3s ease"
        visibleCount++
      } else {
        card.style.display = "none"
      }
    })

    // Show no results message if no results match
    let noResultsMsg = document.querySelector(".no-results")
    if (visibleCount === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement("div")
        noResultsMsg.className = "no-results"
        noResultsMsg.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
            <h3>No results found</h3>
            <p>Try adjusting your filter criteria.</p>
          </div>
        `
        resultsGrid.appendChild(noResultsMsg)
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove()
    }
  }

  // Event listeners for filters
  if (yearFilter) {
    yearFilter.addEventListener("change", filterResults)
  }

  if (examFilter) {
    examFilter.addEventListener("change", filterResults)
  }

  if (classFilter) {
    classFilter.addEventListener("change", filterResults)
  }

  // Add fade-in animation for result cards
  const style = document.createElement("style")
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .result-card {
      animation: fadeIn 0.5s ease forwards;
    }
  `
  document.head.appendChild(style)
})
