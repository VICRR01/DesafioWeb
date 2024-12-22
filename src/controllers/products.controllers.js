
import Productos from '../models/products.models.js';
import { sequelize } from '../database/connection.js';

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await Productos.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// Obtener un producto por id
export const getProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Productos.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
  try {
    const {
      CategoriaProducto_idCategoriaProducto,
      usuario_idUsuario,
      nombre,
      marca,
      codigo,
      stock,
      estado_idEstado,
      precio,
      fecha_creacion,
      foto,
    } = req.body;

    // Query SQL
    const query = `
      INSERT INTO Productos 
      (CategoriaProducto_idCategoriaProducto, usuario_idUsuario, nombre, marca, codigo, stock, estado_idEstado, precio, fecha_creacion, foto) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    // Ejecutar la consulta con parámetros seguros (replacements)
    const [results] = await sequelize.query(query, {
      replacements: [
        CategoriaProducto_idCategoriaProducto,
        usuario_idUsuario,
        nombre,
        marca,
        codigo,
        stock,
        estado_idEstado,
        precio,
        fecha_creacion,
        foto,
      ],
    });

    res.status(201).json({
      message: 'Producto creado exitosamente',
      id: results, // Devuelve el ID insertado si es posible
    });
  } catch (error) {
    console.error('Error al ejecutar la consulta manual:', error);
    res.status(500).json({
      message: 'Error al crear producto',
      error: error.message,
    });
  }
};


// Actualizar producto
export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { CategoriaProducto_idCategoriaProducto, usuario_idUsuario, nombre, marca, codigo, stock, estado_idEstado, precio, fecha_creacion, foto } = req.body;
  try {
    const query = `
      UPDATE Productos 
      SET CategoriaProducto_idCategoriaProducto = ?, usuario_idUsuario = ?, nombre = ?, marca = ?, codigo = ?, stock = ?, estado_idEstado = ?, precio = ?, fecha_creacion = ?, foto = ?
      WHERE idProducto = ?;
    `;
    const [results] = await sequelize.query(query, {
      replacements: [
        CategoriaProducto_idCategoriaProducto,
        usuario_idUsuario,
        nombre,
        marca,
        codigo,
        stock,
        estado_idEstado,
        precio,
        fecha_creacion,
        foto,
        id,
      ],
    });

    if (results.affectedRows === 0) {
      // Si no se actualizó ningún registro
      return res.status(404).json({
        message: 'Producto no encontrado o no se realizaron cambios',
      });
    }

    // Respuesta de éxito
    res.status(200).json({
      message: 'Producto actualizado correctamente',
    });
  } catch (error) {
    // Si ocurre algún error
    res.status(500).json({
      message: 'Error al actualizar producto',
      error,
    });
  }
}

// Eliminar producto
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await Productos.destroy({ where: { idProducto: id } });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};


