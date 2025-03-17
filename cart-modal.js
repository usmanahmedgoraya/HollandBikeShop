// Cart Modal Functionality
const cartModal = (() => {
    const state = {
        isOpen: false,
        cartItems: [
            {
                name: "BikeNL Zadeldekje Universeel Waterdicht",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-20%20at%2010.46.19_c5d8a48f.jpg-NM6Xg8MJnm22H50e89PsVI4sF9DAq4.jpeg",
                price: 4.95,
            },
        ],
    };

    const elements = {
        modal: document.getElementById('cartModal'),
        overlay: document.getElementById('modalOverlay'),
        cartBtn: document.querySelector('.cart-icon'),
        closeBtn: document.getElementById('closeCart'),
        header: document.querySelector('header'),
        cartItemsContainer: document.getElementById('cartItems'),
        cartBadge: document.getElementById('cartBadge'),
        cartTotal: document.getElementById('cartTotal'),
    };

    // Function to Render Cart Items
    function renderCartItems() {
        // Clear existing items
        elements.cartItemsContainer.innerHTML = "";

        let totalPrice = 0;

        state.cartItems.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <div class="cart-item-price">
                        <span class="discounted-price">€ ${item.price.toFixed(2)}</span>
                    </div>
                </div>
            `;

            elements.cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price;
        });

        // Update Cart Badge
        elements.cartBadge.textContent = state.cartItems.length;

        // Update Total Price
        elements.cartTotal.textContent = `€ ${totalPrice.toFixed(2)}`;
    }

    // Function to Remove an Item
    function removeItem(item) {
        if (!item) return;

        // Get the item name from the DOM
        const itemName = item.querySelector('h3').textContent;

        // Remove the item from the state.cartItems array
        state.cartItems = state.cartItems.filter((cartItem) => cartItem.name !== itemName);

        // Re-render the cart items
        renderCartItems();
    }

    // Function to Open Cart Modal
    function openCart() {
        if (!elements.modal || !elements.overlay) return;

        state.isOpen = true;

        elements.modal.classList.add('active');
        elements.overlay.classList.add('active');
        elements.header.classList.add('header-without-shadow');
        elements.cartBtn.classList.remove('hide-before');
        elements.cartBtn.classList.add('cart-icon-color');

        // Render Cart Items When Modal Opens
        renderCartItems();
    }

    // Function to Close Cart Modal
    function closeCart() {
        if (!elements.modal || !elements.overlay) return;

        state.isOpen = false;

        elements.modal.classList.remove('active');
        elements.overlay.classList.remove('active');
        document.body.style.overflow = '';
        elements.header.classList.remove('box-shadow');
        elements.cartBtn.classList.add('hide-before');
        elements.cartBtn.classList.remove('cart-icon-color');
    }

    // Function to Toggle Cart Modal (only for cart button)
    function toggleCart() {
        if (state.isOpen) {
            closeCart();
        } else {
            openCart();
        }
    }

    // Event Listener for Clicks
    function handleClick(e) {
        const target = e.target;

        // Toggle modal only when cart button is clicked
        if (target.closest('.fa-solid') || target.closest('.cart-badge')) {
            toggleCart();
        }

        // Close modal when clicking outside the modal container
        if (state.isOpen && !target.closest('.cart-modal') && !target.closest('.cart-icon')) {
            closeCart();
        }

        // Remove item when remove button is clicked
        if (target.classList.contains('remove-item')) {
            removeItem(target.closest('.cart-item'));
        }
    }

    // Initialize Cart Modal
    function init() {
        document.addEventListener('click', handleClick);
        // Render cart items on page load
        renderCartItems();
    }

    return { init };
})();

// Initialize the cart modal
cartModal.init();