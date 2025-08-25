document.addEventListener('DOMContentLoaded', function () {

    // --- NEW: Off-Canvas Menu Logic ---
    const navContent = document.getElementById('navbarContent');
    const toggler = document.querySelector('.navbar-toggler');
    const closeBtn = document.querySelector('.btn-close');
    const backdrop = document.querySelector('.offcanvas-backdrop');

    // Function to show/hide the menu and backdrop
    function toggleOffcanvas() {
        navContent.classList.toggle('show');
        backdrop.classList.toggle('show');
    }

    // Event listeners to handle opening and closing the menu
    if (toggler) {
        toggler.addEventListener('click', toggleOffcanvas);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', toggleOffcanvas);
    }
    
    // Close the menu if the user clicks the backdrop
    if (backdrop) {
        backdrop.addEventListener('click', toggleOffcanvas);
    }
    
    // Check for screen size changes to hide the off-canvas menu on desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navContent.classList.remove('show');
            backdrop.classList.remove('show');
        }
    });

    // --- EXISTING: Carousel Logic ---
    const track = document.querySelector('.carousel-track');
    const carousel = document.querySelector('.partners-carousel');

    if (carousel && track) {
      // Pause on hover
      carousel.addEventListener('mouseenter', function () {
        track.classList.add('paused');
      });

      carousel.addEventListener('mouseleave', function () {
        track.classList.remove('paused');
      });
    }

    // --- EXISTING: Book Filter Logic ---
    const categoryButtons = document.querySelectorAll('.category-btn');
    const bookCards = document.querySelectorAll('.book-card');

    // Category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Filter books
            bookCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- EXISTING: Add to wishlist animation ---
    const wishlistButtons = document.querySelectorAll('.btn-icon');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            const icon = this.querySelector('i');
            if (icon.classList.contains('ri-heart-line')) {
                icon.classList.remove('ri-heart-line');
                icon.classList.add('ri-heart-fill');
                icon.style.color = '#fd5656';
            } else {
                icon.classList.remove('ri-heart-fill');
                icon.classList.add('ri-heart-line');
                icon.style.color = '';
            }
        });
    });
});
