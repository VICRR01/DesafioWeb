import CategoriaProductos from '../models/productsCategory.models.js';
import { sequelize } from '../database/connection.js';

// Obtener todos los productos
export const getCateriaProductos = async (req, res) => {
  try {
    const categorias = await CategoriaProductos.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorias', error });
  }
};

// Obtener un producto por id
export const getCateriaProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await CategoriaProductos.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categoria', error });
  }
};

// Crear un nuevo producto
export const createCateriaProductos = async (req, res) => {
  try {
    const {
      usuario_idUsuario,
      nombre,
      estado_idEstado,
      fecha_creacion,
    } = req.body;

    // Query SQL
    const query = `
      INSERT INTO CategoriaProductos 
      (usuario_idUsuario, nombre, estado_idEstado, fecha_creacion) 
      VALUES (?, ?, ?, ?);
    `;

    // Ejecutar la consulta con parámetros seguros (replacements)
    const [results] = await sequelize.query(query, {
      replacements: [
        usuario_idUsuario,
        nombre,
        estado_idEstado,
        fecha_creacion,
      ],
    });

    res.status(201).json({
      message: 'Categoria creada exitosamente',
      id: results, // Devuelve el ID insertado si es posible
    });
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({
      message: 'Error al crear categoria',
      error: error.message,
    });
  }
};

// Actualizar producto
export const updateCateriaProductos = async (req, res) => {
  const { id } = req.params;
  const { usuario_idUsuario, nombre, estado_idEstado, fecha_creacion } = req.body;

  try {
    const query = `
      UPDATE CategoriaProductos 
      SET usuario_idUsuario = ?, nombre = ?, estado_idEstado = ?, fecha_creacion = ?
      WHERE idCategoriaProducto = ?;
    `;
    const [results] = await sequelize.query(query, {
      replacements: [
        usuario_idUsuario,
        nombre,
        estado_idEstado,
        fecha_creacion,
        id,
      ],
    });

    if (results.affectedRows === 0) {
      // Si no se actualizó ningún registro
      return res.status(404).json({
        message: 'Categoria no encontrada o no se realizaron cambios',
      });
    }

    // Respuesta de éxito
    res.status(200).json({
      message: 'Categoria actualizada correctamente',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar categoria', error });
  }
};

// Eliminar producto
export const deleteCateriaProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await CategoriaProductos.destroy({ where: { idCategoriaProducto: id } });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar categoria', error });
  }
}; 

