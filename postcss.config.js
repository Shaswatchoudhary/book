// postcss.config.js (with "type": "module" in package.json) or postcss.config.mjs
import tailwindcssPostcss from '@tailwindcss/postcss';

export default {
  plugins: [
    tailwindcssPostcss,
    // other plugins...
  ]
};