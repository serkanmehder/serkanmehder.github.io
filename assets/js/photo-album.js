'use strict';

document.querySelectorAll('[data-photo-album]').forEach((album) => {
  const slides = Array.from(album.querySelectorAll('.photo-album__slide'));
  const thumbnails = Array.from(album.querySelectorAll('[data-photo-index]'));
  const status = album.querySelector('.photo-album__status');
  let current = 0;

  if (!slides.length) return;

  function showPhoto(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    thumbnails.forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === current));
    });
    const caption = slides[current].querySelector('figcaption').textContent;
    status.textContent = `${current + 1} / ${slides.length}`;
    status.setAttribute('aria-label', `Photo ${current + 1} of ${slides.length}: ${caption}`);
  }

  album.querySelector('[data-photo-previous]').addEventListener('click', () => showPhoto(current - 1));
  album.querySelector('[data-photo-next]').addEventListener('click', () => showPhoto(current + 1));
  thumbnails.forEach((button, index) => {
    button.addEventListener('click', () => showPhoto(index));
  });
  album.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  showPhoto(0);
  album.querySelector('.photo-album__controls').hidden = false;
});
