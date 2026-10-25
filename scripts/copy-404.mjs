// Post-build step: create 404.html as a copy of index.html.
// GitHub Pages serves 404.html for any unmatched path (e.g. /sportfuel-exp/catalog),
// which lets the SPA (BrowserRouter + basename) take over client-side routing on refresh/direct access.
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve('dist/index.html');
const dst = resolve('dist/404.html');
copyFileSync(src, dst);
console.log('[copy-404] dist/index.html -> dist/404.html');
