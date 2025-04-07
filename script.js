document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {id: 1, name: "Product 1", price: 29.99},
        {id: 2, name: "Product 2", price: 99.99},
        {id: 3, name: "Product 3", price: 39.99},
        {id: 4, name: "Product 4", price: 95.99},
    ]

    const cart = []

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalMessage = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-btn');

    // Display products dynamically
    products.forEach(product => {
        const productDiv = document.createElement('div')
        productDiv.classList.add('product-card') // Changed to match CSS class
        productDiv.innerHTML = `
            <div class="product-title">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `
        productList.appendChild(productDiv) // Fixed: use productList instead of product
    })

    productList.addEventListener('click', function(e) {
        if(e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    })

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if(cart.length > 0) {
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');
            
            cart.forEach((item, index) => {
                totalPrice += item.price;
                
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item'); // Added class to match CSS
                cartItem.innerHTML = `
                    <span class="item-title">${item.name}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });
            
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove('hidden');
            cartTotalMessage.classList.add('hidden'); // Added to hide total section when cart is empty
            totalPriceDisplay.textContent = '$0.00';
        }
    }

    // Event delegation for removing items from cart
    cartItems.addEventListener('click', function(e) {
        if(e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            renderCart();
        }
    });

    checkoutButton.addEventListener('click', () => {
        cart.length = 0; // Clear the cart
        alert("Checkout successful!");
        renderCart();
    });
})