// Gallery functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")
  const lightbox = document.getElementById("lightbox")
  const lightboxImage = document.querySelector(".lightbox-image")
  const lightboxCaption = document.querySelector(".lightbox-caption")
  const lightboxClose = document.querySelector(".lightbox-close")
  const lightboxPrev = document.querySelector(".lightbox-prev")
  const lightboxNext = document.querySelector(".lightbox-next")
  const loadMoreBtn = document.querySelector(".load-more-btn")

  let currentImageIndex = 0
  let currentImages = []

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filter gallery items
      galleryItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })

      // Update current images array for lightbox navigation
      updateCurrentImages()
    })
  })

  // Update current images array based on visible items
  function updateCurrentImages() {
    currentImages = []
    galleryItems.forEach((item, index) => {
      if (item.style.display !== "none") {
        const viewBtn = item.querySelector(".view-btn")
        const img = item.querySelector("img")
        const overlay = item.querySelector(".gallery-overlay")
        const title = overlay.querySelector("h3").textContent
        const description = overlay.querySelector("p").textContent

        currentImages.push({
          src: viewBtn.getAttribute("data-image"),
          title: title,
          description: description,
          index: index,
        })
      }
    })
  }

  // Initialize current images
  updateCurrentImages()

  // Lightbox functionality
  galleryItems.forEach((item, index) => {
    const viewBtn = item.querySelector(".view-btn")

    viewBtn.addEventListener("click", () => {
      const imageSrc = viewBtn.getAttribute("data-image")
      const overlay = item.querySelector(".gallery-overlay")
      const title = overlay.querySelector("h3").textContent
      const description = overlay.querySelector("p").textContent

      // Find the index in current images array
      currentImageIndex = currentImages.findIndex((img) => img.index === index)

      openLightbox(imageSrc, title, description)
    })
  })

  function openLightbox(src, title, description) {
    lightboxImage.src = src
    lightboxCaption.querySelector("h3").textContent = title
    lightboxCaption.querySelector("p").textContent = description
    lightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeLightbox() {
    lightbox.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  // Close lightbox
  lightboxClose.addEventListener("click", closeLightbox)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Navigation in lightbox
  lightboxPrev.addEventListener("click", () => {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentImages.length - 1
    const currentImage = currentImages[currentImageIndex]
    openLightbox(currentImage.src, currentImage.title, currentImage.description)
  })

  lightboxNext.addEventListener("click", () => {
    currentImageIndex = currentImageIndex < currentImages.length - 1 ? currentImageIndex + 1 : 0
    const currentImage = currentImages[currentImageIndex]
    openLightbox(currentImage.src, currentImage.title, currentImage.description)
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowLeft") {
        lightboxPrev.click()
      } else if (e.key === "ArrowRight") {
        lightboxNext.click()
      }
    }
  })

  // Load more functionality (simulate loading more images)
  let loadedCount = 9
  const totalImages = 24 // Simulate total available images

  loadMoreBtn.addEventListener("click", () => {
    // Simulate loading delay
    loadMoreBtn.textContent = "Loading..."
    loadMoreBtn.disabled = true

    setTimeout(() => {
      // Add more gallery items (in a real application, this would fetch from server)
      const categories = ["campus", "events", "academic", "sports", "cultural"]
      const newItemsCount = Math.min(6, totalImages - loadedCount)

      for (let i = 0; i < newItemsCount; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)]
        const galleryGrid = document.querySelector(".gallery-grid")

        const newItem = document.createElement("div")
        newItem.className = "gallery-item"
        newItem.setAttribute("data-category", category)
        newItem.innerHTML = `
          <img src="/school---category--activity.jpg" alt="${category} activity">
          <div class="gallery-overlay">
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Activity</h3>
            <p>School ${category} moment</p>
            <button class="view-btn" data-image="/school---category--activity.jpg">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        `

        galleryGrid.appendChild(newItem)

        // Add event listener to new view button
        const viewBtn = newItem.querySelector(".view-btn")
        viewBtn.addEventListener("click", () => {
          const imageSrc = viewBtn.getAttribute("data-image")
          const overlay = newItem.querySelector(".gallery-overlay")
          const title = overlay.querySelector("h3").textContent
          const description = overlay.querySelector("p").textContent

          openLightbox(imageSrc, title, description)
        })
      }

      loadedCount += newItemsCount
      updateCurrentImages()

      loadMoreBtn.textContent = "Load More Photos"
      loadMoreBtn.disabled = false

      // Hide load more button if all images are loaded
      if (loadedCount >= totalImages) {
        loadMoreBtn.style.display = "none"
      }
    }, 1500)
  })
})
