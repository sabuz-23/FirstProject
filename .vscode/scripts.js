// JavaScript for eCommerce Website
document.addEventListener('DOMContentLoaded', () => {
    // Handle removing cart items
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const cartItem = event.target.closest('.cart-item');
            cartItem.remove();
            updateCartTotal();
        });
    });

    // Update cart total when quantity changes
    document.querySelectorAll('.cart-item input[type="number"]').forEach(input => {
        input.addEventListener('change', () => {
            updateCartTotal();
        });
    });

    // Function to update cart total
    const updateCartTotal = () => {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.item-details p:nth-child(2)').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('input[type="number"]').value);
            total += price * quantity;
        });
        document.querySelector('.cart-summary p').textContent = `Total: $${total.toFixed(2)}`;
    };

    // Initial cart total calculation
    updateCartTotal();
});

// Product Carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.product-carousel');
    const products = carousel.querySelectorAll('.product');
    const nextButton = document.createElement('button');
    const prevButton = document.createElement('button');

    let currentIndex = 0;
    const productsToShow = 3; // Number of products to show at once
    const totalProducts = products.length;

    // Create and style next and prev buttons
    nextButton.textContent = '>';
    prevButton.textContent = '<';
    nextButton.className = 'carousel-next';
    prevButton.className = 'carousel-prev';

    carousel.parentNode.insertBefore(prevButton, carousel);
    carousel.parentNode.appendChild(nextButton);

    // Function to update carousel display
    const updateCarousel = () => {
        products.forEach((product, index) => {
            product.style.display = (index >= currentIndex && index < currentIndex + productsToShow) ? 'block' : 'none';
        });
    };

    // Next button event listener
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + productsToShow) % totalProducts;
        updateCarousel();
    });

    // Prev button event listener
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - productsToShow + totalProducts) % totalProducts;
        updateCarousel();
    });

    // Initialize carousel
    updateCarousel();
});

// Countdown Timer
const countdownTimer = () => {
    const countdownElement = document.querySelector('.countdown');
    const targetTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now

    const updateTimer = () => {
        const now = new Date().getTime();
        const timeLeft = targetTime - now;

        if (timeLeft >= 0) {
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownElement.textContent = `Time Left: ${hours}h ${minutes}m ${seconds}s`;
        } else {
            countdownElement.textContent = 'Promotion ended';
            clearInterval(timerInterval);
        }
    };

    // Update timer every second
    const timerInterval = setInterval(updateTimer, 1000);
};

// Initialize countdown timer
countdownTimer();

// JavaScript for Shop Page

document.addEventListener('DOMContentLoaded', () => {
    const sortBySelect = document.getElementById('sort-by');
    const productItems = document.querySelectorAll('.product-item');

    // Function to sort products
    const sortProducts = (criteria) => {
        let sortedItems = Array.from(productItems);
        if (criteria === 'price-low-high') {
            sortedItems.sort((a, b) => {
                return parseFloat(a.querySelector('p').textContent.replace('$', '')) - parseFloat(b.querySelector('p').textContent.replace('$', ''));
            });
        } else if (criteria === 'price-high-low') {
            sortedItems.sort((a, b) => {
                return parseFloat(b.querySelector('p').textContent.replace('$', '')) - parseFloat(a.querySelector('p').textContent.replace('$', ''));
            });
        } else if (criteria === 'newest') {
            sortedItems.sort((a, b) => {
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            });
        }

        const productList = document.querySelector('.product-list');
        productList.innerHTML = '';
        sortedItems.forEach(item => {
            productList.appendChild(item);
        });
    };

    sortBySelect.addEventListener('change', (event) => {
        sortProducts(event.target.value);
    });

    // Pagination (simplified for static example)
    const paginationLinks = document.querySelectorAll('.pagination a.page');
    paginationLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            paginationLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
            // Here you would fetch and display the products for the selected page
        });
    });
});

