import { DataSource } from "apollo-datasource";
import { Attributes, Model, ModelAttributes, ModelStatic, Sequelize } from "sequelize";

export abstract class GenericDataSource<TModel extends Model<any, any>, TEntity, TCreationAttributes> extends DataSource {
  protected model: ModelStatic<TModel>;
  
  constructor(sequelizeInstance: Sequelize, tablename: string, fields: ModelAttributes<TModel, Attributes<any>>) {
    super()
    this.model = sequelizeInstance.define<TModel>(tablename, fields);
  }

  getModel(): ModelStatic<TModel> {
    return this.model;
  }

  abstract getOne(id: number): Promise<TEntity|null>
  abstract getAll(): Promise<TEntity[]>
  abstract create(data: TCreationAttributes): Promise<TEntity>
  abstract update(id: number, data: TCreationAttributes): Promise<TEntity>
  abstract delete(id: number): void
}