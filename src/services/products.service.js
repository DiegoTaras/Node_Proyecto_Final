import * as Product from '../models/product.model.js';

export const getAllProducts = () => Product.getAll();

export const getProductById = (id) => Product.getById(id);

// Devuelve null si el ID indicado ya existe
export const createProduct = async (data) => {
  let id;
  if (data.id !== undefined) {
    id = Number(data.id);
    if (await Product.exists(id)) return null;
  } else {
    id = await Product.getNextId();
  }

  const product = {
    nombre: data.nombre.trim(),
    precio: Number(data.precio),
    stock: Number(data.stock ?? 0),
    categoria: data.categoria ?? '',
    descripcion: data.descripcion ?? '',
  };
  return Product.create(id, product);
};

export const updateProduct = (id, data) => {
  const campos = {};
  if (data.nombre !== undefined) campos.nombre = String(data.nombre).trim();
  if (data.precio !== undefined) campos.precio = Number(data.precio);
  if (data.stock !== undefined) campos.stock = Number(data.stock);
  if (data.categoria !== undefined) campos.categoria = data.categoria;
  if (data.descripcion !== undefined) campos.descripcion = data.descripcion;
  return Product.update(id, campos);
};

export const deleteProduct = (id) => Product.remove(id);
