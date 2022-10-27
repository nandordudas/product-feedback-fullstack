import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const config = <UserConfig>{
  extends: '@commitlint/config-conventional',
  rules: {
    'references-empty': [RuleConfigSeverity.Error, 'never'],
  },
}

export = config
