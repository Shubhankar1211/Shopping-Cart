// This makes sure the code runs only after the full HTML page has loaded
document.addEventListener('DOMContentLoaded', () => {

    // Array of products available for sale
    const products = [
        {id: 1, name: "Product 1", price: 29.99},
        {id: 2, name: "Product 2", price: 99.99},
        {id: 3, name: "Product 3", price: 39.99},
        {id: 4, name: "Product 4", price: 95.99},
    ];

    // This will hold the items added to the cart
    const cart = [];

    // Selecting HTML elements by their IDs so we can use them in JS
    const productList = document.getElementById('product-list');         // Where products will be displayed
    const cartItems = document.getElementById('cart-items');             // Where cart items will be shown
    const emptyCartMessage = document.getElementById('empty-cart');      // Message shown when cart is empty
    const cartTotalMessage = document.getElementById('cart-total');      // Shows total price and checkout button
    const totalPriceDisplay = document.getElementById('total-price');    // Displays total price in the cart
    const checkoutButton = document.getElementById('checkout-btn');      // Button to checkout the cart

    // Display all products on the page dynamically
    products.forEach(product => {
        const productDiv = document.createElement('div'); // Create a new div for each product
        productDiv.classList.add('product-card');         // Add class for styling

        // Set the HTML content for each product: name, price, and "Add to Cart" button
        productDiv.innerHTML = `
            <div class="product-title">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;

        productList.appendChild(productDiv); // Add the product card to the product list in the HTML
    });

    // When a product's "Add to Cart" button is clicked
    productList.addEventListener('click', function(e) {
        if(e.target.tagName === "BUTTON") { // Check if a button was clicked
            const productId = parseInt(e.target.getAttribute("data-id")); // Get product ID from button
            const product = products.find(p => p.id === productId); // Find product by ID
            addToCart(product); // Add it to the cart
        }
    });

    // Function to add a product to the cart array
    function addToCart(product) {
        cart.push(product); // Add product to the cart array
        renderCart();       // Re-display the cart with the new product
    }

    // Function to display the cart contents
    function renderCart() {
        cartItems.innerHTML = ""; // Clear the existing cart content
        let totalPrice = 0;       // Variable to keep track of total cart price

        if(cart.length > 0) {
            // If cart is not empty, hide "cart is empty" message and show cart total section
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');

            // Loop through all items in the cart
            cart.forEach((item, index) => {
                totalPrice += item.price; // Add item price to total

                // Create a new div for each cart item
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item'); // For CSS styling

                // Add HTML content: item name, price, and a remove button
                cartItem.innerHTML = `
                    <span class="item-title">${item.name}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                `;

                // Add this item to the cart section in HTML
                cartItems.appendChild(cartItem);
            });

            // Update the total price shown to the user
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            // If cart is empty, show empty message and hide cart total
            emptyCartMessage.classList.remove('hidden');
            cartTotalMessage.classList.add('hidden');
            totalPriceDisplay.textContent = '$0.00'; // Reset price
        }
    }

    // Allow users to remove individual items from the cart
    cartItems.addEventListener('click', function(e) {
        if(e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.getAttribute('data-index')); // Get index of item to remove
            cart.splice(index, 1); // Remove that item from the cart array
            renderCart(); // Update the cart display
        }
    });

    // When the "Checkout" button is clicked
    checkoutButton.addEventListener('click', () => {
        cart.length = 0; // Clear all items from the cart
        alert("Checkout successful!"); // Show a confirmation message
        renderCart(); // Update the cart view
    });


    
});
