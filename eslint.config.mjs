// Eslint Imports
import globals from 'globals'
import pluginJs from '@eslint/js'
import { parser, configs } from 'typescript-eslint'

// Plugins Imports
import pluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginNext from '@next/eslint-plugin-next'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      '@next/next': pluginNext
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
      'jsx-a11y/alt-text': 'off',
      'react/display-name': 'off',
      'react/no-children-prop': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      'lines-around-comment': [
        'error',
        {
          beforeBlockComment: true,
          beforeLineComment: true,
          allowBlockStart: true,
          allowObjectStart: true,
          allowArrayStart: true
        }
      ],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'any',
          prev: 'export',
          next: 'export'
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*'
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['function', 'multiline-const', 'multiline-block-like']
        },
        {
          blankLine: 'always',
          prev: ['function', 'multiline-const', 'multiline-block-like'],
          next: '*'
        }
      ],
      'newline-before-return': 'error',
      'import/newline-after-import': [
        'error',
        {
          count: 1
        }
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index'], ['object', 'unknown']],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '~/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal'
            }
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          'newlines-between': 'always-and-inside-groups'
        }
      ]
    }
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      }
    }
  },
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect'
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        node: {},
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  },
  pluginJs.configs.recommended,
  ...configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginImport.flatConfigs.recommended,
  pluginPrettierRecommended,
  // Override
  {
    files: ['*.ts', '*.tsx', 'src/iconify-bundle/*'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  }
]
