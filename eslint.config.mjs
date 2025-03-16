import nextPlugin from '@next/eslint-plugin-next';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const compat = new FlatCompat();

const config = [
  js.configs.recommended,
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Disable base rule to avoid conflicts
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    // Special rules for type definition files
    files: ['**/types/**/*.ts', '**/types/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // Disable unused vars check in type files
      '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' in type definitions
    },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
    ],
  },
];

export default config;
