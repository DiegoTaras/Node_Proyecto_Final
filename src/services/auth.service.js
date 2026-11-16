import jwt from 'jsonwebtoken';

// Usuario habilitado, definido en las variables de entorno
const usuarioValido = () => ({
  id: 1,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
});

export const login = (email, password) => {
  const user = usuarioValido();
  if (email !== user.email || password !== user.password) return null;

  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};
