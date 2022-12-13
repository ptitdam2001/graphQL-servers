import { DataTypes } from "sequelize";

export default {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  invoiceDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}