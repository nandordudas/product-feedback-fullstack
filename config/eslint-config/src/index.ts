import { defineConfig } from 'eslint-define-config'

enum RuleConfigSeverity {
  Error = 2,
}

const config = defineConfig({
  extends: [
    '@antfu',
  ],
  plugins: [
    'eslint-plugin-simple-import-sort',
    'import-newlines',
    'sort-class-members',
  ],
  rules: {
    'max-len': [
      RuleConfigSeverity.Error,
      120,
    ],
    'import-newlines/enforce': RuleConfigSeverity.Error,
    'newline-per-chained-call': [
      RuleConfigSeverity.Error,
      {
        ignoreChainWithDepth: 1,
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
  },
  ignorePatterns: [
    '.vscode',
    'build',
  ],
})

export = config
