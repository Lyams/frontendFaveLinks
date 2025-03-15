import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import babelParser from '@babel/eslint-parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
      },
    },
 
    plugins: {
      react: reactPlugin,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx', '.js'] }],
      'import/extensions': 'off',
      'react/prop-types': 'off',
      'no-console': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  },
  prettierConfig,
];
