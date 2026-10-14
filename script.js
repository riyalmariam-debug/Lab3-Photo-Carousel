'use strict';
// Exactly three shared photographs. Both stories refer to these same objects/files.
const photos = {
  exterior: { src: 'images/exterior.jpg', alt: 'A red two-storey house framed by trees and a green lawn.', label: 'The exterior' },
  room: { src: 'images/room.jpg', alt: 'An unfurnished room with pale walls, grey carpeting, and a large window.', label: 'The empty room' },
  keys: { src: 'images/keys.jpg', alt: 'A hand holding a set of house keys in front of a doorway.', label: 'The keys' }
};
const sequences = {
  arrival: {
    title: 'Finding home', description: 'From a possibility on the outside to a future that is finally yours.',
    takeaway: 'The empty room feels full of possibility. The keys at the end turn anticipation into belonging.',
    steps: [
      { photo: 'exterior', mood: 'Possibility', title: 'First, you see a possibility.', text: 'A front door. A quiet street. Before it is yours, a house is a place you can imagine yourself becoming.', short: 'The first look', summary: 'The exterior introduces a home that could become yours.' },
      { photo: 'room', mood: 'Imagination', title: 'Then, you make room for a future.', text: 'The room is empty, but you already see the Sunday mornings, the people around the table, and the life you could build here.', short: 'Room to imagine', summary: 'The empty room becomes a blank canvas for a new life.' },
      { photo: 'keys', mood: 'Belonging', title: 'Finally, the next chapter is yours.', text: 'The keys land in your hand. What began as a possibility is now a place to belong. This time, you are coming home.', short: 'A new beginning', summary: 'Receiving the keys brings the search to a hopeful end.' }
    ]
  },
  departure: {
    title: 'Leaving home', description: 'From the last handover to the place you see differently as you leave.',
    takeaway: 'The keys now suggest a handover. The same empty room feels like an absence, and the exterior becomes a final look back.',
    steps: [
      { photo: 'keys', mood: 'Letting go', title: 'First, you loosen your hold.', text: 'For years, these keys meant coming back. Today, you hold them one last time before handing them over. A familiar chapter is closing.', short: 'The last handover', summary: 'The keys begin a departure, rather than reward a search.' },
      { photo: 'room', mood: 'Reflection', title: 'Then, the quiet feels different.', text: 'The furniture is gone. The room that once held your everyday life is empty again. You pause, remembering everything the photograph cannot show.', short: 'What remains', summary: 'The empty room suggests memories and a life packed away.' },
      { photo: 'exterior', mood: 'Moving forward', title: 'Finally, one last look back.', text: 'From the street, the house looks the same. You do not. You carry the memories with you, leaving space for someone else’s beginning.', short: 'The final look', summary: 'The exterior closes the story as the home you leave behind.' }
    ]
  }
};
const storyParts = ['Beginning', 'Middle', 'End'];
let currentSequence = 'arrival';
let currentIndex = 0;
const image = document.getElementById('storyImage');
const thumbnailGrid = document.getElementById('thumbnailGrid');
const carousel = document.querySelector('.carousel');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const modeButtons = [...document.querySelectorAll('[data-sequence]')];
const stepButtons = [...document.querySelectorAll('[data-step]')];

// Build navigation with DOM methods, using the current story's order.
function buildThumbnails() {
  thumbnailGrid.replaceChildren();
  sequences[currentSequence].steps.forEach((step, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'thumbnail';
    button.setAttribute('aria-label', `${storyParts[index]}: ${step.short}`);
    const thumb = document.createElement('img');
    thumb.src = photos[step.photo].src;
    thumb.alt = ''; // Button text provides the accessible name.
    thumb.width = 400;
    thumb.height = 250;
    const label = document.createElement('small');
    label.textContent = `0${index + 1} / ${storyParts[index].toUpperCase()}`;
    const title = document.createElement('strong');
    title.textContent = step.short;
    button.append(thumb, label, title);
    button.addEventListener('click', () => goToSlide(index));
    thumbnailGrid.append(button);
  });
}

// Central render function: changes the image, alt text, captions, and button states.
function showSlide(announce = true) {
  const sequence = sequences[currentSequence];
  const step = sequence.steps[currentIndex];
  const photo = photos[step.photo];
  image.src = photo.src;
  image.alt = photo.alt;
  document.getElementById('sequenceTitle').textContent = sequence.title;
  document.getElementById('sequenceDescription').textContent = sequence.description;
  document.getElementById('stageBadge').textContent = `THE ${storyParts[currentIndex].toUpperCase()}`;
  document.getElementById('largeCounter').textContent = `0${currentIndex + 1} / 03`;
  document.getElementById('chapterNumber').textContent = `0${currentIndex + 1}`;
  document.getElementById('imageLabel').textContent = photo.label.toUpperCase();
  document.getElementById('storyMood').textContent = step.mood.toUpperCase();
  document.getElementById('slideTitle').textContent = step.title;
  document.getElementById('slideCaption').textContent = step.text;
  document.getElementById('position').textContent = `${currentIndex + 1} of 3`;
  document.getElementById('takeaway').textContent = sequence.takeaway;
  document.getElementById('previousButton').disabled = currentIndex === 0;
  document.getElementById('nextButton').disabled = currentIndex === sequence.steps.length - 1;
  modeButtons.forEach(button => {
    const active = button.dataset.sequence === currentSequence;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  [...stepButtons, ...thumbnailGrid.children].forEach((button, index) => {
    const stepIndex = index % 3;
    if (stepIndex === currentIndex) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  if (announce) document.getElementById('announcement').textContent = `${sequence.title}. ${storyParts[currentIndex]}, ${currentIndex + 1} of 3. ${step.title} ${step.text}`;
  // Restart short CSS transitions; disabled for reduced-motion visitors.
  if (!reducedMotion.matches) {
    [document.querySelector('.photo-wrap'), document.getElementById('slideCopy')].forEach(element => {
      element.classList.remove('changing');
      void element.offsetWidth;
      element.classList.add('changing');
    });
  }
}
function goToSlide(index) {
  if (index < 0 || index >= sequences[currentSequence].steps.length || index === currentIndex) return;
  currentIndex = index;
  showSlide();
}
function changeSequence(name) {
  if (!sequences[name]) return;
  currentSequence = name;
  currentIndex = 0;
  buildThumbnails();
  showSlide();
}
modeButtons.forEach(button => button.addEventListener('click', () => changeSequence(button.dataset.sequence)));
document.getElementById('previousButton').addEventListener('click', () => goToSlide(currentIndex - 1));
document.getElementById('nextButton').addEventListener('click', () => goToSlide(currentIndex + 1));
document.getElementById('restartButton').addEventListener('click', () => { currentIndex = 0; showSlide(); });
stepButtons.forEach(button => button.addEventListener('click', () => goToSlide(Number(button.dataset.step))));
// Arrow keys are scoped to the carousel; they don't interfere elsewhere on the page.
carousel.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    goToSlide(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    goToSlide(event.key === 'Home' ? 0 : 2);
  }
});
// Pointer events support touch swipes without blocking vertical page scrolling.
let swipeStart = null;
const photoWrap = document.querySelector('.photo-wrap');
photoWrap.addEventListener('pointerdown', event => { if (event.isPrimary) swipeStart = { x: event.clientX, y: event.clientY }; });
photoWrap.addEventListener('pointerup', event => {
  if (!swipeStart) return;
  const dx = event.clientX - swipeStart.x;
  const dy = event.clientY - swipeStart.y;
  swipeStart = null;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) goToSlide(currentIndex + (dx < 0 ? 1 : -1));
});
['pointercancel', 'pointerleave'].forEach(type => photoWrap.addEventListener(type, () => { swipeStart = null; }));

// Side-by-side storyboards make the different meanings and identical images explicit.
function buildComparison() {
  const container = document.getElementById('comparisonStories');
  Object.entries(sequences).forEach(([name, sequence], sequenceIndex) => {
    const article = document.createElement('article');
    article.className = 'comparison-story';
    const header = document.createElement('div'); header.className = 'comparison-story-header';
    const heading = document.createElement('h3');
    const number = document.createElement('span'); number.textContent = `0${sequenceIndex + 1}`;
    heading.append(number, document.createTextNode(sequence.title));
    const replay = document.createElement('button'); replay.type = 'button'; replay.className = 'text-link'; replay.textContent = 'Explore this story ↗';
    replay.addEventListener('click', () => {
      changeSequence(name);
      document.getElementById('story').scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      carousel.focus({ preventScroll: true });
    });
    header.append(heading, replay);
    const row = document.createElement('div'); row.className = 'comparison-row';
    sequence.steps.forEach((step, index) => {
      const figure = document.createElement('figure'); figure.className = 'comparison-card';
      const img = document.createElement('img'); img.src = photos[step.photo].src; img.alt = photos[step.photo].alt; img.loading = 'lazy'; img.width = 480; img.height = 300;
      const caption = document.createElement('figcaption');
      const label = document.createElement('small'); label.textContent = `0${index + 1} / ${storyParts[index].toUpperCase()}`;
      const title = document.createElement('strong'); title.textContent = step.short;
      const text = document.createElement('p'); text.textContent = step.summary;
      caption.append(label, title, text); figure.append(img, caption); row.append(figure);
    });
    article.append(header, row); container.append(article);
  });
}
// Preload the same three local assets for quick transitions.
Object.values(photos).forEach(photo => { const preload = new Image(); preload.src = photo.src; });
buildThumbnails();
buildComparison();
showSlide(false);
