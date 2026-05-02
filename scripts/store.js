
let cart = [];

// temporary notification message 
// Creates a notification, displays it for 3 seconds
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background-color: #4CAF50; color: white; padding: 16px 24px; border-radius: 4px; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); z-index: 1000; animation: slideIn 0.3s ease-in-out;';
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add a product to the cart with specified quantity
function addToCart(product, price, nights = 1) {
    cart.push({ product: product, price: parseFloat(price), nights: nights });
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Item has been added to cart');
}

// Update the cart on the page with current cart items and total
// Shows empty message if no items
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Shows empty cart message if no items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = 'Total: $0.00';
        return;
    }

    let itemsHtml = '<ul>';
    let total = 0;

    cart.forEach((item, index) => {
        // Calculate item total
        const itemTotal = item.price * item.nights;
        const nightsText = item.nights > 1 ? ` (${item.nights} nights)` : ' (1 night)';
        itemsHtml += `<li>${item.product}${nightsText} - $${itemTotal.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button></li>`;
        total += itemTotal;
    });

    // Display items and total
    itemsHtml += '</ul>';
    cartItems.innerHTML = itemsHtml;
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Remove an item from cart
// Updates display and saves changes
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    saveCartToStorage();
}

// Save current cart to browser's local storage
function saveCartToStorage() {
    localStorage.setItem('neonCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('neonCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// validate cart and redirect to checkout page
// shows alert if cart is empty
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add some items before checking out.');
        return;
    }
    window.location.href = 'cart.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // Load any previously saved cart
    loadCartFromStorage();

    // click to all "Add to Cart" buttons
    //product info, quantity,
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            const nightsSelector = this.getAttribute('data-nights-selector');
            
            // Default to 1 unit, or quantity from dropdown
            let nights = 1;
            if (nightsSelector) {
                const nightsElement = document.getElementById(nightsSelector);
                if (nightsElement) {
                    nights = parseInt(nightsElement.value);
                }
            }
            
            addToCart(product, price, nights);
        });
    });

    // click to checkout button
    document.getElementById('checkout-btn').addEventListener('click', proceedToCheckout);
});