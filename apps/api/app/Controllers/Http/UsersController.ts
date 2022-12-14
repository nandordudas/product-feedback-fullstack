import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Controller from 'App/Controllers/Controller'
import User from 'App/Models/User'
import IndexUsersValidator from 'App/Validators/User/IndexUserValidator'
import StoreUserValidator from 'App/Validators/User/StoreUserValidator'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'

export default class UsersController extends Controller {
  public async index({ request }: HttpContextContract) {
    const { page = Controller.pagination.defaultPageNumber } = await request.validate(IndexUsersValidator)
    const result = await User.query().paginate(page, Controller.pagination.pageLimit)

    return result
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreUserValidator)
    const user = await User.create(payload)

    return response.created(user)
  }

  public async show({ params: { id } }: HttpContextContract) {
    const user = await User.findOrFail(id)

    return user
  }

  public async update({ params: { id }, request }: HttpContextContract) {
    const payload = await request.validate(UpdateUserValidator)
    const user = await User.findOrFail(id)
    const result = await user.merge(payload).save()

    return result
  }

  public async destroy({ params: { id }, response }: HttpContextContract) {
    const user = await User.findOrFail(id)

    await user.delete()

    return response.noContent()
  }
}
