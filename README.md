# Between Chapters — Lab 3: The Power of Sequencing

An interactive real-estate photo story branded for Mariam Riyal. This extends the original Class Progress starter with actual photographs, two narratives, and richer controls. No framework, dependencies, external fonts, or build step. Open index.html locally or deploy the repository root with GitHub Pages.

## The same three photos, two meanings

| Story | Beginning | Middle | End | Interpretation |
| --- | --- | --- | --- | --- |
| Finding home | Exterior | Empty room | Keys | A possibility becomes a place to belong. |
| Leaving home | Keys | Empty room | Exterior | A handover leads to reflection and a final look back. |

Both versions use exactly the same three files. These stock photos come from different properties and illustrate a fictional story, not an actual listing or client transaction.

## Interactions and technical concepts
- Click story buttons to switch sequences; each starts at its beginning.
- Next/Previous buttons, step indicators, and photo thumbnails navigate the three steps.
- Restart returns to the current story's beginning.
- Focus the carousel and use Left/Right, Home, or End.
- Swipe horizontally on the photograph on touch devices.
- Compare both storyboards below and use Explore this story to return to the carousel.
- Variables: photos, sequences, currentSequence, currentIndex, swipeStart.
- Functions: showSlide, goToSlide, changeSequence, buildThumbnails, buildComparison.
- Event listeners: click, keydown, pointerdown, pointerup, pointercancel, pointerleave.
- DOM manipulation: src, alt, textContent, disabled, classList, aria-pressed, aria-current, createElement, append, and replaceChildren.
- Accessibility: native buttons, focus outlines, alt text, a polite announcement, reduced-motion support, keyboard operation, and no autoplay.

## Files
index.html, style.css, script.js, README.md, and images/ containing exterior.jpg, room.jpg, keys.jpg.

## Photo sources
All downloaded from Unsplash and included locally under the Unsplash License (https://unsplash.com/license). Credits also appear in the webpage footer.
- Exterior: Zac Gudakov — https://unsplash.com/photos/wwqZ8CM21gg
- Empty room: Alex Tyson — https://unsplash.com/photos/ZWHajYLVsKo
- Keys: Maria Ziegler — https://unsplash.com/photos/jJnZg7vBfMs

## Update your existing repository
Keep the original Class Progress commit. Upload the new index.html, style.css, script.js, README.md, and the complete images folder to the repository root. Do not upload only a ZIP or an enclosing project folder. Commit the finished changes with a descriptive message such as Complete Lab 3 photo carousel.

Repository: https://github.com/riyalmariam-debug/Lab3-Photo-Carousel
GitHub Pages address when enabled: https://riyalmariam-debug.github.io/Lab3-Photo-Carousel/

In Settings → Pages, use Deploy from a branch → main → /(root) → Save. Wait for deployment, open the URL GitHub displays, and verify the finished version before submitting both URLs.

## Validation
JavaScript syntax and automated DOM interaction checks cover both orders, matching shared assets, caption changes, navigation boundaries, sequence switching, thumbnails, restart, keyboard, swipes, and comparison controls. Image files were decoded and visually inspected. Full rendered browser QA was unavailable in the build environment; check desktop/mobile layout in the published page before submission.
