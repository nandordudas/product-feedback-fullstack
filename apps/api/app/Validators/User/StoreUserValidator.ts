import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { CustomMessages } from '@ioc:Adonis/Core/Validator'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CreateUserValidator {
  public schema = schema.create({
    email: schema.string(),
    password: schema.string(),
  })

  public messages: CustomMessages = {}

  constructor(protected ctx: HttpContextContract) {}
}
