import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {
  }

  public register() {
    // Register your own bindings
  }

  // App is ready
  public async boot() {
    const { default: Database } = await import('@ioc:Adonis/Lucid/Database')
    const { CamelCaseNamingStrategy } = await import('App/NamingStrategies/CamelCaseNamingStrategy')

    Database.SimplePaginator.namingStrategy = new CamelCaseNamingStrategy()
  }

  public async ready() {
    // IoC container is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
