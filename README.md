# Proyecto Final – API REST de Productos

API REST con Express, Firestore (Firebase) y autenticación JWT.

## Instalación

```bash
npm install
npm run start
```

Completar el archivo `.env` con los datos de Firebase y la clave JWT.

## Panel de prueba

Con el servidor corriendo, abrir `http://localhost:3000/test.html` para hacer login
y crear, editar, eliminar y listar productos desde el navegador.

## Estructura

```
index.js                     Punto de entrada y configuración del servidor
.env                         Variables de entorno
src/
  config/firebase.js         Conexión a Firebase / Firestore
  routes/                    products.routes.js, auth.routes.js
  controllers/               products.controller.js, auth.controller.js
  services/                  products.service.js, auth.service.js
  models/product.model.js    Acceso a la colección "products" de Firestore
  middlewares/               auth (JWT), notFound (404), errorHandler (400/500)
public/test.html             Panel web de prueba
```

## Endpoints

| Método | Ruta                    | Protegida | Descripción                     |
|--------|-------------------------|-----------|---------------------------------|
| POST   | /auth/login             | No        | Devuelve el Bearer token        |
| GET    | /api/products           | No        | Lista todos los productos       |
| GET    | /api/products/:id       | No        | Devuelve un producto            |
| POST   | /api/products/create    | Sí        | Crea un producto                |
| PUT    | /api/products/:id       | Sí        | Actualiza un producto           |
| DELETE | /api/products/:id       | Sí        | Elimina un producto             |

### Login
```json
POST /auth/login
{ "email": "admin@tienda.com", "password": "123456" }
```
Respuesta: `{ "token": "Bearer eyJ..." }` → usar ese valor en el header `Authorization`.

### Crear producto
```json
POST /api/products/create
Authorization: Bearer eyJ...
{ "nombre": "Mouse", "precio": 15000, "stock": 10, "categoria": "Periféricos", "descripcion": "Mouse inalámbrico" }
```

## Códigos de estado

- **400**: body inválido o faltan campos
- **401**: no se envió token / credenciales incorrectas
- **403**: token inválido o vencido
- **404**: ruta inexistente o producto no encontrado
- **500**: error interno o Firestore no responde
