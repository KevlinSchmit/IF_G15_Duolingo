# Meet Camille

An animated Duolingo-inspired presentation built with React, Vite, and Motion.

The opening slide displays a placeholder TEXT title and text text subtitles. A layered French Duo illustration waves its wings and blinks in the corner. Click the opening scene or press Enter, Space, or ArrowRight to transition to Camille; use the back button or ArrowLeft to return. Reduced-motion settings disable Duo’s animations.

Camille’s redesigned profile uses a generated smiling head-and-shoulders portrait, oversized rounded typography, and a bright Duolingo green background. Fashion and Paris illustrations, the words ‘outfits’ and ‘paris’, and an age badge enter with a spring animation and float gently. Reduced-motion preferences disable floating. Use the replay button to repeat the entrance or the fullscreen button to present.

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
