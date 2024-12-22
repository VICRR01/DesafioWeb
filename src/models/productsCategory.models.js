import  { sequelize }  from '../database/connection.js';
import { DataTypes } from 'sequelize';

const CategoriaProductos = sequelize.define('CategoriaProductos', {
  idCategoriaProducto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  nombre: { type: DataTypes.STRING(45), allowNull: false },
  estado_idEstado: { type: DataTypes.INTEGER, allowNull: false },
  fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false,
  tableName: 'CategoriaProductos',
});

export default CategoriaProductos;