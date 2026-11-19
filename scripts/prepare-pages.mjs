import { copyFileSync } from 'node:fs'

// GitHub Pages serves this SPA entry point for nested history routes.
copyFileSync(new URL('../dist/index.html', import.meta.url), new URL('../dist/404.html', import.meta.url))
