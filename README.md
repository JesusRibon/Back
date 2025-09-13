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
