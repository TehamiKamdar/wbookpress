$(document).ready(function () {
   // Carousel
   const $track = $('.carousel-track');
   const $carousel = $('.partners-carousel');

   // Pause on hover
   $carousel.on('mouseenter', function () {
      $track.addClass('paused');
   });

   $carousel.on('mouseleave', function () {
      $track.removeClass('paused');
   });

   // Book Filter
   const $categoryButtons = $('.category-btn');
   const $bookCards = $('.book-card');

   $categoryButtons.on('click', function () {
      // Remove active from all
      $categoryButtons.removeClass('active');

      // Add active to clicked
      $(this).addClass('active');

      const category = $(this).data('category');

      // Filter books
      $bookCards.each(function () {
         const $card = $(this);
         if (category === 'all' || $card.data('category') === category) {
            $card.css('display', 'flex');
         } else {
            $card.css('display', 'none');
         }
      });
   });

   // Add to wishlist animation
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
   })
});
