// SEO and Analytics functionality
document.addEventListener("DOMContentLoaded", () => {
  // Add structured data for breadcrumbs
  function addBreadcrumbSchema() {
    const breadcrumb = document.querySelector(".breadcrumb")
    if (breadcrumb) {
      const breadcrumbItems = breadcrumb.querySelectorAll("a, span")
      const breadcrumbList = []

      breadcrumbItems.forEach((item, index) => {
        if (item.tagName === "A") {
          breadcrumbList.push({
            "@type": "ListItem",
            position: index + 1,
            name: item.textContent.trim(),
            item: item.href,
          })
        } else if (item.tagName === "SPAN" && item.textContent.trim() !== "/") {
          breadcrumbList.push({
            "@type": "ListItem",
            position: index + 1,
            name: item.textContent.trim(),
          })
        }
      })

      if (breadcrumbList.length > 0) {
        const schema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbList,
        }

        const script = document.createElement("script")
        script.type = "application/ld+json"
        script.textContent = JSON.stringify(schema)
        document.head.appendChild(script)
      }
    }
  }

  // Add FAQ schema for pages with FAQ sections
  function addFAQSchema() {
    const faqItems = document.querySelectorAll(".faq-item")
    if (faqItems.length > 0) {
      const faqList = []

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question")
        const answer = item.querySelector(".faq-answer")

        if (question && answer) {
          faqList.push({
            "@type": "Question",
            name: question.textContent.trim(),
            acceptedAnswer: {
              "@type": "Answer",
              text: answer.textContent.trim(),
            },
          })
        }
      })

      if (faqList.length > 0) {
        const schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqList,
        }

        const script = document.createElement("script")
        script.type = "application/ld+json"
        script.textContent = JSON.stringify(schema)
        document.head.appendChild(script)
      }
    }
  }

  // Add Person schema for teacher profiles
  function addTeacherSchema() {
    const teacherProfile = document.querySelector(".teacher-profile")
    if (teacherProfile) {
      const name = teacherProfile.querySelector("h1")?.textContent
      const designation = teacherProfile.querySelector(".designation")?.textContent
      const subject = teacherProfile.querySelector(".subject")?.textContent
      const bio = teacherProfile.querySelector(".bio")?.textContent
      const image = teacherProfile.querySelector("img")?.src

      if (name) {
        const schema = {
          "@context": "https://schema.org",
          "@type": "Person",
          name: name,
          jobTitle: designation,
          description: bio,
          image: image,
          worksFor: {
            "@type": "EducationalOrganization",
            name: "Prottasha Model School",
          },
        }

        const script = document.createElement("script")
        script.type = "application/ld+json"
        script.textContent = JSON.stringify(schema)
        document.head.appendChild(script)
      }
    }
  }

  // Add Article schema for notices
  function addNoticeSchema() {
    const noticeDetails = document.querySelector(".notice-details")
    if (noticeDetails) {
      const title = noticeDetails.querySelector("h1")?.textContent
      const content = noticeDetails.querySelector(".notice-content")?.textContent
      const publishDate = noticeDetails.querySelector(".notice-date")?.textContent

      if (title && content) {
        const schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          articleBody: content,
          datePublished: publishDate,
          author: {
            "@type": "Organization",
            name: "Prottasha Model School",
          },
          publisher: {
            "@type": "EducationalOrganization",
            name: "Prottasha Model School",
            logo: {
              "@type": "ImageObject",
              url: "https://prottashaschool.edu.bd/images/logo.png",
            },
          },
        }

        const script = document.createElement("script")
        script.type = "application/ld+json"
        script.textContent = JSON.stringify(schema)
        document.head.appendChild(script)
      }
    }
  }

  // Initialize schema additions
  addBreadcrumbSchema()
  addFAQSchema()
  addTeacherSchema()
  addNoticeSchema()

  // Social sharing functionality
  function initSocialSharing() {
    const shareButtons = document.querySelectorAll(".share-btn")

    shareButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        const platform = button.getAttribute("data-platform")
        const url = encodeURIComponent(window.location.href)
        const title = encodeURIComponent(document.title)
        const description = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || "")

        let shareUrl = ""

        switch (platform) {
          case "facebook":
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
            break
          case "twitter":
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
            break
          case "linkedin":
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
            break
          case "whatsapp":
            shareUrl = `https://wa.me/?text=${title}%20${url}`
            break
        }

        if (shareUrl) {
          window.open(shareUrl, "_blank", "width=600,height=400")
        }
      })
    })
  }

  initSocialSharing()

  // Performance monitoring
  function trackPagePerformance() {
    if ("performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType("navigation")[0]
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart

          // Log performance data (in production, send to analytics)
          console.log("Page Load Time:", loadTime + "ms")

          // Track Core Web Vitals
          if ("web-vitals" in window) {
            // This would require the web-vitals library
            // getCLS(console.log)
            // getFID(console.log)
            // getLCP(console.log)
          }
        }, 0)
      })
    }
  }

  trackPagePerformance()
})
