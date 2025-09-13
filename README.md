# 📌 Backend - Gestión de Deudas entre Amigos

Este proyecto implementa un backend en **Node.js + Express + PostgreSQL**, que permite a los usuarios registrarse, iniciar sesión y gestionar sus deudas de manera organizada.  

Incluye seguridad con **JWT**, documentación de endpoints con **Swagger**, validaciones, y cache simulado en memoria (como Redis).  

---

## 🚀 Funcionalidades

- **Registro/Login** con validaciones de email y password.
- **CRUD completo de deudas**:
  - Crear, consultar, editar y eliminar deudas.
  - Validaciones: no se pueden registrar valores negativos ni editar deudas ya pagadas.
- **Marcar deuda como pagada**.
- **Listar deudas con filtro** `?status=pending|paid`.
- **Consultar deuda por ID**: `GET /debts/:id`.
- **Cache simulado** en memoria tipo Redis.
- **Exportar deudas en JSON o CSV**.
- **Resumen de deudas** (totales pendientes y pagadas).
- **Swagger UI** en `/api-docs`.
- Estructura lista para pruebas unitarias.

---

## 🛠️ Tecnologías usadas

- Node.js
- Express
- PostgreSQL (con `pg`)
- bcrypt (hash de contraseñas)
- jsonwebtoken (autenticación JWT)
- swagger-jsdoc + swagger-ui-express (documentación API)
- dotenv (configuración de variables de entorno)

---

## ⚙️ Instalación y configuración

1. Clonar el repositorio:
   ```bash
   git clone <repo-url>
   cd Back

2. Crear archivo .env
PORT=4000
JWT_SECRET=super_secret_key
DATABASE_URL=postgres://user:password@localhost:5432/deudas_db

3. Crear tablas en PostgreSQL
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE debts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

4. Iniciar el servidor
npm run dev

5. Documentación Swagger

👉 http://localhost:4000/api-docs

📂 Estructura del proyecto
src/
 ├── config/        # Configuración (DB, Swagger)
 ├── controllers/   # Lógica de negocio
 ├── middleware/    # Middleware (auth)
 ├── models/        # Clases/Modelos
 ├── routes/        # Rutas de la API
 └── index.js       # Punto de entrada

✅ Endpoints principales
🔹 Auth

POST /auth/register

POST /auth/login

🔹 Deudas

GET /debts

GET /debts/:id

POST /debts

PUT /debts/:id

DELETE /debts/:id

PATCH /debts/:id/pay

GET /debts/export

GET /debts/summary