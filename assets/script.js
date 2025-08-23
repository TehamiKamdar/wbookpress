document.addEventListener('DOMContentLoaded', function () {
   // Carousel
   const track = document.querySelector('.carousel-track');
   const carousel = document.querySelector('.partners-carousel');

   // Pause on hover
   carousel.addEventListener('mouseenter', function () {
      track.classList.add('paused');
   });

   carousel.addEventListener('mouseleave', function () {
      track.classList.remove('paused');
   });

   // Book Filter
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

   // Add to wishlist animation
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