const megaMenu = (() => {
    const state = {
        activeMenu: null,
        isOpen: false,
        activeNavLink: null
    };

    const elements = {
        navLinks: document.querySelectorAll('.nav-link'),
        megaMenu: document.getElementById('megaMenu'),
        megaMenuGrid: document.getElementById('megaMenuGrid'),
        header: document.querySelector('.header'),
        listNav: document.querySelector('.active-link-style')
    };

    // Mega Menu Data reorganized to match the exact column structure
    const megaMenuData = {
        column1: [
            {
                title: "Bidons",
                icon: "/images/SVG/_-01.svg",
                links: [
                    { text: "Bidonhouders", href: "#" },
                    { text: "Bidonhouder Onderdelen", href: "#" },
                ],
            },
            {
                title: "Fietsaccessoires",
                icon: "/images/SVG/_-02.svg",
                links: [
                    { text: "Telefoon Fietshouder", href: "#" },
                    { text: "Fietsbellen", href: "#" },
                    { text: "Fietsspiegel", href: "#" },
                    { text: "Batterij", href: "#" },
                    { text: "Snelbinder", href: "#" },
                ],
            },
            {
                title: "Fietscomputers",
                icon: "/images/SVG/_-03.svg",
                links: [
                    { text: "Fietsnavigatie", href: "#" },
                    { text: "Fietscomputer Onderdelen", href: "#" },
                ],
            }
        ],
        column2: [
            {
                title: "Fietsendragers",
                icon: "/images/SVG/_-04.svg",
                links: [
                    { text: "Dakdragers", href: "#" },
                    { text: "Onderdelen Fietsendragers", href: "#" },
                ],
            },
            {
                title: "Fietsgereedschap",
                icon: "/images/SVG/_-05.svg",
                links: [
                    { text: "Lierslift", href: "#" },
                    { text: "Fietsbeugels & Fietsstandaards", href: "#" },
                ],
            },
            {
                title: "Fietshoes",
                icon: "/images/SVG/_-06.svg",
                links: [
                    { text: "Fietskoffers", href: "#" },
                    { text: "Fiets Draagtassen", href: "#" },
                ],
            },
            {
                title: "Fietskarren",
                icon: "/images/SVG/_-07.svg",
                links: [
                    { text: "Fietskar Onderdelen", href: "#" },
                ],
            },
            {
                title: "Fietstassen",
                icon: "/images/SVG/_-13.svg",
                links: [
                    { text: "Tas Onderdelen", href: "#" },
                ],
            }
        ],
        column3: [
            {
                title: "Fietslak en Verf",
                icon: "/images/SVG/_-08.svg",
                links: [
                    { text: "Kwasten", href: "#" },
                ],
            },
            {
                title: "Fietspompen",
                icon: "/images/SVG/_-09.svg",
                links: [
                    { text: "Fietspomp Onderdelen", href: "#" },
                ],
            },
            {
                title: "Fietssloten",
                icon: "/images/SVG/_-10.svg",
                links: [
                    { text: "Fietsslot bevestigings materiaal", href: "#" },
                ],
            },
            {
                title: "Fietsstoelje",
                icon: "/images/SVG/_-11.svg",
                links: [
                    { text: "Fietsstoelje Bakfiets", href: "#" },
                    { text: "Bagagedrager Kussen", href: "#" },
                    { text: "Fietszitje Onderdelen", href: "#" },
                ],
            }
        ],
        column4: [
            {
                title: "Fietsmanden",
                icon: "/images/SVG/_-12.svg",
                links: [
                    { text: "Fietskrat", href: "#" },
                    { text: "Fietsmand Hond", href: "#" },
                    { text: "Fietsmand Onderdelen", href: "#" },
                ],
            },
            {
                title: "Fietstrainers",
                icon: "/images/SVG/_-14.svg",
                links: [],
            },
            {
                title: "Fiets Schoonmaakmiddelen",
                icon: "/images/SVG/_-15.svg",
                links: [
                    { text: "Schoonmaakset", href: "#" },
                    { text: "Schoonmaak Toebehoren", href: "#" },
                    { text: "Mobiele Drukreiniger", href: "#" },
                ],
            }
        ],
        column5: [
            {
                title: "Sportvoeding",
                icon: "/images/SVG/_-17.svg",
                links: [
                    { text: "Sport Drank", href: "#" },
                    { text: "Verzorging", href: "#" },
                ],
            },
            {
                title: "Kinderfiets Accessoires",
                icon: "/images/SVG/_-18.svg",
                links: [
                    { text: "Kinderbellen", href: "#" },
                    { text: "Kinder Fietstassen", href: "#" },
                    { text: "Kinder Fietsmanden", href: "#" },
                    { text: "Kinderfiets Krat", href: "#" },
                    { text: "Zijwielen Kinderfiets", href: "#" },
                    { text: "Veiligheids Kinderfiets", href: "#" },
                    { text: "Driewieler Kinderfiets", href: "#" },
                    { text: "Hockeyklem & Racketclip", href: "#" },
                    { text: "Poppenzitjes", href: "#" },
                ],
            }
        ]
    };

    // Updated function to generate menu with column structure
    function generateMegaMenu() {
        elements.megaMenuGrid.innerHTML = ""; // Clear existing content

        // Create and append each column
        Object.values(megaMenuData).forEach((columnData) => {
            const menuColumn = document.createElement("div");
            menuColumn.className = "menu-column";

            columnData.forEach((category) => {
                const menuCategory = document.createElement("div");
                menuCategory.className = "menu-category";

                const categoryIcon = document.createElement("div");
                categoryIcon.className = "category-icon";
                categoryIcon.innerHTML = `<img src="${category.icon}" alt="${category.title}">`;

                const categoryContent = document.createElement("div");
                categoryContent.className = "category-content";
                categoryContent.innerHTML = `<h3>${category.title}</h3>`;

                const linksList = document.createElement("ul");
                category.links.forEach((link) => {
                    const li = document.createElement("li");
                    li.innerHTML = `<a href="${link.href}">${link.text}</a>`;
                    linksList.appendChild(li);
                });

                categoryContent.appendChild(linksList);
                menuCategory.appendChild(categoryIcon);
                menuCategory.appendChild(categoryContent);
                menuColumn.appendChild(menuCategory);
            });

            elements.megaMenuGrid.appendChild(menuColumn);
        });
    }

    // Rest of the code remains the same...
    function handleNavClick(e) {
        const navItem = e.target.closest('.nav-link');
        if (!navItem) return;

        e.preventDefault();

        const menuId = navItem.dataset.menu;

        if (menuId === "fietsaccessoires") {
            if (menuId === state.activeMenu && state.isOpen) {
                closeMenu();
                navItem.classList.remove('active');
                navItem.classList.remove('nav-link-active');
                state.activeNavLink = null;
            } else {
                if (state.activeNavLink) {
                    state.activeNavLink.classList.remove('active');
                    state.activeNavLink.classList.remove('nav-link-active');
                }
                navItem.classList.add('nav-link-active');
                navItem.classList.add('active');
                state.activeNavLink = navItem;
                state.activeMenu = menuId;
                openMenu();
            }
        } else {
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
        generateMegaMenu();
        elements.navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });
        elements.megaMenu.addEventListener('mouseleave', handleMouseLeave);
        elements.header.addEventListener('mouseleave', handleMouseLeave);
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