import { Router } from 'express';
import * as productsController from '../controllers/products.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas (lectura)
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

// Rutas protegidas (requieren Bearer token)
router.post('/create', authenticate, productsController.create);
router.put('/:id', authenticate, productsController.update);
router.delete('/:id', authenticate, productsController.remove);

export default router;
