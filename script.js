document.addEventListener('DOMContentLoaded',()=>{
    const products = [
        {id: 1, name: "Product 1",  price: 29.99},
        {id: 2, name: "Product 2",  price: 99.99},
        {id: 3, name: "Product 3",  price: 39.99},
        {id: 4, name: "Product 4",  price: 95.99},
    ]

    const cart =[]

   const productList = document.getElementById('product-list');
   const cartItems = document.getElementById('cart-items');
   const emptyCartMessage = document.getElementById('empty-cart');
   const cartTotalMessage  = document.getElementById('cart-total');
   const totalPriceDisplay  = document.getElementById('total-price');
   const checkoutButon  = document.getElementById('checkout-btn');

   // this is the way how we display the elment dynamically
   products.forEach(product =>{
    const productDiv = document.createElement('div') // here we have created a div for every object element
    productDiv.classList.add('product')// here we add the class 
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}"> Add to Cart</button>
    `
    product.appendChild(productDiv)

   })

   productList.addEventListener('click',function(e){
       if(e.target.tagName === "BUTTON"){  // here we wrote this beacuse we dont' want to we cliked any hwere on the div of product we only wnat to register the cliked when we cliked the button
       const productId =  parseInt(e.target.getAttribute("data-id")); // this will give us the string but we need number beacuse above id is in the number format
       const product = products.find(p => p.id === productId)
       addToCart(product);
       }
   })

   
})