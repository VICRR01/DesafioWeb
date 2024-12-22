import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

// Crear una nueva instancia de Sequelize con las configuraciones de la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 1433,
  dialect: 'mssql',
  dialectOptions: {
    encrypt: true,
    trustServerCertificate: true,
  },
  logging: false,
});


// Exportar la función para probar la conexión
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize };



