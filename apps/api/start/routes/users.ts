import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => Route.resource('users', 'UsersController').apiOnly())
  .where('id', /^[0-9]+$/)
  .prefix('api')
