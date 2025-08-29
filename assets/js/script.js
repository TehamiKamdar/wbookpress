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


    // ===== Rule Graph =====
    const RULES = {
        start: {
            message: "How can I help you today?",
            options: [
                { label: "Our Services", goto: "services" },
                { label: "About Us", goto: "about" },
                { label: "Contact Us", goto: "contact" }
            ]
        },
        services: {
            message: "We offer a wide range of services. Please choose a category:",
            options: [
                { label: "✍️ Writing & Editing", goto: "writing_editing" },
                { label: "📢 Publishing & Marketing", goto: "publishing_marketing" },
                { label: "🌐 Digital Presence & Content", goto: "digital_presence" },
                { label: "Back", goto: "start" }
            ]
        },
        writing_editing: {
            message: "Our ✍️ Writing & Editing services include:",
            options: [
                { label: "Book Writing", goto: "book_writing" },
                { label: "Book Editing", goto: "book_editing" },
                { label: "Cover Design", goto: "cover_design" },
                { label: "Back", goto: "services" }
            ]
        },
        publishing_marketing: {
            message: "Our 📢 Publishing & Marketing services include:",
            options: [
                { label: "Illustration", goto: "illustration" },
                { label: "Self Publishing", goto: "self_publishing" },
                { label: "Book Marketing", goto: "book_marketing" },
                { label: "Book Formatting", goto: "book_formatting" },
                { label: "Back", goto: "services" }
            ]
        },
        digital_presence: {
            message: "Our 🌐 Digital Presence & Content services include:",
            options: [
                { label: "Author Website", goto: "author_website" },
                { label: "Script Writing", goto: "script_writing" },
                { label: "Blog Writing", goto: "blog_writing" },
                { label: "Article Writing", goto: "article_writing" },
                { label: "Back", goto: "services" }
            ]
        },
        // Example leaf nodes
        book_writing: {
            message: "Our Book Writing covers outline → draft → revisions. Would you like to see pricing or process?",
            options: [
                { label: "Pricing", goto: "generic_pricing" },
                { label: "Process", goto: "generic_process" },
                { label: "Back", goto: "writing_editing" }
            ]
        },
        // Generic info nodes
        generic_pricing: {
            message: "Pricing depends on scope. Share requirements for a custom quote?",
            options: [
                { label: "Share Requirements", goto: "contact" },
                { label: "Back", goto: "services" }
            ]
        },
        generic_process: {
            message: "Our process includes discovery, drafts, revisions, and delivery.",
            options: [
                { label: "See Portfolio", goto: "portfolio" },
                { label: "Back", goto: "services" }
            ]
        },
        about: {
            message: "We are a complete publishing & content agency helping authors bring their stories to life.",
            options: [
                { label: "Back to Start", goto: "start" }
            ]
        },
        contact: {
            message: "📮 Thanks for contacting us. Click on open form to fill up your query:",
            options: [
                { label: "Open Form", goto: "form_trigger" },
                { label: "Back to Start", goto: "start" }
            ]
        },
        form_trigger: {
            message: "[FORM_INCLUDED]",
            options: [
                { label: "Back to Start", goto: "start" }
            ]
        }
    };




    // ===== UI Elements =====
    const els = {
        launcher: document.querySelector('.chatbot-icon'),
        widget: document.querySelector('.chat-window'),
        body: document.querySelector('.chat-messages'),
        btnClose: document.querySelector('.close-btn'),
        suggWrap: null
    };

    // ===== Toggle =====
    els.launcher.addEventListener('click', () => {
        els.widget.classList.add('active');
        $('#badge').hide();
    });
    els.btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        els.widget.classList.remove('active');
    });

    // ===== Helpers =====
    function scrollBottom() {
        els.body.scrollTop = els.body.scrollHeight;
    }
    function addMsg(text, who = 'bot') {
        const div = document.createElement('div');
        div.className = `message ${who}-message`;
        div.innerHTML = `<div>${text}</div><div class="timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>`;
        els.body.appendChild(div);
        scrollBottom();
    }
    function showTyping() {
        const wrap = document.createElement('div');
        wrap.className = 'bot-typing';
        wrap.innerHTML = `
        <span>Bot is typing</span>
        <div class="typing-dots"><span></span><span></span><span></span></div>`;
        els.body.appendChild(wrap);
        scrollBottom();
        return wrap;
    }

    // ===== Suggestions Renderer =====
    function renderOptions(options) {
        if (els.suggWrap) els.suggWrap.remove();

        els.suggWrap = document.createElement('div');
        els.suggWrap.className = 'suggestions';

        options.forEach(opt => {
            const b = document.createElement('button');
            b.className = 'chip';
            b.type = 'button';
            b.textContent = opt.label;
            b.addEventListener('click', () => handleChoice(opt));
            els.suggWrap.appendChild(b);
        });

        els.widget.appendChild(els.suggWrap);
    }

    // ===== Bot Flow =====
    function botStep(key) {
        const node = RULES[key];
        if (!node) return;

        const typer = showTyping();
        setTimeout(() => {
            typer.remove();

            // 👇 yahan condition lagao
            if (node.message === "[FORM_INCLUDED]") {
                const formHtml = document.querySelector("#chatFormTemplate").innerHTML;
                addMsg(formHtml, 'bot', true); // true = html message
            } else {
                addMsg(node.message, 'bot');
            }

            renderOptions(node.options || []);
        }, 400);
    }


    function handleChoice(opt) {
        addMsg(opt.label, 'user');
        botStep(opt.goto);
    }


    // ===== Start conversation =====
    botStep('start');

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