import { sequelize } from '../database/connection.js';
import { DataTypes } from 'sequelize';

const Usuarios = sequelize.define('Usuarios', {
  idUsuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rol_idRol: { type: DataTypes.INTEGER, allowNull: false },
  estado_idEstado: { type: DataTypes.INTEGER, allowNull: false },
  correo_electronico: { type: DataTypes.STRING(45), allowNull: false, unique: true },
  nombre_completo: { type: DataTypes.STRING(45), allowNull:false},
  password: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.NUMBER, allowNull: true },
  fecha_nacimiento: { type: DataTypes.DATE, allowNull: true },
  fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  cliente_idCliente: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: false,
  tableName: 'Usuarios',
});

export default Usuarios;