import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { CustomMessages } from '@ioc:Adonis/Core/Validator'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

import { passwordPattern } from './rules'

export default class UpdateUserValidator {
  public refs = schema.refs({
    id: this.ctx.params.id,
  })

  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
        whereNot: {
          id: this.refs.id,
        },
      }),
      rules.trim(),
    ]),
    password: schema.string([
      rules.regex(passwordPattern),
    ]),
  })

  public messages: CustomMessages = {}

  constructor(protected ctx: HttpContextContract) {}
}
