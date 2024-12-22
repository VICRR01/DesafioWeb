import  { sequelize }  from '../database/connection.js';
import { DataTypes } from 'sequelize';

const Estados = sequelize.define('Estados', {
  idEstado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(45), allowNull: false },
}, {
  timestamps: false,
  tableName: 'Estados',
});

export default Estados;