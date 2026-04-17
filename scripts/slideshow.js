// get contents from html file
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.slide-control.prev');
const nextButton = document.querySelector('.slide-control.next');
let slideIndex = 0; // Tracks which slide is currently visible.

// shows the slide and hides the others using the index to determine which slide it is
function showSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('current', idx === index);
  });
  slideIndex = index;
}

// goes forward a slide keeping the resolution the same
function showNextSlide() {
  const nextIndex = (slideIndex + 1) % slides.length;
  showSlide(nextIndex);
}

// goes back a slide keeping the resolution the same
function showPrevSlide() {
  const prevIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

// puts the slideshow arrows over the pictures
function initSlideshow() {
  if (!slides.length) return;

  nextButton.addEventListener('click', showNextSlide);
  prevButton.addEventListener('click', showPrevSlide);
}

document.addEventListener('DOMContentLoaded', initSlideshow);
