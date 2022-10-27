import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { CamelCaseNamingStrategy } from 'App/NamingStrategies/CamelCaseNamingStrategy'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()

export default class Model extends BaseModel {}
