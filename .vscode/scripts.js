// JavaScript for eCommerce Website

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
