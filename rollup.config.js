import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

const buildPath = './public/build';

export default {
  input: 'src/main.js',

  output: {
    file: `${buildPath}/bundle.js`,
    format: 'iife',
    name: 'bundle',
  },

  plugins: [
    json(),

    svelte({
      css(css) {
        css.write(`${buildPath}/bundle.css`);
      },
    }),

    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
  ],
};
