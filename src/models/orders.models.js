import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';

const Ordenes = sequelize.define('Ordenes', {
  idOrden: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  estado_idEstado: { type: DataTypes.INTEGER, allowNull: false },
  fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  direccion: { type: DataTypes.STRING(45), allowNull: false },
  telefono: { type: DataTypes.NUMBER, allowNull: false },
  correo_electronico: { type: DataTypes.STRING(45), allowNull: false },
  fecha_entrega: { type: DataTypes.DATE, allowNull: true },
  total_orden: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
  timestamps: false,
  tableName: 'Ordenes',
});

export default Ordenes;