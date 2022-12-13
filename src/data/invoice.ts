import { CreationOptional, Model, Optional, Sequelize } from 'sequelize'
import { GenericDataSource } from './GenericDataSource'
import field from './invoice.model'

export type InvoiceEntity = {
  id: number
  reference: string
  invoiceDate: string
}

type InvoiceCreationAttributes = Optional<InvoiceEntity, 'id'>

class InvoiceModel extends Model<InvoiceEntity, InvoiceCreationAttributes> {
  declare id: CreationOptional<number>;
  declare reference: string;
  declare invoiceDate: string;

  // timestamps!
  // createdAt can be undefined during creation
  // declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  // declare updatedAt: CreationOptional<Date>;
}


export class InvoiceData extends GenericDataSource<InvoiceModel, InvoiceEntity, InvoiceCreationAttributes> {  
  
  constructor(sequelizeInstance: Sequelize) {
    super(sequelizeInstance, 'invoices', field);
  }

  async getOne(id: number): Promise<InvoiceEntity|null> {
    const result = await this.model.findByPk(id);
    return result;
  }
  async getAll(): Promise<InvoiceEntity[]> {
    return await this.model.findAll();
  }
  async create(data: InvoiceCreationAttributes): Promise<InvoiceEntity> {
    const result = await this.model.create(data);
    return result
  }
  async update(id: number, data: InvoiceCreationAttributes): Promise<InvoiceEntity> {
    throw new Error('Method not implemented.')
  }
  async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
  
}

