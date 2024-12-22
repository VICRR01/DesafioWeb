import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';

const Clientes = sequelize.define('Clientes', {
  idCliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  razon_social: { type: DataTypes.STRING(45), allowNull: true },
  nombre_comercial: { type: DataTypes.STRING(45), allowNull: true },
  direccion_entrega: { type: DataTypes.STRING(45), allowNull: true },
  telefono: { type: DataTypes.NUMBER, allowNull: true },
  email: { type: DataTypes.STRING(45), allowNull: true, unique: true },
}, {
  timestamps: false,
  tableName: 'Clientes',
});

export default Clientes;