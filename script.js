// Plan: collect an exterior, an empty room, and keys at a doorway.
// These are temporary text placeholders, not the final photo collection.
const slides = [
  { photo: 'Photo to collect: a house exterior', caption: 'The search begins.' },
  { photo: 'Photo to collect: an empty room', caption: 'Imagine a life inside.' },
  { photo: 'Photo to collect: keys at a doorway', caption: 'A new chapter opens.' }
];
const storyParts = ['Beginning', 'Middle', 'End'];
let currentIndex = 0; // Variable tracks the current slide.

// Function changes DOM text to display the current story step.
function showSlide() {
  document.getElementById('photoPlaceholder').textContent = slides[currentIndex].photo;
  document.getElementById('caption').textContent = slides[currentIndex].caption;
  document.getElementById('position').textContent =
    `${storyParts[currentIndex]} · ${currentIndex + 1} of ${slides.length}`;
  document.getElementById('nextButton').textContent =
    currentIndex === slides.length - 1 ? 'Start again ↺' : 'Next →';
}

// Event listener responds to a button click and advances the index.
document.getElementById('nextButton').addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide();
});

showSlide();
// TODO: collect three photos and update an img element's src and alt.
// TODO: present those SAME photos in a second order with a different interpretation.
