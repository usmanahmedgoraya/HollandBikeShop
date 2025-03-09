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
    // logoImgs.forEach((img) => {
    //   if (img && img?.src?.includes("HBSLOGOWHITE.svg")) {
    //     console.log("Logo image would be loaded here")
    //   }
    // })

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

// Footer Data
const footerData = {
  ratings: {
    title: "Klantbeoordelingen",
    stars: 5,
    ratingCount: 7915,
    certificationImage: "./images/verification-stamp.png",
  },
  customerInfo: {
    title: "Je klantgegevens",
    links: [
      { text: "Mijn account", href: "#" },
      { text: "Eerdere bestellingen", href: "#" },
      { text: "Adresboek", href: "#" },
    ],
  },
  customerService: {
    title: "Klantenservice",
    links: [
      { text: "Servicepagina", href: "#" },
      { text: "Contact", href: "#" },
      { text: "Verzendkosten, Levertijd & Bezorging", href: "#" },
      { text: "Retourbeleid", href: "#" },
      { text: "E-Bike Foutcodes", href: "#" },
    ],
  },
  generalInfo: {
    title: "Algemene informatie",
    links: [
      { text: "Over Ons", href: "#" },
      { text: "Privacy Verklaring", href: "#" },
      { text: "Algemene Voorwaarden", href: "#" },
      { text: "Sitemap", href: "#" },
      { text: "Dutch-Repairs", href: "#" },
      { text: "Merken", href: "#" },
    ],
  },
  socialMedia: {
    title: "Volg je ons al?",
    icons: [
      { name: "instagram", href: "#", iconClass: "fa-brands fa-instagram" },
      { name: "facebook", href: "#", iconClass: "fa-brands fa-facebook-f" },
    ],
  },
  payments: [
    { name: "mastercard", image: "./images/SVG/mastercard.png" },
    { name: "visa", image: "./images/SVG/visa-logo-png-transparent.png" },
    { name: "paypal", image: "./images/SVG/paypal-transparent-paypal-free-free-png.png" },
    { name: "ideal", image: "./images/SVG/ideal.webp" },
    { name: "bancontact", image: "./images/SVG/bancontact.png" },
    { name: "klarna", image: "./images/SVG/klarna.png" },
    { name: "sofort", image: "./images/SVG/sofort-logo-vector-png-sofort-logo-512.png" },
    { name: "dhl", image: "./images/SVG/DHL-Logo.wine.png" },
    { name: "postnl", image: "./images/SVG/postnl.png" },
    { name: "cartebleue", image: "./images/SVG/CarteBleueLogo.svg.png" },
  ],
  copyright: "Copyright © 2008 - 2023 Hollandbikeshop.com Webshop by MARK-APP",
};

// Function to generate the footer
function generateFooter() {
  const footer = document.getElementById("footer");

  // Ratings Section (Mobile)
  const ratingsSection = `
    <div class="mobile-only ratings-section">
      <h2>${footerData.ratings.title}</h2>
      <div class="stars">
        ${'<i class="fas fa-star"></i>'.repeat(footerData.ratings.stars)}
      </div>
      <p class="rating-count">${footerData.ratings.ratingCount} Beoordelingen</p>
    </div>
  `;

  // Accordion Section (Mobile)
  const accordionSection = `
    <div class="mobile-only accordion-section">
      ${[footerData.customerInfo, footerData.customerService, footerData.generalInfo]
        .map(
          (section) => `
        <div class="accordion-item">
          <div class="accordion-header">
            <h3>${section.title}</h3>
            <span class="accordion-icon"><i class="fa-solid fa-angle-down"></i></span>
          </div>
          <div class="accordion-content">
            <ul>
              ${section.links
                .map((link) => `<li><a href="${link.href}">${link.text}</a></li>`)
                .join("")}
            </ul>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  // Desktop Footer Top
  const desktopFooterTop = `
    <div class="desktop-only footer-top">
      <div class="footer-container">
        <div class="footer-column brand-column">
          <div class="logo-container">
            <img src="./images/HBSLOGOWHITE.svg" alt="HBS logo">
          </div>
          <div class="social-container">
            <div class="mascot">
              <img src="./images/footer-cycle-logo.png" alt="Mascot" class="mascot-image">
            </div>
            <div>
              <p class="social-text">${footerData.socialMedia.title}</p>
              <div class="social-icons">
                ${footerData.socialMedia.icons
                  .map(
                    (icon) => `
                  <a href="${icon.href}" class="social-icon ${icon.name}">
                    <i class="${icon.iconClass}"></i>
                  </a>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
        ${[footerData.customerInfo, footerData.customerService, footerData.generalInfo]
          .map(
            (section) => `
          <div class="footer-column">
            <h3 class="column-title">${section.title}</h3>
            <ul class="footer-links">
              ${section.links
                .map((link) => `<li><a href="${link.href}">${link.text}</a></li>`)
                .join("")}
            </ul>
          </div>
        `
          )
          .join("")}
        <div class="footer-column rating-column">
          <h3 class="column-title pl-3">${footerData.ratings.title}</h3>
          <div class="rating">
            <div class="stars">
              ${'<span class="star"><i class="fa-solid fa-star"></i></span>'.repeat(
                footerData.ratings.stars
              )}
            </div>
            <div class="rating-count">${footerData.ratings.ratingCount} Beoordelingen</div>
          </div>
          <div class="certification">
            <img src="${footerData.ratings.certificationImage}" alt="Webshop Keurmerk" class="cert-image">
          </div>
        </div>
      </div>
    </div>
  `;

  // Mobile Logo Section
  const mobileLogoSection = `
    <div class="mobile-only logo-section">
      <div class="logo-container">
        <img src="./images/HBSLOGOORANGE.svg" alt="Hollandbikeshop.com" class="logo">
      </div>
      <p class="follow-text">${footerData.socialMedia.title}</p>
      <div class="social-icons">
        ${footerData.socialMedia.icons
          .map(
            (icon) => `
          <a href="${icon.href}" class="social-icon ${icon.name}">
            <i class="${icon.iconClass}"></i>
          </a>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  // Mobile Certification Section
  const mobileCertificationSection = `
    <div class="mobile-only certification-section">
      <img src="${footerData.ratings.certificationImage}" alt="Webshop Keurmerk" class="cert-image">
    </div>
  `;

  // Footer Bottom
  const footerBottom = `
    <div class="footer-bottom">
      <div class="payments">
        ${footerData.payments
          .map(
            (payment) => `
          <div class="payment-method">
            <img src="${payment.image}" alt="${payment.name}" width="100%">
          </div>
        `
          )
          .join("")}
      </div>
      <div class="footer-container">
        <div class="copyright">
          ${footerData.copyright}
        </div>
      </div>
    </div>
  `;

  // Combine all sections and insert into the footer
  footer.innerHTML = `
    ${ratingsSection}
    ${accordionSection}
    ${desktopFooterTop}
    ${mobileLogoSection}
    ${mobileCertificationSection}
    ${footerBottom}
  `;
}

// Generate the footer
generateFooter();

