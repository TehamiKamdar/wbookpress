document.addEventListener('DOMContentLoaded', function () {
   const track = document.querySelector('.carousel-track');
   const playPauseBtn = document.getElementById('play-pause-btn');
   const nextBtn = document.getElementById('next-btn');
   const prevBtn = document.getElementById('prev-btn');
   const playIcon = '<i class="ri-play-line"></i>';
   const pauseIcon = '<i class="ri-pause-line"></i>';

   let isPlaying = true;

   // Pause/Play functionality
   playPauseBtn.addEventListener('click', function () {
      if (isPlaying) {
         track.classList.add('paused');
         playPauseBtn.innerHTML = playIcon;
      } else {
         track.classList.remove('paused');
         playPauseBtn.innerHTML = pauseIcon;
      }
      isPlaying = !isPlaying;
   });

   // Next button functionality
   nextBtn.addEventListener('click', function () {
      // Temporarily pause animation for manual control
      track.classList.add('paused');
      playPauseBtn.innerHTML = playIcon;
      isPlaying = false;

      // Move to next set of items
      const currentTransform = getComputedStyle(track).transform;
      const matrix = new DOMMatrixReadOnly(currentTransform);
      const currentTranslateX = matrix.m41;

      track.style.transform = `translateX(${currentTranslateX - 430}px)`;
   });

   // Previous button functionality
   prevBtn.addEventListener('click', function () {
      // Temporarily pause animation for manual control
      track.classList.add('paused');
      playPauseBtn.innerHTML = playIcon;
      isPlaying = false;

      // Move to previous set of items
      const currentTransform = getComputedStyle(track).transform;
      const matrix = new DOMMatrixReadOnly(currentTransform);
      const currentTranslateX = matrix.m41;

      track.style.transform = `translateX(${currentTranslateX + 430}px)`;
   });

   // Pause animation when hovering over carousel
   const carousel = document.querySelector('.partners-carousel');
   carousel.addEventListener('mouseenter', function () {
      if (isPlaying) {
         track.classList.add('paused');
      }
   });

   carousel.addEventListener('mouseleave', function () {
      if (isPlaying) {
         track.classList.remove('paused');
      }
   });
});