// Cart Modal Functionality
const cartModal = (() => {
    const state = {
        isOpen: false
    };

    const elements = {
        modal: document.getElementById('cartModal'),
        overlay: document.getElementById('modalOverlay'),
        cartBtn: document.querySelector('.cart-icon'),
        closeBtn: document.getElementById('closeCart'),
        header: document.querySelector('header')
    };

    function handleClick(e) {
        const target = e.target;

        if (target.closest('.cart-icon')) {
            openCart();
        } else if (target.closest('.close-cart') || 
                  (!target.closest('.cart-modal') && state.isOpen)) {
            closeCart();
        } else if (target.classList.contains('quantity-btn')) {
            handleQuantity(target);
        } else if (target.classList.contains('remove-item')) {
            removeItem(target.closest('.cart-item'));
        }
    }

    function handleQuantity(button) {
        const input = button.parentElement.querySelector('input');
        if (!input) return;

        let value = parseInt(input.value) || 1;

        if (button.classList.contains('plus')) {
            value = Math.min(value + 1, 99);
        } else if (button.classList.contains('minus')) {
            value = Math.max(value - 1, 1);
        }

        input.value = value;
        updateTotals();
    }

    function removeItem(item) {
        if (!item) return;
        item.remove();
        updateTotals();
    }

    function updateTotals() {
        console.log('Updating totals...');
    }

    function openCart() {
        if (!elements.modal || !elements.overlay) return;
        state.isOpen = true;
    
        elements.modal.classList.add('active');
        // elements.overlay.classList.add('active');
        // document.body.style.overflow = 'hidden';
    
        // Add class to hide the pseudo-element
        elements.header.classList.add('header-without-shadow')
        elements.cartBtn.classList.remove('hide-before');
        elements.cartBtn.classList.add('cart-icon-color');
    }
    
    function closeCart() {
        if (!elements.modal || !elements.overlay) return;
        state.isOpen = false;
    
        elements.modal.classList.remove('active');
        // elements.overlay.classList.remove('active');
        document.body.style.overflow = '';
    
        // Remove class to show the pseudo-element
        elements.header.classList.remove('box-shadow')
        elements.cartBtn.classList.add('hide-before');
        elements.cartBtn.classList.remove('cart-icon-color');
        
        
        
    }
    
    function init() {
        document.addEventListener('click', handleClick);
    }

    return { init };
})();

// Initialize the cart modal
cartModal.init();
