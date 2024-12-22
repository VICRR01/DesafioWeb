import bcrypt from 'bcrypt';
import { sequelize } from '../database/connection.js';
import { generateToken } from '../helpers/jwt.helpers.js';

export const loginUsuario = async (req, res) => {
  const { correo_electronico, password } = req.body;
  try {
    const query = 'SELECT * FROM Usuarios WHERE correo_electronico = ?';
    const [results] = await sequelize.query(query, { replacements: [correo_electronico] });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = results[0];

    // Verificar si la contraseña coincide con la encriptada
    const isValidPassword = await bcrypt.compare(password, usuario.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = await generateToken(usuario);

    res.json({ token, usuario });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};