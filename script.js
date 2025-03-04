const localeModal = (() => {
    let isModalOpen = false;
    let isSidebarOpen = false;
    let activeTab = 'language';
    const state = {
        selectedLanguage: { text: 'Nederlands', code: 'nl' },
        selectedCountry: { text: 'Nederland', code: 'nl' },
        selectedCurrency: { text: 'EURO', symbol: '€', code: 'EUR' }
    };

    // DOM Elements
    const elements = {
        modal: document.getElementById('languageModal'),
        overlay: document.getElementById('modalOverlay'),
        closeBtn: document.getElementById('closeModal'),
        mobileSidebar: document.getElementById('mobileSidebar'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        closeSidebarBtn: document.getElementById('closeSidebarBtn')
    };

    // Event Handlers
    function handleClick(e) {
        const target = e.target;

        // Handle all actionable elements first
        if (target.closest('.selector-btn, .mobile-selector')) {
            const selector = target.closest('.selector-btn, .mobile-selector');
            handleSelectorClick(selector);
            return;
        }

        if(target.closest('#searchCountry')){
            return;
        }

        if (target.closest('#mobileMenuBtn')) {
            openSidebar();
            return;
        }

        if (target.closest('#closeSidebarBtn')) {
            closeSidebar();
            return;
        }

        if (target === elements.closeBtn) {
            closeModal();
            return;
        }

        if (target.closest('.tab-btn')) {
            const tabButton = target.closest('.tab-btn');
            switchTab(tabButton.dataset.tab);
            return;
        }

        if (target.closest('.option-btn')) {
            const optionButton = target.closest('.option-btn');
            handleOptionSelection(optionButton);
            return;
        }

        // Handle overlay click
        if (target === elements.overlay) {
            if (isModalOpen) closeModal();
            if (isSidebarOpen) closeSidebar();
            return;
        }

        // Close components if clicking outside
        if (isSidebarOpen && !target.closest('#mobileSidebar')) {
            closeSidebar();
        }
        if (isModalOpen && !target.closest('#languageModal')) {
            closeModal();
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            if (isModalOpen) closeModal();
            if (isSidebarOpen) closeSidebar();
        }
    }

    function handleResize() {
        if (window.innerWidth > 768 && isSidebarOpen) {
            closeSidebar();
        }
    }

    // Core Functions
    function handleSelectorClick(target) {
        const type = target.dataset.type;
        openModal();
        switchTab(type);
    }

    function handleOptionSelection(button) {
        const { language, country, currency } = button.dataset;
        const text = button.querySelector('.option-text')?.textContent || '';

        if (language) {
            state.selectedLanguage = { text, code: language };
        } else if (country) {
            state.selectedCountry = { text, code: country };
        } else if (currency) {
            state.selectedCurrency = {
                text,
                code: currency,
                symbol: getCurrencySymbol(currency)
            };
        }

        updateDisplay();
        closeModal(); // Only affects modal
    }

    function switchTab(tabId) {
        activeTab = tabId;
        updateTabsUI();
        updateContentVisibility();
    }

    // UI Updates
    function updateTabsUI() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === activeTab);
        });
    }

    function updateContentVisibility() {
        document.querySelectorAll('.content-section').forEach(section => {
            section.hidden = section.id !== `${activeTab}Content`;
        });
    }

    function updateDisplay() {
        // Language selector updates
        const languageSelector = document.querySelector('.language-selector');
        if (languageSelector) {
            languageSelector.querySelector('.fi').className = `fi fi-${state.selectedLanguage.code}`;
            languageSelector.querySelector('.selected-language').textContent = state.selectedLanguage.text;
        }

        // Country selector updates
        const countrySelector = document.querySelector('.country-currency-selector');
        if (countrySelector) {
            countrySelector.querySelector('.selected-country').textContent = state.selectedCountry.text;
            countrySelector.querySelector('.selected-currency span').textContent = state.selectedCurrency.text;
        }

        // Mobile selectors
        document.querySelectorAll('.value-text').forEach(selector => {
            if (selector.dataset.type === 'language') {
                selector.querySelector('.fi').className = `fi fi-${state.selectedLanguage.code} icon-size`;
                
                selector.querySelector('span:last-child').textContent = state?.selectedLanguage?.text;
                
            } else if (selector.dataset.type === 'country') {
                selector.querySelector('.fi').className = `fi fi-${state.selectedCountry.code} icon-size`;
                selector.querySelector('span:last-child').textContent = 
                    `${state.selectedCountry.text}`;
            }else if(selector.dataset.type === 'currency'){
                selector.querySelector('.fi').className = `fi fi-${state.selectedCurrency.code} icon-size`;
                selector.querySelector('span:last-child').textContent = 
                    ` ${state.selectedCurrency.symbol} ${state.selectedCurrency.text}`;
            }
        });
    }

    // Component Controls
    function openModal() {
        isModalOpen = true;
        elements.modal.classList.add('active');
        elements.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        isModalOpen = false;
        elements.modal.classList.remove('active');
        elements.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openSidebar() {
        isSidebarOpen = true;
        elements.mobileSidebar.classList.add('active');
        elements.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        isSidebarOpen = false;
        elements.mobileSidebar.classList.remove('active');
        elements.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Helpers
    function getCurrencySymbol(code) {
        const symbols = {
            'EUR': '€', 'GBP': '£', 'USD': '$',
            'CHF': 'Fr.', 'SEK': 'kr', 'NOK': 'kr'
        };
        return symbols[code] || code;
    }

    // Initialization
    function init() {
        // Event Listeners
        document.body.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleResize);
        
        // Initial UI setup
        updateDisplay();
    }

    return { init };
})();

// Initialize the modal
localeModal.init();