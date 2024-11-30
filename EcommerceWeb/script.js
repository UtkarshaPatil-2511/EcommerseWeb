const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}



// JavaScript to handle adding items to the cart
// document.querySelectorAll('.cart').forEach((button) => {
//     button.addEventListener('click', (event) => {
//         // Find the product details
//         const product = event.target.closest('.pro');
//         const imgSrc = product.querySelector('img').src;
//         const productName = product.querySelector('h5').textContent;
//         const price = product.querySelector('h4').textContent;

//         // Create an object to store the product details
//         const productDetails = {
//             imgSrc: imgSrc,
//             productName: productName,
//             price: price,
//             quantity: 1
//         };

//         // Store the product details in localStorage
//         let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//         cartItems.push(productDetails);
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));

//         // Redirect to cart page (optional)
//         window.location.href = 'cart.html';
//     });
// });



// // JavaScript to load items into the cart table on the cart.html page
// document.addEventListener('DOMContentLoaded', () => {
//     const cartTableBody = document.querySelector('#cart tbody');
//     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

//     cartItems.forEach(item => {
//         const newRow = document.createElement('tr');
//         newRow.innerHTML = `
//             <td><a href="#" class="remove"><i class="fa-solid fa-xmark"></i></a></td>
//             <td><img src="${item.imgSrc}" alt=""></td>
//             <td>${item.productName}</td>
//             <td>${item.price}</td>
//             <td><input type="number" value="${item.quantity}" min="1"></td>
//             <td>${item.price}</td>
//         `;
//         cartTableBody.appendChild(newRow);
//     });

//     // Update subtotal when quantity changes
//     updateQuantity();

//     // Handle item removal
//     cartTableBody.querySelectorAll('.remove').forEach((removeBtn) => {
//         removeBtn.addEventListener('click', (event) => {
//             const row = event.target.closest('tr');
//             const productName = row.querySelector('td:nth-child(3)').textContent;
//             removeItemFromCart(productName);
//             row.remove();
//         });
//     });
// });

// function updateQuantity() {
//     const cartTableBody = document.querySelector('#cart tbody');
//     cartTableBody.querySelectorAll('input[type="number"]').forEach((input) => {
//         input.addEventListener('input', (event) => {
//             const quantity = event.target.value;
//             const priceCell = event.target.parentElement.previousElementSibling;
//             const price = parseFloat(priceCell.textContent.replace('$', ''));
//             const subtotalCell = event.target.parentElement.nextElementSibling;
//             subtotalCell.textContent = `$${(price * quantity).toFixed(2)}`;
//         });
//     });
// }

// function removeItemFromCart(productName) {
//     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     cartItems = cartItems.filter(item => item.productName !== productName);
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
// }



// Store product information in localStorage when 'Add to Cart' is clicked
document.querySelectorAll('.cart').forEach(cartBtn => {
    cartBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const productElement = event.target.closest('.pro');
        const product = {
            name: productElement.querySelector('h5').innerText,
            price: productElement.querySelector('h4').innerText,
            image: productElement.querySelector('img').src,
        };

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Check if the product is already in the cart
        const existingProduct = cartItems.find(item => item.name === product.name);

        if (!existingProduct) {
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        // Navigate to cart.html
        window.location.href = 'cart.html';
    });
});

// Display the stored products in the cart.html page
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const tbody = document.querySelector('#cart tbody');

    tbody.innerHTML = ''; // Clear existing content

    cartItems.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><a href="#" class="remove">X</a></td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" value="1"></td>
        `;

        tbody.appendChild(row);
    });

    // Remove item from cart
    document.querySelectorAll('.remove').forEach(removeBtn => {
        removeBtn.addEventListener('click', function () {
            const row = this.closest('tr');
            const productName = row.querySelector('td:nth-child(3)').innerText;

            let cartItems = JSON.parse(localStorage.getItem('cartItems'));
            cartItems = cartItems.filter(item => item.name !== productName);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            row.remove();
        });
    });
}

// Call the function to display items if on cart.html
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}

// Function to handle "Add to Cart" button click on product detail page
document.getElementById('addToCartBtn').addEventListener('click', function () {
    // Get product details
    const productName = document.querySelector('.single-pro-details h4').innerText;
    const productPrice = parseFloat(document.querySelector('.single-pro-details h2').innerText.replace('$', ''));
    const productImage = document.getElementById('MainImg').src;
    const productQuantity = parseInt(document.querySelector('input[type="number"]').value);

    // Ensure quantity is at least 1
    if (productQuantity < 1) {
        alert('Quantity must be at least 1');
        return;
    }

    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: productQuantity
    };

    // Retrieve existing cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cartItems.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        // Update quantity and price if product already exists
        cartItems[existingProductIndex].quantity += productQuantity;
        cartItems[existingProductIndex].price = (cartItems[existingProductIndex].price / (cartItems[existingProductIndex].quantity - productQuantity)) * cartItems[existingProductIndex].quantity;
    } else {
        // Add new product to cart
        cartItems.push(product);
    }

    // Save updated cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Optionally redirect to cart page or show a message that the item was added
    alert('Product added to cart');
    window.location.href = 'cart.html';
});

// Display the stored products in the cart.html page
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const tbody = document.querySelector('#cart tbody');

    tbody.innerHTML = ''; // Clear existing content

    cartItems.forEach(item => {
        const row = document.createElement('tr');

        // Calculate total price based on quantity
        const totalPrice = item.price;

        row.innerHTML = `
            <td><a href="#" class="remove">X</a></td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>$${totalPrice.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" class="quantity"></td>
        `;

        tbody.appendChild(row);
    });

    // Remove item from cart
    document.querySelectorAll('.remove').forEach(removeBtn => {
        removeBtn.addEventListener('click', function () {
            const row = this.closest('tr');
            const productName = row.querySelector('td:nth-child(3)').innerText;

            let cartItems = JSON.parse(localStorage.getItem('cartItems'));
            cartItems = cartItems.filter(item => item.name !== productName);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            row.remove();
        });
    });

    // Update quantity and total price on change
    document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('change', function () {
            const row = this.closest('tr');
            const productName = row.querySelector('td:nth-child(3)').innerText;
            const newQuantity = parseInt(this.value);

            // Ensure quantity is at least 1
            if (newQuantity < 1) {
                alert('Quantity must be at least 1');
                this.value = 1;
                return;
            }

            let cartItems = JSON.parse(localStorage.getItem('cartItems'));
            const item = cartItems.find(item => item.name === productName);
            item.quantity = newQuantity;

            // Update price based on new quantity
            item.price = (item.price / item.quantity) * newQuantity;

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCartItems();
        });
    });
}

// Call the function to display items if on cart.html
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}
