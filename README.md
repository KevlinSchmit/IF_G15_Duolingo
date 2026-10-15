# Meet Camille

An animated Duolingo-inspired presentation built with React, Vite, and Motion.

The opening slide displays a placeholder TEXT title and text text subtitles. A layered French Duo illustration waves its wings and blinks in the corner. Click the opening scene or press Enter, Space, or ArrowRight to fade quickly to Camille while Duo turns sideways and exits to the right; use the back button or ArrowLeft to return. Reduced-motion settings disable Duo’s animations.

Camille’s redesigned profile uses a generated smiling head-and-shoulders portrait, oversized rounded typography, and a bright Duolingo green background. Fashion and Paris illustrations, the words ‘outfits’ and ‘paris’, and an age badge enter with a spring animation and float gently. Reduced-motion preferences disable floating. Click anywhere to continue, or use the fullscreen button to present.

The third slide uses a single camera flash to change the photographic portrait into a cartoon head-and-shoulders portrait inside the same frame. Camille winks before jumping out and landing in the Paris scene. Seventeen masked regions reveal quickly in depth order: clouds and bridge, lamps, cupboards and cashier, three kiosks, foreground Duo and displays and sign, then the ground. Camille smoothly cycles through a wave, wink, relaxed smile and hands-on-hips pose with small weight shifts and nods; lamps glow gently and the separate foreground Duo arm waves. Click the profile or use Enter/Space/ArrowRight to enter her world; Previous slide or ArrowLeft moves back one slide. Reduced-motion settings skip the transformation and looping animations.

The fourth slide zooms into machine 01, then opens a right-hand panel titled “1. Personalized proficiency”. The uploaded clip is served as a browser-compatible H.264 MP4 with its audio track removed; playback starts automatically, stays muted, plays inline and loops. Click anywhere to enter or advance, including the background and video; Previous slide zooms back out. Navigation buttons retain their own actions without advancing twice.

The fifth slide changes the panel to “2. Find Clothing” and automatically plays the second uploaded clip without sound. Both video slides subtly blur only the Paris scene behind the panel. The previous video is unmounted during panel changes; return with Previous slide. After the layered scene entrance, the temporary masks are removed and a single composite image remains. The scene stays mounted across video pages, back navigation and fullscreen changes.

The sixth slide shows “3. Scan the Cloth” and automatically plays the third uploaded clip silently once. It has no audio track and does not loop: playback ends on the last frame. See scan results continues to the image sequence; Previous slide returns to Find Clothing.

The seventh slide keeps the “3. Scan the Cloth” panel in place and fades the video into three screenshot assets recreated from the supplied UI references. They spring in sequentially, then fan out into a left-to-right row with independent rounded blue borders; the third image stretches to fill its border. Click anywhere or choose Sharing Outfit to continue to the final slide; Previous slide returns to the scan video. Reduced-motion preferences show the final row directly.

The eighth slide opens “4. Sharing Outfit”. The supplied clip is cropped by 98 pixels at the top and 98 pixels at the bottom (720 × 1084), preserving the full app UI and buttons. It plays automatically, silently and loops beside the Paris Fashion Challenge screenshot recreated from the supplied image, in separate rounded blue borders. Both portrait cards remain side by side on mobile. Click anywhere or choose Explore the winning outfit to continue; Previous slide returns to the three scan-result screens.

The ninth slide enlarges the first-place Duo outfit from the leaderboard and moves it to the left. Thin leader lines and the exact French terms “Le tricorne à plumes”, “L'habit brodé”, “Le jabot de dentelle” and “La culotte” appear automatically in sequence on the right, followed by the English translations “Feathered tricorne hat”, “Embroidered court coat”, “Lace jabot” and “Knee breeches” beneath their matching French labels. A new transparent artwork asset follows the original winning outfit. Duo gently sways and breathes while small glints twinkle around him. A profile card below the smaller outfit diagram shows Emma, Advanced French learner, a first-place crown, an animated 70% French proficiency bar and a learning streak of 890 days. The profile stays in place while Replay the labels repeats the French and English annotations; Previous slide returns to Sharing Outfit without rebuilding the Paris background. The diagram adapts to portrait screens and disables the zoom, idle movement and twinkling for reduced-motion preferences.

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
