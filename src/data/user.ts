import { CreationOptional, Model, Optional, Sequelize } from 'sequelize'
import { GenericDataSource } from './GenericDataSource'
import field from './user.model'

export type UserEntity = {
  id: number
  firstname: string
  lastname: string
  email: string
}

type UserCreationAttributes = Optional<UserEntity, 'id'>

class UserModel extends Model<UserEntity, UserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare firstname: string;
  declare lastname: string;
  declare email: string;

  // timestamps!
  // createdAt can be undefined during creation
  // declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  // declare updatedAt: CreationOptional<Date>;
}


export class UserData extends GenericDataSource<UserModel, UserEntity, UserCreationAttributes> {
  constructor(sequelizeInstance: Sequelize) {
    super(sequelizeInstance, 'users', field);
  }

  async getOne(id: number): Promise<UserEntity|null> {
    const result = await this.model.findByPk(id);
    return result;
  }
  async getAll(): Promise<UserEntity[]> {
    return await this.model.findAll();
  }
  async create(data: UserCreationAttributes): Promise<UserEntity> {
    const result = await this.model.create(data);
    return result
  }
  async update(id: number, data: UserCreationAttributes): Promise<UserEntity> {
    throw new Error('Method not implemented.')
  }
  async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
  
}

