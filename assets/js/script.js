$(document).ready(function () {
    // --- NEW: Off-Canvas Menu Logic ---
    const $navContent = $('#navbarContent');
    const $toggler = $('.navbar-toggler');
    const $closeBtn = $('.btn-close');
    const $backdrop = $('.offcanvas-backdrop');

    // Function to show/hide the menu and backdrop
    function toggleOffcanvas() {
        $navContent.toggleClass('show');
        $backdrop.toggleClass('show');
    }

    // Event listeners
    $toggler.on('click', toggleOffcanvas);
    $closeBtn.on('click', toggleOffcanvas);
    $backdrop.on('click', toggleOffcanvas);

    // Hide offcanvas if resizing to desktop
    $(window).on('resize', function () {
        if ($(window).width() > 992) {
            $navContent.removeClass('show');
            $backdrop.removeClass('show');
        }
    });

    // --- EXISTING: Carousel Logic ---
    const $track = $('.carousel-track');
    const $carousel = $('.partners-carousel');

    if ($carousel.length && $track.length) {
        $carousel.on('mouseenter', function () {
            $track.addClass('paused');
        }).on('mouseleave', function () {
            $track.removeClass('paused');
        });
    }

    // --- EXISTING: Book Filter Logic ---
    const $categoryButtons = $('.category-btn');
    const $bookCards = $('.book-card');

    $categoryButtons.on('click', function () {
        $categoryButtons.removeClass('active');
        $(this).addClass('active');

        const category = $(this).data('category');

        $bookCards.each(function () {
            const $card = $(this);
            if (category === 'all' || $card.data('category') === category) {
                $card.css('display', 'flex');
            } else {
                $card.css('display', 'none');
            }
        });
    });

    // --- EXISTING: Add to wishlist animation ---
    $('.btn-icon').on('click', function () {
        const $icon = $(this).find('i');
        if ($icon.hasClass('ri-heart-line')) {
            $icon.removeClass('ri-heart-line')
                 .addClass('ri-heart-fill')
                 .css('color', '#fd5656');
        } else {
            $icon.removeClass('ri-heart-fill')
                 .addClass('ri-heart-line')
                 .css('color', '');
        }
    });

    // --- EXISTING: Owl Carousel ---
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggles = document.querySelectorAll('.dropdown-hover .dropdown-toggle');
    const mediaQuery = window.matchMedia('(min-width: 992px)');

    function handleMediaQuery(e) {
        dropdownToggles.forEach(toggle => {
            if (e.matches) {
                // Desktop: remove click-related attributes
                toggle.removeAttribute('data-bs-toggle');
            } else {
                // Mobile: add click-related attributes
                toggle.setAttribute('data-bs-toggle', 'dropdown');
            }
        });
    }

    handleMediaQuery(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQuery);
});