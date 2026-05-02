// cart
let cart = [];

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('neonCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        displayCartItems();
    }
}

function displayCartItems() {
    const cartDisplay = document.getElementById('cart-items-display');
    const cartTotal = document.getElementById('cart-total-display');

    if (cart.length === 0) {
        cartDisplay.innerHTML = '<p>No items in cart.</p>';
        cartTotal.textContent = 'Total: $0.00';
        return;
    }

    let itemsHtml = '<ul>';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * (item.nights || 1);
        const nightsText = (item.nights && item.nights > 1) ? ` (${item.nights} nights)` : (item.nights ? ' (1 night)' : '');
        itemsHtml += `<li>${item.product}${nightsText} - $${itemTotal.toFixed(2)}</li>`;
        total += itemTotal;
    });

    itemsHtml += '</ul>';
    cartDisplay.innerHTML = itemsHtml;
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function copyBillingToShipping() {
    const sameAddress = document.getElementById('same-address').checked;

    if (sameAddress) {
        document.getElementById('shipping-name').value = document.getElementById('billing-name').value;
        document.getElementById('shipping-address').value = document.getElementById('billing-address').value;
        document.getElementById('shipping-city').value = document.getElementById('billing-city').value;
        document.getElementById('shipping-zip').value = document.getElementById('billing-zip').value;
    } else {
        document.getElementById('shipping-name').value = '';
        document.getElementById('shipping-address').value = '';
        document.getElementById('shipping-city').value = '';
        document.getElementById('shipping-zip').value = '';
    }
}

function validateForm() {
    const errors = [];
    const errorDiv = document.getElementById('validation-errors');

    // clears errors
    errorDiv.innerHTML = '';

    // validations
    const billingName = document.getElementById('billing-name').value.trim();
    const billingEmail = document.getElementById('billing-email').value.trim();
    const billingPhone = document.getElementById('billing-phone').value.trim();
    const billingAddress = document.getElementById('billing-address').value.trim();
    const billingCity = document.getElementById('billing-city').value.trim();
    const billingZip = document.getElementById('billing-zip').value.trim();

    const shippingName = document.getElementById('shipping-name').value.trim();
    const shippingAddress = document.getElementById('shipping-address').value.trim();
    const shippingCity = document.getElementById('shipping-city').value.trim();
    const shippingZip = document.getElementById('shipping-zip').value.trim();

    // Validate billing name (at least 2 characters)
    if (billingName.length < 2) {
        errors.push('Billing name must be at least 2 characters long.');
    }

    // Validate billing address
    if (billingAddress.length < 5) {
        errors.push('Billing address must be at least 5 characters long.');
    }

    // Validate billing city
    if (billingCity.length < 2) {
        errors.push('Billing city must be at least 2 characters long.');
    }

    // Validate shipping if not same as billing
    if (!document.getElementById('same-address').checked) {
        if (shippingName.length < 2) {
            errors.push('Shipping name must be at least 2 characters long.');
        }
        if (shippingAddress.length < 5) {
            errors.push('Shipping address must be at least 5 characters long.');
        }
        if (shippingCity.length < 2) {
            errors.push('Shipping city must be at least 2 characters long.');
        }
    }

    if (errors.length > 0) {
        errorDiv.innerHTML = '<ul>' + errors.map(error => `<li>${error}</li>`).join('') + '</ul>';
        return false;
    }

    return true;
}

function showOrderVerification() {
    const verificationDiv = document.getElementById('order-verification');
    const verificationContent = document.getElementById('verification-content');

    let total = 0;
    let content = '<h4>Order Summary</h4>';
    content += '<ul>';
    cart.forEach(item => {
        const itemTotal = item.price * (item.nights || 1);
        const nightsText = (item.nights && item.nights > 1) ? ` (${item.nights} nights)` : (item.nights ? ' (1 night)' : '');
        content += `<li>${item.product}${nightsText} - $${itemTotal.toFixed(2)}</li>`;
        total += itemTotal;
    });
    content += '</ul>';
    content += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;

    content += '<h4>Billing Information</h4>';
    content += `<p>Name: ${document.getElementById('billing-name').value}</p>`;
    content += `<p>Email: ${document.getElementById('billing-email').value}</p>`;
    content += `<p>Phone: ${document.getElementById('billing-phone').value}</p>`;
    content += `<p>Address: ${document.getElementById('billing-address').value}, ${document.getElementById('billing-city').value} ${document.getElementById('billing-zip').value}</p>`;

    content += '<h4>Shipping Information</h4>';
    if (document.getElementById('same-address').checked) {
        content += '<p>Same as billing address</p>';
    } else {
        content += `<p>Name: ${document.getElementById('shipping-name').value}</p>`;
        content += `<p>Address: ${document.getElementById('shipping-address').value}, ${document.getElementById('shipping-city').value} ${document.getElementById('shipping-zip').value}</p>`;
    }

    verificationContent.innerHTML = content;
    verificationDiv.style.display = 'block';

    // clear cart afterorder
    localStorage.removeItem('neonCart');
}

document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();

    // copy billing to shipping
    document.getElementById('same-address').addEventListener('change', copyBillingToShipping);

    // form submission
    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            showOrderVerification();
        }
    });
});