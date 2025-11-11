// Notices page functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("noticeSearch")
  const categoryFilter = document.getElementById("categoryFilter")
  const yearFilter = document.getElementById("yearFilter")
  const noticesGrid = document.getElementById("noticesGrid")
  const noticeCards = document.querySelectorAll(".notice-card")
  const pagination = document.getElementById("pagination")

  // Search and filter functionality
  function filterNotices() {
    const searchTerm = searchInput.value.toLowerCase()
    const selectedCategory = categoryFilter.value.toLowerCase()
    const selectedYear = yearFilter.value

    let visibleCount = 0

    noticeCards.forEach((card) => {
      const noticeTitle = card.querySelector("h3").textContent.toLowerCase()
      const noticeContent = card.querySelector("p").textContent.toLowerCase()
      const noticeCategory = card.dataset.category.toLowerCase()
      const noticeYear = card.dataset.year

      const matchesSearch = noticeTitle.includes(searchTerm) || noticeContent.includes(searchTerm)
      const matchesCategory = selectedCategory === "" || noticeCategory === selectedCategory
      const matchesYear = selectedYear === "" || noticeYear === selectedYear

      if (matchesSearch && matchesCategory && matchesYear) {
        card.style.display = "block"
        card.style.animation = "fadeIn 0.3s ease"
        visibleCount++
      } else {
        card.style.display = "none"
      }
    })

    // Show no results message if no notices match
    let noResultsMsg = document.querySelector(".no-results")
    if (visibleCount === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement("div")
        noResultsMsg.className = "no-results"
        noResultsMsg.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
            <h3>No notices found</h3>
            <p>Try adjusting your search criteria or filter options.</p>
          </div>
        `
        noticesGrid.appendChild(noResultsMsg)
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove()
    }

    // Update pagination visibility
    if (visibleCount <= 8) {
      pagination.style.display = "none"
    } else {
      pagination.style.display = "flex"
    }
  }

  // Event listeners for search and filters
  if (searchInput) {
    searchInput.addEventListener("input", filterNotices)
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterNotices)
  }

  if (yearFilter) {
    yearFilter.addEventListener("change", filterNotices)
  }

  // Pagination functionality
  const paginationBtns = document.querySelectorAll(".pagination-btn")
  let currentPage = 1
  const itemsPerPage = 8

  function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    noticeCards.forEach((card, index) => {
      if (card.style.display !== "none") {
        const visibleIndex = Array.from(noticeCards)
          .filter((c) => c.style.display !== "none")
          .indexOf(card)

        if (visibleIndex >= startIndex && visibleIndex < endIndex) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      }
    })

    // Update pagination buttons
    paginationBtns.forEach((btn) => {
      btn.classList.remove("active")
      if (btn.dataset.page === page.toString()) {
        btn.classList.add("active")
      }
    })

    // Update prev/next buttons
    const prevBtn = document.querySelector('[data-page="prev"]')
    const nextBtn = document.querySelector('[data-page="next"]')

    if (prevBtn) {
      prevBtn.disabled = page === 1
    }

    if (nextBtn) {
      const totalPages = Math.ceil(noticeCards.length / itemsPerPage)
      nextBtn.disabled = page === totalPages
    }
  }

  // Pagination event listeners
  paginationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page

      if (page === "prev" && currentPage > 1) {
        currentPage--
        showPage(currentPage)
      } else if (page === "next") {
        const totalPages = Math.ceil(noticeCards.length / itemsPerPage)
        if (currentPage < totalPages) {
          currentPage++
          showPage(currentPage)
        }
      } else if (!isNaN(page)) {
        currentPage = Number.parseInt(page)
        showPage(currentPage)
      }
    })
  })

  // Initialize pagination
  showPage(1)

  // Add fade-in animation for notice cards
  const style = document.createElement("style")
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .notice-card {
      animation: fadeIn 0.5s ease forwards;
    }
  `
  document.head.appendChild(style)

  // Sort notices by date (newest first)
  function sortNoticesByDate() {
    const sortedCards = Array.from(noticeCards).sort((a, b) => {
      const dateA = new Date(a.dataset.date)
      const dateB = new Date(b.dataset.date)
      return dateB - dateA
    })

    // Reorder DOM elements
    sortedCards.forEach((card) => {
      noticesGrid.appendChild(card)
    })
  }

  // Initialize sorting
  sortNoticesByDate()
})
