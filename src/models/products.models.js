import  { sequelize }  from '../database/connection.js';
import { DataTypes } from 'sequelize';

const Productos = sequelize.define('Productos', {
  idProducto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  CategoriaProducto_idCategoriaProducto: { type: DataTypes.INTEGER, allowNull: false },
  usuario_idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  nombre: { type: DataTypes.STRING(45), allowNull: false },
  marca: { type: DataTypes.STRING(45), allowNull: false },
  codigo: { type: DataTypes.STRING(45), allowNull: false, unique: true },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  estado_idEstado: { type: DataTypes.INTEGER, allowNull: false },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  foto: { type: DataTypes.BLOB('long'), allowNull: true },
}, {
  timestamps: false,
  tableName: 'Productos',
});

export default Productos;
