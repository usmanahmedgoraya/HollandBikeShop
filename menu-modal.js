const megaMenu = (() => {
    const state = {
        activeMenu: null,
        isOpen: false,
        activeNavLink: null
    };

    const elements = {
        navLinks: document.querySelectorAll('.nav-link'),
        megaMenu: document.getElementById('megaMenu'),
        header: document.querySelector('.header'),
        listNav: document.querySelector('.active-link-style')
    };

    function handleNavClick(e) {
        const navItem = e.target.closest('.nav-link');
        if (!navItem) return;

        e.preventDefault();

        const menuId = navItem.dataset.menu;

        // Only open the modal for the specific menu (e.g., "Fietsaccessoires")
        if (menuId === "fietsaccessoires") {
            if (menuId === state.activeMenu && state.isOpen) {
                closeMenu();
                navItem.classList.remove('active');
                navItem.classList.remove('nav-link-active');
                state.activeNavLink = null;
            } else {
                // Remove active class from previous nav link
                if (state.activeNavLink) {
                    state.activeNavLink.classList.remove('active');
                    state.activeNavLink.classList.remove('nav-link-active');
                }

                // Add active class to current nav link
                navItem.classList.add('nav-link-active');
                navItem.classList.add('active');
                state.activeNavLink = navItem;

                state.activeMenu = menuId;
                openMenu();
            }
        } else {
            // Close the modal if another nav link is clicked
            closeMenu();
            if (state.activeNavLink) {
                state.activeNavLink.classList.remove('nav-link-active');
                state.activeNavLink.classList.remove('active');
                state.activeNavLink = null;
            }
        }
    }

    function handleMouseLeave() {
        setTimeout(() => {
            if (!document.querySelector('.nav-link:hover') &&
                !elements.megaMenu.matches(':hover')) {
                closeMenu();
                // Remove active class when mouse leaves
                if (state.activeNavLink) {
                    state.activeNavLink.classList.remove('nav-link-active');
                    state.activeNavLink = null;
                }
            }
        }, 100);
    }

    function handleDocumentClick(e) {
        if (!e.target.closest('.nav-link') &&
            !e.target.closest('.mega-menu')) {
            closeMenu();
            // Remove active class when clicking outside
            if (state.activeNavLink) {
                state.activeNavLink.classList.remove('active');
                state.activeNavLink.classList.remove('nav-link-active');
                state.activeNavLink = null;
            }
        }
    }

    function openMenu() {
        if (!state.isOpen) {
            elements.megaMenu.classList.add('active');
            elements.listNav.classList.remove('active');
            state.isOpen = true;
        }
    }

    function closeMenu() {
        elements.megaMenu.classList.remove('active');
        elements.listNav.classList.add('active');
        state.activeMenu = null;
        state.isOpen = false;
    }

    function init() {
        elements.navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        // elements.megaMenu.addEventListener('mouseleave', handleMouseLeave);
        // elements.header.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('click', handleDocumentClick);

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
                if (state.activeNavLink) {
                    state.activeNavLink.classList.remove('active');
                    state.activeNavLink.classList.remove('nav-link-active');
                    state.activeNavLink = null;
                }
            }
        });
    }

    return { init };
})();

// Initialize the mega menu
document.addEventListener('DOMContentLoaded', () => {
    megaMenu.init();
});