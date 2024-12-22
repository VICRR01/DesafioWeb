import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const secretKey = process.env.JWT_SECRET_KEY; // Clave secreta fija
const expiresIn = process.env.JWT_EXPIRES_IN || '1d'; // Tiempo de expiración (por defecto, 1 día)

export { secretKey, expiresIn };
export default {
  secretKey,
  expiresIn,
};
