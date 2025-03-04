const searchDropdown = (() => {
    const state = {
        isOpen: false,
        searchTerm: "",
        suggestions: [
            "Buitenband",
            "Buitenband 28 inch",
            "Buitenband bakfiets",
            "Buitenband 28-622",
            "Buitenband schwalbe",
            "Buitenband continental",
            "Buitenband reparatie",
        ],
        products: [], // Will store fetched products
        isMobile: window.innerWidth <= 768,
        isLoading: false,
        hasSearched: false,
    }

    const elements = {
        searchInput: document.querySelector(".search-bar input"),
        searchButton: document.querySelector(".search-button"),
        dropdown: document.getElementById("searchDropdown"),
        suggestionsContainer: document.querySelector(".search-suggestions"),
        productsContainer: document.querySelector(".product-results"),
        overlay: document.getElementById("modalOverlay"),
        searchContainer: document.querySelector(".searchbar-container"),
        mobileHeader: document.querySelector(".mobile-search-header"),
        backButton: document.querySelector(".back-button"),
        clearButton: document.querySelector(".clear-button"),
        noResultsContainer: document.createElement("div"),
        resultsCountElement: document.querySelector(".results-count"),
    }

    // Initialize the no results container
    elements.noResultsContainer.className = "no-results-container"
    elements.noResultsContainer.innerHTML = `
          <div class="no-results">
              <i class="fa-solid fa-search"></i>
              <p>Geen resultaten gevonden</p>
              <span>Probeer een andere zoekterm</span>
          </div>
      `

    function handleSearchFocus() {
        openDropdown()
    }

    function handleSearchInput(e) {
        state.searchTerm = e.target.value
        state.hasSearched = true
        updateSuggestions()
        toggleClearButton()

        if (state.searchTerm.length >= 3) {
            searchProducts()
        } else {
            // If search term is too short, still show default products
            updateProductResults(getDefaultProducts())
            checkAndDisplayNoResults()
        }
    }

    function toggleClearButton() {
        if (elements.clearButton) {
            if (state.searchTerm.length > 0) {
                elements.clearButton.style.display = "flex"
            } else {
                elements.clearButton.style.display = "none"
            }
        }
    }

    function clearSearch() {
        elements.searchInput.value = ""
        state.searchTerm = ""
        state.hasSearched = true
        toggleClearButton()

        // Show all suggestions when search is cleared
        updateSuggestions()

        // Show default products when search is cleared
        updateProductResults(getDefaultProducts())

        elements.searchInput.focus()

        // Also update mobile input if it exists
        if (state.isMobile && elements.mobileHeader) {
            elements.mobileHeader.querySelector("input").value = ""
        }
    }

    function handleDocumentClick(e) {
        if (
            !e.target.closest(".search-bar") &&
            !e.target.closest(".search-dropdown") &&
            !e.target.closest(".mobile-search-header")
        ) {
            closeDropdown()
        }
    }

    function handleKeydown(e) {
        if (e.key === "Escape") {
            closeDropdown()
        }
    }

    function updateSuggestions() {
        // If no search term, show all suggestions
        if (!state.searchTerm) {
            const allSuggestionsHtml = state.suggestions
                .map(
                    (suggestion) => `
              <div class="suggestion-item">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <span>${suggestion}</span>
              </div>
          `
                )
                .join("")

            elements.suggestionsContainer.innerHTML = allSuggestionsHtml
            elements.suggestionsContainer.style.display = "block"
            return
        }

        // Otherwise, filter suggestions based on search term
        const filteredSuggestions = state.suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(state.searchTerm.toLowerCase())
        )

        const html = filteredSuggestions
            .map(
                (suggestion) => `
              <div class="suggestion-item">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <span>${highlightMatch(suggestion, state.searchTerm)}</span>
              </div>
          `
            )
            .join("")

        elements.suggestionsContainer.innerHTML = html

        // Show/hide suggestions based on whether there are any
        if (filteredSuggestions.length > 0) {
            elements.suggestionsContainer.style.display = "block"
        } else if (state.hasSearched && state.searchTerm) {
            elements.suggestionsContainer.style.display = "none"
        }
    }

    function highlightMatch(text, query) {
        if (!query) return text
        const regex = new RegExp(`(${query})`, "gi")
        return text.replace(regex, "<strong>$1</strong>")
    }

    function checkAndDisplayNoResults() {
        // Remove existing no results container if it's in the DOM
        if (elements.noResultsContainer.parentNode) {
            elements.noResultsContainer.parentNode.removeChild(elements.noResultsContainer)
        }

        // Show no results message if we've searched and have no products or suggestions
        if (state.hasSearched && state.searchTerm && state.products.length === 0) {
            const suggestionsVisible =
                elements.suggestionsContainer.style.display !== "none" && elements.suggestionsContainer.innerHTML.trim() !== ""

            if (!suggestionsVisible) {
                elements.dropdown.appendChild(elements.noResultsContainer)
            }
        }
    }

    function getDefaultProducts() {
        return [
            {
                name: "Schwalbe Buitenband 28x1.40 Marathon Plus SmartGuard Refl.",
                originalPrice: 43.9,
                discountedPrice: 34.95,
                image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-21%20at%2019.48.30_3a6f580c.jpg-05g4OrxzimbgmfRxqiksFQCrJ6aQuS.jpeg",
            },
            {
                name: 'Rexway Shopper Fietsband 28 x 1 5/8" x 1 3/8" - Bruin',
                originalPrice: 24.95,
                discountedPrice: 18.95,
                image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-21%20at%2019.48.30_3a6f580c.jpg-05g4OrxzimbgmfRxqiksFQCrJ6aQuS.jpeg",
            },
            {
                name: 'Continental Ride Tour Buitenband 28 x 1 5/8x3/8" Reflex-Zwart',
                originalPrice: 25.99,
                discountedPrice: 19.95,
                image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-21%20at%2019.48.30_3a6f580c.jpg-05g4OrxzimbgmfRxqiksFQCrJ6aQuS.jpeg",
            },
            {
                name: "CST Buitenband Sensamo Allround 28 x 1 5/8 x 1 3/8 Reflex",
                originalPrice: 25.95,
                discountedPrice: 17.95,
                image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-21%20at%2019.48.30_3a6f580c.jpg-05g4OrxzimbgmfRxqiksFQCrJ6aQuS.jpeg",
            },
        ]
    }

    async function searchProducts() {
        try {
            // Set loading state
            state.isLoading = true
            updateLoadingState(true)

            // Simulate API call with timeout
            setTimeout(() => {
                // Always populate with products for testing/demo purposes
                // In production, you would filter based on the search term
                const products = getDefaultProducts()

                // Update state
                state.products = products
                updateProductResults(products)

                // End loading state
                state.isLoading = false
                updateLoadingState(false)

                // Check for no results
                checkAndDisplayNoResults()
            }, 300)
        } catch (error) {
            console.error("Error fetching products:", error)
            state.isLoading = false
            updateLoadingState(false)
            checkAndDisplayNoResults()
        }
    }

    function updateLoadingState(isLoading) {
        if (isLoading) {
            // Add loading indicator
            const loadingHtml = `
                  <div class="loading-indicator">
                      <div class="spinner"></div>
                      <p>Zoeken...</p>
                  </div>
              `
            elements.productsContainer.innerHTML = loadingHtml

            // Hide no results while loading
            if (elements.noResultsContainer.parentNode) {
                elements.noResultsContainer.parentNode.removeChild(elements.noResultsContainer)
            }
        }
    }

    function updateProductResults(products) {
        if (products.length === 0) {
            elements.productsContainer.innerHTML = ""
            if (elements.resultsCountElement) {
                elements.resultsCountElement.style.display = "none"
            }
            return
        }

        const html = products
            .map(
                (product) => `
              <div class="product-card">
                  <img src="${product.image}" alt="${product.name}">
                  <div class="product-info">
                      <h3>${highlightMatch(product.name, state.searchTerm)}</h3>
                      <div class="price-delivery">
                          <div class="price">
                              <span class="original">€ ${product.originalPrice.toFixed(2).replace(".", ",")}</span>
                              <span class="discounted">€ ${product.discountedPrice.toFixed(2).replace(".", ",")}</span>
                          </div>
                          <div class="delivery-info">
                              <i class="fa-solid fa-check"></i>
                              <span>Direct leverbaar +/- 2 werkdagen</span>
                          </div>
                      </div>
                  </div>
              </div>
          `
            )
            .join("")

        elements.productsContainer.innerHTML = html

        // Show results count if we have products
        if (elements.resultsCountElement) {
            elements.resultsCountElement.style.display = "flex"
        }
    }

    function openDropdown() {
        state.isOpen = true
        elements.dropdown.classList.add("active")

        // Always show all suggestions when opening the dropdown
        updateSuggestions()

        // Always show default products when opening the dropdown
        const defaultProducts = getDefaultProducts()
        state.products = defaultProducts
        updateProductResults(defaultProducts)

        if (state.isMobile) {
            document.body.classList.add("modal-open")
            elements.searchContainer.classList.add("mobile-active")

            if (elements.mobileHeader) {
                elements.mobileHeader.style.display = "flex"

                // Ensure mobile input has the same value
                const mobileInput = elements.mobileHeader.querySelector("input")
                if (mobileInput) {
                    mobileInput.value = state.searchTerm
                    mobileInput.focus()
                }

                toggleClearButton()
            }
        } else {
            if (elements.overlay) {
                elements.overlay.classList.add("active")
            }
        }
    }

    function closeDropdown() {
        state.isOpen = false
        elements.dropdown.classList.remove("active")

        if (state.isMobile) {
            document.body.classList.remove("modal-open")
            elements.searchContainer.classList.remove("mobile-active")
            if (elements.mobileHeader) {
                elements.mobileHeader.style.display = "none"
            }
        } else {
            if (elements.overlay) {
                elements.overlay.classList.remove("active")
            }
        }
    }

    function handleResize() {
        const wasMobile = state.isMobile
        state.isMobile = window.innerWidth <= 768

        // Only reapply if the device type changed
        if (wasMobile !== state.isMobile && state.isOpen) {
            closeDropdown()
            openDropdown()
        }
    }

    function init() {
        // Create mobile header if it doesn't exist
        if (!elements.mobileHeader) {
            const mobileHeader = document.createElement("div")
            mobileHeader.className = "mobile-search-header"
            mobileHeader.innerHTML = `
                  <button class="back-button">
                      <i class="fa-solid fa-arrow-left"></i>
                  </button>
                  <div class="mobile-search-input-container">
                      <input type="text" placeholder="Zoekterm, EAN of artikelnummer...">
                      <button class="search-button">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                      <button class="clear-button" style="display: none; padding-left:4px;">
                          <i class="fa-solid fa-times"></i>
                      </button>
                  </div>
                  
              `

            document.body.insertBefore(mobileHeader, document.body.firstChild)
            elements.mobileHeader = mobileHeader
            elements.backButton = mobileHeader.querySelector(".back-button")
            elements.clearButton = mobileHeader.querySelector(".clear-button")

            // Sync the mobile input with the desktop input
            const mobileInput = mobileHeader.querySelector("input")
            mobileInput.addEventListener("input", (e) => {
                elements.searchInput.value = e.target.value
                handleSearchInput(e)
            })

            // Add event listeners for mobile header
            elements.backButton.addEventListener("click", closeDropdown)
            elements.clearButton.addEventListener("click", clearSearch)
        }

        // Add event listeners
        elements.searchInput.addEventListener("focus", handleSearchFocus)
        elements.searchInput.addEventListener("input", handleSearchInput)
        elements.searchButton.addEventListener("click", handleSearchFocus)
        document.addEventListener("click", handleDocumentClick)
        document.addEventListener("keydown", handleKeydown)
        window.addEventListener("resize", handleResize)

        // Handle suggestion clicks
        elements.suggestionsContainer.addEventListener("click", (e) => {
            const item = e.target.closest(".suggestion-item")
            if (item) {
                const text = item.querySelector("span").textContent
                elements.searchInput.value = text
                if (state.isMobile && elements.mobileHeader) {
                    elements.mobileHeader.querySelector("input").value = text
                }
                state.searchTerm = text
                state.hasSearched = true
                toggleClearButton()
                searchProducts()
            }
        })

        // Handle product clicks
        elements.productsContainer.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card")
            if (card) {
                // Navigate to product page or perform desired action
                console.log("Product clicked:", card.querySelector("h3").textContent)
            }
        })

        // Initialize elements reference
        elements.resultsCountElement = document.querySelector(".results-count")
    }

    return { init }
})()

// Initialize the search dropdown
document.addEventListener("DOMContentLoaded", () => {
    searchDropdown.init()
})
