import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      // 'no-console': 'warn',
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],

      indent: ['error', 2],
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'block-spacing': ['error', 'always'],
      // 'brace-style': ['error', '2tbs', { allowSingleLine: true }],
      'comma-spacing': ['error', { before: false, after: true }],
      'eol-last': ['error', 'always'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': ['error', 'always'],
      'space-infix-ops': ['error', { int32Hint: false }],
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'template-curly-spacing': ['error', 'never'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'no-trailing-spaces': 'error',
      'space-before-function-paren': ['error', 'never'],
      'prefer-arrow-callback': ['error'],
      'prefer-template': ['error'],
      'arrow-parens': ['error', 'always'],
      'no-else-return': ['error'],
      'no-lonely-if': ['error'],
      'no-unneeded-ternary': ['error'],
      'object-shorthand': ['error', 'always'],
      'prefer-object-spread': ['error'],
    },
  },
  tseslint.configs.recommended,
])
