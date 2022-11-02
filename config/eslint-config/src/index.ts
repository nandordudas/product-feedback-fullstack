import { defineConfig } from 'eslint-define-config'

import { RuleConfigSeverity } from './constants'

const config = defineConfig({
  extends: [
    '@antfu',
  ],
  plugins: [
    'eslint-plugin-simple-import-sort',
    'import-newlines',
    'sort-class-members',
    'unused-imports',
    'no-relative-import-paths',
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': [
      RuleConfigSeverity.Error,
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          parameterProperties: 'explicit',
          properties: 'explicit',
        },
      },
    ],
    'import-newlines/enforce': RuleConfigSeverity.Error,
    'max-len': [
      RuleConfigSeverity.Error,
      120,
    ],
    'newline-per-chained-call': [
      RuleConfigSeverity.Error,
      {
        ignoreChainWithDepth: 2,
      },
    ],
    'simple-import-sort/imports': RuleConfigSeverity.Error,
    'simple-import-sort/exports': RuleConfigSeverity.Error,
    'sort-class-members/sort-class-members': [
      RuleConfigSeverity.Error,
      {
        order: [
          '[static-properties]',
          '[static-methods]',
          '[properties]',
          '[conventional-private-properties]',
          'constructor',
          '[methods]',
          '[conventional-private-methods]',
        ],
        accessorPairPositioning: 'getThenSet',
      },
    ],
    'unused-imports/no-unused-imports': RuleConfigSeverity.Error,
    'no-relative-import-paths/no-relative-import-paths': [
      RuleConfigSeverity.Error,
      {
        allowSameFolder: true,
      },
    ],
  },
  ignorePatterns: [
    '.vscode',
    'build',
  ],
})

export = config
