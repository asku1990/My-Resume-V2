import nextPlugin from '@next/eslint-plugin-next';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...compat.config({
    extends: ['next/core-web-vitals']
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin
    }
  }
];
