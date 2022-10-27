import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { CustomMessages } from '@ioc:Adonis/Core/Validator'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ShowUserValidator {
  public schema = schema.create({
    id: schema.number(),
  })

  public messages: CustomMessages = {}

  constructor(protected ctx: HttpContextContract) {}
}
