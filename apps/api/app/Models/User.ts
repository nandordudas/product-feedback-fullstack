import Hash from '@ioc:Adonis/Core/Hash'
import { beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Model from 'App/Models/Model'
import type { DateTime } from 'luxon'

export default class User extends Model {
  @beforeSave()
  public static async hashPassword(user: User) {
    if (!user.$dirty.password)
      return

    user.password = await Hash.make(user.password)
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
