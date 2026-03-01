import nextPlugin from '@next/eslint-plugin-next';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const nextRecommendedRules = nextPlugin.configs.recommended.rules;
const nextCoreWebVitalsRules = nextPlugin.configs['core-web-vitals'].rules;
const tsRecommendedRules = tsPlugin.configs.recommended.rules;

export default [
  {
    ignores: ['**/dist/**', '**/.next/**', '**/.expo/**', '**/node_modules/**'],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...nextRecommendedRules,
      ...nextCoreWebVitalsRules,
      ...tsRecommendedRules,
      complexity: ['warn', 10],
      'max-lines-per-function': [
        'warn',
        {
          max: 200,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
    },
  },
  {
    files: [
      'src/**/*.test.{ts,tsx,js,jsx}',
      'src/**/*.spec.{ts,tsx,js,jsx}',
      'src/**/*.stories.{ts,tsx,js,jsx}',
    ],
    rules: {
      complexity: 'off',
      'max-lines-per-function': 'off',
    },
  },
];
