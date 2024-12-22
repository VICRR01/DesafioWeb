import Usuarios from '../models/users.models.js';
import { sequelize } from '../database/connection.js';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Obtener un usuario por id
export const getUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

// Obtener el perfil del usuario autenticado
export const getUserProfile = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const usuario = await Usuarios.findByPk(user.idUsuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      id: usuario.idUsuario,
      nombre_completo: usuario.nombre_completo,
      correo_electronico: usuario.correo_electronico,
      rol: usuario.rol_idRol,
      telefono: usuario.telefono,
      fecha_nacimiento: usuario.fecha_nacimiento,
      // Excluir campos sensibles como la contraseña
    });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ message: 'Error al obtener el perfil del usuario', error });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
  try {
    const {
      rol_idRol,
      estado_idEstado,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
      cliente_idCliente,
    } = req.body;

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await sequelize.query(
      `SELECT * FROM Usuarios WHERE correo_electronico = ?`,
      {
        replacements: [correo_electronico],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: 'El correo electrónico ya está registrado',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO Usuarios 
      (rol_idRol, estado_idEstado, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, cliente_idCliente) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const [results] = await sequelize.query(query, {
      replacements: [
        rol_idRol,
        estado_idEstado,
        correo_electronico,
        nombre_completo,
        hashedPassword,
        telefono,
        fecha_nacimiento,
        cliente_idCliente,
      ],
    });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      id: results,
    });
  } catch (error) {
    console.error('Error al ejecutar la consulta manual:', error);
    res.status(500).json({
      message: 'Error al crear usuario manualmente',
      error: error.message,
    });
  }
};

// Actualizar usuario
export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { rol_idRol, estado_idEstado, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, cliente_idCliente } = req.body;

  try {
     // Verificar si el correo electrónico ya está en uso por otro usuario
     const existingUser = await sequelize.query(
      `SELECT * FROM Usuarios WHERE correo_electronico = ? AND idUsuario != ?`,
      {
        replacements: [correo_electronico, id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: 'El correo electrónico ya está registrado por otro usuario',
      });
    }
    
    let hashedPassword = null;

    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const query = `
      UPDATE Usuarios 
      SET rol_idRol = ?, estado_idEstado = ?, correo_electronico = ?, nombre_completo = ?, password = COALESCE(?, password), telefono = ?, fecha_nacimiento = ?, cliente_idCliente = ?
      WHERE idUsuario = ?;
    `;
    const [results] = await sequelize.query(query, {
      replacements: [
        rol_idRol,
        estado_idEstado,
        correo_electronico,
        nombre_completo,
        hashedPassword,
        telefono,
        fecha_nacimiento,
        cliente_idCliente,
        id,
      ],
    });

    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado o no se realizaron cambios',
      });
    }

    res.status(200).json({
      message: 'Usuario actualizado correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({
      message: 'Error al actualizar el usuario',
      error: error.message,
    });
  }
};

// Eliminar Usuario
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuarios.destroy({ where: { idUsuario: id } });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cliente", error });
  }
};
