// slide.js

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    rightArrow.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
        showSlide(currentSlide);
    });

    leftArrow.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Loop back to the last slide
        showSlide(currentSlide);
    });

    // Initialize the first slide
    showSlide(currentSlide);
});