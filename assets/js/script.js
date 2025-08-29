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
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 800,
        animateOut: 'fadeOut',
        animateIn: 'zoomIn'
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


    // Toggle chat window
    $('.chatbot-icon').click(function () {
        $('.chat-window').toggleClass('active');
    });

    // Close chat window
    $('.close-btn').click(function (e) {
        e.stopPropagation();
        $('.chat-window').removeClass('active');
    });

    // Send message function (basic implementation)
    $('.send-btn').click(sendMessage);
    $('.chat-input input').keypress(function (e) {
        if (e.which === 13) {
            sendMessage();
        }
    });

    function scrollToBottom() {
        const messages = $('.chat-messages');
        messages.scrollTop(messages[0].scrollHeight);
    }

    function sendMessage() {
        const input = $('.chat-input input');
        const message = input.val().trim();

        if (message !== '') {
            // Add user message (insert before typing indicator)
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            $(`
            <div class="message user-message">
                <div>${message}</div>
                <div class="timestamp">${timestamp}</div>
            </div>
        `).insertBefore('.bot-typing');

            scrollToBottom();

            // Clear input
            input.val('');

            // Show bot is typing
            $('.bot-typing').show();
            scrollToBottom();

            // Simulate bot response after a delay
            setTimeout(function () {
                $('.bot-typing').hide();

                // Add bot response
                $(`
                <div class="message bot-message">
                    <div>Thanks for your message. This is a static demo. Real functionality would be implemented with JavaScript.</div>
                    <div class="timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            `).insertBefore('.bot-typing');

                scrollToBottom();
            }, 1500);
        }
    }

    // Initially hide typing indicator
    $('.bot-typing').hide();

    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();

                form.querySelectorAll(':invalid').forEach(el => {
                    el.classList.add('animate__animated', 'animate__headShake');
                    setTimeout(() => el.classList.remove('animate__animated', 'animate__headShake'), 1000);
                });
            }
            form.classList.add('was-validated');
        }, false);
    });
});