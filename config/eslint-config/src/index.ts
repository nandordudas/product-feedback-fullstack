import { defineConfig } from 'eslint-define-config'

enum RuleConfigSeverity {
  Off,
  Waring,
  Error,
}

const config = defineConfig({
  extends: [
    '@antfu',
  ],
  plugins: [
    'eslint-plugin-simple-import-sort',
    'import-newlines',
    'sort-class-members',
    'unused-imports',
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
    'unused-imports/no-unused-imports': RuleConfigSeverity.Error,
  },
  ignorePatterns: [
    '.vscode',
    'build',
  ],
})

export = config
