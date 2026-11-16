import * as productsService from '../services/products.service.js';

// Valida los datos de un producto. Si "parcial" es true, los campos son opcionales (para actualizar).
const validarProducto = (body, parcial = false) => {
  const errores = [];
  if (!body || typeof body !== 'object') return ['El cuerpo de la petición debe ser un JSON'];

  if (!parcial || body.nombre !== undefined) {
    if (typeof body.nombre !== 'string' || body.nombre.trim() === '') {
      errores.push('El campo "nombre" es obligatorio y debe ser texto');
    }
  }
  if (!parcial || body.precio !== undefined) {
    if (body.precio === undefined || isNaN(Number(body.precio)) || Number(body.precio) < 0) {
      errores.push('El campo "precio" es obligatorio y debe ser un número mayor o igual a 0');
    }
  }
  if (!parcial && body.id !== undefined && (!Number.isInteger(Number(body.id)) || Number(body.id) <= 0)) {
    errores.push('El campo "id" debe ser un número entero mayor a 0');
  }
  if (body.stock !== undefined && (!Number.isInteger(Number(body.stock)) || Number(body.stock) < 0)) {
    errores.push('El campo "stock" debe ser un número entero mayor o igual a 0');
  }
  return errores;
};

export const getAll = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const product = await productsService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const errores = validarProducto(req.body);
    if (errores.length) return res.status(400).json({ error: 'Datos inválidos', detalles: errores });

    const product = await productsService.createProduct(req.body);
    if (!product) {
      return res.status(409).json({ error: `Ya existe un producto con el id ${req.body.id}` });
    }
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No se enviaron datos para actualizar' });
    }
    const errores = validarProducto(req.body, true);
    if (errores.length) return res.status(400).json({ error: 'Datos inválidos', detalles: errores });

    const product = await productsService.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await productsService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
