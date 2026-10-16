# Meet Camille

An animated Duolingo-inspired presentation built with React, Vite, and Motion.

All slide titles, installation labels, step numerals, floating display words and French clothing labels use locally served Feather Bold, matching the Duolingo heading references. Body copy stays in Nunito. The heading font is preloaded and includes French accents; its source and embedded license reference are recorded in [public/fonts/README.md](public/fonts/README.md).

The opening slide displays a placeholder TEXT title and text text subtitles. A layered French Duo illustration waves its wings and blinks in the corner. Click the opening scene or press Enter, Space, or ArrowRight to fade quickly to Camille while Duo turns sideways and exits to the right; use the back button or ArrowLeft to return. Reduced-motion settings disable Duo’s animations.

Camille’s redesigned profile uses a generated smiling head-and-shoulders portrait, oversized rounded typography, and a bright Duolingo green background. Fashion and Paris illustrations, the words ‘outfits’ and ‘paris’, and an age badge enter with a spring animation and float gently. The profile lists her age and fashion interest, dream of visiting Paris, and frustration with traditional vocabulary lessons as three bullet points. Reduced-motion preferences disable floating. Click anywhere to continue, or use the fullscreen button to present.

The third slide is titled “Inside the Installation” and uses a single camera flash to change the photographic portrait into a cartoon head-and-shoulders portrait inside the same frame. The cartoon portrait blinks as soon as it appears, then quickly becomes a full-body character and lands in the Paris scene; the whole transition takes about 2 seconds. The jump uses the same character renderer as the scene to keep her proportions and pose consistent. Seventeen masked regions reveal quickly in depth order: clouds and bridge, lamps, cupboards and cashier, three kiosks, foreground Duo and displays and sign, then the ground. Camille’s tapered sleeves each use one continuous curved outline from shoulder to cuff, with soft caps and rounded hands. The sleeves bend continuously through a 14-second routine of waving, hands on hips, presenting and shrugging, with weight shifts and localized eye expressions. Animation pauses when the installation is out of view and follows reduced-motion preferences. Duo uses a clean body layer without the old sleeve stub and keeps his free arm behind the torso; his larger greeting, lean, hop and nod share one continuous timeline. Reduced-motion settings retain a still pose, and body layers are preloaded before entering the scene. Five independent clouds drift gently and four lamps flicker at different times. The three installation labels use curved blue leaders with a white outline and eased entrances. Click the profile or use Enter/Space/ArrowRight to enter her world; Previous slide or ArrowLeft moves back one slide. Reduced-motion settings skip the transformation and looping animations.

Video and result panels include compact icon-led notes below the media to explain each step. The fourth slide zooms into machine 01, then opens a right-hand panel titled “Personalized Learning”. The uploaded clip is served as a browser-compatible H.264 MP4 with its audio track removed; playback starts automatically, stays muted, plays inline and loops. Click anywhere to enter or advance, including the background and video; Previous slide zooms back out. Navigation buttons retain their own actions without advancing twice.

The fifth slide changes the panel to “Receive a Prompt” and automatically plays the second uploaded clip without sound. Both video slides subtly blur only the Paris scene behind the panel. The previous video is unmounted during panel changes; return with Previous slide. After the layered scene entrance, the temporary masks are removed and a single composite image remains. The scene stays mounted across video pages, back navigation and fullscreen changes.

The sixth slide shows “Scan and Receive Feedback” and automatically plays the third uploaded clip silently once. It has no audio track and does not loop: playback ends on the last frame. See scan results continues to the image sequence; Previous slide returns to Receive a Prompt.

The seventh slide keeps the “Scan and Receive Feedback” panel in place and fades the video into three screenshot assets recreated from the supplied UI references. They spring in sequentially, then fan out into a left-to-right row with independent rounded blue borders; the third image stretches to fill its border. Click anywhere or choose Save Your Outfit to continue to the sharing slide; Previous slide returns to the scan video. Reduced-motion preferences show the final row directly.

The eighth slide, numbered 4, opens “Save Your Outfit”. The supplied clip is cropped by 98 pixels at the top and 98 pixels at the bottom (720 × 1084), preserving the full app UI and buttons. The main character’s eyebrows have been removed with face tracking, and the confetti fades away by 2.8 seconds while the character keeps moving. The edit preserves the 121 frames, 24 fps and silent H.264 format; `scripts/refine-sharing-video.py` reproduces it from the original cropped clip. It plays automatically, silently and loops beside two images recreated from the supplied translation-exercise and learning-path screenshots. Camille wears the same red coat, black beret, white T-shirt, blue jeans and white sneakers in both still images and the video. The edited stills retain their original gestures and UI layout and use separate asset filenames. All three cards use identical 9:16 rounded blue frames and fit the complete media without stretching. They scale together to fit both the width and available height, including short landscape screens and mobile. Click anywhere or choose See the community leaderboard to continue; Previous slide returns to the three scan-result screens.

The ninth slide keeps the large number 4 and the “Save Your Outfit” title, replaces the three media cards with the saved Paris Fashion Challenge leaderboard, and preserves the background and panel. The image keeps its natural aspect ratio; landscape leaderboards use a wider panel and an adjusted winner position for the Duo zoom. Click anywhere or choose Explore the winning outfit to zoom Duo’s first-place outfit from its position in that image into the next page; Previous slide returns to the video and screenshots.

The tenth slide is titled “Advanced Vocabulary Challenges”, with the subtitle “Higher-level players can access more complex French clothing vocabulary.” It displays the advanced Duo outfit on the left. Thin leader lines and the exact French terms “Le tricorne à plumes”, “L'habit brodé”, “Le jabot de dentelle” and “La culotte” appear automatically in sequence on the right. Duo gently sways while glints twinkle around him. This step keeps the original large diagram and does not show English translations or a profile. Click anywhere or choose See Emma’s progress to continue; Previous slide returns to Share Your Outfit without rebuilding the Paris background.

The tenth and eleventh steps use a white canvas that fills the viewport, without the blue frame. The eleventh step keeps that title and changes the subtitle to “Higher proficiency unlocks advanced outfits, while streaks and rankings motivate users to keep learning.” Advancing to the eleventh step keeps the same Duo and French labels on screen: the profile expands from below while the diagram smoothly contracts, showing Emma with a Duo avatar, Advanced French learner, a first-place crown, a flat solid-color 70% French proficiency bar and a learning streak of 890 days. Only after advancing to this step, the English translations “Feathered tricorne hat”, “Embroidered court coat”, “Lace jabot” and “Knee breeches” spring in beneath their matching French labels. Replay the labels repeats the annotations while keeping the profile in place; Previous slide returns to the French-only outfit step. Both outfit steps adapt to portrait screens and respect reduced-motion preferences.

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
