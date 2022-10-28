import { string } from '@ioc:Adonis/Core/Helpers'
import type { BaseModel, ModelRelationTypes } from '@ioc:Adonis/Lucid/Orm'
import { SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm'

type Model = typeof BaseModel
type RelationTypes = ModelRelationTypes['__opaque_type']

const { camelCase, pluralize } = string

const paginationMetaKeys = {
  currentPage: 'currentPage',
  firstPage: 'firstPage',
  firstPageUrl: 'firstPageUrl',
  lastPage: 'lastPage',
  lastPageUrl: 'lastPageUrl',
  nextPageUrl: 'nextPageUrl',
  perPage: 'perPage',
  previousPageUrl: 'previousPageUrl',
  total: 'total',
} as const

export class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
  public override tableName = (model: Model) =>
    pluralize(camelCase(model.name))

  public override columnName = (_model: Model, propertyName: string) =>
    camelCase(propertyName)

  public override serializedName = (_model: Model, propertyName: string) =>
    camelCase(propertyName)

  public override relationLocalKey = (relation: RelationTypes, model: Model, relatedModel: Model) =>
    relation === 'belongsTo'
      ? relatedModel.primaryKey
      : model.primaryKey

  public override relationForeignKey = (relation: RelationTypes, model: Model, relatedModel: Model) =>
    relation === 'belongsTo'
      ? camelCase(`${relatedModel.name}_${relatedModel.primaryKey}`)
      : camelCase(`${model.name}_${model.primaryKey}`)

  public override relationPivotTable = (_relation: 'manyToMany', model: Model, relatedModel: Model) =>
    camelCase([relatedModel.name, model.name].sort()
      .join('_'))

  public override relationPivotForeignKey = (_relation: 'manyToMany', model: Model) =>
    camelCase(`${model.name}_${model.primaryKey}`)

  public override paginationMetaKeys = () => paginationMetaKeys
}
