import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  // App is ready
  public async boot() {
    const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
    const { BaseModel } = this.app.container.resolveBinding('Adonis/Lucid/Orm')

    const { CamelCaseNamingStrategy } = await import('./NamingStrategyProvider')
    const camelCaseNamingStrategy = new CamelCaseNamingStrategy()

    BaseModel.namingStrategy = camelCaseNamingStrategy
    Database.SimplePaginator.namingStrategy = camelCaseNamingStrategy
  }

  public async ready() {
    // IoC container is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
