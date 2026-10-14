# Meet Camille

An animated Duolingo-inspired presentation built with React, Vite, and Motion.

Camille’s introduction includes a generated smiling portrait, her age (19), a love of fashion, and her dream of visiting France. Click anywhere or press Enter, Space, or ArrowRight to reveal a matching cartoon character through a French-colour cycling-Duo transition. Repeat to return to the introduction.

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
