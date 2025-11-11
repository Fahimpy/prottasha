// Main JavaScript for Prottasha Model School Website
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navList = document.querySelector(".nav-list")

  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener("click", () => {
      navList.classList.toggle("active")

      // Animate hamburger menu
      const spans = mobileMenuToggle.querySelectorAll("span")
      spans.forEach((span, index) => {
        if (navList.classList.contains("active")) {
          if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
          if (index === 1) span.style.opacity = "0"
          if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          span.style.transform = "none"
          span.style.opacity = "1"
        }
      })
    })
  }

  // Hero Slider
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let currentSlide = 0

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    // Show current slide
    if (slides[index]) {
      slides[index].classList.add("active")
    }
    if (dots[index]) {
      dots[index].classList.add("active")
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    showSlide(currentSlide)
  }

  // Event listeners for slider controls
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide)
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide)
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index
      showSlide(currentSlide)
    })
  })

  // Auto-play slider
  if (slides.length > 0) {
    setInterval(nextSlide, 5000) // Change slide every 5 seconds
  }

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible")
      } else {
        backToTopBtn.classList.remove("visible")
      }
    })

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Gallery Lightbox (Simple Implementation)
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img")
      if (img) {
        // Create lightbox overlay
        const lightbox = document.createElement("div")
        lightbox.className = "lightbox-overlay"
        lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${img.src}" alt="${img.alt}">
                        <button class="lightbox-close">&times;</button>
                    </div>
                `

        // Add lightbox styles
        lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `

        const content = lightbox.querySelector(".lightbox-content")
        content.style.cssText = `
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                `

        const lightboxImg = lightbox.querySelector("img")
        lightboxImg.style.cssText = `
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                `

        const closeBtn = lightbox.querySelector(".lightbox-close")
        closeBtn.style.cssText = `
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 30px;
                    cursor: pointer;
                    padding: 5px 10px;
                `

        document.body.appendChild(lightbox)

        // Fade in
        setTimeout(() => {
          lightbox.style.opacity = "1"
        }, 10)

        // Close lightbox
        function closeLightbox() {
          lightbox.style.opacity = "0"
          setTimeout(() => {
            document.body.removeChild(lightbox)
          }, 300)
        }

        closeBtn.addEventListener("click", closeLightbox)
        lightbox.addEventListener("click", (e) => {
          if (e.target === lightbox) {
            closeLightbox()
          }
        })

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            closeLightbox()
          }
        })
      }
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add loading animation for images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    // Set initial opacity for smooth loading
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"

    // If image is already loaded (cached)
    if (img.complete) {
      img.style.opacity = "1"
    }
  })
})

