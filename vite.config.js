import { defineConfig } from 'vite'
 
// Project sites on GitHub Pages are served from
// https://<username>.github.io/<repo-name>/
// so every asset path needs that repo name as a prefix.
// Without this, your bundled JS/CSS/models will 404 once deployed.
export default defineConfig({
  base: '/Personal-Portfolio/',
})
 