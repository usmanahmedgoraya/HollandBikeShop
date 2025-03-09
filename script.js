const data = {
    languages: [
        { code: 'nl', text: 'Nederlands', flag: 'nl' },
        { code: 'en', text: 'English', flag: 'gb' },
        { code: 'de', text: 'Deutsch', flag: 'de' },
        { code: 'fr', text: 'Français', flag: 'fr' },
        { code: 'es', text: 'Español', flag: 'es' },
        { code: 'it', text: 'Italiano', flag: 'it' }
    ],
    currencies: [
        { code: 'EUR', text: 'Euro', symbol: '€', countryCode: 'eu' },
        { code: 'GBP', text: 'Pound', symbol: '£', countryCode: 'gb' },
        { code: 'USD', text: 'Dollar', symbol: '$', countryCode: 'us' },
        { code: 'CHF', text: 'Franc', symbol: 'Fr.', countryCode: 'ch' },
        { code: 'SEK', text: 'Krona', symbol: 'kr', countryCode: 'se' },
        { code: 'NOK', text: 'Krone', symbol: 'kr', countryCode: 'no' }
    ]
};

// Hardcoded countries
const highlightedCountries = [
    { code: 'nl', name: 'Nederland', flag: 'nl' },
    { code: 'be', name: 'Belgium', flag: 'be' },
    { code: 'de', name: 'Germany', flag: 'de' },
    { code: 'fr', name: 'France', flag: 'fr' },
    { code: 'gb', name: 'England', flag: 'gb' },
    { code: 'es', name: 'Span', flag: 'es' }
];

const localeModal = (() => {
    let isModalOpen = false;
    let isSidebarOpen = false;
    let activeTab = 'language';
    const state = {
        selectedLanguage: data.languages[0],
        selectedCurrency: data.currencies[0],
        selectedCountry: highlightedCountries[0],
    };

    // DOM Elements
    const elements = {
        modal: document.getElementById('languageModal'),
        overlay: document.getElementById('modalOverlay'),
        closeBtn: document.getElementById('closeModal'),
        mobileSidebar: document.getElementById('mobileSidebar'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        closeSidebarBtn: document.getElementById('closeSidebarBtn'),
        currencyFlag: document.getElementById('currency-flag'),
        countryOptions: document.getElementById('countryOptions'),
        languageOptions: document.getElementById('languageOptions'),
        currencyOptions: document.getElementById('currencyOptions'),
        tabsMenu: document.getElementById('tabsMenu'),
        selectedLanguageHeader: document.querySelector('.selected-language'),
        selectedCountryHeader: document.querySelector('.selected-country'),
        selectedCurrencyHeader: document.querySelector('.selected-currency span'),
        searchCountryInput: document.getElementById('searchCountry'),
        europaImage: document.querySelector('.europa-image'),
        countryListContainer: document.getElementById('countryListContainer'),
        // Mobile Sidebar Elements
        mobileLanguageValue: document.getElementById('mobileLanguage'),
        mobileCountryValue: document.getElementById('mobileCountry'),
        mobileCurrencyValue: document.getElementById('mobileCurrency'),
    };

    let allCountries = [];

    // Fetch countries from API
    async function fetchCountries() {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const data = await response.json();

            // Filter for European countries only
            const apiCountries = data.filter(country => country.region === "Europe");

            // Merge hardcoded and API countries
            allCountries = mergeCountries(highlightedCountries, apiCountries);

            // Generate the country list
            generateCountryList(allCountries);
        } catch (error) {
            console.error("Error fetching countries:", error);
            elements.countryListContainer.textContent = "Failed to load countries.";
        }
    }

    // Merge hardcoded and API countries
    function mergeCountries(hardcoded, api) {
        const merged = [...hardcoded];

        // Add API countries if they don't already exist in the hardcoded list
        api.forEach(apiCountry => {
            const exists = hardcoded.some(hardcodedCountry => hardcodedCountry.code === apiCountry.cca2);
            if (!exists) {
                merged.push({
                    code: apiCountry.cca2,
                    name: apiCountry.name.common,
                    flag: apiCountry.cca2.toLowerCase()
                });
            }
        });

        return merged;
    }

    // Generate the country list
    function generateCountryList(countries) {
        // Clear existing options
        elements.countryOptions.innerHTML = "";
        elements.countryListContainer.innerHTML = "";

        // Create hardcoded country buttons
        highlightedCountries.forEach(country => {
            const countryButton = document.createElement("button");
            countryButton.classList.add("option-btn");
            countryButton.dataset.country = country.code;

            const flagSpan = document.createElement("span");
            flagSpan.classList.add("fi", `fi-${country.flag}`);
            countryButton.appendChild(flagSpan);

            const textSpan = document.createElement("span");
            textSpan.classList.add("option-text");
            textSpan.textContent = country.name;
            countryButton.appendChild(textSpan);

            elements.countryOptions.appendChild(countryButton);
        });

        // Create Europa section for API-fetched countries
        const europaSection = document.createElement("div");
        europaSection.classList.add("country-group");

        const europaHeading = document.createElement("h3");
        europaHeading.textContent = "Europa";
        europaSection.appendChild(europaHeading);

        const optionsGrid = document.createElement("div");
        optionsGrid.classList.add("options-grid");

        // Create API-fetched country buttons
        countries.forEach(country => {
            if (!highlightedCountries.some(hardcodedCountry => hardcodedCountry.code === country.code)) {
                const countryButton = document.createElement("button");
                countryButton.classList.add("option-btn");
                countryButton.dataset.country = country.code;

                const flagSpan = document.createElement("span");
                flagSpan.classList.add("fi", `fi-${country.flag}`);
                countryButton.appendChild(flagSpan);

                const textSpan = document.createElement("span");
                textSpan.classList.add("option-text");
                textSpan.textContent = country.name;
                countryButton.appendChild(textSpan);

                optionsGrid.appendChild(countryButton);
            }
        });

        europaSection.appendChild(optionsGrid);
        elements.countryListContainer.appendChild(europaSection);

        // Toggle europa-image visibility
        if (countries.length > 0) {
            elements.europaImage.classList.remove("europa-image-hidden");
        } else {
            elements.europaImage.classList.add("europa-image-hidden");
        }
    }

    // Filter countries based on search term
    function filterCountries(searchTerm) {
        return allCountries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Search functionality
    function setupSearch() {
        elements.searchCountryInput.addEventListener("input", function () {
            const searchTerm = this.value.trim();
            const filteredCountries = filterCountries(searchTerm);
            generateCountryList(filteredCountries);
        });
    }

    // Initialize Options
    function initializeOptions() {
        // Language Options
        elements.languageOptions.innerHTML = data.languages.map(lang => `
            <button class="option-btn" data-language="${lang.code}">
                <span class="fi fi-${lang.flag}"></span>
                <span class="option-text">${lang.text}</span>
            </button>
        `).join('');
        elements.countryOptions.innerHTML = highlightedCountries.map(country => `
            <button class="option-btn" data-language="${country.code}">
                <span class="fi fi-${country.flag}"></span>
                <span class="option-text">${country.text}</span>
            </button>
        `).join('');

        // Currency Options
        elements.currencyOptions.innerHTML = data.currencies.map(currency => `
            <button class="option-btn" data-currency="${currency.code}" data-country-code="${currency.countryCode}">
                <span class="fi fi-${currency.countryCode}"></span>
                <span class="option-text">${currency.text} (${currency.symbol})</span>
            </button>
        `).join('');

        // Fetch and generate countries
        fetchCountries();
    }

    // Event Handlers
    function handleClick(e) {
        const target = e.target;

        // Handle selector clicks
        if (target.closest('.selector-btn, .mobile-selector')) {
            const selector = target.closest('.selector-btn, .mobile-selector');
            handleSelectorClick(selector);
            return;
        }

        // Handle mobile menu button
        if (target.closest('#mobileMenuBtn')) {
            openSidebar();
            return;
        }

        // Handle close sidebar button
        if (target.closest('#closeSidebarBtn')) {
            closeSidebar();
            return;
        }

        // Handle close modal button
        if (target === elements.closeBtn) {
            closeModal();
            return;
        }

        // Handle tab button clicks
        if (target.closest('.tab-btn')) {
            const tabButton = target.closest('.tab-btn');
            switchTab(tabButton.dataset.tab);
            return;
        }

        // Handle option button clicks
        if (target.closest('.option-btn')) {
            const optionButton = target.closest('.option-btn');
            handleOptionSelection(optionButton);
            return;
        }

        // Handle overlay clicks
        if (target === elements.overlay) {
            if (isModalOpen) closeModal();
            if (isSidebarOpen) closeSidebar();
            return;
        }

        // Close sidebar/modal if clicking outside
        if (isSidebarOpen && !target.closest('#mobileSidebar')) closeSidebar();
        if (isModalOpen && !target.closest('#languageModal')) closeModal();
    }

    function handleSelectorClick(target) {
        const type = target.dataset.type;
        openModal();
        switchTab(type);
    }

    function handleOptionSelection(button) {
        const { language, country, currency } = button.dataset;

        if (language) {
            state.selectedLanguage = data.languages.find(lang => lang.code === language);
        } else if (country) {
            state.selectedCountry = allCountries.find(c => c.code === country);
        } else if (currency) {
            state.selectedCurrency = data.currencies.find(curr => curr.code === currency);
        }

        // Update the display for both desktop and mobile
        updateDisplay();

        // Close the modal after selection
        closeModal();
    }

    // Update Display
    function updateDisplay() {
        // Update desktop header elements
        if (elements.selectedLanguageHeader) {

            elements.selectedLanguageHeader.innerHTML = `
                <span class="fi fi-${state.selectedLanguage.flag} icon-size"></span>
                <span>${state.selectedLanguage.text}</span>
            `;
        }
        if (elements.selectedCountryHeader) {
            elements.selectedCountryHeader.innerHTML = `
                <span class="fi fi-${state.selectedCountry.flag} icon-size"></span>
                <span>${state.selectedCountry.name}</span>
            `;
        }
        if (elements.selectedCurrencyHeader) {
            elements.currencyFlag.className = `fi fi-${state.selectedCurrency.countryCode}`;
            elements.selectedCurrencyHeader.textContent = state.selectedCurrency.text;
        }

        // Update mobile sidebar elements
        if (elements.mobileLanguageValue) {

            elements.mobileLanguageValue.innerHTML = `
                <span class="fi fi-${state.selectedLanguage.flag} icon-size"></span>
                <span>${state.selectedLanguage.text}</span>
            `;
        }
        if (elements.mobileCountryValue) {
            elements.mobileCountryValue.innerHTML = `
                <span class="fi fi-${state.selectedCountry.flag} icon-size"></span>
                <span>${state.selectedCountry.name}</span>
            `;
        }
        if (elements.mobileCurrencyValue) {
            elements.mobileCurrencyValue.innerHTML = `
                <span class="fi fi-${state.selectedCurrency.countryCode} icon-size"></span>
                <span>${state.selectedCurrency.text}</span>
            `;
        }
    }

    // Switch Tabs
    function switchTab(tabId) {
        activeTab = tabId;
        updateTabsUI();
        updateContentVisibility();
    }

    // Update Tabs UI
    function updateTabsUI() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === activeTab);
        });
    }

    // Update Content Visibility
    function updateContentVisibility() {
        document.querySelectorAll('.content-section').forEach(section => {
            section.hidden = section.id !== `${activeTab}Content`;
        });
    }

    // Open Modal
    function openModal() {
        isModalOpen = true;
        elements.modal.classList.add('active');
        elements.overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close Modal
    function closeModal() {
        isModalOpen = false;
        elements.modal.classList.remove('active');
        elements.overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Open Sidebar
    function openSidebar() {
        isSidebarOpen = true;
        elements.mobileSidebar.classList.add('active');
        elements.overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close Sidebar
    function closeSidebar() {
        isSidebarOpen = false;
        elements.mobileSidebar.classList.remove('active');
        elements.overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Initialize
    function init() {
        initializeOptions();
        setupSearch();
        document.body.addEventListener('click', handleClick);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (isModalOpen) closeModal();
                if (isSidebarOpen) closeSidebar();
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isSidebarOpen) closeSidebar();
        });
        updateDisplay();
    }

    return { init };
})();

// Initialize the modal
localeModal.init();