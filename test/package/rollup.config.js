import path from 'path';
import { defineConfig } from 'rollup';
import stats from 'rollup-plugin-stats';

export default defineConfig([
  {
    input: path.join(__dirname, 'src/index.js'),
    output: {
      dir: 'dist',
    },
    plugins: [stats()],
  },
]);
