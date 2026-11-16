// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // 400: JSON mal formado en el body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' });
  }

  // 500: fallas internas o del servicio de datos (Firestore)
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor o del servicio de datos' });
};

export default errorHandler;
