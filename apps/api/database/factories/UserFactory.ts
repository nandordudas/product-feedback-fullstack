import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export const UserFactory = Factory
  .define(User, ({ faker }) => ({
    email: faker.internet.email(),
    password: 'Pa55wor&',
  }))
  .build()
