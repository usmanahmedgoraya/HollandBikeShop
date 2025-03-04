document.addEventListener("DOMContentLoaded", () => {
  // Accordion functionality for mobile
  const accordionHeaders = document.querySelectorAll(".accordion-header")

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      // Toggle active class on the parent accordion item
      const accordionItem = this.parentElement
      accordionItem.classList.toggle("active")

      // Close other accordion items
      const allAccordionItems = document.querySelectorAll(".accordion-item")
      allAccordionItems.forEach((item) => {
        if (item !== accordionItem) {
          item.classList.remove("active")
        }
      })
    })
  })

  // Placeholder image handling
  function handlePlaceholderImages() {
    // In a real implementation, you would replace these with actual image paths
    // This is just to simulate the functionality

    // For logo
    const logoImgs = document.querySelectorAll('.logo, [alt="HBS logo"]')
    logoImgs.forEach((img) => {
      if (img && img.src.includes("HBSLOGOWHITE.svg")) {
        console.log("Logo image would be loaded here")
      }
    })

    // For mascot
    const mascotImg = document.querySelector(".mascot-image")
    if (mascotImg && mascotImg.src.includes("footer-cycle-logo.png")) {
      console.log("Mascot image would be loaded here")
    }

    // For certification badge
    const certImgs = document.querySelectorAll(".cert-image")
    certImgs.forEach((img) => {
      if (img && img.src.includes("verification-stamp.png")) {
        console.log("Certification image would be loaded here")
      }
    })

    // For payment methods
    const paymentImgs = document.querySelectorAll(".payment-method img")
    paymentImgs.forEach((img) => {
      console.log("Payment method image would be loaded here: " + img.alt)
    })
  }

  // Call the image handler
  handlePlaceholderImages()

  // Handle responsive layout
  function handleResponsiveLayout() {
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      // Mobile-specific adjustments
      console.log("Mobile layout active")

      // You could automatically open the first accordion item on mobile
      // const firstAccordionItem = document.querySelector('.accordion-item');
      // if (firstAccordionItem) {
      //     firstAccordionItem.classList.add('active');
      // }
    } else {
      // Desktop-specific adjustments
      console.log("Desktop layout active")
    }
  }

  // Call responsive handler on load
  handleResponsiveLayout()

  // Handle window resize events
  window.addEventListener("resize", () => {
    handleResponsiveLayout()
  })
})

