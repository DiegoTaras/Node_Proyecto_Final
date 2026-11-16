import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import productsRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import notFound from './src/middlewares/notFound.middleware.js';
import errorHandler from './src/middlewares/errorHandler.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Página de prueba: http://localhost:3000/test.html
app.use(express.static('public'));

// Rutas
//app.get('/', (req, res) => {
//  res.json({ message: 'API de productos funcionando' });
//});

// Al entrar a la raíz, redirige al panel de prueba lo cambié para que ingrese directo
app.get('/', (req, res) => {
  res.redirect('/test.html');
});

app.use('/api/products', productsRoutes);
app.use('/auth', authRoutes);

// Rutas desconocidas (404)
app.use(notFound);

// Manejo centralizado de errores (400 / 500)
app.use(errorHandler);

// En local levantamos el servidor; en Vercel la app se exporta y Vercel la ejecuta
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

export default app;
