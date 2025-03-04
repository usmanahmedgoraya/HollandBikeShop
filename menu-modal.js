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

    function handleNavHover(e) {
        const navItem = e.target.closest('.nav-link');
        if (!navItem) return;

        // Remove active class from previous nav link
        if (state.activeNavLink) {
            state.activeNavLink.classList.remove('nav-link-active');
        }

        // Add active class to current nav link
        navItem.classList.add('nav-link-active');
        state.activeNavLink = navItem;

        const menuId = navItem.dataset.menu;
        if (menuId === state.activeMenu) return;

        state.activeMenu = menuId;
        openMenu();
    }

    function handleNavClick(e) {
        const navItem = e.target.closest('.nav-link');
        if (!navItem) return;

        e.preventDefault();
        
        const menuId = navItem.dataset.menu;
        if (menuId === state.activeMenu && state.isOpen) {
            closeMenu();
            navItem.classList.remove('nav-link-active');
            state.activeNavLink = null;
        } else {
            // Remove active class from previous nav link
            if (state.activeNavLink) {
                state.activeNavLink.classList.remove('nav-link-active');
            }

            // Add active class to current nav link
            navItem.classList.add('nav-link-active');
            state.activeNavLink = navItem;
            
            state.activeMenu = menuId;
            openMenu();
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
            if (window.innerWidth > 768) {
                link.addEventListener('mouseenter', handleNavHover);
            }
            link.addEventListener('click', handleNavClick);
        });

        elements.megaMenu.addEventListener('mouseleave', handleMouseLeave);
        elements.header.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('click', handleDocumentClick);

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
                if (state.activeNavLink) {
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