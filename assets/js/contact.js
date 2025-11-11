// Contact page functionality
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const faqItems = document.querySelectorAll(".faq-item")

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Simple validation
      if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Show loading state
      const submitBtn = contactForm.querySelector(".submit-btn")
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        alert("Thank you for your message! We'll get back to you within 24 hours.")
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // FAQ accordion functionality
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")
    const toggle = item.querySelector(".faq-toggle")

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active")
        const faqAnswer = faqItem.querySelector(".faq-answer")
        const faqToggle = faqItem.querySelector(".faq-toggle")
        faqAnswer.style.maxHeight = null
        faqToggle.textContent = "+"
      })

      // Open clicked item if it wasn't already open
      if (!isOpen) {
        item.classList.add("active")
        answer.style.maxHeight = answer.scrollHeight + "px"
        toggle.textContent = "−"
      }
    })
  })

  // Initialize Google Map (placeholder - replace with actual Google Maps API)
  const mapContainer = document.getElementById("map")
  if (mapContainer) {
    // This would be replaced with actual Google Maps initialization
    mapContainer.innerHTML = `
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8977!2d90.5089!3d23.7808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzUxLjAiTiA5MMKwMzAnMzIuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
        width="100%" 
        height="300" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    `
  }
})
