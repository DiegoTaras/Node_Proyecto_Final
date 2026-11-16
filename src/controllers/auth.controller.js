import * as authService from '../services/auth.service.js';

export const login = (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Debe enviar email y password' });
    }

    const token = authService.login(email, password);
    if (!token) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.status(200).json({ token: `Bearer ${token}` });
  } catch (error) {
    next(error);
  }
};
