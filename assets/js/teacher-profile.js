// Teacher profile data
const teacherProfiles = {
  1: {
    name: "Md. Abdul Rahman",
    designation: "Headmaster",
    subject: "School Administration",
    experience: "25+ years",
    education: "M.Ed in Educational Administration, University of Dhaka",
    email: "headmaster@prottashaschool.edu.bd",
    phone: "01940077100",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Md. Abdul Rahman has been leading Prottasha Model School with dedication and vision for over two decades. His commitment to educational excellence and student welfare has made the school one of the most respected institutions in the region. Under his leadership, the school has achieved remarkable success in academic performance and overall development of students.",
    achievements: [
      "Led the school to achieve 100% pass rate in SSC examinations",
      "Implemented modern teaching methodologies and technology integration",
      "Established partnerships with leading educational institutions",
      "Received Excellence in Education Leadership Award 2023",
    ],
    specializations: ["Educational Leadership", "Curriculum Development", "School Management"],
  },
  2: {
    name: "Mrs. Fatima Khatun",
    designation: "Senior Mathematics Teacher",
    subject: "Mathematics",
    experience: "15+ years",
    education: "M.Sc in Mathematics, University of Dhaka",
    email: "fatima@prottashaschool.edu.bd",
    phone: "01940077101",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Mrs. Fatima Khatun is a passionate mathematics educator who believes in making complex mathematical concepts accessible to all students. Her innovative teaching methods and patient approach have helped countless students overcome their fear of mathematics and achieve excellent results.",
    achievements: [
      "Students consistently achieve top grades in mathematics",
      "Developed innovative problem-solving techniques",
      "Conducted teacher training workshops on mathematics pedagogy",
      "Published research papers on effective mathematics teaching",
    ],
    specializations: ["Algebra", "Geometry", "Calculus", "Statistics"],
  },
  3: {
    name: "Mr. Abdul Karim",
    designation: "Science Teacher",
    subject: "Physics & Chemistry",
    experience: "12+ years",
    education: "M.Sc in Physics, Bangladesh University of Engineering and Technology",
    email: "karim@prottashaschool.edu.bd",
    phone: "01940077102",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Mr. Abdul Karim brings the wonders of science to life in his classroom. With his strong background in physics and chemistry, he conducts engaging experiments and demonstrations that spark curiosity and deep understanding among students.",
    achievements: [
      "Established the school's modern science laboratory",
      "Students won multiple science fair competitions under his guidance",
      "Organized science exhibitions and workshops",
      "Mentored students for national science olympiads",
    ],
    specializations: ["Experimental Physics", "Organic Chemistry", "Laboratory Management", "Science Fair Preparation"],
  },
  4: {
    name: "Ms. Rashida Sultana",
    designation: "English Teacher",
    subject: "English Language & Literature",
    experience: "10+ years",
    education: "M.A in English Literature, University of Dhaka",
    email: "rashida@prottashaschool.edu.bd",
    phone: "01940077103",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Ms. Rashida Sultana is dedicated to developing students' communication skills and appreciation for literature. Her interactive teaching style and focus on practical application have significantly improved students' English proficiency and confidence.",
    achievements: [
      "Students achieved excellent results in English examinations",
      "Organized annual English drama and debate competitions",
      "Conducted English language workshops for teachers",
      "Published articles on English language teaching methodologies",
    ],
    specializations: ["Creative Writing", "Public Speaking", "Literature Analysis", "Grammar and Composition"],
  },
}

// Load teacher profile based on URL parameter
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const teacherId = urlParams.get("id")
  const profileContent = document.getElementById("profileContent")
  const breadcrumbName = document.getElementById("teacherNameBreadcrumb")

  if (teacherId && teacherProfiles[teacherId]) {
    const teacher = teacherProfiles[teacherId]

    // Update page title and breadcrumb
    document.title = `${teacher.name} - Teacher Profile - Prottasha Model School`
    breadcrumbName.textContent = teacher.name

    // Generate profile HTML
    profileContent.innerHTML = `
      <div class="teacher-profile-header">
        <div class="profile-image">
          <img src="${teacher.image}" alt="${teacher.name}">
        </div>
        <div class="profile-basic-info">
          <h1>${teacher.name}</h1>
          <h2>${teacher.designation}</h2>
          <p class="subject-info">${teacher.subject}</p>
          <p class="experience-info">${teacher.experience} of teaching experience</p>
          <div class="contact-info">
            <p><strong>Email:</strong> <a href="mailto:${teacher.email}">${teacher.email}</a></p>
            ${teacher.phone ? `<p><strong>Phone:</strong> <a href="tel:${teacher.phone}">${teacher.phone}</a></p>` : ""}
          </div>
        </div>
      </div>

      <div class="profile-details">
        <div class="profile-section">
          <h3>About</h3>
          <p>${teacher.bio}</p>
        </div>

        <div class="profile-section">
          <h3>Education</h3>
          <p>${teacher.education}</p>
        </div>

        <div class="profile-section">
          <h3>Specializations</h3>
          <ul class="specializations-list">
            ${teacher.specializations.map((spec) => `<li>${spec}</li>`).join("")}
          </ul>
        </div>

        <div class="profile-section">
          <h3>Key Achievements</h3>
          <ul class="achievements-list">
            ${teacher.achievements.map((achievement) => `<li>${achievement}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="profile-actions">
        <a href="teachers.html" class="back-btn">← Back to Teachers</a>
        <a href="contact.html" class="contact-btn">Contact School</a>
      </div>
    `
  } else {
    // Teacher not found
    profileContent.innerHTML = `
      <div class="profile-error">
        <h2>Teacher Profile Not Found</h2>
        <p>The requested teacher profile could not be found.</p>
        <a href="teachers.html" class="back-btn">← Back to Teachers</a>
      </div>
    `
  }
})
