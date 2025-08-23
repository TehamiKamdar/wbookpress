document.addEventListener('DOMContentLoaded', function () {
   const track = document.querySelector('.carousel-track');
   const carousel = document.querySelector('.partners-carousel');

   // Pause on hover
   carousel.addEventListener('mouseenter', function () {
      track.classList.add('paused');
   });

   carousel.addEventListener('mouseleave', function () {
      track.classList.remove('paused');
   });
});