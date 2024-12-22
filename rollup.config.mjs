import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

const INPUT = {
  index: './src/index.ts',
};

const OUTPUT_DIR = 'dist';

export default defineConfig([
  {
    input: INPUT,
    output: {
      dir: OUTPUT_DIR,
      format: 'esm',
      entryFileNames: '[name].mjs',
      sourcemap: true,
    },
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
  {
    input: INPUT,
    output: {
      dir: OUTPUT_DIR,
      format: 'commonjs',
      exports: 'default',
      entryFileNames: '[name].cjs',
      sourcemap: true,
    },
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
]);
