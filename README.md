# Meet Camille

An animated Duolingo-inspired presentation built with React, Vite, and Motion.

The opening slide displays a placeholder TEXT title and text text subtitles. A layered French Duo illustration waves its wings and blinks in the corner. Click the opening scene or press Enter, Space, or ArrowRight to fade quickly to Camille while Duo turns sideways and exits to the right; use the back button or ArrowLeft to return. Reduced-motion settings disable Duo’s animations.

Camille’s redesigned profile uses a generated smiling head-and-shoulders portrait, oversized rounded typography, and a bright Duolingo green background. Fashion and Paris illustrations, the words ‘outfits’ and ‘paris’, and an age badge enter with a spring animation and float gently. Reduced-motion preferences disable floating. Use the replay button to repeat the entrance or the fullscreen button to present.

The third slide uses a single camera flash to change the photographic portrait into a cartoon head-and-shoulders portrait inside the same frame. Camille winks before jumping out and landing in the Paris scene. Seventeen masked regions reveal quickly in depth order: clouds and bridge, lamps, cupboards and cashier, three kiosks, foreground Duo and displays and sign, then the ground. Camille cycles through a wave/wink, neutral smile and relaxed pose; lamps glow gently and the separate foreground Duo arm waves. Click the profile or use Enter/Space/ArrowRight to enter her world; Previous slide or ArrowLeft moves back one slide. Reduced-motion settings skip the transformation and looping animations.

The fourth slide zooms into machine 01, then opens a right-hand panel titled “1. Personalized proficiency”. The uploaded clip is served as a browser-compatible H.264 MP4 with its audio track removed; playback starts automatically, stays muted, plays inline and loops. Use the footer or select machine 01 to enter, Previous slide to zoom back out, or Find Clothing to continue to the next slide.

The fifth slide changes the panel to “2. Find Clothing” and automatically plays the second uploaded clip without sound. Both video slides subtly blur only the Paris scene behind the panel. The previous video is unmounted during panel changes; return with Previous slide or restart the current clip with Replay the video on the final slide.

The sixth slide shows “3. Scan the Cloth” and automatically plays the third uploaded clip silently once. It has no audio track and does not loop: playback ends on the last frame. Replay the video restarts it manually; Previous slide returns to Find Clothing.

## Development

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the address printed by Vite in your local browser. In a cloud workspace, forward port 5173.

## Validation and production build

```sh
npm run lint
npm run build
npm run preview
```

The production output is in `dist/`. Fonts and character artwork are served locally.

The previous standalone presentation is preserved in `docs/previous-presentation.html`; its original `camille.jpg` reference was not present in the repository.
